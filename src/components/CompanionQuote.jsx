import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Lucide from 'lucide-react';

export function CompanionQuote({ quote, onUseQuote, onDismiss }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!quote) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="rounded-xl bg-black border border-white/20 p-4 hover:bg-white/[0.03] transition group cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-start gap-3">
        <Lucide.Quote className="h-5 w-5 text-white/50 shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-white/80 text-sm leading-relaxed italic">
            "{quote.text}"
          </p>
          {quote.context && (
            <p className="text-white/50 text-xs mt-2">{quote.context}</p>
          )}

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 pt-3 border-t border-white/20 space-y-2"
              >
                <p className="text-xs font-bold uppercase tracking-wider text-white/50">
                  Reflect
                </p>
                <p className="text-white/70 text-sm">
                  Write the first thing this line makes you notice in your own life.
                </p>
                {onUseQuote && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onUseQuote(quote);
                    }}
                    className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] text-white/80 text-xs font-medium hover:bg-white/15 transition"
                  >
                    <Lucide.Sparkles className="h-3 w-3" />
                    Write from this
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {onDismiss && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDismiss();
            }}
            className="shrink-0 opacity-0 group-hover:opacity-100 transition"
          >
            <Lucide.X className="h-4 w-4 text-white/40 hover:text-white/60" />
          </button>
        )}
      </div>

      {!isExpanded && (
        <p className="text-white/40 text-xs mt-2">
          Tap to reveal reflection prompt →
        </p>
      )}
    </motion.div>
  );
}
