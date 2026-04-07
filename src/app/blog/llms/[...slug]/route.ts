import { getPostLlmTextBySlug } from "@/llms";
import { getPostStaticParams } from "@/posts";

export const dynamic = "force-static";
export const dynamicParams = false;

const headers = {
  "Content-Type": "text/plain; charset=utf-8",
  "X-Content-Type-Options": "nosniff",
} as const;

type RouteContext = {
  params: Promise<{
    slug: string[];
  }>;
};

export function generateStaticParams() {
  return getPostStaticParams();
}

export async function GET(_request: Request, { params }: RouteContext) {
  const { slug } = await params;
  const content = getPostLlmTextBySlug(slug.join("/"));

  if (!content) {
    return new Response("Not Found", {
      status: 404,
      headers,
    });
  }

  return new Response(content, { headers });
}
