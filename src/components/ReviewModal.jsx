import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Lucide from 'lucide-react';
import { PLAN } from '../data/plan.js';

export function ReviewModal({ isOpen, onClose, notes }) {
    const [reviewItem, setReviewItem] = useState(null);

    useEffect(() => {
        if (isOpen) {
            // Find all sessions with notes
            const sessionsWithNotes = [];
            PLAN.weeks.forEach(week => {
                week.sessions.forEach(session => {
                    if (notes[session.id] && notes[session.id].length > 10) {
                        sessionsWithNotes.push({
                            ...session,
                            note: notes[session.id],
                            weekId: week.id
                        });
                    }
                });
            });

            if (sessionsWithNotes.length > 0) {
                const random = sessionsWithNotes[Math.floor(Math.random() * sessionsWithNotes.length)];
                setReviewItem(random);
            } else {
                setReviewItem(null);
            }
        }
    }, [isOpen, notes]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                    />
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="w-full max-w-lg pointer-events-auto"
                        >
                            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0A0A0A] shadow-2xl">
                                <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-300">
                                            <Lucide.Repeat className="h-4 w-4" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-white">Spaced Review</h3>
                                    </div>
                                    <button onClick={onClose} className="rounded-full p-2 text-white/50 hover:bg-white/5 hover:text-white">
                                        <Lucide.X className="h-5 w-5" />
                                    </button>
                                </div>

                                <div className="p-6">
                                    {reviewItem ? (
                                        <div className="space-y-6">
                                            <div>
                                                <p className="text-xs uppercase tracking-wider text-white/40 mb-1">From Week {reviewItem.weekId}</p>
                                                <h4 className="text-xl font-medium text-white">{reviewItem.book}</h4>
                                                <p className="text-sm text-white/60">{reviewItem.details}</p>
                                            </div>

                                            <div className="relative">
                                                <div className="absolute -left-3 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500/50 to-transparent rounded-full" />
                                                <div className="pl-4">
                                                    <p className="text-white/90 italic leading-relaxed">"{reviewItem.note}"</p>
                                                </div>
                                            </div>

                                            <div className="pt-4 border-t border-white/5">
                                                <p className="text-sm font-medium text-indigo-300 mb-2">Reflection Prompt</p>
                                                <p className="text-white/70 text-sm">How does this insight apply to your current challenges today?</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 text-white/50">
                                            <Lucide.BookOpen className="h-12 w-12 mx-auto mb-3 opacity-20" />
                                            <p>No notes found to review yet.</p>
                                            <p className="text-sm mt-2">Start taking notes in your sessions to build your library.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
