import { createHash } from "crypto";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, "..");
const POSTS_DIR = path.join(ROOT_DIR, "src", "content", "posts");
const OUTPUT_DIR = path.join(ROOT_DIR, "public", "og");
const MANIFEST_PATH = path.join(OUTPUT_DIR, ".manifest.json");
const PORT = 3006;
const BASE_URL = `http://localhost:${PORT}`;
const FORCE_REGENERATE = process.argv.includes("--force");
const SINGLE_SLUG = process.argv.find((arg) => arg.startsWith("--slug="))?.split("=")[1];

function getFirst100Words(content) {
  // Remove MDX/JSX components and get plain text
  const plainText = content
    .replace(/```[\s\S]*?```/g, "") // Remove code blocks
    .replace(/<[^>]+>/g, "") // Remove HTML/JSX tags
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Convert links to text
    .replace(/[#*_`~]/g, "") // Remove markdown formatting
    .trim();

  const words = plainText.split(/\s+/).slice(0, 100);
  return words.join(" ");
}

function hashContent(title, description, first100Words) {
  const content = `${title}|${description || ""}|${first100Words}`;
  return createHash("md5").update(content).digest("hex");
}

function loadManifest() {
  try {
    if (fs.existsSync(MANIFEST_PATH)) {
      return JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf-8"));
    }
  } catch {
    // Corrupted manifest, start fresh
  }
  return {};
}

function saveManifest(manifest) {
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
}

function getPostsWithHashes() {
  const files = fs.readdirSync(POSTS_DIR);
  const posts = [];

  for (const file of files) {
    if (!file.endsWith(".mdx")) continue;

    const slug = file.replace(".mdx", "");
    const filePath = path.join(POSTS_DIR, file);
    const source = fs.readFileSync(filePath, "utf-8");
    const { data: frontmatter, content } = matter(source);

    // Skip drafts
    if (frontmatter.isDraft === true) continue;

    const first100Words = getFirst100Words(content);
    const hash = hashContent(frontmatter.title, frontmatter.description, first100Words);

    posts.push({ slug, hash, title: frontmatter.title });
  }

  return posts;
}

async function waitForServer(url, maxAttempts = 30) {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) return true;
    } catch {
      // Server not ready yet
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  throw new Error("Server did not start in time");
}

async function generateOGImages() {
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const manifest = loadManifest();
  let posts = getPostsWithHashes();

  // Filter to single post if --slug is provided
  if (SINGLE_SLUG) {
    const singlePost = posts.find((p) => p.slug === SINGLE_SLUG);
    if (!singlePost) {
      console.error(`Post not found: ${SINGLE_SLUG}`);
      console.log("\nAvailable slugs:");
      posts.forEach((p) => console.log(`  - ${p.slug}`));
      process.exit(1);
    }
    posts = [singlePost];
    console.log(`Generating single OG image for: ${SINGLE_SLUG}\n`);
  }

  // Find posts that need regeneration
  const postsToGenerate = FORCE_REGENERATE || SINGLE_SLUG
    ? posts
    : posts.filter((post) => {
        const cachedHash = manifest[post.slug];
        const imageExists = fs.existsSync(path.join(OUTPUT_DIR, `${post.slug}.png`));
        return cachedHash !== post.hash || !imageExists;
      });

  if (FORCE_REGENERATE && !SINGLE_SLUG) {
    console.log("Force regenerating all OG images...");
  }

  if (postsToGenerate.length === 0) {
    console.log("All OG images are up to date!");
    return;
  }

  console.log(`Found ${postsToGenerate.length} posts to generate (${posts.length - postsToGenerate.length} cached)`);

  // Dynamically import playwright
  let playwright;
  try {
    playwright = await import("playwright");
  } catch {
    console.error("Playwright not found");
    process.exit(1);
  }

  console.log("Starting Next.js server...");
  const server = spawn("npm", ["run", "dev", "--", "-p", PORT.toString()], {
    cwd: ROOT_DIR,
    stdio: ["ignore", "pipe", "pipe"],
    shell: true,
  });

  server.stdout.on("data", (data) => {
    console.log(data.toString());
  });
  server.stderr.on("data", (data) => {
    console.error(data.toString());
  });

  try {
    console.log("Waiting for server to be ready...");
    await waitForServer(BASE_URL);
    console.log("Server is ready!\n");

    const OG_WIDTH = 1200;
    const OG_HEIGHT = 630;
    const TOP_OFFSET = 150;

    const browser = await playwright.chromium.launch({ headless: true });
    const context = await browser.newContext({
      viewport: { width: OG_WIDTH, height: OG_HEIGHT + TOP_OFFSET },
      deviceScaleFactor: 3,
    });
    const page = await context.newPage();

    const newManifest = { ...manifest };
    const failed = [];

    async function screenshotPost(post, page, retryCount = 0) {
      const url = `${BASE_URL}/blog/${post.slug}`;
      const outputPath = path.join(OUTPUT_DIR, `${post.slug}.png`);

      try {
        await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });

        // Small delay for any animations to settle
        await page.waitForTimeout(500);

        // Inject overlay with avatar, name, and URL
        await page.evaluate(() => {
          const overlay = document.createElement("div");
          overlay.innerHTML = `
            <div style="
              position: fixed;
              bottom: 0;
              left: 0;
              right: 0;
              height: 200px;
              padding: 0 52px 24px 52px;
              display: flex;
              align-items: flex-end;
              justify-content: space-between;
              z-index: 99999;
              pointer-events: none;
              background: linear-gradient(to top, rgba(20, 20, 20, 0.85) 0%, rgba(20, 20, 20, 0.5) 40%, rgba(20, 20, 20, 0) 100%);
            ">
              <div style="
                display: flex;
                align-items: center;
                gap: 16px;
              ">
                <img
                  src="https://avatars.githubusercontent.com/u/3763599?v=4"
                  style="width: 56px; height: 56px; border-radius: 50%;"
                />
                <div style="display: flex; flex-direction: column; gap: 6px;">
                  <span style="color: #FAFAFA; font-family: system-ui; font-weight: 600; font-size: 20px; margin: 0; padding: 0; line-height: 1;">
                    David Sancho
                  </span>
                  <span style="color: #848686; font-family: system-ui; font-size: 16px; margin: 0; padding: 0; line-height: 1;">
                    @davesnx
                  </span>
                </div>
              </div>
              <div style="
                color: #848686;
                font-family: system-ui;
                font-weight: 500;
                font-size: 18px;
              ">
                <span style="color: #848686;">https://</span><span style="color: #FAFAFA;">sancho.dev</span>
              </div>
            </div>
          `;
          document.body.appendChild(overlay);
        });

        // Wait for avatar to load
        await page.waitForTimeout(500);

        await page.screenshot({
          path: outputPath,
          type: "png",
          clip: { x: 0, y: TOP_OFFSET, width: OG_WIDTH, height: OG_HEIGHT },
        });

        // Update manifest with new hash
        newManifest[post.slug] = post.hash;
        console.log(`  ✓ Saved: ${outputPath}`);
        return true;
      } catch (error) {
        if (retryCount < 2) {
          console.log(`  ⟳ Retrying: ${post.slug} (attempt ${retryCount + 2}/3)`);
          // Create fresh page after failure
          const freshPage = await context.newPage();
          await page.close();
          return screenshotPost(post, freshPage, retryCount + 1);
        }
        console.error(`  ✗ Failed: ${post.slug}`, error.message);
        failed.push(post.slug);
        return false;
      }
    }

    let currentPage = page;
    for (const post of postsToGenerate) {
      console.log(`Generating: ${post.slug}`);
      const success = await screenshotPost(post, currentPage);

      // If failed after retries, get a fresh page for next iteration
      if (!success) {
        currentPage = await context.newPage();
      }
    }

    // Close any remaining page
    try {
      await currentPage.close();
    } catch {
      // Already closed
    }

    // Also add unchanged posts to manifest (in case they were already there)
    for (const post of posts) {
      if (!newManifest[post.slug]) {
        newManifest[post.slug] = post.hash;
      }
    }

    saveManifest(newManifest);
    await browser.close();

    const successCount = postsToGenerate.length - failed.length;
    console.log(`\nDone! Generated ${successCount}/${postsToGenerate.length} OG images.`);

    if (failed.length > 0) {
      console.log(`\nFailed posts (${failed.length}):`);
      failed.forEach((slug) => console.log(`  - ${slug}`));
      console.log("\nRun again to retry failed posts.");
    }
  } finally {
    // Kill the server
    console.log("Stopping server...");
    server.kill("SIGTERM");

    // Give it a moment to clean up
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Force kill if still running
    try {
      server.kill("SIGKILL");
    } catch {
      // Already dead
    }
  }
}

generateOGImages().catch((error) => {
  console.error("Error generating OG images:", error);
  process.exit(1);
});
