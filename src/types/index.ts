// User related types
export interface User {
  id: number;
  username: string;
  email: string;
  full_name?: string;
  avatar?: string;
  bio?: string;
  company?: string;
  location?: string;
  blog?: string;
  website?: string;
  twitter?: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  is_verified?: boolean;
  is_sponsor?: boolean;
  status?: UserStatus;
}

export interface UserStatus {
  emoji?: string;
  message: string;
  expiresAt?: string;
}

export interface UserProfile extends User {
  organizations?: Organization[];
  pinnedRepositories?: Repository[];
  topRepositories?: Repository[];
  contributedRepositories?: Repository[];
}

// Repository related types
export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description?: string;
  owner: User;
  private: boolean;
  fork: boolean;
  language?: string;
  license?: License;
  topics?: string[];
  default_branch: string;
  branches?: Branch[];
  tags?: Tag[];
  releases?: Release[];
  contributors?: Contributor[];
  stars_count: number;
  forks_count: number;
  watchers_count: number;
  openIssues: number;
  openPulls: number;
  size: number;
  homepage?: string;
  template?: boolean;
  archived: boolean;
  disabled: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  permissions?: RepositoryPermissions;
}

export interface RepositoryPermissions {
  admin: boolean;
  push: boolean;
  pull: boolean;
}

export interface Branch {
  name: string;
  commit: Commit;
  protected: boolean;
  protection?: BranchProtection;
}

export interface BranchProtection {
  requiredStatusChecks?: RequiredStatusChecks;
  enforceAdmins?: boolean;
  requiredPullRequestReviews?: RequiredPullRequestReviews;
  restrictions?: Restrictions;
}

export interface RequiredStatusChecks {
  strict: boolean;
  contexts: string[];
}

export interface RequiredPullRequestReviews {
  dismissalRestrictions?: Restrictions;
  dismissStaleReviews: boolean;
  requireCodeOwnerReviews: boolean;
  requiredApprovingReviewCount: number;
}

export interface Restrictions {
  users: User[];
  teams: Team[];
  apps?: App[];
}

export interface Tag {
  name: string;
  commit: Commit;
  tarballUrl: string;
  zipballUrl: string;
}

export interface Release {
  id: number;
  tagName: string;
  targetCommitish: string;
  name: string;
  body?: string;
  draft: boolean;
  prerelease: boolean;
  created_at: string;
  publishedAt: string;
  author: User;
  assets: ReleaseAsset[];
}

export interface ReleaseAsset {
  id: number;
  name: string;
  label?: string;
  contentType: string;
  size: number;
  downloadCount: number;
  created_at: string;
  updated_at: string;
  browserDownloadUrl: string;
}

export interface Contributor {
  user: User;
  contributions: number;
}

// Commit related types
export interface Commit {
  sha: string;
  nodeId: string;
  commit: CommitDetails;
  url: string;
  htmlUrl: string;
  commentsUrl: string;
  author?: User;
  committer?: User;
  parents?: Commit[];
  stats?: CommitStats;
  files?: CommitFile[];
}

export interface CommitDetails {
  author: CommitAuthor;
  committer: CommitAuthor;
  message: string;
  tree: Tree;
  url: string;
  commentCount: number;
  verification?: Verification;
}

export interface CommitAuthor {
  name: string;
  email: string;
  date: string;
}

export interface CommitStats {
  additions: number;
  deletions: number;
  total: number;
}

export interface CommitFile {
  sha: string;
  filename: string;
  status:
    | 'added'
    | 'modified'
    | 'removed'
    | 'renamed'
    | 'copied'
    | 'changed'
    | 'unchanged';
  additions: number;
  deletions: number;
  changes: number;
  blobUrl: string;
  rawUrl: string;
  contentsUrl: string;
  patch?: string;
  previousFilename?: string;
}

export interface Tree {
  sha: string;
  url: string;
  tree?: TreeItem[];
}

