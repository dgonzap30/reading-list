import * as Lucide from 'lucide-react';
import { motion } from 'framer-motion';

export function SessionTicker({ ticker, onStop }) {
  if (!ticker) return null;
  const mins = String(Math.floor(ticker.remaining / 60)).padStart(2, '0');
  const secs = String(ticker.remaining % 60).padStart(2, '0');
  const pct = ticker.duration ? Math.max(0, 100 - Math.round((ticker.remaining / ticker.duration) * 100)) : 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.95 }}
      className="fixed right-4 bottom-28 z-50 max-w-sm rounded-3xl border border-white/10 bg-[#050712]/95 p-4 shadow-[0_20px_45px_rgba(0,0,0,0.45)] sm:right-6 sm:bottom-6"
    >
      <div className="flex items-start gap-3">
        <div className="relative">
          <svg width="54" height="54">
            <circle cx="27" cy="27" r="24" className="fill-none stroke-white/10" strokeWidth="4" />
            <circle
              cx="27"
              cy="27"
              r="24"
              className="fill-none stroke-emerald-400"
              strokeWidth="4"
              strokeDasharray={`${(pct / 100) * 2 * Math.PI * 24} ${2 * Math.PI * 24}`}
              transform="rotate(-90 27 27)"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
            {mins}:{secs}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Reading sprint</p>
          <p className="font-semibold text-white truncate">{ticker.label}</p>
          <p className="text-xs text-white/60">{ticker.minutes} min block • tap timer to finish</p>
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              onClick={onStop}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/15 px-3 py-1.5 text-xs text-white/80 hover:border-white/40"
            >
              <Lucide.Check className="h-3.5 w-3.5" />
              Done
            </button>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/15 px-3 py-1.5 text-xs text-white/60 hover:text-white"
            >
              <Lucide.Timer className="h-3.5 w-3.5" />
              Focus coach
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
