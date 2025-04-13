// src/components/NoteItem.jsx
import { Pin } from 'lucide-react';
import { formatDate } from '../utils/dateFormatter';
import { highlightMatches, truncateText } from '../utils/textUtils';

export default function NoteItem({ note, isActive, onClick, onPin, searchQuery }) {
  const handlePinClick = (e) => {
    e.stopPropagation();
    onPin(note);
  };
  
  return (
    <div 
      onClick={() => onClick(note)}
      className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer group transition-all duration-300 ${
        isActive 
          ? 'bg-white dark:bg-gray-800 shadow-md relative z-10' 
          : 'hover:bg-white dark:hover:bg-gray-800'
      }`}
    >
      <div className="flex justify-between items-start mb-1">
        <h3 className="font-medium text-gray-900 dark:text-gray-100" 
            dangerouslySetInnerHTML={{
              __html: searchQuery 
                ? highlightMatches(note.title, searchQuery) 
                : note.title
            }} 
        />
        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={handlePinClick}
            className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
              note.isPinned 
                ? 'text-amber-500' 
                : 'text-gray-400 hover:text-amber-500'
            }`}
            aria-label={note.isPinned ? 'Unpin note' : 'Pin note'}
          >
            <Pin className={`w-3.5 h-3.5 ${note.isPinned ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2"
         dangerouslySetInnerHTML={{
           __html: searchQuery 
             ? highlightMatches(truncateText(note.content, 100), searchQuery) 
             : truncateText(note.content, 100)
         }} 
      />
      <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
        {formatDate(note.createdAt)}
        {note.isPinned && (
          <span className="ml-2 flex items-center text-amber-500">
            <Pin className="w-3 h-3 fill-current mr-0.5" />
          </span>
        )}
      </div>
    </div>
  );
}