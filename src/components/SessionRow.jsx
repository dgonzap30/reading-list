import * as Lucide from 'lucide-react';
import clsx from 'clsx';
import { DOMAIN } from '../data/plan.js';
import { getDomainTheme } from '../utils/domainTheme.js';

export function SessionRow({ session, checked, note, onToggle, onSaveNote, onStartTimer }) {
    const Icon = DOMAIN[session.domain]?.icon || Lucide.Book;
    const theme = getDomainTheme(session.domain);

    return (
        <div
            data-session={session.id}
            className={clsx(
                'flex flex-col gap-3 p-4 rounded-2xl border transition-all bg-white/5',
                checked
                    ? 'border-emerald-500/40 shadow-[0_10px_30px_rgba(16,185,129,0.15)]'
                    : 'border-white/10 hover:border-white/25',
            )}
        >
            <div className="flex items-start gap-3">
                <button
                    type="button"
                    onClick={() => onToggle(session.id)}
                    className={clsx(
                        'h-9 w-9 shrink-0 rounded-2xl border transition flex items-center justify-center',
                        checked
                            ? 'border-emerald-400 bg-emerald-500/20 text-emerald-50'
                            : 'border-white/15 bg-white/5 text-white/70 hover:border-white/40',
                    )}
                    aria-pressed={checked}
                    aria-label={checked ? 'Unmark session' : 'Mark session complete'}
                >
                    {checked ? (
                        <Lucide.CheckCircle2 className="h-5 w-5" />
                    ) : (
                        <Lucide.Circle className="h-5 w-5" />
                    )}
                </button>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-sm flex-wrap">
                        <Icon className={clsx('w-4 h-4', theme.icon)} />
                        <span className="text-white font-semibold truncate">{session.book}</span>
                        <span className="text-white/50">•</span>
                        <span className="text-white/70 truncate">{session.details}</span>
                        <span className={clsx('ml-auto text-[11px] px-2 py-0.5 rounded-full', theme.pill)}>
                            {session.domain}
                        </span>
                    </div>
                    <textarea
                        value={note || ''}
                        onChange={(event) => onSaveNote(session.id, event.target.value)}
                        placeholder="Drop one idea, one question, one application…"
                        className="mt-3 w-full min-h-[64px] px-3 py-2 rounded-xl bg-black/30 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                </div>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
                <button
                    type="button"
                    onClick={() => onStartTimer?.(session, 25 * 60)}
                    className="inline-flex items-center gap-1 rounded-2xl border border-white/15 px-3 py-1 text-white/80 hover:border-white/40"
                >
                    <Lucide.Timer className="h-3.5 w-3.5" />
                    Kick off 25
                </button>
                {!checked && (
                    <button
                        type="button"
                        onClick={() => onToggle(session.id)}
                        className="inline-flex items-center gap-1 rounded-2xl bg-emerald-500/20 px-3 py-1 text-emerald-50 shadow-[0_8px_25px_rgba(16,185,129,0.35)] hover:bg-emerald-500/30"
                    >
                        <Lucide.Check className="h-3.5 w-3.5" />
                        Mark done
                    </button>
                )}
            </div>
        </div>
    );
}
