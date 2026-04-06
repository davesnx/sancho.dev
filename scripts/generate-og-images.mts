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
const EARLY_CONTENT_CHAR_LIMIT = 4000;

const toError = (error: unknown): Error =>
  error instanceof Error ? error : new Error(String(error));

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const fromThrowable = <A,>(operation: () => A) =>
  Effect.try({
    try: operation,
    catch: toError,
  });

const fromPromise = <A,>(operation: () => Promise<A>) =>
  Effect.tryPromise({
    try: operation,
    catch: toError,
  });

const wait = (ms: number) => fromPromise(() => sleep(ms));

const ignoreError = <A, R,>(effect: Effect.Effect<A, Error, R>) =>
  Effect.catchAll(
    Effect.map(effect, () => undefined),
    () => Effect.succeed(undefined),
  );

const log = (message: string) =>
  Effect.sync(() => {
    console.log(message);
  });

function getEarlyContentPreview(content: string): string {
  return content.slice(0, EARLY_CONTENT_CHAR_LIMIT).trim();
}

function hashContent(
  title: string,
  description: string | undefined,
  earlyContentPreview: string,
): string {
  return createHash("md5")
    .update([title, description ?? "", earlyContentPreview].join("|"))
    .digest("hex");
}

function loadManifest() {
  return Effect.catchAll(
    fromThrowable(() => {
      if (!Fs.existsSync(MANIFEST_PATH)) {
        return {} as Manifest;
      }

      return JSON.parse(Fs.readFileSync(MANIFEST_PATH, "utf-8")) as Manifest;
    }),
    // Corrupted manifest, start fresh.
    () => Effect.succeed({} as Manifest),
  );
}

function saveManifest(manifest: Manifest) {
  return fromThrowable(() => {
    Fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  });
}

function getPostsWithHashes() {
  return Effect.map(fromPromise(getPublishedBlogPosts), (posts) =>
    posts.map((post) => ({
      slug: post.slug,
      hash: hashContent(
        post.title,
        post.description,
        getEarlyContentPreview(post.content),
      ),
    })),
  );
}

function waitForServer(url: string, maxAttempts = 30): Effect.Effect<void, Error> {
  const attempt = (remainingAttempts: number): Effect.Effect<void, Error> => {
    if (remainingAttempts <= 0) {
      return Effect.fail(new Error("Server did not start in time"));
    }

    return Effect.flatMap(
      Effect.catchAll(fromPromise(() => fetch(url)), () =>
        Effect.succeed<Response | null>(null),
      ),
      (response) =>
        response?.ok
          ? Effect.succeed(undefined)
          : Effect.flatMap(wait(1000), () => attempt(remainingAttempts - 1)),
    );
  };

  return attempt(maxAttempts);
}

function ensureOutputDirectory() {
  return fromThrowable(() => {
    if (!Fs.existsSync(OUTPUT_DIR)) {
      Fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }
  });
}

function cleanOutputDirectory() {
  return Effect.flatMap(
    fromThrowable(() => {
      if (!Fs.existsSync(OUTPUT_DIR)) {
        return false;
      }

      for (const file of Fs.readdirSync(OUTPUT_DIR)) {
        if (file.endsWith(".png") || file === ".manifest.json") {
          Fs.unlinkSync(Path.join(OUTPUT_DIR, file));
        }
      }

      return true;
    }),
    (didClean) => (didClean ? log("Cleaned up existing OG images.\n") : Effect.succeed(undefined)),
  );
}

function loadPlaywright(): Effect.Effect<PlaywrightModule, Error> {
  return Effect.catchAll(fromPromise(() => import("playwright")), () =>
    Effect.fail(new Error("Playwright not found")),
  );
}

function startServer() {
  return fromThrowable(() => {
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
  });
}

function stopServer(server: ChildProcess) {
  return Effect.flatMap(log("Stopping server..."), () =>
    Effect.flatMap(
      ignoreError(
        fromThrowable(() => {
          server.kill("SIGTERM");
        }),
      ),
      () =>
        Effect.flatMap(ignoreError(wait(1000)), () =>
          ignoreError(
            fromThrowable(() => {
              server.kill("SIGKILL");
            }),
          ),
        ),
    ),
  );
}

function closePage(page: Page) {
  return ignoreError(fromPromise(() => page.close()));
}

function closeContext(context: BrowserContext) {
  return ignoreError(fromPromise(() => context.close()));
}

