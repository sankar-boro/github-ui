import type { User, SearchQuery } from './index';

// Auth API types
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  name?: string;
}

export interface RegisterResponse {
  message: string;
  userId: number;
}

// Repository API types
export interface CreateRepositoryRequest {
  name: string;
  description?: string;
  private?: boolean;
  autoInit?: boolean;
  gitignoreTemplate?: string;
  licenseTemplate?: string;
  readme?: boolean;
}

export interface UpdateRepositoryRequest {
  name?: string;
  description?: string;
  private?: boolean;
  homepage?: string;
  defaultBranch?: string;
  hasIssues?: boolean;
  hasProjects?: boolean;
  hasWiki?: boolean;
  isTemplate?: boolean;
}

export interface ForkRepositoryRequest {
  organization?: string;
  name?: string;
  defaultBranchOnly?: boolean;
}

// Issue API types
export interface CreateIssueRequest {
  title: string;
  body?: string;
  assignees?: string[];
  labels?: string[];
  milestone?: number;
}

export interface UpdateIssueRequest {
  title?: string;
  body?: string;
  state?: 'open' | 'closed';
  assignees?: string[];
  labels?: string[];
  milestone?: number | null;
}

export interface CreateIssueCommentRequest {
  body: string;
}

// Pull Request API types
export interface CreatePullRequestRequest {
  title: string;
  head: string;
  base: string;
  body?: string;
  draft?: boolean;
  maintainerCanModify?: boolean;
}

export interface UpdatePullRequestRequest {
  title?: string;
  body?: string;
  state?: 'open' | 'closed';
  base?: string;
  maintainerCanModify?: boolean;
}

export interface CreatePullRequestReviewRequest {
  commitId?: string;
  body?: string;
  event: 'APPROVE' | 'REQUEST_CHANGES' | 'COMMENT';
  comments?: ReviewCommentRequest[];
}

export interface ReviewCommentRequest {
  path: string;
  position?: number;
  line?: number;
  body: string;
}

// File API types
export interface CreateOrUpdateFileRequest {
  message: string;
  content: string;
  sha?: string;
  branch?: string;
  committer?: CommitterInfo;
  author?: CommitterInfo;
}

export interface DeleteFileRequest {
  message: string;
  sha: string;
  branch?: string;
  committer?: CommitterInfo;
  author?: CommitterInfo;
}

export interface CommitterInfo {
  name: string;
  email: string;
  date?: string;
}

// Search API types
export interface SearchRepositoriesParams extends SearchQuery {
  sort?: 'stars' | 'forks' | 'help-wanted-issues' | 'updated';
}

export interface SearchIssuesParams extends SearchQuery {
  sort?:
    | 'comments'
    | 'reactions'
    | 'reactions-+1'
    | 'reactions--1'
    | 'reactions-smile'
    | 'reactions-thinking_face'
    | 'reactions-heart'
    | 'reactions-tada'
    | 'interactions'
    | 'created'
    | 'updated';
}

export interface SearchCodeParams extends SearchQuery {
  sort?: 'indexed';
}

// Webhook API types
export interface CreateWebhookRequest {
  name: string;
  config: WebhookConfig;
  events?: string[];
  active?: boolean;
}

export interface UpdateWebhookRequest {
  config?: WebhookConfig;
  events?: string[];
  active?: boolean;
}

export interface WebhookConfig {
  url: string;
  contentType?: 'json' | 'form';
  secret?: string;
  insecureSsl?: boolean;
}

// Release API types
export interface CreateReleaseRequest {
  tagName: string;
  targetCommitish?: string;
  name?: string;
  body?: string;
  draft?: boolean;
  prerelease?: boolean;
  generateReleaseNotes?: boolean;
}

export interface UpdateReleaseRequest {
  tagName?: string;
  targetCommitish?: string;
  name?: string;
  body?: string;
  draft?: boolean;
  prerelease?: boolean;
}

// Gist API types
export interface CreateGistRequest {
  description?: string;
  public: boolean;
  files: Record<string, { content: string }>;
}

export interface UpdateGistRequest {
  description?: string;
  files: Record<string, { content?: string; filename?: string } | null>;
}

// Organization API types
export interface CreateOrganizationRequest {
  login: string;
  name?: string;
  description?: string;
  email?: string;
  location?: string;
  company?: string;
  blog?: string;
  twitter?: string;
}

export interface CreateTeamRequest {
  name: string;
  description?: string;
  privacy?: 'closed' | 'secret';
  permission?: 'pull' | 'push' | 'admin';
  parentTeamId?: number;
}

// Actions API types
export interface DispatchWorkflowRequest {
  ref: string;
  inputs?: Record<string, string>;
}

export interface CreateWorkflowDispatchRequest {
  ref: string;
  inputs?: Record<string, string>;
}

// Pagination types
export interface PaginationParams {
  perPage?: number;
  page?: number;
}

export interface PaginatedRequest extends PaginationParams {
  since?: string;
  before?: string;
}

// Filter types
export interface RepositoryFilters extends PaginationParams {
  type?: 'all' | 'owner' | 'public' | 'private' | 'member';
  sort?: 'created' | 'updated' | 'pushed' | 'full_name';
  direction?: 'asc' | 'desc';
  visibility?: 'all' | 'public' | 'private';
  affiliation?: string;
}

export interface IssueFilters extends PaginationParams {
  filter?:
    | 'assigned'
    | 'created'
    | 'mentioned'
    | 'subscribed'
    | 'repos'
    | 'all';
  state?: 'open' | 'closed' | 'all';
  labels?: string[];
  sort?: 'created' | 'updated' | 'comments';
  direction?: 'asc' | 'desc';
  since?: string;
}

export interface PullRequestFilters extends PaginationParams {
  state?: 'open' | 'closed' | 'all';
  head?: string;
  base?: string;
  sort?: 'created' | 'updated' | 'popularity' | 'long-running';
  direction?: 'asc' | 'desc';
}

export interface NotificationFilters extends PaginationParams {
  all?: boolean;
  participating?: boolean;
  since?: string;
  before?: string;
}
