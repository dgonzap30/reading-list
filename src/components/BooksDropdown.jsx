import { useEffect, useRef, useState } from 'react';
import * as Lucide from 'lucide-react';

export function BooksDropdown({ books, extras }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onClick = (event) => {
      if (!panelRef.current?.contains(event.target)) setOpen(false);
    };
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (!books?.length) return null;

  return (
    <div className="relative" ref={panelRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:border-white/40"
        aria-expanded={open}
      >
        <Lucide.Library className="h-4 w-4 text-emerald-300" />
        Book index
        <Lucide.ChevronDown className="h-4 w-4 text-white/60" />
      </button>

      {open && (
        <div className="absolute right-0 z-40 mt-2 w-[360px] rounded-3xl border border-white/10 bg-[#050712]/95 p-4 shadow-[0_25px_55px_rgba(0,0,0,0.45)]">
          <div className="flex items-center gap-2 text-white">
            <Lucide.BookOpen className="h-4 w-4 text-emerald-200" />
            <span className="text-sm font-semibold">All titles ({books.length})</span>
          </div>
          <div className="mt-3 max-h-64 overflow-auto space-y-2 pr-1">
            {books.map((book) => (
              <div key={book.title} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/40">
                  <span>{book.domain}</span>
                  <span className="text-white/30">•</span>
                  <span>Week {book.firstWeek}</span>
                </div>
                <p className="text-white font-semibold text-sm truncate">{book.title}</p>
                <ul className="mt-1 space-y-1 text-xs text-white/70">
                  {book.sections.slice(0, 2).map((section, index) => (
                    <li key={`${book.title}-${section.week}-${index}`} className="truncate">
                      Week {section.week}: {section.details}
                    </li>
                  ))}
                  {book.sections.length > 2 && (
                    <li className="text-white/50">
                      +{book.sections.length - 2} more sections
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>

          {extras?.length ? (
            <>
              <div className="mt-3 flex items-center gap-2 text-white">
                <Lucide.Star className="h-4 w-4 text-amber-300" />
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">Optional</span>
              </div>
              <div className="mt-1 max-h-32 overflow-auto space-y-1 pr-1 text-xs text-white/70">
                {extras.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                    <p className="text-white font-semibold">{item.title}</p>
                    <p>{item.details}</p>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </div>
      )}
    </div>
  );
}
