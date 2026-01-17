import { motion, AnimatePresence } from 'framer-motion';
import * as Lucide from 'lucide-react';
import { useEffect } from 'react';
import clsx from 'clsx';
import { useEscapeKey } from '../hooks/useEscapeKey.js';

export function Modal({ isOpen, onClose, title, children, prompt, size = 'default', icon: Icon }) {
    // Close on escape key
    useEscapeKey(onClose, isOpen);

    // Manage body overflow
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

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
                            <div className="relative flex flex-col rounded-xl border border-white/20 bg-black shadow-2xl overflow-hidden">
                                {/* Header */}
                                <div className="flex items-center justify-between border-b border-white/5 px-6 py-4 shrink-0">
                                    <div className="flex items-center gap-2">
                                        {Icon && (
                                            <div className="p-1.5 rounded-lg bg-white/[0.03] text-white/50">
                                                <Icon className="h-4 w-4" />
                                            </div>
                                        )}
                                        <h3 className="text-lg font-semibold text-white">{title}</h3>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="rounded-full p-2 text-white/50 transition hover:bg-black hover:text-white"
                                        aria-label="Close modal"
                                    >
                                        <Lucide.X className="h-5 w-5" />
                                    </button>
                                </div>

                                {/* Content - Scrollable */}
                                <div className="p-6 overflow-y-auto flex-1">
                                    {prompt && (
                                        <div className="mb-4 rounded-xl bg-black border border-white/20 p-4">
                                            <div className="flex items-start gap-3">
                                                <Lucide.Sparkles className="h-5 w-5 text-white/50 shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="text-xs font-bold uppercase tracking-wider text-white/50 mb-1">Spark</p>
                                                    <p className="text-white/80 text-sm leading-relaxed">{prompt}</p>
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
