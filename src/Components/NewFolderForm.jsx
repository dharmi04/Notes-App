// src/components/NewFolderForm.jsx
import { useState } from 'react';

export default function NewFolderForm({ onCancel, onSubmit }) {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#3B82F6');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === '') return;
    onSubmit({ name, color });
    setName('');
    setColor('#3B82F6');
  };
  
  const predefinedColors = [
    '#EF4444', // Red
    '#F59E0B', // Amber
    '#10B981', // Emerald
    '#3B82F6', // Blue
    '#8B5CF6', // Violet
    '#EC4899', // Pink
    '#6B7280', // Gray
  ];
  
  return (
    <form onSubmit={handleSubmit} className="px-3 py-3 mb-2">
      <div className="mb-3">
        <input 
          type="text"
          placeholder="Folder name"
          className="w-full p-2 text-sm rounded border border-gray-200 dark:border-gray-700 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
      </div>
      <div className="mb-3">
        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-2">Choose color</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {predefinedColors.map(presetColor => (
            <button
              key={presetColor}
              type="button"
              className={`w-6 h-6 rounded-full transition-transform ${color === presetColor ? 'ring-2 ring-offset-2 ring-gray-400 dark:ring-gray-500 scale-110' : 'hover:scale-110'}`}
              style={{ backgroundColor: presetColor }}
              onClick={() => setColor(presetColor)}
            />
          ))}
          <div className="relative">
            <input 
              type="color"
              className="w-6 h-6 cursor-pointer opacity-0 absolute inset-0"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-red-500 via-green-500 to-blue-500 flex items-center justify-center text-white text-xs">
              +
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <button 
          type="button"
          className="px-3 py-1.5 text-xs rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button 
          type="submit"
          className="px-3 py-1.5 text-xs rounded-md bg-indigo-500 text-white hover:bg-indigo-600 transition-colors duration-300"
        >
          Create
        </button>
      </div>
    </form>
  );
}