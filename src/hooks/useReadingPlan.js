import { useMemo } from 'react';
import confetti from 'canvas-confetti';
import { toast } from 'react-hot-toast';
import { PLAN } from '../data/plan.js';
import { usePersistentState } from './usePersistentState.js';
import { diffWeeks, todayYMD } from '../utils/date.js';
import { computeBadges } from '../components/Badges.jsx';
import { createFragment } from '../utils/fragmentHelpers.js';

const createInitialState = () => ({
  checks: {},
  notes: {},              // Keep for backward compat
  weekNotes: {},          // Keep for backward compat
  startDate: todayYMD(),
  activityDates: {},
  _schemaVersion: 2,
  writings: {},           // NEW: structured writing
  stateChecks: {},        // NEW: pre-session state
  fragments: {},          // NEW: polished fragments
  weeklySummaries: {},    // NEW: weekly summaries
  writingGoals: null,     // NEW: cycle goals
  fictionSwaps: {},       // NEW: weekId -> 'runnerUp' | null
  customSessions: {},     // NEW: custom reading entries
});

export function useReadingPlan() {
  const [state, setState] = usePersistentState(createInitialState());

  // Computed values - session counts
  const totalSessions = useMemo(
    () => PLAN.weeks.reduce((acc, week) => acc + week.sessions.length, 0),
    [],
  );

  const totalDone = useMemo(
    () => PLAN.weeks.reduce((acc, week) => acc + week.sessions.filter((session) => state.checks[session.id]).length, 0),
    [state.checks],
  );

  const progress = totalSessions ? totalDone / totalSessions : 0;

  // Computed values - week tracking
  const currentWeek = Math.min(20, Math.max(1, diffWeeks(state.startDate) + 1));

  // Computed values - streak
  const streak = useMemo(() => {
    const dates = Object.keys(state.activityDates || {}).sort();
    if (!dates.length) return 0;
    const today = new Date();
    let count = 0;
    while (true) {
      const stamp = today.toISOString().slice(0, 10);
      if (state.activityDates[stamp]) {
        count += 1;
        today.setDate(today.getDate() - 1);
      } else {
        break;
      }
    }
    return count;
  }, [state.activityDates]);

  // Computed values - badges
  const badges = computeBadges(state);

  // Actions - session management
  const toggleSession = (id) => {
    setState((prev) => {
      const nextChecked = !prev.checks[id];
      const next = { ...prev, checks: { ...prev.checks, [id]: nextChecked } };
      if (nextChecked) {
        const stamp = todayYMD();
        next.activityDates = { ...(prev.activityDates || {}), [stamp]: true };
      }
      return next;
    });
  };

  const saveNote = (id, text) =>
    setState((prev) => ({ ...prev, notes: { ...prev.notes, [id]: text } }));

  const saveWriting = (sessionId, writing) => {
    setState((prev) => {
      const updates = { ...prev, writings: { ...prev.writings, [sessionId]: writing } };

      // If fragment exists, create fragment entry
      if (writing.fragment && writing.fragment.trim()) {
        // Check if it's a fiction session
        const isFictionSession = sessionId.includes('-fiction');

        if (isFictionSession) {
          // Handle fiction session
          const weekId = parseInt(sessionId.replace('w', '').replace('-fiction', ''));
          const week = PLAN.weeks.find(w => w.id === weekId);

          if (week && week.fiction && writing.sectionTag) {
            // Check if fiction was swapped
            const isSwapped = prev.fictionSwaps?.[weekId] === 'runnerUp';
            const bookTitle = isSwapped && week.fiction.runnerUp
              ? week.fiction.runnerUp
              : week.fiction.title;

            const fragment = createFragment(
              sessionId,
              writing.fragment,
              writing.sectionTag,
              bookTitle,
              week.id,
              'fiction',
              writing.sourceChapter,
              writing.sourcePage
            );
            updates.fragments = { ...prev.fragments, [fragment.id]: fragment };
          }
        } else {
          // Handle nonfiction session
          const session = PLAN.weeks.flatMap(w => w.sessions).find(s => s.id === sessionId);
          const week = PLAN.weeks.find(w => w.sessions.some(s => s.id === sessionId));

          if (session && week && writing.sectionTag) {
            const fragment = createFragment(
              sessionId,
              writing.fragment,
              writing.sectionTag,
              session.book,
              week.id,
              'nonfiction',
              writing.sourceChapter,
              writing.sourcePage
            );
            updates.fragments = { ...prev.fragments, [fragment.id]: fragment };
          }
        }
      }

      return updates;
    });
  };

  const markAllWeek = (id) => {
    const week = PLAN.weeks.find((w) => w.id === id);
    if (!week) return;
    setState((prev) => {
      const checks = { ...prev.checks };
      week.sessions.forEach((session) => {
        checks[session.id] = true;
      });
      return {
        ...prev,
        checks,
        activityDates: { ...(prev.activityDates || {}), [todayYMD()]: true },
      };
    });
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    toast.success(`Week ${id} completed!`);
  };

  const swapFiction = (weekId) => {
    setState((prev) => {
      const currentSwap = prev.fictionSwaps?.[weekId];
      return {
        ...prev,
        fictionSwaps: {
          ...prev.fictionSwaps,
          [weekId]: currentSwap === 'runnerUp' ? null : 'runnerUp'
        }
      };
    });
  };

  return {
    // State
    state,
    setState,
    // Computed values
    totalSessions,
    totalDone,
    progress,
    currentWeek,
    streak,
    badges,
    // Actions
    toggleSession,
    saveNote,
    saveWriting,
    markAllWeek,
    swapFiction,
  };
}
