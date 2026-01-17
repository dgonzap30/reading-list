import clsx from 'clsx';

export function SidebarWeekItem({ week, isCurrentWeek, isSelected, completionStatus, onClick }) {
  // Generate progress dots based on completion status
  const renderProgressDots = () => {
    const totalSessions = week.sessions.length;
    const maxDots = 4; // Show max 4 dots to keep UI clean
    const dotsToShow = Math.min(totalSessions, maxDots);

    // Determine how many should be filled
    let filledDots = 0;
    if (completionStatus === 'complete') {
      filledDots = dotsToShow;
    } else if (completionStatus === 'partial') {
      // Show roughly proportional dots (simplified)
      filledDots = Math.ceil(dotsToShow / 2);
    }

    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: dotsToShow }).map((_, i) => (
          <span
            key={i}
            className={clsx(
              'text-[10px]',
              i < filledDots ? 'text-emerald-400' : 'text-white/20'
            )}
          >
            ●
          </span>
        ))}
      </div>
    );
  };

  return (
    <button
      onClick={onClick}
      className={clsx(
        'w-full rounded-lg px-3 py-2 text-left transition-all',
        isSelected
          ? 'bg-emerald-500/20 border border-emerald-500/30'
          : 'border border-transparent hover:bg-white/5',
        isCurrentWeek && !isSelected && 'ring-1 ring-white/20'
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className={clsx(
              'text-xs font-semibold',
              isSelected ? 'text-emerald-200' : 'text-white/70'
            )}
          >
            W{week.id}
          </span>
          {isCurrentWeek && (
            <span className="flex-shrink-0 text-[10px] text-emerald-400">→</span>
          )}
        </div>
        {renderProgressDots()}
      </div>
    </button>
  );
}
