import { execFileSync } from 'node:child_process';
import Fs from 'node:fs';
import { getPublishedBlogPosts } from './get-pages.mts';

const run = (command: string, args: string[]) => execFileSync(command, args, { stdio: 'inherit' });

const findMissing = async (): Promise<string[]> =>
  (await getPublishedBlogPosts()).map((post) => post.slug).filter((slug) => !Fs.existsSync(`public/og/${slug}.png`));

const missing = await findMissing();

if (missing.length > 0) {
  console.log(`Missing OG images: ${missing.join(', ')}`);

  // Without --slug, generate:og also rewrites every image whose manifest hash is stale.
  for (const slug of missing) {
    run('npm', ['run', 'generate:og', '--', `--slug=${slug}`]);
  }
  // The dev server started by generate:og rewrites this generated file.
  run('git', ['checkout', '--', 'next-env.d.ts']);

  // generate:og exits 0 even when some screenshots fail.
  const stillMissing = await findMissing();
  if (stillMissing.length > 0) {
    console.error(`OG generation failed for: ${stillMissing.join(', ')}. Not pushing.`);
    process.exit(1);
  }

  run('git', ['add', 'public/og']);
  // Pathspec limits the commit to public/og, so other staged work stays staged.
  run('git', ['commit', '-m', `Add OG images for ${missing.join(', ')}`, '--', 'public/og']);

  // A commit made in pre-push is not part of the push already in progress.
  console.error('Committed the new OG images. Run git push again to include them.');
  process.exit(1);
}
