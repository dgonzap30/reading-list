import * as Lucide from 'lucide-react';

export function computeBadges({ checks, activityDates }) {
  const count = Object.values(checks || {}).filter(Boolean).length;
  const days = Object.keys(activityDates || {}).length;
  const badges = [];
  if (count >= 1) badges.push({ name: 'First Session', icon: Lucide.Sparkles, desc: 'You lit the fuse.' });
  if (count >= 4) badges.push({ name: 'Week Warrior', icon: Lucide.Medal, desc: 'Four sessions logged.' });
  if (count >= 12) badges.push({ name: 'Quarter Journey', icon: Lucide.Compass, desc: '12 sessions of momentum.' });
  if (count >= 20) badges.push({ name: 'Momentum Keeper', icon: Lucide.Activity, desc: '20 focused reps on the books.' });
  if (count >= 36) badges.push({ name: 'Deep Diver', icon: Lucide.Crown, desc: '36 sessions into the craft.' });
  if (days >= 3) badges.push({ name: '3‑Day Streak', icon: Lucide.Flame, desc: 'Showed up three days in a row.' });
  if (days >= 7) badges.push({ name: '7‑Day Rhythm', icon: Lucide.Flame, desc: 'A full week of touches.' });
  return badges;
}

export function Badges({ badges }) {
  if (!badges.length) return null;
  return (
    <div className="mx-auto mt-10 w-full max-w-6xl px-4 md:px-6">
      <div className="relative overflow-hidden rounded-xl border border-white/20 bg-black p-5 shadow-sm">
        <div className="relative">
          <div className="flex flex-wrap items-center gap-2 text-white">
            <Lucide.Medal className="h-5 w-5 text-white/50" />
            <span className="text-lg font-semibold">Badge cabinet</span>
            <span className="text-xs text-white/60">Unlocked: {badges.length}</span>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {badges.map((badge, index) => (
              <div
                key={badge.name + index}
                className="flex items-start gap-3 rounded-xl border border-white/20 bg-black p-4"
              >
                <div className="rounded-xl border border-white/20 bg-white/[0.03] p-3 text-white/50">
                  <badge.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-white">{badge.name}</p>
                  <p className="text-sm text-white/70">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
