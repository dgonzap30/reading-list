import { useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  parseISO,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import * as Lucide from 'lucide-react';

const isoFormat = (date) => format(date, 'yyyy-MM-dd');
const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function DatePicker({ value, onChange }) {
  const selectedDate = value ? parseISO(value) : null;
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(selectedDate || new Date());
  const panelRef = useRef(null);

  useEffect(() => {
    if (selectedDate) {
      setViewDate(selectedDate);
    }
  }, [value]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const onClick = (event) => {
      if (!panelRef.current) return;
      if (!panelRef.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  const calendarDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(viewDate), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(viewDate), { weekStartsOn: 1 });
    const days = eachDayOfInterval({ start, end });
    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }
    return weeks;
  }, [viewDate]);

  const handleSelect = (date) => {
    onChange?.(isoFormat(date));
    setOpen(false);
  };

  return (
    <div className="relative" ref={panelRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-12 w-full items-center justify-between gap-3 rounded-xl border border-white/20 bg-black px-4 text-left text-sm text-white/85 transition hover:border-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-white/50">Start date</p>
          <p className="font-medium text-white">
            {selectedDate ? format(selectedDate, 'EEE, MMM d') : 'Pick a date'}
          </p>
        </div>
        <Lucide.Calendar className="h-5 w-5 text-white/50" />
      </button>

      {open && (
        <div className="absolute z-30 mt-3 w-72 rounded-xl border border-white/20 bg-black/95 p-4 shadow-lg backdrop-blur">
          <div className="flex items-center justify-between text-white">
            <button
              type="button"
              onClick={() => setViewDate((prev) => addMonths(prev, -1))}
              className="rounded-full border border-white/15 p-2 text-white/70 hover:text-white"
              aria-label="Previous month"
            >
              <Lucide.ChevronLeft className="h-4 w-4" />
            </button>
            <p className="text-sm font-semibold">{format(viewDate, 'MMMM yyyy')}</p>
            <button
              type="button"
              onClick={() => setViewDate((prev) => addMonths(prev, 1))}
              className="rounded-full border border-white/15 p-2 text-white/70 hover:text-white"
              aria-label="Next month"
            >
              <Lucide.ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[11px] uppercase tracking-[0.2em] text-white/50">
            {WEEKDAYS.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
          <div className="mt-2 space-y-1 text-sm">
            {calendarDays.map((week, index) => (
              <div key={`week-${index}`} className="grid grid-cols-7 gap-1">
                {week.map((day) => {
                  const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;
                  const isToday = isSameDay(day, new Date());
                  const isCurrentMonth = isSameMonth(day, viewDate);
                  return (
                    <button
                      key={day.toISOString()}
                      type="button"
                      onClick={() => handleSelect(day)}
                      className={clsx(
                        'h-9 rounded-xl border text-xs font-medium transition',
                        isSelected
                          ? 'border-emerald-400/60 bg-emerald-500/20 text-white'
                          : 'border-transparent text-white/70 hover:border-white/20 hover:text-white',
                        !isCurrentMonth && 'text-white/30',
                      )}
                    >
                      <span>{format(day, 'd')}</span>
                      {isToday && !isSelected && (
                        <span className="mt-0.5 block text-[10px] uppercase tracking-[0.2em] text-white/50">Now</span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => {
                const today = new Date();
                setViewDate(today);
                handleSelect(today);
              }}
              className="flex-1 rounded-xl border border-white/15 px-3 py-2 text-sm text-white/80 hover:border-white/40"
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-xl border border-white/15 px-3 py-2 text-sm text-white/60 hover:text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
