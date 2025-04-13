// src/components/App.jsx
import { useState, useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import NotesList from './Components/NotesList';
import NoteEditor from './Components/NoteEditor';
import EmptyState from './Components/EmptyState';

export default function App() {
  // States
  const [folders, setFolders] = useLocalStorage('folders', []);
  const [notes, setNotes] = useLocalStorage('notes', []);
  const [activeFolder, setActiveFolder] = useState(null);
  const [activeNote, setActiveNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Initialize with default data if empty
  useEffect(() => {
    if (folders.length === 0) {
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
    } else if (activeFolder === null && folders.length > 0) {
      setActiveFolder(folders[0]);
    }
  }, [folders, setFolders, setNotes, activeFolder]);
  
  // Helper functions
  const handleFolderClick = (folder) => {
    setActiveFolder(folder);
    setActiveNote(null);
    setSearchQuery('');
  };
  
  const handleNoteClick = (note) => {
    setActiveNote(note);
  };
  
  const createNewFolder = (folderData) => {
    const newFolder = {
      id: Date.now(),
      name: folderData.name,
      color: folderData.color,
      count: 0
    };
    
    setFolders([...folders, newFolder]);
    setActiveFolder(newFolder);
  };
  
  const createNewNote = () => {
    if (!activeFolder) return;
    
    const newNote = {
      id: Date.now(),
      folderId: activeFolder.id,
      title: 'Untitled Note',
      content: '',
      createdAt: new Date().toISOString(),
      isPinned: false
    };
    
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    setActiveNote(newNote);
    
    // Update folder count
    setFolders(folders.map(folder => 
      folder.id === activeFolder.id 
        ? { ...folder, count: folder.count + 1 } 
        : folder
    ));
  };
  
  const updateNote = (updatedNote) => {
    const updatedNotes = notes.map(note => 
      note.id === updatedNote.id ? updatedNote : note
    );
    
    setNotes(updatedNotes);
    setActiveNote(updatedNote);
  };
  
  const toggleNotePin = (note) => {
    const updatedNote = { ...note, isPinned: !note.isPinned };
    updateNote(updatedNote);
  };
  
  const deleteNote = (noteId) => {
    const noteToDelete = notes.find(note => note.id === noteId);
    if (!noteToDelete) return;
    
    const updatedNotes = notes.filter(note => note.id !== noteId);
    setNotes(updatedNotes);
    
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
  
  return (
    <ThemeProvider>
      <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
        {/* Header */}
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <Sidebar 
            folders={folders}
            activeFolder={activeFolder}
            onFolderClick={handleFolderClick}
            onCreateFolder={createNewFolder}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          
          {/* Notes List - Hide on mobile when a note is active */}
          <div className={`${activeNote ? 'hidden md:block' : 'block'} w-full md:w-72 lg:w-80 border-r border-gray-200 dark:border-gray-700 transition-all duration-300`}>
            <NotesList 
              notes={filteredNotes}
              activeFolder={activeFolder}
              activeNote={activeNote}
              onNoteClick={handleNoteClick}
              onCreateNote={createNewNote}
              onTogglePin={toggleNotePin}
              searchQuery={searchQuery}
            />
          </div>
          
          {/* Note Editor or Empty State */}
          <div className={`${activeNote ? 'block' : 'hidden md:block'} flex-1`}>
            {activeNote ? (
              <NoteEditor 
                note={activeNote}
                onClose={() => setActiveNote(null)}
                onUpdate={updateNote}
                onDelete={deleteNote}
              />
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}