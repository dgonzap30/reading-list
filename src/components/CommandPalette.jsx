import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import * as Lucide from 'lucide-react';
import { Command } from 'cmdk';

export function CommandPalette({ open, setOpen, plan, jumpToWeek, markAllWeek }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const onKey = (event) => {
      if ((event.key === 'k' || event.key === 'K') && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen(true);
      }
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setOpen]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            className="mx-auto mt-24 w-full max-w-2xl px-4"
            onClick={(event) => event.stopPropagation()}
          >
            <Command
              label="Command Menu"
              shouldFilter
              className="overflow-hidden rounded-xl border border-white/20 bg-black/95 text-white shadow-lg"
            >
              <div className="flex items-center gap-3 border-b border-white/5 px-4 py-3">
                <Lucide.Search className="h-4 w-4 text-white/40" />
                <Command.Input
                  value={query}
                  onValueChange={setQuery}
                  placeholder="Jump to a week, mark all sessions, or get help…"
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 outline-none"
                />
                <kbd className="rounded-md border border-white/20 px-2 py-1 text-[10px] text-white/60">Esc</kbd>
              </div>
              <Command.List className="max-h-72 overflow-auto px-2 py-3 text-sm">
                <Command.Empty className="px-3 py-2 text-white/60">No results — try another keyword.</Command.Empty>
                <Command.Group heading="Weeks" className="text-white/60">
                  {plan.weeks.map((week) => (
                    <Command.Item
                      key={week.id}
                      onSelect={() => {
                        jumpToWeek(week.id);
                        setOpen(false);
                      }}
                      className="my-1 flex items-center gap-2 rounded-xl px-3 py-2 text-white aria-selected:bg-white/[0.03] aria-selected:text-white"
                    >
                      <Lucide.Calendar className="h-4 w-4" />
                      <div>
                        <p className="font-semibold text-white">Go to Week {week.id}</p>
                        <p className="text-xs text-white/60">{week.title}</p>
                      </div>
                    </Command.Item>
                  ))}
                </Command.Group>
                <Command.Group heading="Actions" className="mt-3 text-white/60">
                  {plan.weeks.map((week) => (
                    <Command.Item
                      key={`mark-${week.id}`}
                      onSelect={() => {
                        markAllWeek(week.id);
                        setOpen(false);
                      }}
                      className="my-1 flex items-center gap-2 rounded-xl px-3 py-2 text-white aria-selected:bg-white/[0.03] aria-selected:text-white"
                    >
                      <Lucide.CheckSquare className="h-4 w-4" />
                      Mark Week {week.id} complete
                    </Command.Item>
                  ))}
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
