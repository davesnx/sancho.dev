import Path from "path";
import { fileURLToPath } from "url";
import Fs from "fs/promises";
import { generateRSS } from "./rss.mjs";
import { generateSitemap } from "./sitemap.mjs";
const root = Path.dirname(fileURLToPath(import.meta.url));

(async function postbuild() {
  const sitemap_path = Path.join(root, "..", "public/sitemap.xml");
  const rss_path = Path.join(root, "..", "public/rss.xml");
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
})();
