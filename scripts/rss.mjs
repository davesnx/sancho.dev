/* eslint-disable */
import rss from "rss";
import { getPages } from "./getpages.mjs";

export let generateRSS = async () => {
  const feed = new rss({
    title: "sancho.dev",
    description: "sancho.dev | davesnx's personal blog",
    site_url: "https://sancho.dev",
    feed_url: "https://sancho.dev/rss.xml",
    copyright: `${new Date().getFullYear()} sancho.dev`,
    language: 'en',
    pubDate: new Date(),
  });

  let pages = await getPages();
  let blogPages = pages.filter((page) => page.route.includes("/blog/"));
  // sort reverse chronologically
  blogPages.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  blogPages.forEach((page) => {
    feed.item({
      title: page.title,
      description: page.description,
      url: `https://sancho.dev${page.route}`,
      date: page.publishedAt,
    });
  });

  return feed.xml({ indent: true });
};


