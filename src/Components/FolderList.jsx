// src/components/FolderList.jsx
import { ChevronRight } from 'lucide-react';

export default function FolderList({ folders, activeFolder, onFolderClick, sidebarOpen }) {
  return (
    <div className="overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
      {folders.map((folder) => (
        <div 
          key={folder.id}
          onClick={() => onFolderClick(folder)}
          className={`flex items-center px-3 py-2.5 cursor-pointer transition-all ${
            activeFolder && activeFolder.id === folder.id 
              ? 'bg-indigo-50 dark:bg-gray-700 border-r-4 border-indigo-500 dark:border-indigo-400' 
              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <div 
            className="w-3 h-3 rounded-full mr-3 transition-transform duration-300 hover:scale-125"
            style={{ backgroundColor: folder.color }}
          ></div>
          {sidebarOpen && (
            <>
              <span className="flex-1 truncate font-medium">{folder.name}</span>
              <div className="flex items-center">
                <span className="text-xs px-1.5 py-0.5 rounded-md bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 mr-1">{folder.count}</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}