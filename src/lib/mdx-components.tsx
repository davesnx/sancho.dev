import type { ComponentProps } from "react";
import type { MDXComponents } from "mdx/types";
import { css } from "@linaria/core";

import { MdxImage } from "@/components/mdx-image";
import { MelangePlayground } from "@/components/melange-playground";
import { H1, H2, H3, H4, H5, H6, Text, TextLink } from "@/components/ui";
import fonts from "@/theme/fonts";
import { colors } from "@/theme/theme";

const scrollOffsetTop = "5rem";

const headingContentClass = css`
  position: relative;
  display: inline;
`;

const anchorLinkClass = css`
  opacity: 0.2;
  position: absolute;
  right: calc(100% + 1rem);
  top: 0;
  color: ${colors.textTertiary};
  text-decoration: none;
  font-family: ${fonts.mono};
  font-weight: 800;
  line-height: inherit;
  white-space: nowrap;

  &:hover {
    color: ${colors.textSecondary};
  }

  @media screen and (max-width: 599px) {
    display: none;
  }
`;

const paragraphClass = css`
  font-family: ${fonts.sans};
  line-height: 1.85rem;
  color: ${colors.textProse};
  font-size: ${fonts.fontSize1};
  font-weight: 400;
  margin-bottom: 1.2rem;
  display: block;

  a {
    display: inline;
  }
`;

const hrClass = css`
  border-top-width: 2px;
  border-style: none;
  border-bottom-width: 0;
  margin-top: 2em;
  margin-bottom: 1.5em;
  width: 100%;
  padding: 0 2rem;
  background-color: ${colors.borderStrong};
  height: 3px;
`;

const blockquoteClass = css`
  margin: 32px;
  position: relative;
  padding: 0;
  margin-left: 24px;
  opacity: 0.6;

  &:before {
    content: "";
    position: absolute;
    margin-left: -24px;
    background-color: ${colors.borderStrong};
    width: 3px;
    height: 100%;
  }

  & p {
    margin: 0;
    font-style: italic;
    font-weight: 500;
  }
`;

const liClass = css`
  font-weight: 400;
  font-size: ${fonts.fontSize1};
  font-family: ${fonts.sans};
  line-height: 1.7;
  color: ${colors.textProse};
  display: list-item;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  margin-left: 1em;
  padding-left: 0.5em;
  letter-spacing: 0.02em;

  ::marker {
    color: ${colors.textSecondary};
  }

  & > a {
    display: inline;
  }
`;

const orderedListClass = css`
  margin: 24px 0;
  padding: 0;
  color: ${colors.textPrimary};
`;

const unorderedListClass = css`
  width: 100%;
  margin: 24px 0;
  padding: 0;
  color: ${colors.textPrimary};
`;

const tableClass = css`
  border-collapse: separate;
  border-spacing: 0 0;
  overflow-x: auto;
  max-width: 100%;
  display: inline-table;
  width: 100%;
  margin: 32px 0;
  font-family: ${fonts.sans};
  color: ${colors.textProse};
  line-height: 1.7142857;
  table-layout: auto;
  text-align: left;

  td {
    border-color: ${colors.borderSubtle};
    border-style: solid;
    border-bottom-width: 1px;
    border-top-width: 0;
    border-left-width: 1px;
    border-right-width: 0;
    padding: 0.75rem;
  }

  thead {
    border-bottom-width: 1px;
    border-style: solid;
  }

  th {
    background-color: ${colors.backgroundSecondary};
    border-color: ${colors.borderSubtle};
    border-bottom-width: 1px;
    border-left-width: 1px;
    border-top-width: 1px;
    border-right-width: 0;
    border-style: solid;
    padding: 0.75rem;
    vertical-align: bottom;
  }

  td:last-child {
    border-right-width: 1px;
  }

  th:first-of-type {
    border-top-left-radius: 0.375rem;
  }

  th:last-child {
    border-right-width: 1px;
    border-top-right-radius: 0.375rem;
  }

  tr:last-child td:first-of-type {
    border-bottom-left-radius: 0.375rem;
  }

  tr:last-child td:last-child {
    border-bottom-right-radius: 0.375rem;
  }

  @media screen and (max-width: 599px) {
    display: block;
  }
`;

