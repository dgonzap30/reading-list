import { useState, useMemo } from 'react';
import * as Lucide from 'lucide-react';
import clsx from 'clsx';
import { WritingPanel } from './WritingPanel.jsx';
import { getRandomQuote } from '../data/quotes.js';
import { SECTIONS } from '../data/sections.js';

export function FictionSessionRow({
  fiction,
  weekId,
  checked,
  writing,
  onToggle,
  onSaveWriting,
  swapState,
  onSwap
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const sessionId = `w${weekId}-fiction`;

    // Determine which book is currently active (main or runnerUp)
    const isSwapped = swapState === 'runnerUp';
    const activeBook = isSwapped && fiction.runnerUp
        ? { title: fiction.runnerUp, author: fiction.author, match: `Runner-up choice for Week ${weekId}` }
        : { title: fiction.title, author: fiction.author, match: fiction.match };

    const quote = useMemo(() => getRandomQuote(activeBook.title), [activeBook.title]);

    return (
        <div
            data-session={sessionId}
            className={clsx(
                'group flex flex-col gap-3 p-4 rounded-xl border transition-all',
                checked
                    ? 'border-emerald-500/30 bg-emerald-500/5 shadow-sm'
                    : 'border-white/20 bg-black hover:border-white/20',
            )}
        >
            <div className="flex items-start gap-3">
                <button
                    type="button"
                    onClick={() => onToggle(sessionId)}
                    className={clsx(
                        'h-9 w-9 shrink-0 rounded-xl border transition flex items-center justify-center',
                        checked
                            ? 'border-emerald-400 bg-emerald-500/15 text-emerald-50'
                            : 'border-white/20 bg-black text-white/60 hover:border-white/30',
                    )}
                    aria-pressed={checked}
                    aria-label={checked ? 'Unmark fiction session' : 'Mark fiction session complete'}
                >
                    {checked ? (
                        <Lucide.CheckCircle2 className="h-5 w-5" />
                    ) : (
                        <Lucide.Circle className="h-5 w-5" />
                    )}
                </button>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-sm flex-wrap">
                        <Lucide.Sparkles className="w-4 h-4 text-emerald-400" />
                        <span className="text-white font-semibold truncate">{activeBook.title}</span>
                        <span className="text-white/50">•</span>
                        <span className="text-white/60 truncate">by {activeBook.author}</span>
                        <span className="ml-auto text-[11px] text-emerald-400/80">
                            Fiction Companion
                        </span>
                    </div>
                    <p className="mt-1 text-xs text-white/50">{activeBook.match}</p>
                    <div
                        onClick={() => setIsModalOpen(true)}
                        className="mt-3 w-full min-h-[64px] px-3 py-2 rounded-xl bg-black/30 border border-white/20 text-white/90 cursor-text hover:border-white/20 transition group"
                    >
                        {writing ? (
                            <div className="space-y-1">
                                {writing.idea && (
                                    <p className="text-xs text-white/60">
                                        {writing.idea.slice(0, 100)}{writing.idea.length > 100 ? '...' : ''}
                                    </p>
                                )}
                                {writing.sectionTag && (
                                    <span className={clsx(
                                        'inline-block text-[10px] px-2 py-0.5 rounded-full mt-1',
                                        `bg-${SECTIONS[writing.sectionTag]?.color}-500/20 text-${SECTIONS[writing.sectionTag]?.color}-300`
                                    )}>
                                        {SECTIONS[writing.sectionTag]?.label}
                                    </span>
                                )}
                            </div>
                        ) : (
                            <p className="text-white/40 text-sm">Capture your insights...</p>
                        )}
                    </div>

                    <WritingPanel
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        sessionId={sessionId}
                        bookTitle={activeBook.title}
                        domain="Vision / Fiction"
                        existingWriting={writing}
                        onSave={onSaveWriting}
                        quote={quote}
                        sourceType="fiction"
                    />
                </div>
            </div>
            <div className="flex flex-wrap gap-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                {fiction.runnerUp && (
                    <button
                        type="button"
                        onClick={() => onSwap(weekId)}
                        className="inline-flex items-center gap-1 rounded-lg border border-white/20 px-3 py-1 text-white/70 hover:border-white/30 hover:text-white/90 transition"
                    >
                        <Lucide.Repeat className="h-3.5 w-3.5" />
                        {isSwapped ? `Swap to ${fiction.title}` : `Swap to ${fiction.runnerUp}`}
                    </button>
                )}
                {!checked && (
                    <button
                        type="button"
                        onClick={() => onToggle(sessionId)}
                        className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/15 px-3 py-1 text-emerald-200 hover:bg-emerald-500/20 transition"
                    >
                        <Lucide.Check className="h-3.5 w-3.5" />
                        Mark done
                    </button>
                )}
            </div>
        </div>
    );
}
