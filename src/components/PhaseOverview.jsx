import clsx from 'clsx';

export function PhaseOverview({ phases, currentWeek }) {
  if (!phases?.length) return null;
  return (
    <div className="mx-auto mt-6 w-full max-w-6xl px-4 md:px-6">
      <div className="grid gap-4 md:grid-cols-3">
        {phases.map((phase) => {
          const isActive = phase.weeks.includes(currentWeek);
          return (
            <div
              key={phase.id}
              className={clsx(
                'rounded-3xl border p-4 shadow-[0_15px_35px_rgba(2,6,23,0.4)] transition',
                isActive ? 'border-emerald-400/60 bg-emerald-500/10' : 'border-white/10 bg-white/5',
              )}
            >
              <div className="flex items-center gap-2 text-white">
                <span className="text-xl">{phase.emoji}</span>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">{phase.subtitle}</p>
                  <p className="font-semibold">{phase.title}</p>
                </div>
              </div>
              <p className="mt-2 text-sm text-white/70">{phase.goal}</p>
              <div className="mt-3 text-xs text-white/60">
                Weeks {phase.weeks[0]}–{phase.weeks[phase.weeks.length - 1]}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
