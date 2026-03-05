// Types
export interface ProfileSettings {
  name: string;
  bio: string;
  company: string;
  location: string;
  email: string;
  blog: string;
  twitter: string;
  pronouns: string;
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

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  passwordLastChanged: string;
  sessions: Session[];
  sshKeys: SSHKey[];
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

export interface SSHKey {
  id: string;
  title: string;
  fingerprint: string;
  addedAt: string;
  lastUsed: string;
}

export interface AppearanceSettings {
  theme: 'light' | 'dark' | 'system';
  themeColor: 'blue' | 'purple' | 'green' | 'orange' | 'red';
  codeTheme: 'light' | 'dark' | 'github-light' | 'github-dark';
  fontSize: number;
  tabSize: number;
  wordWrap: boolean;
  lineNumbers: boolean;
}
