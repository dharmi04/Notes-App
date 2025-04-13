// src/components/NoteEditor.jsx
import { useState } from 'react';
import { ChevronLeft, Edit2, Trash2, Check } from 'lucide-react';
import { formatFullDate } from '../utils/dateFormatter';

export default function NoteEditor({ note, onClose, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note ? note.title : '');
  const [content, setContent] = useState(note ? note.content : '');
  
  if (!note) return null;
  
  const handleSave = () => {
    if (title.trim() === '') return;
    
    onUpdate({
      ...note,
      title,
      content
    });
    
    setIsEditing(false);
  };
  
  return (
    <div className="flex-1 bg-white dark:bg-gray-800 flex flex-col transition-colors duration-300">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center sticky top-0 z-10 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="flex items-center space-x-3">
          <button 
            className="md:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
            onClick={onClose}
            aria-label="Back to notes list"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {isEditing ? (
            <input 
              type="text"
              className="text-lg font-medium bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-indigo-500 px-1 py-0.5 w-full max-w-md transition-colors duration-300"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
          ) : (
            <h2 className="text-lg font-medium">{note.title}</h2>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <button 
              onClick={handleSave}
              className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors duration-300"
              aria-label="Save note"
            >
              <Check className="w-4 h-4" />
            </button>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors duration-300"
              aria-label="Edit note"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={() => onDelete(note.id)}
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors duration-300"
            aria-label="Delete note"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="p-6 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
        {isEditing ? (
          <textarea 
            className="w-full h-full p-4 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none transition-colors duration-300"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note here..."
          />
        ) : (
          <div className="prose dark:prose-invert max-w-none">
            {content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
        <span>Created: {formatFullDate(note.createdAt)}</span>
        {isEditing && (
          <button 
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-300"
            onClick={handleSave}
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
}