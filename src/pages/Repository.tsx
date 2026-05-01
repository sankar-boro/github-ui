import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Star,
  GitFork,
  Eye,
  Code2,
  GitBranch,
  Clock,
  Users,
  Home,
  Tag,
  Scale,
  BookOpen,
  ChevronDown,
  // Issue,
  // PullRequest,
} from 'lucide-react';
import FileExplorer from '../components/repository/FileExplorer';
import Readme from '../components/repository/Readme';
import NewRepo from '../components/repository/NewRepo';

import { formatDistanceToNow } from 'date-fns';
import IssuesTab from './project/Issues';
import PullRequestsTab from './project/PullRequests';
import SettingsPage from './project/SettingsPage';
import { API_URL } from '../config';
import ReadmeTemplate from '../components/repository/EmptyReadme';

interface FileNode {
  name: string;
  type: 'file' | 'folder' | 'directory';
  children?: FileNode[];
}

const Repository: React.FC = () => {
  const { username, repo } = useParams<{ username: string; repo: string }>();

  const [activeTab, setActiveTab] = useState<
    'code' | 'issues' | 'pulls' | 'actions' | 'settings' | 'newRepo' | 'loading'
  >('code');
  const [repository, setRepository] = useState({
    name: repo,
    owner: username,
    description:
      'A modern web application with amazing features and capabilities',
    stars: 1234,
    forks: 456,
    watchers: 89,
    language: 'TypeScript',
    license: 'MIT',
    updatedAt: '2024-01-15T10:30:00Z',
    branches: ['main', 'develop', 'feature/ui'],
    defaultBranch: 'main',
  });
  const [fileStructure, setFileStructure] = useState<FileNode[]>([]);
  const [readmeHashId, setReadmeHashId] = useState(null);

  const tabs = [
    { id: 'code', label: 'Code', icon: Code2 },
    { id: 'issues', label: 'Issues', icon: Code2, count: 23 },
    { id: 'pulls', label: 'Pull requests', icon: Code2, count: 7 },
    { id: 'actions', label: 'Actions', icon: Clock },
    { id: 'projects', label: 'Projects' },
    { id: 'wiki', label: 'Wiki' },
    { id: 'security', label: 'Security' },
    { id: 'insights', label: 'Insights' },
    { id: 'settings', label: 'Settings' },
  ];

  useEffect(() => {
    (async () => {
      const response = await fetch(
        API_URL + '/' + username + '/' + repo + '/' + 'getRepo',
        {
          method: 'GET',
          credentials: 'include',
        },
      );
      const jsonResponse = await response.json();
      const repository = jsonResponse.data.repository;
      setRepository(repository);
    })();

    (async () => {
      const response = await fetch(
        API_URL + '/' + username + '/' + repo + '/' + 'repoTree',
        {
          method: 'GET',
          credentials: 'include',
        },
      );
      const jsonResponse = await response.json();
      let readme_hash_id = null;
      for (const r of jsonResponse.data) {
        if (r.name === 'README.md' || r.name === 'Readme.md') {
          readme_hash_id = r.sha;
        }
      }
      setReadmeHashId(readme_hash_id);

      setFileStructure(
        jsonResponse.data.sort((a: any, b: any) => {
          // directories first
          if (a.mode !== b.mode) {
            return a.mode === '40000' ? -1 : 1;
          }

          // then alphabetical by name
          return a.name.localeCompare(b.name);
        }),
      );

      if (jsonResponse.view === 'entries') {
        setActiveTab('code');
      }

      if (jsonResponse.view === 'init') {
        setActiveTab('newRepo');
      }
    })();
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Repository header */}
      <div className="border-b border-github-border pb-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-semibold">
              <span className="text-white hover:underline cursor-pointer">
                {username}
              </span>
              <span className="mx-1">/</span>
              <span className="text-white hover:underline cursor-pointer">
                {repo}
              </span>
            </h1>
            <span className="px-2 py-0.5 text-xs border border-github-border rounded-full">
              Public
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-1 px-3 py-1.5 border border-github-border rounded-md hover:bg-gray-800">
              <Eye size={16} />
              <span>Watch</span>
              <span className="text-xs text-gray-400">
                {repository.watchers}
              </span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-1.5 border border-github-border rounded-md hover:bg-gray-800">
              <GitFork size={16} />
              <span>Fork</span>
              <span className="text-xs text-gray-400">{repository.forks}</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-1.5 bg-github-primary hover:bg-github-primaryHover rounded-md">
              <Star size={16} />
              <span>Star</span>
              <span className="text-xs">{repository.stars}</span>
            </button>
          </div>
        </div>

        <p className="mt-2 text-gray-400">{repository.description}</p>

        <div className="flex items-center space-x-4 mt-3 text-sm text-gray-400">
          <span className="flex items-center space-x-1">
            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
            <span>{repository.language}</span>
          </span>
          <span className="flex items-center space-x-1">
            <GitFork size={14} />
            <span>{repository.forks} forks</span>
          </span>
          <span className="flex items-center space-x-1">
            <Star size={14} />
            <span>{repository.stars} stars</span>
          </span>
          <span className="flex items-center space-x-1">
            <Users size={14} />
            <span>{repository.watchers} watching</span>
          </span>
          <span className="flex items-center space-x-1">
            <Clock size={14} />
            <span>
              {/* Updated {formatDistanceToNow(new Date(repository.updatedAt))} ago */}
            </span>
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-github-border mb-4">
        <div className="flex space-x-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 text-sm border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-orange-500 text-white'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab.icon && <tab.icon size={16} />}
              <span>{tab.label}</span>
              {tab.count && (
                <span className="px-2 py-0.5 bg-gray-800 rounded-full text-xs">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      {activeTab === 'loading' && <>Loading...</>}
      {activeTab === 'newRepo' && <NewRepo username={username} repo={repo} />}
      {activeTab === 'code' && (
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-8">
            <div className="bg-github-darker border border-github-border rounded-md">
              {/* Branch selector and buttons */}
              <div className="flex items-center justify-between p-2 border-b border-github-border">
                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-1 px-3 py-1 border border-github-border rounded-md text-sm hover:bg-gray-800">
                    <GitBranch size={14} />
                    <span>{repository.defaultBranch}</span>
                    <ChevronDown size={14} />
                  </button>
                  <span className="text-sm text-gray-400">
                    <GitBranch size={14} className="inline mr-1" />
                    {repository.branches.length} branches
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 border border-github-border rounded-md text-sm hover:bg-gray-800">
                    Go to file
                  </button>
                  <button className="px-3 py-1 bg-github-primary hover:bg-github-primaryHover rounded-md text-sm">
                    Add file
                  </button>
                  <button className="px-3 py-1 border border-github-border rounded-md text-sm hover:bg-gray-800">
                    Code
                  </button>
                </div>
              </div>

              {/* File explorer */}
              <FileExplorer fileStructure={fileStructure} />
            </div>

            {/* Readme */}
            {readmeHashId && username && repo ? (
              <div className="mt-4">
                <Readme
                  username={username}
                  repo={repo}
                  readmeHashId={readmeHashId}
                />
              </div>
            ) : (
              <ReadmeTemplate />
            )}
          </div>

          {/* Right sidebar */}
          <div className="col-span-12 lg:col-span-4">
            <div className="space-y-4">
              <div className="bg-github-darker border border-github-border rounded-md p-4">
                <h3 className="font-semibold mb-2">About</h3>
                <p className="text-sm text-gray-400 mb-3">
                  {repository.description}
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Home size={16} />
                    <a href="#" className="text-white hover:underline">
                      example.com
                    </a>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Tag size={16} />
                    <span>Topics: react, typescript, nodejs</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <BookOpen size={16} />
                    <span>Readme</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Scale size={16} />
                    <span>{repository.license} license</span>
                  </div>
                </div>
              </div>

              <div className="bg-github-darker border border-github-border rounded-md p-4">
                <h3 className="font-semibold mb-2">Contributors</h3>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <img
                      key={i}
                      src={`https://ui-avatars.com/api/?name=User+${i}`}
                      alt={`contributor-${i}`}
                      className="w-8 h-8 rounded-full border border-github-border"
                      title={`@contributor-${i}`}
                    />
                  ))}
                  <span className="text-sm text-gray-400 self-center">
                    +15 contributors
                  </span>
                </div>
              </div>

              <div className="bg-github-darker border border-github-border rounded-md p-4">
                <h3 className="font-semibold mb-2">Languages</h3>
                <div className="space-y-2">
                  <div className="h-2 flex rounded-full overflow-hidden">
                    <div className="bg-blue-500 w-2/3"></div>
                    <div className="bg-yellow-500 w-1/4"></div>
                    <div className="bg-green-500 w-1/12"></div>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="flex items-center space-x-1">
                        <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                        <span>TypeScript</span>
                      </span>
                      <span>66.7%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="flex items-center space-x-1">
                        <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                        <span>JavaScript</span>
                      </span>
                      <span>25.0%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="flex items-center space-x-1">
                        <span className="w-3 h-3 rounded-full bg-green-500"></span>
                        <span>CSS</span>
                      </span>
                      <span>8.3%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'issues' && <IssuesTab owner={username} repo={repo} />}

      {activeTab === 'pulls' && (
        <PullRequestsTab owner={username} repo={repo} />
      )}

      {activeTab === 'settings' && <SettingsPage />}
    </div>
  );
};

export default Repository;
