export function WeekHeader({ week, planDay, isCurrentWeek }) {
  if (!week) return null;

  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-2">
        <h2 className="text-2xl font-semibold text-white">
          Week {week.id}: {week.title}
        </h2>
        {isCurrentWeek && (
          <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-200">
            Current
          </span>
        )}
      </div>

      {week.metaIntent && (
        <p className="text-sm text-white/60 mb-1">{week.metaIntent}</p>
      )}

      {isCurrentWeek && (
        <p className="text-xs text-white/40">
          Day {planDay} of 140
        </p>
      )}
    </div>
  );
}
