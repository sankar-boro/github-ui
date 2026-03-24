import type { PinnedRepository } from '../types/profile';

export const mockPinnedRepos: PinnedRepository[] = [
  {
    id: 1,
    name: 'project-alpha',
    description: 'A modern web application with React and Node.js',
    language: 'TypeScript',
    stars: 128,
    forks: 34,
    private: false,
  },
  {
    id: 2,
    name: 'dotfiles',
    description: 'My personal dotfiles configuration',
    language: 'Vim script',
    stars: 45,
    forks: 12,
    private: true,
  },
  {
    id: 3,
    name: 'awesome-project',
    description: 'An awesome open-source project',
    language: 'Python',
    stars: 256,
    forks: 78,
    private: false,
  },
  {
    id: 4,
    name: 'react-components',
    description: 'Reusable React components',
    language: 'TypeScript',
    stars: 89,
    forks: 23,
    private: false,
  },
];

export const mockRepositories = [
  {
    id: 1,
    name: 'project-alpha',
    fullName: 'john-doe/project-alpha',
    description: 'A modern web application built with React and Node.js',
    language: 'TypeScript',
    stars: 128,
    forks: 34,
    watchers: 12,
    openIssues: 5,
    updatedAt: '2024-01-15T10:30:00Z',
    owner: {
      login: 'john-doe',
      avatar_url: 'https://ui-avatars.com/api/?name=John+Doe',
    },
    private: false,
  },
  // ... more repositories
];
