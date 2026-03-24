import React, { useState } from 'react';
import {
  FolderPlus,
  Upload,
  Terminal,
  Copy,
  Check,
  FileText,
  GitBranch,
  GitPullRequest,
  Star,
  Sparkles,
} from 'lucide-react';

const EmptyRepoSkeleton = ({
  username,
  repo,
}: {
  username: string | undefined;
  repo: string | undefined;
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [selectedGitignore, setSelectedGitignore] = useState('Node.js');
  const [selectedLicense, setSelectedLicense] = useState('MIT License');
  const [includeReadme, setIncludeReadme] = useState(true);
  const [includeGitignore, setIncludeGitignore] = useState(true);
  const [includeLicense, setIncludeLicense] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  const commands = [
    {
      command: `git remote add origin https://loonygit.com/${username}/${repo}.git`,
      description: 'Add remote repository',
    },
    {
      command: `git branch -M main`,
      description: 'Rename branch to main',
    },
    {
      command: `git push -u origin main`,
      description: 'Push to remote repository',
    },
  ];

  const copyToClipboard = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleCreateRepository = async () => {
    setIsCreating(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsCreating(false);
    // Handle repository creation logic here
  };

  const gitignoreOptions = [
    'Node.js',
    'Python',
    'React',
    'Java',
    'Go',
    'Ruby',
    'PHP',
  ];
  const licenseOptions = [
    'MIT License',
    'Apache 2.0',
    'GPL-3.0',
    'BSD 3-Clause',
    'None',
  ];

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12">
      <div className="max-w-4xl w-full mx-auto px-4">
        {/* Animated Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-github-primary to-blue-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
            <div className="relative bg-github-darker p-4 rounded-full border border-github-border mb-4 inline-block">
              <FolderPlus className="h-12 w-12 text-github-primary" />
            </div>
          </div>

          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-3">
            Welcome to {repo}
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto">
            Get started by adding files to your repository or set it up with
            essential files.
          </p>

          {/* Quick Stats Placeholder */}
          <div className="flex items-center justify-center gap-6 mt-6 text-sm">
            <div className="flex items-center gap-2 text-gray-500">
              <GitBranch className="h-4 w-4" />
              <span>0 branches</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <GitPullRequest className="h-4 w-4" />
              <span>0 pull requests</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <Star className="h-4 w-4" />
              <span>0 stars</span>
            </div>
          </div>
        </div>

        {/* Action Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Quick Actions */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-github-primary/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-github-darker border border-github-border rounded-xl p-6 hover:border-github-primary/50 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-github-primary/10 rounded-lg">
                  <Sparkles className="h-5 w-5 text-github-primary" />
                </div>
                <span className="text-xs text-github-primary bg-github-primary/10 px-2 py-1 rounded-full">
                  Recommended
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Quick setup
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Start from scratch with a new file or upload existing ones.
              </p>
              <div className="flex gap-3">
                <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-github-primary hover:bg-github-primaryHover text-white text-sm font-medium rounded-lg transition-all duration-200 transform hover:scale-105">
                  <FileText className="h-4 w-4" />
                  New file
                </button>
                <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 border border-github-border hover:border-github-primary text-gray-300 hover:text-white text-sm font-medium rounded-lg transition-all duration-200">
                  <Upload className="h-4 w-4" />
                  Upload
                </button>
              </div>
            </div>
          </div>

          {/* Import Repository */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-github-darker border border-github-border rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
              <div className="p-2 bg-blue-500/10 rounded-lg mb-4 inline-block">
                <Terminal className="h-5 w-5 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Import from CLI
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Push an existing repository from the command line.
              </p>
              <div className="space-y-3">
                {commands.map((cmd, idx) => (
                  <div key={idx} className="relative group/cmd">
                    <div className="bg-github-dark rounded-lg border border-github-border overflow-hidden">
                      <div className="flex items-center justify-between p-3">
                        <code className="text-xs text-gray-300 font-mono break-all flex-1">
                          {cmd.command}
                        </code>
                        <button
                          onClick={() => copyToClipboard(cmd.command, idx)}
                          className="ml-2 p-1 hover:bg-github-border rounded transition-colors"
                          title={
                            copiedIndex === idx
                              ? 'Copied!'
                              : 'Copy to clipboard'
                          }
                        >
                          {copiedIndex === idx ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4 text-gray-500 hover:text-gray-300" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="absolute left-3 -top-2 px-1 bg-github-darker text-xs text-gray-500">
                      {cmd.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Initialize Repository Card */}
        <div className="bg-github-darker border border-github-border rounded-xl p-6 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">
                Initialize this repository
              </h3>
              <p className="text-sm text-gray-400">
                Add essential files to get started faster
              </p>
            </div>
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Sparkles className="h-5 w-5 text-purple-400" />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <label className="flex items-center p-3 bg-github-dark rounded-lg border border-github-border hover:border-github-primary transition-colors cursor-pointer">
              <input
                type="checkbox"
                checked={includeReadme}
                onChange={(e) => setIncludeReadme(e.target.checked)}
                className="rounded border-github-border bg-github-dark text-github-primary focus:ring-github-primary focus:ring-offset-github-dark"
              />
              <span className="ml-3 text-sm text-gray-300">README.md</span>
            </label>

            <div className="relative">
              <label className="flex items-center p-3 bg-github-dark rounded-lg border border-github-border hover:border-github-primary transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeGitignore}
                  onChange={(e) => setIncludeGitignore(e.target.checked)}
                  className="rounded border-github-border bg-github-dark text-github-primary focus:ring-github-primary focus:ring-offset-github-dark"
                />
                <span className="ml-3 text-sm text-gray-300">.gitignore</span>
              </label>
              {includeGitignore && (
                <select
                  value={selectedGitignore}
                  onChange={(e) => setSelectedGitignore(e.target.value)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm bg-github-dark border border-github-border rounded-md text-gray-300 focus:ring-github-primary focus:border-github-primary"
                >
                  {gitignoreOptions.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              )}
            </div>

            <div className="relative">
              <label className="flex items-center p-3 bg-github-dark rounded-lg border border-github-border hover:border-github-primary transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeLicense}
                  onChange={(e) => setIncludeLicense(e.target.checked)}
                  className="rounded border-github-border bg-github-dark text-github-primary focus:ring-github-primary focus:ring-offset-github-dark"
                />
                <span className="ml-3 text-sm text-gray-300">License</span>
              </label>
              {includeLicense && (
                <select
                  value={selectedLicense}
                  onChange={(e) => setSelectedLicense(e.target.value)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm bg-github-dark border border-github-border rounded-md text-gray-300 focus:ring-github-primary focus:border-github-primary"
                >
                  {licenseOptions.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              )}
            </div>
          </div>

          <button
            onClick={handleCreateRepository}
            disabled={isCreating}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-github-primary to-github-primaryHover hover:from-github-primaryHover hover:to-github-primary text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isCreating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Creating repository...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Initialize repository
              </>
            )}
          </button>
        </div>

        {/* Import Section */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Want to import code from another repository?{' '}
            <button className="text-github-primary hover:text-github-primaryHover font-medium transition-colors">
              Import code from existing repository
            </button>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default EmptyRepoSkeleton;
