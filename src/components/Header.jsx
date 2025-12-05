import { useState } from 'react';
import * as Lucide from 'lucide-react';
import clsx from 'clsx';
import { ReviewModal } from './ReviewModal.jsx';
import { ProgressRing } from './ProgressRing.jsx';
import { HeaderMenu } from './HeaderMenu.jsx';

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
  notes,
  weeks = [],
  currentWeek,
  onJumpToWeek,
  fragments = {},
  onOpenFragments,
}) {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const pct = Math.round(progress * 100);
  const vibe = VIBES.find((entry) => pct >= entry.when)?.text ?? VIBES[VIBES.length - 1].text;

  // Count active fragments
  const fragmentCount = Object.values(fragments).filter(f => f.status !== 'Discard').length;

  return (
    <>
      {/* Mobile: Combined sticky bar with progress + week pills */}
      <div className="lg:hidden sticky top-0 z-30 bg-[#030711]/90 backdrop-blur-xl border-b border-white/10">
        {/* Row 1: Progress + Stats + Actions */}
        <div className="flex items-center justify-between px-4 py-2.5">
          <div className="flex items-center gap-3">
            <div className="relative">
              <ProgressRing percent={pct} size={36} />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-emerald-100">
                {pct}%
              </div>
            </div>
            <div className="text-sm">
              <span className="font-semibold text-white">{pct}%</span>
              <span className="text-white/60 ml-1">Day {planDay}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {streak > 0 && (
              <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-white">
                <Lucide.Flame className="h-3 w-3 text-orange-300" />
                <span>{streak}</span>
              </div>
            )}
            <button
              onClick={onOpenCmd}
              className="flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 text-white transition hover:bg-white/10"
            >
              <Lucide.Command className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Row 2: Week pills */}
        <div className="overflow-x-auto no-scrollbar px-4 pb-2.5 flex gap-2">
          {weeks.map((week) => (
            <button
              key={week.id}
              onClick={() => onJumpToWeek?.(week.id)}
              className={clsx(
                'flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors',
                week.id === currentWeek
                  ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-200'
                  : 'bg-white/5 border-white/10 text-white/60'
              )}
            >
              W{week.id}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop: Simplified header */}
      <header className="hidden lg:block sticky top-0 z-30 border-b border-white/10 bg-[#030711]/90 backdrop-blur-xl text-white/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <ProgressRing percent={pct} size={48} />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-xs font-semibold text-emerald-100">
                {pct}%
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{pct}% Complete</p>
              <p className="text-xs text-white/50">Day {planDay} · {streak > 0 ? `${streak}-day streak` : 'Start today'}</p>
            </div>
          </div>

          <HeaderMenu
            startDate={startDate}
            setStartDate={setStartDate}
            books={books}
            extraBooks={extraBooks}
            onExport={onExport}
            onImport={onImport}
            onReset={onReset}
            onReview={() => setIsReviewOpen(true)}
            onOpenFragments={onOpenFragments}
            fragmentCount={fragmentCount}
            onOpenCmd={onOpenCmd}
          />
        </div>
      </header>

      <ReviewModal isOpen={isReviewOpen} onClose={() => setIsReviewOpen(false)} notes={notes} />
    </>
  );
}
