import Path from "path";
import { fileURLToPath } from "url";
import Fs from "fs/promises";
import { generateRSS } from "./rss.mjs";
import { generateSitemap } from "./sitemap.mjs";
import { generateLLMsTxt, generateMarkdownFiles } from "./llms.mjs";
const root = Path.dirname(fileURLToPath(import.meta.url));

(async function postbuild() {
  const out_dir = Path.join(root, "..", "out");
  const sitemap_path = Path.join(out_dir, "sitemap.xml");
  const rss_path = Path.join(out_dir, "rss.xml");
  let sitemap;
  try {
    sitemap = await generateSitemap();
  } catch (e) {
    console.log("can't generate sitemap");
    console.error(e);
    process.exit(1);
  }

  try {
    await Fs.writeFile(sitemap_path, sitemap);
  } catch (e) {
    console.log(sitemap_path + " can't be generate");
    console.error(e);
    process.exit(1);
  }
  const rss = await generateRSS();
  try {
    await Fs.writeFile(rss_path, rss);
  } catch (e) {
    console.log("rss.xml can't be generate");
    console.error(e);
    process.exit(1);
  }

  const llms_path = Path.join(out_dir, "llms.txt");
  let llmsTxt;
  try {
    llmsTxt = await generateLLMsTxt();
  } catch (e) {
    console.log("can't generate llms.txt");
    console.error(e);
    process.exit(1);
  }
  try {
    await Fs.writeFile(llms_path, llmsTxt);
  } catch (e) {
    console.log("llms.txt can't be generate");
    console.error(e);
    process.exit(1);
  }

  try {
    await generateMarkdownFiles(out_dir);
  } catch (e) {
    console.log("can't generate markdown files");
    console.error(e);
    process.exit(1);
  }
})();
