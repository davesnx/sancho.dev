import rss from "rss";
import { getPages } from "./get-pages.mjs";
import { compareDesc, parseISO } from "date-fns";

export let generateRSS = async () => {
  let { blog, pages: _ } = await getPages();

  const feed = new rss({
    title: "sancho.dev",
    description: "sancho.dev | davesnx's personal blog",
    site_url: "https://sancho.dev",
    feed_url: "https://sancho.dev/rss.xml",
    copyright: `${new Date().getFullYear()} sancho.dev`,
    language: "en",
    pubDate: new Date(),
    generator: false,
  });

  blog
    .sort((a, b) =>
      compareDesc(parseISO(a.publishedAt), parseISO(b.publishedAt)),
    )
    .forEach((page) => {
      feed.item({
        title: page.title,
        description: page.description,
        url: `https://sancho.dev${page.route}`,
        date: page.publishedAt,
      });
    });

  return feed.xml({ indent: true });
};
