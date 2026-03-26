import React, { useState } from 'react';
import {
  Search,
  Plus,
  Filter,
  Tag,
  User,
  Milestone,
  ChevronDown,
  CheckCircle,
  Circle,
  AlertCircle,
  Star,
  Settings,
  X,
} from 'lucide-react';

const IssuesSection = () => {
  const [activeTab, setActiveTab] = useState('open');
  const [selectedIssues, setSelectedIssues] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const issues = {
    open: [
      {
        id: 123,
        title: 'Update documentation for v2 release',
        number: 123,
        author: 'sankar-boro',
        createdAt: '2 days ago',
        labels: [
          { name: 'bug', color: 'red' },
          { name: 'enhancement', color: 'purple' },
        ],
        comments: 3,
        assignee: null,
      },
      {
        id: 118,
        title: 'Fix responsive layout on mobile devices',
        number: 118,
        author: 'contributor1',
        createdAt: '5 days ago',
        labels: [
          { name: 'bug', color: 'red' },
          { name: 'mobile', color: 'blue' },
        ],
        comments: 2,
        assignee: 'contributor1',
      },
      {
        id: 105,
        title: 'Add dark mode support',
        number: 105,
        author: 'designer',
        createdAt: '1 week ago',
        labels: [
          { name: 'enhancement', color: 'purple' },
          { name: 'ui', color: 'pink' },
        ],
        comments: 8,
        assignee: null,
      },
    ],
    closed: [
      {
        id: 102,
        title: 'Fix login authentication bug',
        number: 102,
        author: 'dev-team',
        createdAt: '2 weeks ago',
        labels: [{ name: 'bug', color: 'red' }],
        comments: 5,
        closedAt: '1 week ago',
      },
    ],
  };

  const currentIssues = issues[activeTab];

  const toggleIssueSelection = (issueId) => {
    if (selectedIssues.includes(issueId)) {
      setSelectedIssues(selectedIssues.filter((id) => id !== issueId));
    } else {
      setSelectedIssues([...selectedIssues, issueId]);
    }
  };

  const toggleAllIssues = () => {
    if (selectedIssues.length === currentIssues.length) {
      setSelectedIssues([]);
    } else {
      setSelectedIssues(currentIssues.map((issue) => issue.id));
    }
  };

  const getLabelColor = (color) => {
    const colors = {
      red: 'bg-red-900/30 text-red-400 border-red-800',
      purple: 'bg-purple-900/30 text-purple-400 border-purple-800',
      blue: 'bg-blue-900/30 text-white border-blue-800',
      pink: 'bg-pink-900/30 text-pink-400 border-pink-800',
      green: 'bg-green-900/30 text-green-400 border-green-800',
    };
    return colors[color] || 'bg-gray-800 text-gray-400 border-gray-700';
  };

  const filteredIssues = currentIssues.filter(
    (issue) =>
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `#${issue.number}`.includes(searchQuery),
  );

  return (
    <div className="min-h-screen bg-github-dark">
      <main className="max-w-screen-xl mx-auto sm:px-6 lg:px-8 py-8">
        {/* Issues Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('open')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'open'
                  ? 'bg-github-border/30 text-white'
                  : 'text-gray-400 hover:text-gray-300 hover:bg-github-border/20'
              }`}
            >
              <AlertCircle className="h-4 w-4" />
              <span>{issues.open.length} Open</span>
            </button>
            <button
              onClick={() => setActiveTab('closed')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'closed'
                  ? 'bg-github-border/30 text-white'
                  : 'text-gray-400 hover:text-gray-300 hover:bg-github-border/20'
              }`}
            >
              <CheckCircle className="h-4 w-4" />
              <span>{issues.closed.length} Closed</span>
            </button>
          </div>
          <button className="bg-github-primary hover:bg-github-primaryHover text-white px-4 py-2 rounded-md text-sm font-medium flex items-center space-x-2 transition-colors shadow-sm">
            <Plus className="h-4 w-4" />
            <span>New issue</span>
          </button>
        </div>

        {/* Filters Bar */}
        <div className="bg-github-darker border border-github-border rounded-t-md mb-px">
          <div className="flex items-center justify-between p-3 flex-wrap gap-3">
            <div className="flex items-center space-x-2 flex-wrap gap-2">
              <button className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-300 hover:text-white border border-github-border rounded-md bg-github-darker hover:bg-github-border/20 transition-colors">
                <Filter className="h-4 w-4" />
                <span>Filters</span>
                <ChevronDown className="h-3 w-3" />
              </button>
              <button className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-300 hover:text-white border border-github-border rounded-md bg-github-darker hover:bg-github-border/20 transition-colors">
                <Tag className="h-4 w-4" />
                <span>Labels</span>
                <ChevronDown className="h-3 w-3" />
              </button>
              <button className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-300 hover:text-white border border-github-border rounded-md bg-github-darker hover:bg-github-border/20 transition-colors">
                <Milestone className="h-4 w-4" />
                <span>Milestones</span>
                <ChevronDown className="h-3 w-3" />
              </button>
              <button className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-300 hover:text-white border border-github-border rounded-md bg-github-darker hover:bg-github-border/20 transition-colors">
                <User className="h-4 w-4" />
                <span>Assignee</span>
                <ChevronDown className="h-3 w-3" />
              </button>
            </div>
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search all issues"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-sm bg-github-darker border border-github-border rounded-md focus:outline-none focus:ring-2 focus:ring-github-primary focus:border-transparent text-gray-300 placeholder-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Issues List */}
        <div className="bg-github-darker border border-github-border rounded-b-md">
          {/* Issue List Header */}
          <div className="border-b border-github-border px-4 py-2 flex items-center">
            <button
              onClick={toggleAllIssues}
              className="mr-3 text-gray-500 hover:text-gray-400 transition-colors"
            >
              {selectedIssues.length === filteredIssues.length &&
              filteredIssues.length > 0 ? (
                <CheckCircle className="h-5 w-5 text-github-primary" />
              ) : (
                <Circle className="h-5 w-5" />
              )}
            </button>
            <span className="text-xs text-gray-500">
              {selectedIssues.length} selected
            </span>
          </div>

          {/* Issue Items */}
          {filteredIssues.map((issue) => (
            <div
              key={issue.id}
              className="border-b border-github-border px-4 py-3 hover:bg-github-border/10 transition-colors"
            >
              <div className="flex items-start">
                <button
                  onClick={() => toggleIssueSelection(issue.id)}
                  className="mr-3 mt-1 text-gray-500 hover:text-gray-400 transition-colors"
                >
                  {selectedIssues.includes(issue.id) ? (
                    <CheckCircle className="h-5 w-5 text-github-primary" />
                  ) : (
                    <Circle className="h-5 w-5" />
                  )}
                </button>
                <div className="flex-1">
                  <div className="flex items-center flex-wrap gap-2 mb-1">
                    <span className="text-gray-500 text-sm">
                      #{issue.number}
                    </span>
                    <h3 className="text-base font-medium text-white hover:text-white cursor-pointer transition-colors">
                      {issue.title}
                    </h3>
                    {issue.labels.map((label, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getLabelColor(label.color)}`}
                      >
                        {label.name}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center text-xs text-gray-500 space-x-4 flex-wrap gap-y-1">
                    <span className="flex items-center space-x-1">
                      {activeTab === 'open' ? (
                        <AlertCircle className="h-3 w-3 text-green-500" />
                      ) : (
                        <CheckCircle className="h-3 w-3 text-purple-500" />
                      )}
                      <span>
                        Opened #{issue.number} by {issue.author}{' '}
                        {issue.createdAt}
                      </span>
                    </span>
                    {issue.comments !== undefined && (
                      <span className="flex items-center space-x-1">
                        <svg
                          className="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                        <span>{issue.comments} comments</span>
                      </span>
                    )}
                    {issue.assignee && (
                      <span className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{issue.assignee}</span>
                      </span>
                    )}
                    {activeTab === 'closed' && issue.closedAt && (
                      <span>Closed {issue.closedAt}</span>
                    )}
                  </div>
                </div>
                {activeTab === 'open' && (
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Star className="h-4 w-4 text-gray-500 cursor-pointer hover:text-yellow-500 transition-colors" />
                    <Settings className="h-4 w-4 text-gray-500 cursor-pointer hover:text-gray-400 transition-colors" />
                  </div>
                )}
              </div>
            </div>
          ))}

          {filteredIssues.length === 0 && (
            <div className="text-center py-12">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-github-border/20 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-white mb-1">
                No issues found
              </h3>
              <p className="text-gray-500 text-sm">
                {searchQuery
                  ? 'Try adjusting your search'
                  : 'There are no issues to display'}
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing{' '}
            <span className="font-medium text-gray-300">
              {filteredIssues.length}
            </span>{' '}
            of{' '}
            <span className="font-medium text-gray-300">
              {currentIssues.length}
            </span>{' '}
            issues
          </div>
          <div className="flex space-x-2">
            <button
              className="px-3 py-1 border border-github-border rounded-md text-sm text-gray-400 hover:text-white hover:bg-github-border/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
            >
              Previous
            </button>
            <button className="px-3 py-1 border border-github-border rounded-md text-sm text-gray-400 hover:text-white hover:bg-github-border/20 transition-colors">
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default IssuesSection;
