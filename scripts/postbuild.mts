import Fs from "node:fs/promises";
import Path from "node:path";
import { fileURLToPath } from "node:url";
import { generateLLMsTxt, generateMarkdownFiles } from "./llms.mts";
import { generateRSS } from "./rss.mts";
import { generateSitemap } from "./sitemap.mts";

const root = Path.dirname(fileURLToPath(import.meta.url));

const exitWithError = (message: string, error: unknown): never => {
  console.log(message);
  console.error(error);
  process.exit(1);
};

const runStep = async <T,>(
  message: string,
  action: () => Promise<T>,
): Promise<T> => {
  try {
    return await action();
  } catch (error) {
    return exitWithError(message, error);
  }
};

const postbuild = async (): Promise<void> => {
  const outDir = Path.join(root, "..", "out");
  const sitemapPath = Path.join(outDir, "sitemap.xml");
  const rssPath = Path.join(outDir, "rss.xml");
  const llmsPath = Path.join(outDir, "llms.txt");

  const sitemap = await runStep("can't generate sitemap", generateSitemap);
  await runStep(`${sitemapPath} can't be generate`, () =>
    Fs.writeFile(sitemapPath, sitemap),
  );

  const rss = await runStep("can't generate rss.xml", generateRSS);
  await runStep("rss.xml can't be generate", () => Fs.writeFile(rssPath, rss));

  const llmsTxt = await runStep("can't generate llms.txt", generateLLMsTxt);
  await runStep("llms.txt can't be generate", () =>
    Fs.writeFile(llmsPath, llmsTxt),
  );

  await runStep("can't generate markdown files", () => generateMarkdownFiles(outDir));
};

void postbuild();
