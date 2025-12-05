import clsx from 'clsx';
import { subDays, format, isSameDay, parseISO } from 'date-fns';

export function Heatmap({ activityDates }) {
    // Generate last 12 weeks of days (approx 84 days)
    const today = new Date();
    const days = Array.from({ length: 84 }).map((_, i) => {
        const date = subDays(today, 83 - i);
        return {
            date,
            dateStr: format(date, 'yyyy-MM-dd'),
        };
    });

    return (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[0_15px_40px_rgba(2,6,23,0.45)] h-full flex flex-col justify-center">
            <div className="flex items-center justify-between mb-3">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">Consistency</p>
                <div className="flex items-center gap-1 text-[10px] text-white/40">
                    <span>Less</span>
                    <div className="w-2 h-2 rounded-[2px] bg-white/5" />
                    <div className="w-2 h-2 rounded-[2px] bg-emerald-500" />
                    <span>More</span>
                </div>
            </div>

            <div className="grid grid-cols-[repeat(12,minmax(0,1fr))] gap-1.5">
                {days.map((day) => {
                    const isActive = activityDates[day.dateStr];
                    return (
                        <div
                            key={day.dateStr}
                            title={day.dateStr}
                            className={clsx(
                                'aspect-square rounded-[2px] transition-all duration-500',
                                isActive
                                    ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]'
                                    : 'bg-white/5 hover:bg-white/10'
                            )}
                        />
                    );
                })}
            </div>
            <p className="mt-3 text-xs text-white/40 text-center">Last 3 months</p>
        </div>
    );
}
