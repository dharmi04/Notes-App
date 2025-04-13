// src/components/EmptyState.jsx
export default function EmptyState() {
    return (
      <div className="flex-1 bg-white dark:bg-gray-800 flex items-center justify-center transition-colors duration-300">
        <div className="text-center p-8 max-w-md">
          <div className="mb-6">
            <div className="w-40 h-40 bg-indigo-100 dark:bg-indigo-900 rounded-full mx-auto flex items-center justify-center">
              <svg className="w-20 h-20 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-medium mb-3 text-gray-800 dark:text-gray-200">Welcome to NoteNest</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Select a note from the list or create a new one to get started.
          </p>
          <div className="flex justify-center">
            <div className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg text-white shadow-lg flex items-center space-x-2 transform transition hover:translate-y-[-2px]">
              <span>Select a note to begin</span>
              <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }