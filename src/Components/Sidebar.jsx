// src/components/Sidebar.jsx
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import FolderList from './FolderList';
import NewFolderForm from './NewFolderForm';

export default function Sidebar({ 
  folders, 
  activeFolder, 
  onFolderClick, 
  onCreateFolder, 
  sidebarOpen, 
  setSidebarOpen 
}) {
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  
  const handleCreateFolder = (folderData) => {
    onCreateFolder(folderData);
    setIsCreatingFolder(false);
  };
  
  return (
    <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white dark:bg-gray-800 shadow-sm flex flex-col transition-all duration-300 h-full`}>
      <div className="p-3 flex justify-between items-center border-b dark:border-gray-700">
        <h2 className={`font-medium ${sidebarOpen ? 'block' : 'hidden'}`}>My Folders</h2>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)} 
          className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
          aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>
      
      <div className="px-3 py-2 flex justify-between items-center">
        <span className={`text-sm text-gray-500 dark:text-gray-400 ${sidebarOpen ? 'block' : 'hidden'}`}>
          {folders.length} folders
        </span>
        <button 
          onClick={() => setIsCreatingFolder(true)}
          className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-indigo-600 dark:text-indigo-400 transition-all duration-300 hover:rotate-90"
          aria-label="Create new folder"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      
      {/* New Folder Form */}
      {isCreatingFolder && sidebarOpen && (
        <NewFolderForm 
          onCancel={() => setIsCreatingFolder(false)} 
          onSubmit={handleCreateFolder} 
        />
      )}
      
      {/* Folders List */}
      <FolderList 
        folders={folders} 
        activeFolder={activeFolder} 
        onFolderClick={onFolderClick} 
        sidebarOpen={sidebarOpen} 
      />
    </aside>
  );
}