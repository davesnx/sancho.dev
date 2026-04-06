import Fs from "node:fs";
import Path from "node:path";
import { fileURLToPath } from "node:url";
import Env from "dotenv";

Env.config();

interface ParsedGitHubRepo {
  owner: string;
  repo: string;
}

interface GitHubApiRepoResponse {
  full_name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  html_url: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface GitHubRepo {
  owner: string;
  name: string;
  fullName: string;
  description: string;
  stars: number;
  language: string | null;
  url: string;
  ownerAvatar: string;
}

class ParseError extends Error {
  readonly _tag = "ParseError";
  url: string;

  constructor(url: string) {
    super(`Invalid GitHub URL: ${url}`);
    this.name = "ParseError";
    this.url = url;
  }
}

class FetchError extends Error {
  readonly _tag = "FetchError";
  owner: string;
  repo: string;
  status: number;

  constructor(owner: string, repo: string, status: number, message: string) {
    super(message);
    this.name = "FetchError";
    this.owner = owner;
    this.repo = repo;
    this.status = status;
  }
}

class RateLimitError extends Error {
  readonly _tag = "RateLimitError";
  owner: string;
  repo: string;

  constructor(owner: string, repo: string) {
    super(`Rate limited while fetching ${owner}/${repo}`);
    this.name = "RateLimitError";
    this.owner = owner;
    this.repo = repo;
  }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = Path.dirname(__filename);

const GITHUB_API_BASE = "https://api.github.com";
const OUTPUT_FILE = Path.join(__dirname, "../src/data/github-repos.json");
const CACHE_MAX_AGE_MS = 60 * 60 * 1000; // 1 hour

const forceRefresh = process.argv.includes("--force");

const repoUrls = [
  "https://github.com/davesnx/styled-ppx",
  "https://github.com/ml-in-barcelona/server-reason-react",
  "https://github.com/reasonml/reason-react",
  "https://github.com/reasonml/reason",
  "https://github.com/melange-re/melange",
  "https://github.com/davesnx/html_of_jsx",
  "https://github.com/davesnx/ocaml-box",
  "https://github.com/davesnx/taco",
  "https://github.com/davesnx/query-json",
  "https://github.com/davesnx/parseff",
  "https://github.com/davesnx/ochre",
  "https://github.com/ml-in-barcelona/quickjs.ml",
  "https://github.com/davesnx/ocaml-toon",
  "https://github.com/ocaml-mlx/mlx",
  "https://github.com/melange-re/melange-re.github.io",
  "https://github.com/davesnx/dune-release-action",
  "https://github.com/davesnx/awesome-ppx-deriving",
  "https://github.com/davesnx/learn-ramda",
  "https://github.com/ocaml-mlx/ocamlformat-mlx",
  "https://github.com/ml-in-barcelona/react-rules-of-hooks-ppx",
  "https://github.com/davesnx/sirocco",
];

const isCacheValid = (): boolean => {
  if (forceRefresh) return false;
  if (!Fs.existsSync(OUTPUT_FILE)) return false;

  const stats = Fs.statSync(OUTPUT_FILE);
  const age = Date.now() - stats.mtimeMs;
  return age < CACHE_MAX_AGE_MS;
};

const parseGitHubUrl = (url: string): ParsedGitHubRepo => {
  const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  const owner = match?.[1];
  const repo = match?.[2];

  if (!owner || !repo) {
    throw new ParseError(url);
  }

  return { owner, repo };
};

const fetchGitHubRepo = async (url: string): Promise<GitHubRepo> => {
  const { owner, repo } = parseGitHubUrl(url);
  const token = process.env.GH_TOKEN ?? process.env.GITHUB_TOKEN;

  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "fetch-github-repos-script",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  console.log(`→ Fetching ${owner}/${repo}...`);

  let response: Response;
  try {
    response = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}`, {
      headers,
    });
  } catch (error) {
    throw new FetchError(owner, repo, 0, String(error));
  }

  if (!response.ok) {
    if (response.status === 403) {
      throw new RateLimitError(owner, repo);
    }

    throw new FetchError(owner, repo, response.status, response.statusText);
  }

  let data: GitHubApiRepoResponse;
  try {
    data = (await response.json()) as GitHubApiRepoResponse;
  } catch (error) {
    throw new FetchError(owner, repo, response.status, String(error));
  }

  console.log(`✓ Fetched ${owner}/${repo}`);

  return {
    owner: data.owner.login,
    name: repo,
    fullName: data.full_name,
    description: data.description ?? "No description available",
    stars: data.stargazers_count,
    language: data.language,
    url: data.html_url,
    ownerAvatar: data.owner.avatar_url,
  };
};

const writeReposToFile = (repos: ReadonlyArray<GitHubRepo>): void => {
  const outputDir = Path.dirname(OUTPUT_FILE);

  if (!Fs.existsSync(outputDir)) {
    Fs.mkdirSync(outputDir, { recursive: true });
  }

  Fs.writeFileSync(OUTPUT_FILE, JSON.stringify(repos, null, 2), "utf-8");
  console.log(`\n📁 File: ${OUTPUT_FILE}`);
};

const isKnownFetchError = (
  error: unknown,
): error is ParseError | FetchError | RateLimitError =>
  error instanceof ParseError ||
  error instanceof FetchError ||
  error instanceof RateLimitError;

const main = async (): Promise<void> => {
  if (process.env.SKIP_GITHUB_FETCH === "1") {
    if (!Fs.existsSync(OUTPUT_FILE)) {
      console.log("SKIP_GITHUB_FETCH=1 set but cache missing, writing empty file.");
      writeReposToFile([]);
    } else {
      console.log("Skipping GitHub repo fetch (SKIP_GITHUB_FETCH=1).");
    }

    return;
  }

  if (isCacheValid()) {
    console.log("✓ Using cached github-repos.json (< 1 hour old)");
    console.log("  Run with --force to refresh");
    return;
  }

  console.log("🔄 Fetching GitHub repository data...\n");

  const results = await Promise.all(
    repoUrls.map(async (url) => {
      try {
        return { url, repo: await fetchGitHubRepo(url), error: null };
      } catch (error) {
        return { url, repo: null, error };
      }
    }),
  );

  const successes: GitHubRepo[] = [];
  const failures: Array<{ url: string; error: unknown }> = [];
  let rateLimitCount = 0;

  for (const { url, repo, error } of results) {
    if (repo) {
      successes.push(repo);
      continue;
    }

    failures.push({ url, error });

    if (error instanceof RateLimitError) {
      rateLimitCount += 1;
    }
  }

  console.log(`\n${"=".repeat(50)}`);
  console.log(`✅ Successfully fetched: ${successes.length}`);
  console.log(`❌ Failed: ${failures.length}`);

  if (failures.length > 0) {
    console.log("\nFailures:");

    for (const { url, error } of failures) {
      if (error instanceof RateLimitError) {
        console.log(`  • ${error.owner}/${error.repo} - Rate limited (403)`);
        continue;
      }

      if (error instanceof FetchError) {
        console.log(
          `  • ${error.owner}/${error.repo} - ${error.status} ${error.message}`,
        );
        continue;
      }

      if (error instanceof ParseError) {
        console.log(`  • ${url} - Invalid URL`);
        continue;
      }

      console.log(`  • ${url} - ${String(error)}`);
    }
  }

  if (rateLimitCount > 0) {
    console.log("\n⚠️  Rate limit issues detected!");
    console.log(
      "Set GH_TOKEN or GITHUB_TOKEN environment variable for higher rate limits:",
    );
    console.log('  export GH_TOKEN="ghp_your_token_here"');
    console.log("  Get a token at: https://github.com/settings/tokens");
  }

  console.log(`${"=".repeat(50)}\n`);

  if (successes.length === 0) {
    throw new Error("❌ Failed to fetch any repositories. Cannot generate file.");
  }

  if (failures.length > successes.length) {
    console.log(
      "⚠️  More failures than successes, but continuing with partial data...",
    );
  }

  writeReposToFile(successes);
  console.log(`✅ Successfully saved ${successes.length} repositories!`);
};

void main().catch((error: unknown) => {
  if (isKnownFetchError(error) || error instanceof Error) {
    console.error(`\n❌ Error: ${error.message}`);
    console.error(error);
  } else {
    console.error(`\n❌ Error: ${String(error)}`);
  }

  process.exit(1);
});
