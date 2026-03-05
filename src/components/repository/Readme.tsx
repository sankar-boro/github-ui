import React from "react";
import { BookOpen, Edit3, History } from "lucide-react";
import ReactMarkdown from "react-markdown";

const Readme: React.FC = () => {
  const markdown = `# Project Name

A brief description of what this project does and who it's for.

## Features

- Feature 1
- Feature 2
- Feature 3

## Installation

\`\`\`bash
npm install my-project
cd my-project
npm start
\`\`\`

## Usage

\`\`\`javascript
import { Component } from 'my-project';

function App() {
  return <Component />
}
\`\`\`

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
`;

  return (
    <div className="bg-github-darker border border-github-border rounded-md">
      <div className="flex items-center justify-between p-3 border-b border-github-border">
        <div className="flex items-center space-x-2">
          <BookOpen size={16} className="text-gray-400" />
          <span className="font-semibold">README.md</span>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-1.5 hover:bg-gray-800 rounded">
            <History size={16} />
          </button>
          <button className="p-1.5 hover:bg-gray-800 rounded">
            <Edit3 size={16} />
          </button>
          <button className="px-3 py-1 border border-github-border rounded-md text-sm hover:bg-gray-800">
            Raw
          </button>
          <button className="px-3 py-1 border border-github-border rounded-md text-sm hover:bg-gray-800">
            Blame
          </button>
        </div>
      </div>
      <div className="p-6 prose prose-invert max-w-none">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Readme;
