import { useEffect, useRef } from 'react';
import * as Lucide from 'lucide-react';
import { useCountdown } from '../hooks/useCountdown.js';

const QUICK_BLOCKS = [
  { label: '25 min Sprint', minutes: 25 },
  { label: '45 min Deep Dive', minutes: 45 },
  { label: '60 min Stretch', minutes: 60 },
];

export function Timer({ onComplete, activeSession, onStartBlock, onClearBlock }) {
  const { remaining, running, duration, start, pause, resume, reset } = useCountdown();
  const displayRemaining = activeSession?.remaining ?? remaining;
  const displayDuration = activeSession?.duration ?? duration;
  const isExternal = Boolean(activeSession);
  const isRunning = isExternal || running;
  const mins = String(Math.floor(displayRemaining / 60)).padStart(2, '0');
  const secs = String(displayRemaining % 60).padStart(2, '0');
  const percent = displayDuration ? Math.min(100, Math.round(((displayDuration - displayRemaining) / displayDuration) * 100)) : 0;
  const status = isRunning ? 'Deep work in progress' : displayRemaining > 0 ? 'Paused — take a breath' : 'Ready for launch';
  const alertedRef = useRef(false);

  useEffect(() => {
    if (!duration) {
      alertedRef.current = false;
      return;
    }
    if (remaining === 0 && !running && onComplete) {
      if (!alertedRef.current) {
        alertedRef.current = true;
        onComplete();
      }
    } else {
      alertedRef.current = false;
    }
  }, [duration, remaining, running, onComplete]);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_25px_60px_rgba(2,6,23,0.55)]">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -inset-8 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.35),_transparent_55%)] blur-3xl" />
        <div className="absolute bottom-0 right-0 h-32 w-32 translate-x-10 translate-y-8 rounded-full bg-emerald-400/30 blur-3xl" />
      </div>

      <div className="relative flex flex-col gap-5">
        <div className="flex items-center justify-between gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
          <span>Focus coach</span>
          <span className="text-[11px] normal-case tracking-normal text-emerald-200">{status}</span>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-4xl font-mono md:text-5xl" aria-live="polite">
              {mins}:{secs}
            </div>
            <p className="mt-1 text-sm text-white/70">
              {displayDuration ? `${Math.round(displayDuration / 60)}‑minute block` : 'Pick a block to begin'}
            </p>
            {activeSession?.label && (
              <p className="text-xs text-white/60 mt-1 truncate">Current: {activeSession.label}</p>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {isExternal && (
              <>
                <button
                  onClick={onClearBlock}
                  className="inline-flex items-center gap-1 rounded-2xl bg-white/10 px-3 py-1.5 text-sm font-medium text-white hover:bg-white/20"
                >
                  <Lucide.StopCircle className="h-4 w-4" />
                  Stop
                </button>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="inline-flex items-center gap-1 rounded-2xl border border-white/15 px-3 py-1.5 text-sm font-medium text-white/80 hover:text-white"
                >
                  <Lucide.Navigation className="h-4 w-4" />
                  Jump to start
                </button>
              </>
            )}
            {!isExternal && running && (
              <>
                <button
                  onClick={pause}
                  className="inline-flex items-center gap-1 rounded-2xl bg-white/10 px-3 py-1.5 text-sm font-medium text-white hover:bg-white/20"
                >
                  <Lucide.Pause className="h-4 w-4" />
                  Pause
                </button>
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-1 rounded-2xl border border-white/15 px-3 py-1.5 text-sm font-medium text-white/80 hover:text-white"
                >
                  <Lucide.RotateCcw className="h-4 w-4" />
                  Reset
                </button>
              </>
            )}
            {!isExternal && !running && remaining > 0 && (
              <>
                <button
                  onClick={resume}
                  className="inline-flex items-center gap-1 rounded-2xl bg-emerald-500/20 px-3 py-1.5 text-sm font-medium text-emerald-50 shadow-[0_10px_35px_rgba(16,185,129,0.35)] hover:bg-emerald-500/30"
                >
                  <Lucide.Play className="h-4 w-4" />
                  Resume
                </button>
              </>
            )}
          </div>
        </div>

        <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-400 transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>

        {!isRunning && displayRemaining === 0 && (
          <div className="flex flex-wrap gap-2">
            {QUICK_BLOCKS.map((block) => {
              const handleClick = () => {
                start(block.minutes * 60);
                onStartBlock?.(block.minutes * 60);
              };
              return (
                <button
                  key={block.minutes}
                  onClick={handleClick}
                  className="group inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 hover:border-white/40"
                >
                  <Lucide.Bolt className="h-4 w-4 text-amber-200 group-hover:scale-110 transition" />
                  {block.label}
                </button>
              );
            })}
          </div>
        )}

        <div className="flex flex-wrap gap-2 text-[11px] text-white/70">
          <span className="rounded-full border border-white/15 px-3 py-1">Notebook open</span>
          <span className="rounded-full border border-white/15 px-3 py-1">Idea → question → application</span>
          <span className="rounded-full border border-white/15 px-3 py-1">Log insight before you close</span>
        </div>
      </div>
    </div>
  );
}
