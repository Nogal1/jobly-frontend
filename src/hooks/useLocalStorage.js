import { useState, useEffect } from "react";

/** useLocalStorage: Hook for syncing state with localStorage.
 *
 * This hook will synchronize the state with the localStorage key-value.
 * 
 * @param {string} key - The localStorage key to read/write
 * @param {*} initialValue - The initial value to use for this key if nothing is found in localStorage
 */
function useLocalStorage(key, initialValue = null) {
  // Read from localStorage; if no value exists, use initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      console.error("Error reading localStorage", err);
      return initialValue;
    }
  });

  // Use useEffect to update localStorage when the storedValue changes
  useEffect(() => {
    try {
      if (storedValue === null) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      }
    } catch (err) {
      console.error("Error setting localStorage", err);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
