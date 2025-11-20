// ABOUTME: GitHub API utility with types and client-safe utilities
// ABOUTME: Handles fetching repo info including stars, language, description, and org avatars

export interface GitHubRepo {
  owner: string;
  name: string;
  fullName: string;
  description: string;
  stars: number;
  language: string | null;
  url: string;
  ownerAvatar: string;
}

interface GitHubAPIResponse {
  full_name: string;
  description: string;
  stargazers_count: number;
  language: string | null;
  html_url: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const GITHUB_API_BASE = "https://api.github.com";

export function parseGitHubUrl(url: string): { owner: string; repo: string } | null {
  const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (!match || !match[1] || !match[2]) return null;
  return {
    owner: match[1],
    repo: match[2],
  };
}

export async function fetchGitHubRepo(url: string): Promise<GitHubRepo | null> {
  const parsed = parseGitHubUrl(url);
  if (!parsed) {
    console.error(`Invalid GitHub URL: ${url}`);
    return null;
  }

  const { owner, repo } = parsed;
  const token = process.env.GH_TOKEN;

  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}`, {
      headers,
    });

    if (!response.ok) {
      console.error(`Failed to fetch ${owner}/${repo}: ${response.status}`);
      return null;
    }

    const data: GitHubAPIResponse = await response.json();

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
  } catch (error) {
    console.error(`Error fetching ${owner}/${repo}:`, error);
    return null;
  }
}

export async function fetchAllGitHubRepos(urls: string[]): Promise<GitHubRepo[]> {
  const results = await Promise.allSettled(urls.map(fetchGitHubRepo));

  return results
    .filter(
      (result): result is PromiseFulfilledResult<GitHubRepo> =>
        result.status === "fulfilled" && result.value !== null
    )
    .map((result) => result.value);
}

// Language color mapping based on GitHub's language colors
export const languageColors: Record<string, string> = {
  OCaml: "#EF7A08",
  Reason: "#ff5847",
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Makefile: "#427819",
};

export function getLanguageColor(language: string | null): string {
  if (!language) return "#858585";
  return languageColors[language] || "#858585";
}

