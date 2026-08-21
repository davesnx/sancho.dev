import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const repositoryRoot = fileURLToPath(new URL('../..', import.meta.url));
const outputRoot = join(repositoryRoot, 'out');
const siteOrigin = 'https://sancho.dev';

const readOutput = (path: string): string => {
  const absolutePath = join(outputRoot, path);
  assert.ok(existsSync(absolutePath), `Missing build artifact: out/${path}. Run npm run build first.`);
  return readFileSync(absolutePath, 'utf8');
};

const decodeHtmlEntities = (value: string): string =>
  value.replace(/&(#x[\da-f]+|#\d+|amp|apos|gt|lt|nbsp|quot);/gi, (entity, reference: string) => {
    const normalized = reference.toLowerCase();
    const namedEntities: Record<string, string> = {
      amp: '&',
      apos: "'",
      gt: '>',
      lt: '<',
      nbsp: ' ',
      quot: '"',
    };

    if (normalized.startsWith('#x')) {
      return String.fromCodePoint(Number.parseInt(normalized.slice(2), 16));
    }

    if (normalized.startsWith('#')) {
      return String.fromCodePoint(Number.parseInt(normalized.slice(1), 10));
    }

    return namedEntities[normalized] ?? entity;
  });

const visibleText = (html: string): string => {
  let text = html
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<(script|style|noscript|template|svg)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ');

  let previous = '';
  while (text !== previous) {
    previous = text;
    text = text.replace(
      /<([a-z][\w:-]*)\b(?=[^>]*(?:\bhidden\b|\baria-hidden\s*=\s*['"]true['"]|\bstyle\s*=\s*['"][^'"]*(?:display\s*:\s*none|visibility\s*:\s*hidden)))[^>]*>[\s\S]*?<\/\1>/gi,
      ' ',
    );
  }

  return decodeHtmlEntities(text.replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
};

const getJsonLdDocuments = (html: string): unknown[] => {
  const documents: unknown[] = [];
  const scriptPattern = /<script\b(?=[^>]*\btype\s*=\s*['"]application\/ld\+json['"])[^>]*>([\s\S]*?)<\/script>/gi;

  for (const match of html.matchAll(scriptPattern)) {
    const source = match[1];
    assert.ok(source, 'Homepage JSON-LD script must not be empty.');
    assert.doesNotThrow(() => JSON.parse(source), 'Homepage JSON-LD must be valid JSON.');
    documents.push(JSON.parse(source));
  }

  return documents;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const hasType = (value: Record<string, unknown>, expectedType: string): boolean => {
  const type = value['@type'];
  return type === expectedType || (Array.isArray(type) && type.includes(expectedType));
};

const collectRecords = (value: unknown): Record<string, unknown>[] => {
  if (Array.isArray(value)) {
    return value.flatMap(collectRecords);
  }

  if (!isRecord(value)) {
    return [];
  }

  return [value, ...Object.values(value).flatMap(collectRecords)];
};

const assertAbsoluteUrl = (value: unknown, field: string): string => {
  if (typeof value !== 'string') {
    assert.fail(`${field} must be a string URL.`);
  }
  assert.doesNotThrow(() => new URL(value), `${field} must be an absolute URL.`);
  return value;
};

const getSection = (markdown: string, heading: RegExp): string => {
  const lines = markdown.split('\n');
  const headingIndex = lines.findIndex((line) => heading.test(line.trim()));
  assert.notEqual(headingIndex, -1, `Missing llms.txt section matching ${heading}.`);

  const nextHeadingIndex = lines.findIndex(
    (line, index) => index > headingIndex && (/^##\s+/.test(line) || /^\*\*[^*]+\*\*$/.test(line)),
  );
  const end = nextHeadingIndex === -1 ? lines.length : nextHeadingIndex;
  return lines
    .slice(headingIndex + 1, end)
    .join('\n')
    .trim();
};

const walkFiles = (directory: string): string[] => {
  if (!existsSync(directory)) {
    return [];
  }

  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    return statSync(path).isDirectory() ? walkFiles(path) : [path];
  });
};

const parseHeaderBlocks = (source: string): Map<string, Map<string, string>> => {
  const blocks = new Map<string, Map<string, string>>();
  let currentPath: string | undefined;

  for (const line of source.split('\n')) {
    if (line.trim() === '' || line.trimStart().startsWith('#')) {
      continue;
    }

    if (!/^\s/.test(line)) {
      currentPath = line.trim();
      blocks.set(currentPath, new Map());
      continue;
    }

    assert.ok(currentPath, `Header line has no path block: ${line.trim()}`);
    const separator = line.indexOf(':');
    assert.ok(separator > 0, `Invalid header line: ${line.trim()}`);
    blocks.get(currentPath)?.set(line.slice(0, separator).trim().toLowerCase(), line.slice(separator + 1).trim());
  }

  return blocks;
};

const resolveStaticHeaders = (blocks: Map<string, Map<string, string>>, path: string): Map<string, string> => {
  const resolved = new Map<string, string>();

  for (const [pattern, headers] of blocks) {
    const expression = pattern
      .split('*')
      .map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      .join('.*');
    if (!new RegExp(`^${expression}$`).test(path)) continue;

    for (const [name, value] of headers) {
      resolved.set(name, value);
    }
  }

  return resolved;
};

test('raw homepage has one H1 and enough visible main content', () => {
  const homepage = readOutput('index.html');
  const h1Count = [...homepage.matchAll(/<h1\b[^>]*>/gi)].length;
  assert.equal(h1Count, 1, `Expected exactly one raw homepage H1, found ${h1Count}.`);

  const main = homepage.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
  assert.ok(main?.[1], 'Raw homepage must contain a non-empty <main> element.');
  const characterCount = Array.from(visibleText(main[1])).length;
  assert.ok(
    characterCount > 500,
    `Expected more than 500 visible characters in homepage <main>, found ${characterCount}.`,
  );
});

test('homepage exposes a truthful Person and WebSite JSON-LD graph', () => {
  const documents = getJsonLdDocuments(readOutput('index.html'));
  assert.ok(documents.length > 0, 'Homepage must contain an application/ld+json script.');

  const graphDocument = documents.find(
    (document) =>
      isRecord(document) && document['@context'] === 'https://schema.org' && Array.isArray(document['@graph']),
  );
  assert.ok(
    isRecord(graphDocument),
    'Homepage must contain a https://schema.org JSON-LD document with an @graph array.',
  );

  const graph = graphDocument['@graph'];
  assert.ok(Array.isArray(graph), 'Homepage JSON-LD @graph must be an array.');
  const nodes = graph.filter(isRecord);
  const person = nodes.find((node) => hasType(node, 'Person'));
  const website = nodes.find((node) => hasType(node, 'WebSite'));
  assert.ok(person, 'Homepage JSON-LD graph must contain a Person node.');
  assert.ok(website, 'Homepage JSON-LD graph must contain a WebSite node.');

  assert.equal(person.name, 'David Sancho', 'Person.name must identify the site author truthfully.');
  const personUrl = assertAbsoluteUrl(person.url, 'Person.url');
  assert.equal(new URL(personUrl).origin, siteOrigin, 'Person.url must point to sancho.dev.');
  const personId = assertAbsoluteUrl(person['@id'], 'Person.@id');
  assert.equal(new URL(personId).origin, siteOrigin, 'Person.@id must use the sancho.dev origin.');

  assert.ok(Array.isArray(person.sameAs), 'Person.sameAs must list verified public profiles.');
  const sameAs = person.sameAs.map((url, index) => assertAbsoluteUrl(url, `Person.sameAs[${index}]`));
  assert.ok(sameAs.includes('https://github.com/davesnx'), 'Person.sameAs must include the public GitHub profile.');
  assert.ok(
    sameAs.includes('https://x.com/davesnx') || sameAs.includes('https://bsky.app/profile/david.sancho.dev'),
    'Person.sameAs must include a public social profile linked from the site.',
  );

  assert.equal(website.name, 'sancho.dev', 'WebSite.name must be sancho.dev.');
  const websiteUrl = assertAbsoluteUrl(website.url, 'WebSite.url');
  assert.equal(new URL(websiteUrl).origin, siteOrigin, 'WebSite.url must point to sancho.dev.');
  assert.equal(new URL(websiteUrl).pathname, '/', 'WebSite.url must identify the homepage.');
  assert.ok(
    [website.author, website.publisher].some((reference) => isRecord(reference) && reference['@id'] === personId),
    'WebSite.author or WebSite.publisher must reference the Person node.',
  );

  const records = documents.flatMap(collectRecords);
  const typedNodes = records.filter((node) => '@type' in node);
  const organizationsForSanchoDev = typedNodes
    .filter((node) => hasType(node, 'Organization'))
    .filter((node) => {
      if (node.name === 'sancho.dev') return true;

      return [node.url, node['@id']].some((value) => {
        if (typeof value !== 'string') return false;
        try {
          return new URL(value).origin === siteOrigin;
        } catch {
          return false;
        }
      });
    });
  assert.deepEqual(organizationsForSanchoDev, [], 'The personal site sancho.dev must not be typed as an Organization.');

  const forbiddenContactFields = new Set([
    'address',
    'addresscountry',
    'addresslocality',
    'addressregion',
    'contactpoint',
    'email',
    'faxnumber',
    'postalcode',
    'streetaddress',
    'telephone',
  ]);
  const inventedFields = records.flatMap((node) =>
    Object.keys(node).filter((key) => forbiddenContactFields.has(key.toLowerCase())),
  );
  assert.deepEqual(
    inventedFields,
    [],
    `JSON-LD must not invent contact or address data. Found: ${inventedFields.join(', ')}`,
  );
});

test('article JSON-LD remains valid after safe script serialization', () => {
  const documents = getJsonLdDocuments(readOutput('blog/hello.html'));
  const records = documents.flatMap(collectRecords);
  const article = records.find((record) => hasType(record, 'BlogPosting'));

  assert.ok(article, 'A built article must contain a BlogPosting JSON-LD node.');
  assert.equal(article.headline, 'Hello Internet');
  assert.equal(article.url, 'https://sancho.dev/blog/hello');
});

test('llms.txt follows the v2 guidance and link-list contract', () => {
  const llms = readOutput('llms.txt');
  assert.match(llms, /^# sancho\.dev\s*$/m, 'llms.txt must have the site name as its H1.');
  assert.match(llms, /^>\s+\S.+$/m, 'llms.txt must have a short summary blockquote after its H1.');

  const whenToUse = getSection(llms, /^(?:##\s+When to use(?: this site)?|\*\*When to use(?: this site)?\*\*)$/i);
  assert.ok(whenToUse.length >= 80, 'The When to use section must give useful selection guidance.');
  assert.match(
    whenToUse,
    /OCaml|Melange|Reason|functional programming|frontend|developer tool|open source/i,
    'The When to use section must name the site topics.',
  );

  const instructions = getSection(
    llms,
    /^(?:##\s+Instructions(?: for agents)?|\*\*Instructions(?: for agents)?\*\*)$/i,
  );
  assert.match(instructions, /search|find/i, 'Instructions must explain how to find focused content.');
  assert.match(instructions, /fetch|request|read/i, 'Instructions must explain how to retrieve content.');
  assert.match(
    instructions,
    /verify|current source|canonical documentation/i,
    'Instructions must require current verification.',
  );
  assert.match(instructions, /cite|citation/i, 'Instructions must explain how to cite canonical pages.');

  const fullContext = getSection(llms, /^##\s+Full Context\s*$/i);
  assert.match(fullContext, /https:\/\/sancho\.dev\/llms-full\.txt/i, 'Full Context must link to llms-full.txt.');

  const headings = [...llms.matchAll(/^##\s+(.+?)\s*$/gm)].map((match) => match[1]?.toLowerCase());
  assert.ok(headings.includes('about'), 'llms.txt must have an About resource section.');
  assert.ok(headings.includes('full context'), 'llms.txt must have a Full Context resource section.');
  assert.ok(headings.includes('posts'), 'llms.txt must have a Posts resource section.');

  const linkLines = llms.split('\n').filter((line) => line.startsWith('- ['));
  assert.ok(linkLines.length >= 3, 'llms.txt must contain at least three linked resources.');
  const seenUrls = new Set<string>();

  for (const line of linkLines) {
    const match = line.match(/^- \[([^\]]+)]\((https:\/\/[^)\s]+)\):\s+(\S.+)$/);
    assert.ok(match, `Use absolute annotated link-list syntax: ${line}`);
    const label = match[1] ?? '';
    const url = match[2] ?? '';
    const annotation = match[3] ?? '';
    assert.ok(label.trim().length > 0, `Link label must not be empty: ${line}`);
    assert.ok(annotation.trim().length >= 5, `Link annotation is too short: ${line}`);
    assert.doesNotThrow(() => new URL(url), `Link must contain a valid absolute URL: ${line}`);
    assert.equal(seenUrls.has(url), false, `Duplicate llms.txt link: ${url}`);
    seenUrls.add(url);

    const parsedUrl = new URL(url);
    if (parsedUrl.origin === siteOrigin) {
      const path = parsedUrl.pathname === '/' ? 'index.html' : parsedUrl.pathname.slice(1);
      const candidates = [
        join(outputRoot, path),
        join(outputRoot, `${path}.html`),
        join(outputRoot, path, 'index.html'),
      ];
      assert.ok(
        candidates.some((candidate) => existsSync(candidate) && statSync(candidate).isFile()),
        `llms.txt links to a missing build artifact: ${url}`,
      );
    }
  }
});

test('built 404 page contains local recovery links', () => {
  const notFound = readOutput('404.html');
  const links = [...notFound.matchAll(/<a\b[^>]*\bhref\s*=\s*['"]([^'"]+)['"][^>]*>([\s\S]*?)<\/a>/gi)].map(
    ([, href, label]) => ({ href, label: visibleText(label ?? '') }),
  );
  const localLinks = links.filter(({ href, label }) => href?.startsWith('/') && label.length > 0);

  assert.ok(
    localLinks.some(({ href }) => href === '/'),
    '404 page must link back to the homepage.',
  );
  assert.ok(
    localLinks.some(({ href }) => href === '/about' || href === '/blog' || href === '/llms.txt'),
    '404 page must offer a second local recovery link to /about, /blog, or /llms.txt.',
  );
});

test('zoomable article images use native keyboard-accessible buttons', () => {
  const articleFiles = walkFiles(join(outputRoot, 'blog')).filter((path) => path.endsWith('.html'));
  const zoomableArticle = articleFiles
    .map((path) => readFileSync(path, 'utf8'))
    .find((html) => /<button\b[^>]*\baria-label=['"]Zoom\s/i.test(html));

  assert.ok(zoomableArticle, 'At least one built article must contain a zoom button.');
  assert.match(
    zoomableArticle,
    /<button\b[^>]*\btype=['"]button['"][^>]*>[\s\S]*?<img\b/i,
    'Zoomable images must be wrapped in a native button for keyboard access.',
  );
});

test('machine-readable build artifacts exist and contain their expected formats', () => {
  const expectedContent: Array<[string, RegExp]> = [
    ['index.md', /^# David Sancho\s*$/m],
    ['about/index.md', /^# About David Sancho\s*$/m],
    ['llms.txt', /^# sancho\.dev\s*$/m],
    ['llms-full.txt', /^# sancho\.dev\s*$/m],
    ['rss.xml', /^<\?xml[\s\S]*<rss\b/i],
    ['sitemap.xml', /^<\?xml[\s\S]*<urlset\b/i],
    ['robots.txt', /^User-agent:\s*\S+/im],
  ];

  for (const [path, pattern] of expectedContent) {
    const content = readOutput(path);
    assert.ok(content.trim().length > 0, `out/${path} must not be empty.`);
    assert.equal(content.includes('\0'), false, `out/${path} must be UTF-8 text without NUL bytes.`);
    assert.match(content, pattern, `out/${path} does not have the expected format.`);
  }

  const articleFiles = walkFiles(join(outputRoot, 'blog', 'llms'));
  assert.ok(articleFiles.length > 0, 'Build must emit at least one focused out/blog/llms/* representation.');
  for (const path of articleFiles) {
    const content = readFileSync(path, 'utf8');
    assert.ok(content.trim().length > 0, `${relative(repositoryRoot, path)} must not be empty.`);
    assert.match(
      content,
      /^>.+llms\.txt[\s\S]+^#\s+\S/im,
      `${relative(repositoryRoot, path)} must be article Markdown.`,
    );
  }
});

test('static machine-readable files declare precise content types', () => {
  const headers = parseHeaderBlocks(readOutput('_headers'));
  const articleFile = walkFiles(join(outputRoot, 'blog', 'llms'))[0];
  assert.ok(articleFile, 'Build must emit a focused article before its static headers can be checked.');
  const articlePath = `/${relative(outputRoot, articleFile).replaceAll('\\', '/')}`;
  const expectedHeaders = new Map([
    ['/llms.txt', 'text/plain; charset=utf-8'],
    ['/llms-full.txt', 'text/plain; charset=utf-8'],
    ['/rss.xml', 'application/rss+xml; charset=utf-8'],
    ['/sitemap.xml', 'application/xml; charset=utf-8'],
    ['/robots.txt', 'text/plain; charset=utf-8'],
    ['/index.md', 'text/markdown; charset=utf-8'],
    ['/about/index.md', 'text/markdown; charset=utf-8'],
    [articlePath, 'text/markdown; charset=utf-8'],
  ]);

  for (const [path, expectedContentType] of expectedHeaders) {
    const contentType = resolveStaticHeaders(headers, path).get('content-type');
    assert.ok(contentType, `out/_headers must set Content-Type for ${path}.`);
    assert.equal(contentType.toLowerCase(), expectedContentType, `${path} has the wrong Content-Type.`);
  }
});
