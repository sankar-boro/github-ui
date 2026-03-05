import type { ProfileSettings, Session, SSHKey } from '../types/settings';

// Mock data
export const mockProfileSettings: ProfileSettings = {
  name: 'John Doe',
  bio: 'Full-stack developer passionate about open source. Creating tools for developers.',
  company: 'Acme Corp',
  location: 'San Francisco, CA',
  email: 'john@example.com',
  blog: 'https://johndoe.dev',
  twitter: 'johndoe',
  pronouns: 'he/him',
};

export const mockSessions: Session[] = [
  {
    id: '1',
    browser: 'Chrome 120.0',
    os: 'macOS 14.0',
    ip: '192.168.1.100',
    location: 'San Francisco, CA',
    lastActive: '2024-01-15T10:30:00Z',
    current: true,
  },
  {
    id: '2',
    browser: 'Firefox 121.0',
    os: 'Windows 11',
    ip: '203.0.113.45',
    location: 'New York, NY',
    lastActive: '2024-01-14T08:20:00Z',
    current: false,
  },
  {
    id: '3',
    browser: 'Safari 17.0',
    os: 'iOS 17.0',
    ip: '198.51.100.67',
    location: 'London, UK',
    lastActive: '2024-01-13T15:45:00Z',
    current: false,
  },
];

export const mockSSHKeys: SSHKey[] = [
  {
    id: '1',
    title: 'MacBook Pro',
    fingerprint: 'SHA256:abc123def456',
    addedAt: '2023-12-01T10:30:00Z',
    lastUsed: '2024-01-15T09:20:00Z',
  },
  {
    id: '2',
    title: 'Work Desktop',
    fingerprint: 'SHA256:xyz789uvw123',
    addedAt: '2023-11-15T14:45:00Z',
    lastUsed: '2024-01-14T16:30:00Z',
  },
];
