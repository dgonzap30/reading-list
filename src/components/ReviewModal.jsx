import { useState, useEffect } from 'react';
import * as Lucide from 'lucide-react';
import { PLAN } from '../data/plan.js';
import { Modal } from './Modal.jsx';

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
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Spaced Review"
            icon={Lucide.Repeat}
        >
            {reviewItem ? (
                <div className="space-y-6">
                    <div>
                        <p className="text-xs uppercase tracking-wider text-white/40 mb-1">From Week {reviewItem.weekId}</p>
                        <h4 className="text-xl font-medium text-white">{reviewItem.book}</h4>
                        <p className="text-sm text-white/60">{reviewItem.details}</p>
                    </div>

                    <div className="relative">
                        <div className="absolute -left-3 top-0 bottom-0 w-1 bg-gradient-to-b from-white/20 to-transparent rounded-full" />
                        <div className="pl-4">
                            <p className="text-white/90 italic leading-relaxed">"{reviewItem.note}"</p>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-white/5">
                        <p className="text-sm font-medium text-white/60 mb-2">Reflection Prompt</p>
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
        </Modal>
    );
}
