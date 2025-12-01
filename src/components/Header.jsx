import * as Lucide from 'lucide-react';
import { ProgressRing } from './ProgressRing.jsx';
import { DatePicker } from './DatePicker.jsx';
import { BooksDropdown } from './BooksDropdown.jsx';

const VIBES = [
  { when: 75, text: 'Synthesis mode — stitch insights together.' },
  { when: 50, text: 'Halfway there. Keep protecting deep work windows.' },
  { when: 25, text: 'Momentum is building. Celebrate each page turned.' },
  { when: 0, text: 'Light your mind up — one focused session at a time.' },
];

export function Header({
  progress,
  streak,
  planDay,
  todayLabel,
  onReset,
  onExport,
  onImport,
  startDate,
  setStartDate,
  onOpenCmd,
  books = [],
  extraBooks = [],
}) {
  const pct = Math.round(progress * 100);
  const vibe = VIBES.find((entry) => pct >= entry.when)?.text ?? VIBES[VIBES.length - 1].text;

  return (
    <div className="sticky top-0 z-30 border-b border-white/5 bg-[#03060f]/85 backdrop-blur-2xl text-white/90">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 md:px-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 -m-3 rounded-full bg-emerald-500/25 blur-2xl" aria-hidden />
              <ProgressRing percent={pct} size={56} />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-xs font-semibold text-emerald-100">
                {pct}%
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/60">16‑week reading voyage</p>
              <p className="text-lg font-semibold text-white">Progress: {pct}%</p>
              <p className="text-sm text-white/70">{vibe}</p>
            </div>
          </div>
          <div className="ml-auto flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/70">
              <Lucide.Clock3 className="h-4 w-4 text-emerald-200" />
              <span className="text-sm normal-case tracking-normal text-white">Day {planDay}</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/80">
              <Lucide.CalendarDays className="h-4 w-4 text-sky-200" />
              <span>{todayLabel}</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white">
              <Lucide.Flame className="h-4 w-4 text-orange-300" />
              <span>{streak}‑day streak</span>
            </div>
            <button
              onClick={onOpenCmd}
              className="inline-flex items-center gap-1 rounded-2xl border border-white/10 px-3 py-1.5 text-sm font-medium text-white/85 transition hover:border-white/40"
            >
              <Lucide.Command className="h-4 w-4" />
              Palette
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="min-w-[240px] flex-1 sm:flex-none sm:w-auto">
            <DatePicker value={startDate || ''} onChange={setStartDate} />
          </div>
          <BooksDropdown books={books} extras={extraBooks} />
          <button
            onClick={onExport}
            className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500/20 px-4 py-2 text-sm font-semibold text-emerald-50 shadow-[0_10px_30px_rgba(16,185,129,0.35)] transition hover:bg-emerald-500/30"
          >
            <Lucide.CalendarPlus className="h-4 w-4" />
            Export
          </button>
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-white/10 px-4 py-2 text-sm text-white/80 transition hover:border-white/40">
            <Lucide.Download className="h-4 w-4" />
            Import
            <input type="file" accept="application/json" className="hidden" onChange={onImport} />
          </label>
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-4 py-2 text-sm text-white/80 transition hover:border-white/40"
          >
            <Lucide.RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
