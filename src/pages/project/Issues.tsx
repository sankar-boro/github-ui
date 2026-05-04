import { useState, useEffect } from 'react';
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
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { API_URL } from '../../config';

interface IssueItem {
  id: string;
  number: number;
  title: string;
  author_username: string;
  created_at: string;
  closed_at: string | null;
  labels: Array<{ name: string; color: string }> | null;
  comments_count: number;
  assignee_username: string | null;
}

interface Props {
  owner: string | undefined;
  repo: string | undefined;
}

const IssuesSection = ({ owner, repo }: Props) => {
  const [activeTab, setActiveTab] = useState<'open' | 'closed'>('open');
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openIssues, setOpenIssues] = useState<IssueItem[]>([]);
  const [closedIssues, setClosedIssues] = useState<IssueItem[]>([]);

  useEffect(() => {
    if (!owner || !repo) return;
    const fetchState = async (state: 'open' | 'closed') => {
      const res = await fetch(
        `${API_URL}/${owner}/${repo}/issues?state=${state}`,
        { credentials: 'include' },
      );
      const json = await res.json();
      return (json.data?.issues ?? []) as IssueItem[];
    };
    fetchState('open').then(setOpenIssues);
    fetchState('closed').then(setClosedIssues);
  }, [owner, repo]);

  const currentIssues = activeTab === 'open' ? openIssues : closedIssues;

  const toggleIssueSelection = (issueId: string) => {
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

  const filteredIssues = currentIssues.filter(
    (issue) =>
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `#${issue.number}`.includes(searchQuery),
  );

  return (
    <div className="min-h-screen bg-github-dark">
      <main className="max-w-screen-xl mx-auto">
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
              <span>{openIssues.length} Open</span>
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
              <span>{closedIssues.length} Closed</span>
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
                    {(issue.labels ?? []).map((label, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 text-xs font-medium rounded-full border"
                        style={{
                          backgroundColor: `#${label.color}33`,
                          color: `#${label.color}`,
                          borderColor: `#${label.color}66`,
                        }}
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
                        Opened #{issue.number} by {issue.author_username}{' '}
                        {formatDistanceToNow(new Date(issue.created_at))} ago
                      </span>
                    </span>
                    {issue.comments_count > 0 && (
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
                        <span>{issue.comments_count} comments</span>
                      </span>
                    )}
                    {issue.assignee_username && (
                      <span className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{issue.assignee_username}</span>
                      </span>
                    )}
                    {activeTab === 'closed' && issue.closed_at && (
                      <span>
                        Closed {formatDistanceToNow(new Date(issue.closed_at))}{' '}
                        ago
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
