import * as Lucide from 'lucide-react';
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

export function TodayCard({ plan, state, currentWeek, scrollTo }) {
  const next = suggestNext(plan.weeks, state, currentWeek);
  if (!next) return null;
  const Icon = DOMAIN[next.domain]?.icon || Lucide.Book;
  const theme = getDomainTheme(next.domain);

  return (
    <div className="mx-auto mt-6 w-full max-w-6xl px-4 md:px-6">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/15 to-white/[0.02] p-5 shadow-[0_25px_60px_rgba(2,6,23,0.55)]">
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className={`absolute inset-0 bg-gradient-to-r ${theme.halo}`} />
        </div>
        <div className="relative flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex flex-1 items-start gap-4">
            <div className="rounded-2xl border border-white/15 bg-white/10 p-3 text-emerald-200">
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">Today’s focus</p>
              <p className="text-2xl font-semibold text-white">{next.book}</p>
              <p className="text-sm text-white/70">{next.details}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-white/75">
                <span className={`rounded-full px-3 py-1 ${theme.pill}`}>{next.domain}</span>
                <span className="rounded-full border border-white/15 px-3 py-1">Idea → question → application</span>
                <span className="rounded-full border border-white/15 px-3 py-1">Log a win in notes</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 md:items-end">
            <button
              onClick={() => scrollTo(next.id)}
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500/20 px-4 py-2 text-sm font-semibold text-emerald-50 shadow-[0_12px_35px_rgba(16,185,129,0.35)] transition hover:bg-emerald-500/30"
            >
              <Lucide.Navigation className="h-4 w-4" />
              Jump to session
            </button>
            <p className="text-xs text-white/60">Next unread session suggested based on your progress.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
