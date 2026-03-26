import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Link as LinkIcon,
  Twitter,
  Calendar,
  Star,
  GitFork,
  BookOpen,
  Package,
  Edit3,
  UserPlus,
  UserCheck,
  Building,
  Github,
  Heart,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import RepositoryCard from '../components/repository/RepositoryCard';
import Button from '../components/common/Button';
import Tabs from '../components/common/Tabs';
import Skeleton from '../components/common/Skeleton';
import Alert from '../components/common/Alert';
import type {
  Contribution,
  UserProfile,
  PinnedRepository,
} from '../types/profile';
import { mockPinnedRepos } from '../data/profile';
import { USERS_PROFILE_URL } from '../config';
import { useUserRepositories } from '../hooks/Profile';

// Generate mock contribution data
const generateContributions = (): Contribution[] => {
  const contributions: Contribution[] = [];
  const today = new Date();

  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    contributions.push({
      date: date.toISOString().split('T')[0],
      count: Math.floor(Math.random() * 20),
      level: Math.floor(Math.random() * 5) as 0 | 1 | 2 | 3 | 4,
    });
  }

  return contributions;
};

const mockContributions = generateContributions();

type ProfileTab =
  | 'overview'
  | 'repositories'
  | 'projects'
  | 'packages'
  | 'stars';

