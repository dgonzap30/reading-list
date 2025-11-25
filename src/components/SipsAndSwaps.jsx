import * as Lucide from 'lucide-react';

export function SipsAndSwaps({ plan }) {
  return (
    <div className="mx-auto mt-12 w-full max-w-6xl px-4 md:px-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/15 to-emerald-500/5 p-5">
          <div className="flex items-center gap-2 text-white">
            <Lucide.Sparkles className="h-5 w-5 text-emerald-200" />
            <span className="text-lg font-semibold">Anytime sips</span>
          </div>
          <p className="mt-2 text-sm text-white/70">Short, energizing passages you can reach for between sessions.</p>
          <ul className="mt-4 space-y-3">
            {plan.sips.map((sip, index) => (
              <li key={`sip-${index}`} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <p className="font-semibold text-white">{sip.book}</p>
                <p className="text-sm text-white/70">{sip.details}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/15 to-violet-500/5 p-5">
          <div className="flex items-center gap-2 text-white">
            <Lucide.Orbit className="h-5 w-5 text-violet-200" />
            <span className="text-lg font-semibold">Swap‑ins (fiction weeks)</span>
          </div>
          <p className="mt-2 text-sm text-white/70">Keep the vibe but swap the story when you crave variety.</p>
          <ul className="mt-4 space-y-3">
            {plan.swaps.map((swap, index) => (
              <li key={`swap-${index}`} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <p className="font-semibold text-white">{swap.book}</p>
                <p className="text-sm text-white/70">{swap.details}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
