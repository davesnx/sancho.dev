import { spawn, type ChildProcess } from "node:child_process";
import { createHash } from "node:crypto";
import Fs from "node:fs";
import Path from "node:path";
import { fileURLToPath } from "node:url";
import { Effect } from "effect";
import type { Browser, BrowserContext, Page } from "playwright";
import { getPublishedBlogPosts } from "./get-pages.mts";

interface PostWithHash {
  slug: string;
  hash: string;
}

interface ScreenshotResult {
  page: Page;
  success: boolean;
}

type Manifest = Record<string, string>;
type PlaywrightModule = typeof import("playwright");

const __dirname = Path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = Path.resolve(__dirname, "..");
const OUTPUT_DIR = Path.join(ROOT_DIR, "public", "og");
const MANIFEST_PATH = Path.join(OUTPUT_DIR, ".manifest.json");
const PORT = 3006;
const BASE_URL = `http://localhost:${PORT}`;
const FORCE_REGENERATE = process.argv.includes("--force");
const SINGLE_SLUG = process.argv
  .find((arg) => arg.startsWith("--slug="))
  ?.split("=")[1];

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const TOP_OFFSET = 150;

const toError = (error: unknown): Error =>
  error instanceof Error ? error : new Error(String(error));

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

function getFirst100Words(content: string): string {
  const plainText = content
    .replace(/```[\s\S]*?```/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#*_`~]/g, "")
    .trim();

  return plainText.split(/\s+/).slice(0, 100).join(" ");
}

function hashContent(
  title: string,
  description: string | undefined,
  first100Words: string,
): string {
  return createHash("md5")
    .update(`${title}|${description ?? ""}|${first100Words}`)
    .digest("hex");
}

function loadManifest(): Manifest {
  try {
    if (Fs.existsSync(MANIFEST_PATH)) {
      return JSON.parse(Fs.readFileSync(MANIFEST_PATH, "utf-8")) as Manifest;
    }
  } catch {
    // Corrupted manifest, start fresh.
  }

  return {};
}

function saveManifest(manifest: Manifest): void {
  Fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
}

async function getPostsWithHashes(): Promise<PostWithHash[]> {
  const posts = await getPublishedBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
    hash: hashContent(post.title, post.description, getFirst100Words(post.content)),
  }));
}

async function waitForServer(url: string, maxAttempts = 30): Promise<void> {
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return;
      }
    } catch {
      // Server not ready yet.
    }

    await sleep(1000);
  }

  throw new Error("Server did not start in time");
}

function cleanOutputDirectory(): void {
  if (!Fs.existsSync(OUTPUT_DIR)) {
    return;
  }

  for (const file of Fs.readdirSync(OUTPUT_DIR)) {
    if (file.endsWith(".png") || file === ".manifest.json") {
      Fs.unlinkSync(Path.join(OUTPUT_DIR, file));
    }
  }

  console.log("Cleaned up existing OG images.\n");
}

async function loadPlaywright(): Promise<PlaywrightModule> {
  try {
    return await import("playwright");
  } catch {
    throw new Error("Playwright not found");
  }
}

function startServer(): ChildProcess {
  console.log("Starting Next.js server...");

  const server = spawn("npm", ["run", "dev", "--", "-p", PORT.toString()], {
    cwd: ROOT_DIR,
    stdio: ["ignore", "pipe", "pipe"],
    shell: true,
  });

  server.stdout?.on("data", (data: Buffer) => {
    console.log(data.toString());
  });

  server.stderr?.on("data", (data: Buffer) => {
    console.error(data.toString());
  });

  return server;
}

async function stopServer(server: ChildProcess): Promise<void> {
  console.log("Stopping server...");
  server.kill("SIGTERM");
  await sleep(1000);

  try {
    server.kill("SIGKILL");
  } catch {
    // Already dead.
  }
}

async function closePage(page: Page): Promise<void> {
  try {
    await page.close();
  } catch {
    // Already closed.
  }
}

async function closeContext(context: BrowserContext): Promise<void> {
  try {
    await context.close();
  } catch {
    // Already closed.
  }
}

async function closeBrowser(browser: Browser): Promise<void> {
  try {
    await browser.close();
  } catch {
    // Already closed.
  }
}

