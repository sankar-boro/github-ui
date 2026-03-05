import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  BookOpen,
  GitFork,
  Star,
  Clock,
  Plus,
  Filter,
  ChevronDown,
  Archive,
  Lock,
  Globe,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import RepositoryCard from '../components/repository/RepositoryCard';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import Tabs from '../components/common/Tabs';
import Pagination from '../components/common/Pagination';
import Skeleton from '../components/common/Skeleton';
import Alert from '../components/common/Alert';
import type {
  Repository,
  RepositorySort,
  RepositoryType,
  LanguageOption,
  FilterState,
  SortDirection,
} from '../types/repositories';
import { mockRepositories, languageOptions } from '../data/repositories';

const RepositoriesPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // State
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [filteredRepositories, setFilteredRepositories] = useState<
    Repository[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    type: 'all',
    sort: 'updated',
    direction: 'desc',
    language: undefined,
    showArchived: false,
    showForks: true,
    showTemplates: false,
  });

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    public: 0,
    private: 0,
    forks: 0,
    stars: 0,
    languages: {} as Record<string, number>,
  });

  // Load repositories
  useEffect(() => {
    fetchRepositories();
  }, []);

  // Apply filters and search
  useEffect(() => {
    applyFilters();
  }, [repositories, filters, searchQuery]);

  const fetchRepositories = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, you would fetch from your API
      // const response = await repositoriesApi.getAll();
      // setRepositories(response.data);

      setRepositories(mockRepositories);

      // Calculate stats
      calculateStats(mockRepositories);
    } catch (err) {
      setError('Failed to load repositories. Please try again.');
      console.error('Error fetching repositories:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (repos: Repository[]) => {
    const stats = {
      total: repos.length,
      public: repos.filter((r) => !r.private).length,
      private: repos.filter((r) => r.private).length,
      forks: repos.reduce((sum, r) => sum + r.forks, 0),
      stars: repos.reduce((sum, r) => sum + r.stars, 0),
      languages: {} as Record<string, number>,
    };

    repos.forEach((repo) => {
      if (repo.language) {
        stats.languages[repo.language] =
          (stats.languages[repo.language] || 0) + 1;
      }
    });

    setStats(stats);
  };

  const applyFilters = () => {
    let filtered = [...repositories];

    // Apply type filter
    switch (filters.type) {
      case 'owner':
        filtered = filtered.filter((r) => r.owner.login === user?.username);
        break;
      case 'public':
        filtered = filtered.filter((r) => !r.private);
        break;
      case 'private':
        filtered = filtered.filter((r) => r.private);
        break;
      case 'member':
        filtered = filtered.filter((r) => r.permissions?.push);
        break;
      // 'all' - no filter
    }

    // Apply language filter
    if (filters.language) {
      filtered = filtered.filter(
        (r) => r.language?.toLowerCase() === filters.language?.toLowerCase(),
      );
    }

    // Apply archived filter
    if (!filters.showArchived) {
      filtered = filtered.filter((r) => !('archived' in r && r.archived));
    }

    // Apply forks filter
    if (!filters.showForks) {
      filtered = filtered.filter((r) => !r.fork);
    }

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.name.toLowerCase().includes(query) ||
          (r.description?.toLowerCase().includes(query) ?? false) ||
          r.fullName.toLowerCase().includes(query),
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (filters.sort) {
        case 'created':
          comparison =
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case 'updated':
          comparison =
            new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
          break;
        case 'pushed':
          comparison =
            new Date(a.pushedAt).getTime() - new Date(b.pushedAt).getTime();
          break;
        case 'full_name':
          comparison = a.fullName.localeCompare(b.fullName);
          break;
      }

      return filters.direction === 'asc' ? comparison : -comparison;
    });

    setFilteredRepositories(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already applied via useEffect
  };

  const handleFilterChange = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleCreateRepository = () => {
    navigate('/new/repository');
  };

  const handleImportRepository = () => {
    navigate('/new/import');
  };

  const handleRepositoryClick = (repo: Repository) => {
    navigate(`/${repo.fullName}`);
  };

  const clearFilters = () => {
    setFilters({
      type: 'all',
      sort: 'updated',
      direction: 'desc',
      language: undefined,
      showArchived: false,
      showForks: true,
      showTemplates: false,
    });
    setSearchQuery('');
  };

  // Pagination
  const totalPages = Math.ceil(filteredRepositories.length / itemsPerPage);
  const paginatedRepositories = filteredRepositories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const typeOptions = [
    { value: 'all', label: 'All' },
    { value: 'owner', label: 'Owner' },
    { value: 'public', label: 'Public' },
    { value: 'private', label: 'Private' },
    { value: 'member', label: 'Member' },
  ];

  const sortOptions = [
    { value: 'updated', label: 'Last updated' },
    { value: 'created', label: 'Created' },
    { value: 'pushed', label: 'Last pushed' },
    { value: 'full_name', label: 'Name' },
  ];

  const directionOptions = [
    { value: 'desc', label: 'Descending' },
    { value: 'asc', label: 'Ascending' },
  ];

  const languageSelectOptions = [
    { value: '', label: 'All languages' },
    ...languageOptions.map((lang) => ({
      value: lang.value,
      label: `${lang.label} (${lang.count})`,
    })),
  ];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Skeleton width="200px" height="32px" />
          <Skeleton width="120px" height="40px" />
        </div>

        <div className="mb-6">
          <Skeleton height="48px" className="mb-4" />
          <div className="flex space-x-4">
            <Skeleton width="100px" height="32px" />
            <Skeleton width="100px" height="32px" />
            <Skeleton width="100px" height="32px" />
          </div>
        </div>

        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} height="120px" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <BookOpen size={24} />
            Repositories
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            {stats.total} total · {stats.public} public · {stats.private}{' '}
            private
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={handleImportRepository}
            icon={<Archive size={16} />}
          >
            Import
          </Button>
          <Button
            variant="primary"
            onClick={handleCreateRepository}
            icon={<Plus size={16} />}
          >
            New repository
          </Button>
        </div>
      </div>

      {/* Search and filters */}
      <div className="mb-6">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="flex-1">
            <Input
              placeholder="Find a repository..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search size={16} />}
              fullWidth
            />
          </div>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setShowFilters(!showFilters)}
            icon={<Filter size={16} />}
            className={showFilters ? 'bg-gray-800' : ''}
          >
            Filters
          </Button>
        </form>

        {/* Quick stats */}
        <div className="flex flex-wrap gap-4 mt-4 text-sm">
          <div className="flex items-center gap-1">
            <BookOpen size={14} className="text-gray-400" />
            <span>{stats.total} repositories</span>
          </div>
          <div className="flex items-center gap-1">
            <Star size={14} className="text-gray-400" />
            <span>{stats.stars} stars</span>
          </div>
          <div className="flex items-center gap-1">
            <GitFork size={14} className="text-gray-400" />
            <span>{stats.forks} forks</span>
          </div>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <div className="mt-4 p-4 bg-github-darker border border-github-border rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Filters</h3>
              <button
                onClick={clearFilters}
                className="text-sm text-blue-400 hover:underline"
              >
                Clear filters
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Select
                label="Type"
                value={filters.type}
                onChange={(value) =>
                  handleFilterChange('type', value as RepositoryType)
                }
                options={typeOptions}
              />

              <Select
                label="Sort by"
                value={filters.sort}
                onChange={(value) =>
                  handleFilterChange('sort', value as RepositorySort)
                }
                options={sortOptions}
              />

              <Select
                label="Direction"
                value={filters.direction}
                onChange={(value) =>
                  handleFilterChange('direction', value as SortDirection)
                }
                options={directionOptions}
              />

              <Select
                label="Language"
                value={filters.language || ''}
                onChange={(value) =>
                  handleFilterChange('language', value || undefined)
                }
                options={languageSelectOptions}
              />

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">
                  Options
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={filters.showArchived}
                      onChange={(e) =>
                        handleFilterChange('showArchived', e.target.checked)
                      }
                      className="rounded border-github-border bg-gray-900"
                    />
                    Show archived
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={filters.showForks}
                      onChange={(e) =>
                        handleFilterChange('showForks', e.target.checked)
                      }
                      className="rounded border-github-border bg-gray-900"
                    />
                    Show forks
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Language quick filters */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleFilterChange('language', undefined)}
            className={`px-3 py-1 text-sm rounded-full border transition-colors ${
              !filters.language
                ? 'bg-blue-500 border-blue-500 text-white'
                : 'border-github-border hover:bg-gray-800'
            }`}
          >
            All
          </button>
          {languageOptions.slice(0, 5).map((lang) => (
            <button
              key={lang.value}
              onClick={() => handleFilterChange('language', lang.value)}
              className={`flex items-center gap-1 px-3 py-1 text-sm rounded-full border transition-colors ${
                filters.language === lang.value
                  ? 'bg-blue-500 border-blue-500 text-white'
                  : 'border-github-border hover:bg-gray-800'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${lang.color}`}></span>
              {lang.label}
            </button>
          ))}
          {languageOptions.length > 5 && (
            <button
              onClick={() => setShowFilters(true)}
              className="px-3 py-1 text-sm rounded-full border border-github-border hover:bg-gray-800"
            >
              +{languageOptions.length - 5} more
            </button>
          )}
        </div>
      </div>

      {/* Error state */}
      {error && (
        <Alert
          variant="error"
          title="Error loading repositories"
          onClose={() => setError(null)}
          className="mb-4"
        >
          {error}
        </Alert>
      )}

      {/* Repository list */}
      {filteredRepositories.length === 0 ? (
        <div className="text-center py-12 bg-github-darker border border-github-border rounded-lg">
          <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold mb-2">No repositories found</h3>
          <p className="text-gray-400 mb-4">
            {searchQuery || filters.language
              ? 'Try adjusting your search or filters'
              : 'Get started by creating a new repository'}
          </p>
          {!searchQuery && !filters.language && (
            <Button variant="primary" onClick={handleCreateRepository}>
              Create repository
            </Button>
          )}
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {paginatedRepositories.map((repo) => (
              <div
                key={repo.id}
                onClick={() => handleRepositoryClick(repo)}
                className="cursor-pointer"
              >
                <RepositoryCard repository={repo} />
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}

          {/* Results count */}
          <div className="mt-4 text-sm text-gray-400 text-center">
            Showing {(currentPage - 1) * itemsPerPage + 1} -{' '}
            {Math.min(currentPage * itemsPerPage, filteredRepositories.length)}{' '}
            of {filteredRepositories.length} repositories
          </div>
        </>
      )}
    </div>
  );
};

export default RepositoriesPage;
