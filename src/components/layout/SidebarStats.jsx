import * as Lucide from 'lucide-react';

export function SidebarStats({ streak, progress, badgeCount }) {
  return (
    <div className="border-t border-white/10 p-4 space-y-3">
      {/* Streak Counter */}
      {streak > 0 && (
        <div className="flex items-center gap-2">
          <Lucide.Flame className="h-4 w-4 text-orange-400" />
          <div className="flex-1">
            <div className="text-xs font-semibold text-white">{streak}-day</div>
            <div className="text-[10px] text-white/40">streak</div>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div>
        <div className="flex items-center justify-between text-[10px] text-white/40 mb-1">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
          <div
            className="h-full rounded-full bg-emerald-400 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Badge Count */}
      {badgeCount > 0 && (
        <div className="flex items-center gap-2">
          <Lucide.Award className="h-4 w-4 text-amber-400" />
          <div className="flex-1">
            <div className="text-xs font-semibold text-white">{badgeCount}</div>
            <div className="text-[10px] text-white/40">badges</div>
          </div>
        </div>
      )}
    </div>
  );
}
