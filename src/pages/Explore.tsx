import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TrendingUp,
  Star,
  GitFork,
  Users,
  Calendar,
  ChevronRight,
  Flame,
  Sparkles,
  Award,
  Code2,
  BookOpen,
  Globe,
} from "lucide-react";
import RepositoryCard from "../components/repository/RepositoryCard";
import Button from "../components/common/Button";
import Tabs from "../components/common/Tabs";
import Skeleton from "../components/common/Skeleton";

// Types
interface TrendingRepository {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  todayStars: number;
  owner: {
    login: string;
    avatar: string;
  };
}

interface Developer {
  id: number;
  username: string;
  name: string;
  avatar: string;
  bio: string | null;
  repositories: number;
  followers: number;
  popularRepo?: {
    name: string;
    description: string;
    stars: number;
  };
}

interface Topic {
  id: string;
  name: string;
  description: string;
  repositories: number;
  icon?: string;
}

// Mock data
const mockTrendingRepos: TrendingRepository[] = [
  {
    id: 1,
    name: "browser-use",
    fullName: "browser-use/browser-use",
    description: "Make websites accessible for AI agents",
    language: "Python",
    stars: 24500,
    forks: 2100,
    todayStars: 850,
    owner: {
      login: "browser-use",
      avatar: "https://ui-avatars.com/api/?name=Browser+Use",
    },
  },
  {
    id: 2,
    name: "cline",
    fullName: "cline/cline",
    description: "Autonomous coding agent right in your IDE",
    language: "TypeScript",
    stars: 18200,
    forks: 1500,
    todayStars: 620,
    owner: {
      login: "cline",
      avatar: "https://ui-avatars.com/api/?name=Cline",
    },
  },
  {
    id: 3,
    name: "dify",
    fullName: "langgenius/dify",
    description: "Open-source LLM app development platform",
    language: "Python",
    stars: 51200,
    forks: 6800,
    todayStars: 1200,
    owner: {
      login: "langgenius",
      avatar: "https://ui-avatars.com/api/?name=Langgenius",
    },
  },
  {
    id: 4,
    name: "supabase",
    fullName: "supabase/supabase",
    description: "The open source Firebase alternative",
    language: "TypeScript",
    stars: 72300,
    forks: 6900,
    todayStars: 450,
    owner: {
      login: "supabase",
      avatar: "https://ui-avatars.com/api/?name=Supabase",
    },
  },
  {
    id: 5,
    name: "cal.com",
    fullName: "calcom/cal.com",
    description: "Scheduling infrastructure for everyone",
    language: "TypeScript",
    stars: 31500,
    forks: 4800,
    todayStars: 230,
    owner: {
      login: "calcom",
      avatar: "https://ui-avatars.com/api/?name=Cal.com",
    },
  },
];

const mockDevelopers: Developer[] = [
  {
    id: 1,
    username: "karpathy",
    name: "Andrej Karpathy",
    avatar: "https://ui-avatars.com/api/?name=Andrej+Karpathy",
    bio: "Working on AI @ OpenAI. Previously Director of AI at Tesla.",
    repositories: 89,
    followers: 245000,
    popularRepo: {
      name: "llm.c",
      description: "LLM training in simple, pure C/CUDA",
      stars: 18500,
    },
  },
  {
    id: 2,
    username: "tj",
    name: "TJ Holowaychuk",
    avatar: "https://ui-avatars.com/api/?name=TJ+Holowaychuk",
    bio: "Co-founder @ Apex. Creator of Express, Koa, and many other open source projects.",
    repositories: 312,
    followers: 189000,
    popularRepo: {
      name: "express",
      description: "Fast, unopinionated, minimalist web framework for Node.js",
      stars: 64500,
    },
  },
  {
    id: 3,
    username: "yyx990803",
    name: "Evan You",
    avatar: "https://ui-avatars.com/api/?name=Evan+You",
    bio: "Creator of Vue.js, Vite, and VoidZero.",
    repositories: 156,
    followers: 178000,
    popularRepo: {
      name: "vue",
      description:
        "Vue.js is a progressive, incrementally-adoptable JavaScript framework",
      stars: 208000,
    },
  },
];

const mockTopics: Topic[] = [
  {
    id: "1",
    name: "artificial-intelligence",
    description: "AI and machine learning projects",
    repositories: 452000,
  },
  {
    id: "2",
    name: "react",
    description: "A JavaScript library for building user interfaces",
    repositories: 891000,
  },
  {
    id: "3",
    name: "python",
    description: "Python is a programming language",
    repositories: 1250000,
  },
  {
    id: "4",
    name: "developer-tools",
    description: "Tools for developers",
    repositories: 234000,
  },
  {
    id: "5",
    name: "database",
    description: "Database systems and tools",
    repositories: 178000,
  },
];

type ExploreTab = "repositories" | "developers" | "topics";

