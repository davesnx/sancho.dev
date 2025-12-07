import { getPages } from "./get-pages.mjs";

export let generateSitemap = async () => {
  let { blog, pages } = await getPages();
  const allPages = [...blog, ...pages];

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${allPages
    .map(({ route, publishedAt }) => {
      if (publishedAt) {
        return `  <url><loc>https://sancho.dev${route}</loc><lastmod>${publishedAt}</lastmod></url>`;
      }
      return `  <url><loc>https://sancho.dev${route}</loc></url>`;
    })
    .join("\n")}
</urlset>
`;

  return sitemap;
};
