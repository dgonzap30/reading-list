import { useState } from 'react';
import * as Lucide from 'lucide-react';
import { Timer } from './Timer.jsx';
import clsx from 'clsx';

export function TimerFAB({ onComplete, activeSession, onStartBlock, onClearBlock }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-100 shadow-lg backdrop-blur-sm transition hover:bg-emerald-500/30 hover:scale-105"
          aria-label="Open timer"
        >
          <Lucide.Timer className="h-6 w-6" />
        </button>
      )}

      {isExpanded && (
        <div className="fixed bottom-6 right-6 z-40 w-80 rounded-xl border border-white/10 bg-zinc-900/95 shadow-lg backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <span className="text-sm font-semibold text-white">Focus Timer</span>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-white/60 hover:text-white transition"
              aria-label="Close timer"
            >
              <Lucide.X className="h-4 w-4" />
            </button>
          </div>
          <div className="p-4">
            <Timer
              onComplete={onComplete}
              activeSession={activeSession}
              onStartBlock={onStartBlock}
              onClearBlock={onClearBlock}
            />
          </div>
        </div>
      )}
    </>
  );
}
