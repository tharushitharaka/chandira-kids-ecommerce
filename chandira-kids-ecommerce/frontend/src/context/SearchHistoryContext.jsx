import { createContext, useContext, useState, useEffect } from 'react';

const SearchHistoryContext = createContext();

const MAX_HISTORY = 10;

export function SearchHistoryProvider({ children }) {
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('searchHistory');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(history));
  }, [history]);

  const addToHistory = (searchTerm) => {
    if (!searchTerm || searchTerm.trim() === '') return;
    
    setHistory(prev => {
      const filtered = prev.filter(item => item.toLowerCase() !== searchTerm.toLowerCase());
      const newHistory = [searchTerm, ...filtered].slice(0, MAX_HISTORY);
      return newHistory;
    });
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const removeFromHistory = (searchTerm) => {
    setHistory(prev => prev.filter(item => item !== searchTerm));
  };

  return (
    <SearchHistoryContext.Provider value={{ history, addToHistory, clearHistory, removeFromHistory }}>
      {children}
    </SearchHistoryContext.Provider>
  );
}

export function useSearchHistory() {
  const context = useContext(SearchHistoryContext);
  if (!context) {
    throw new Error('useSearchHistory must be used within SearchHistoryProvider');
  }
  return context;
}
