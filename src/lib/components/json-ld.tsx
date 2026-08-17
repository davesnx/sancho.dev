export function JsonLd({ data }: { data: Record<string, unknown> | Array<Record<string, unknown>> }) {
  const serialized = JSON.stringify(data).replaceAll('<', '\\u003c');
  return (
    // biome-ignore lint/security/noDangerouslySetInnerHtml: Structured data is built from validated local metadata.
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serialized }} />
  );
}
