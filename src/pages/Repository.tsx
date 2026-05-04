import React, { useEffect, useState, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { Star, GitFork, Eye, Clock, Users } from 'lucide-react';
import NewRepo from '../components/repository/NewRepo';

import { formatDistanceToNowStrict, parseISO } from 'date-fns';
import IssuesTab from './project/Issues';
import PullRequestsTab from './project/PullRequests';
const SettingsPage = React.lazy(() => import('./project/SettingsPage'));

import { API_URL } from '../config';
import type { Repository } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { generateTabs } from './utils';
import Code from './project/Code';

interface FileNode {
  name: string;
  type: 'file' | 'folder' | 'directory';
  children?: FileNode[];
}

const Repository: React.FC = () => {
  const { username, repo } = useParams<{ username: string; repo: string }>();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState<
    'code' | 'issues' | 'pulls' | 'actions' | 'settings' | 'newRepo' | 'loading'
  >('code');
  const [isAuthRepo, setIsAuthRepo] = useState(false);
  const [repository, setRepository] = useState<Repository | null>(null);
  const [fileStructure, setFileStructure] = useState<FileNode[]>([]);
  const [readmeHashId, setReadmeHashId] = useState(null);
  const [tabs, setTabs] = useState(generateTabs(false));

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

  useEffect(() => {
    if (user?.username === repository?.full_name) {
      setIsAuthRepo(true);
      setTabs(generateTabs(true));
    }
  }, [repository]);

  const onClickActiveTab = (id: any) => {
    if (fileStructure.length === 0) {
      return null;
    }
    setActiveTab(id);
  };

  if (!repository) return null;

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
                {repository.watchers_count}
              </span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-1.5 border border-github-border rounded-md hover:bg-gray-800">
              <GitFork size={16} />
              <span>Fork</span>
              <span className="text-xs text-gray-400">
                {repository.forks_count}
              </span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-1.5 bg-github-primary hover:bg-github-primaryHover rounded-md">
              <Star size={16} />
              <span>Star</span>
              <span className="text-xs">{repository.stars_count}</span>
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
            <span>{repository.forks_count} forks</span>
          </span>
          <span className="flex items-center space-x-1">
            <Star size={14} />
            <span>{repository.stars_count} stars</span>
          </span>
          <span className="flex items-center space-x-1">
            <Users size={14} />
            <span>{repository.watchers_count} watching</span>
          </span>
          <span className="flex items-center space-x-1">
            <Clock size={14} />
            <span>
              Updated{' '}
              {repository.updated_at
                ? formatDistanceToNowStrict(parseISO(repository.updated_at), {
                    addSuffix: true,
                  })
                : null}
              {/* {repository.updated_at} */}
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
              onClick={() => onClickActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 text-sm border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-orange-500 text-white'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab.icon && <tab.icon size={16} />}
              <span>{tab.label}</span>
              {tab.count && tab.count > 0 ? (
                <span className="px-2 py-0.5 bg-gray-800 rounded-full text-xs">
                  {tab.count}
                </span>
              ) : null}
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      {activeTab === 'loading' && <>Loading...</>}
      {activeTab === 'newRepo' && <NewRepo username={username} repo={repo} />}
      {activeTab === 'code' && (
        <Code
          username={username}
          repo={repo}
          repository={repository}
          fileStructure={fileStructure}
          readmeHashId={readmeHashId}
        />
      )}

      {activeTab === 'issues' && <IssuesTab owner={username} repo={repo} />}

      {activeTab === 'pulls' && (
        <PullRequestsTab owner={username} repo={repo} />
      )}

      {activeTab === 'settings' && isAuthRepo && (
        <Suspense fallback={<div>Loading...</div>}>
          <SettingsPage repository={repository} />
        </Suspense>
      )}
    </div>
  );
};

export default Repository;
