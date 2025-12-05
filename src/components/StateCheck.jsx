import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Lucide from 'lucide-react';
import clsx from 'clsx';
import { STATES } from '../data/sections.js';

export function StateCheck({ isOpen, onSelect, onSkip, sessionLabel }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') onSkip();
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onSkip]);

  if (!isOpen) return null;

  const stateKeys = Object.keys(STATES);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onSkip}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-[#0A0A0A] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.8)]"
        >
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-white mb-2">
              How are you feeling right now?
            </h2>
            {sessionLabel && (
              <p className="text-white/60 text-sm">
                Before starting: <span className="text-white/80">{sessionLabel}</span>
              </p>
            )}
          </div>

          {/* State Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {stateKeys.map((key) => {
              const state = STATES[key];
              const Icon = Lucide[state.icon];

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => onSelect(key)}
                  className={clsx(
                    'group relative overflow-hidden rounded-2xl border p-6 text-left transition-all',
                    'border-white/10 bg-white/5',
                    'hover:border-white/30 hover:bg-white/10',
                    'hover:scale-[1.02]',
                    'flex flex-col gap-3'
                  )}
                >
                  {/* Icon */}
                  <div className={clsx(
                    'inline-flex items-center justify-center w-12 h-12 rounded-xl',
                    `bg-${state.color}-500/20 text-${state.color}-300`
                  )}>
                    {Icon && <Icon className="h-6 w-6" />}
                  </div>

                  {/* Label */}
                  <div>
                    <div className="mb-1">
                      <h3 className="text-lg font-semibold text-white">
                        {state.label}
                      </h3>
                    </div>
                    <p className="text-white/60 text-sm">
                      {state.description}
                    </p>
                  </div>

                  {/* Suggestion */}
                  <div className="mt-auto">
                    <p className="text-xs text-white/40">
                      Try → <span className="text-white/60">{state.suggestion}</span>
                    </p>
                  </div>

                  {/* Hover effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className={clsx(
                      'absolute inset-0 rounded-2xl',
                      `bg-gradient-to-br from-${state.color}-500/10 to-transparent`
                    )} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Skip */}
          <div className="flex justify-center">
            <button
              onClick={onSkip}
              className="text-sm text-white/40 hover:text-white/60 underline transition"
            >
              Skip for now
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
