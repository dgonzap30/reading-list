import { motion } from 'framer-motion';
import { format, isSameDay, startOfWeek, addDays } from 'date-fns';
import clsx from 'clsx';

export function DaySelector({
  weekStartDate,
  selectedDay,
  onSelectDay,
  sessionsPerDay = {},
  completedPerDay = {}
}) {
  // Generate Mon-Sun for the week
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(weekStartDate, i);
    return {
      date,
      label: format(date, 'EEE'), // Mon, Tue, etc
      shortLabel: format(date, 'EEEEE'), // M, T, W, etc
      dayNum: format(date, 'd'),
      isToday: isSameDay(date, new Date()),
      isSelected: selectedDay ? isSameDay(date, selectedDay) : false,
      sessionCount: sessionsPerDay[format(date, 'yyyy-MM-dd')] || 0,
      completedCount: completedPerDay[format(date, 'yyyy-MM-dd')] || 0
    };
  });

  return (
    <div className="flex items-center gap-2 justify-center py-3">
      {days.map((day, index) => {
        const isComplete = day.sessionCount > 0 && day.completedCount === day.sessionCount;

        return (
          <button
            key={index}
            onClick={() => onSelectDay(day.date)}
            className={clsx(
              'relative flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all min-w-[3rem]',
              day.isSelected && 'bg-white/10 text-white',
              !day.isSelected && day.isToday && 'text-emerald-400',
              !day.isSelected && !day.isToday && 'text-white/60 hover:text-white/90 hover:bg-white/5'
            )}
          >
            {day.isSelected && (
              <motion.div
                layoutId="selected-day-bg"
                className="absolute inset-0 rounded-xl bg-white/10"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}

            <span className="relative z-10 text-xs uppercase tracking-wider font-medium hidden sm:inline">
              {day.label}
            </span>
            <span className="relative z-10 text-xs uppercase tracking-wider font-medium sm:hidden">
              {day.shortLabel}
            </span>

            <span className="relative z-10 text-base font-semibold">
              {day.dayNum}
            </span>

            {day.isToday && (
              <span className="relative z-10 text-[10px] uppercase tracking-wider text-emerald-400">
                Today
              </span>
            )}

            {/* Completion indicator */}
            {day.sessionCount > 0 && (
              <div className="absolute -top-1 -right-1 z-20">
                {isComplete ? (
                  <div className="h-4 w-4 rounded-full bg-emerald-500 flex items-center justify-center">
                    <svg className="h-2.5 w-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : (
                  <div className="h-2 w-2 rounded-full bg-emerald-400/50" />
                )}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
