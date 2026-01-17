import { SidebarWeekItem } from './SidebarWeekItem.jsx';

export function SidebarPhaseGroup({
  phase,
  weeks,
  currentWeek,
  selectedWeek,
  onSelectWeek,
  completionStatus,
}) {
  return (
    <div>
      {/* Phase Header */}
      <div className="mb-2">
        <div className="text-[10px] font-bold uppercase tracking-widest text-white/30 px-3">
          {phase.title.split('·')[0].trim()}
        </div>
      </div>

      {/* Week Items */}
      <div className="space-y-1">
        {weeks.map((week) => (
          <SidebarWeekItem
            key={week.id}
            week={week}
            isCurrentWeek={week.id === currentWeek}
            isSelected={week.id === selectedWeek}
            completionStatus={completionStatus[week.id] || 'empty'}
            onClick={() => onSelectWeek(week.id)}
          />
        ))}
      </div>
    </div>
  );
}
