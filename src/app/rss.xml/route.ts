import { getPublishedPosts } from "@/posts";

export const dynamic = "force-static";

export function GET() {
  const posts = getPublishedPosts();

  const items = posts
    .map(
      (post) => `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <description><![CDATA[${post.description}]]></description>
        <link>https://sancho.dev/blog/${post.slug}</link>
        <guid>https://sancho.dev/blog/${post.slug}</guid>
        <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>sancho.dev</title>
    <description>sancho.dev | davesnx's personal blog</description>
    <link>https://sancho.dev</link>
    <language>en</language>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
