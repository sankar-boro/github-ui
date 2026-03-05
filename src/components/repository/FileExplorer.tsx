import React, { useState } from "react";
import { File, Folder, ChevronRight, ChevronDown } from "lucide-react";

interface FileNode {
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
}

const FileExplorer: React.FC = () => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(["src"]),
  );

  const mockFileStructure: FileNode[] = [
    {
      name: "src",
      type: "folder",
      children: [
        {
          name: "components",
          type: "folder",
          children: [
            { name: "Header.tsx", type: "file" },
            { name: "Sidebar.tsx", type: "file" },
            { name: "RepositoryCard.tsx", type: "file" },
          ],
        },
        {
          name: "pages",
          type: "folder",
          children: [
            { name: "Dashboard.tsx", type: "file" },
            { name: "Repository.tsx", type: "file" },
          ],
        },
        { name: "App.tsx", type: "file" },
        { name: "main.tsx", type: "file" },
      ],
    },
    {
      name: "public",
      type: "folder",
      children: [
        { name: "index.html", type: "file" },
        { name: "favicon.ico", type: "file" },
      ],
    },
    { name: "package.json", type: "file" },
    { name: "README.md", type: "file" },
    { name: "tsconfig.json", type: "file" },
  ];

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

  const renderNode = (node: FileNode, path: string = "") => {
    const currentPath = path ? `${path}/${node.name}` : node.name;
    const isExpanded = expandedFolders.has(currentPath);

    return (
      <div key={currentPath} className="select-none">
        <div
          className="flex items-center space-x-1 py-1 px-2 hover:bg-gray-800 rounded cursor-pointer"
          onClick={() => node.type === "folder" && toggleFolder(currentPath)}
        >
          {node.type === "folder" && (
            <span className="text-gray-400">
              {isExpanded ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </span>
          )}
          {node.type === "folder" ? (
            <Folder size={16} className="text-blue-400" />
          ) : (
            <File size={16} className="text-gray-400" />
          )}
          <span className="text-sm">{node.name}</span>
        </div>

        {node.type === "folder" && isExpanded && node.children && (
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