const headingWrapClass = css`
  margin-top: var(--heading-margin-top);
  margin-bottom: 1rem;
  scroll-margin-top: ${scrollOffsetTop};
`;

const imageWrapClass = css`
  display: block;
  margin: 1rem 0 3rem 0;

    border-radius: 6px;
`;

const imageCaptionClass = css`
  display: block;
  margin-top: 0;
  text-align: left;
  font-family: ${fonts.sans};
  font-size: ${fonts.fontSizeN1};
  color: ${colors.textTertiary};
  font-style: italic;
`;

const preClass = css`
  display: block;
  margin: 1rem 0 3rem 0;
`;

const codeClass = css`
  font-family: ${fonts.mono};
  font-weight: 400;
  text-align: left;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  tab-size: 4;
  hyphens: none;
`;

const Anchor = ({ href = "", children, ...props }: ComponentProps<"a">) => (
  <TextLink href={href} {...props}>
    {children}
  </TextLink>
);

const createHeadingWithAnchor = (
  HeadingComponent: typeof H1,
  marginTop: string,
) => {
  const HeadingWithAnchor = ({ id, children, ...props }: ComponentProps<"h1"> & { id?: string }) => (
    <HeadingComponent className={headingWrapClass} style={{ ["--heading-margin-top" as string]: marginTop }} id={id} {...props}>
      <span className={headingContentClass}>
        {id ? (
          <a href={`#${id}`} aria-label={`Link to ${typeof children === "string" ? children : "section"}`} className={anchorLinkClass}>
            #
          </a>
        ) : null}
        {children}
      </span>
    </HeadingComponent>
  );

  return HeadingWithAnchor;
};

const MdxH1 = createHeadingWithAnchor(H1, "5rem");
const MdxH2 = createHeadingWithAnchor(H2, "4rem");
const MdxH3 = createHeadingWithAnchor(H3, "3rem");
const MdxH4 = createHeadingWithAnchor(H4, "2rem");
const MdxH5 = createHeadingWithAnchor(H5, "2rem");
const MdxH6 = createHeadingWithAnchor(H6, "1.5rem");

const Strong = (props: ComponentProps<"strong">) => <Text as="strong" weight={600} color={colors.textAccent} {...props} />;
const Paragraph = (props: ComponentProps<"p">) => <p className={paragraphClass} {...props} />;
const ListItem = (props: ComponentProps<"li">) => <li className={liClass} {...props} />;
const OrderList = (props: ComponentProps<"ol">) => <ol className={orderedListClass} {...props} />;
const UnorderList = (props: ComponentProps<"ul">) => <ul className={unorderedListClass} {...props} />;
const Hr = (props: ComponentProps<"hr">) => <hr className={hrClass} {...props} />;
const Blockquote = ({ children, ...props }: ComponentProps<"blockquote">) => <blockquote className={blockquoteClass} {...props}>{children}</blockquote>;
const Pre = (props: ComponentProps<"pre">) => <pre className={preClass} {...props} />;
const Code = (props: ComponentProps<"code">) => <code className={codeClass} {...props} />;
const Table = (props: ComponentProps<"table">) => <table className={tableClass} {...props} />;
const Image = ({ alt, src, ...props }: ComponentProps<"img">) => (
  <span className={imageWrapClass}>
    {typeof src === "string" ? <MdxImage src={src} alt={alt} {...props} /> : null}
    {alt ? <span className={imageCaptionClass}>{alt}</span> : null}
  </span>
);

const components: MDXComponents = {
  strong: Strong,
  h1: MdxH1,
  h2: MdxH2,
  h3: MdxH3,
  h4: MdxH4,
  h5: MdxH5,
  h6: MdxH6,
  p: Paragraph,
  a: Anchor,
  li: ListItem,
  ol: OrderList,
  ul: UnorderList,
  hr: Hr,
  blockquote: Blockquote,
  img: Image,
  pre: Pre,
  code: Code,
  table: Table,
  MelangePlayground,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
