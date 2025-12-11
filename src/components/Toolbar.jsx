import clsx from 'clsx';
import * as Lucide from 'lucide-react';
import { DOMAIN } from '../data/plan.js';
import { getDomainTheme } from '../utils/domainTheme.js';

function DomainButton({ label, active, onClick }) {
  const Icon =
    label === 'All' ? Lucide.Sparkles : DOMAIN[label]?.icon || Lucide.BookOpenCheck;
  const theme = getDomainTheme(label);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={clsx(
        'inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400',
        active
          ? theme.filter
          : 'border-white/20 bg-black text-white/70 hover:text-white',
      )}
    >
      <Icon className={clsx('h-4 w-4', active ? theme.icon : 'text-white/60')} />
      {label}
    </button>
  );
}

export function Toolbar({ query, setQuery, domain, setDomain, currentWeek, domains }) {
  return (
    <div className="mx-auto mt-6 w-full max-w-6xl px-4 md:px-6">
      <div className="rounded-xl border border-white/20 bg-black p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Lucide.Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
            <input
              id="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by book, domain, or keyword…"
              className="w-full rounded-xl border border-white/20 bg-black py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/50 focus:border-emerald-300/70 focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-white/70">
            <Lucide.Navigation className="h-4 w-4 text-white/50" />
            <span>
              Currently viewing <span className="font-semibold text-white">Week {currentWeek}</span>
            </span>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {domains.map((label) => (
            <DomainButton
              key={label}
              label={label}
              active={label === domain}
              onClick={() => setDomain(label)}
            />
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-white/60">
          <span className="rounded-full border border-white/20 px-3 py-1">
            Tip: 3–4 sessions per week keeps the system humming
          </span>
          <span className="rounded-full border border-white/20 px-3 py-1">
            Shortcuts: / search • ⌘/Ctrl+K command palette
          </span>
        </div>
      </div>
    </div>
  );
}
