// src/components/ThemeToggle.jsx
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 group"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-amber-300 group-hover:rotate-45 transition-transform duration-300" />
      ) : (
        <Moon className="w-5 h-5 text-indigo-600 group-hover:-rotate-12 transition-transform duration-300" />
      )}
    </button>
  );
}