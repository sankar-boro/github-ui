import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bell,
  Plus,
  ChevronDown,
  Menu,
  Search,
  GitFork,
  Star,
  Code2,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCreateMenu, setShowCreateMenu] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-github-darker border-b border-github-border px-4 py-2 sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <button className="md:hidden text-gray-400 hover:text-white">
            <Menu size={24} />
          </button>

          <Link to="/" className="text-white hover:text-gray-300">
            <Code2 size={32} />
          </Link>

          <form onSubmit={handleSearch} className="hidden md:block">
            <div className="relative">
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search or jump to..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-900 border border-github-border rounded-md pl-10 pr-4 py-2 w-64 text-sm focus:outline-none focus:border-blue-500 text-gray-200 placeholder-gray-500"
              />
            </div>
          </form>
        </div>

        <div className="flex items-center space-x-3">
          <button className="text-gray-400 hover:text-white p-2">
            <Bell size={20} />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowCreateMenu(!showCreateMenu)}
              className="flex items-center space-x-1 text-gray-400 hover:text-white p-2"
            >
              <Plus size={20} />
              <ChevronDown size={16} />
            </button>

            {showCreateMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-github-darker border border-github-border rounded-md shadow-lg py-1">
                <Link
                  to="/new/repository"
                  className="block px-4 py-2 text-sm hover:bg-gray-800"
                >
                  New repository
                </Link>
                <Link
                  to="/new/organization"
                  className="block px-4 py-2 text-sm hover:bg-gray-800"
                >
                  New organization
                </Link>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-1"
            >
              <img
                src={
                  user?.avatar ||
                  `https://ui-avatars.com/api/?name=${user?.username}`
                }
                alt="avatar"
                className="w-8 h-8 rounded-full border border-github-border"
              />
              <ChevronDown size={16} className="text-gray-400" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-github-darker border border-github-border rounded-md shadow-lg py-1">
                <Link
                  to={`/${user?.username}`}
                  className="block px-4 py-2 text-sm hover:bg-gray-800"
                >
                  Profile
                </Link>
                <Link
                  to="/repositories"
                  className="block px-4 py-2 text-sm hover:bg-gray-800"
                >
                  Repositories
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-sm hover:bg-gray-800"
                >
                  Settings
                </Link>
                <hr className="border-github-border my-1" />
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-800"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