export interface TreeItem {
  path: string;
  mode: string;
  type: 'blob' | 'tree' | 'commit';
  sha: string;
  size?: number;
  url: string;
}

export interface Blob {
  sha: string;
  nodeId: string;
  size: number;
  url: string;
  content: string;
  encoding: 'utf-8' | 'base64';
}

// Issue related types
export interface Issue {
  id: number;
  number: number;
  title: string;
  body?: string;
  user: User;
  assignees?: User[];
  labels?: Label[];
  milestone?: Milestone;
  state: 'open' | 'closed';
  locked: boolean;
  comments: number;
  pullRequest?: PullRequestReference;
  closedAt?: string;
  created_at: string;
  updated_at: string;
  repository: Repository;
  reactions?: Reactions;
}

export interface IssueComment {
  id: number;
  body: string;
  user: User;
  created_at: string;
  updated_at: string;
  reactions?: Reactions;
}

export interface Label {
  id: number;
  nodeId: string;
  url: string;
  name: string;
  description?: string;
  color: string;
  default: boolean;
}

export interface Milestone {
  id: number;
  number: number;
  title: string;
  description?: string;
  creator: User;
  openIssues: number;
  closedIssues: number;
  state: 'open' | 'closed';
  created_at: string;
  updated_at: string;
  dueOn?: string;
  closedAt?: string;
}

export interface Reactions {
  url: string;
  totalCount: number;
  '+1': number;
  '-1': number;
  laugh: number;
  hooray: number;
  confused: number;
  heart: number;
  rocket: number;
  eyes: number;
}

// Pull Request related types
export interface PullRequest {
  id: number;
  number: number;
  title: string;
  body?: string;
  user: User;
  assignees?: User[];
  requestedReviewers?: User[];
  requestedTeams?: Team[];
  labels?: Label[];
  milestone?: Milestone;
  state: 'open' | 'closed';
  locked: boolean;
  merged: boolean;
  mergeable?: boolean;
  rebaseable?: boolean;
  mergeableState?: string;
  comments: number;
  reviewComments: number;
  commits: number;
  additions: number;
  deletions: number;
  changedFiles: number;
  head: PullRequestBranch;
  base: PullRequestBranch;
  authorAssociation: string;
  draft: boolean;
  mergedAt?: string;
  created_at: string;
  updated_at: string;
  closedAt?: string;
  mergedBy?: User;
  repository: Repository;
  reactions?: Reactions;
}

export interface PullRequestBranch {
  label: string;
  ref: string;
  sha: string;
  user: User;
  repo: Repository;
}

export interface PullRequestReference {
  id: number;
  url: string;
  htmlUrl: string;
  diffUrl: string;
  patchUrl: string;
}

export interface Review {
  id: number;
  user: User;
  body?: string;
  commitId: string;
  state:
    | 'APPROVED'
    | 'CHANGES_REQUESTED'
    | 'COMMENTED'
    | 'DISMISSED'
    | 'PENDING';
  submittedAt: string;
  htmlUrl: string;
  pullRequestUrl: string;
}

export interface ReviewComment {
  id: number;
  body: string;
  path: string;
  position?: number;
  line?: number;
  commitId: string;
  user: User;
  created_at: string;
  updated_at: string;
  htmlUrl: string;
  pullRequestUrl: string;
  inReplyToId?: number;
}

// Organization related types
export interface Organization {
  id: number;
  login: string;
  name?: string;
  email?: string;
  avatar?: string;
  description?: string;
  company?: string;
  location?: string;
  blog?: string;
  twitter?: string;
  publicRepos: number;
  publicGists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  type: 'Organization';
  is_verified?: boolean;
  members?: User[];
  teams?: Team[];
}

export interface Team {
  id: number;
  nodeId: string;
  name: string;
  slug: string;
  description?: string;
  privacy: 'closed' | 'secret';
  permission: 'pull' | 'push' | 'admin';
  membersCount: number;
  reposCount: number;
  organization: Organization;
  created_at: string;
  updated_at: string;
}

