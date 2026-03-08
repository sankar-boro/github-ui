// Types
export interface UserProfile {
  id: number;
  username: string;
  full_name: string;
  email: string;
  avatar_url: string;
  bio: string | null;
  company: string | null;
  location: string | null;
  blog: string | null;
  twitter: string | null;
  publicRepos: number;
  publicGists: number;
  followers: number;
  following: number;
  createdAt: string;
  isVerified: boolean;
  isSponsor: boolean;
  status?: {
    emoji?: string;
    message: string;
  };
}

export interface PinnedRepository {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  private: boolean;
}

export interface Contribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}
