import {
  GitBranch,
  Home,
  Tag,
  Scale,
  BookOpen,
  ChevronDown,
} from 'lucide-react';
import type { Repository } from '../../types';
import FileExplorer from '../../components/repository/FileExplorer';
import Readme from '../../components/repository/Readme';
import ReadmeTemplate from '../../components/repository/EmptyReadme';

interface FileNode {
  name: string;
  type: 'file' | 'folder' | 'directory';
  children?: FileNode[];
}

const Code = ({
  repository,
  username,
  repo,
  fileStructure,
  readmeHashId,
}: {
  repository: Repository;
  username?: string;
  repo?: string;
  fileStructure: FileNode[];
  readmeHashId: string | null;
}) => {
  return (
    <div className="min-h-screen grid grid-cols-12 gap-4">
      <div className="col-span-12 lg:col-span-8">
        <div className="bg-github-darker border border-github-border rounded-md">
          {/* Branch selector and buttons */}
          <div className="flex items-center justify-between p-2 border-b border-github-border">
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-1 px-3 py-1 border border-github-border rounded-md text-sm hover:bg-gray-800">
                <GitBranch size={14} />
                <span>{repository.default_branch}</span>
                <ChevronDown size={14} />
              </button>
              <span className="text-sm text-gray-400">
                <GitBranch size={14} className="inline mr-1" />
                {repository.branches?.length} branches
              </span>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-github-border rounded-md text-sm hover:bg-gray-800">
                Go to file
              </button>
              <button className="px-3 py-1 bg-github-primary hover:bg-github-primaryHover rounded-md text-sm">
                Add file
              </button>
              <button className="px-3 py-1 border border-github-border rounded-md text-sm hover:bg-gray-800">
                Code
              </button>
            </div>
          </div>

          {/* File explorer */}
          <FileExplorer fileStructure={fileStructure} />
        </div>

        {/* Readme */}
        {readmeHashId && username && repo ? (
          <div className="mt-4">
            <Readme
              username={username}
              repo={repo}
              readmeHashId={readmeHashId}
            />
          </div>
        ) : (
          <ReadmeTemplate />
        )}
      </div>

      {/* Right sidebar */}
      <div className="col-span-12 lg:col-span-4">
        <div className="space-y-4">
          <div className="bg-github-darker border border-github-border rounded-md p-4">
            <h3 className="font-semibold mb-2">About</h3>
            <p className="text-sm text-gray-400 mb-3">
              {repository.description}
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2 text-gray-400">
                <Home size={16} />
                <a href="#" className="text-white hover:underline">
                  example.com
                </a>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Tag size={16} />
                <span>Topics: react, typescript, nodejs</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <BookOpen size={16} />
                <span>Readme</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Scale size={16} />
                <span>{repository.license?.name} license</span>
              </div>
            </div>
          </div>

          <div className="bg-github-darker border border-github-border rounded-md p-4">
            <h3 className="font-semibold mb-2">Contributors</h3>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <img
                  key={i}
                  src={`https://ui-avatars.com/api/?name=User+${i}`}
                  alt={`contributor-${i}`}
                  className="w-8 h-8 rounded-full border border-github-border"
                  title={`@contributor-${i}`}
                />
              ))}
              <span className="text-sm text-gray-400 self-center">
                +15 contributors
              </span>
            </div>
          </div>

          <div className="bg-github-darker border border-github-border rounded-md p-4">
            <h3 className="font-semibold mb-2">Languages</h3>
            <div className="space-y-2">
              <div className="h-2 flex rounded-full overflow-hidden">
                <div className="bg-blue-500 w-2/3"></div>
                <div className="bg-yellow-500 w-1/4"></div>
                <div className="bg-green-500 w-1/12"></div>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="flex items-center space-x-1">
                    <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                    <span>TypeScript</span>
                  </span>
                  <span>66.7%</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center space-x-1">
                    <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                    <span>JavaScript</span>
                  </span>
                  <span>25.0%</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center space-x-1">
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    <span>CSS</span>
                  </span>
                  <span>8.3%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Code;