async function screenshotPost({
  post,
  page,
  context,
  manifest,
  failed,
  retryCount = 0,
}: {
  post: PostWithHash;
  page: Page;
  context: BrowserContext;
  manifest: Manifest;
  failed: string[];
  retryCount?: number;
}): Promise<ScreenshotResult> {
  const url = `${BASE_URL}/blog/${post.slug}`;
  const outputPath = Path.join(OUTPUT_DIR, `${post.slug}.png`);

  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(500);

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

    await page.waitForTimeout(500);

    await page.screenshot({
      path: outputPath,
      type: "png",
      clip: { x: 0, y: TOP_OFFSET, width: OG_WIDTH, height: OG_HEIGHT },
    });

    manifest[post.slug] = post.hash;
    console.log(`  ✓ Saved: ${outputPath}`);
    return { page, success: true };
  } catch (error) {
    if (retryCount < 2) {
      console.log(`  ⟳ Retrying: ${post.slug} (attempt ${retryCount + 2}/3)`);
      const freshPage = await context.newPage();
      await closePage(page);

      return screenshotPost({
        post,
        page: freshPage,
        context,
        manifest,
        failed,
        retryCount: retryCount + 1,
      });
    }

    console.error(`  ✗ Failed: ${post.slug}`, toError(error).message);
    failed.push(post.slug);
    return { page, success: false };
  }
}

async function generateOGImages(): Promise<void> {
  if (!Fs.existsSync(OUTPUT_DIR)) {
    Fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  if (FORCE_REGENERATE) {
    cleanOutputDirectory();
  }

  const manifest = FORCE_REGENERATE ? {} : loadManifest();
  let posts = await getPostsWithHashes();

  if (SINGLE_SLUG) {
    const singlePost = posts.find((post) => post.slug === SINGLE_SLUG);

    if (!singlePost) {
      console.error(`Post not found: ${SINGLE_SLUG}`);
      console.log("\nAvailable slugs:");
      for (const post of posts) {
        console.log(`  - ${post.slug}`);
      }

      throw new Error(`Unknown slug: ${SINGLE_SLUG}`);
    }

    posts = [singlePost];
    console.log(`Generating single OG image for: ${SINGLE_SLUG}\n`);
  }

  const postsToGenerate =
    FORCE_REGENERATE || SINGLE_SLUG
      ? posts
      : posts.filter((post) => {
          const cachedHash = manifest[post.slug];
          const imageExists = Fs.existsSync(
            Path.join(OUTPUT_DIR, `${post.slug}.png`),
          );

          return cachedHash !== post.hash || !imageExists;
        });

  if (FORCE_REGENERATE && !SINGLE_SLUG) {
    console.log("Force regenerating all OG images...");
  }

  if (postsToGenerate.length === 0) {
    console.log("All OG images are up to date!");
    return;
  }

  console.log(
    `Found ${postsToGenerate.length} posts to generate (${posts.length - postsToGenerate.length} cached)`,
  );

  const playwright = await loadPlaywright();
  const server = startServer();
  let browser: Browser | undefined;
  let context: BrowserContext | undefined;

  try {
    console.log("Waiting for server to be ready...");
    await waitForServer(BASE_URL);
    console.log("Server is ready!\n");

    browser = await playwright.chromium.launch({ headless: true });
    context = await browser.newContext({
      viewport: { width: OG_WIDTH, height: OG_HEIGHT + TOP_OFFSET },
      deviceScaleFactor: 3,
    });

    const newManifest: Manifest = { ...manifest };
    const failed: string[] = [];
    let currentPage = await context.newPage();

    for (const post of postsToGenerate) {
      console.log(`Generating: ${post.slug}`);
      const result = await screenshotPost({
        post,
        page: currentPage,
        context,
        manifest: newManifest,
        failed,
      });

      currentPage = result.page;

      if (!result.success) {
        currentPage = await context.newPage();
      }
    }

    for (const post of posts) {
      if (!newManifest[post.slug]) {
        newManifest[post.slug] = post.hash;
      }
    }

    saveManifest(newManifest);

    const successCount = postsToGenerate.length - failed.length;
    console.log(`\nDone! Generated ${successCount}/${postsToGenerate.length} OG images.`);

    if (failed.length > 0) {
      console.log(`\nFailed posts (${failed.length}):`);
      for (const slug of failed) {
        console.log(`  - ${slug}`);
      }

      console.log("\nRun again to retry failed posts.");
    }
  } finally {
    if (context) {
      await closeContext(context);
    }

    if (browser) {
      await closeBrowser(browser);
    }

    await stopServer(server);
  }
}

void Effect.runPromise(
  Effect.tryPromise({
    try: generateOGImages,
    catch: toError,
  }),
).catch((error: unknown) => {
  console.error("Error generating OG images:", toError(error));
  process.exit(1);
});
