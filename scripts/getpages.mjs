import Fs from "fs";

import globby from "globby";
import matter from "gray-matter";

let getJsPages = async () => {
  let pages = await globby([
    "src/pages/*.js",
    "src/pages/*.tsx",
    "!src/pages/_*.js",
    "!src/pages/_*.tsx",
    "!src/pages/api",
  ]);

  return pages
    .map((page) => {
      if (
        page.search("pages/404.") > -1 ||
        page.search(`pages/blog/[...slug].`) > -1
      ) {
        return null;
      }
      return {
        route: page
          .replace("src/pages/", "/")
          .replace(".js", "")
          .replace(".jsx", "")
          .replace(".ts", "")
          .replace(".tsx", ""),
      };
    })
    .filter(Boolean);
};

let getBlogPages = async () => {
  let mdxPages = await globby([
    "src/pages/*.js",
    "src/pages/*.tsx",
    "src/content/posts/**/*.mdx",
    "src/content/posts/**/*.md",
    "src/public/tags/**/*.xml",
    "!src/pages/_*.js",
    "!src/pages/_*.tsx",
    "!src/pages/api",
  ]);

  return mdxPages
    .filter((page) => page.search(".md") >= 1 && Fs.existsSync(page))
    .map((page) => {
      // Exclude drafts from the sitemap
      let source = Fs.readFileSync(page, "utf8");
      let fm = matter(source);

      if (fm.data.draft) {
        return null;
      }
      if (fm.data.canonicalUrl) {
        return null;
      }

      let path = page
        .replace("pages/", "/")
        .replace("src//", "/")
        .replace("src/content/posts/", "/blog/")
        .replace("public/", "/")
        .replace(".js", "")
        .replace(".tsx", "")
        .replace(".mdx", "")
        .replace(".md", "");

      let route = path === "/index" ? "" : path;

      if (
        page.search("pages/404.") > -1 ||
        page.search(`pages/blog/[...slug].`) > -1
      ) {
        return null;
      }

      if (fm.data.publishedAt) {
        return {
          route,
          ...fm.data,
        };
      }
      return { route };
    })
    .filter(Boolean);
};

export let getPages = async () => {
  const blogPages = await getBlogPages();
  const jsPages = await getJsPages();
  return { blog: blogPages, pages: jsPages };
};
