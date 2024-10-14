/* eslint-disable */
import fs from "fs";

import globby from "globby";
import matter from "gray-matter";

export let getPages = async () => {
  let pages = await globby([
    "src/pages/*.js",
    "src/pages/*.tsx",
    "src/content/posts/**/*.mdx",
    "src/content/posts/**/*.md",
    "src/public/tags/**/*.xml",
    "!src/pages/_*.js",
    "!src/pages/_*.tsx",
    "!src/pages/api",
  ]);

  return pages
    .map((page) => {
      let publishedAt = null;
      // Exclude drafts from the sitemap
      if (page.search(".md") >= 1 && fs.existsSync(page)) {
        let source = fs.readFileSync(page, "utf8");
        let fm = matter(source);

        if (fm.data.draft) {
          return;
        }
        if (fm.data.canonicalUrl) {
          return;
        }
      }
      let path = page
        .replace("pages/", "/")
        .replace("src//", "/")
        .replace("src/content/posts/", "/blog/")
        .replace("public/", "/")
        .replace(".js", "")
        .replace(".tsx", "")
        .replace(".mdx", "")
        .replace(".md", "")
      let route = path === "/index" ? "" : path;

      if (
        page.search("pages/404.") > -1 ||
        page.search(`pages/blog/[...slug].`) > -1
      ) {
        return;
      }
      if (publishedAt) {
        return { ...page, route, publishedAt };
      }
      return { ...page, route };
    })
    .filter(Boolean);
};
