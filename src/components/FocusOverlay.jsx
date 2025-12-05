import { motion, AnimatePresence } from 'framer-motion';
import * as Lucide from 'lucide-react';
import { useEffect, useState } from 'react';

export function FocusOverlay({ sessionTicker, onStop, onSaveNote, initialNote }) {
    const [note, setNote] = useState(initialNote || '');

    // Sync local note state if initialNote changes (though usually it won't change mid-session)
    useEffect(() => {
        if (initialNote) setNote(initialNote);
    }, [initialNote]);

    const handleSave = (val) => {
        setNote(val);
        if (sessionTicker?.sessionId && sessionTicker.sessionId !== 'manual') {
            onSaveNote(sessionTicker.sessionId, val);
        }
    };

    if (!sessionTicker) return null;

    const minutes = Math.floor(sessionTicker.remaining / 60);
    const seconds = sessionTicker.remaining % 60;
    const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl text-white"
        >
            <div className="w-full max-w-3xl px-6 flex flex-col items-center gap-12">
                {/* Timer Display */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/60">
                        <Lucide.Orbit className="h-4 w-4 animate-spin-slow" />
                        <span>Focus Mode Active</span>
                    </div>
                    <h1 className="text-[120px] font-bold leading-none tracking-tight font-mono tabular-nums text-white">
                        {timeString}
                    </h1>
                    <p className="text-2xl text-white/50 font-medium">{sessionTicker.label}</p>
                </div>

                {/* Note Input (Only if linked to a session) */}
                {sessionTicker.sessionId !== 'manual' && (
                    <div className="w-full space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                        <div className="relative">
                            <textarea
                                value={note}
                                onChange={(e) => handleSave(e.target.value)}
                                placeholder="Capture thoughts as they come..."
                                className="w-full h-48 rounded-2xl bg-white/5 border border-white/10 p-6 text-lg text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none"
                            />
                            <div className="absolute bottom-4 right-4 text-xs text-white/30">
                                Auto-saving
                            </div>
                        </div>
                    </div>
                )}

                {/* Controls */}
                <button
                    onClick={onStop}
                    className="group flex items-center gap-3 rounded-full bg-white/10 px-8 py-4 text-lg font-medium text-white transition hover:bg-red-500/20 hover:text-red-200"
                >
                    <Lucide.Square className="h-5 w-5 fill-current" />
                    Stop Session
                </button>
            </div>
        </motion.div>
    );
}
