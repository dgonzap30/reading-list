import { motion } from 'framer-motion';
import * as Lucide from 'lucide-react';
import confetti from 'canvas-confetti';
import clsx from 'clsx';
import { toast } from 'react-hot-toast';
import { DOMAIN } from '../data/plan.js';
import { todayYMD } from '../utils/date.js';
import { getDomainTheme } from '../utils/domainTheme.js';

export function WeekCard({ week, state, setState, isCurrent, expanded, onToggle, onStartTimer }) {
  const doneCount = week.sessions.filter((session) => state.checks[session.id]).length;
  const pct = week.sessions.length ? Math.round((doneCount / week.sessions.length) * 100) : 0;

  const toggle = (id) => {
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
              {week.sessions.map((session) => {
                const Icon = DOMAIN[session.domain]?.icon || Lucide.Book;
                const checked = Boolean(state.checks[session.id]);
                const theme = getDomainTheme(session.domain);
                return (
                  <div
                    key={session.id}
                    data-session={session.id}
                    className={clsx(
                      'flex flex-col gap-3 p-4 rounded-2xl border transition-all bg-white/5',
                      checked
                        ? 'border-emerald-500/40 shadow-[0_10px_30px_rgba(16,185,129,0.15)]'
                        : 'border-white/10 hover:border-white/25',
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <button
                        type="button"
                        onClick={() => toggle(session.id)}
                        className={clsx(
                          'h-9 w-9 shrink-0 rounded-2xl border transition flex items-center justify-center',
                          checked
                            ? 'border-emerald-400 bg-emerald-500/20 text-emerald-50'
                            : 'border-white/15 bg-white/5 text-white/70 hover:border-white/40',
                        )}
                        aria-pressed={checked}
                        aria-label={checked ? 'Unmark session' : 'Mark session complete'}
                      >
                        {checked ? (
                          <Lucide.CheckCircle2 className="h-5 w-5" />
                        ) : (
                          <Lucide.Circle className="h-5 w-5" />
                        )}
                      </button>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 text-sm flex-wrap">
                          <Icon className={clsx('w-4 h-4', theme.icon)} />
                          <span className="text-white font-semibold truncate">{session.book}</span>
                          <span className="text-white/50">•</span>
                          <span className="text-white/70 truncate">{session.details}</span>
                          <span className={clsx('ml-auto text-[11px] px-2 py-0.5 rounded-full', theme.pill)}>
                            {session.domain}
                          </span>
                        </div>
                        <textarea
                          value={state.notes[session.id] || ''}
                          onChange={(event) => saveNote(session.id, event.target.value)}
                          placeholder="Drop one idea, one question, one application…"
                          className="mt-3 w-full min-h-[64px] px-3 py-2 rounded-xl bg-black/30 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => onStartTimer?.(session, 25 * 60)}
                        className="inline-flex items-center gap-1 rounded-2xl border border-white/15 px-3 py-1 text-white/80 hover:border-white/40"
                      >
                        <Lucide.Timer className="h-3.5 w-3.5" />
                        Kick off 25
                      </button>
                      {!checked && (
                        <button
                          type="button"
                          onClick={() => toggle(session.id)}
                          className="inline-flex items-center gap-1 rounded-2xl bg-emerald-500/20 px-3 py-1 text-emerald-50 shadow-[0_8px_25px_rgba(16,185,129,0.35)] hover:bg-emerald-500/30"
                        >
                          <Lucide.Check className="h-3.5 w-3.5" />
                          Mark done
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {week.microProject && (
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <Lucide.Sparkles className="h-4 w-4 text-amber-200" />
                  <span className="font-semibold text-white">Micro‑project</span>
                </div>
                <p className="mt-2 text-sm text-white/70">{week.microProject}</p>
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
                placeholder="Retro ritual — what worked, what to tweak, what to celebrate."
                className="mt-2 w-full rounded-3xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-emerald-300/60 focus:outline-none"
              />
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
