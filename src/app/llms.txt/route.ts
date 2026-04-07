import { buildLlmsIndexText } from "@/llms";

export const dynamic = "force-static";

const headers = {
  "Content-Type": "text/plain; charset=utf-8",
  "X-Content-Type-Options": "nosniff",
} as const;

export function GET() {
  return new Response(buildLlmsIndexText(), { headers });
}
