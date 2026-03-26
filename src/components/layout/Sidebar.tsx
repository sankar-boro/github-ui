import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  GitFork,
  Star,
  Users,
  BookOpen,
  Activity,
  Settings,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar: React.FC = () => {
  const { user } = useAuth();

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Repositories', href: '/repositories', icon: BookOpen },
    { name: 'Explore', href: '/explore', icon: GitFork },
    { name: 'Stars', href: '/stars', icon: Star },
    { name: 'Followers', href: '/followers', icon: Users },
    { name: 'Activity', href: '/activity', icon: Activity },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-github-navbar border-r border-github-border hidden md:block">
      <div className="p-4">
        {user && (
          <div className="mb-6">
            <div className="flex items-center space-x-3">
              <img
                src={
                  user.avatar ||
                  `https://ui-avatars.com/api/?name=${user.username}`
                }
                alt={user.username}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="font-semibold">{user.name || user.username}</h3>
                <p className="text-sm text-gray-400">@{user.username}</p>
              </div>
            </div>
          </div>
        )}

        <nav className="space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2 rounded-md text-sm ${
                  isActive
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`
              }
            >
              <item.icon size={18} />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-6">
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-2">
            Recent Repositories
          </h4>
          <RecentRepositories />
        </div>
      </div>
    </aside>
  );
};

const RecentRepositories: React.FC = () => {
  // This would come from your API
  const recentRepos = [
    { name: 'project-alpha', visibility: 'public' },
    { name: 'dotfiles', visibility: 'private' },
    { name: 'awesome-project', visibility: 'public' },
  ];

  return (
    <div className="space-y-2">
      {recentRepos.map((repo) => (
        <NavLink
          key={repo.name}
          to={`/${repo.name}`}
          className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white"
        >
          <GitFork size={14} />
          <span>{repo.name}</span>
          <span className="text-xs px-1.5 py-0.5 bg-gray-800 rounded-full">
            {repo.visibility}
          </span>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
