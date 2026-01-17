import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Toaster, toast } from 'react-hot-toast';
import * as Lucide from 'lucide-react';
import { format, startOfWeek, addWeeks, parseISO, addDays } from 'date-fns';
import clsx from 'clsx';
import { PLAN, DOMAIN, FICTION_LIBRARY } from './data/plan.js';
import { Header } from './components/Header.jsx';
import { Toolbar } from './components/Toolbar.jsx';
import { TimerFAB } from './components/TimerFAB.jsx';
import { WeekCard } from './components/WeekCard.jsx';
import { SessionRow } from './components/SessionRow.jsx';
import { SipsAndSwaps } from './components/SipsAndSwaps.jsx';
import { TodayCard } from './components/TodayCard.jsx';
import { WeekZeroCard } from './components/WeekZeroCard.jsx';
import { CommandPalette } from './components/CommandPalette.jsx';
import { Badges } from './components/Badges.jsx';
import { SessionTicker } from './components/SessionTicker.jsx';
import { FocusOverlay } from './components/FocusOverlay.jsx';
import { Heatmap } from './components/Heatmap.jsx';
import { FragmentDraftsHub } from './components/FragmentDraftsHub.jsx';
import { StateCheck } from './components/StateCheck.jsx';
import { BookLibrary } from './components/BookLibrary.jsx';
// New components for calendar view
import { DaySelector } from './components/DaySelector.jsx';
import { CollapsibleHeatmap } from './components/CollapsibleHeatmap.jsx';
import { TodayFocusCard } from './components/TodayFocusCard.jsx';
import { WeekSessionList } from './components/WeekSessionList.jsx';
import { InsightSlideOut } from './components/InsightSlideOut.jsx';
import { CustomEntryModal } from './components/CustomEntryModal.jsx';
// Dashboard layout components
import { DashboardLayout } from './components/layout/DashboardLayout.jsx';
import { Sidebar } from './components/layout/Sidebar.jsx';
import { WeekHeader } from './components/dashboard/WeekHeader.jsx';
import { WeekSchedule } from './components/dashboard/WeekSchedule.jsx';
import { NextWeekPreview } from './components/dashboard/NextWeekPreview.jsx';

import { useReadingPlan } from './hooks/useReadingPlan.js';
import { diffWeeks, todayYMD, diffDays } from './utils/date.js';
import { exportPlanToICS } from './utils/exportICS.js';
import { createFragment } from './utils/fragmentHelpers.js';

function StatCard({ icon: Icon, label, value, caption, isPrimary, progress }) {
  return (
    <div className={clsx(
      'rounded-xl border bg-black shadow-sm',
      isPrimary ? 'border-emerald-500/20 p-5' : 'border-white/10 p-4'
    )}>
      <div className="flex items-center gap-4">
        <div className={clsx(
          'rounded-xl border bg-white/[0.03] text-white/60',
          isPrimary ? 'border-white/20 p-3.5' : 'border-white/10 p-2.5'
        )}>
          <Icon className={isPrimary ? 'h-5 w-5' : 'h-4 w-4'} />
        </div>
        <div className="flex-1">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">{label}</p>
          <p className="text-2xl font-semibold text-white">{value}</p>
          <p className="text-sm text-white/50">{caption}</p>
        </div>
      </div>
      {isPrimary && progress !== undefined && (
        <div className="mt-3 w-full rounded-full bg-white/[0.03] h-1.5 overflow-hidden">
          <div className="h-full rounded-full bg-emerald-400" style={{ width: `${progress}%` }} />
        </div>
      )}
    </div>
  );
}

