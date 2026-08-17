import Fs from 'node:fs';
import Path from 'node:path';
import { fileURLToPath } from 'node:url';
import Env from 'dotenv';
import type { GitHubRepo } from '../src/lib/github.ts';

Env.config();

type GitHubApiRepo = {
  full_name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  html_url: string;
  owner: { login: string; avatar_url: string };
};

const repoUrls = [
  'https://github.com/davesnx/styled-ppx',
  'https://github.com/ml-in-barcelona/server-reason-react',
  'https://github.com/reasonml/reason-react',
  'https://github.com/reasonml/reason',
  'https://github.com/melange-re/melange',
  'https://github.com/davesnx/html_of_jsx',
  'https://github.com/davesnx/ocaml-box',
  'https://github.com/davesnx/taco',
  'https://github.com/davesnx/query-json',
  'https://github.com/davesnx/parseff',
  'https://github.com/davesnx/ochre',
  'https://github.com/ml-in-barcelona/quickjs.ml',
  'https://github.com/davesnx/ocaml-toon',
  'https://github.com/ocaml-mlx/mlx',
  'https://github.com/melange-re/melange-re.github.io',
  'https://github.com/davesnx/dune-release-action',
  'https://github.com/davesnx/awesome-ppx-deriving',
  'https://github.com/davesnx/learn-ramda',
  'https://github.com/ocaml-mlx/ocamlformat-mlx',
  'https://github.com/ml-in-barcelona/react-rules-of-hooks-ppx',
  'https://github.com/davesnx/sirocco',
];

const scriptDir = Path.dirname(fileURLToPath(import.meta.url));
const outputFile = Path.join(scriptDir, '../src/data/github-repos.json');
const cacheMaxAge = 60 * 60 * 1000;
const forceRefresh = process.argv.includes('--force');

const readCache = (): GitHubRepo[] => {
  if (!Fs.existsSync(outputFile)) return [];
  return JSON.parse(Fs.readFileSync(outputFile, 'utf8')) as GitHubRepo[];
};

const cacheIsFresh = () =>
  !forceRefresh && Fs.existsSync(outputFile) && Date.now() - Fs.statSync(outputFile).mtimeMs < cacheMaxAge;

const fetchRepo = async (url: string): Promise<GitHubRepo> => {
  const parsed = new URL(url);
  const [owner, name] = parsed.pathname.split('/').filter(Boolean);
  if (!owner || !name) throw new Error(`Invalid GitHub URL: ${url}`);

  const token = process.env.GH_TOKEN ?? process.env.GITHUB_TOKEN;
  const response = await fetch(`https://api.github.com/repos/${owner}/${name}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'sancho.dev-repository-fetch',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!response.ok) throw new Error(`${owner}/${name}: ${response.status} ${response.statusText}`);

  const data = (await response.json()) as GitHubApiRepo;
  return {
    owner: data.owner.login,
    name,
    fullName: data.full_name,
    description: data.description ?? 'No description available',
    stars: data.stargazers_count,
    language: data.language,
    url: data.html_url,
    ownerAvatar: data.owner.avatar_url,
  };
};

const main = async () => {
  if (process.env.SKIP_GITHUB_FETCH === '1') {
    if (!Fs.existsSync(outputFile)) throw new Error('GitHub cache is missing');
    console.log('Skipping GitHub repository fetch.');
    return;
  }
  if (cacheIsFresh()) {
    console.log('Using cached GitHub repository data.');
    return;
  }

  const previous = new Map(readCache().map((repo) => [repo.fullName, repo]));
  const results = await Promise.allSettled(repoUrls.map(fetchRepo));
  const repos: GitHubRepo[] = [];
  const failures: string[] = [];

  results.forEach((result, index) => {
    const url = repoUrls[index];
    if (!url) return;
    if (result.status === 'fulfilled') repos.push(result.value);
    else {
      const parsed = new URL(url);
      const fullName = parsed.pathname.slice(1);
      const cached = previous.get(fullName);
      if (cached) repos.push(cached);
      failures.push(result.reason instanceof Error ? result.reason.message : String(result.reason));
    }
  });

  if (repos.length === 0) throw new Error(`No GitHub repositories fetched: ${failures.join('; ')}`);
  Fs.mkdirSync(Path.dirname(outputFile), { recursive: true });
  Fs.writeFileSync(outputFile, `${JSON.stringify(repos, null, 2)}\n`, 'utf8');
  console.log(`Saved ${repos.length} repositories to ${outputFile}`);
  if (failures.length) console.warn(`Used cached data for ${failures.length} repositories.`);
};

await main();
