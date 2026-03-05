import type { ReactNode } from 'react';
import type {
  User,
  Repository,
  Issue,
  PullRequest,
  Event,
  Notification,
  Content,
  Label,
  Milestone,
  Commit,
  Organization,
  Tag,
  IssueComment,
  CommitFile,
  Review,
  SearchResult,
  CodeSearchResult,
} from './index';
import type { CreatePullRequestReviewRequest } from './api';

// Layout component props
export interface LayoutProps {
  children?: ReactNode;
}

export interface HeaderProps {
  showSearch?: boolean;
  showNotifications?: boolean;
  showCreateMenu?: boolean;
}

export interface SidebarProps {
  repositories?: Repository[];
  organizations?: Organization[];
}

// Repository component props
export interface RepositoryCardProps {
  repository: Repository;
  showOwner?: boolean;
  showActions?: boolean;
  onStar?: (repo: Repository) => void;
  onFork?: (repo: Repository) => void;
}

export interface FileExplorerProps {
  files: Content[];
  currentBranch?: string;
  onFileClick?: (file: Content) => void;
  onFolderClick?: (folder: Content) => void;
  onBranchChange?: (branch: string) => void;
}

export interface ReadmeProps {
  content?: string;
  repository: Repository;
  branch?: string;
  onEdit?: () => void;
}

export interface CodeViewerProps {
  content: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  wrapLines?: boolean;
  fontSize?: number;
  theme?: 'dark' | 'light';
}

export interface BranchSelectorProps {
  branches: string[];
  currentBranch: string;
  onBranchChange: (branch: string) => void;
  onCreateBranch?: () => void;
  onViewAllBranches?: () => void;
}

export interface TagListProps {
  tags: Tag[];
  onTagClick?: (tag: Tag) => void;
}

// Issue component props
export interface IssueCardProps {
  issue: Issue;
  showRepository?: boolean;
  showAssignees?: boolean;
  onComment?: (issue: Issue) => void;
  onClose?: (issue: Issue) => void;
  onReopen?: (issue: Issue) => void;
}

export interface IssueListProps {
  issues: Issue[];
  loading?: boolean;
  error?: Error | null;
  onIssueClick?: (issue: Issue) => void;
  onPageChange?: (page: number) => void;
  currentPage?: number;
  totalPages?: number;
}

export interface IssueDetailProps {
  issue: Issue;
  comments?: IssueComment[];
  onAddComment?: (comment: string) => void;
  onEditComment?: (commentId: number, body: string) => void;
  onDeleteComment?: (commentId: number) => void;
  onAssign?: (assignees: string[]) => void;
  onAddLabel?: (labels: string[]) => void;
  onSetMilestone?: (milestone: number | null) => void;
  onCloseIssue?: () => void;
  onReopenIssue?: () => void;
}

export interface CommentFormProps {
  onSubmit: (comment: string) => void;
  onCancel?: () => void;
  initialValue?: string;
  placeholder?: string;
  submitting?: boolean;
}

export interface LabelListProps {
  labels: Label[];
  onLabelClick?: (label: Label) => void;
  editable?: boolean;
  onAddLabel?: (label: Label) => void;
  onRemoveLabel?: (label: Label) => void;
}

export interface MilestoneProps {
  milestone: Milestone;
  progress?: number;
  onViewIssues?: () => void;
  onEdit?: () => void;
  onClose?: () => void;
}

// Pull Request component props
export interface PullRequestCardProps {
  pullRequest: PullRequest;
  showRepository?: boolean;
  onReview?: (pr: PullRequest) => void;
  onMerge?: (pr: PullRequest) => void;
  onClose?: (pr: PullRequest) => void;
}

export interface PullRequestDetailProps {
  pullRequest: PullRequest;
  commits?: Commit[];
  files?: CommitFile[];
  reviews?: Review[];
  onAddReview?: (review: CreatePullRequestReviewRequest) => void;
  onMergePR?: (method: 'merge' | 'squash' | 'rebase') => void;
  onClosePR?: () => void;
  onReopenPR?: () => void;
}

