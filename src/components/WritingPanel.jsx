import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Lucide from 'lucide-react';
import { Modal } from './Modal.jsx';
import { SectionSelector } from './SectionSelector.jsx';
import { CompanionQuote } from './CompanionQuote.jsx';
import { classifyNote } from '../utils/classifier.js';

export function WritingPanel({
  isOpen,
  onClose,
  sessionId,
  bookTitle,
  domain,
  existingWriting,
  onSave,
  quote,
  sourceType = 'nonfiction'
}) {
  const [idea, setIdea] = useState('');
  const [question, setQuestion] = useState('');
  const [application, setApplication] = useState('');
  const [sectionTag, setSectionTag] = useState(null);
  const [fragment, setFragment] = useState('');
  const [showFragment, setShowFragment] = useState(false);
  const [showQuote, setShowQuote] = useState(true);
  const [sourceChapter, setSourceChapter] = useState('');
  const [sourcePage, setSourcePage] = useState('');

  // Load existing writing
  useEffect(() => {
    if (existingWriting) {
      setIdea(existingWriting.idea || '');
      setQuestion(existingWriting.question || '');
      setApplication(existingWriting.application || '');
      setSectionTag(existingWriting.sectionTag || null);
      setFragment(existingWriting.fragment || '');
      setShowFragment(!!existingWriting.fragment);
      setSourceChapter(existingWriting.sourceChapter || '');
      setSourcePage(existingWriting.sourcePage || '');
    } else {
      // Reset when opening new writing
      setIdea('');
      setQuestion('');
      setApplication('');
      setSectionTag(null);
      setFragment('');
      setShowFragment(false);
      setSourceChapter('');
      setSourcePage('');
    }
  }, [existingWriting, sessionId]);

  // Auto-classify section based on combined text
  const suggestions = useMemo(() => {
    const combinedText = [idea, question, application].join(' ');
    if (combinedText.trim().length > 30) {
      return classifyNote(combinedText);
    }
    return [];
  }, [idea, question, application]);

  // Auto-select first suggestion if no section selected
  useEffect(() => {
    if (!sectionTag && suggestions.length > 0) {
      setSectionTag(suggestions[0].section);
    }
  }, [suggestions, sectionTag]);

  const handleSave = () => {
    const writing = {
      idea: idea.trim(),
      question: question.trim(),
      application: application.trim(),
      sectionTag,
      fragment: fragment.trim(),
      sourceType,
      sourceChapter: sourceChapter.trim() || null,
      sourcePage: sourcePage.trim() || null,
      updatedAt: new Date().toISOString(),
      createdAt: existingWriting?.createdAt || new Date().toISOString(),
    };

    onSave(sessionId, writing);
    onClose();
  };

  const handleUseQuote = (q) => {
    setIdea(prev => prev ? `${prev}\n\n"${q.text}"\n\n` : `"${q.text}"\n\n`);
    setShowQuote(false);
  };

  const canSave = idea.trim().length > 0;
  const wordCount = fragment.trim().split(/\s+/).filter(w => w.length > 0).length;

  return (
    <Modal
      isOpen={isOpen}
      onClose={canSave ? handleSave : onClose}
      title={`Reflect on ${bookTitle}`}
      size="large"
    >
      <div className="space-y-4">
        {/* Companion Quote */}
        {quote && showQuote && (
          <CompanionQuote
            quote={quote}
            onUseQuote={handleUseQuote}
            onDismiss={() => setShowQuote(false)}
          />
        )}

        {/* Source Details (Chapter/Page) */}
        <div className="flex gap-3">
          <div className="flex-1 space-y-1">
            <label className="text-xs text-white/60">Chapter (optional)</label>
            <input
              type="text"
              value={sourceChapter}
              onChange={(e) => setSourceChapter(e.target.value)}
              placeholder="e.g., Ch. 3"
              className="w-full p-2 rounded-lg bg-black/30 border border-white/20 text-white text-sm placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="flex-1 space-y-1">
            <label className="text-xs text-white/60">Page (optional)</label>
            <input
              type="text"
              value={sourcePage}
              onChange={(e) => setSourcePage(e.target.value)}
              placeholder="e.g., p. 42"
              className="w-full p-2 rounded-lg bg-black/30 border border-white/20 text-white text-sm placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Idea */}
        <div className="space-y-2">
          <label className="flex items-center justify-between">
            <span className="text-sm font-medium text-white/80">
              Idea
            </span>
            <span className="text-xs text-white/40">
              1-2 sentences: what stood out?
            </span>
          </label>
          <textarea
            autoFocus
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="What's one insight from this reading?"
            className="w-full min-h-[80px] p-3 rounded-xl bg-black/30 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none text-sm leading-relaxed"
            rows={3}
          />
        </div>

        {/* Question */}
        <div className="space-y-2">
          <label className="flex items-center justify-between">
            <span className="text-sm font-medium text-white/80">
              Question
            </span>
            <span className="text-xs text-white/40">
              1 sentence: what does this make you wonder?
            </span>
          </label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="What does this text make you wonder about?"
            className="w-full min-h-[60px] p-3 rounded-xl bg-black/30 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none text-sm leading-relaxed"
            rows={2}
          />
        </div>

        {/* Application */}
        <div className="space-y-2">
          <label className="flex items-center justify-between">
            <span className="text-sm font-medium text-white/80">
              Application
            </span>
            <span className="text-xs text-white/40">
              1 sentence: how does this show up in your life?
            </span>
          </label>
          <textarea
            value={application}
            onChange={(e) => setApplication(e.target.value)}
            placeholder="How does this connect to your thinking or experience?"
            className="w-full min-h-[60px] p-3 rounded-xl bg-black/30 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none text-sm leading-relaxed"
            rows={2}
          />
        </div>

        {/* Section Selector */}
        <SectionSelector
          selected={sectionTag}
          onSelect={setSectionTag}
          suggestions={suggestions}
        />

        {/* Fragment Toggle */}
        <div className="pt-4 border-t border-white/20">
          <button
            type="button"
            onClick={() => setShowFragment(!showFragment)}
            className="flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white/80 transition"
          >
            {showFragment ? (
              <>
                <Lucide.ChevronUp className="h-4 w-4" />
                Hide polished fragment
              </>
            ) : (
              <>
                <Lucide.Sparkles className="h-4 w-4" />
                Polish into fragment
              </>
            )}
          </button>
        </div>

        {/* Fragment Editor */}
        <AnimatePresence>
          {showFragment && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2"
            >
              <label className="flex items-center justify-between">
                <span className="text-sm font-medium text-white/60">
                  Polished Fragment
                </span>
                <span className="text-xs text-white/40">
                  {wordCount} words
                </span>
              </label>
              <textarea
                value={fragment}
                onChange={(e) => setFragment(e.target.value)}
                placeholder="Refine your thinking into a clean, book-voice fragment..."
                className="w-full min-h-[120px] p-4 rounded-xl bg-black border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none text-sm leading-relaxed"
                rows={5}
              />
              <p className="text-xs text-white/50">
                This becomes a draft fragment in your book archive
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-white/20 text-white/70 hover:bg-black transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!canSave}
            className="px-6 py-2 rounded-xl bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Lucide.Save className="h-4 w-4" />
            Save Writing
          </button>
        </div>
      </div>
    </Modal>
  );
}
