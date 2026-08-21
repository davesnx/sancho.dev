import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

type MiddlewareHelpers = {
  preferredType: (accept: string | null, produces: readonly string[]) => string | null;
  mergeNegotiatedVary: (headers: Headers) => void;
  markdownAssetPath: (pathname: string) => string | null;
  onRequest: (context: {
    request: Request;
    env: { ASSETS: { fetch: (request: Request) => Promise<Response> } };
    next: () => Promise<Response>;
  }) => Response | Promise<Response>;
};

const middlewareUrl = new URL('../../functions/_middleware.ts', import.meta.url);
const middlewarePath = fileURLToPath(middlewareUrl);
const middlewareExists = existsSync(middlewarePath);

let helpersPromise: Promise<MiddlewareHelpers> | undefined;

const getHelpers = (): Promise<MiddlewareHelpers> => {
  helpersPromise ??= import(middlewareUrl.href).then((module: Record<string, unknown>) => {
    const expectedExports = ['preferredType', 'mergeNegotiatedVary', 'markdownAssetPath', 'onRequest'] as const;
    for (const name of expectedExports) {
      assert.equal(typeof module[name], 'function', `functions/_middleware.ts must export the pure helper ${name}().`);
    }
    return module as unknown as MiddlewareHelpers;
  });
  return helpersPromise;
};

test('worker middleware exists for direct Node strip-types tests', () => {
  assert.ok(middlewareExists, 'Missing functions/_middleware.ts.');
});

test('content negotiation honors q-values', { skip: !middlewareExists }, async () => {
  const { preferredType } = await getHelpers();
  const produces = ['text/html', 'text/markdown'];
  assert.equal(preferredType('text/html;q=0.4, text/markdown;q=0.9', produces), 'text/markdown');
  assert.equal(preferredType('text/markdown;q=0.2, text/html;q=0.7', produces), 'text/html');
});

test('specific media ranges override less specific wildcards', { skip: !middlewareExists }, async () => {
  const { preferredType } = await getHelpers();
  const produces = ['text/html', 'text/markdown'];
  assert.equal(preferredType('text/*;q=0.8, text/markdown;q=0.2', produces), 'text/html');
  assert.equal(preferredType('*/*;q=0.4, text/markdown;q=0.9', produces), 'text/markdown');
  assert.equal(preferredType('*/*', produces), 'text/html', 'A bare wildcard must keep the safe HTML default.');
});

test('q=0 makes a representation unacceptable', { skip: !middlewareExists }, async () => {
  const { preferredType } = await getHelpers();
  const produces = ['text/html', 'text/markdown'];
  assert.equal(preferredType('text/markdown;q=0, */*;q=1', produces), 'text/html');
  assert.equal(preferredType('text/html;q=0, text/markdown;q=0.5', produces), 'text/markdown');
  assert.equal(preferredType('text/html;q=0, text/markdown;q=0', produces), null);
});

test('client order breaks equally weighted exact-type ties', { skip: !middlewareExists }, async () => {
  const { preferredType } = await getHelpers();
  const produces = ['text/html', 'text/markdown'];
  assert.equal(preferredType('text/markdown, text/html', produces), 'text/markdown');
  assert.equal(preferredType('text/html, text/markdown', produces), 'text/html');
});

test('Vary merge is case-insensitive, ordered, and wildcard-safe', { skip: !middlewareExists }, async () => {
  const { mergeNegotiatedVary } = await getHelpers();

  const empty = new Headers();
  mergeNegotiatedVary(empty);
  assert.equal(empty.get('Vary'), 'Accept, Accept-Encoding');

  const existing = new Headers({ Vary: 'Origin, accept' });
  mergeNegotiatedVary(existing);
  assert.equal(existing.get('Vary'), 'Origin, accept, Accept-Encoding');

  const wildcard = new Headers({ Vary: '*' });
  mergeNegotiatedVary(wildcard);
  assert.equal(wildcard.get('Vary'), '*');
});

