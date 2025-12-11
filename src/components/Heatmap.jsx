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
        <div className="rounded-xl border border-white/20 bg-black p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/50">Consistency</p>
                    <p className="mt-1 text-xs text-white/40">Last 3 months</p>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-white/40">
                    <span>Less</span>
                    <div className="w-2.5 h-2.5 rounded-[2px] bg-white/[0.08]" />
                    <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-400" />
                    <span>More</span>
                </div>
            </div>

            <div className="grid grid-cols-[repeat(21,minmax(0,1fr))] gap-1.5 sm:grid-cols-[repeat(28,minmax(0,1fr))] lg:grid-cols-[repeat(42,minmax(0,1fr))]">
                {days.map((day) => {
                    const isActive = activityDates[day.dateStr];
                    return (
                        <div
                            key={day.dateStr}
                            title={day.dateStr}
                            className={clsx(
                                'aspect-square rounded-[2px] transition-all border',
                                isActive
                                    ? 'bg-emerald-400 border-emerald-400'
                                    : 'bg-black border-white/20 hover:border-white/40'
                            )}
                        />
                    );
                })}
            </div>
        </div>
    );
}
