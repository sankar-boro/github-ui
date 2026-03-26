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
  GitPullRequest,
  GitMerge,
  Clock,
  XCircle,
  Star,
  Settings,
  RefreshCw,
} from 'lucide-react';

const PullRequestsSection = () => {
  const [activeTab, setActiveTab] = useState('open');
  const [selectedPRs, setSelectedPRs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const pullRequests = {
    open: [
      {
        id: 234,
        title: 'Add authentication middleware',
        number: 234,
        author: 'dev-team',
        createdAt: '2 hours ago',
        branch: 'feature/auth-middleware',
        targetBranch: 'main',
        labels: [
          { name: 'enhancement', color: 'purple' },
          { name: 'needs-review', color: 'yellow' },
        ],
        comments: 5,
        commits: 3,
        changedFiles: 8,
        checks: {
          status: 'pending',
          passed: 2,
          total: 3,
        },
        mergeable: true,
      },
      {
        id: 228,
        title: 'Optimize database queries for dashboard',
        number: 228,
        author: 'backend-team',
        createdAt: '1 day ago',
        branch: 'optimize/db-queries',
        targetBranch: 'main',
        labels: [
          { name: 'performance', color: 'green' },
          { name: 'priority', color: 'red' },
        ],
        comments: 12,
        commits: 5,
        changedFiles: 12,
        checks: {
          status: 'success',
          passed: 3,
          total: 3,
        },
        mergeable: true,
      },
      {
        id: 225,
        title: 'Update documentation for API endpoints',
        number: 225,
        author: 'docs-team',
        createdAt: '3 days ago',
        branch: 'docs/api-updates',
        targetBranch: 'main',
        labels: [{ name: 'documentation', color: 'blue' }],
        comments: 2,
        commits: 2,
        changedFiles: 5,
        checks: {
          status: 'failure',
          passed: 1,
          total: 2,
        },
        mergeable: false,
        conflicts: true,
      },
    ],
    closed: [
      {
        id: 220,
        title: 'Fix login redirect issue',
        number: 220,
        author: 'frontend-team',
        createdAt: '1 week ago',
        closedAt: '3 days ago',
        branch: 'fix/login-redirect',
        targetBranch: 'main',
        labels: [{ name: 'bug', color: 'red' }],
        comments: 8,
        commits: 1,
        changedFiles: 2,
        merged: true,
      },
      {
        id: 215,
        title: 'Add dark mode support',
        number: 215,
        author: 'design-team',
        createdAt: '2 weeks ago',
        closedAt: '1 week ago',
        branch: 'feature/dark-mode',
        targetBranch: 'main',
        labels: [
          { name: 'enhancement', color: 'purple' },
          { name: 'ui', color: 'pink' },
        ],
        comments: 15,
        commits: 8,
        changedFiles: 20,
        merged: true,
      },
    ],
  };

  const currentPRs = pullRequests[activeTab];

  const togglePRSelection = (prId) => {
    if (selectedPRs.includes(prId)) {
      setSelectedPRs(selectedPRs.filter((id) => id !== prId));
    } else {
      setSelectedPRs([...selectedPRs, prId]);
    }
  };

  const toggleAllPRs = () => {
    if (selectedPRs.length === currentPRs.length) {
      setSelectedPRs([]);
    } else {
      setSelectedPRs(currentPRs.map((pr) => pr.id));
    }
  };

  const getLabelColor = (color) => {
    const colors = {
      red: 'bg-red-900/30 text-red-400 border-red-800',
      purple: 'bg-purple-900/30 text-purple-400 border-purple-800',
      blue: 'bg-blue-900/30 text-white border-blue-800',
      pink: 'bg-pink-900/30 text-pink-400 border-pink-800',
      green: 'bg-green-900/30 text-green-400 border-green-800',
      yellow: 'bg-yellow-900/30 text-yellow-400 border-yellow-800',
    };
    return colors[color] || 'bg-gray-800 text-gray-400 border-gray-700';
  };

  const getCheckStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failure':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'pending':
        return <RefreshCw className="h-4 w-4 text-yellow-500 animate-spin" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getCheckStatusText = (status) => {
    switch (status) {
      case 'success':
        return 'All checks have passed';
      case 'failure':
        return 'Some checks failed';
      case 'pending':
        return 'Checks are pending';
      default:
        return 'Checks not run';
    }
  };

  const filteredPRs = currentPRs.filter(
    (pr) =>
      pr.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `#${pr.number}`.includes(searchQuery) ||
      pr.author.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-github-dark">
      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Pull Requests Header */}
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
              <GitPullRequest className="h-4 w-4" />
              <span>{pullRequests.open.length} Open</span>
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
              <span>{pullRequests.closed.length} Closed</span>
            </button>
          </div>
          <button className="bg-github-primary hover:bg-github-primaryHover text-white px-4 py-2 rounded-md text-sm font-medium flex items-center space-x-2 transition-colors shadow-sm">
            <Plus className="h-4 w-4" />
            <span>New pull request</span>
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
                <User className="h-4 w-4" />
                <span>Reviewers</span>
                <ChevronDown className="h-3 w-3" />
              </button>
              <button className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-300 hover:text-white border border-github-border rounded-md bg-github-darker hover:bg-github-border/20 transition-colors">
                <Milestone className="h-4 w-4" />
                <span>Milestones</span>
                <ChevronDown className="h-3 w-3" />
              </button>
            </div>
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search all pull requests"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-sm bg-github-darker border border-github-border rounded-md focus:outline-none focus:ring-2 focus:ring-github-primary focus:border-transparent text-gray-300 placeholder-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Pull Requests List */}
        <div className="bg-github-darker border border-github-border rounded-b-md">
          {/* List Header */}
          <div className="border-b border-github-border px-4 py-2 flex items-center">
            <button
              onClick={toggleAllPRs}
              className="mr-3 text-gray-500 hover:text-gray-400 transition-colors"
            >
              {selectedPRs.length === filteredPRs.length &&
              filteredPRs.length > 0 ? (
                <CheckCircle className="h-5 w-5 text-github-primary" />
              ) : (
                <Circle className="h-5 w-5" />
              )}
            </button>
            <span className="text-xs text-gray-500">
              {selectedPRs.length} selected
            </span>
          </div>

          {/* PR Items */}
          {filteredPRs.map((pr) => (
            <div
              key={pr.id}
              className="border-b border-github-border px-4 py-3 hover:bg-github-border/10 transition-colors group"
            >
              <div className="flex items-start">
                <button
                  onClick={() => togglePRSelection(pr.id)}
                  className="mr-3 mt-1 text-gray-500 hover:text-gray-400 transition-colors"
                >
                  {selectedPRs.includes(pr.id) ? (
                    <CheckCircle className="h-5 w-5 text-github-primary" />
                  ) : (
                    <Circle className="h-5 w-5" />
                  )}
                </button>
                <div className="flex-1">
                  <div className="flex items-center flex-wrap gap-2 mb-1">
                    <GitPullRequest
                      className={`h-4 w-4 ${
                        activeTab === 'open'
                          ? 'text-green-500'
                          : 'text-purple-500'
                      }`}
                    />
                    <span className="text-gray-500 text-sm">#{pr.number}</span>
                    <h3 className="text-base font-medium text-white hover:text-white cursor-pointer transition-colors">
                      {pr.title}
                    </h3>
                    {pr.labels.map((label, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getLabelColor(label.color)}`}
                      >
                        {label.name}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center flex-wrap gap-4 text-xs text-gray-500 mb-2">
                    <span className="flex items-center space-x-1">
                      <User className="h-3 w-3" />
                      <span>{pr.author}</span>
                    </span>
                    <span>opened {pr.createdAt}</span>
                    {activeTab === 'closed' && pr.closedAt && (
                      <span className="flex items-center space-x-1">
                        {pr.merged ? (
                          <GitMerge className="h-3 w-3 text-purple-500" />
                        ) : (
                          <XCircle className="h-3 w-3 text-red-500" />
                        )}
                        <span>
                          {pr.merged ? 'merged' : 'closed'} {pr.closedAt}
                        </span>
                      </span>
                    )}
                    <span className="flex items-center space-x-1">
                      <GitPullRequest className="h-3 w-3" />
                      <span>{pr.branch}</span>
                      <span>→</span>
                      <span>{pr.targetBranch}</span>
                    </span>
                  </div>

                  <div className="flex items-center flex-wrap gap-4 text-xs">
                    {/* Commits and Files */}
                    <div className="flex items-center space-x-3 text-gray-500">
                      <span className="flex items-center space-x-1">
                        <GitMerge className="h-3 w-3" />
                        <span>{pr.commits} commits</span>
                      </span>
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
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <span>{pr.changedFiles} files changed</span>
                      </span>
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
                        <span>{pr.comments} comments</span>
                      </span>
                    </div>

                    {/* Checks Status */}
                    {activeTab === 'open' && pr.checks && (
                      <div className="flex items-center space-x-2">
                        {getCheckStatusIcon(pr.checks.status)}
                        <span className="text-gray-400">
                          {getCheckStatusText(pr.checks.status)}
                          {pr.checks.status !== 'pending' && (
                            <span className="ml-1">
                              ({pr.checks.passed}/{pr.checks.total})
                            </span>
                          )}
                        </span>
                      </div>
                    )}

                    {/* Merge Conflict Warning */}
                    {activeTab === 'open' && pr.conflicts && (
                      <span className="flex items-center space-x-1 text-red-400 bg-red-900/20 px-2 py-0.5 rounded">
                        <AlertCircle className="h-3 w-3" />
                        <span>Merge conflicts</span>
                      </span>
                    )}

                    {/* Mergeable Status */}
                    {activeTab === 'open' && pr.mergeable && !pr.conflicts && (
                      <span className="flex items-center space-x-1 text-green-400 bg-green-900/20 px-2 py-0.5 rounded">
                        <CheckCircle className="h-3 w-3" />
                        <span>Ready to merge</span>
                      </span>
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

          {filteredPRs.length === 0 && (
            <div className="text-center py-12">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-github-border/20 flex items-center justify-center">
                <GitPullRequest className="h-6 w-6 text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-white mb-1">
                No pull requests found
              </h3>
              <p className="text-gray-500 text-sm">
                {searchQuery
                  ? 'Try adjusting your search'
                  : 'There are no pull requests to display'}
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing{' '}
            <span className="font-medium text-gray-300">
              {filteredPRs.length}
            </span>{' '}
            of{' '}
            <span className="font-medium text-gray-300">
              {currentPRs.length}
            </span>{' '}
            pull requests
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

export default PullRequestsSection;
