import type { TrendingRepository, Developer, Topic } from '../types/explore';

// Mock data
export const mockTrendingRepos: TrendingRepository[] = [
  {
    id: 1,
    name: 'browser-use',
    full_name: 'browser-use/browser-use',
    description: 'Make websites accessible for AI agents',
    language: 'Python',
    stars: 24500,
    forks: 2100,
    todayStars: 850,
    owner: {
      login: 'browser-use',
      avatar_url: 'https://ui-avatars.com/api/?name=Browser+Use',
    },
  },
  {
    id: 2,
    name: 'cline',
    full_name: 'cline/cline',
    description: 'Autonomous coding agent right in your IDE',
    language: 'TypeScript',
    stars: 18200,
    forks: 1500,
    todayStars: 620,
    owner: {
      login: 'cline',
      avatar_url: 'https://ui-avatars.com/api/?name=Cline',
    },
  },
  {
    id: 3,
    name: 'dify',
    full_name: 'langgenius/dify',
    description: 'Open-source LLM app development platform',
    language: 'Python',
    stars: 51200,
    forks: 6800,
    todayStars: 1200,
    owner: {
      login: 'langgenius',
      avatar_url: 'https://ui-avatars.com/api/?name=Langgenius',
    },
  },
  {
    id: 4,
    name: 'supabase',
    full_name: 'supabase/supabase',
    description: 'The open source Firebase alternative',
    language: 'TypeScript',
    stars: 72300,
    forks: 6900,
    todayStars: 450,
    owner: {
      login: 'supabase',
      avatar_url: 'https://ui-avatars.com/api/?name=Supabase',
    },
  },
  {
    id: 5,
    name: 'cal.com',
    full_name: 'calcom/cal.com',
    description: 'Scheduling infrastructure for everyone',
    language: 'TypeScript',
    stars: 31500,
    forks: 4800,
    todayStars: 230,
    owner: {
      login: 'calcom',
      avatar_url: 'https://ui-avatars.com/api/?name=Cal.com',
    },
  },
];

export const mockDevelopers: Developer[] = [
  {
    id: 1,
    username: 'karpathy',
    name: 'Andrej Karpathy',
    avatar_url: 'https://ui-avatars.com/api/?name=Andrej+Karpathy',
    bio: 'Working on AI @ OpenAI. Previously Director of AI at Tesla.',
    repositories: 89,
    followers: 245000,
    popularRepo: {
      name: 'llm.c',
      description: 'LLM training in simple, pure C/CUDA',
      stars: 18500,
    },
  },
  {
    id: 2,
    username: 'tj',
    name: 'TJ Holowaychuk',
    avatar_url: 'https://ui-avatars.com/api/?name=TJ+Holowaychuk',
    bio: 'Co-founder @ Apex. Creator of Express, Koa, and many other open source projects.',
    repositories: 312,
    followers: 189000,
    popularRepo: {
      name: 'express',
      description: 'Fast, unopinionated, minimalist web framework for Node.js',
      stars: 64500,
    },
  },
  {
    id: 3,
    username: 'yyx990803',
    name: 'Evan You',
    avatar_url: 'https://ui-avatars.com/api/?name=Evan+You',
    bio: 'Creator of Vue.js, Vite, and VoidZero.',
    repositories: 156,
    followers: 178000,
    popularRepo: {
      name: 'vue',
      description:
        'Vue.js is a progressive, incrementally-adoptable JavaScript framework',
      stars: 208000,
    },
  },
];

export const mockTopics: Topic[] = [
  {
    id: '1',
    name: 'artificial-intelligence',
    description: 'AI and machine learning projects',
    repositories: 452000,
  },
  {
    id: '2',
    name: 'react',
    description: 'A JavaScript library for building user interfaces',
    repositories: 891000,
  },
  {
    id: '3',
    name: 'python',
    description: 'Python is a programming language',
    repositories: 1250000,
  },
  {
    id: '4',
    name: 'developer-tools',
    description: 'Tools for developers',
    repositories: 234000,
  },
  {
    id: '5',
    name: 'database',
    description: 'Database systems and tools',
    repositories: 178000,
  },
];