export default function App() {
  // Use the reading plan hook for state management
  const {
    state,
    setState,
    totalSessions,
    totalDone,
    progress,
    currentWeek,
    streak,
    badges,
    toggleSession,
    saveNote,
    saveWriting,
    markAllWeek,
    swapFiction,
  } = useReadingPlan();

  const [query, setQuery] = useState('');
  const [domain, setDomain] = useState('All');
  const [cmdOpen, setCmdOpen] = useState(false);
  const hasScrolledRef = useRef(false);
  const [sessionTicker, setSessionTicker] = useState(null);
  const [fragmentsHubOpen, setFragmentsHubOpen] = useState(false);
  const [booksModalOpen, setBooksModalOpen] = useState(false);
  const [stateCheckOpen, setStateCheckOpen] = useState(false);
  const [pendingSession, setPendingSession] = useState(null);

  // New UI states for calendar view
  const [selectedWeek, setSelectedWeek] = useState(null); // Will default to currentWeek
  const [selectedDay, setSelectedDay] = useState(null); // null = show all week
  const [heatmapExpanded, setHeatmapExpanded] = useState(false);
  const [insightSlideOpen, setInsightSlideOpen] = useState(false);
  const [activeInsightSession, setActiveInsightSession] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [customEntryOpen, setCustomEntryOpen] = useState(false);
  const [pendingCustomSession, setPendingCustomSession] = useState(null);

  const heroPct = Math.round(progress * 100);
  const daysActive = Object.keys(state.activityDates || {}).length;
  const currentWeekData = PLAN.weeks.find((week) => week.id === currentWeek);
  const weekSessions = currentWeekData?.sessions.length || 0;
  const weekDone = currentWeekData
    ? currentWeekData.sessions.filter((session) => state.checks[session.id]).length
    : 0;
  const weekPct = weekSessions ? Math.round((weekDone / weekSessions) * 100) : 0;
  const sessionsRemaining = Math.max(0, totalSessions - totalDone);
  const planDay = state.startDate ? Math.max(1, diffDays(state.startDate) + 1) : 1;
  const todayLabel = format(new Date(), 'EEEE, MMM d');

  // Compute week completion status for navigator
  const weekCompletionStatus = useMemo(() => {
    return PLAN.weeks.reduce((acc, week) => {
      const total = week.sessions.length;
      const done = week.sessions.filter(s => state.checks[s.id]).length;
      if (done === 0) {
        acc[week.id] = 'empty';
      } else if (done === total) {
        acc[week.id] = 'complete';
      } else {
        acc[week.id] = 'partial';
      }
      return acc;
    }, {});
  }, [state.checks]);

  // Calculate week start date (Monday) for selected week
  const weekStartDate = useMemo(() => {
    if (!state.startDate || selectedWeek === null) return startOfWeek(new Date(), { weekStartsOn: 1 });
    const planStart = parseISO(state.startDate);
    const mondayOfPlanStart = startOfWeek(planStart, { weekStartsOn: 1 });
    return addWeeks(mondayOfPlanStart, selectedWeek - 1);
  }, [state.startDate, selectedWeek]);

  // Get selected week data and distribute sessions across days
  const selectedWeekData = useMemo(() => {
    return PLAN.weeks.find(w => w.id === selectedWeek);
  }, [selectedWeek]);

  // Distribute sessions evenly across Mon-Fri
  const sessionsPerDay = useMemo(() => {
    if (!selectedWeekData) return {};
    const sessions = selectedWeekData.sessions;
    const distribution = {};

    // Simple distribution: spread sessions across Mon-Fri
    sessions.forEach((session, index) => {
      const dayOffset = index % 5; // 0-4 for Mon-Fri
      const date = format(addDays(weekStartDate, dayOffset), 'yyyy-MM-dd');
      distribution[date] = (distribution[date] || 0) + 1;
    });

    return distribution;
  }, [selectedWeekData, weekStartDate]);

  // Track completed sessions per day
  const completedPerDay = useMemo(() => {
    if (!selectedWeekData) return {};
    const sessions = selectedWeekData.sessions;
    const completed = {};

    sessions.forEach((session, index) => {
      if (state.checks[session.id]) {
        const dayOffset = index % 5;
        const date = format(addDays(weekStartDate, dayOffset), 'yyyy-MM-dd');
        completed[date] = (completed[date] || 0) + 1;
      }
    });

    return completed;
  }, [selectedWeekData, weekStartDate, state.checks]);

  // Changed from single number to Set of numbers for multi-expand
  const [expandedWeeks, setExpandedWeeks] = useState(() => new Set([currentWeek]));

  const bookList = useMemo(() => {
    const map = new Map();
    PLAN.weeks.forEach((week) => {
      week.sessions.forEach((session) => {
        const key = session.book.trim();
        if (!map.has(key)) {
          map.set(key, {
            title: session.book,
            domain: session.domain,
            sections: [],
            firstWeek: week.id,
          });
        }
        map.get(key).sections.push({ week: week.id, details: session.details });
      });
    });
    return Array.from(map.values()).map((entry) => ({
      ...entry,
      sections: entry.sections.sort((a, b) => a.week - b.week),
    })).sort((a, b) => {
      if (a.firstWeek === b.firstWeek) return a.title.localeCompare(b.title);
      return a.firstWeek - b.firstWeek;
    });
  }, []);
  const extraBooks = useMemo(
    () =>
      [...(PLAN.sips || []), ...(PLAN.swaps || [])].map((item) => ({
        title: item.book,
        details: item.details,
      })),
    [],
  );

  useEffect(() => {
    // Ensure current week is expanded on load if nothing else is
    setExpandedWeeks((prev) => {
      if (prev.size === 0) {
        return new Set([currentWeek]);
      }
      return prev;
    });
  }, [currentWeek]);

  // Initialize selectedWeek to currentWeek on mount
  useEffect(() => {
    if (selectedWeek === null) {
      setSelectedWeek(currentWeek);
    }
  }, [currentWeek, selectedWeek]);

  useEffect(() => {
    if (!hasScrolledRef.current) {
      hasScrolledRef.current = true;
      return;
    }
    // Only scroll if we have exactly one week expanded and it's the current one (simple heuristic)
    if (expandedWeeks.size === 1 && expandedWeeks.has(currentWeek)) {
      const frame = requestAnimationFrame(() => {
        document.getElementById(`week-${currentWeek}`)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [expandedWeeks, currentWeek]);

  useEffect(() => {
    if (!sessionTicker) return undefined;
    const interval = window.setInterval(() => {
      setSessionTicker((prev) => {
        if (!prev) return null;
        const remaining = Math.max(0, Math.round((prev.endsAt - Date.now()) / 1000));
        if (remaining === 0) {
          toast.success('Session block finished! Mark it complete?');
          return null;
        }
        return { ...prev, remaining };
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [sessionTicker?.endsAt]);


  useEffect(() => {
    const onKey = (event) => {
      if (event.key === '/' && !event.metaKey && !event.ctrlKey) {
        event.preventDefault();
        document.querySelector('#search')?.focus();
      }
      if ((event.key === 'g' || event.key === 'G') && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        document.querySelector(`#week-${currentWeek}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [currentWeek]);

  const setStartDate = (date) => setState((prev) => ({ ...prev, startDate: date }));

  const handleImport = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result));
        if (data && data.state) {
          setState((prev) => ({
            checks: { ...prev.checks, ...(data.state.checks || {}) },
            notes: { ...prev.notes, ...(data.state.notes || {}) },
            weekNotes: { ...prev.weekNotes, ...(data.state.weekNotes || {}) },
            startDate: data.state.startDate || prev.startDate || todayYMD(),
            activityDates: { ...prev.activityDates, ...(data.state.activityDates || {}) },
            _schemaVersion: 2,
            writings: { ...prev.writings, ...(data.state.writings || {}) },
            stateChecks: { ...prev.stateChecks, ...(data.state.stateChecks || {}) },
            fragments: { ...prev.fragments, ...(data.state.fragments || {}) },
            weeklySummaries: { ...prev.weeklySummaries, ...(data.state.weeklySummaries || {}) },
            writingGoals: data.state.writingGoals || prev.writingGoals,
            customSessions: { ...prev.customSessions, ...(data.state.customSessions || {}) },
          }));
          toast.success('Imported progress');
        }
      } catch (error) {
        console.error(error);
        toast.error('Import failed');
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (window.confirm('Reset all progress and notes?')) {
      setState(createInitialState());
    }
  };

  const scrollTo = (sessionId) => {
    const el =
      document.querySelector(`[data-session='${sessionId}']`) ||
      document.getElementById(`week-${currentWeek}`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const jumpToWeek = (id) => {
    setExpandedWeeks(prev => new Set([...prev, id]));
    setTimeout(() => {
      document.getElementById(`week-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };


  // Logic for flat filtering vs weekly view
  const isFlatView = domain !== 'All' || query.trim().length > 0;

  const filteredContent = useMemo(() => {
    const lowered = query.trim().toLowerCase();

    if (isFlatView) {
      // Flatten all sessions
      const allSessions = PLAN.weeks.flatMap(week => week.sessions);
      return allSessions.filter(session => {
        const domainOk = domain === 'All' || session.domain === domain;
        const queryOk = !lowered || [session.domain, session.book, session.details].join(' ').toLowerCase().includes(lowered);
        return domainOk && queryOk;
      });
    } else {
      // Return weeks (no filtering needed since we only filter in flat view or show all weeks)
      return PLAN.weeks;
    }
  }, [query, domain, isFlatView]);

  const statCards = [
    {
      label: 'Sessions logged',
      value: totalDone,
      caption: `${totalSessions} planned`,
      icon: Lucide.BookOpenCheck,
      isPrimary: true,
      progress: heroPct,
    },
    {
      label: 'Plan day',
      value: planDay,
      caption: 'Auto-tracked from your start',
      icon: Lucide.Clock3,
      isPrimary: false,
    },
    // Active days replaced by Heatmap
    {
      label: 'This week',
      value: weekSessions ? `${weekDone}/${weekSessions}` : '—',
      caption: `${weekPct}% complete`,
      icon: Lucide.CalendarCheck,
      isPrimary: true,
      progress: weekPct,
    },
    {
      label: 'Remaining',
      value: sessionsRemaining,
      caption: 'Sessions left to savor',
      icon: Lucide.Hourglass,
      isPrimary: false,
    },
  ];

  const handleExport = () => exportPlanToICS(state.startDate, PLAN.weeks);

  const onTimerComplete = () => toast('Time! Mark a session complete?', { icon: '⏱️' });

  const domains = useMemo(() => ['All', ...Object.keys(DOMAIN)], []);

  const handleStartSessionTimer = (session, seconds) => {
    const duration = seconds || 25 * 60;
    const endsAt = Date.now() + duration * 1000;
    setSessionTicker({
      sessionId: session.id,
      label: session.book,
      duration,
      remaining: duration,
      endsAt,
      minutes: Math.round(duration / 60),
    });
  };

  const toggleWeekExpansion = (id) => {
    setExpandedWeeks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };


  const updateFragment = (fragmentId, updates) => {
    setState((prev) => ({
      ...prev,
      fragments: {
        ...prev.fragments,
        [fragmentId]: { ...prev.fragments[fragmentId], ...updates },
      },
    }));
  };


  // New handlers for calendar view
  const handleCaptureInsight = (session) => {
    setActiveInsightSession(session);
    setInsightSlideOpen(true);
  };

  const handleStartTimer = (sessionId, label, minutes) => {
    const duration = minutes * 60;
    const endsAt = Date.now() + duration * 1000;
    setSessionTicker({
      sessionId,
      label,
      duration,
      remaining: duration,
      endsAt,
      minutes,
    });
  };

  const saveCustomSession = (title, captureInsight) => {
    const id = `custom-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const weekId = selectedWeek || currentWeek;
    const timestamp = new Date().toISOString();

    setState((prev) => ({
      ...prev,
      customSessions: {
        ...prev.customSessions,
        [id]: {
          id,
          title,
          weekId,
          createdAt: timestamp,
          completedAt: timestamp,
        },
      },
      activityDates: { ...(prev.activityDates || {}), [todayYMD()]: true },
    }));

    setCustomEntryOpen(false);

    if (captureInsight) {
      // Open insight slide with custom session
      setPendingCustomSession({ id, title });
      setActiveInsightSession({ id, book: title });
      setInsightSlideOpen(true);
    } else {
      confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } });
      toast.success('Entry logged!');
    }

    return id;
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent text-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:inline-flex focus:items-center focus:gap-2 focus:rounded-xl focus:bg-emerald-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-emerald-400"
      >
        Skip to main content
      </a>
      <Toaster position="bottom-right" />

      <Header
        progress={progress}
        streak={streak}
        planDay={planDay}
        todayLabel={todayLabel}
        onReset={handleReset}
        onExport={handleExport}
        onImport={handleImport}
        startDate={state.startDate}
        setStartDate={setStartDate}
        onOpenCmd={() => setCmdOpen(true)}
        books={bookList}
        extraBooks={extraBooks}
        notes={state.notes}
        weeks={PLAN.weeks}
        currentWeek={currentWeek}
        onJumpToWeek={jumpToWeek}
        fragments={state.fragments || {}}
        onOpenFragments={() => setFragmentsHubOpen(true)}
        onOpenBooks={() => setBooksModalOpen(true)}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <DashboardLayout
        sidebar={
          <Sidebar
            phases={PLAN.phases}
            weeks={PLAN.weeks}
            currentWeek={currentWeek}
            selectedWeek={selectedWeek || currentWeek}
            onSelectWeek={(weekId) => {
              setSelectedWeek(weekId);
              setSidebarOpen(false); // Close mobile sidebar on selection
            }}
            completionStatus={weekCompletionStatus}
            streak={streak}
            progress={heroPct}
            badgeCount={badges.filter(b => b.earned).length}
          />
        }
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      >
        <main id="main-content" className="pb-32 bg-transparent">
          {/* Hero Section with Progress */}
          <section className="mt-8 px-4 lg:px-6">
            <div className="overflow-hidden rounded-xl border border-white/20 bg-black p-6 shadow-sm">
              <h1 className="text-2xl font-semibold leading-tight text-white md:text-3xl mb-4">
                Craft a mind you trust — systems, EQ, craft, society, and sci‑fi in deliberate reps.
              </h1>

              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs text-white/50 mb-2">
                    <span>Overall Progress</span>
                    <span>{heroPct}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.08]">
                    <div
                      className="h-full rounded-full bg-emerald-400"
                      style={{ width: `${heroPct}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Today's Focus Card */}
          <TodayFocusCard
            plan={PLAN}
            state={state}
            currentWeek={currentWeek}
            onToggleSession={toggleSession}
            onStartTimer={handleStartTimer}
            onCaptureInsight={handleCaptureInsight}
            scrollTo={scrollTo}
            onLogCustom={() => setCustomEntryOpen(true)}
          />

          {/* Dashboard Content */}
          <div className="mt-8 px-4 lg:px-6">
            <WeekHeader
              week={selectedWeekData}
              planDay={planDay}
              isCurrentWeek={selectedWeek === currentWeek}
            />

            {/* Two-column grid for schedule and preview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <WeekSchedule
                weekData={selectedWeekData}
                weekStartDate={weekStartDate}
                state={state}
                onToggleSession={toggleSession}
                onStartTimer={handleStartTimer}
                onCaptureInsight={handleCaptureInsight}
                customSessions={state.customSessions || {}}
              />

              <NextWeekPreview
                week={PLAN.weeks.find(w => w.id === (selectedWeek || currentWeek) + 1)}
                onJumpToWeek={setSelectedWeek}
              />
            </div>

            {/* Collapsible Heatmap */}
            <div className="mt-6">
              <CollapsibleHeatmap
                activityDates={state.activityDates || {}}
                isExpanded={heatmapExpanded}
                onToggle={() => setHeatmapExpanded(!heatmapExpanded)}
              />
            </div>
          </div>

          <Badges badges={badges} />
        </main>
      </DashboardLayout>

      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden">
        <div className="mx-auto max-w-5xl">
          <div className="m-3 rounded-2xl bg-black/90 border border-white/20 backdrop-blur-xl px-3 py-2 flex items-center justify-between">
            <button
              onClick={() => document.querySelector(`#week-${currentWeek}`)?.scrollIntoView({ behavior: 'smooth' })}
              className="px-3 py-1.5 rounded-xl bg-white/[0.03] text-sm flex items-center gap-1 hover:bg-white/[0.05]"
            >
              Week
            </button>
            <button
              onClick={() => document.querySelector('#search')?.focus()}
              className="px-3 py-1.5 rounded-xl bg-white/[0.03] text-sm flex items-center gap-1 hover:bg-white/[0.05]"
            >
              Search
            </button>
            <button
              onClick={() => setCmdOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-white/[0.03] text-sm flex items-center gap-1 hover:bg-white/[0.05]"
            >
              Cmd
            </button>
          </div>
        </div>
      </div>

      <CommandPalette
        open={cmdOpen}
        setOpen={setCmdOpen}
        plan={PLAN}
        jumpToWeek={jumpToWeek}
        markAllWeek={markAllWeek}
      />

      <SessionTicker ticker={sessionTicker} onStop={() => setSessionTicker(null)} />

      <AnimatePresence>
        {sessionTicker && (
          <FocusOverlay
            sessionTicker={sessionTicker}
            onStop={() => setSessionTicker(null)}
            onSaveNote={saveNote}
            initialNote={sessionTicker.sessionId !== 'manual' ? state.notes[sessionTicker.sessionId] : ''}
          />
        )}
      </AnimatePresence>

      <FragmentDraftsHub
        isOpen={fragmentsHubOpen}
        onClose={() => setFragmentsHubOpen(false)}
        fragments={state.fragments || {}}
        writings={state.writings || {}}
        onUpdateFragment={updateFragment}
      />

      <BookLibrary
        isOpen={booksModalOpen}
        onClose={() => setBooksModalOpen(false)}
        books={bookList}
        phases={PLAN.phases}
        fictionLibrary={FICTION_LIBRARY}
      />

      <StateCheck
        isOpen={stateCheckOpen}
        onSelect={(selectedState) => {
          if (pendingSession) {
            setState((prev) => ({
              ...prev,
              stateChecks: { ...prev.stateChecks, [pendingSession.id]: selectedState },
            }));
          }
          setStateCheckOpen(false);
          setPendingSession(null);
        }}
        onSkip={() => {
          setStateCheckOpen(false);
          setPendingSession(null);
        }}
        sessionLabel={pendingSession?.book}
      />

      <InsightSlideOut
        isOpen={insightSlideOpen}
        onClose={() => {
          setInsightSlideOpen(false);
          setActiveInsightSession(null);
          setPendingCustomSession(null);
        }}
        session={activeInsightSession}
        state={state}
        onSave={saveWriting}
      />

      <CustomEntryModal
        isOpen={customEntryOpen}
        onClose={() => setCustomEntryOpen(false)}
        onSave={saveCustomSession}
      />

      <TimerFAB
        onComplete={onTimerComplete}
        activeSession={sessionTicker}
        onStartBlock={(seconds) =>
          setSessionTicker({
            sessionId: 'manual',
            label: 'Custom block',
            duration: seconds,
            remaining: seconds,
            endsAt: Date.now() + seconds * 1000,
            minutes: Math.round(seconds / 60),
          })
        }
        onClearBlock={() => setSessionTicker(null)}
      />
    </div>
  );
}
