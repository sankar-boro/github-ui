import { useState, useEffect } from 'react';
import { File, Folder, ChevronRight, ChevronDown } from 'lucide-react';
import { REPOS_URL } from '../../config';

interface FileNode {
  name: string;
  type: 'file' | 'folder' | 'directory';
  children?: FileNode[];
}

const FileExplorer = ({ username, repo }: any) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(['src']),
  );

  const [mockFileStructure, setMockFileStructure] = useState<FileNode[]>([]);

  useEffect(() => {
    setMockFileStructure([
      {
        name: 'src',
        type: 'directory',
        children: [
          {
            name: 'components',
            type: 'directory',
            children: [
              { name: 'Header.tsx', type: 'file' },
              { name: 'Sidebar.tsx', type: 'file' },
              { name: 'RepositoryCard.tsx', type: 'file' },
            ],
          },
          {
            name: 'pages',
            type: 'directory',
            children: [
              { name: 'Dashboard.tsx', type: 'file' },
              { name: 'Repository.tsx', type: 'file' },
            ],
          },
          { name: 'App.tsx', type: 'file' },
          { name: 'main.tsx', type: 'file' },
        ],
      },
      {
        name: 'public',
        type: 'directory',
        children: [
          { name: 'index.html', type: 'file' },
          { name: 'favicon.ico', type: 'file' },
        ],
      },
      { name: 'package.json', type: 'file' },
      { name: 'README.md', type: 'file' },
      { name: 'tsconfig.json', type: 'file' },
    ]);

    (async () => {
      const response = await fetch(
        REPOS_URL + '/' + username + '/' + repo + '/' + 'repoTree',
        {
          method: 'GET',
          credentials: 'include',
        },
      );
      const jsonResponse = await response.json();
      setMockFileStructure(
        jsonResponse.data.entries.sort((a: any, b: any) => {
          // directories first
          if (a.type !== b.type) {
            return a.type === 'directory' ? -1 : 1;
          }

          // then alphabetical by name
          return a.name.localeCompare(b.name);
        }),
      );
      console.log(jsonResponse);
    })();
  }, []);

  const toggleFolder = (path: string) => {
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };

  const renderNode = (node: FileNode, path: string = '') => {
    const currentPath = path ? `${path}/${node.name}` : node.name;
    const isExpanded = expandedFolders.has(currentPath);

    return (
      <div key={currentPath} className="select-none">
        <div
          className="flex items-center space-x-1 py-1 px-2 hover:bg-gray-800 rounded cursor-pointer"
          onClick={() => node.type === 'directory' && toggleFolder(currentPath)}
        >
          {node.type === 'directory' && (
            <span className="text-gray-400">
              {isExpanded ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </span>
          )}
          {node.type === 'directory' ? (
            <Folder size={16} className="text-blue-400" />
          ) : (
            <File size={16} className="text-gray-400" />
          )}
          <span className="text-sm">{node.name}</span>
        </div>

        {node.type === 'directory' && isExpanded && node.children && (
          <div className="ml-4">
            {node.children.map((child) => renderNode(child, currentPath))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-2">
      {mockFileStructure.map((node) => renderNode(node))}
    </div>
  );
};

export default FileExplorer;
