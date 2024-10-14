/* eslint-disable */
const fs = require("fs");

const globby = require("globby");
const matter = require("gray-matter");

(async () => {
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

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages
      .map((page) => {
        let publishedAt = null;
        // Exclude drafts from the sitemap
        if (page.search(".md") >= 1 && fs.existsSync(page)) {
          let source = fs.readFileSync(page, "utf8");
          let fm = matter(source);

          publishedAt = fm.data.publishedAt;

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
          .replace("/feed.xml", "");
        let route = path === "/index" ? "" : path;

        if (
          page.search("pages/404.") > -1 ||
          page.search(`pages/blog/[...slug].`) > -1
        ) {
          return;
        }
        if (publishedAt) {
          return `  <url><loc>https://sancho.dev${route}</loc><lastmod>${publishedAt}</lastmod></url>`;
        }
        return `  <url><loc>https://sancho.dev${route}</loc></url>`;
      })
      .join("\n")}
</urlset>
`;

  // eslint-disable-next-line no-sync
  fs.unlinkSync("public/sitemap.xml");
  fs.writeFileSync("public/sitemap.xml", sitemap);
})();
