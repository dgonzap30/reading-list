import { format, addDays } from 'date-fns';
import clsx from 'clsx';
import * as Lucide from 'lucide-react';
import { DOMAIN } from '../../data/plan.js';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

export function WeekSchedule({
  weekData,
  weekStartDate,
  state,
  onToggleSession,
  onStartTimer,
  onCaptureInsight,
  customSessions = {}
}) {
  if (!weekData) return null;

  const today = format(new Date(), 'yyyy-MM-dd');

  // Distribute sessions across Mon-Fri
  const sessionsByDay = weekData.sessions.reduce((acc, session, index) => {
    const dayOffset = index % 5; // 0-4 for Mon-Fri
    if (!acc[dayOffset]) acc[dayOffset] = [];
    acc[dayOffset].push({ ...session, isCustom: false });
    return acc;
  }, {});

  // Add custom sessions for this week
  const customSessionsForWeek = Object.values(customSessions).filter(
    (cs) => cs.weekId === weekData.id
  );

  customSessionsForWeek.forEach((customSession) => {
    // Parse the date from completedAt to determine which day it belongs to
    const sessionDate = format(new Date(customSession.completedAt), 'yyyy-MM-dd');
    // Find which day of the week this falls on
    for (let dayOffset = 0; dayOffset < 5; dayOffset++) {
      const dayDate = format(addDays(weekStartDate, dayOffset), 'yyyy-MM-dd');
      if (sessionDate === dayDate) {
        if (!sessionsByDay[dayOffset]) sessionsByDay[dayOffset] = [];
        sessionsByDay[dayOffset].push({
          id: customSession.id,
          book: customSession.title,
          details: 'Custom entry',
          domain: 'Custom',
          isCustom: true,
        });
        break;
      }
    }
  });

  return (
    <div className="rounded-xl border border-white/20 bg-black p-6">
      <h3 className="text-lg font-semibold text-white mb-4">This Week's Schedule</h3>

      <div className="space-y-3">
        {WEEKDAYS.map((dayName, dayIndex) => {
          const date = format(addDays(weekStartDate, dayIndex), 'yyyy-MM-dd');
          const isToday = date === today;
          const sessions = sessionsByDay[dayIndex] || [];
          const allCompleted = sessions.length > 0 && sessions.every(s => state.checks[s.id]);
          const hasSession = sessions.length > 0;

          return (
            <div
              key={dayName}
              className={clsx(
                'rounded-lg border p-3 transition-all',
                isToday
                  ? 'border-emerald-500/30 bg-emerald-500/5'
                  : 'border-white/10 bg-white/[0.02]'
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={clsx(
                    'text-sm font-semibold',
                    isToday ? 'text-emerald-200' : 'text-white/70'
                  )}>
                    {dayName}
                  </span>
                  {isToday && (
                    <span className="text-xs text-emerald-400">→ Today</span>
                  )}
                  {allCompleted && (
                    <Lucide.CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  )}
                </div>
                <span className="text-xs text-white/40">
                  {format(addDays(weekStartDate, dayIndex), 'MMM d')}
                </span>
              </div>

              {hasSession ? (
                <div className="space-y-2">
                  {sessions.map((session) => {
                    const Icon = session.isCustom
                      ? Lucide.BookMarked
                      : (DOMAIN[session.domain]?.icon || Lucide.Book);
                    const isChecked = session.isCustom ? true : state.checks[session.id];

                    return (
                      <div
                        key={session.id}
                        className={clsx(
                          'flex items-start gap-2 text-sm',
                          session.isCustom && 'border-l-2 border-dashed border-white/20 pl-2'
                        )}
                      >
                        <button
                          onClick={() => !session.isCustom && onToggleSession(session.id)}
                          className={clsx(
                            'flex-shrink-0 mt-0.5',
                            isChecked ? 'text-emerald-400' : 'text-white/30',
                            session.isCustom && 'cursor-default'
                          )}
                        >
                          {isChecked ? (
                            <Lucide.CheckCircle2 className="h-4 w-4" />
                          ) : (
                            <Lucide.Circle className="h-4 w-4" />
                          )}
                        </button>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <div className={clsx(
                              'font-medium truncate',
                              isChecked ? 'text-white/50 line-through' : 'text-white/90'
                            )}>
                              {session.book}
                            </div>
                            {session.isCustom && (
                              <span className="text-[10px] uppercase tracking-wider text-white/40 bg-white/5 px-1.5 py-0.5 rounded">
                                Custom
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-white/40 truncate">
                            {session.details}
                          </div>
                        </div>

                        <Icon className="h-4 w-4 text-white/30 flex-shrink-0" />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-white/30">No sessions scheduled</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
