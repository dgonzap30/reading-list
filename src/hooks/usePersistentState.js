import { useEffect, useState } from 'react';

const STORAGE_KEY = 'reading-tracker-v4';

export function usePersistentState(initialValue) {
  const [state, setState] = useState(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore storage errors */
    }
  }, [state]);

  return [state, setState];
}