const Explore: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ExploreTab>("repositories");
  const [loading, setLoading] = useState(true);
  const [trendingRepos, setTrendingRepos] = useState<TrendingRepository[]>([]);
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [timeRange, setTimeRange] = useState<"today" | "week" | "month">(
    "today",
  );

  useEffect(() => {
    fetchExploreData();
  }, [activeTab, timeRange]);

  const fetchExploreData = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      switch (activeTab) {
        case "repositories":
          setTrendingRepos(mockTrendingRepos);
          break;
        case "developers":
          setDevelopers(mockDevelopers);
          break;
        case "topics":
          setTopics(mockTopics);
          break;
      }
    } catch (error) {
      console.error("Error fetching explore data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRepoClick = (repo: TrendingRepository) => {
    navigate(`/${repo.fullName}`);
  };

  const handleDeveloperClick = (username: string) => {
    navigate(`/${username}`);
  };

  const handleTopicClick = (topic: string) => {
    navigate(`/topics/${topic}`);
  };

  const tabs = [
    { id: "repositories", label: "Repositories", icon: <BookOpen size={16} /> },
    { id: "developers", label: "Developers", icon: <Users size={16} /> },
    { id: "topics", label: "Topics", icon: <Globe size={16} /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Explore</h1>
        <p className="text-gray-400">
          Discover trending repositories, developers, and topics
        </p>
      </div>

      {/* Tabs */}
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={(tab) => setActiveTab(tab as ExploreTab)}
        variant="underline"
        // className="mb-6"
      />

      {/* Time range selector for repositories */}
      {activeTab === "repositories" && (
        <div className="flex items-center gap-2 mb-6">
          <span className="text-sm text-gray-400">Trending:</span>
          <button
            onClick={() => setTimeRange("today")}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              timeRange === "today"
                ? "bg-blue-500 text-white"
                : "text-gray-400 hover:text-white hover:bg-gray-800"
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setTimeRange("week")}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              timeRange === "week"
                ? "bg-blue-500 text-white"
                : "text-gray-400 hover:text-white hover:bg-gray-800"
            }`}
          >
            This week
          </button>
          <button
            onClick={() => setTimeRange("month")}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              timeRange === "month"
                ? "bg-blue-500 text-white"
                : "text-gray-400 hover:text-white hover:bg-gray-800"
            }`}
          >
            This month
          </button>
        </div>
      )}

      {/* Content */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} height="120px" />
          ))}
        </div>
      ) : (
        <>
          {activeTab === "repositories" && (
            <div className="space-y-4">
              {trendingRepos.map((repo, index) => (
                <div
                  key={repo.id}
                  onClick={() => handleRepoClick(repo)}
                  className="cursor-pointer relative"
                >
                  <div className="absolute left-0 top-4 text-2xl font-bold text-gray-600 -ml-8">
                    {index + 1}
                  </div>
                  <div className="bg-github-darker border border-github-border rounded-md p-4 hover:border-gray-500 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <img
                            src={repo.owner.avatar}
                            alt={repo.owner.login}
                            className="w-5 h-5 rounded-full"
                          />
                          <span className="text-sm text-gray-400">
                            {repo.owner.login}
                          </span>
                          <span className="text-gray-600">/</span>
                          <h3 className="font-semibold text-blue-400 hover:underline">
                            {repo.name}
                          </h3>
                        </div>

                        <p className="text-sm text-gray-400 mb-3">
                          {repo.description}
                        </p>

                        <div className="flex items-center gap-4 text-sm">
                          {repo.language && (
                            <span className="flex items-center gap-1">
                              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                              <span>{repo.language}</span>
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Star size={14} />
                            <span>{repo.stars.toLocaleString()}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <GitFork size={14} />
                            <span>{repo.forks.toLocaleString()}</span>
                          </span>
                          <span className="flex items-center gap-1 text-green-500">
                            <Flame size={14} />
                            <span>{repo.todayStars} today</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "developers" && (
            <div className="space-y-4">
              {developers.map((dev, index) => (
                <div
                  key={dev.id}
                  onClick={() => handleDeveloperClick(dev.username)}
                  className="bg-github-darker border border-github-border rounded-md p-4 hover:border-gray-500 transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-2xl font-bold text-gray-600 w-8">
                      {index + 1}
                    </div>

                    <img
                      src={dev.avatar}
                      alt={dev.name}
                      className="w-12 h-12 rounded-full"
                    />

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-blue-400 hover:underline">
                          {dev.name}
                        </h3>
                        <span className="text-gray-400">@{dev.username}</span>
                      </div>

                      <p className="text-sm text-gray-400 mb-3">{dev.bio}</p>

                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>{dev.repositories} repositories</span>
                        <span>{dev.followers.toLocaleString()} followers</span>
                      </div>

                      {dev.popularRepo && (
                        <div className="mt-3 p-3 bg-gray-900 rounded-md">
                          <div className="flex items-center gap-2 text-sm">
                            <Award size={14} className="text-yellow-500" />
                            <span className="font-medium">
                              Popular repository
                            </span>
                          </div>
                          <div className="mt-1">
                            <span className="text-blue-400 hover:underline">
                              {dev.popularRepo.name}
                            </span>
                            <p className="text-xs text-gray-400">
                              {dev.popularRepo.description}
                            </p>
                            <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                              <Star size={12} />
                              <span>
                                {dev.popularRepo.stars.toLocaleString()} stars
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "topics" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topics.map((topic) => (
                <div
                  key={topic.id}
                  onClick={() => handleTopicClick(topic.name)}
                  className="bg-github-darker border border-github-border rounded-md p-4 hover:border-gray-500 transition-colors cursor-pointer"
                >
                  <h3 className="font-semibold text-blue-400 hover:underline mb-1">
                    {topic.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">
                    {topic.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <BookOpen size={12} />
                    <span>
                      {topic.repositories.toLocaleString()} repositories
                    </span>
                  </div>
                </div>
              ))}

              <div className="col-span-full mt-4 text-center">
                <Button
                  variant="secondary"
                  onClick={() => navigate("/topics")}
                  icon={<ChevronRight size={16} />}
                  iconPosition="right"
                >
                  View all topics
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Explore;
