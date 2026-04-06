import { getPages } from "./get-pages.mts";

export const generateSitemap = async (): Promise<string> => {
  const { blog, pages } = await getPages();
  const allPages = [...blog, ...pages];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${allPages
    .map((page) => {
      const publishedAt = "publishedAt" in page ? page.publishedAt : undefined;

      if (publishedAt) {
        return `  <url><loc>https://sancho.dev${page.route}</loc><lastmod>${publishedAt}</lastmod></url>`;
      }

      return `  <url><loc>https://sancho.dev${page.route}</loc></url>`;
    })
    .join("\n")}
</urlset>
`;
};
