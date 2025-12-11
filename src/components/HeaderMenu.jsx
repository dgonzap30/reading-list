import { useState, useRef, useEffect } from 'react';
import * as Lucide from 'lucide-react';
import { DatePicker } from './DatePicker.jsx';

export function HeaderMenu({
  startDate,
  setStartDate,
  books = [],
  extraBooks = [],
  onExport,
  onImport,
  onReset,
  onReview,
  onOpenFragments,
  fragmentCount = 0,
  onOpenCmd,
  onOpenBooks,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-xl border border-white/20 bg-black px-3 py-2 text-sm font-medium text-white transition hover:bg-white/10"
        aria-label="Menu"
      >
        <Lucide.Menu className="h-4 w-4" />
        <span className="hidden sm:inline">Menu</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 min-w-[280px] rounded-xl border border-white/20 bg-black/95 p-3 shadow-lg backdrop-blur-xl">
          <div className="space-y-3">
            {/* Quick Actions */}
            <div className="space-y-2">
              <div className="text-xs uppercase tracking-wider text-white/40 px-2">Quick Actions</div>
              <button
                onClick={() => {
                  onReview();
                  setIsOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-white transition hover:bg-white/10"
              >
                <Lucide.Repeat className="h-4 w-4 text-white/60" />
                <span>Review Notes</span>
              </button>
              <button
                onClick={() => {
                  onOpenFragments();
                  setIsOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-white transition hover:bg-white/10"
              >
                <Lucide.FileEdit className="h-4 w-4 text-white/60" />
                <span>Fragments</span>
                {fragmentCount > 0 && (
                  <span className="ml-auto rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs text-emerald-200">
                    {fragmentCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => {
                  onOpenCmd();
                  setIsOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-white transition hover:bg-white/10"
              >
                <Lucide.Command className="h-4 w-4 text-white/60" />
                <span>Command Palette</span>
              </button>
            </div>

            <div className="h-px bg-white/10" />

            {/* Settings */}
            <div className="space-y-2">
              <div className="text-xs uppercase tracking-wider text-white/40 px-2">Settings</div>
              <div className="px-2">
                <DatePicker value={startDate || ''} onChange={setStartDate} />
              </div>
              <button
                onClick={() => {
                  onOpenBooks();
                  setIsOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-white transition hover:bg-white/10"
              >
                <Lucide.Library className="h-4 w-4 text-white/60" />
                <span>Book Library</span>
                <span className="ml-auto text-xs text-white/40">{books.length} books</span>
              </button>
            </div>

            <div className="h-px bg-white/10" />

            {/* Data Management */}
            <div className="space-y-2">
              <div className="text-xs uppercase tracking-wider text-white/40 px-2">Data</div>
              <button
                onClick={() => {
                  onExport();
                  setIsOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-emerald-200 transition hover:bg-emerald-500/10"
              >
                <Lucide.Download className="h-4 w-4" />
                <span>Export Progress</span>
              </button>
              <label className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-white transition hover:bg-white/10">
                <Lucide.Upload className="h-4 w-4 text-white/60" />
                <span>Import Progress</span>
                <input
                  type="file"
                  accept="application/json"
                  className="hidden"
                  onChange={(e) => {
                    onImport(e);
                    setIsOpen(false);
                  }}
                />
              </label>
              <button
                onClick={() => {
                  onReset();
                  setIsOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/60 transition hover:bg-white/10"
              >
                <Lucide.RotateCcw className="h-4 w-4" />
                <span>Reset All Data</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