function closeBrowser(browser: Browser) {
  return ignoreError(fromPromise(() => browser.close()));
}

function openPage(context: BrowserContext) {
  return fromPromise(() => context.newPage());
}

function captureScreenshot({
  post,
  page,
  manifest,
}: {
  post: PostWithHash;
  page: Page;
  manifest: Manifest;
}) {
  const url = `${BASE_URL}/blog/${post.slug}`;
  const outputPath = Path.join(OUTPUT_DIR, `${post.slug}.png`);

  return Effect.flatMap(
    fromPromise(() => page.goto(url, { waitUntil: "networkidle", timeout: 30000 })),
    () =>
      Effect.flatMap(wait(500), () =>
        Effect.flatMap(
          fromPromise(() =>
            page.evaluate(() => {
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
            }),
          ),
          () =>
            Effect.flatMap(wait(500), () =>
              Effect.flatMap(
                fromPromise(() =>
                  page.screenshot({
                    path: outputPath,
                    type: "png",
                    clip: { x: 0, y: TOP_OFFSET, width: OG_WIDTH, height: OG_HEIGHT },
                  }),
                ),
                () =>
                  Effect.flatMap(
                    Effect.sync(() => {
                      manifest[post.slug] = post.hash;
                    }),
                    () => log(`  ✓ Saved: ${outputPath}`),
                  ),
              ),
            ),
        ),
      ),
  );
}

function screenshotPost({
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
}): Effect.Effect<ScreenshotResult, Error> {
  return Effect.catchAll(
    Effect.map(captureScreenshot({ post, page, manifest }), () => ({
      page,
      success: true,
    } satisfies ScreenshotResult)),
    (error) => {
      if (retryCount < 2) {
        return Effect.flatMap(
          log(`  ⟳ Retrying: ${post.slug} (attempt ${retryCount + 2}/3)`),
          () =>
            Effect.flatMap(openPage(context), (freshPage) =>
              Effect.flatMap(closePage(page), () =>
                screenshotPost({
                  post,
                  page: freshPage,
                  context,
                  manifest,
                  failed,
                  retryCount: retryCount + 1,
                }),
              ),
            ),
        );
      }

      return Effect.sync(() => {
        console.error(`  ✗ Failed: ${post.slug}`, error.message);
        failed.push(post.slug);
        return { page, success: false } satisfies ScreenshotResult;
      });
    },
  );
}

function selectRequestedPosts(posts: PostWithHash[]): Effect.Effect<PostWithHash[], Error> {
  return fromThrowable(() => {
    if (!SINGLE_SLUG) {
      return posts;
    }

    const singlePost = posts.find((post) => post.slug === SINGLE_SLUG);

    if (!singlePost) {
      console.error(`Post not found: ${SINGLE_SLUG}`);
      console.log("\nAvailable slugs:");

      for (const post of posts) {
        console.log(`  - ${post.slug}`);
      }

      throw new Error(`Unknown slug: ${SINGLE_SLUG}`);
    }

    console.log(`Generating single OG image for: ${SINGLE_SLUG}\n`);
    return [singlePost];
  });
}

function resolvePostsToGenerate(
  posts: PostWithHash[],
  manifest: Manifest,
): Effect.Effect<PostWithHash[], Error> {
  return fromThrowable(() =>
    FORCE_REGENERATE || SINGLE_SLUG
      ? posts
      : posts.filter((post) => {
          const cachedHash = manifest[post.slug];
          const imageExists = Fs.existsSync(
            Path.join(OUTPUT_DIR, `${post.slug}.png`),
          );

          return cachedHash !== post.hash || !imageExists;
        }),
  );
}

function runPosts({
  posts,
  context,
  manifest,
  failed,
  page,
  index = 0,
}: {
  posts: PostWithHash[];
  context: BrowserContext;
  manifest: Manifest;
  failed: string[];
  page: Page;
  index?: number;
}): Effect.Effect<Page, Error> {
  if (index >= posts.length) {
    return Effect.succeed(page);
  }

  const post = posts[index];

  if (!post) {
    return Effect.succeed(page);
  }

  return Effect.flatMap(log(`Generating: ${post.slug}`), () =>
    Effect.flatMap(
      screenshotPost({ post, page, context, manifest, failed }),
      (result) =>
        Effect.flatMap(
          result.success ? Effect.succeed(result.page) : openPage(context),
          (nextPage) =>
            runPosts({
              posts,
              context,
              manifest,
              failed,
              page: nextPage,
              index: index + 1,
            }),
        ),
    ),
  );
}

