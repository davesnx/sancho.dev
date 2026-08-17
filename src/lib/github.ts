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

export const formatGitHubStars = (stars: number) => new Intl.NumberFormat('en', { notation: 'compact' }).format(stars);
