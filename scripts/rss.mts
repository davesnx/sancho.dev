import { compareDesc, parseISO } from "date-fns";
import { createRequire } from "node:module";
import { getPublishedBlogPosts } from "./get-pages.mts";

interface RSSItemOptions {
  title: string;
  description?: string;
  url: string;
  date: string;
}

interface RSSFeedInstance {
  item(item: RSSItemOptions): void;
  xml(options: { indent: boolean }): string;
}

type RSSFeedConstructor = new (options: {
  title: string;
  description: string;
  site_url: string;
  feed_url: string;
  copyright: string;
  language: string;
  pubDate: Date;
  generator: boolean;
}) => RSSFeedInstance;

const require = createRequire(import.meta.url);
const RSS = require("rss") as RSSFeedConstructor;

export const generateRSS = async (): Promise<string> => {
  const blog = await getPublishedBlogPosts();

  const feed = new RSS({
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
    .sort((a, b) => compareDesc(parseISO(a.publishedAt), parseISO(b.publishedAt)))
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