export interface PullRequestDiffProps {
  files: CommitFile[];
  view?: 'unified' | 'split';
  onComment?: (file: string, line: number, comment: string) => void;
}

export interface ReviewBoxProps {
  onSubmit: (review: CreatePullRequestReviewRequest) => void;
  onCancel?: () => void;
  submitting?: boolean;
}

// Profile component props
export interface ProfileHeaderProps {
  user: User;
  isOwnProfile?: boolean;
  onEdit?: () => void;
  onFollow?: () => void;
  onSponsor?: () => void;
}

export interface ProfileStatsProps {
  user: User;
  showDetails?: boolean;
}

export interface ProfileReadmeProps {
  username: string;
  content?: string;
}

export interface OrganizationListProps {
  organizations: Organization[];
  onOrganizationClick?: (org: Organization) => void;
}

// Activity component props
export interface ActivityFeedProps {
  events: Event[];
  loading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

export interface EventItemProps {
  event: Event;
  onActorClick?: (actor: User) => void;
  onRepoClick?: (repo: Repository) => void;
}

export interface PushEventDetailsProps {
  commits: Commit[];
  ref: string;
  repoName: string;
}

// Notification component props
export interface NotificationListProps {
  notifications: Notification[];
  loading?: boolean;
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
  onNotificationClick?: (notification: Notification) => void;
}

export interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead?: (id: string) => void;
  onClick?: (notification: Notification) => void;
}

// Search component props
export interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
  loading?: boolean;
  suggestions?: SearchSuggestion[];
}

export interface SearchSuggestion {
  type: 'repository' | 'user' | 'issue' | 'code';
  text: string;
  description?: string;
  url: string;
}

export interface SearchResultsProps {
  query: string;
  repositories?: SearchResult<Repository>;
  users?: SearchResult<User>;
  code?: SearchResult<CodeSearchResult>;
  issues?: SearchResult<Issue>;
  loading?: boolean;
  activeTab?: 'repositories' | 'users' | 'code' | 'issues';
  onTabChange?: (tab: string) => void;
}

// Common component props
export interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

export interface InputProps {
  label?: string;
  error?: string;
  hint?: string;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onLeftIconClick?: () => void;
  onRightIconClick?: () => void;
}

export interface SelectProps extends InputProps {
  options: Array<{ value: string; label: string }>;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  closeOnClickOutside?: boolean;
}

export interface TabsProps {
  tabs: Array<{ id: string; label: string; icon?: ReactNode }>;
  activeTab: string;
  onChange: (tabId: string) => void;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  showFirstLast?: boolean;
}

export interface BreadcrumbProps {
  items: Array<{ label: string; href?: string; icon?: ReactNode }>;
}

export interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

export interface AvatarProps {
  src?: string;
  alt: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square';
  status?: 'online' | 'offline' | 'busy' | 'away';
}

export interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md';
  rounded?: boolean;
  icon?: ReactNode;
}

export interface DropdownProps {
  trigger: ReactNode;
  children: ReactNode;
  placement?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  onOpen?: () => void;
  onClose?: () => void;
}

export interface DropdownItemProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  icon?: ReactNode;
  danger?: boolean;
}

export interface SkeletonProps {
  variant?: 'text' | 'circle' | 'rectangle';
  width?: string | number;
  height?: string | number;
  count?: number;
  className?: string;
}

export interface AlertProps {
  children: ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  onClose?: () => void;
  showIcon?: boolean;
}

export interface ProgressBarProps {
  value: number;
  max?: number;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  backgroundColor?: string;
  striped?: boolean;
  animated?: boolean;
}

export interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  theme?: 'dark' | 'light';
  wrapLines?: boolean;
  fontSize?: number;
  onCopy?: () => void;
}

export interface MarkdownViewerProps {
  content: string;
  className?: string;
  onLinkClick?: (href: string) => void;
  onImageClick?: (src: string) => void;
}

export interface DateDisplayProps {
  date: string | Date;
  format?: 'relative' | 'short' | 'long' | 'datetime';
  tooltip?: boolean;
}

export interface UserMentionProps {
  username: string;
  user?: User;
  showAvatar?: boolean;
  onClick?: (username: string) => void;
}
