import React, { useEffect, useState } from 'react';
import { BookOpen, Edit3, History } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { REPOS_URL } from '../../config';

const Readme = ({
  username,
  repo,
  readmeHashId,
}: {
  username: string;
  repo: string;
  readmeHashId: string;
}) => {
  const [markdown, setMarkdown] = useState('');
  useEffect(() => {
    if (readmeHashId) {
      (async () => {
        const response = await fetch(
          `${REPOS_URL}/${username}/${repo}/readme?sha=${readmeHashId}`,
          {
            method: 'GET',
            credentials: 'include',
          },
        );
        const jsonResponse = await response.json();
        const md = jsonResponse.data;
        setMarkdown(md);
      })();
    }
  }, [readmeHashId]);

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
