import Fs from "node:fs";
import { globby } from "globby";
import matter from "gray-matter";

export interface StaticPage {
  route: string;
}

export interface BlogPostFrontmatter {
  title?: string;
  description?: string;
  publishedAt?: string;
  tags?: string[];
  draft?: boolean;
  canonicalUrl?: string;
  published?: boolean;
}

export interface BlogPostPage extends StaticPage {
  slug: string;
  sourcePath: string;
  content: string;
  title?: string;
  description: string;
  publishedAt?: string;
  tags: string[];
  draft?: boolean;
  canonicalUrl?: string;
  published?: boolean;
}

export interface PublishedBlogPost extends BlogPostPage {
  title: string;
  publishedAt: string;
}

export const getAboutContent = (): string => `
Hi, I'm David. A software engineer based in Barcelona, who spends the cold winter in the Pyrenees. My work bridges functional programming, web technologies and maintanability; by focusing on creating better developer tools and experiences with [Reason](http://reasonml.github.io/) and [OCaml](https://ocaml.org/).

I believe that the recipe for creating maintainable and powerful software lies in designing with clarity, sound architecture, and embracing the iterative nature of development. Currently working at [ahrefs](https://ahrefs.com/), primarily building developer tooling to help create nice UIs, also maintaining several Open Source projects in the Reason ecosystem, such as [reason-react](https://github.com/reasonml/reason-react), [server-reason-react](https://github.com/ml-in-barcelona/server-reason-react) and [styled-ppx](https://github.com/davesnx/styled-ppx).

I also contribute to the broader Reason and Melange ecosystems and co-host [emelle.tv](https://www.twitch.tv/emelletv), where we explore ML-family languages and meet incredible authors from the ecosystem.

Previously, I helped build visual app development platforms at [Draftbit](https://draftbit.com) for a year and, even before, worked at [Typeform](https://www.typeform.com) for 5 years where I lead the form rendering engine.

Want to chat? DM me on [Twitter](https://x.com/davesnx) or [Bluesky](https://bsky.app/profile/david.sancho.dev)
`.trim();

const getString = (value: unknown): string | undefined =>
  typeof value === "string" && value.length > 0 ? value : undefined;

const getStringArray = (value: unknown): string[] =>
  Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];

const isExcludedPage = (page: string): boolean =>
  page.includes("pages/404.") || page.includes("pages/blog/[...slug].");

const getRequiredField = (
  post: BlogPostPage,
  field: "title" | "publishedAt",
): string => {
  const value = post[field];

  if (!value) {
    throw new Error(`Missing ${field} in ${post.sourcePath}`);
  }

  return value;
};

export const getJsPages = async (): Promise<StaticPage[]> => {
  const pages = await globby([
    "src/pages/*.js",
    "src/pages/*.tsx",
    "!src/pages/_*.js",
    "!src/pages/_*.tsx",
    "!src/pages/api",
  ]);

  return pages
    .map((page): StaticPage | null => {
      if (isExcludedPage(page)) {
        return null;
      }

      const route = page
        .replace("src/pages/", "/")
        .replace(".js", "")
        .replace(".jsx", "")
        .replace(".tsx", "")
        .replace(".ts", "");

      return {
        route: route === "/index" ? "/" : route.replace(/\/index$/, ""),
      };
    })
    .filter((page): page is StaticPage => page !== null);
};

export const getBlogPages = async (): Promise<BlogPostPage[]> => {
  const pages = await globby([
    "src/content/posts/**/*.mdx",
    "src/content/posts/**/*.md",
  ]);

  return pages
    .filter((page) => Fs.existsSync(page))
    .map((page) => {
      const source = Fs.readFileSync(page, "utf8");
      const { data, content } = matter(source);
      const frontmatter = data as BlogPostFrontmatter;
      const slug = page
        .replace("src/content/posts/", "")
        .replace(/\.(mdx|md)$/, "");

      return {
        slug,
        sourcePath: page,
        route: `/blog/${slug}`,
        content,
        title: getString(frontmatter.title),
        description: getString(frontmatter.description) ?? "",
        publishedAt: getString(frontmatter.publishedAt),
        tags: getStringArray(frontmatter.tags),
        draft: frontmatter.draft === true,
        canonicalUrl: getString(frontmatter.canonicalUrl),
        published: frontmatter.published,
      };
    });
};

export const getPublishedBlogPosts = async (): Promise<PublishedBlogPost[]> => {
  const posts = await getBlogPages();

  return posts
    .filter(
      (post) =>
        post.draft !== true &&
        post.published !== false &&
        !post.canonicalUrl,
    )
    .map((post) => ({
      ...post,
      title: getRequiredField(post, "title"),
      publishedAt: getRequiredField(post, "publishedAt"),
    }));
};

export const getPages = async (): Promise<{
  blog: PublishedBlogPost[];
  pages: StaticPage[];
}> => {
  const [blog, pages] = await Promise.all([getPublishedBlogPosts(), getJsPages()]);
  return { blog, pages };
};
