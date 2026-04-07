import { Fragment } from "react";

import { css } from "@linaria/core";

import { H1, Page, Spacer, Stack, Text, TextLink } from "@/components/ui";
import { buildMetadata } from "@/site";
import fonts from "@/theme/fonts";
import { aboutParagraphs } from "./content";

const contentClass = css`
  display: block;
  line-height: 1.7;
  font-size: ${fonts.fontSize1};
`;

export const metadata = buildMetadata({
  title: "About",
  description: "About David Sancho: software engineer in Barcelona working on OCaml, developer tooling, and UI infrastructure at ahrefs.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <Page title={<H1>About</H1>}>
      <Stack align="flex-start" gap={5}>
        <div className={contentClass}>
          {aboutParagraphs.map((paragraph, paragraphIndex) => {
            const key = paragraph
              .map((segment) => (typeof segment === "string" ? segment : segment.text))
              .join("");

            return (
              <Fragment key={key}>
                <Text size={fonts.fontSize1} align={paragraphIndex === 0 ? "left" : undefined}>
                  {paragraph.map((segment, segmentIndex) => {
                    if (typeof segment === "string") {
                      return <Fragment key={`${paragraphIndex}-${segmentIndex}`}>{segment}</Fragment>;
                    }

                    return (
                      <TextLink key={`${paragraphIndex}-${segmentIndex}`} href={segment.href}>
                        {segment.text}
                      </TextLink>
                    );
                  })}
                </Text>
                {paragraphIndex < aboutParagraphs.length - 1 ? <Spacer top={2} /> : null}
              </Fragment>
            );
          })}
        </div>
      </Stack>
    </Page>
  );
}
