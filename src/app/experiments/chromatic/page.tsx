import { JsonLd } from '@/components/json-ld';
import { buildMetadata, buildWebPageJsonLd } from '@/site';
import { ChromaticDemo } from './chromatic-demo';

export const metadata = buildMetadata({
  title: 'Chromatic Aberration',
  description: 'An interactive chromatic aberration text experiment.',
  path: '/experiments/chromatic',
});

export default function ChromaticExperimentPage() {
  return (
    <>
      <JsonLd
        data={buildWebPageJsonLd({
          title: 'Chromatic Aberration',
          description: 'An interactive chromatic aberration text experiment.',
          path: '/experiments/chromatic',
        })}
      />
      <ChromaticDemo />
    </>
  );
}
