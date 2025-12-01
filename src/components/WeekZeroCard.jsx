import * as Lucide from 'lucide-react';

export function WeekZeroCard() {
    return (
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_25px_55px_rgba(2,6,23,0.65)]">
            <div className="pointer-events-none absolute inset-0 opacity-50 blur-3xl bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.1),_transparent_60%)]" />

            <div className="relative space-y-4">
                <div className="flex items-center gap-3 text-white/80">
                    <div className="rounded-xl bg-white/10 p-2">
                        <Lucide.Settings2 className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-white/50">Week 0</p>
                        <h3 className="text-lg font-semibold text-white">Quick Setup</h3>
                    </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10">
                        <Lucide.Clock className="mb-2 h-5 w-5 text-emerald-200" />
                        <p className="text-sm font-medium text-white">Pick a time</p>
                        <p className="text-xs text-white/50">Mornings? Nights?</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10">
                        <Lucide.MapPin className="mb-2 h-5 w-5 text-sky-200" />
                        <p className="text-sm font-medium text-white">Pick a spot</p>
                        <p className="text-xs text-white/50">Somewhere you love.</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10">
                        <Lucide.PenLine className="mb-2 h-5 w-5 text-violet-200" />
                        <p className="text-sm font-medium text-white">Set intention</p>
                        <p className="text-xs text-white/50">"I want to feel..."</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