const Profile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [pinnedRepos, setPinnedRepos] = useState<PinnedRepository[]>([]);
  const [repositories] = useUserRepositories(user);
  const [contributions] = useState<Contribution[]>(mockContributions);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ProfileTab>('overview');
  const [isFollowing, setIsFollowing] = useState(false);
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  useEffect(() => {
    setIsOwnProfile(user?.username === username);
  }, [user, username]);

  useEffect(() => {
    if (username && (username !== undefined || username !== 'undefined')) {
      fetchProfileData();
    }
  }, [username]);

  const fetchProfileData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await fetch(USERS_PROFILE_URL + '/' + username, {
        method: 'GET',
        credentials: 'include',
      });
      const jsonResponse = await response.json();
      const userProfile = jsonResponse.data.user;
      setProfile({
        ...userProfile,
        status: {
          emoji: '🚀',
          message: 'Building something awesome',
        },
      });
      setPinnedRepos(mockPinnedRepos);
    } catch (err) {
      setError('Failed to load profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    // API call to follow/unfollow
  };

  const handleSponsor = () => {
    // Navigate to sponsorship page
    navigate(`/sponsors/${username}`);
  };

  const handleEditProfile = () => {
    navigate('/settings');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  };

  const getContributionColor = (level: number) => {
    const colors = [
      'bg-green-900/20',
      'bg-green-700/40',
      'bg-green-600/60',
      'bg-green-500/80',
      'bg-green-400',
    ];
    return colors[level];
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'repositories', label: 'Repositories', count: profile?.publicRepos },
    { id: 'projects', label: 'Projects' },
    { id: 'packages', label: 'Packages', icon: <Package size={16} /> },
    { id: 'stars', label: 'Stars' },
  ];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Profile sidebar skeleton */}
          <div className="col-span-12 lg:col-span-3">
            <Skeleton
              variant="circle"
              width={280}
              height={280}
              className="mb-4"
            />
            <Skeleton height="32px" width="200px" className="mb-2" />
            <Skeleton height="20px" width="150px" className="mb-4" />
            <Skeleton height="60px" className="mb-4" />
            <div className="space-y-2">
              <Skeleton height="20px" />
              <Skeleton height="20px" />
              <Skeleton height="20px" />
            </div>
          </div>

          {/* Main content skeleton */}
          <div className="col-span-12 lg:col-span-9">
            <Skeleton height="200px" className="mb-6" />
            <div className="space-y-4">
              <Skeleton height="100px" />
              <Skeleton height="100px" />
              <Skeleton height="100px" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Alert
          variant="error"
          title="Error loading profile"
          onClose={() => setError(null)}
        >
          {error || 'Profile not found'}
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-12 gap-8">
        {/* Profile sidebar */}
        <div className="col-span-12 lg:col-span-3">
          <div className="sticky top-20">
            <img
              src={profile.avatar_url}
              alt={profile.full_name}
              className="w-full rounded-full border border-github-border mb-4"
            />

            <div className="mb-4">
              <h1 className="text-2xl font-semibold">{profile.full_name}</h1>
              <p className="text-gray-400 text-lg">@{profile.username}</p>

              {profile.isVerified && (
                <span className="inline-flex items-center gap-1 text-xs bg-blue-500/20 text-white px-2 py-1 rounded-full mt-1">
                  <Github size={12} />
                  Verified
                </span>
              )}
            </div>

            {profile.status && (
              <div className="mb-4 p-3 bg-gray-900 rounded-md border border-github-border">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{profile.status.emoji}</span>
                  <span className="text-sm">{profile.status.message}</span>
                </div>
              </div>
            )}

            <p className="text-gray-300 mb-4">{profile.bio}</p>

            {/* Action buttons */}
            <div className="flex gap-2 mb-4">
              {isOwnProfile ? (
                <Button
                  variant="secondary"
                  fullWidth
                  onClick={handleEditProfile}
                  icon={<Edit3 size={16} />}
                >
                  Edit profile
                </Button>
              ) : (
                <>
                  <Button
                    variant={isFollowing ? 'secondary' : 'primary'}
                    onClick={handleFollow}
                    icon={
                      isFollowing ? (
                        <UserCheck size={16} />
                      ) : (
                        <UserPlus size={16} />
                      )
                    }
                    fullWidth
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={handleSponsor}
                    icon={<Heart size={16} />}
                  >
                    Sponsor
                  </Button>
                  {/* <Button
                    variant="secondary"
                    icon={<MoreHorizontal size={16} />}
                  /> */}
                </>
              )}
            </div>

            {/* Profile details */}
            <div className="space-y-2 text-sm">
              {profile.company && (
                <div className="flex items-center gap-2 text-gray-400">
                  <Building size={16} />
                  <span>{profile.company}</span>
                </div>
              )}

              {profile.location && (
                <div className="flex items-center gap-2 text-gray-400">
                  <MapPin size={16} />
                  <span>{profile.location}</span>
                </div>
              )}

              {profile.blog && (
                <div className="flex items-center gap-2 text-gray-400">
                  <LinkIcon size={16} />
                  <a
                    href={profile.blog}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:underline"
                  >
                    {profile.blog.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}

              {profile.twitter && (
                <div className="flex items-center gap-2 text-gray-400">
                  <Twitter size={16} />
                  <a
                    href={`https://twitter.com/${profile.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:underline"
                  >
                    @{profile.twitter}
                  </a>
                </div>
              )}

              <div className="flex items-center gap-2 text-gray-400">
                <Calendar size={16} />
                <span>Joined {formatDate(profile.createdAt)}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-4 flex gap-4">
              <div
                onClick={() => navigate(`/${username}/followers`)}
                className="cursor-pointer hover:text-white"
              >
                <span className="font-semibold">{profile.followers}</span>
                <span className="text-gray-400 ml-1">followers</span>
              </div>
              <div
                onClick={() => navigate(`/${username}/following`)}
                className="cursor-pointer hover:text-white"
              >
                <span className="font-semibold">{profile.following}</span>
                <span className="text-gray-400 ml-1">following</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="col-span-12 lg:col-span-9">
          {/* Tabs */}
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onChange={(tab) => setActiveTab(tab as ProfileTab)}
            variant="underline"
            // className="mb-6"
          />

          {/* Contribution graph */}
          <div className="bg-github-darker border border-github-border rounded-md p-4 mb-6">
            <h3 className="font-semibold mb-4">
              {/* {profile.contributions || "1,234"} */}
              1234 contributions in the last year
            </h3>
            <div className="grid grid-cols-53 gap-1">
              {contributions.map((day, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-sm ${getContributionColor(day.level)}`}
                  title={`${day.count} contributions on ${day.date}`}
                />
              ))}
            </div>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'overview' && (
            <>
              {/* Pinned repositories */}
              {pinnedRepos.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-4">Pinned repositories</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pinnedRepos.map((repo) => (
                      <div
                        key={repo.id}
                        onClick={() =>
                          navigate(`/${profile.username}/${repo.name}`)
                        }
                        className="bg-github-darker border border-github-border rounded-md p-4 hover:border-gray-500 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <BookOpen size={16} className="text-gray-400" />
                          <h4 className="font-semibold text-white hover:underline">
                            {repo.name}
                          </h4>
                          {repo.private && (
                            <span className="text-xs px-2 py-0.5 border border-github-border rounded-full">
                              Private
                            </span>
                          )}
                        </div>

                        {repo.description && (
                          <p className="text-sm text-gray-400 mb-3">
                            {repo.description}
                          </p>
                        )}

                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          {repo.language && (
                            <span className="flex items-center gap-1">
                              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                              {repo.language}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Star size={14} />
                            {repo.stars}
                          </span>
                          <span className="flex items-center gap-1">
                            <GitFork size={14} />
                            {repo.forks}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular repositories */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Popular repositories</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveTab('repositories')}
                    icon={<ChevronRight size={16} />}
                    iconPosition="right"
                  >
                    View all
                  </Button>
                </div>
                <div className="space-y-3">
                  {repositories.slice(0, 3).map((repo) => (
                    <RepositoryCard key={repo.id} repository={repo} />
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'repositories' && (
            <div className="space-y-3">
              {repositories.map((repo) => (
                <RepositoryCard key={repo.id} repository={repo} />
              ))}
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="text-center py-12 bg-github-darker border border-github-border rounded-lg">
              <Package size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
              <p className="text-gray-400">
                Projects are a way to organize your repositories
              </p>
            </div>
          )}

          {activeTab === 'packages' && (
            <div className="text-center py-12 bg-github-darker border border-github-border rounded-lg">
              <Package size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                No packages published
              </h3>
              <p className="text-gray-400">
                Publish packages to share your code
              </p>
            </div>
          )}

          {activeTab === 'stars' && (
            <div className="text-center py-12 bg-github-darker border border-github-border rounded-lg">
              <Star size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                No starred repositories
              </h3>
              <p className="text-gray-400">
                Star repositories to show your appreciation
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
