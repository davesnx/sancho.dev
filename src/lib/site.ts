import type { Metadata } from 'next';

export const siteConfig = {
  siteUrl: 'https://sancho.dev',
  siteName: 'sancho.dev',
  authorName: 'David Sancho',
  twitter: '@davesnx',
  feedUrl: 'https://sancho.dev/rss.xml',
  description:
    'Open Source UI infra at @ahrefs with OCaml. Made styled-ppx and server-reason-react. Working on reason-react, Melange, Reason.',
  verification: {
    ahrefs: 'e9ca7385f25c8be91c3030a42bb760b5c9f23a9e43e6dce7a5f3409951c4572d',
  },
} as const;

export type MetadataKind = 'article' | 'website' | 'webpage';

export type PageMetadataInput = {
  title: string;
  description?: string;
  path?: string;
  canonicalUrl?: string;
  slug?: string;
  publishedAt?: string;
  kind?: MetadataKind;
  noIndex?: boolean;
};

export const absoluteUrl = (path = '/') => new URL(path, siteConfig.siteUrl).toString();

export const getSocialImage = ({ slug }: { slug?: string }) => {
  if (slug) {
    return absoluteUrl(`/og/${slug}.png`);
  }

  return absoluteUrl('/og/default.png');
};

export const buildMetadata = ({
  title,
  description = siteConfig.description,
  path = '/',
  canonicalUrl,
  slug,
  publishedAt,
  kind = 'webpage',
  noIndex = false,
}: PageMetadataInput): Metadata => {
  const resolvedCanonical = canonicalUrl ?? absoluteUrl(path);
  const image = getSocialImage({ slug });
  const isArticle = kind === 'article';

  return {
    title,
    description,
    alternates: {
      canonical: resolvedCanonical,
    },
    robots: noIndex
      ? {
          index: false,
          follow: true,
        }
      : undefined,
    authors: [
      {
        name: siteConfig.authorName,
        url: absoluteUrl('/about'),
      },
    ],
    openGraph: {
      title,
      description,
      url: resolvedCanonical,
      siteName: siteConfig.siteName,
      type: isArticle ? 'article' : 'website',
      locale: 'en_US',
      images: [
        {
          url: image,
          alt: title,
        },
      ],
      ...(publishedAt ? { publishedTime: publishedAt } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      site: siteConfig.twitter,
      creator: siteConfig.twitter,
      title,
      description,
      images: [image],
    },
  };
};

export const buildArticleJsonLd = ({
  title,
  description,
  url,
  image,
  publishedAt,
}: {
  title: string;
  description: string;
  url: string;
  image: string;
  publishedAt?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: title,
  description,
  url,
  mainEntityOfPage: url,
  image: [image],
  author: {
    '@type': 'Person',
    name: siteConfig.authorName,
    url: absoluteUrl('/about'),
  },
  publisher: {
    '@type': 'Person',
    name: siteConfig.authorName,
    url: siteConfig.siteUrl,
  },
  ...(publishedAt
    ? {
        datePublished: publishedAt,
        dateModified: publishedAt,
      }
    : {}),
  isPartOf: {
    '@type': 'WebSite',
    name: siteConfig.siteName,
    url: siteConfig.siteUrl,
  },
});
