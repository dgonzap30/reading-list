import { SidebarPhaseGroup } from './SidebarPhaseGroup.jsx';
import { SidebarStats } from './SidebarStats.jsx';

export function Sidebar({
  phases,
  weeks,
  currentWeek,
  selectedWeek,
  onSelectWeek,
  completionStatus,
  streak,
  progress,
  badgeCount,
}) {
  return (
    <div className="flex h-full flex-col bg-black">
      {/* Scrollable Week List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
        <div className="p-3 space-y-5">
          {phases.map((phase) => (
            <SidebarPhaseGroup
              key={phase.id}
              phase={phase}
              weeks={weeks.filter((w) => phase.weeks.includes(w.id))}
              currentWeek={currentWeek}
              selectedWeek={selectedWeek}
              onSelectWeek={onSelectWeek}
              completionStatus={completionStatus}
            />
          ))}
        </div>
      </div>

      {/* Fixed Stats Footer */}
      <SidebarStats
        streak={streak}
        progress={progress}
        badgeCount={badgeCount}
      />
    </div>
  );
}
