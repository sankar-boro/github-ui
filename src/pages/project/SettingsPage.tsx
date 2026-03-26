import { useEffect, useState } from 'react';
import { DELETE_REPO } from '../../config';
import { useParams } from 'react-router-dom';

const SettingsPage = () => {
  const params = useParams<any>();
  const { username, repo } = params;

  const [repoName, setRepoName] = useState('project-alpha');
  const [description, setDescription] = useState(
    'A modern web application with amazing features and capabilities',
  );
  const [newTopic, setNewTopic] = useState('');
  const [topics, setTopics] = useState(['react', 'typescript', 'nodejs']);

  // State for showing feedback messages
  const [saveStatus, setSaveStatus] = useState<
    'idle' | 'saving' | 'success' | 'error'
  >('idle');
  const [archiveStatus, setArchiveStatus] = useState<
    'idle' | 'confirming' | 'archiving' | 'archived'
  >('idle');
  const [deleteStatus, setDeleteStatus] = useState<
    'idle' | 'confirming' | 'deleting' | 'deleted'
  >('idle');

  useEffect(() => {
    if (repo) {
      setRepoName(repo);
    }
  }, [username, repo]);

  const addTopic = () => {
    if (newTopic.trim() && !topics.includes(newTopic.trim())) {
      setTopics([...topics, newTopic.trim()]);
      setNewTopic('');
    }
  };

  const removeTopic = (topicToRemove: string) => {
    setTopics(topics.filter((topic) => topic !== topicToRemove));
  };

  const handleSaveChanges = () => {
    setSaveStatus('saving');
    // Simulate API call
    setTimeout(() => {
      setSaveStatus('success');
      // Reset success message after 3 seconds
      setTimeout(() => setSaveStatus('idle'), 3000);
    }, 800);
  };

  const handleArchive = () => {
    if (archiveStatus === 'confirming') {
      setArchiveStatus('archiving');
      setTimeout(() => {
        setArchiveStatus('archived');
        setTimeout(() => setArchiveStatus('idle'), 3000);
      }, 800);
    } else {
      setArchiveStatus('confirming');
    }
  };

  const handleDelete = async () => {
    if (deleteStatus === 'confirming') {
      setDeleteStatus('deleting');
      // setTimeout(() => {
      //   setDeleteStatus('deleted');
      //   setTimeout(() => setDeleteStatus('idle'), 3000);
      // }, 800);
      try {
        const token = localStorage.getItem('token');

        await fetch(DELETE_REPO + `/${username}/${repoName}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          credentials: 'include',
          body: JSON.stringify({
            name: repoName,
            full_name: username,
          }),
        });
        setDeleteStatus('deleted');
        setTimeout(() => setDeleteStatus('idle'), 1000);
      } catch (error) {}
    } else {
      setDeleteStatus('confirming');
    }
  };

  const cancelArchive = () => setArchiveStatus('idle');
  const cancelDelete = () => setDeleteStatus('idle');

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar with settings sections */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <nav className="space-y-1">
          {[
            { name: 'General', icon: '⚙️', active: true },
            { name: 'Collaborators', icon: '👥', active: false },
            { name: 'Moderation', icon: '🛡️', active: false },
            { name: 'Data services', icon: '📊', active: false },
          ].map((item) => (
            <a
              key={item.name}
              href="#"
              className={`flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
                item.active
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-medium'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.name}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main content area */}
      <main className="flex-1 min-w-0">
        <div className="space-y-6">
          {/* Repository name section */}
          <div className="border-b border-gray-200 dark:border-gray-800 pb-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
              Repository name
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              Change your repository's name. This will update the URL as well.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <span className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-l-md border border-gray-300 dark:border-gray-700 whitespace-nowrap">
                {`${username}/${repoName}`}
              </span>
              <input
                type="text"
                value={repoName}
                onChange={(e) => setRepoName(e.target.value)}
                className="flex-1 px-3 py-1.5 border border-gray-300 dark:border-gray-700 rounded-r-md dark:bg-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Description section */}
          <div className="border-b border-gray-200 dark:border-gray-800 pb-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
              Description
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              Add a short description to help people understand your repository.
            </p>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
          </div>

          {/* Topics section */}
          <div className="border-b border-gray-200 dark:border-gray-800 pb-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
              Topics
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              Help others discover your repository by adding up to 20 topics.
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              {topics.map((topic) => (
                <span
                  key={topic}
                  className="inline-flex items-center gap-1.5 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2.5 py-1 rounded-full border border-gray-200 dark:border-gray-700"
                >
                  {topic}
                  <button
                    onClick={() => removeTopic(topic)}
                    className="hover:text-gray-900 dark:hover:text-white text-gray-500"
                    aria-label={`Remove ${topic} topic`}
                  >
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a topic (e.g., react, database, api)"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTopic()}
                className="flex-1 px-3 py-1.5 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <button
                onClick={addTopic}
                className="px-4 py-1.5 text-sm font-medium border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Add
              </button>
            </div>
          </div>

          {/* Social preview - GitHub style */}
          <div className="border-b border-gray-200 dark:border-gray-800 pb-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
              Social preview
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              Customize the image that appears when sharing your repository on
              social media.
            </p>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden max-w-md">
              <div className="h-32 bg-gradient-to-r from-[#2b6e3c] to-[#1a4d2a]"></div>
              <div className="p-3 bg-white dark:bg-gray-900">
                <div className="flex items-center gap-2 mb-1">
                  <svg
                    className="w-4 h-4 text-gray-600 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    sankar-boro/project-alpha
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {description}
                </p>
                <div className="flex gap-4 mt-2 text-xs text-gray-500">
                  <span>⭐ 1.2k</span>
                  <span>🍴 456</span>
                </div>
              </div>
            </div>
            <button className="mt-3 text-sm text-blue-600 dark:text-white hover:underline">
              Edit social preview
            </button>
          </div>

          {/* Danger zone - GitHub style with confirmation buttons */}
          <div>
            <h3 className="text-base font-semibold text-red-600 dark:text-red-400 mb-3">
              Danger Zone
            </h3>
            <div className="border border-red-200 dark:border-red-800 rounded-lg">
              {/* Archive option */}
              <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-red-200 dark:border-red-800">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    Archive this repository
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Mark this repository as archived and read-only. You can
                    unarchive it later.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {archiveStatus === 'confirming' ? (
                    <>
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Are you sure?
                      </span>
                      <button
                        onClick={handleArchive}
                        className="px-3 py-1.5 text-xs font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                      >
                        Yes, archive
                      </button>
                      <button
                        onClick={cancelArchive}
                        className="px-3 py-1.5 text-xs font-medium border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        Cancel
                      </button>
                    </>
                  ) : archiveStatus === 'archiving' ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Archiving...
                      </span>
                    </div>
                  ) : archiveStatus === 'archived' ? (
                    <span className="text-xs text-green-600 dark:text-green-400">
                      Repository archived ✓
                    </span>
                  ) : (
                    <button
                      onClick={handleArchive}
                      className="px-3 py-1.5 text-xs font-medium border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      Archive
                    </button>
                  )}
                </div>
              </div>

              {/* Delete option */}
              <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    Delete this repository
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Once you delete a repository, there is no going back. Please
                    be certain.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {deleteStatus === 'confirming' ? (
                    <>
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Are you absolutely sure?
                      </span>
                      <button
                        onClick={handleDelete}
                        className="px-3 py-1.5 text-xs font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                      >
                        Yes, delete
                      </button>
                      <button
                        onClick={cancelDelete}
                        className="px-3 py-1.5 text-xs font-medium border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        Cancel
                      </button>
                    </>
                  ) : deleteStatus === 'deleting' ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-gray-300 border-t-red-600 rounded-full animate-spin"></div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Deleting...
                      </span>
                    </div>
                  ) : deleteStatus === 'deleted' ? (
                    <span className="text-xs text-red-600 dark:text-red-400">
                      Repository deleted
                    </span>
                  ) : (
                    <button
                      onClick={handleDelete}
                      className="px-3 py-1.5 text-xs font-medium text-red-600 border border-red-300 dark:border-red-700 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Save button with status feedback - GitHub style */}
          <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-800 mt-6">
            <div className="flex items-center gap-3">
              {saveStatus === 'saving' && (
                <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                  <svg
                    className="w-4 h-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </span>
              )}
              {saveStatus === 'success' && (
                <span className="text-sm text-green-600 dark:text-green-400 flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Saved
                </span>
              )}
              <button
                onClick={handleSaveChanges}
                disabled={saveStatus === 'saving'}
                className="px-4 py-1.5 bg-[#2da44e] text-white text-sm font-medium rounded-md hover:bg-[#2c974b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
