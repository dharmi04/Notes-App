// src/components/NotesList.jsx
import { Plus, Pin } from 'lucide-react';
import NoteItem from './NoteItem';

export default function NotesList({ 
  notes, 
  activeFolder, 
  activeNote, 
  onNoteClick, 
  onCreateNote, 
  onTogglePin,
  searchQuery
}) {
  if (!activeFolder) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Select a folder to view notes</p>
      </div>
    );
  }

  const pinnedNotes = notes.filter(note => note.isPinned);
  const unpinnedNotes = notes.filter(note => !note.isPinned);
  
  return (
    <div className="w-full h-full flex flex-col bg-gray-100 dark:bg-gray-850 overflow-hidden transition-colors duration-300">
      <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
        <h2 className="font-medium flex items-center">
          <span 
            className="w-3 h-3 rounded-full mr-2"
            style={{ backgroundColor: activeFolder.color }}
          ></span>
          {activeFolder.name}
        </h2>
        <button 
          onClick={onCreateNote}
          className="p-2 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          aria-label="Create new note"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      
      {/* Notes List */}
      <div className="overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
        {/* Pinned Notes */}
        {pinnedNotes.length > 0 && (
          <div className="sticky top-0 px-4 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center space-x-1 bg-gray-100 dark:bg-gray-850 z-10">
            <Pin className="w-3 h-3" />
            <span>PINNED</span>
          </div>
        )}
        
        {pinnedNotes.map((note) => (
          <NoteItem 
            key={note.id}
            note={note}
            isActive={activeNote && activeNote.id === note.id}
            onClick={onNoteClick}
            onPin={onTogglePin}
            searchQuery={searchQuery}
          />
        ))}
        
        {/* Unpinned Notes */}
        {pinnedNotes.length > 0 && unpinnedNotes.length > 0 && (
          <div className="sticky top-0 px-4 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-850 z-10">
            OTHER NOTES
          </div>
        )}
        
        {unpinnedNotes.map((note) => (
          <NoteItem 
            key={note.id}
            note={note}
            isActive={activeNote && activeNote.id === note.id}
            onClick={onNoteClick}
            onPin={onTogglePin}
            searchQuery={searchQuery}
          />
        ))}
        
        {notes.length === 0 && (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400 flex flex-col items-center justify-center h-full">
            {searchQuery ? (
              <>
                <div className="mb-3 text-gray-400 dark:text-gray-500">
                  <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <p className="text-lg font-medium">No notes match your search</p>
                <p className="text-sm mt-1">Try different keywords or clear your search</p>
              </>
            ) : (
              <>
                <div className="mb-3 text-indigo-400">
                  <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-lg font-medium">No notes in this folder</p>
                <p className="text-sm mt-1">Click the + button to create your first note</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}