import { createContext, useContext } from 'react';
import { useReadingPlan } from '../hooks/useReadingPlan.js';

const ReadingPlanContext = createContext(null);

/**
 * Provider component that makes reading plan state and actions available
 * to all child components without prop drilling.
 */
export function ReadingPlanProvider({ children }) {
  const plan = useReadingPlan();

  return (
    <ReadingPlanContext.Provider value={plan}>
      {children}
    </ReadingPlanContext.Provider>
  );
}

/**
 * Hook to access reading plan state and actions from any component.
 * Must be used within a ReadingPlanProvider.
 *
 * @returns {object} Reading plan state and actions
 * @throws {Error} If used outside ReadingPlanProvider
 *
 * @example
 * function MyComponent() {
 *   const { state, toggleSession, progress } = useReadingPlanContext();
 *   return <div>{progress}% complete</div>;
 * }
 */
export function useReadingPlanContext() {
  const context = useContext(ReadingPlanContext);

  if (!context) {
    throw new Error(
      'useReadingPlanContext must be used within a ReadingPlanProvider. ' +
      'Wrap your component tree with <ReadingPlanProvider>.'
    );
  }

  return context;
}
