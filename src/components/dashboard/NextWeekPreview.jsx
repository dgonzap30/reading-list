import * as Lucide from 'lucide-react';
import { DOMAIN } from '../../data/plan.js';

export function NextWeekPreview({ week, onJumpToWeek }) {
  if (!week) {
    return (
      <div className="rounded-xl border border-white/20 bg-black p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Next Week Preview</h3>
        <div className="flex items-center justify-center h-32">
          <p className="text-sm text-white/40">You've reached the final week! 🎉</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-white/20 bg-black p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Next Week Preview</h3>
        <button
          onClick={() => onJumpToWeek?.(week.id)}
          className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 transition"
        >
          Jump to week
          <Lucide.ArrowRight className="h-3 w-3" />
        </button>
      </div>

      <div className="mb-3">
        <div className="text-sm font-semibold text-white mb-1">
          Week {week.id}: {week.title}
        </div>
        {week.metaIntent && (
          <p className="text-xs text-white/50">{week.metaIntent}</p>
        )}
      </div>

      <div className="space-y-2">
        {week.sessions.slice(0, 4).map((session) => {
          const Icon = DOMAIN[session.domain]?.icon || Lucide.Book;

          return (
            <div
              key={session.id}
              className="flex items-start gap-2 text-xs"
            >
              <Icon className="h-3.5 w-3.5 text-white/30 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="text-white/70 truncate">{session.book}</div>
                <div className="text-white/40 truncate">{session.details}</div>
              </div>
            </div>
          );
        })}

        {week.sessions.length > 4 && (
          <p className="text-xs text-white/40 pl-5">
            +{week.sessions.length - 4} more sessions
          </p>
        )}
      </div>

      {week.fiction && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs">
            <Lucide.Sparkles className="h-3.5 w-3.5 text-violet-400" />
            <span className="text-white/50">Fiction:</span>
            <span className="text-white/70 font-medium">{week.fiction.title}</span>
          </div>
        </div>
      )}
    </div>
  );
}