test('clean routes map to static Markdown files', { skip: !middlewareExists }, async () => {
  const { markdownAssetPath } = await getHelpers();
  assert.equal(markdownAssetPath('/'), '/index.md');
  assert.equal(markdownAssetPath('/about'), '/about/index.md');
  assert.equal(markdownAssetPath('/blog/an-example'), '/blog/llms/an-example');
  assert.equal(markdownAssetPath('/blog/an-example/'), '/blog/llms/an-example');
  assert.equal(markdownAssetPath('/blog/nested/an-example'), '/blog/llms/nested/an-example');
  assert.equal(markdownAssetPath('/work'), null);
  assert.equal(markdownAssetPath('/images/example.png'), null, 'Asset paths must not be rewritten as Markdown.');
});

test('homepage serves its Markdown alternate with negotiated headers', { skip: !middlewareExists }, async () => {
  const { onRequest } = await getHelpers();
  let requestedAsset = '';
  const response = await onRequest({
    request: new Request('https://sancho.dev/', { headers: { Accept: 'text/markdown' } }),
    env: {
      ASSETS: {
        fetch: async (request) => {
          requestedAsset = new URL(request.url).pathname;
          return new Response('# David Sancho\n\nHomepage content.\n');
        },
      },
    },
    next: async () => new Response('<h1>David Sancho</h1>', { headers: { Vary: 'Origin' } }),
  });

  assert.equal(requestedAsset, '/index.md');
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('Content-Type'), 'text/markdown; charset=utf-8');
  assert.equal(response.headers.get('Vary'), 'Accept, Accept-Encoding');
  assert.match(await response.text(), /^# David Sancho/m);
});

test('default HTML keeps its body and adds both Vary dimensions', { skip: !middlewareExists }, async () => {
  const { onRequest } = await getHelpers();
  const response = await onRequest({
    request: new Request('https://sancho.dev/', { headers: { Accept: '*/*' } }),
    env: { ASSETS: { fetch: async () => new Response('unused') } },
    next: async () => new Response('<h1>David Sancho</h1>', { headers: { Vary: 'Origin' } }),
  });

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('Vary'), 'Origin, Accept, Accept-Encoding');
  assert.equal(await response.text(), '<h1>David Sancho</h1>');
});

test('unsupported representations return 406 without a body for HEAD', { skip: !middlewareExists }, async () => {
  const { onRequest } = await getHelpers();
  const response = await onRequest({
    request: new Request('https://sancho.dev/', { method: 'HEAD', headers: { Accept: 'application/pdf' } }),
    env: { ASSETS: { fetch: async () => new Response('unused') } },
    next: async () => new Response('unused'),
  });

  assert.equal(response.status, 406);
  assert.equal(response.headers.get('Cache-Control'), 'no-store');
  assert.equal(response.headers.get('Vary'), 'Accept, Accept-Encoding');
  assert.equal(await response.text(), '');
});

test('Markdown 404 body is useful and contains no HTML', { skip: !middlewareExists }, async () => {
  const { onRequest } = await getHelpers();
  const response = await onRequest({
    request: new Request('https://sancho.dev/missing-page', {
      headers: { Accept: 'text/markdown' },
    }),
    env: {
      ASSETS: {
        fetch: async () => new Response('Missing asset', { status: 404 }),
      },
    },
    next: async () => new Response('<h1>Not found</h1>', { status: 404 }),
  });
  const body = await response.text();

  assert.equal(response.status, 404);
  assert.equal(response.headers.get('Content-Type'), 'text/markdown; charset=utf-8');
  assert.equal(response.headers.get('Cache-Control'), 'no-store');
  assert.equal(response.headers.get('Vary'), 'Accept, Accept-Encoding');
  assert.match(body, /^#\s+.*(?:404|not found)/im);
  assert.match(body, /\[.+]\(\/\)/);
  assert.match(body, /\[.+]\(\/blog\)/);
  assert.match(body, /\[.+]\(\/llms\.txt\)/);
  assert.doesNotMatch(body, /<\/?[a-z][^>]*>/i, 'Markdown 404 body must not contain HTML tags.');
  assert.ok(body.endsWith('\n'), 'Markdown 404 body must end with a newline.');
});
