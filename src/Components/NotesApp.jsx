import { useState, useEffect } from 'react';
import { Search, Plus, Moon, Sun, Pin, ChevronDown, ChevronRight, Edit2, Trash2 } from 'lucide-react';

export default function NotesApp() {
  // States
  const [darkMode, setDarkMode] = useState(false);
  const [folders, setFolders] = useState([]);
  const [notes, setNotes] = useState([]);
  const [activeFolder, setActiveFolder] = useState(null);
  const [activeNote, setActiveNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderColor, setNewFolderColor] = useState('#3B82F6');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  
  // Load initial data
  useEffect(() => {
    // Dummy data
    const initialFolders = [
      { id: 1, name: 'Work', color: '#EF4444', count: 3 },
      { id: 2, name: 'Personal', color: '#10B981', count: 5 },
      { id: 3, name: 'Ideas', color: '#6366F1', count: 2 },
      { id: 4, name: 'Reading List', color: '#F59E0B', count: 4 }
    ];
    
    const initialNotes = [
      { id: 1, folderId: 1, title: 'Project Timeline', content: 'Need to complete the project by next Friday. Review all milestones and deliverables.', createdAt: '2025-04-10T10:30:00', isPinned: true },
      { id: 2, folderId: 1, title: 'Meeting Notes', content: 'Discussed new feature implementation with the team. Action items: Research API options, create wireframes.', createdAt: '2025-04-11T14:20:00', isPinned: false },
      { id: 3, folderId: 1, title: 'Client Feedback', content: 'Client requests additional dashboard analytics. Need to scope effort by Wednesday.', createdAt: '2025-04-11T16:45:00', isPinned: false },
      { id: 4, folderId: 2, title: 'Shopping List', content: '- Groceries\n- New running shoes\n- Birthday gift for mom', createdAt: '2025-04-09T09:15:00', isPinned: false },
      { id: 5, folderId: 2, title: 'Weekend Plans', content: 'Saturday: Hiking at Sunset Trail\nSunday: Brunch with friends at 11am', createdAt: '2025-04-12T08:30:00', isPinned: true },
      { id: 6, folderId: 2, title: 'Workout Schedule', content: 'Monday: Upper body\nWednesday: Lower body\nFriday: Cardio', createdAt: '2025-04-08T20:10:00', isPinned: false },
      { id: 7, folderId: 3, title: 'App Concept', content: 'Create a recipe app that recommends meals based on ingredients you already have.', createdAt: '2025-04-07T12:40:00', isPinned: false },
      { id: 8, folderId: 3, title: 'Book Idea', content: 'A story about a detective who can communicate with plants. Working title: "The Green Whisper"', createdAt: '2025-04-10T22:15:00', isPinned: true },
    ];
    
    setFolders(initialFolders);
    setNotes(initialNotes);
    setActiveFolder(initialFolders[0]);
  }, []);
  
  // Helper functions
  const toggleDarkMode = () => setDarkMode(!darkMode);
  
  const handleFolderClick = (folder) => {
    setActiveFolder(folder);
    setActiveNote(null);
  };
  
  const handleNoteClick = (note) => {
    setActiveNote(note);
    setIsEditing(false);
  };
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const createNewFolder = () => {
    if (newFolderName.trim() === '') return;
    
    const newFolder = {
      id: folders.length + 1,
      name: newFolderName,
      color: newFolderColor,
      count: 0
    };
    
    setFolders([...folders, newFolder]);
    setNewFolderName('');
    setIsCreatingFolder(false);
  };
  
  const createNewNote = () => {
    if (!activeFolder) return;
    
    const newNote = {
      id: notes.length + 1,
      folderId: activeFolder.id,
      title: 'Untitled Note',
      content: '',
      createdAt: new Date().toISOString(),
      isPinned: false
    };
    
    setNotes([...notes, newNote]);
    setActiveNote(newNote);
    setIsEditing(true);
    
    // Update folder count
    setFolders(folders.map(folder => 
      folder.id === activeFolder.id 
        ? { ...folder, count: folder.count + 1 } 
        : folder
    ));
  };
  
  const updateNote = (field, value) => {
    if (!activeNote) return;
    
    const updatedNotes = notes.map(note => 
      note.id === activeNote.id 
        ? { ...note, [field]: value } 
        : note
    );
    
    setNotes(updatedNotes);
    setActiveNote({ ...activeNote, [field]: value });
  };
  
  const toggleNotePin = (note) => {
    const updatedNotes = notes.map(n => 
      n.id === note.id 
        ? { ...n, isPinned: !n.isPinned } 
        : n
    );
    
    setNotes(updatedNotes);
    if (activeNote && activeNote.id === note.id) {
      setActiveNote({ ...activeNote, isPinned: !activeNote.isPinned });
    }
  };
  
  const deleteNote = (noteId) => {
    const noteToDelete = notes.find(note => note.id === noteId);
    if (!noteToDelete) return;
    
    setNotes(notes.filter(note => note.id !== noteId));
    
    if (activeNote && activeNote.id === noteId) {
      setActiveNote(null);
    }
    
    // Update folder count
    setFolders(folders.map(folder => 
      folder.id === noteToDelete.folderId 
        ? { ...folder, count: folder.count - 1 } 
        : folder
    ));
  };
  
  // Filtered notes
  const filteredNotes = activeFolder 
    ? notes.filter(note => {
        const matchesFolder = note.folderId === activeFolder.id;
        const matchesSearch = searchQuery 
          ? note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            note.content.toLowerCase().includes(searchQuery.toLowerCase())
          : true;
        return matchesFolder && matchesSearch;
      })
    : [];
  
  const pinnedNotes = filteredNotes.filter(note => note.isPinned);
  const unpinnedNotes = filteredNotes.filter(note => !note.isPinned);
  
  // Date formatting
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };
  
  // Highlight search matches
  const highlightMatches = (text, query) => {
    if (!query || !text) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-700">$1</mark>');
  };
  
  return (
    <div className={`h-screen flex flex-col ${darkMode ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      {/* Header */}
      <header className="px-4 py-3 bg-white dark:bg-gray-800 shadow-sm flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-xl text-indigo-600 dark:text-indigo-400">NoteNest</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search notes..."
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-700 w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white dark:bg-gray-800 shadow-sm flex flex-col transition-all duration-300`}>
          <div className="p-3 flex justify-between items-center">
            <h2 className={`font-medium ${sidebarOpen ? 'block' : 'hidden'}`}>My Folders</h2>
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)} 
              className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
          
          <div className="px-3 mb-2 flex justify-between items-center">
            <span className={`text-sm text-gray-500 dark:text-gray-400 ${sidebarOpen ? 'block' : 'hidden'}`}>
              {folders.length} folders
            </span>
            <button 
              onClick={() => setIsCreatingFolder(true)}
              className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-indigo-600 dark:text-indigo-400"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          {/* New Folder Form */}
          {isCreatingFolder && sidebarOpen && (
            <div className="px-3 py-2 mb-2">
              <div className="mb-2">
                <input 
                  type="text"
                  placeholder="Folder name"
                  className="w-full p-2 text-sm rounded border border-gray-200 dark:border-gray-700 dark:bg-gray-700"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between mb-2">
                <input 
                  type="color"
                  className="w-6 h-6 cursor-pointer"
                  value={newFolderColor}
                  onChange={(e) => setNewFolderColor(e.target.value)}
                />
                <div className="flex space-x-2">
                  <button 
                    className="px-2 py-1 text-xs rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                    onClick={() => setIsCreatingFolder(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    className="px-2 py-1 text-xs rounded bg-indigo-500 text-white hover:bg-indigo-600"
                    onClick={createNewFolder}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Folders List */}
          <div className="overflow-y-auto flex-1">
            {folders.map((folder) => (
              <div 
                key={folder.id}
                onClick={() => handleFolderClick(folder)}
                className={`flex items-center px-3 py-2 cursor-pointer transition-all ${
                  activeFolder && activeFolder.id === folder.id 
                    ? 'bg-indigo-50 dark:bg-gray-700' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <div 
                  className="w-3 h-3 rounded-full mr-3"
                  style={{ backgroundColor: folder.color }}
                ></div>
                {sidebarOpen && (
                  <>
                    <span className="flex-1 truncate">{folder.name}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{folder.count}</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </aside>
        
        {/* Notes List */}
        <div className={`${activeNote ? 'hidden md:block' : 'block'} w-full md:w-72 lg:w-80 bg-gray-100 dark:bg-gray-850 overflow-y-auto`}>
          <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
            <h2 className="font-medium">
              {activeFolder ? activeFolder.name : 'All Notes'}
            </h2>
            <button 
              onClick={createNewNote}
              className="p-2 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition-all"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          {/* Notes List */}
          <div>
            {/* Pinned Notes */}
            {pinnedNotes.length > 0 && (
              <div className="px-4 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center space-x-1">
                <Pin className="w-3 h-3" />
                <span>PINNED</span>
              </div>
            )}
            
            {pinnedNotes.map((note) => (
              <div 
                key={note.id}
                onClick={() => handleNoteClick(note)}
                className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer ${
                  activeNote && activeNote.id === note.id 
                    ? 'bg-white dark:bg-gray-800' 
                    : 'hover:bg-white dark:hover:bg-gray-800'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium" 
                      dangerouslySetInnerHTML={{
                        __html: searchQuery 
                          ? highlightMatches(note.title, searchQuery) 
                          : note.title
                      }} 
                  />
                  <div className="flex space-x-1">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleNotePin(note);
                      }}
                      className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-yellow-500"
                    >
                      <Pin className="w-3 h-3 fill-current" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2"
                   dangerouslySetInnerHTML={{
                     __html: searchQuery 
                       ? highlightMatches(note.content.substring(0, 100), searchQuery) 
                       : note.content.substring(0, 100)
                   }} 
                />
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDate(note.createdAt)}
                </div>
              </div>
            ))}
            
            {/* Unpinned Notes */}
            {pinnedNotes.length > 0 && unpinnedNotes.length > 0 && (
              <div className="px-4 py-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                OTHER NOTES
              </div>
            )}
            
            {unpinnedNotes.map((note) => (
              <div 
                key={note.id}
                onClick={() => handleNoteClick(note)}
                className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer ${
                  activeNote && activeNote.id === note.id 
                    ? 'bg-white dark:bg-gray-800' 
                    : 'hover:bg-white dark:hover:bg-gray-800'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium" 
                      dangerouslySetInnerHTML={{
                        __html: searchQuery 
                          ? highlightMatches(note.title, searchQuery) 
                          : note.title
                      }} 
                  />
                  <div className="flex space-x-1">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleNotePin(note);
                      }}
                      className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-yellow-500"
                    >
                      <Pin className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2"
                   dangerouslySetInnerHTML={{
                     __html: searchQuery 
                       ? highlightMatches(note.content.substring(0, 100), searchQuery) 
                       : note.content.substring(0, 100)
                   }} 
                />
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDate(note.createdAt)}
                </div>
              </div>
            ))}
            
            {filteredNotes.length === 0 && (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                {searchQuery ? 'No notes match your search' : 'No notes in this folder'}
              </div>
            )}
          </div>
        </div>
        
        {/* Note Editor */}
        {activeNote ? (
          <div className={`${activeNote ? 'block' : 'hidden md:block'} flex-1 bg-white dark:bg-gray-800 flex flex-col`}>
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <button 
                  className="md:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setActiveNote(null)}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {isEditing ? (
                  <input 
                    type="text"
                    className="text-lg font-medium bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-indigo-500"
                    value={activeNote.title}
                    onChange={(e) => updateNote('title', e.target.value)}
                  />
                ) : (
                  <h2 className="text-lg font-medium">{activeNote.title}</h2>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => deleteNote(activeNote.id)}
                  className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto">
              {isEditing ? (
                <textarea 
                  className="w-full h-full p-4 text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  value={activeNote.content}
                  onChange={(e) => updateNote('content', e.target.value)}
                  placeholder="Write your note here..."
                />
              ) : (
                <div className="prose dark:prose-invert max-w-none">
                  {activeNote.content.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
              <span>Created: {new Date(activeNote.createdAt).toLocaleString()}</span>
              {isEditing && (
                <button 
                  className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                  onClick={() => setIsEditing(false)}
                >
                  Save
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 bg-white dark:bg-gray-800 flex items-center justify-center">
            <div className="text-center p-8">
              <div className="mb-4">
                <img src="/api/placeholder/200/200" alt="Notes" className="mx-auto rounded-lg" />
              </div>
              <h2 className="text-xl font-medium mb-2">Select or create a note</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Choose a note from the list or create a new one
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// This component would need to be imported but isn't actually defined in the codebase
function ChevronLeft(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
  );
}