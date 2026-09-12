import { Fragment, isValidElement } from 'react';

import { IconTextLink } from '@/components/icon-text-link';
import { Text, TextLink } from '@/components/ui';
import AboutPage from './page';

function inlineMarkdown(node: unknown): string {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'number') return String(node);
  if (typeof node === 'string') {
    return node
      .replace(/[\\`*_[\]<>#|~]/g, '\\$&')
      .replace(/&(?=#\d+;|#x[\da-f]+;|[a-z][\da-z]+;)/gi, '\\&')
      .replace(/^( {0,3})([-+])(?=\s)/gm, '$1\\$2')
      .replace(/^( {0,3}\d+)([.)])(?=\s)/gm, '$1\\$2');
  }
  if (Array.isArray(node)) return node.map(inlineMarkdown).join('');

  if (isValidElement<{ children?: unknown; href?: unknown }>(node)) {
    if (node.type === Fragment) return inlineMarkdown(node.props.children);
    if (node.type === IconTextLink || node.type === TextLink) {
      if (typeof node.props.href !== 'string') {
        throw new Error('About prose links must have a string href.');
      }
      const href = node.props.href
        .replace(/[\\()]/g, '\\$&')
        .replace(/[\s<>]/g, encodeURIComponent)
        .replace(/&(?=#\d+;|#x[\da-f]+;|[a-z][\da-z]+;)/gi, '\\&');
      return `[${inlineMarkdown(node.props.children)}](${href})`;
    }
  }

  throw new Error('Unsupported inline About prose. Add explicit support in src/app/about/content.ts before using it.');
}

function proseParagraphs(node: unknown): string[] {
  if (Array.isArray(node)) return node.flatMap(proseParagraphs);
  if (!isValidElement<{ children?: unknown }>(node)) return [];
  if (node.type === Text) return [inlineMarkdown(node.props.children)];

  // Only inspect explicit children, never the output of nested components.
  return proseParagraphs(node.props.children);
}

export const aboutMarkdown = proseParagraphs(AboutPage()).join('\n\n');
