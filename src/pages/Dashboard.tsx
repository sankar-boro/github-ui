import React from "react";
import { GitFork, Star, Eye, Clock } from "lucide-react";
import RepositoryCard from "../components/repository/RepositoryCard";
// import ActivityFeed from "../components/activity/ActivityFeed";

const Dashboard: React.FC = () => {
  // Mock data - replace with actual API calls
  const recentRepositories = [
    {
      id: 1,
      name: "project-alpha",
      description: "A modern web application built with React and Node.js",
      language: "TypeScript",
      stars: 128,
      forks: 34,
      visibility: "public",
      updatedAt: "2024-01-15T10:30:00Z",
    },
    {
      id: 2,
      name: "dotfiles",
      description: "My personal dotfiles configuration",
      language: "Vim script",
      stars: 45,
      forks: 12,
      visibility: "private",
      updatedAt: "2024-01-14T08:20:00Z",
    },
    {
      id: 3,
      name: "awesome-project",
      description: "An awesome open-source project",
      language: "Python",
      stars: 256,
      forks: 78,
      visibility: "public",
      updatedAt: "2024-01-13T15:45:00Z",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent repositories</h2>
            <button className="text-sm text-blue-400 hover:underline">
              View all
            </button>
          </div>

          <div className="space-y-3">
            {recentRepositories.map((repo) => (
              <RepositoryCard key={repo.id} repository={repo} />
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Activity feed</h2>
            {/* <ActivityFeed /> */}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-github-darker border border-github-border rounded-md p-4">
            <h3 className="font-semibold mb-3">Your contributions</h3>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 35 }).map((_, i) => (
                <div
                  key={i}
                  className="w-full aspect-square rounded-sm bg-green-900/20 hover:bg-green-900/40 cursor-pointer"
                  title={`${Math.floor(Math.random() * 10)} contributions`}
                />
              ))}
            </div>
          </div>

          <div className="bg-github-darker border border-github-border rounded-md p-4">
            <h3 className="font-semibold mb-3">Suggested repositories</h3>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="text-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-blue-400 hover:underline cursor-pointer">
                        awesome-lib/{i}
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        A great library for your next project
                      </p>
                    </div>
                    <button className="flex items-center space-x-1 px-2 py-1 border border-github-border rounded-md hover:bg-gray-800">
                      <Star size={14} />
                      <span>Star</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
