// src/components/Header.jsx
import { Search } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Header({ searchQuery, setSearchQuery }) {
  return (
    <header className="px-6 py-4 bg-white dark:bg-gray-800 shadow-sm flex items-center justify-between sticky top-0 z-10 transition-colors duration-300">
      <div className="flex items-center space-x-2">
        <div className="hidden sm:flex items-center">
          <span className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">NoteNest</span>
          <span className="ml-2 px-2 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 text-xs font-medium">Pro</span>
        </div>
        <span className="block sm:hidden font-bold text-xl text-indigo-600 dark:text-indigo-400">NN</span>
      </div>
      <div className="flex items-center space-x-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search notes..."
            className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-700 w-48 md:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}