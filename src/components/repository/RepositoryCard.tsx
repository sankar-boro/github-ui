import React from 'react';
import { Link } from 'react-router-dom';
import { GitFork, Star, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Repository {
  id: number;
  name: string;
  full_name: string;
  description?: string;
  language?: string;
  stars: number;
  forks: number;
  // visibility: "public" | "private";
  private: boolean;
  updated_at: string;
}

interface RepositoryCardProps {
  repository: Repository;
}

const RepositoryCard: React.FC<RepositoryCardProps> = ({ repository }) => {
  const languageColors: Record<string, string> = {
    TypeScript: 'bg-blue-500',
    JavaScript: 'bg-yellow-500',
    Python: 'bg-green-500',
    'Vim script': 'bg-green-700',
    Rust: 'bg-orange-600',
    Go: 'bg-cyan-500',
  };

  return (
    <div className="bg-github-darker border border-github-border rounded-md p-4 hover:border-gray-500 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <Link
              to={`/${repository.full_name}/${repository.name}`}
              className="text-lg font-semibold text-white hover:underline"
            >
              {repository.full_name}/{repository.name}
            </Link>
            <span className="px-2 py-0.5 text-xs border border-github-border rounded-full">
              {repository.private ? 'private' : 'public'}
            </span>
          </div>

          <p className="mt-1 text-sm text-gray-400">{repository.description}</p>

          <div className="mt-2 flex items-center space-x-4 text-sm text-gray-400">
            {repository.language && (
              <span className="flex items-center space-x-1">
                <span
                  className={`w-3 h-3 rounded-full ${languageColors[repository.language] || 'bg-gray-500'}`}
                ></span>
                <span>{repository.language}</span>
              </span>
            )}

            <span className="flex items-center space-x-1">
              <Star size={14} />
              <span>{repository.stars}</span>
            </span>

            <span className="flex items-center space-x-1">
              <GitFork size={14} />
              <span>{repository.forks}</span>
            </span>

            <span className="flex items-center space-x-1">
              <Clock size={14} />
              <span>
                Updated {formatDistanceToNow(new Date(repository.updated_at))}{' '}
                ago
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepositoryCard;
