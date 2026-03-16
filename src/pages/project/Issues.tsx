// components/IssuesTab.jsx
import React from 'react';
import {
  VscChevronDown,
  VscIssues,
  VscCommentDiscussion,
} from 'react-icons/vsc';

const IssueItem = ({ issue }) => {
  return (
    <div className="py-3 flex items-start gap-3">
      <VscIssues className="text-green-500 mt-1 text-lg flex-shrink-0" />
      <div className="flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium text-gray-900 dark:text-white">
            {issue.title}
          </span>
          {issue.labels.map((label, idx) => (
            <span
              key={idx}
              className={`text-xs px-2 py-0.5 rounded-full ${label.color}`}
            >
              {label.name}
            </span>
          ))}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-3 flex-wrap">
          <span>
            #{issue.number} opened {issue.openedAt} by {issue.author}
          </span>
          {issue.comments > 0 && (
            <span className="flex items-center gap-1">
              <VscCommentDiscussion />
              {issue.comments}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const IssuesTab = () => {
  const issues = [
    {
      id: 1,
      title: 'Update documentation for v2 release',
      number: 123,
      openedAt: '2 days ago',
      author: 'sankar-boro',
      comments: 3,
      labels: [
        { name: 'bug', color: 'bg-gray-100 dark:bg-gray-800' },
        { name: 'enhancement', color: 'bg-purple-100 dark:bg-purple-900/30' },
      ],
    },
    {
      id: 2,
      title: 'Fix responsive layout on mobile devices',
      number: 118,
      openedAt: '5 days ago',
      author: 'contributor1',
      comments: 5,
      labels: [
        { name: 'bug', color: 'bg-gray-100 dark:bg-gray-800' },
        { name: 'mobile', color: 'bg-blue-100 dark:bg-blue-900/30' },
      ],
    },
    {
      id: 3,
      title: 'Add dark mode support',
      number: 105,
      openedAt: '1 week ago',
      author: 'designer',
      comments: 8,
      labels: [
        { name: 'enhancement', color: 'bg-purple-100 dark:bg-purple-900/30' },
        { name: 'ui', color: 'bg-pink-100 dark:bg-pink-900/30' },
      ],
    },
  ];

  return (
    <div className="space-y-4">
      {/* Filter header */}
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <VscChevronDown className="text-lg" />
        <span>Open issues (8) · Closed (4)</span>
      </div>

      {/* Issues list */}
      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {issues.map((issue) => (
          <IssueItem key={issue.id} issue={issue} />
        ))}
      </div>
    </div>
  );
};

export default IssuesTab;
