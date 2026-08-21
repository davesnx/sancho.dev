const HTML = 'text/html';
const MARKDOWN = 'text/markdown';
const NEGOTIATED_TYPES = [HTML, MARKDOWN];
const RECOVERY_MARKDOWN = `# Not found

- [Sitemap](/sitemap.xml)
- [Site index](/llms.txt)
- [Blog](/blog)
- [Home](/)
`;

export type AcceptEntry = {
  type: string;
  q: number;
  specificity: number;
};

type AssetFetcher = {
  fetch(input: Request | string | URL, init?: RequestInit): Promise<Response>;
};

type PagesFunctionContext = {
  request: Request;
  env: {
    ASSETS: AssetFetcher;
  };
  next(): Promise<Response>;
};

type PagesFunction = (context: PagesFunctionContext) => Response | Promise<Response>;

export function parseAccept(header: string): AcceptEntry[] {
  return header
    .split(',')
    .map((raw) => {
      const parts = raw
        .trim()
        .split(';')
        .map((part) => part.trim());
      const type = parts[0]?.toLowerCase();
      if (!type) return null;

      let q = 1;
      for (const parameter of parts.slice(1)) {
        const [rawName, rawValue] = parameter.split('=');
        const name = rawName?.trim().toLowerCase();
        if (name !== 'q') continue;

        const parsed = Number(rawValue?.trim());
        if (!Number.isNaN(parsed)) q = Math.max(0, Math.min(1, parsed));
      }

      const specificity = type === '*/*' ? 0 : type.endsWith('/*') ? 1 : 2;
      return { type, q, specificity };
    })
    .filter((entry): entry is AcceptEntry => entry !== null);
}

function matches(entry: AcceptEntry, candidate: string): boolean {
  if (entry.type === '*/*') return true;
  if (entry.type.endsWith('/*')) return candidate.startsWith(entry.type.slice(0, -1));
  return entry.type === candidate;
}

export function preferredType(header: string | null, produces: readonly string[]): string | null {
  if (!header) return produces[0] ?? null;

  const entries = parseAccept(header);
  if (entries.length === 0) return produces[0] ?? null;

  let bestType: string | null = null;
  let bestQ = -1;
  let bestPosition = Number.POSITIVE_INFINITY;

  for (const candidate of produces) {
    let matched: AcceptEntry | null = null;
    let matchedPosition = Number.POSITIVE_INFINITY;

    for (let position = 0; position < entries.length; position++) {
      const entry = entries[position];
      if (!entry || !matches(entry, candidate)) continue;

      if (
        matched === null ||
        entry.specificity > matched.specificity ||
        (entry.specificity === matched.specificity && position < matchedPosition)
      ) {
        matched = entry;
        matchedPosition = position;
      }
    }

    if (!matched || matched.q <= 0) continue;

    if (matched.q > bestQ || (matched.q === bestQ && matchedPosition < bestPosition)) {
      bestType = candidate;
      bestQ = matched.q;
      bestPosition = matchedPosition;
    }
  }

  return bestType;
}

export function mergeNegotiatedVary(headers: Headers): void {
  const existing = headers.get('Vary');
  if (existing?.trim() === '*') return;

  const values = existing
    ? existing
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean)
    : [];
  const normalized = new Set(values.map((value) => value.toLowerCase()));

  if (!normalized.has('accept')) values.push('Accept');
  if (!normalized.has('accept-encoding')) values.push('Accept-Encoding');

  headers.set('Vary', values.join(', '));
}

export function markdownAssetPath(pathname: string): string | null {
  const cleanPath = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
  if (cleanPath === '/') return '/index.md';
  if (cleanPath === '/about') return '/about/index.md';

  const blogMatch = /^\/blog\/(.+)$/.exec(cleanPath);
  if (!blogMatch?.[1] || blogMatch[1] === 'llms' || blogMatch[1].startsWith('llms/')) return null;

  return `/blog/llms/${blogMatch[1]}`;
}

export function isHumanPageRequest(request: Request): boolean {
  if (request.method !== 'GET' && request.method !== 'HEAD') return false;

  const { pathname } = new URL(request.url);
  if (
    pathname === '/blog/llms' ||
    pathname.startsWith('/blog/llms/') ||
    pathname === '/api' ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/.well-known/')
  ) {
    return false;
  }

  const finalSegment = pathname.replace(/\/+$/, '').split('/').at(-1) ?? '';
  return !finalSegment.includes('.');
}

function cloneResponse(response: Response, body: BodyInit | null): Response {
  return new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers: new Headers(response.headers),
  });
}

function negotiatedResponse(response: Response, method: string): Response {
  const result = cloneResponse(response, method === 'HEAD' ? null : response.body);
  mergeNegotiatedVary(result.headers);
  return result;
}

function markdownResponse(response: Response, method: string): Response {
  const result = negotiatedResponse(response, method);
  result.headers.set('Content-Type', 'text/markdown; charset=utf-8');
  return result;
}

function markdownNotFound(response: Response, method: string): Response {
  const result = cloneResponse(response, method === 'HEAD' ? null : RECOVERY_MARKDOWN);
  result.headers.set('Content-Type', 'text/markdown; charset=utf-8');
  result.headers.delete('Content-Encoding');
  result.headers.delete('Content-Length');
  result.headers.set('Cache-Control', 'no-store');
  result.headers.set('X-Content-Type-Options', 'nosniff');
  result.headers.set('X-Robots-Tag', 'noindex');
  mergeNegotiatedVary(result.headers);
  return result;
}

function notAcceptable(method: string): Response {
  const body = 'Not Acceptable\n\nAvailable: text/html, text/markdown\n';
  const response = new Response(method === 'HEAD' ? null : body, {
    status: 406,
    headers: {
      'Cache-Control': 'no-store',
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
    },
  });
  mergeNegotiatedVary(response.headers);
  return response;
}

function assetRequest(request: Request, pathname: string): Request {
  const url = new URL(request.url);
  url.pathname = pathname;
  return new Request(url, request);
}

export const onRequest: PagesFunction = async (context) => {
  const { request } = context;
  if (!isHumanPageRequest(request)) return context.next();

  const accept = request.headers.get('Accept');
  const chosen = preferredType(accept, NEGOTIATED_TYPES);
  if (!chosen) return notAcceptable(request.method);

  if (chosen === HTML) {
    return negotiatedResponse(await context.next(), request.method);
  }

  const pathname = markdownAssetPath(new URL(request.url).pathname);
  if (pathname) {
    const markdown = await context.env.ASSETS.fetch(assetRequest(request, pathname));
    if (markdown.ok || markdown.status === 304) return markdownResponse(markdown, request.method);
  }

  const html = await context.next();
  if (html.status === 404) return markdownNotFound(html, request.method);
  if (preferredType(accept, [HTML])) return negotiatedResponse(html, request.method);

  return notAcceptable(request.method);
};
