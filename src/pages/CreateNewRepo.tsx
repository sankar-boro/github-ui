import React, { useState } from 'react';
import {
  X,
  ChevronDown,
  Lock,
  Globe,
  Info,
  AlertCircle,
  Plus,
  BookOpen,
  GitBranch,
  FileCode,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { API_URL } from '../config';
import { useNavigate } from 'react-router-dom';

interface NewRepositoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  ownerName?: string;
}

const NewRepositoryModal: React.FC<NewRepositoryModalProps> = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [repoName, setRepoName] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState<'public' | 'private'>('public');
  const [initializeReadme, setInitializeReadme] = useState(false);
  const [gitignoreTemplate, setGitignoreTemplate] = useState('none');
  const [license, setLicense] = useState('none');
  const [showGitignoreDropdown, setShowGitignoreDropdown] = useState(false);
  const [showLicenseDropdown, setShowLicenseDropdown] = useState(false);

  if (!user) return null;

  const isRepoNameValid = repoName.trim().length > 0;
  const repoFullName = `${user?.full_name}/${repoName || '<repository-name>'}`;

  const gitignoreOptions = [
    'None',
    'Python',
    'Node',
    'TypeScript',
    'Java',
    'Go',
    'Rust',
    'C++',
    'Ruby',
    'Swift',
    'Kotlin',
  ];

  const licenseOptions = [
    'None',
    'MIT License',
    'GNU GPLv3',
    'Apache License 2.0',
    'BSD 3-Clause',
    'Mozilla Public License 2.0',
  ];

  const onClose = () => {};

  const createRepo = async () => {
    try {
      const token = localStorage.getItem('token');

      await new Promise((resolve) => setTimeout(resolve, 1000));
      await fetch(`${API_URL}/createRepo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify({
          name: repoName,
          description,
          private: visibility === 'private' ? true : false,
          auto_init: false,
        }),
      });
      // const jsonResponse = await response.json();
      navigate(`/${user.username}/${repoName}`, { replace: true });
    } catch (error) {}
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="relative bg-[#0d1117] rounded-lg w-full max-w-3xl shadow-2xl border border-[#30363d]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#30363d]">
          <h2 className="text-xl font-semibold text-[#e6edf3]">
            Create a new repository
          </h2>
          <button
            onClick={onClose}
            className="text-[#8b949e] hover:text-[#e6edf3] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4">
          {/* Repository owner/name */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#e6edf3] mb-2">
              Repository owner <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <select className="w-full px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded-lg appearance-none text-[#e6edf3] text-sm focus:outline-none focus:ring-2 focus:ring-[#1f6feb] focus:border-transparent">
                  <option className="bg-[#0d1117]">{user?.full_name}</option>
                </select>
                <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-[#8b949e] pointer-events-none" />
              </div>
              <span className="text-[#8b949e] text-xl">/</span>
              <div className="flex-1">
                <input
                  type="text"
                  value={repoName}
                  onChange={(e) => setRepoName(e.target.value)}
                  placeholder="repository-name"
                  className="w-full px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded-lg text-[#e6edf3] text-sm focus:outline-none focus:ring-2 focus:ring-[#1f6feb] focus:border-transparent placeholder-[#6e7681]"
                  autoFocus
                />
              </div>
            </div>
            {repoName && (
              <p className="mt-2 text-sm text-[#8b949e]">
                Full name:{' '}
                <span className="font-mono text-[#79c0ff]">{repoFullName}</span>
              </p>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#e6edf3] mb-2">
              Description <span className="text-[#8b949e]">(optional)</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded-lg text-[#e6edf3] text-sm focus:outline-none focus:ring-2 focus:ring-[#1f6feb] focus:border-transparent placeholder-[#6e7681]"
              placeholder="A short description of your repository..."
            />
          </div>

          {/* Visibility */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#e6edf3] mb-2">
              Repository visibility
            </label>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 border border-[#30363d] rounded-lg hover:bg-[#161b22] cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="visibility"
                  value="public"
                  checked={visibility === 'public'}
                  onChange={(e) => setVisibility('public')}
                  className="w-4 h-4 text-[#1f6feb] bg-[#0d1117] border-[#30363d] focus:ring-[#1f6feb]"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#8b949e]" />
                    <span className="font-medium text-sm text-[#e6edf3]">
                      Public
                    </span>
                  </div>
                  <p className="text-xs text-[#8b949e] mt-1">
                    Anyone on the internet can see this repository. You choose
                    who can commit.
                  </p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 border border-[#30363d] rounded-lg hover:bg-[#161b22] cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="visibility"
                  value="private"
                  checked={visibility === 'private'}
                  onChange={(e) => setVisibility('private')}
                  className="w-4 h-4 text-[#1f6feb] bg-[#0d1117] border-[#30363d] focus:ring-[#1f6feb]"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#8b949e]" />
                    <span className="font-medium text-sm text-[#e6edf3]">
                      Private
                    </span>
                  </div>
                  <p className="text-xs text-[#8b949e] mt-1">
                    You choose who can see and commit to this repository.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Initialize repository */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-[#e6edf3] mb-3">
              Initialize this repository with:
            </h3>

            {/* Add a README */}
            <label className="flex items-center gap-3 mb-3 text-sm">
              <input
                type="checkbox"
                checked={initializeReadme}
                onChange={(e) => setInitializeReadme(e.target.checked)}
                className="w-4 h-4 text-[#1f6feb] bg-[#0d1117] border-[#30363d] rounded focus:ring-[#1f6feb]"
              />
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#8b949e]" />
                <span className="text-[#e6edf3]">Add a README file</span>
              </div>
            </label>

            {/* .gitignore template */}
            <div className="mb-3 relative">
              <label className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={gitignoreTemplate !== 'none'}
                  onChange={(e) =>
                    setGitignoreTemplate(e.target.checked ? 'Node' : 'none')
                  }
                  className="w-4 h-4 text-[#1f6feb] bg-[#0d1117] border-[#30363d] rounded focus:ring-[#1f6feb]"
                />
                <div className="flex items-center gap-2 flex-1">
                  <FileCode className="w-4 h-4 text-[#8b949e]" />
                  <span className="text-[#e6edf3]">Add .gitignore</span>
                </div>
              </label>

              {gitignoreTemplate !== 'none' && (
                <div className="ml-7 mt-2 relative">
                  <button
                    onClick={() =>
                      setShowGitignoreDropdown(!showGitignoreDropdown)
                    }
                    className="w-full px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded-lg text-left text-sm text-[#e6edf3] flex items-center justify-between hover:border-[#8b949e] focus:outline-none focus:ring-2 focus:ring-[#1f6feb]"
                  >
                    <span>{gitignoreTemplate}</span>
                    <ChevronDown className="w-4 h-4 text-[#8b949e]" />
                  </button>

                  {showGitignoreDropdown && (
                    <div className="absolute z-10 mt-1 w-full bg-[#161b22] border border-[#30363d] rounded-lg shadow-lg max-h-60 overflow-auto">
                      {gitignoreOptions.map((option) => (
                        <div
                          key={option}
                          onClick={() => {
                            setGitignoreTemplate(option);
                            setShowGitignoreDropdown(false);
                          }}
                          className="px-3 py-2 text-sm text-[#e6edf3] hover:bg-[#1f6feb] cursor-pointer"
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* License */}
            <div className="relative">
              <label className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={license !== 'none'}
                  onChange={(e) =>
                    setLicense(e.target.checked ? 'MIT License' : 'none')
                  }
                  className="w-4 h-4 text-[#1f6feb] bg-[#0d1117] border-[#30363d] rounded focus:ring-[#1f6feb]"
                />
                <div className="flex items-center gap-2 flex-1">
                  <Info className="w-4 h-4 text-[#8b949e]" />
                  <span className="text-[#e6edf3]">Choose a license</span>
                </div>
              </label>

              {license !== 'none' && (
                <div className="ml-7 mt-2 relative">
                  <button
                    onClick={() => setShowLicenseDropdown(!showLicenseDropdown)}
                    className="w-full px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded-lg text-left text-sm text-[#e6edf3] flex items-center justify-between hover:border-[#8b949e] focus:outline-none focus:ring-2 focus:ring-[#1f6feb]"
                  >
                    <span>{license}</span>
                    <ChevronDown className="w-4 h-4 text-[#8b949e]" />
                  </button>

                  {showLicenseDropdown && (
                    <div className="absolute z-10 mt-1 w-full bg-[#161b22] border border-[#30363d] rounded-lg shadow-lg max-h-60 overflow-auto">
                      {licenseOptions.map((option) => (
                        <div
                          key={option}
                          onClick={() => {
                            setLicense(option);
                            setShowLicenseDropdown(false);
                          }}
                          className="px-3 py-2 text-sm text-[#e6edf3] hover:bg-[#1f6feb] cursor-pointer"
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Repository template info - dark themed */}
          <div className="bg-[#1f6feb0d] border border-[#1f6feb] rounded-lg p-4 mb-6">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-[#79c0ff] flex-shrink-0" />
              <div className="text-sm text-[#e6edf3]">
                <p className="font-medium mb-1 text-[#79c0ff]">
                  Start your repository with a template
                </p>
                <p className="text-[#8b949e]">
                  Template repositories help you get started with pre-configured
                  files and directories. You can select a template repository
                  from the "Repository template" dropdown above.
                </p>
              </div>
            </div>
          </div>

          {/* Danger zone / notice - dark themed */}
          <div className="border border-[#bb8009] bg-[#bb80090d] rounded-lg p-4">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-[#f0883e] flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-[#f0883e]">
                  By default, you own this repository
                </p>
                <p className="text-[#8b949e] mt-1">
                  You can transfer ownership to an organization or another user
                  later if needed.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - dark themed */}
        <div className="px-6 py-4 bg-[#161b22] border-t border-[#30363d] rounded-b-lg flex items-center justify-between">
          <div className="text-xs text-[#8b949e]">
            <span className="flex items-center gap-1">
              <GitBranch className="w-3 h-3" />
              You can always add branches and collaborators later
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-[#e6edf3] hover:bg-[#21262d] rounded-lg transition-colors border border-[#30363d]"
            >
              Cancel
            </button>
            <button
              disabled={!isRepoNameValid}
              className={`px-5 py-2 text-sm font-medium text-white rounded-lg transition-colors flex items-center gap-2 ${
                isRepoNameValid
                  ? 'bg-[#238636] hover:bg-[#2ea043] cursor-pointer'
                  : 'bg-[#23863680] cursor-not-allowed'
              }`}
              onClick={createRepo}
            >
              <Plus className="w-4 h-4" />
              Create repository
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRepositoryModal;