export interface App {
  id: number;
  slug: string;
  name: string;
  description?: string;
  externalUrl: string;
  htmlUrl: string;
  owner: User | Organization;
  created_at: string;
  updated_at: string;
  permissions: Record<string, string>;
}

// Activity related types
export interface Event {
  id: string;
  type: EventType;
  actor: User;
  repo: Repository;
  payload: any;
  public: boolean;
  created_at: string;
  org?: Organization;
}

export type EventType =
  | 'CommitCommentEvent'
  | 'CreateEvent'
  | 'DeleteEvent'
  | 'ForkEvent'
  | 'GollumEvent'
  | 'IssueCommentEvent'
  | 'IssuesEvent'
  | 'MemberEvent'
  | 'PublicEvent'
  | 'PullRequestEvent'
  | 'PullRequestReviewEvent'
  | 'PullRequestReviewCommentEvent'
  | 'PushEvent'
  | 'ReleaseEvent'
  | 'SponsorshipEvent'
  | 'WatchEvent';

export interface PushEventPayload {
  pushId: number;
  size: number;
  distinctSize: number;
  ref: string;
  head: string;
  before: string;
  commits: Commit[];
}

export interface PullRequestEventPayload {
  action:
    | 'opened'
    | 'closed'
    | 'reopened'
    | 'synchronize'
    | 'edited'
    | 'assigned'
    | 'unassigned'
    | 'review_requested'
    | 'review_request_removed'
    | 'labeled'
    | 'unlabeled';
  number: number;
  pullRequest: PullRequest;
}

export interface IssuesEventPayload {
  action:
    | 'opened'
    | 'closed'
    | 'reopened'
    | 'edited'
    | 'assigned'
    | 'unassigned'
    | 'labeled'
    | 'unlabeled';
  issue: Issue;
}

// Notification types
export interface Notification {
  id: string;
  repository: Repository;
  subject: NotificationSubject;
  reason: string;
  unread: boolean;
  updated_at: string;
  lastReadAt?: string;
  url: string;
}

export interface NotificationSubject {
  title: string;
  url: string;
  latestCommentUrl?: string;
  type:
    | 'Issue'
    | 'PullRequest'
    | 'Commit'
    | 'Release'
    | 'RepositoryInvitation'
    | 'RepositoryVulnerabilityAlert';
}

// Search types
export interface SearchResult<T> {
  totalCount: number;
  incompleteResults: boolean;
  items: T[];
}

export interface SearchQuery {
  q: string;
  sort?: string;
  order?: 'asc' | 'desc';
  perPage?: number;
  page?: number;
}

export interface RepositorySearchResult extends Repository {
  score: number;
  textMatches?: TextMatch[];
}

export interface CodeSearchResult {
  name: string;
  path: string;
  sha: string;
  url: string;
  gitUrl: string;
  htmlUrl: string;
  repository: Repository;
  score: number;
  textMatches?: TextMatch[];
}

export interface TextMatch {
  objectUrl: string;
  objectType: string;
  property: string;
  fragment: string;
  matches: Match[];
}

export interface Match {
  text: string;
  indices: number[];
}

// File and content types
export interface Content {
  type: 'file' | 'dir' | 'symlink' | 'submodule';
  encoding?: string;
  size: number;
  name: string;
  path: string;
  content?: string;
  sha: string;
  url: string;
  gitUrl: string;
  htmlUrl: string;
  downloadUrl?: string;
  links: {
    git: string;
    html: string;
    self: string;
  };
}

export interface SymlinkContent extends Content {
  target: string;
}

export interface SubmoduleContent extends Content {
  submoduleGitUrl: string;
}

