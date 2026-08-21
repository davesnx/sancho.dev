import { buildAboutMarkdownText } from '@/llms';

export const dynamic = 'force-static';

const headers = {
  'Content-Type': 'text/markdown; charset=utf-8',
  'X-Content-Type-Options': 'nosniff',
  'X-Robots-Tag': 'noindex, nofollow',
} as const;

export function GET() {
  return new Response(buildAboutMarkdownText(), { headers });
}
