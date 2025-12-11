import * as Lucide from 'lucide-react';

export function WeekZeroCard() {
    return (
        <div className="relative overflow-hidden rounded-xl border border-white/20 bg-black p-6 shadow-sm">
            <div className="relative space-y-4">
                <div className="flex items-center gap-3 text-white/80">
                    <div className="rounded-xl bg-white/[0.03] p-2">
                        <Lucide.Settings2 className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-white/50">Week 0</p>
                        <h3 className="text-lg font-semibold text-white">Quick Setup</h3>
                    </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-xl border border-white/20 bg-black p-4 transition hover:bg-white/10">
                        <Lucide.Clock className="mb-2 h-5 w-5 text-white/50" />
                        <p className="text-sm font-medium text-white">Pick a time</p>
                        <p className="text-xs text-white/50">Mornings? Nights?</p>
                    </div>
                    <div className="rounded-xl border border-white/20 bg-black p-4 transition hover:bg-white/10">
                        <Lucide.MapPin className="mb-2 h-5 w-5 text-white/50" />
                        <p className="text-sm font-medium text-white">Pick a spot</p>
                        <p className="text-xs text-white/50">Somewhere you love.</p>
                    </div>
                    <div className="rounded-xl border border-white/20 bg-black p-4 transition hover:bg-white/10">
                        <Lucide.PenLine className="mb-2 h-5 w-5 text-white/50" />
                        <p className="text-sm font-medium text-white">Set intention</p>
                        <p className="text-xs text-white/50">"I want to feel..."</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