function finalizeGeneration({
  posts,
  postsToGenerate,
  manifest,
  failed,
}: {
  posts: PostWithHash[];
  postsToGenerate: PostWithHash[];
  manifest: Manifest;
  failed: string[];
}) {
  return Effect.flatMap(
    Effect.sync(() => {
      for (const post of posts) {
        if (!manifest[post.slug]) {
          manifest[post.slug] = post.hash;
        }
      }
    }),
    () =>
      Effect.flatMap(saveManifest(manifest), () =>
        Effect.sync(() => {
          const successCount = postsToGenerate.length - failed.length;
          console.log(`\nDone! Generated ${successCount}/${postsToGenerate.length} OG images.`);

          if (failed.length > 0) {
            console.log(`\nFailed posts (${failed.length}):`);
            for (const slug of failed) {
              console.log(`  - ${slug}`);
            }
            console.log("\nRun again to retry failed posts.");
          }
        }),
      ),
  );
}

function generateOGImages(): Effect.Effect<void, Error> {
  return Effect.scoped(
    Effect.flatMap(ensureOutputDirectory(), () =>
      Effect.flatMap(
        FORCE_REGENERATE ? cleanOutputDirectory() : Effect.succeed(undefined),
        () =>
          Effect.flatMap(
            FORCE_REGENERATE ? Effect.succeed({} as Manifest) : loadManifest(),
            (manifest) =>
              Effect.flatMap(getPostsWithHashes(), (allPosts) =>
                Effect.flatMap(selectRequestedPosts(allPosts), (posts) =>
                  Effect.flatMap(resolvePostsToGenerate(posts, manifest), (postsToGenerate) => {
                    const forceLogEffect =
                      FORCE_REGENERATE && !SINGLE_SLUG
                        ? log("Force regenerating all OG images...")
                        : Effect.succeed(undefined);

                    return Effect.flatMap(forceLogEffect, () => {
                      if (postsToGenerate.length === 0) {
                        return log("All OG images are up to date!");
                      }

                      return Effect.flatMap(
                        log(
                          `Found ${postsToGenerate.length} posts to generate (${posts.length - postsToGenerate.length} cached)`,
                        ),
                        () =>
                          Effect.flatMap(loadPlaywright(), (playwright) =>
                            Effect.flatMap(
                              Effect.acquireRelease(startServer(), stopServer),
                              () =>
                                Effect.flatMap(log("Waiting for server to be ready..."), () =>
                                  Effect.flatMap(waitForServer(BASE_URL), () =>
                                    Effect.flatMap(log("Server is ready!\n"), () =>
                                      Effect.flatMap(
                                        Effect.acquireRelease(
                                          fromPromise(() =>
                                            playwright.chromium.launch({ headless: true }),
                                          ),
                                          closeBrowser,
                                        ),
                                        (browser) =>
                                          Effect.flatMap(
                                            Effect.acquireRelease(
                                              fromPromise(() =>
                                                browser.newContext({
                                                  viewport: {
                                                    width: OG_WIDTH,
                                                    height: OG_HEIGHT + TOP_OFFSET,
                                                  },
                                                  deviceScaleFactor: 3,
                                                }),
                                              ),
                                              closeContext,
                                            ),
                                            (context) => {
                                              const newManifest: Manifest = { ...manifest };
                                              const failed: string[] = [];

                                              return Effect.flatMap(openPage(context), (page) =>
                                                Effect.flatMap(
                                                  runPosts({
                                                    posts: postsToGenerate,
                                                    context,
                                                    manifest: newManifest,
                                                    failed,
                                                    page,
                                                  }),
                                                  () =>
                                                    finalizeGeneration({
                                                      posts,
                                                      postsToGenerate,
                                                      manifest: newManifest,
                                                      failed,
                                                    }),
                                                ),
                                              );
                                            },
                                          ),
                                      ),
                                    ),
                                  ),
                                ),
                            ),
                          ),
                      );
                    });
                  }),
                ),
              ),
          ),
      ),
    ),
  );
}

void Effect.runPromise(
  Effect.catchAll(generateOGImages(), (error) =>
    Effect.sync(() => {
      console.error("Error generating OG images:", error);
      process.exit(1);
    }),
  ),
);
