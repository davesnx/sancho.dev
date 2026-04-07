import { spawn, type ChildProcess } from 'node:child_process';
import { createHash } from 'node:crypto';
import Fs from 'node:fs';
import Path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Browser, BrowserContext, Page } from 'playwright';
import { getPublishedBlogPosts } from './get-pages.mts';

interface PostWithHash {
  slug: string;
  hash: string;
}

interface ScreenshotResult {
  page: Page;
  success: boolean;
}

type Manifest = Record<string, string>;
type PlaywrightModule = typeof import('playwright');

const __dirname = Path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = Path.resolve(__dirname, '..');
const OUTPUT_DIR = Path.join(ROOT_DIR, 'public', 'og');
const MANIFEST_PATH = Path.join(OUTPUT_DIR, '.manifest.json');
const DEFAULT_OUTPUT_PATH = Path.join(OUTPUT_DIR, 'default.png');
const PORT = 3006;
const BASE_URL = `http://localhost:${PORT}`;
const FORCE_REGENERATE = process.argv.includes('--force');
const DEFAULT_ONLY = process.argv.includes('--default-only');
const SINGLE_SLUG = process.argv.find((arg) => arg.startsWith('--slug='))?.split('=')[1];

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const TOP_OFFSET = 150;
const EARLY_CONTENT_CHAR_LIMIT = 4000;
const AVATAR_URL = 'https://avatars.githubusercontent.com/u/3763599?v=4';
const FOOTER_NAME_FONT_SIZE = 20;
const FOOTER_HANDLE_FONT_SIZE = 16;
const FOOTER_URL_FONT_SIZE = 18;

const toError = (error: unknown): Error => (error instanceof Error ? error : new Error(String(error)));

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

async function ignoreErrors(operation: () => void | Promise<void>) {
  try {
    await operation();
  } catch {
    // Best effort cleanup only.
  }
}

function getOgFooterMarkup() {
  return `
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
          src="${AVATAR_URL}"
          style="width: 56px; height: 56px; border-radius: 50%;"
        />
        <div style="display: flex; flex-direction: column; gap: 6px;">
          <span style="color: #FAFAFA; font-family: system-ui; font-weight: 600; font-size: ${FOOTER_NAME_FONT_SIZE}px; margin: 0; padding: 0; line-height: 1;">
            David Sancho
          </span>
          <span style="color: #848686; font-family: system-ui; font-size: ${FOOTER_HANDLE_FONT_SIZE}px; margin: 0; padding: 0; line-height: 1;">
            @davesnx
          </span>
        </div>
      </div>
      <div style="
        font-family: system-ui;
        font-weight: 500;
        font-size: ${FOOTER_URL_FONT_SIZE}px;
      ">
        <span style="color: #848686;">https://</span><span style="color: #FAFAFA;">sancho.dev</span>
      </div>
    </div>
  `;
}

function getEarlyContentPreview(content: string): string {
  return content.slice(0, EARLY_CONTENT_CHAR_LIMIT).trim();
}

function hashContent(title: string, description: string | undefined, earlyContentPreview: string): string {
  return createHash('md5')
    .update([title, description ?? '', earlyContentPreview].join('|'))
    .digest('hex');
}

function loadManifest(): Manifest {
  try {
    if (!Fs.existsSync(MANIFEST_PATH)) {
      return {};
    }

    return JSON.parse(Fs.readFileSync(MANIFEST_PATH, 'utf-8')) as Manifest;
  } catch {
    return {};
  }
}

function saveManifest(manifest: Manifest) {
  Fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
}

async function getPostsWithHashes(): Promise<PostWithHash[]> {
  const posts = await getPublishedBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
    hash: hashContent(post.title, post.description, getEarlyContentPreview(post.content)),
  }));
}

async function waitForServer(url: string, maxAttempts = 30): Promise<void> {
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const response = await fetch(url);

      if (response.ok) {
        return;
      }
    } catch {
      // Server is still starting.
    }

    if (attempt < maxAttempts) {
      await sleep(1000);
    }
  }

  throw new Error('Server did not start in time');
}

