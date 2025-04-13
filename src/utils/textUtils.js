// src/utils/textUtils.js

export const truncateText = (text, length = 100) => {
    if (!text) return '';
    return text.length > length ? `${text.substring(0, length)}...` : text;
  };
  
  export const highlightMatches = (text, query) => {
    if (!query || !text) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-700 px-1 rounded">$1</mark>');
  };