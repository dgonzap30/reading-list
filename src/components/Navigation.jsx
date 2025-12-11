import * as Lucide from 'lucide-react';
import clsx from 'clsx';

export function Navigation({
    weeks,
    currentWeek,
    expandedWeeks,
    onJumpToWeek,
    onToggleAll,
    allExpanded
}) {
    return (
        <>
            {/* Desktop Sidebar */}
            <div className="hidden lg:block fixed left-8 top-8 bottom-8 w-64 rounded-xl border border-white/20 bg-black/80 backdrop-blur-xl p-6 shadow-2xl overflow-y-auto z-50">
                <div className="space-y-6">
                    <div>
                        <h2 className="text-xs uppercase tracking-[0.3em] text-white/40 font-semibold mb-4">Navigation</h2>
                        <div className="space-y-1">
                            {weeks.map((week) => {
                                const isCurrent = week.id === currentWeek;
                                const isExpanded = expandedWeeks.has(week.id);

                                return (
                                    <button
                                        key={week.id}
                                        onClick={() => onJumpToWeek(week.id)}
                                        className={clsx(
                                            'w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all group',
                                            isCurrent ? 'bg-emerald-500/20 text-emerald-200' : 'text-white/60 hover:bg-black hover:text-white'
                                        )}
                                    >
                                        <span className="font-medium">Week {week.id}</span>
                                        {isExpanded && (
                                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400/50" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="h-px bg-white/10" />

                    <div>
                        <h2 className="text-xs uppercase tracking-[0.3em] text-white/40 font-semibold mb-4">Controls</h2>
                        <button
                            onClick={onToggleAll}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-white/60 hover:bg-black hover:text-white transition-all"
                        >
                            {allExpanded ? (
                                <>
                                    <Lucide.Minimize2 className="h-4 w-4" />
                                    <span>Collapse All</span>
                                </>
                            ) : (
                                <>
                                    <Lucide.Maximize2 className="h-4 w-4" />
                                    <span>Expand All</span>
                                </>
                            )}
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
}
