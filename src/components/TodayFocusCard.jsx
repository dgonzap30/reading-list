import * as Lucide from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { DOMAIN } from '../data/plan.js';
import { getDomainTheme } from '../utils/domainTheme.js';

function suggestNext(weeks, state, currentWeek) {
  const clone = [...weeks];
  const current = clone.find((week) => week.id === currentWeek);
  const pickFrom = (week) => week?.sessions.find((session) => !state.checks[session.id]);
  return (
    pickFrom(current) ||
    pickFrom(clone.find((week) => week.id > currentWeek)) ||
    pickFrom(clone.find((week) => week.id < currentWeek)) ||
    null
  );
}

export function TodayFocusCard({
  plan,
  state,
  currentWeek,
  onToggleSession,
  onStartTimer,
  onCaptureInsight,
  scrollTo,
  onLogCustom
}) {
  const next = suggestNext(plan.weeks, state, currentWeek);
  if (!next) {
    // All done!
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 px-4 lg:px-6"
      >
        <div className="rounded-xl border border-emerald-500/30 bg-black p-8 text-center shadow-lg">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
            <Lucide.Check className="h-8 w-8 text-emerald-400" />
          </div>
          <h3 className="text-2xl font-semibold text-white">All caught up!</h3>
          <p className="mt-2 text-white/60">You've completed all sessions in your plan.</p>
        </div>
      </motion.div>
    );
  }

  const Icon = DOMAIN[next.domain]?.icon || Lucide.Book;
  const theme = getDomainTheme(next.domain);
  const isChecked = state.checks[next.id];
  const todayDate = format(new Date(), 'EEEE, MMM d');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="mt-6 px-4 lg:px-6"
    >
      <div className="relative overflow-hidden rounded-xl border border-emerald-500/30 bg-black shadow-xl shadow-emerald-500/10">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/60">
            <Icon className={`h-4 w-4 ${theme.text}`} />
            <span>{next.domain}</span>
          </div>
          <span className="text-xs text-white/40">{todayDate}</span>
        </div>

        {/* Main content */}
        <div className="p-6">
          <h2 className="text-3xl font-bold text-white">{next.book}</h2>
          <p className="mt-2 text-lg text-white/70">{next.details}</p>

          {/* Action buttons */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => onToggleSession(next.id)}
              className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
                isChecked
                  ? 'border border-white/20 bg-white/5 text-white/60 hover:bg-white/10'
                  : 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/20 hover:bg-emerald-600'
              }`}
              aria-label={isChecked ? `Mark ${next.book} as incomplete` : `Mark ${next.book} as complete`}
            >
              {isChecked ? (
                <>
                  <Lucide.CheckCircle2 className="h-4 w-4" />
                  Completed
                </>
              ) : (
                <>
                  <Lucide.Circle className="h-4 w-4" />
                  Mark Complete
                </>
              )}
            </button>

            <button
              onClick={() => onStartTimer(next.id, next.book, 25)}
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              aria-label={`Start 25-minute timer for ${next.book}`}
            >
              <Lucide.Timer className="h-4 w-4" />
              Start 25min
            </button>

            <button
              onClick={() => onCaptureInsight(next)}
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              aria-label={`Capture insight for ${next.book}`}
            >
              <Lucide.Pencil className="h-4 w-4" />
              Capture Insight
            </button>

            <button
              onClick={() => scrollTo(next.id)}
              className="ml-auto inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              aria-label={`Jump to ${next.book} session`}
            >
              <Lucide.Navigation className="h-4 w-4" />
              Jump to session
            </button>
          </div>

          {/* Helpful hints */}
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/50">
            <span className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1">
              💡 Idea → Question → Application
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1">
              ✍ Log a win in notes
            </span>
          </div>

          {/* Divider */}
          <div className="mt-4 flex items-center gap-3">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-white/40">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Custom entry button */}
          <button
            onClick={onLogCustom}
            className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 bg-transparent px-5 py-2.5 text-sm text-white/60 transition hover:border-white/30 hover:text-white/80"
          >
            <Lucide.Plus className="h-4 w-4" />
            Log something else
          </button>
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-white/40">
        Next unread session suggested based on your progress
      </p>
    </motion.div>
  );
}
