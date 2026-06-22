import { createContext, useContext, useMemo, useState } from 'react';

const CompareContext = createContext(null);
const MAX_COMPARE = 4;

export function CompareProvider({ children }) {
  const [items, setItems] = useState([]);

  const addToCompare = (product) => {
    if (items.find((p) => p._id === product._id)) return false;
    if (items.length >= MAX_COMPARE) return false;
    setItems((current) => [...current, product]);
    return true;
  };

  const removeFromCompare = (id) => setItems((current) => current.filter((p) => p._id !== id));
  const clearCompare = () => setItems([]);

  const value = useMemo(
    () => ({ items, addToCompare, removeFromCompare, clearCompare, count: items.length, max: MAX_COMPARE }),
    [items]
  );

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}

export const useCompare = () => useContext(CompareContext);
