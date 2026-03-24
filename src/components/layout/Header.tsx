import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Bell,
  Plus,
  ChevronDown,
  Menu,
  Search,
  Code2,
  Book,
  Users,
  Settings,
  LogOut,
  User,
  GitPullRequest,
  AlertCircle,
  CheckCircle,
  X,
  Star,
  GitFork,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Refs for click outside detection
  const userMenuRef = useRef<HTMLDivElement>(null);
  const createMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
      if (
        createMenuRef.current &&
        !createMenuRef.current.contains(event.target as Node)
      ) {
        setShowCreateMenu(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowUserMenu(false);
        setShowCreateMenu(false);
        setShowNotifications(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  // Sample notifications data
  const notifications = [
    {
      id: 1,
      type: 'star',
      message: 'Someone starred your repository',
      time: '2m ago',
      read: false,
    },
    {
      id: 2,
      type: 'fork',
      message: 'Your repository was forked',
      time: '1h ago',
      read: false,
    },
    {
      id: 3,
      type: 'pr',
      message: 'Pull request merged successfully',
      time: '3h ago',
      read: true,
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'star':
        return <Star size={14} className="text-yellow-500" />;
      case 'fork':
        return <GitFork size={14} className="text-purple-500" />;
      case 'pr':
        return <GitPullRequest size={14} className="text-green-500" />;
      default:
        return <AlertCircle size={14} className="text-blue-500" />;
    }
  };

  return (
    <header className="bg-[#0d1117] border-b border-[#30363d] px-4 py-2 sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-[#8b949e] hover:text-white transition-colors"
            aria-label="Menu"
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <Link
            to="/"
            className="text-white hover:text-[#58a6ff] transition-colors"
          >
            <Code2 size={32} />
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden lg:block">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b949e]"
                size={16}
              />
              <input
                type="text"
                placeholder="Search or jump to..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#0d1117] border border-[#30363d] rounded-md pl-10 pr-4 py-1.5 w-80 text-sm focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] text-[#c9d1d9] placeholder-[#8b949e] transition-all"
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8b949e] bg-[#21262d] px-1.5 py-0.5 rounded border border-[#30363d] hidden sm:block">
                /
              </kbd>
            </div>
          </form>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative text-[#8b949e] hover:text-white p-2 rounded-md hover:bg-[#21262d] transition-colors"
              aria-label="Notifications"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#f9826c] rounded-full"></span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-[#161b22] border border-[#30363d] rounded-lg shadow-xl overflow-hidden animate-slideDown">
                <div className="flex items-center justify-between px-4 py-3 border-b border-[#30363d]">
                  <h3 className="text-sm font-semibold text-white">
                    Notifications
                  </h3>
                  <button className="text-xs text-[#58a6ff] hover:underline">
                    Mark all as read
                  </button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 hover:bg-[#21262d] cursor-pointer transition-colors ${
                        !notification.read ? 'bg-[#1c2128]' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-[#c9d1d9]">
                            {notification.message}
                          </p>
                          <p className="text-xs text-[#8b949e] mt-1">
                            {notification.time}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-[#58a6ff] rounded-full mt-1.5"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-3 border-t border-[#30363d]">
                  <button className="w-full text-center text-sm text-[#58a6ff] hover:underline">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Create Dropdown */}
          <div className="relative" ref={createMenuRef}>
            <button
              onClick={() => setShowCreateMenu(!showCreateMenu)}
              className="flex items-center gap-1 text-[#8b949e] hover:text-white p-2 rounded-md hover:bg-[#21262d] transition-colors"
              aria-label="Create"
            >
              <Plus size={20} />
              <ChevronDown size={16} className="hidden sm:block" />
            </button>

            {showCreateMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-[#161b22] border border-[#30363d] rounded-lg shadow-xl overflow-hidden animate-slideDown">
                <div className="py-2">
                  <Link
                    to="/new/repository"
                    className="flex items-center gap-3 px-4 py-2 hover:bg-[#21262d] transition-colors"
                  >
                    <Book size={16} className="text-[#8b949e]" />
                    <div>
                      <div className="text-sm text-white">New repository</div>
                      <div className="text-xs text-[#8b949e]">
                        Create a new repository
                      </div>
                    </div>
                  </Link>
                  <Link
                    to="/new/organization"
                    className="flex items-center gap-3 px-4 py-2 hover:bg-[#21262d] transition-colors"
                  >
                    <Users size={16} className="text-[#8b949e]" />
                    <div>
                      <div className="text-sm text-white">New organization</div>
                      <div className="text-xs text-[#8b949e]">
                        Create a new organization
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* User Dropdown */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-1 hover:bg-[#21262d] rounded-md p-1 transition-colors"
              aria-label="User menu"
            >
              <img
                src={
                  user?.avatar ||
                  `https://ui-avatars.com/api/?name=${user?.username}&background=58a6ff&color=fff&bold=true`
                }
                alt={user?.username}
                className="w-8 h-8 rounded-full border border-[#30363d]"
              />
              <ChevronDown
                size={16}
                className="text-[#8b949e] hidden sm:block"
              />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-[#161b22] border border-[#30363d] rounded-lg shadow-xl overflow-hidden animate-slideDown">
                <div className="px-4 py-3 border-b border-[#30363d]">
                  <p className="text-sm font-semibold text-white">
                    {user?.username}
                  </p>
                  <p className="text-xs text-[#8b949e] mt-0.5">{user?.email}</p>
                </div>
                <div className="py-2">
                  <Link
                    to={`/${user?.username}`}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-[#21262d] transition-colors"
                  >
                    <User size={16} className="text-[#8b949e]" />
                    <span className="text-sm text-white">Your profile</span>
                  </Link>
                  <Link
                    to="/repositories"
                    className="flex items-center gap-3 px-4 py-2 hover:bg-[#21262d] transition-colors"
                  >
                    <Book size={16} className="text-[#8b949e]" />
                    <span className="text-sm text-white">
                      Your repositories
                    </span>
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center gap-3 px-4 py-2 hover:bg-[#21262d] transition-colors"
                  >
                    <Settings size={16} className="text-[#8b949e]" />
                    <span className="text-sm text-white">Settings</span>
                  </Link>
                </div>
                <div className="border-t border-[#30363d] py-2">
                  <button
                    onClick={logout}
                    className="flex items-center gap-3 w-full px-4 py-2 hover:bg-[#21262d] transition-colors text-left"
                  >
                    <LogOut size={16} className="text-[#8b949e]" />
                    <span className="text-sm text-white">Sign out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div
            ref={mobileMenuRef}
            className="fixed top-0 left-0 h-full w-64 bg-[#161b22] border-r border-[#30363d] z-50 transform transition-transform duration-300 lg:hidden animate-slideIn"
          >
            <div className="p-4 border-b border-[#30363d]">
              <div className="flex items-center justify-between">
                <Code2 size={28} className="text-white" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[#8b949e] hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleSearch} className="mt-4">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-2.5 text-[#8b949e]"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#58a6ff] text-[#c9d1d9]"
                  />
                </div>
              </form>
            </div>
            <div className="py-4">
              <Link
                to={`/${user?.username}`}
                className="flex items-center gap-3 px-4 py-2 hover:bg-[#21262d] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User size={16} className="text-[#8b949e]" />
                <span className="text-sm text-white">Profile</span>
              </Link>
              <Link
                to="/repositories"
                className="flex items-center gap-3 px-4 py-2 hover:bg-[#21262d] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Book size={16} className="text-[#8b949e]" />
                <span className="text-sm text-white">Repositories</span>
              </Link>
              <Link
                to="/settings"
                className="flex items-center gap-3 px-4 py-2 hover:bg-[#21262d] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Settings size={16} className="text-[#8b949e]" />
                <span className="text-sm text-white">Settings</span>
              </Link>
              <hr className="border-[#30363d] my-2" />
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 w-full px-4 py-2 hover:bg-[#21262d] transition-colors text-left"
              >
                <LogOut size={16} className="text-[#8b949e]" />
                <span className="text-sm text-white">Sign out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
