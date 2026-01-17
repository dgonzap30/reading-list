import { motion, AnimatePresence } from 'framer-motion';
import * as Lucide from 'lucide-react';
import { Heatmap } from './Heatmap.jsx';

export function CollapsibleHeatmap({ activityDates, isExpanded, onToggle }) {
  const activeDaysCount = Object.keys(activityDates || {}).length;

  if (isExpanded) {
    // When expanded, show full heatmap with collapse button
    return (
      <div className="space-y-4">
        <Heatmap activityDates={activityDates} />
        <button
          onClick={onToggle}
          className="w-full rounded-xl border border-white/20 bg-black p-3 text-center text-sm text-white/60 hover:bg-white/5 transition flex items-center justify-center gap-2"
        >
          <Lucide.ChevronUp className="h-4 w-4" />
          Hide activity
        </button>
      </div>
    );
  }

  // When collapsed, show summary button
  return (
    <button
      onClick={onToggle}
      className="w-full rounded-xl border border-white/20 bg-black p-5 shadow-sm hover:bg-white/[0.02] transition-colors group text-left"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5">
            <Lucide.Activity className="h-4 w-4 text-white/60" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Activity</p>
            <p className="text-sm text-white/70">
              {activeDaysCount > 0 ? (
                <>
                  <span className="text-white font-medium">{activeDaysCount}</span> active days in last 3 months
                </>
              ) : (
                <span className="text-white/50">No activity yet</span>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-white/40 group-hover:text-white/60 transition-colors hidden sm:inline">
            Show activity
          </span>
          <Lucide.ChevronDown className="h-4 w-4 text-white/40 group-hover:text-white/60 transition-colors" />
        </div>
      </div>
    </button>
  );
}
