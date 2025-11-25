import { useEffect, useMemo, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { Toaster, toast } from 'react-hot-toast';
import * as Lucide from 'lucide-react';
import { format } from 'date-fns';
import { PLAN, DOMAIN } from './data/plan.js';
import { Header } from './components/Header.jsx';
import { Toolbar } from './components/Toolbar.jsx';
import { Timer } from './components/Timer.jsx';
import { WeekCard } from './components/WeekCard.jsx';
import { SipsAndSwaps } from './components/SipsAndSwaps.jsx';
import { TodayCard } from './components/TodayCard.jsx';
import { CommandPalette } from './components/CommandPalette.jsx';
import { Badges, computeBadges } from './components/Badges.jsx';
import { SessionTicker } from './components/SessionTicker.jsx';
import { PhaseOverview } from './components/PhaseOverview.jsx';
import { usePersistentState } from './hooks/usePersistentState.js';
import { diffWeeks, todayYMD, diffDays } from './utils/date.js';
import { exportPlanToICS } from './utils/exportICS.js';

const createInitialState = () => ({
  checks: {},
  notes: {},
  weekNotes: {},
  startDate: todayYMD(),
  activityDates: {},
});

function StatCard({ icon: Icon, label, value, caption }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[0_15px_40px_rgba(2,6,23,0.45)]">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/10 p-3 text-emerald-200">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">{label}</p>
          <p className="text-xl font-semibold text-white">{value}</p>
          <p className="text-sm text-white/60">{caption}</p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [query, setQuery] = useState('');
  const [domain, setDomain] = useState('All');
  const [state, setState] = usePersistentState(createInitialState());
  const [cmdOpen, setCmdOpen] = useState(false);
  const timerRef = useRef(null);
  const hasScrolledRef = useRef(false);
  const [sessionTicker, setSessionTicker] = useState(null);

  const totalSessions = useMemo(
    () => PLAN.weeks.reduce((acc, week) => acc + week.sessions.length, 0),
    [],
  );
  const totalDone = useMemo(
    () => PLAN.weeks.reduce((acc, week) => acc + week.sessions.filter((session) => state.checks[session.id]).length, 0),
    [state.checks],
  );
  const progress = totalSessions ? totalDone / totalSessions : 0;
  const currentWeek = Math.min(12, Math.max(1, diffWeeks(state.startDate) + 1));
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
  const [expandedWeek, setExpandedWeek] = useState(() => currentWeek);
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
    setExpandedWeek((prev) => {
      if (!prev || prev < 1 || prev > PLAN.weeks.length) {
        return currentWeek;
      }
      return prev;
    });
  }, [currentWeek]);

  useEffect(() => {
    if (!hasScrolledRef.current) {
      hasScrolledRef.current = true;
      return;
    }
    if (!expandedWeek) return;
    const frame = requestAnimationFrame(() => {
      document.getElementById(`week-${expandedWeek}`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [expandedWeek]);

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

  const jumpToWeek = (id) => document.getElementById(`week-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

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

  const filteredWeeks = useMemo(() => {
    const lowered = query.trim().toLowerCase();
    return PLAN.weeks.map((week) => ({
      ...week,
      sessions: week.sessions.filter((session) => {
        const domainOk = domain === 'All' || session.domain === domain;
        const queryOk =
          !lowered ||
          [session.domain, session.book, session.details].join(' ').toLowerCase().includes(lowered);
        return domainOk && queryOk;
      }),
    }));
  }, [query, domain]);

  const badges = computeBadges(state);
  const statCards = [
    {
      label: 'Sessions logged',
      value: totalDone,
      caption: `${totalSessions} planned`,
      icon: Lucide.BookOpenCheck,
    },
    {
      label: 'Plan day',
      value: planDay,
      caption: 'Auto-tracked from your start',
      icon: Lucide.Clock3,
    },
    {
      label: 'Active days',
      value: daysActive,
      caption: 'Touch the plan daily',
      icon: Lucide.SunMedium,
    },
    {
      label: 'This week',
      value: weekSessions ? `${weekDone}/${weekSessions}` : '—',
      caption: `${weekPct}% complete`,
      icon: Lucide.CalendarCheck,
    },
    {
      label: 'Remaining',
      value: sessionsRemaining,
      caption: 'Sessions left to savor',
      icon: Lucide.Hourglass,
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

  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent text-white">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-50"
        aria-hidden
      >
        <div className="absolute -left-32 top-10 h-64 w-64 rounded-full bg-emerald-500/30 blur-[160px]" />
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-sky-500/20 blur-[180px]" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-indigo-500/30 blur-[200px]" />
      </div>
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
      />

      <main className="pb-32">
        <section className="mx-auto mt-8 w-full max-w-6xl px-4 md:px-6">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-white/20 to-white/[0.05] p-6 shadow-[0_30px_80px_rgba(2,6,23,0.65)]">
              <div className="pointer-events-none absolute inset-0 opacity-70">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.35),_transparent_60%)] blur-3xl" />
              </div>
              <div className="relative space-y-4">
                <p className="text-xs uppercase tracking-[0.35em] text-white/60">12‑week mixed reading sprint</p>
                <h1 className="text-3xl font-semibold leading-tight text-white md:text-4xl">
                  Craft a mind you trust — systems, EQ, craft, society, and sci‑fi in deliberate reps.
                </h1>
                <p className="text-sm text-white/75">
                  Four ~45–60 minute sessions per week, plus a Sunday retro + micro‑project. Note template:
                  <span className="ml-1 font-semibold text-white">idea → question → application</span>.
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-white/70">
                  <span className="rounded-full border border-white/15 px-3 py-1">Focus blocks + streak tracking</span>
                  <span className="rounded-full border border-white/15 px-3 py-1">Command palette (⌘/Ctrl+K)</span>
                  <span className="rounded-full border border-white/15 px-3 py-1">Export to calendar</span>
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs text-white/60">
                    <span>Progress</span>
                    <span>{heroPct}%</span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400"
                      style={{ width: `${heroPct}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div ref={timerRef}>
              <Timer
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
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {statCards.map((card) => (
              <StatCard key={card.label} {...card} />
            ))}
          </div>
        </section>

        <PhaseOverview phases={PLAN.phases} currentWeek={currentWeek} />

        <Toolbar
          query={query}
          setQuery={setQuery}
          domain={domain}
          setDomain={setDomain}
          currentWeek={currentWeek}
          domains={domains}
        />

        <TodayCard plan={PLAN} state={state} currentWeek={currentWeek} scrollTo={scrollTo} />

        <div className="mx-auto mt-8 grid w-full max-w-6xl gap-5 px-4 md:px-6">
          {filteredWeeks.map((week) => (
            <div key={week.id} id={`week-${week.id}`} className="scroll-mt-28 md:scroll-mt-32">
              <WeekCard
                week={week}
                state={state}
                setState={setState}
                isCurrent={week.id === currentWeek}
                expanded={expandedWeek === week.id}
                onToggle={() => setExpandedWeek(week.id)}
                onStartTimer={handleStartSessionTimer}
              />
            </div>
          ))}
        </div>

        <Badges badges={badges} />

        <SipsAndSwaps plan={PLAN} />
      </main>

      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden">
        <div className="mx-auto max-w-5xl">
          <div className="m-3 rounded-2xl bg-neutral-900/90 border border-neutral-800 backdrop-blur px-3 py-2 flex items-center justify-between">
            <button
              onClick={() => document.querySelector(`#week-${currentWeek}`)?.scrollIntoView({ behavior: 'smooth' })}
              className="px-3 py-1.5 rounded-xl bg-neutral-800 text-sm flex items-center gap-1"
            >
              Week
            </button>
            <button
              onClick={() => document.querySelector('#search')?.focus()}
              className="px-3 py-1.5 rounded-xl bg-neutral-800 text-sm flex items-center gap-1"
            >
              Search
            </button>
            <button
              onClick={() => setCmdOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-neutral-800 text-sm flex items-center gap-1"
            >
              Cmd
            </button>
            <button
              onClick={() => {
                if (timerRef.current) {
                  timerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                  toast('Focus coach is near the top of the page.', { icon: '⏱️' });
                }
              }}
              className="px-3 py-1.5 rounded-xl bg-neutral-800 text-sm flex items-center gap-1"
            >
              Timer
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
    </div>
  );
}
