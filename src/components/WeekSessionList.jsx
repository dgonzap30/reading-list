import { format, addDays, isSameDay } from 'date-fns';
import * as Lucide from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { DOMAIN } from '../data/plan.js';
import { getDomainTheme } from '../utils/domainTheme.js';

export function WeekSessionList({
  weekData,
  weekStartDate,
  selectedDay,
  state,
  onToggleSession,
  onStartTimer,
  onCaptureInsight
}) {
  if (!weekData) return null;

  // Group sessions by day (distribute across Mon-Fri)
  const sessionsByDay = {};
  weekData.sessions.forEach((session, index) => {
    const dayOffset = index % 5; // 0-4 for Mon-Fri
    const dayDate = addDays(weekStartDate, dayOffset);
    const dateKey = format(dayDate, 'yyyy-MM-dd');

    if (!sessionsByDay[dateKey]) {
      sessionsByDay[dateKey] = {
        date: dayDate,
        sessions: []
      };
    }
    sessionsByDay[dateKey].sessions.push(session);
  });

  // Filter by selected day if one is chosen
  const filteredDays = selectedDay
    ? Object.entries(sessionsByDay).filter(([dateKey, dayData]) =>
        isSameDay(dayData.date, selectedDay)
      )
    : Object.entries(sessionsByDay);

  if (filteredDays.length === 0) {
    return (
      <div className="rounded-xl border border-white/10 bg-black/50 p-8 text-center">
        <p className="text-white/40">No sessions for this day</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredDays.map(([dateKey, dayData]) => (
        <div key={dateKey}>
          {!selectedDay && (
            <h4 className="mb-2 text-xs uppercase tracking-wider text-white/40">
              {format(dayData.date, 'EEEE, MMM d')}
            </h4>
          )}

          <div className="space-y-2">
            {dayData.sessions.map((session) => {
              const Icon = DOMAIN[session.domain]?.icon || Lucide.Book;
              const theme = getDomainTheme(session.domain);
              const isChecked = state.checks[session.id];
              const hasWriting = state.writings[session.id];

              return (
                <motion.div
                  key={session.id}
                  layout
                  className={clsx(
                    'group flex items-center gap-3 rounded-xl border p-4 transition-all',
                    isChecked
                      ? 'border-emerald-500/30 bg-emerald-500/5'
                      : 'border-white/10 bg-black/50 hover:border-white/20 hover:bg-white/[0.02]'
                  )}
                >
                  {/* Checkbox */}
                  <button
                    onClick={() => onToggleSession(session.id)}
                    className={clsx(
                      'h-8 w-8 shrink-0 rounded-lg border transition flex items-center justify-center',
                      isChecked
                        ? 'border-emerald-400 bg-emerald-500/15 text-emerald-400'
                        : 'border-white/20 bg-black text-white/60 hover:border-white/30'
                    )}
                  >
                    {isChecked ? (
                      <Lucide.CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <Lucide.Circle className="h-4 w-4" />
                    )}
                  </button>

                  {/* Session info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Icon className={`h-3.5 w-3.5 ${theme.text}`} />
                      <span className="truncate font-medium text-white">
                        {session.book}
                      </span>
                    </div>
                    <p className="text-sm text-white/60 truncate">{session.details}</p>
                    {hasWriting && (
                      <div className="mt-1 flex items-center gap-1 text-xs text-emerald-400">
                        <Lucide.FileText className="h-3 w-3" />
                        <span>Has notes</span>
                      </div>
                    )}
                  </div>

                  {/* Quick actions */}
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onStartTimer(session.id, session.book, 25)}
                      className="rounded-lg border border-white/20 bg-white/5 p-2 text-white/60 hover:bg-white/10 hover:text-white transition"
                      title="Start 25min timer"
                    >
                      <Lucide.Timer className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onCaptureInsight(session)}
                      className="rounded-lg border border-white/20 bg-white/5 p-2 text-white/60 hover:bg-white/10 hover:text-white transition"
                      title="Capture insight"
                    >
                      <Lucide.Pencil className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Fiction companion */}
      {weekData.fiction && (
        <div className="mt-6 rounded-xl border border-white/10 bg-black/50 p-4">
          <div className="flex items-start gap-3">
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-2">
              <Lucide.Orbit className="h-4 w-4 text-violet-400" />
            </div>
            <div className="flex-1">
              <p className="text-xs uppercase tracking-wider text-white/40">Fiction Companion</p>
              <p className="mt-1 font-medium text-white">
                {weekData.fiction.title}{' '}
                <span className="text-sm text-white/50">— {weekData.fiction.author}</span>
              </p>
              <p className="mt-1 text-sm text-white/60">{weekData.fiction.match}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
