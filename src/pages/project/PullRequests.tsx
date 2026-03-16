// components/PullRequestsTab.jsx
import React from 'react';
import {
  VscChevronDown,
  VscGitPullRequest,
  VscCommentDiscussion,
  VscGitMerge,
} from 'react-icons/vsc';

const PullRequestItem = ({ pr }) => {
  return (
    <div className="py-3 flex items-start gap-3">
      <VscGitPullRequest
        className={`${pr.status === 'draft' ? 'text-gray-400' : 'text-purple-500'} mt-1 text-lg flex-shrink-0`}
      />
      <div className="flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium text-gray-900 dark:text-white">
            {pr.title}
          </span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${pr.status === 'draft' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-purple-100 dark:bg-purple-900/30'}`}
          >
            {pr.status}
          </span>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          <div className="flex items-center gap-3 flex-wrap">
            <span>
              #{pr.number} want to merge {pr.commits} commits into {pr.base}{' '}
              from {pr.head}
            </span>
            {pr.comments > 0 && (
              <span className="flex items-center gap-1">
                <VscCommentDiscussion />
                {pr.comments}
              </span>
            )}
            {pr.mergeable && (
              <span className="flex items-center gap-1 text-green-600">
                <VscGitMerge />
                mergeable
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const PullRequestsTab = () => {
  const pullRequests = [
    {
      id: 1,
      title: 'Add new theme switching functionality',
      number: 89,
      status: 'draft',
      commits: 3,
      base: 'main',
      head: 'feature/theme',
      comments: 2,
      mergeable: true,
    },
    {
      id: 2,
      title: 'Update dependencies and fix security vulnerabilities',
      number: 85,
      status: 'open',
      commits: 5,
      base: 'main',
      head: 'feature/security-updates',
      comments: 4,
      mergeable: true,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Filter header */}
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <VscChevronDown className="text-lg" />
        <span>Open (2) · Closed (2)</span>
      </div>

      {/* Pull requests list */}
      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {pullRequests.map((pr) => (
          <PullRequestItem key={pr.id} pr={pr} />
        ))}
      </div>
    </div>
  );
};

export default PullRequestsTab;
