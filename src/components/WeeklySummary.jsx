import { useState, useEffect, useMemo } from 'react';
import * as Lucide from 'lucide-react';
import clsx from 'clsx';
import { Modal } from './Modal.jsx';
import { SECTIONS } from '../data/sections.js';

export function WeeklySummary({
  isOpen,
  onClose,
  weekId,
  fragments,
  existingSummary,
  onSave
}) {
  const [reflection, setReflection] = useState('');
  const [customThemes, setCustomThemes] = useState([]);
  const [newTheme, setNewTheme] = useState('');

  useEffect(() => {
    if (existingSummary) {
      setReflection(existingSummary.reflection || '');
      setCustomThemes(existingSummary.themes || []);
    } else {
      setReflection('');
      setCustomThemes([]);
    }
  }, [existingSummary, weekId]);

  // Detect themes from fragments
  const detectedThemes = useMemo(() => {
    if (fragments.length === 0) return [];

    // Simple word frequency analysis
    const words = fragments
      .map(f => f.content.toLowerCase())
      .join(' ')
      .split(/\s+/)
      .filter(w => w.length > 4); // Only words > 4 chars

    // Count frequencies
    const freq = {};
    words.forEach(word => {
      freq[word] = (freq[word] || 0) + 1;
    });

    // Get top 5 recurring words (min 2 occurrences)
    return Object.entries(freq)
      .filter(([_, count]) => count >= 2)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word]) => word);
  }, [fragments]);

  const handleAddTheme = () => {
    if (newTheme.trim() && !customThemes.includes(newTheme.trim())) {
      setCustomThemes([...customThemes, newTheme.trim()]);
      setNewTheme('');
    }
  };

  const handleRemoveTheme = (theme) => {
    setCustomThemes(customThemes.filter(t => t !== theme));
  };

  const handleSave = () => {
    const summary = {
      reflection: reflection.trim(),
      themes: customThemes,
      completedAt: new Date().toISOString(),
    };
    onSave(weekId, summary);
    onClose();
  };

  const canSave = reflection.trim().length > 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={canSave ? handleSave : onClose}
      title={`Week ${weekId} Summary`}
      size="large"
    >
      <div className="space-y-6">
        {/* Reflection */}
        <div className="space-y-2">
          <label className="flex items-center justify-between">
            <span className="text-sm font-medium text-white/80">
              What shifted in me this week?
            </span>
            <span className="text-xs text-white/40">
              {reflection.length} characters
            </span>
          </label>
          <textarea
            autoFocus
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="Reflect on how your thinking evolved this week..."
            className="w-full min-h-[120px] p-4 rounded-xl bg-black/30 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none text-sm leading-relaxed"
            rows={5}
          />
        </div>

        {/* Fragments from this week */}
        {fragments.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-white/80 flex items-center gap-2">
              <Lucide.FileText className="h-4 w-4" />
              Fragments from this week ({fragments.length})
            </h3>
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {fragments.map((fragment) => {
                const section = SECTIONS[fragment.sectionTag];
                const Icon = section ? Lucide[section.icon] : null;

                return (
                  <div
                    key={fragment.id}
                    className={clsx(
                      'p-3 rounded-xl bg-white/5 border',
                      `border-${section?.color}-500/20`
                    )}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {Icon && <Icon className="h-3 w-3 text-white/40" />}
                      <span className="text-xs text-white/60">{section?.label}</span>
                      <span className="text-xs text-white/40">•</span>
                      <span className="text-xs text-white/60 truncate">{fragment.sourceBook}</span>
                    </div>
                    <p className="text-white/80 text-sm line-clamp-2">
                      {fragment.content}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Detected Themes */}
        {detectedThemes.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-white/80 flex items-center gap-2">
              <Lucide.Sparkles className="h-4 w-4" />
              Detected patterns
            </h3>
            <div className="flex flex-wrap gap-2">
              {detectedThemes.map((theme) => (
                <span
                  key={theme}
                  className="px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs"
                >
                  {theme}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Custom Themes */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-white/80">
            Add your own themes
          </h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={newTheme}
              onChange={(e) => setNewTheme(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTheme()}
              placeholder="e.g., responsibility, control..."
              className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />
            <button
              type="button"
              onClick={handleAddTheme}
              className="px-4 py-2 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 transition"
            >
              Add
            </button>
          </div>

          {customThemes.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {customThemes.map((theme) => (
                <span
                  key={theme}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs"
                >
                  {theme}
                  <button
                    type="button"
                    onClick={() => handleRemoveTheme(theme)}
                    className="hover:text-emerald-100"
                  >
                    <Lucide.X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-white/10 text-white/70 hover:bg-white/5 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!canSave}
            className="px-6 py-2 rounded-xl bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Lucide.Check className="h-4 w-4" />
            Save Summary
          </button>
        </div>
      </div>
    </Modal>
  );
}
