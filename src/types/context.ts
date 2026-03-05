import type { User, Notification, Repository, Webhook } from './index';

// Auth Context
export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  refreshToken: () => Promise<void>;
}

// Theme Context
export type ThemeMode = 'light' | 'dark' | 'system';
export type ThemeColor = 'blue' | 'purple' | 'green' | 'orange' | 'red';

export interface ThemeContextType {
  mode: ThemeMode;
  color: ThemeColor;
  setMode: (mode: ThemeMode) => void;
  setColor: (color: ThemeColor) => void;
  isDark: boolean;
}

// Notification Context
export interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  fetchNotifications: () => Promise<void>;
  subscribeToNotifications: () => void;
  unsubscribeFromNotifications: () => void;
}

// Repository Context
export interface RepositoryContextType {
  currentRepository?: Repository;
  repositories: Repository[];
  starredRepositories: Repository[];
  isLoading: boolean;
  fetchRepositories: (params?: any) => Promise<void>;
  fetchStarredRepositories: () => Promise<void>;
  starRepository: (repoId: number) => Promise<void>;
  unstarRepository: (repoId: number) => Promise<void>;
  setCurrentRepository: (repo: Repository) => void;
}

// Search Context
export interface SearchContextType {
  recentSearches: string[];
  savedSearches: SavedSearch[];
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
  saveSearch: (name: string, query: string) => Promise<void>;
  deleteSavedSearch: (id: string) => Promise<void>;
}

export interface SavedSearch {
  id: string;
  name: string;
  query: string;
  createdAt: string;
}

// Settings Context
export interface SettingsContextType {
  settings: UserSettings;
  updateSettings: (settings: Partial<UserSettings>) => Promise<void>;
  isLoading: boolean;
}

export interface UserSettings {
  profile: ProfileSettings;
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  security: SecuritySettings;
  appearance: AppearanceSettings;
  integrations: IntegrationSettings;
}

export interface ProfileSettings {
  name?: string;
  bio?: string;
  company?: string;
  location?: string;
  email?: string;
  blog?: string;
  twitter?: string;
}

export interface NotificationSettings {
  email: {
    mentions: boolean;
    comments: boolean;
    pullRequests: boolean;
    releases: boolean;
    security: boolean;
  };
  web: {
    mentions: boolean;
    comments: boolean;
    pullRequests: boolean;
    releases: boolean;
    security: boolean;
  };
  desktop: boolean;
  mobile: boolean;
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'private';
  emailVisibility: 'public' | 'private' | 'hidden';
  contributionsVisibility: 'public' | 'private';
  blockedUsers: string[];
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  sessionTimeout: number;
  trustedDevices: TrustedDevice[];
  activeSessions: Session[];
}

export interface TrustedDevice {
  id: string;
  name: string;
  lastUsed: string;
  location: string;
}

export interface Session {
  id: string;
  browser: string;
  os: string;
  ip: string;
  location: string;
  lastActive: string;
  current: boolean;
}

export interface AppearanceSettings {
  theme: ThemeMode;
  themeColor: ThemeColor;
  codeTheme: 'light' | 'dark' | 'github-light' | 'github-dark';
  fontSize: number;
  tabSize: number;
  wordWrap: boolean;
  lineNumbers: boolean;
}

export interface IntegrationSettings {
  connectedApps: ConnectedApp[];
  webhooks: Webhook[];
}

export interface ConnectedApp {
  id: string;
  name: string;
  icon: string;
  permissions: string[];
  lastUsed: string;
}

// Editor Context
export interface EditorContextType {
  content: string;
  language: string;
  filename?: string;
  setContent: (content: string) => void;
  setLanguage: (language: string) => void;
  setFilename: (filename: string) => void;
  saveContent: () => Promise<void>;
  formatContent: () => void;
  undo: () => void;
  redo: () => void;
}

// Keyboard Shortcuts Context
export interface KeyboardShortcutsContextType {
  shortcuts: KeyboardShortcut[];
  registerShortcut: (shortcut: KeyboardShortcut) => void;
  unregisterShortcut: (id: string) => void;
  isEnabled: boolean;
  setEnabled: (enabled: boolean) => void;
}

export interface KeyboardShortcut {
  id: string;
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  metaKey?: boolean;
  action: () => void;
  description: string;
  scope?: string;
}
