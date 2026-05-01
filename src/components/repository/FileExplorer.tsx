import { useState } from 'react';
import { File, Folder, ChevronRight, ChevronDown } from 'lucide-react';

interface FileNode {
  name: string;
  type: 'file' | 'folder' | 'directory';
  mode: '40000' | '100644';
  children?: FileNode[];
}

const FileExplorer = ({ fileStructure }: any) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(['src']),
  );

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
          onClick={() => node.mode === '40000' && toggleFolder(currentPath)}
        >
          {node.mode === '40000' && (
            <span className="text-gray-400">
              {isExpanded ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </span>
          )}
          {node.mode === '40000' ? (
            <Folder size={16} className="text-white" />
          ) : (
            <File size={16} className="text-gray-400" />
          )}
          <span className="text-sm">{node.name}</span>
        </div>

        {node.mode === '40000' && isExpanded && node.children && (
          <div className="ml-4">
            {node.children.map((child) => renderNode(child, currentPath))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-2">
      {fileStructure.map((node: any) => renderNode(node))}
    </div>
  );
};

export default FileExplorer;
