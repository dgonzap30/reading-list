import { motion, AnimatePresence } from 'framer-motion';
import * as Lucide from 'lucide-react';
import { useEffect } from 'react';
import clsx from 'clsx';

export function Modal({ isOpen, onClose, title, children, prompt, size = 'default' }) {
    // Close on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    const sizeClasses = {
        default: 'max-w-2xl',
        large: 'max-w-4xl',
        fullscreen: 'max-w-full h-full m-0 rounded-none'
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className={clsx('w-full pointer-events-auto flex flex-col', sizeClasses[size])}
                            style={{ maxHeight: 'calc(100vh - 2rem)' }}
                        >
                            <div className="relative flex flex-col rounded-3xl border border-white/10 bg-[#0A0A0A] shadow-2xl overflow-hidden">
                                {/* Header */}
                                <div className="flex items-center justify-between border-b border-white/5 px-6 py-4 shrink-0">
                                    <h3 className="text-lg font-semibold text-white">{title}</h3>
                                    <button
                                        onClick={onClose}
                                        className="rounded-full p-2 text-white/50 transition hover:bg-white/5 hover:text-white"
                                    >
                                        <Lucide.X className="h-5 w-5" />
                                    </button>
                                </div>

                                {/* Content - Scrollable */}
                                <div className="p-6 overflow-y-auto flex-1">
                                    {prompt && (
                                        <div className="mb-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-4">
                                            <div className="flex items-start gap-3">
                                                <Lucide.Sparkles className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">Spark</p>
                                                    <p className="text-emerald-100/90 text-sm leading-relaxed">{prompt}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {children}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
