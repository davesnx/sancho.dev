import Fs from "fs";
import Path from "path";
import URL from "url";
import { Effect, Console, pipe, Array as EffectArray } from "effect";
import Env from "dotenv";

Env.config();

const __filename = URL.fileURLToPath(import.meta.url);
const __dirname = Path.dirname(__filename);

const GITHUB_API_BASE = "https://api.github.com";
const OUTPUT_FILE = Path.join(__dirname, "../src/data/github-repos.json");

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

class ParseError {
  _tag = "ParseError";
  constructor(url) {
    this.url = url;
  }
}

class FetchError {
  _tag = "FetchError";
  constructor(owner, repo, status, message) {
    this.owner = owner;
    this.repo = repo;
    this.status = status;
    this.message = message;
  }
}

class RateLimitError {
  _tag = "RateLimitError";
  constructor(owner, repo) {
    this.owner = owner;
    this.repo = repo;
  }
}

const parseGitHubUrl = (url) =>
  Effect.gen(function* (_) {
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match || !match[1] || !match[2]) {
      return yield* _(Effect.fail(new ParseError(url)));
    }
    return {
      owner: match[1],
      repo: match[2],
    };
  });

const fetchGitHubRepo = (url) =>
  Effect.gen(function* (_) {
    const parsed = yield* _(parseGitHubUrl(url));
    const { owner, repo } = parsed;
    const token = process.env.GH_TOKEN;

    const headers = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "fetch-github-repos-script",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    yield* _(Console.log(`→ Fetching ${owner}/${repo}...`));

    const response = yield* _(
      Effect.tryPromise({
        try: () =>
          fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}`, { headers }),
        catch: (error) => new FetchError(owner, repo, 0, String(error)),
      })
    );

    if (!response.ok) {
      if (response.status === 403) {
        return yield* _(Effect.fail(new RateLimitError(owner, repo)));
      }
      return yield* _(
        Effect.fail(
          new FetchError(owner, repo, response.status, response.statusText)
        )
      );
    }

    const data = yield* _(
      Effect.tryPromise({
        try: () => response.json(),
        catch: (error) =>
          new FetchError(owner, repo, response.status, String(error)),
      })
    );

    yield* _(Console.log(`✓ Fetched ${owner}/${repo}`));

    return {
      owner: data.owner.login,
      name: repo,
      fullName: data.full_name,
      description: data.description || "No description available",
      stars: data.stargazers_count,
      language: data.language,
      url: data.html_url,
      ownerAvatar: data.owner.avatar_url,
    };
  });

const writeReposToFile = (repos) =>
  Effect.gen(function* (_) {
    const outputDir = Path.dirname(OUTPUT_FILE);
    if (!Fs.existsSync(outputDir)) {
      Fs.mkdirSync(outputDir, { recursive: true });
    }

    Fs.writeFileSync(OUTPUT_FILE, JSON.stringify(repos, null, 2), "utf-8");
    yield* _(Console.log(`\n📁 File: ${OUTPUT_FILE}`));
  });

const main = Effect.gen(function* (_) {
  yield* _(Console.log("🔄 Fetching GitHub repository data...\n"));

  const results = yield* _(
    pipe(
      repoUrls,
      EffectArray.map((url) =>
        pipe(
          fetchGitHubRepo(url),
          Effect.either,
          Effect.map((result) => ({ url, result }))
        )
      ),
      Effect.all
    )
  );

  const successes = [];
  const failures = [];
  let rateLimitCount = 0;

  for (const { url, result } of results) {
    if (result._tag === "Right") {
      successes.push(result.right);
    } else {
      const error = result.left;
      failures.push({ url, error });
      if (error._tag === "RateLimitError") {
        rateLimitCount++;
      }
    }
  }

  yield* _(Console.log("\n" + "=".repeat(50)));
  yield* _(Console.log(`✅ Successfully fetched: ${successes.length}`));
  yield* _(Console.log(`❌ Failed: ${failures.length}`));

  if (failures.length > 0) {
    yield* _(Console.log("\nFailures:"));
    for (const { url, error } of failures) {
      if (error._tag === "RateLimitError") {
        yield* _(
          Console.log(`  • ${error.owner}/${error.repo} - Rate limited (403)`)
        );
      } else if (error._tag === "FetchError") {
        yield* _(
          Console.log(
            `  • ${error.owner}/${error.repo} - ${error.status} ${error.message}`
          )
        );
      } else if (error._tag === "ParseError") {
        yield* _(Console.log(`  • ${url} - Invalid URL`));
      }
    }
  }

  if (rateLimitCount > 0) {
    yield* _(Console.log("\n⚠️  Rate limit issues detected!"));
    yield* _(
      Console.log(
        "Set GH_TOKEN environment variable for higher rate limits:"
      )
    );
    yield* _(
      Console.log('  export GH_TOKEN="ghp_your_token_here"')
    );
    yield* _(
      Console.log(
        "  Get a token at: https://github.com/settings/tokens"
      )
    );
  }

  yield* _(Console.log("=".repeat(50) + "\n"));

  if (successes.length === 0) {
    return yield* _(
      Effect.fail(
        new Error(
          "❌ Failed to fetch any repositories. Cannot generate file."
        )
      )
    );
  }

  if (failures.length > successes.length) {
    yield* _(
      Console.log(
        "⚠️  More failures than successes, but continuing with partial data..."
      )
    );
  }

  yield* _(writeReposToFile(successes));
  yield* _(Console.log(`✅ Successfully saved ${successes.length} repositories!`));
});

const runnable = pipe(
  main,
  Effect.catchAll((error) =>
    pipe(
      Console.error(`\n❌ Error: ${error.message || error}`),
      Effect.flatMap(() => Effect.fail(error))
    )
  )
);

Effect.runPromise(runnable).catch((error) => {
  console.error(error);
  process.exit(1);
});
