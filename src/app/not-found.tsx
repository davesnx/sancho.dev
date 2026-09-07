import { ButtonLink, H1, H4, Page, Spacer, Text, TextLink } from '@/components/ui';
import { buildMetadata } from '@/site';

export const metadata = buildMetadata({
  title: '404',
  description: 'Page not found on sancho.dev.',
  path: '/404',
  noIndex: true,
});

export default function NotFound() {
  return (
    <Page
      title={
        <>
          <Spacer bottom={4}>
            <H4>404</H4>
            <H1>Page not found</H1>
          </Spacer>
        </>
      }
    >
      <Text weight={400}>
        If it sounds like it should exist, please open an issue in{' '}
        <TextLink weight={400} href="https://github.com/davesnx/sancho.dev">
          the repo
        </TextLink>
        .
      </Text>
      <Spacer top={4} />
      <ButtonLink href="/" variant="filled">
        <Text as="span" weight={600}>
          Go to home
        </Text>
      </ButtonLink>
    </Page>
  );
}
