// Types
export interface TrendingRepository {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  todayStars: number;
  owner: {
    login: string;
    avatar: string;
  };
}

export interface Developer {
  id: number;
  username: string;
  name: string;
  avatar: string;
  bio: string | null;
  repositories: number;
  followers: number;
  popularRepo?: {
    name: string;
    description: string;
    stars: number;
  };
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  repositories: number;
  icon?: string;
}
