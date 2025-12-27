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
      <div className="relative overflow-hidden rounded-xl border border-emerald-500/30 border-l-4 border-l-emerald-500 bg-black p-5 shadow-lg shadow-emerald-500/10">
        <div className="relative flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex flex-1 items-start gap-4">
            <div className="rounded-xl border border-white/15 bg-white/[0.03] p-3 text-white/60">
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">Today's focus</p>
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
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-emerald-500/20 transition hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
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
