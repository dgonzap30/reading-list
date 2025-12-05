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
      className="rounded-xl bg-violet-500/10 border border-violet-500/20 p-4 hover:bg-violet-500/15 transition group cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-start gap-3">
        <Lucide.Quote className="h-5 w-5 text-violet-400 shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-violet-100/90 text-sm leading-relaxed italic">
            "{quote.text}"
          </p>
          {quote.context && (
            <p className="text-violet-400/60 text-xs mt-2">{quote.context}</p>
          )}

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 pt-3 border-t border-violet-500/20 space-y-2"
              >
                <p className="text-xs font-bold uppercase tracking-wider text-violet-400">
                  Reflect
                </p>
                <p className="text-violet-100/80 text-sm">
                  Write the first thing this line makes you notice in your own life.
                </p>
                {onUseQuote && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onUseQuote(quote);
                    }}
                    className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-violet-500/20 text-violet-200 text-xs font-medium hover:bg-violet-500/30 transition"
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
            <Lucide.X className="h-4 w-4 text-violet-400/60 hover:text-violet-400" />
          </button>
        )}
      </div>

      {!isExpanded && (
        <p className="text-violet-400/40 text-xs mt-2">
          Tap to reveal reflection prompt →
        </p>
      )}
    </motion.div>
  );
}
