import { useEffect } from 'react';

/**
 * Hook to handle clicks outside a referenced element
 * @param {React.RefObject} ref - React ref to the element
 * @param {Function} callback - Function to call when clicking outside
 * @param {boolean} enabled - Whether the hook is enabled (default: true)
 */
export function useClickOutside(ref, callback, enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [ref, callback, enabled]);
}
