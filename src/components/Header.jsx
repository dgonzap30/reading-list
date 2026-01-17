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
  onOpenBooks,
  onToggleSidebar,
}) {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const pct = Math.round(progress * 100);
  const vibe = VIBES.find((entry) => pct >= entry.when)?.text ?? VIBES[VIBES.length - 1].text;

  // Count active fragments
  const fragmentCount = Object.values(fragments).filter(f => f.status !== 'Discard').length;

  return (
    <>
      {/* Mobile: Combined sticky bar with progress + actions */}
      <div className="lg:hidden sticky top-0 z-30 bg-black/90 backdrop-blur-xl border-b border-white/20">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={onToggleSidebar}
            className="flex items-center justify-center rounded-lg border border-white/20 bg-black p-2 text-white transition hover:bg-white/[0.05]"
            aria-label="Toggle sidebar"
          >
            <Lucide.Menu className="h-5 w-5" />
          </button>

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
              <div className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-black px-2 py-1 text-xs text-white">
                <Lucide.Flame className="h-3 w-3 text-white/50" />
                <span>{streak}</span>
              </div>
            )}
            <button
              onClick={onOpenCmd}
              className="flex items-center justify-center rounded-full border border-white/20 bg-black p-2 text-white transition hover:bg-white/[0.05]"
            >
              <Lucide.Command className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop: Full-width header spanning sidebar + content */}
      <header className="hidden lg:block sticky top-0 z-30 border-b border-white/20 bg-black/90 backdrop-blur-xl text-white/90">
        <div className="flex items-center justify-between px-4 py-3 md:px-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <ProgressRing percent={pct} size={56} />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm font-semibold text-emerald-100">
                {pct}%
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{pct}% Complete</p>
              <p className="text-xs text-white/50 flex items-center gap-1.5">
                Day {planDay} ·
                {streak > 0 ? (
                  <>
                    {streak > 3 && <Lucide.Flame className="h-3.5 w-3.5 text-orange-400" />}
                    <span>{streak}-day streak</span>
                  </>
                ) : (
                  <span>Start today</span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCmd}
              className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl border border-white/20 text-white/60 hover:text-white hover:bg-white/[0.03] transition"
              aria-label="Open command palette"
            >
              <Lucide.Command className="h-4 w-4" />
              <span className="text-sm">Search...</span>
              <kbd className="ml-2 text-xs border border-white/20 px-1.5 py-0.5 rounded">⌘K</kbd>
            </button>

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
              onOpenBooks={onOpenBooks}
            />
          </div>
        </div>
      </header>

      <ReviewModal isOpen={isReviewOpen} onClose={() => setIsReviewOpen(false)} notes={notes} />
    </>
  );
}