function ensureOutputDirectory() {
  if (!Fs.existsSync(OUTPUT_DIR)) {
    Fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
}

function cleanOutputDirectory() {
  if (!Fs.existsSync(OUTPUT_DIR)) {
    return;
  }

  for (const file of Fs.readdirSync(OUTPUT_DIR)) {
    if (file.endsWith('.png') || file === '.manifest.json') {
      Fs.unlinkSync(Path.join(OUTPUT_DIR, file));
    }
  }

  console.log('Cleaned up existing OG images.\n');
}

async function loadPlaywright(): Promise<PlaywrightModule> {
  try {
    return await import('playwright');
  } catch {
    throw new Error('Playwright not found');
  }
}

function startServer(): ChildProcess {
  console.log('Starting Next.js server...');

  const server = spawn('npm', ['run', 'dev', '--', '-p', PORT.toString()], {
    cwd: ROOT_DIR,
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: true,
  });

  server.stdout?.on('data', (data: Buffer) => {
    console.log(data.toString());
  });

  server.stderr?.on('data', (data: Buffer) => {
    console.error(data.toString());
  });

  return server;
}

async function stopServer(server: ChildProcess) {
  console.log('Stopping server...');
  await ignoreErrors(() => {
    server.kill('SIGTERM');
  });
  await ignoreErrors(() => sleep(1000));
  await ignoreErrors(() => {
    server.kill('SIGKILL');
  });
}

async function safeClosePage(page: Page) {
  await ignoreErrors(() => page.close());
}

async function safeCloseContext(context: BrowserContext) {
  await ignoreErrors(() => context.close());
}

async function safeCloseBrowser(browser: Browser) {
  await ignoreErrors(() => browser.close());
}

function openPage(context: BrowserContext) {
  return context.newPage();
}

async function replacePage(context: BrowserContext, page: Page): Promise<Page> {
  const freshPage = await openPage(context);
  await safeClosePage(page);
  return freshPage;
}

async function withBrowserContext<T>(
  playwright: PlaywrightModule,
  viewportHeight: number,
  operation: (context: BrowserContext) => Promise<T>,
): Promise<T> {
  const browser = await playwright.chromium.launch({ headless: true });

  try {
    const context = await browser.newContext({
      viewport: {
        width: OG_WIDTH,
        height: viewportHeight,
      },
      deviceScaleFactor: 3,
    });

    try {
      return await operation(context);
    } finally {
      await safeCloseContext(context);
    }
  } finally {
    await safeCloseBrowser(browser);
  }
}

async function withDevServer<T>(operation: () => Promise<T>): Promise<T> {
  const server = startServer();

  try {
    console.log('Waiting for server to be ready...');
    await waitForServer(BASE_URL);
    console.log('Server is ready!\n');
    return await operation();
  } finally {
    await stopServer(server);
  }
}

async function captureScreenshot({ post, page, manifest }: { post: PostWithHash; page: Page; manifest: Manifest }) {
  const url = `${BASE_URL}/blog/${post.slug}`;
  const outputPath = Path.join(OUTPUT_DIR, `${post.slug}.png`);
  const footerMarkup = getOgFooterMarkup();

  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  await sleep(500);

  await page.evaluate((markup) => {
    const overlay = document.createElement('div');
    overlay.innerHTML = markup;
    document.body.appendChild(overlay);
  }, footerMarkup);

  await sleep(500);
  await page.screenshot({
    path: outputPath,
    type: 'png',
    clip: { x: 0, y: TOP_OFFSET, width: OG_WIDTH, height: OG_HEIGHT },
  });

  manifest[post.slug] = post.hash;
  console.log(`  ✓ Saved: ${outputPath}`);
}

async function captureDefaultScreenshot(page: Page) {
  const footerMarkup = getOgFooterMarkup();

  await page.setContent(
    `
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <style>
            :root {
              color-scheme: dark;
            }

            * {
              box-sizing: border-box;
            }

            html,
            body {
              width: 100%;
              height: 100%;
              margin: 0;
            }

            body {
              position: relative;
              overflow: hidden;
              background:
                radial-gradient(circle at 50% 112%, rgba(250, 250, 250, 0.08) 0%, rgba(250, 250, 250, 0.02) 18%, transparent 42%),
                linear-gradient(180deg, #141414 0%, #111111 100%);
              color: #fafafa;
            }

          </style>
        </head>
        <body>${footerMarkup}</body>
      </html>
    `,
    { waitUntil: 'networkidle' },
  );

  await page.screenshot({
    path: DEFAULT_OUTPUT_PATH,
    type: 'png',
  });

  console.log(`  ✓ Saved: ${DEFAULT_OUTPUT_PATH}`);
}

async function screenshotPost({
  post,
  page,
  context,
  manifest,
  failed,
}: {
  post: PostWithHash;
  page: Page;
  context: BrowserContext;
  manifest: Manifest;
  failed: string[];
}): Promise<ScreenshotResult> {
  let currentPage = page;

  for (let retryCount = 0; retryCount <= 2; retryCount += 1) {
    try {
      await captureScreenshot({ post, page: currentPage, manifest });
      return { page: currentPage, success: true };
    } catch (error) {
      if (retryCount < 2) {
        console.log(`  ⟳ Retrying: ${post.slug} (attempt ${retryCount + 2}/3)`);
        currentPage = await replacePage(context, currentPage);
        continue;
      }

      console.error(`  ✗ Failed: ${post.slug}`, toError(error).message);
      failed.push(post.slug);
      return { page: currentPage, success: false };
    }
  }

  return { page: currentPage, success: false };
}

function selectRequestedPosts(posts: PostWithHash[]): PostWithHash[] {
  if (!SINGLE_SLUG) {
    return posts;
  }

  const singlePost = posts.find((post) => post.slug === SINGLE_SLUG);

  if (!singlePost) {
    console.error(`Post not found: ${SINGLE_SLUG}`);
    console.log('\nAvailable slugs:');

    for (const post of posts) {
      console.log(`  - ${post.slug}`);
    }

    throw new Error(`Unknown slug: ${SINGLE_SLUG}`);
  }

  console.log(`Generating single OG image for: ${SINGLE_SLUG}\n`);
  return [singlePost];
}

function resolvePostsToGenerate(posts: PostWithHash[], manifest: Manifest): PostWithHash[] {
  if (FORCE_REGENERATE || SINGLE_SLUG) {
    return posts;
  }

  return posts.filter((post) => {
    const cachedHash = manifest[post.slug];
    const imageExists = Fs.existsSync(Path.join(OUTPUT_DIR, `${post.slug}.png`));

    return cachedHash !== post.hash || !imageExists;
  });
}

async function runPosts({
  posts,
  context,
  manifest,
  failed,
}: {
  posts: PostWithHash[];
  context: BrowserContext;
  manifest: Manifest;
  failed: string[];
}) {
  let page = await openPage(context);

  try {
    for (const [index, post] of posts.entries()) {
      console.log(`Generating: ${post.slug}`);

      const result = await screenshotPost({
        post,
        page,
        context,
        manifest,
        failed,
      });

      page = result.page;

      if (!result.success && index < posts.length - 1) {
        page = await replacePage(context, page);
      }
    }
  } finally {
    await safeClosePage(page);
  }
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
  for (const post of posts) {
    if (!manifest[post.slug]) {
      manifest[post.slug] = post.hash;
    }
  }

  saveManifest(manifest);

  const successCount = postsToGenerate.length - failed.length;
  console.log(`\nDone! Generated ${successCount}/${postsToGenerate.length} OG images.`);

  if (failed.length > 0) {
    console.log(`\nFailed posts (${failed.length}):`);

    for (const slug of failed) {
      console.log(`  - ${slug}`);
    }

    console.log('\nRun again to retry failed posts.');
  }
}

async function generateDefaultOGImage() {
  console.log('Generating default OG image...');

  const playwright = await loadPlaywright();
  await withBrowserContext(playwright, OG_HEIGHT, async (context) => {
    const page = await openPage(context);

    try {
      await captureDefaultScreenshot(page);
    } finally {
      await safeClosePage(page);
    }
  });

  console.log('\nDone! Generated 1/1 OG images.');
}

async function generatePostOGImages() {
  if (FORCE_REGENERATE) {
    cleanOutputDirectory();
  }

  const manifest = FORCE_REGENERATE ? {} : loadManifest();
  const allPosts = await getPostsWithHashes();
  const posts = selectRequestedPosts(allPosts);
  const postsToGenerate = resolvePostsToGenerate(posts, manifest);

  if (FORCE_REGENERATE && !SINGLE_SLUG) {
    console.log('Force regenerating all OG images...');
  }

  if (postsToGenerate.length === 0) {
    console.log('All OG images are up to date!');
    return;
  }

  console.log(`Found ${postsToGenerate.length} posts to generate (${posts.length - postsToGenerate.length} cached)`);

  const playwright = await loadPlaywright();
  const nextManifest: Manifest = { ...manifest };
  const failed: string[] = [];

  await withDevServer(async () => {
    await withBrowserContext(playwright, OG_HEIGHT + TOP_OFFSET, async (context) => {
      await runPosts({
        posts: postsToGenerate,
        context,
        manifest: nextManifest,
        failed,
      });
    });
  });

  finalizeGeneration({
    posts,
    postsToGenerate,
    manifest: nextManifest,
    failed,
  });
}

async function generateOGImages() {
  ensureOutputDirectory();

  if (DEFAULT_ONLY) {
    await generateDefaultOGImage();
    return;
  }

  await generatePostOGImages();
}

void generateOGImages().catch((error) => {
  console.error('Error generating OG images:', toError(error));
  process.exit(1);
});