// Gist types
export interface Gist {
  id: string;
  nodeId: string;
  url: string;
  forksUrl: string;
  commitsUrl: string;
  gitPullUrl: string;
  gitPushUrl: string;
  htmlUrl: string;
  files: Record<string, GistFile>;
  public: boolean;
  created_at: string;
  updated_at: string;
  description?: string;
  comments: number;
  user?: User;
  commentsUrl: string;
  owner?: User;
  forks?: Gist[];
  history?: GistHistory[];
}

export interface GistFile {
  filename: string;
  type: string;
  language?: string;
  rawUrl: string;
  size: number;
  content?: string;
}

export interface GistHistory {
  user: User;
  version: string;
  committedAt: string;
  changeStatus: {
    total: number;
    additions: number;
    deletions: number;
  };
  url: string;
}

// License types
export interface License {
  key: string;
  name: string;
  spdxId: string;
  url?: string;
  nodeId: string;
  htmlUrl?: string;
  description?: string;
  implementation?: string;
  permissions?: string[];
  conditions?: string[];
  limitations?: string[];
  body?: string;
  featured?: boolean;
}

// Verification types
export interface Verification {
  verified: boolean;
  reason: string;
  signature?: string;
  payload?: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  page: number;
  perPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface ApiError {
  message: string;
  documentationUrl?: string;
  errors?: ApiErrorDetail[];
}

export interface ApiErrorDetail {
  resource: string;
  field: string;
  code: string;
  message?: string;
}

// Webhook types
export interface Webhook {
  id: number;
  name: string;
  active: boolean;
  events: string[];
  config: WebhookConfig;
  updated_at: string;
  created_at: string;
  url: string;
  pingUrl: string;
  testUrl: string;
}

export interface WebhookConfig {
  url: string;
  contentType: 'json' | 'form';
  secret?: string;
  insecureSsl?: boolean;
}

// Stats types
export interface RepositoryStats {
  contributions: ContributionStats;
  traffic: TrafficStats;
  clones: CloneStats;
  views: ViewStats;
}

export interface ContributionStats {
  totalCommits: number;
  totalContributors: number;
  weeklyCommits: WeeklyCommit[];
}

export interface WeeklyCommit {
  week: string;
  total: number;
  days: number[];
}

export interface TrafficStats {
  referrers: Referrer[];
  paths: PathStats[];
}

export interface Referrer {
  referrer: string;
  count: number;
  uniques: number;
}

export interface PathStats {
  path: string;
  title: string;
  count: number;
  uniques: number;
}

export interface CloneStats {
  count: number;
  uniques: number;
  clones: DailyClone[];
}

export interface DailyClone {
  timestamp: string;
  count: number;
  uniques: number;
}

export interface ViewStats {
  count: number;
  uniques: number;
  views: DailyView[];
}

export interface DailyView {
  timestamp: string;
  count: number;
  uniques: number;
}

// Project types (GitHub Projects)
export interface Project {
  id: number;
  name: string;
  body?: string;
  number: number;
  state: 'open' | 'closed';
  creator: User;
  created_at: string;
  updated_at: string;
  columnsUrl: string;
}

export interface ProjectColumn {
  id: number;
  name: string;
  cardsUrl: string;
  projectUrl: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectCard {
  id: number;
  note?: string;
  contentUrl?: string;
  columnUrl: string;
  creator: User;
  created_at: string;
  updated_at: string;
}

// Workflow types (GitHub Actions)
export interface Workflow {
  id: number;
  nodeId: string;
  name: string;
  path: string;
  state:
    | 'active'
    | 'deleted'
    | 'disabled_fork'
    | 'disabled_inactivity'
    | 'disabled_manually';
  created_at: string;
  updated_at: string;
  url: string;
  htmlUrl: string;
  badgeUrl: string;
}

export interface WorkflowRun {
  id: number;
  name?: string;
  nodeId: string;
  headBranch: string;
  headSha: string;
  runNumber: number;
  event: string;
  status: 'queued' | 'in_progress' | 'completed';
  conclusion?:
    | 'success'
    | 'failure'
    | 'neutral'
    | 'cancelled'
    | 'skipped'
    | 'timed_out'
    | 'action_required';
  workflowId: number;
  checkSuiteId: number;
  checkSuiteNodeId: string;
  url: string;
  htmlUrl: string;
  pullRequests: PullRequestReference[];
  created_at: string;
  updated_at: string;
  runAttempt: number;
  runStartedAt: string;
  jobsUrl: string;
  logsUrl: string;
  artifactsUrl: string;
  cancelUrl: string;
  rerunUrl: string;
  workflowUrl: string;
  headCommit: Commit;
  repository: Repository;
  headRepository: Repository;
}

export interface WorkflowJob {
  id: number;
  runId: number;
  runUrl: string;
  nodeId: string;
  headSha: string;
  url: string;
  htmlUrl: string;
  status: 'queued' | 'in_progress' | 'completed';
  conclusion?: string;
  startedAt: string;
  completedAt?: string;
  name: string;
  steps?: WorkflowStep[];
  checkRunUrl: string;
  labels: string[];
  runnerId?: number;
  runnerName?: string;
  runnerGroupId?: number;
  runnerGroupName?: string;
}

export interface WorkflowStep {
  name: string;
  status: 'queued' | 'in_progress' | 'completed';
  conclusion?: string;
  number: number;
  startedAt?: string;
  completedAt?: string;
}

// Package types (GitHub Packages)
export interface Package {
  id: number;
  name: string;
  packageType: 'npm' | 'maven' | 'rubygems' | 'docker' | 'nuget' | 'container';
  owner: User | Organization;
  versionCount: number;
  visibility: 'private' | 'public';
  url: string;
  created_at: string;
  updated_at: string;
  repository?: Repository;
}

export interface PackageVersion {
  id: number;
  name: string;
  url: string;
  packageHtmlUrl: string;
  created_at: string;
  updated_at: string;
  htmlUrl: string;
  metadata?: PackageMetadata;
}

export interface PackageMetadata {
  packageType: string;
  container?: ContainerMetadata;
  docker?: DockerMetadata;
}

export interface ContainerMetadata {
  tags: string[];
}

export interface DockerMetadata {
  tag: string[];
}

// Code scanning and security types
export interface CodeScanningAlert {
  number: number;
  ruleId: string;
  ruleSeverity: 'none' | 'note' | 'warning' | 'error';
  ruleDescription: string;
  tool: CodeScanningTool;
  created_at: string;
  updated_at?: string;
  fixedAt?: string;
  state: 'open' | 'fixed' | 'dismissed';
  dismissedBy?: User;
  dismissedAt?: string;
  dismissedReason?: string;
  dismissedComment?: string;
  url: string;
  htmlUrl: string;
  instancesUrl: string;
  mostRecentInstance: CodeScanningInstance;
}

export interface CodeScanningTool {
  name: string;
  version?: string;
  guid?: string;
}

export interface CodeScanningInstance {
  ref: string;
  analysisKey: string;
  environment: string;
  category?: string;
  state: 'open' | 'fixed' | 'dismissed';
  commitSha: string;
  message: {
    text: string;
  };
  location: CodeScanningLocation;
  classifications?: string[];
}

export interface CodeScanningLocation {
  path: string;
  startLine: number;
  endLine: number;
  startColumn?: number;
  endColumn?: number;
}

export interface SecretScanningAlert {
  number: number;
  created_at: string;
  updated_at?: string;
  url: string;
  htmlUrl: string;
  locationsUrl: string;
  state: 'open' | 'resolved';
  resolution?: string;
  resolvedAt?: string;
  resolvedBy?: User;
  secretType: string;
  secret: string;
  pushProtectionBypassed?: boolean;
  pushProtectionBypassedBy?: User;
  pushProtectionBypassedAt?: string;
}
