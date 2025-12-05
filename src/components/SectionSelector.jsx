import clsx from 'clsx';
import * as Lucide from 'lucide-react';
import { SECTIONS } from '../data/sections.js';

export function SectionSelector({ selected, onSelect, suggestions = [], className }) {
  const sectionKeys = Object.keys(SECTIONS);

  // Check if a section is suggested
  const isSuggested = (key) => {
    return suggestions.some(s => s.section === key);
  };

  // Get suggestion confidence if this section is suggested
  const getSuggestionConfidence = (key) => {
    const suggestion = suggestions.find(s => s.section === key);
    return suggestion?.confidence;
  };

  return (
    <div className={clsx('space-y-2', className)}>
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium uppercase tracking-wider text-white/60">
          Section Tag
        </label>
        {suggestions.length > 0 && (
          <span className="text-xs text-emerald-400">
            ✨ Auto-suggested
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {sectionKeys.map((key) => {
          const section = SECTIONS[key];
          const isSelected = selected === key;
          const suggested = isSuggested(key);
          const confidence = getSuggestionConfidence(key);
          const Icon = Lucide[section.icon];

          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelect(key)}
              className={clsx(
                'inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all',
                isSelected ? [
                  `bg-${section.color}-500/30 text-${section.color}-100`,
                  `border-2 border-${section.color}-500/60`,
                  `ring-2 ring-${section.color}-500/20`,
                ] : [
                  'bg-white/5 text-white/70 border border-white/10',
                  'hover:bg-white/10 hover:border-white/20',
                ],
                suggested && !isSelected && 'ring-2 ring-emerald-500/30 border-emerald-500/50'
              )}
            >
              {Icon && <Icon className="h-4 w-4" />}
              <span>{section.label}</span>
              {suggested && !isSelected && confidence === 'high' && (
                <span className="text-xs text-emerald-400">✓</span>
              )}
            </button>
          );
        })}
      </div>

      {suggestions.length > 0 && (
        <p className="text-xs text-white/50">
          Based on your writing, we suggest: {suggestions.map(s => s.label).join(' or ')}
        </p>
      )}
    </div>
  );
}
