import { useEffect, useState } from 'react';

const STORAGE_KEY = 'reading-tracker-v5';
const OLD_STORAGE_KEY = 'reading-tracker-v4';

/**
 * Migrate state from v4 to v5
 */
function migrateState(oldState) {
  // Already migrated
  if (oldState._schemaVersion >= 2) {
    return oldState;
  }

  // Migrate from v4 to v5
  return {
    ...oldState,
    _schemaVersion: 2,
    writings: {},        // sessionId -> WritingEntry
    stateChecks: {},     // sessionId -> state string
    fragments: {},       // fragmentId -> FragmentEntry
    weeklySummaries: {}, // weekId -> WeeklySummary
    writingGoals: null,
  };
}

export function usePersistentState(initialValue) {
  const [state, setState] = useState(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      // Try v5 first
      let raw = window.localStorage.getItem(STORAGE_KEY);

      // If not found, try v4 and migrate
      if (!raw) {
        raw = window.localStorage.getItem(OLD_STORAGE_KEY);
        if (raw) {
          const oldState = JSON.parse(raw);
          const migrated = migrateState(oldState);
          // Save migrated state immediately
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
          return migrated;
        }
      }

      return raw ? migrateState(JSON.parse(raw)) : initialValue;
    } catch (error) {
      console.warn('[usePersistentState] Failed to load state from localStorage:', error);
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.warn('[usePersistentState] Failed to save state to localStorage:', error);
    }
  }, [state]);

  return [state, setState];
}
