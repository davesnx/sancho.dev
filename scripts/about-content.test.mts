import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';
import { transformSync } from 'esbuild';
import * as React from 'react';

const { createElement: element, Fragment } = React;
const source = transformSync(readFileSync(new URL('../src/app/about/content.ts', import.meta.url), 'utf8'), {
  loader: 'ts',
  format: 'cjs',
}).code;

function Text(): never {
  throw new Error('Text must not be called');
}

function TextLink(_props: { href?: unknown; children?: React.ReactNode }): never {
  throw new Error('TextLink must not be called');
}

function IconTextLink(_props: { href?: unknown; children?: React.ReactNode }): never {
  throw new Error('IconTextLink must not be called');
}

function Nested(): never {
  throw new Error('Nested components must not be called');
}

function markdown(tree: React.ReactNode) {
  let pageCalls = 0;
  const modules: Record<string, unknown> = {
    react: React,
    '@/components/ui': { Text, TextLink },
    '@/components/icon-text-link': { IconTextLink },
    './page': () => {
      pageCalls += 1;
      return tree;
    },
  };
  const module: { exports: Record<string, unknown> } = { exports: {} };
  runInNewContext(source, {
    module,
    exports: module.exports,
    require: (id: string) => {
      assert.ok(Object.hasOwn(modules, id), `Unexpected import: ${id}`);
      return modules[id];
    },
  });
  assert.equal(pageCalls, 1);
  assert.equal(typeof module.exports.aboutMarkdown, 'string');
  return module.exports.aboutMarkdown;
}

test('keeps explicit prose in order without calling nested components or reading other props', () => {
  const tree = element(
    'div',
    { title: 'Not prose' },
    element('h2', null, 'Work'),
    element(Text, null, "I'm a co-host. ", [null, false, true, 0], element(Fragment, null, '  Next\nline. ')),
    [element(Nested, { key: 'job' }), element(Nested, { key: 'gallery' })],
    element('div', null, element(Text, null, ' Second paragraph. ')),
  );
  assert.equal(markdown(tree), "I'm a co-host. 0  Next\nline. \n\n Second paragraph. ");
});

test('uses visible children and href for both link identities', () => {
  assert.equal(
    markdown(
      element(Text, null, [
        element(IconTextLink, { href: 'https://ocaml.org/' }, element(Fragment, null, 'OCaml')),
        ' and ',
        element(TextLink, { href: 'https://example.com/a(b) c\\d<e>?x=&amp;' }, '[label]*'),
        '.',
      ]),
    ),
    '[OCaml](https://ocaml.org/) and [\\[label\\]\\*](https://example.com/a\\(b\\)%20c\\\\d%3Ce%3E?x=\\&amp;).',
  );
});

test('escapes Markdown syntax but leaves ordinary prose punctuation unchanged', () => {
  assert.equal(
    markdown(element(Text, null, "I'm server-reason-react. * _ ` [ ] < > # | ~ \\ &amp;\n- item\n1. item")),
    "I'm server-reason-react. \\* \\_ \\` \\[ \\] \\< \\> \\# \\| \\~ \\\\ \\&amp;\n\\- item\n1\\. item",
  );
});

test('rejects unsupported inline elements instead of dropping their prose', () => {
  assert.throws(
    () => markdown(element(Text, null, element('strong', null, 'Important'))),
    /Unsupported inline About prose/,
  );
  assert.throws(() => markdown(element(Text, null, element(Nested))), /Unsupported inline About prose/);
});

test('rejects links without a string destination', () => {
  for (const href of [undefined, null, 42, { pathname: '/about' }]) {
    assert.throws(() => markdown(element(Text, null, element(TextLink, { href }, 'Link'))), /string href/);
  }
});
