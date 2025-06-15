
import { useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)): [T, (val: T) => void] {
  const getOrCreate = () => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) return JSON.parse(item) as T;
      return typeof initialValue === "function"
        ? (initialValue as () => T)()
        : initialValue;
    } catch (e) {
      return typeof initialValue === "function"
        ? (initialValue as () => T)()
        : initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(getOrCreate);

  const setValue = (value: T) => {
    setStoredValue(value);
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      // Fail silently
    }
  };

  return [storedValue, setValue];
}
