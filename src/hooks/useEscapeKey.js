import { useEffect } from 'react';

/**
 * Hook to handle Escape key press
 * @param {Function} callback - Function to call when Escape is pressed
 * @param {boolean} enabled - Whether the hook is enabled (default: true)
 */
export function useEscapeKey(callback, enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const handler = (e) => {
      if (e.key === 'Escape') {
        callback();
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [callback, enabled]);
}
