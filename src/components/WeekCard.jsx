import { motion } from 'framer-motion';
import * as Lucide from 'lucide-react';
import confetti from 'canvas-confetti';
import clsx from 'clsx';
import { toast } from 'react-hot-toast';
import { DOMAIN } from '../data/plan.js';
import { todayYMD } from '../utils/date.js';
import { getDomainTheme } from '../utils/domainTheme.js';

import { SessionRow } from './SessionRow.jsx';

export function WeekCard({ week, state, setState, isCurrent, expanded, onToggle, onStartTimer, onToggleSession, onSaveNote }) {
  const doneCount = week.sessions.filter((session) => state.checks[session.id]).length;
  const pct = week.sessions.length ? Math.round((doneCount / week.sessions.length) * 100) : 0;



  const markWeek = (value) => {
    setState((prev) => {
      const checks = { ...prev.checks };
      week.sessions.forEach((session) => {
        checks[session.id] = value;
      });
      const next = { ...prev, checks };
      if (value) {
        next.activityDates = { ...(prev.activityDates || {}), [todayYMD()]: true };
      }
      return next;
    });

    if (value) {
      confetti({ particleCount: 90, spread: 65, origin: { y: 0.6 } });
      toast.success(`Week ${week.id} marked complete!`);
    }
  };

  return (
    <motion.div
      layout
      className={clsx(
        'relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_25px_55px_rgba(2,6,23,0.65)] transition-all',
        isCurrent ? 'ring-2 ring-emerald-400/60' : 'hover:border-white/30',
      )}
    >
      <div
        className={clsx(
          'pointer-events-none absolute inset-0 opacity-70 blur-3xl transition',
          isCurrent ? 'bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.35),_transparent_60%)]' : '',
        )}
      />
      <div className="relative space-y-5">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={expanded}
          className="flex w-full items-center justify-between rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-left text-white transition hover:border-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Week {week.id}</p>
            <p className="text-lg font-semibold text-white">{week.title}</p>
            {week.metaIntent && <p className="text-sm text-white/50">{week.metaIntent}</p>}
          </div>
          <Lucide.ChevronDown
            className={clsx(
              'h-5 w-5 text-white/60 transition',
              expanded ? 'rotate-180 text-emerald-200' : 'opacity-70',
            )}
          />
        </button>
        {week.anchor && (
          <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-50">
            <div className="flex items-center gap-2">
              <Lucide.Lightbulb className="h-4 w-4 text-emerald-200" />
              <span className="font-semibold">Anchor</span>
            </div>
            <p className="mt-1 text-emerald-50/90">{week.anchor}</p>
          </div>
        )}
        {week.primer && (
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <Lucide.BookOpen className="h-4 w-4 text-white/60" />
              <span className="font-semibold text-white">Primer</span>
            </div>
            <p className="mt-1 text-white/70">{week.primer}</p>
          </div>
        )}
        <div className="flex flex-wrap items-center gap-3">
          <div className="w-32 rounded-full bg-white/10 h-2 overflow-hidden">
            <motion.div layout className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" style={{ width: `${pct}%` }} />
          </div>
          <span className="text-xs font-semibold text-white/70 tabular-nums">{pct}%</span>
          <button
            onClick={() => markWeek(true)}
            className="inline-flex items-center gap-1 rounded-2xl bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-50 shadow-[0_10px_30px_rgba(16,185,129,0.35)] transition hover:bg-emerald-500/30"
          >
            <Lucide.CheckSquare className="h-3.5 w-3.5" />
            Mark all
          </button>
          <button
            onClick={() => markWeek(false)}
            className="inline-flex items-center gap-1 rounded-2xl border border-white/15 px-3 py-1 text-xs text-white/70 hover:border-white/40"
          >
            <Lucide.Eraser className="h-3.5 w-3.5" />
            Clear
          </button>
        </div>

        {expanded && (
          <>
            <div className="space-y-3">
              {week.sessions.map((session) => (
                <SessionRow
                  key={session.id}
                  session={session}
                  checked={Boolean(state.checks[session.id])}
                  note={state.notes[session.id]}
                  onToggle={onToggleSession}
                  onSaveNote={onSaveNote}
                  onStartTimer={onStartTimer}
                />
              ))}
            </div>

            {week.smallWin && (
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <Lucide.Trophy className="h-4 w-4 text-amber-200" />
                  <span className="font-semibold text-white">Small Win</span>
                </div>
                <p className="mt-2 text-sm text-white/70">{week.smallWin}</p>
              </div>
            )}

            {week.fiction && (
              <div className="rounded-3xl border border-violet-500/20 bg-violet-500/5 p-4">
                <div className="flex items-center gap-2 text-sm text-violet-200">
                  <Lucide.Sparkles className="h-4 w-4" />
                  <span className="font-semibold">Fiction Companion</span>
                </div>
                <div className="mt-3 space-y-2">
                  <div>
                    <p className="font-medium text-white">{week.fiction.title}</p>
                    <p className="text-xs text-white/50">by {week.fiction.author}</p>
                  </div>
                  <p className="text-sm text-white/70">{week.fiction.match}</p>
                  {week.fiction.runnerUp && (
                    <div className="mt-2 flex items-center gap-2 text-xs text-white/40">
                      <span>Runner-up:</span>
                      <span className="text-white/60">{week.fiction.runnerUp}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div>
              <label className="text-xs uppercase tracking-[0.3em] text-white/50">Week note</label>
              <textarea
                value={state.weekNotes[week.id] || ''}
                onChange={(event) =>
                  setState((prev) => ({
                    ...prev,
                    weekNotes: { ...prev.weekNotes, [week.id]: event.target.value },
                  }))
                }
                placeholder="What shifted in me this week?"
                className="mt-2 w-full rounded-3xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-emerald-300/60 focus:outline-none"
              />
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
