// components/SettingsTab.jsx
import React, { useState } from 'react';

const SettingsTab = () => {
  const [repoName, setRepoName] = useState('project-alpha');
  const [description, setDescription] = useState(
    'A modern web application with amazing features and capabilities',
  );
  const [newTopic, setNewTopic] = useState('');
  const [topics, setTopics] = useState(['react', 'typescript', 'nodejs']);

  const addTopic = () => {
    if (newTopic.trim() && !topics.includes(newTopic.trim())) {
      setTopics([...topics, newTopic.trim()]);
      setNewTopic('');
    }
  };

  const removeTopic = (topicToRemove) => {
    setTopics(topics.filter((topic) => topic !== topicToRemove));
  };

  return (
    <div className="space-y-6">
      {/* Settings sub-navigation */}
      <div className="flex items-center gap-4 text-sm border-b border-gray-200 dark:border-gray-800 pb-4 overflow-x-auto">
        <span className="font-medium text-gray-900 dark:text-white">
          Settings
        </span>
        {[
          'General',
          'Access',
          'Branches',
          'Webhooks',
          'Secrets',
          'Actions',
        ].map((item) => (
          <span
            key={item}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer whitespace-nowrap"
          >
            {item}
          </span>
        ))}
      </div>

      {/* Settings content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left column */}
        <div className="space-y-6">
          {/* Repository name */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Repository name
            </h3>
            <div className="flex flex-col sm:flex-row gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-l border border-gray-300 dark:border-gray-700 whitespace-nowrap">
                sankar-boro/
              </span>
              <input
                type="text"
                value={repoName}
                onChange={(e) => setRepoName(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-r dark:bg-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Description
            </h3>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded dark:bg-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Topics */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Topics
            </h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {topics.map((topic) => (
                <span
                  key={topic}
                  className="inline-flex items-center gap-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full"
                >
                  {topic}
                  <button
                    onClick={() => removeTopic(topic)}
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a topic"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTopic()}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded dark:bg-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={addTopic}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Social preview */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Social preview
            </h3>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
              <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-lg"></div>
              <div className="p-3 bg-white dark:bg-gray-900 rounded-b-lg border-x border-b border-gray-200 dark:border-gray-700">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  sankar-boro/project-alpha
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {description}
                </p>
                <div className="flex gap-4 mt-2 text-xs text-gray-500">
                  <span>⭐ 1.2k</span>
                  <span>🍴 456</span>
                </div>
              </div>
            </div>
          </div>

          {/* Danger zone */}
          <div>
            <h3 className="text-sm font-medium text-red-600 dark:text-red-400 mb-2">
              Danger zone
            </h3>
            <div className="border border-red-200 dark:border-red-900 rounded-lg divide-y divide-red-200 dark:divide-red-900">
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    Archive this repository
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Mark this repository as archived and read-only
                  </p>
                </div>
                <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-800">
                  Archive
                </button>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    Delete this repository
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Once you delete a repository, there is no going back
                  </p>
                </div>
                <button className="px-3 py-1 text-sm text-red-600 border border-red-300 rounded hover:bg-red-50 dark:hover:bg-red-900/20">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save button */}
      <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-800">
        <button className="px-6 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors">
          Save changes
        </button>
      </div>
    </div>
  );
};

export default SettingsTab;
