import { motion } from 'framer-motion';
import * as Lucide from 'lucide-react';
import confetti from 'canvas-confetti';
import clsx from 'clsx';
import { toast } from 'react-hot-toast';
import { DOMAIN } from '../data/plan.js';
import { todayYMD } from '../utils/date.js';
import { getDomainTheme } from '../utils/domainTheme.js';
import { getWeeklyFragments } from '../utils/fragmentHelpers.js';

import { useState } from 'react';
import { SessionRow } from './SessionRow.jsx';
import { FictionSessionRow } from './FictionSessionRow.jsx';
import { Modal } from './Modal.jsx';
import { WeeklySummary } from './WeeklySummary.jsx';

export function WeekCard({ week, state, setState, isCurrent, expanded, onToggle, onStartTimer, onToggleSession, onSaveNote, onSaveWriting, onSwapFiction }) {
  const [isWeekNoteModalOpen, setIsWeekNoteModalOpen] = useState(false);
  const [isWeeklySummaryOpen, setIsWeeklySummaryOpen] = useState(false);
  const [showContext, setShowContext] = useState(false);

  // Count both nonfiction and fiction sessions
  const fictionSessionId = `w${week.id}-fiction`;
  const nonfictionDone = week.sessions.filter((session) => state.checks[session.id]).length;
  const fictionDone = state.checks[fictionSessionId] ? 1 : 0;
  const doneCount = nonfictionDone + fictionDone;
  const totalSessions = week.sessions.length + 1; // +1 for fiction
  const pct = totalSessions ? Math.round((doneCount / totalSessions) * 100) : 0;
  const weeklyFragments = getWeeklyFragments(state.fragments || {}, week.id);
  const fragmentCount = weeklyFragments.length;



  const markWeek = (value) => {
    setState((prev) => {
      const checks = { ...prev.checks };
      week.sessions.forEach((session) => {
        checks[session.id] = value;
      });
      // Also mark fiction session
      checks[fictionSessionId] = value;
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
      role="region"
      aria-label={`Week ${week.id}: ${week.title}`}
      className={clsx(
        'relative overflow-hidden rounded-xl border border-white/20 bg-black p-5 shadow-sm transition-all',
        isCurrent ? 'ring-1 ring-emerald-400/40' : 'hover:border-white/30',
      )}
    >
      <div className="relative space-y-5">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={expanded}
          className="flex w-full items-center justify-between rounded-xl border border-white/20 bg-black px-4 py-3 text-left text-white transition hover:border-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 group"
        >
          <div>
            <p className="text-lg font-semibold text-white">
              <span className="text-white/50 font-normal">W{week.id}</span> {week.title}
            </p>
            {expanded && week.metaIntent && <p className="mt-1 text-sm text-white/50">{week.metaIntent}</p>}
          </div>
          <Lucide.ChevronDown
            className={clsx(
              'h-5 w-5 text-white/60 transition duration-300',
              expanded ? 'rotate-180 text-white/80' : 'opacity-70 group-hover:opacity-100',
            )}
          />
        </button>

        {week.primer && (
          <p className="text-sm text-white/50 mt-2 line-clamp-1">
            {week.primer}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <div className="w-32 rounded-full bg-white/[0.03] h-2 overflow-hidden">
            <motion.div layout className="h-full rounded-full bg-emerald-400" style={{ width: `${pct}%` }} />
          </div>
          <span className="text-xs font-semibold text-white/70 tabular-nums">{pct}%</span>
          {fragmentCount > 0 && (
            <span className="inline-flex items-center gap-1 text-xs text-white/50">
              <Lucide.FileText className="h-3 w-3" />
              {fragmentCount} {fragmentCount === 1 ? 'fragment' : 'fragments'}
            </span>
          )}
          <button
            onClick={() => markWeek(true)}
            className="inline-flex items-center gap-1 rounded-xl bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-white transition hover:bg-emerald-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
            aria-label={`Mark all sessions complete for Week ${week.id}`}
          >
            <Lucide.CheckSquare className="h-3.5 w-3.5" />
            Mark all
          </button>
          <button
            onClick={() => {
              if (window.confirm('Clear all sessions for this week? This action cannot be undone.')) {
                markWeek(false);
              }
            }}
            className="inline-flex items-center gap-1 rounded-xl border border-white/15 px-3 py-1 text-xs text-white/70 hover:border-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
            aria-label={`Clear all sessions for Week ${week.id}`}
          >
            <Lucide.Eraser className="h-3.5 w-3.5" />
            Clear
          </button>
          {(doneCount === week.sessions.length || fragmentCount > 0) && (
            <button
              onClick={() => setIsWeeklySummaryOpen(true)}
              className="inline-flex items-center gap-1 rounded-xl bg-black px-3 py-1 text-xs font-semibold text-white/80 hover:bg-white/[0.03] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
              aria-label={`View summary for Week ${week.id}`}
            >
              <Lucide.FileText className="h-3.5 w-3.5" />
              Summary
            </button>
          )}
        </div>

        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-5"
          >
            {(week.anchor || week.primer || week.smallWin || week.fiction) && (
              <button
                onClick={() => setShowContext(!showContext)}
                className="flex items-center gap-2 text-xs text-white/50 hover:text-white/80 transition"
                aria-label={showContext ? `Hide week ${week.id} context` : `Show week ${week.id} context`}
                aria-expanded={showContext}
              >
                <Lucide.Info className="h-3.5 w-3.5" />
                <span>{showContext ? 'Hide' : 'Show'} week context</span>
                <Lucide.ChevronDown className={clsx('h-3.5 w-3.5 transition', showContext && 'rotate-180')} />
              </button>
            )}

            {showContext && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3"
              >
                {week.anchor && (
                  <div className="rounded-xl border border-white/20 bg-black px-4 py-3 text-sm text-white/80">
                    <div className="flex items-center gap-2">
                      <Lucide.Lightbulb className="h-4 w-4 text-white/50" />
                      <span className="font-semibold">Anchor</span>
                    </div>
                    <p className="mt-1 text-white/70">{week.anchor}</p>
                  </div>
                )}
                {week.primer && (
                  <div className="rounded-xl border border-white/20 bg-black px-4 py-3 text-sm text-white/80">
                    <div className="flex items-center gap-2">
                      <Lucide.BookOpen className="h-4 w-4 text-white/50" />
                      <span className="font-semibold text-white">Primer</span>
                    </div>
                    <p className="mt-1 text-white/70">{week.primer}</p>
                  </div>
                )}
                {week.smallWin && (
                  <div className="rounded-xl border border-white/20 bg-black p-4">
                    <div className="flex items-center gap-2 text-sm text-white/80">
                      <Lucide.Trophy className="h-4 w-4 text-white/50" />
                      <span className="font-semibold text-white">Small Win</span>
                    </div>
                    <p className="mt-2 text-sm text-white/70">{week.smallWin}</p>
                  </div>
                )}
                {week.fiction && (
                  <div className="rounded-xl border border-white/20 bg-black p-4">
                    <div className="flex items-center gap-2 text-sm text-white/60">
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
              </motion.div>
            )}

            <div className="space-y-3">
              {week.sessions.map((session) => (
                <SessionRow
                  key={session.id}
                  session={session}
                  checked={Boolean(state.checks[session.id])}
                  note={state.notes[session.id]}
                  writing={state.writings?.[session.id]}
                  onToggle={onToggleSession}
                  onSaveNote={onSaveNote}
                  onSaveWriting={onSaveWriting}
                  onStartTimer={onStartTimer}
                />
              ))}

              {/* Fiction Companion Session */}
              {week.fiction && (
                <FictionSessionRow
                  fiction={week.fiction}
                  weekId={week.id}
                  checked={Boolean(state.checks[fictionSessionId])}
                  writing={state.writings?.[fictionSessionId]}
                  onToggle={onToggleSession}
                  onSaveWriting={onSaveWriting}
                  swapState={state.fictionSwaps?.[week.id]}
                  onSwap={onSwapFiction}
                />
              )}
            </div>

            <div>
              <label className="text-xs uppercase tracking-[0.3em] text-white/50">Week note</label>
              <div
                onClick={() => setIsWeekNoteModalOpen(true)}
                className="mt-2 w-full min-h-[80px] rounded-xl border border-white/20 bg-black/30 px-4 py-3 text-sm text-white cursor-text hover:border-white/20 transition group"
              >
                {state.weekNotes[week.id] ? (
                  <p className="whitespace-pre-wrap">{state.weekNotes[week.id]}</p>
                ) : (
                  <p className="text-white/40">What shifted in me this week?</p>
                )}
              </div>

              <Modal
                isOpen={isWeekNoteModalOpen}
                onClose={() => setIsWeekNoteModalOpen(false)}
                title={`Week ${week.id} Reflection`}
              >
                <div className="space-y-4">
                  <textarea
                    autoFocus
                    value={state.weekNotes[week.id] || ''}
                    onChange={(event) =>
                      setState((prev) => ({
                        ...prev,
                        weekNotes: { ...prev.weekNotes, [week.id]: event.target.value },
                      }))
                    }
                    placeholder="What shifted in me this week?"
                    className="w-full h-[60vh] p-4 rounded-xl bg-black/30 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none text-base leading-relaxed"
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={() => setIsWeekNoteModalOpen(false)}
                      className="px-6 py-2 rounded-xl bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition"
                    >
                      Done
                    </button>
                  </div>
                </div>
              </Modal>
            </div>

            <WeeklySummary
              isOpen={isWeeklySummaryOpen}
              onClose={() => setIsWeeklySummaryOpen(false)}
              weekId={week.id}
              fragments={weeklyFragments}
              existingSummary={state.weeklySummaries?.[week.id]}
              onSave={(weekId, summary) => {
                setState((prev) => ({
                  ...prev,
                  weeklySummaries: {
                    ...prev.weeklySummaries,
                    [weekId]: summary
                  }
                }));
              }}
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
