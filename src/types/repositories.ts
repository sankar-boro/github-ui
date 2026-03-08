// Types
export interface Repository {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  private: boolean;
  fork: boolean;
  language: string | null;
  stars: number;
  forks: number;
  watchers: number;
  openIssues: number;
  updatedAt: string;
  createdAt: string;
  pushedAt: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  permissions?: {
    admin: boolean;
    push: boolean;
    pull: boolean;
  };
}

export type RepositoryType = 'all' | 'owner' | 'public' | 'private' | 'member';
export type RepositorySort =
  | 'created'
  | 'updated'
  | 'pushed'
  | 'full_name'
  | 'pushed';
export type SortDirection = 'asc' | 'desc';

export interface FilterState {
  type: RepositoryType;
  sort: RepositorySort;
  direction: SortDirection;
  language?: string;
  showArchived: boolean;
  showForks: boolean;
  showTemplates: boolean;
}

export interface LanguageOption {
  value: string;
  label: string;
  count: number;
  color: string;
}
