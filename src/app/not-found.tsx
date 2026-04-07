import { buildMetadata } from "../lib/site";
import { H1, Page, Spacer, Text, TextLink } from "../components/ui";

export const metadata = buildMetadata({
  title: "404",
  description: "Page not found on sancho.dev.",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <Page title={<H1>Page not found</H1>}>
      <Text weight={600}>
        If it sounds like it should exist, please open an issue in <TextLink href="https://github.com/davesnx/sancho.dev">the repo</TextLink>.
      </Text>
      <Spacer top={4} />
      <Text>
        Go back to <TextLink href="/">home</TextLink>.
      </Text>
    </Page>
  );
}
