import { useState, useEffect } from 'react';
import * as Lucide from 'lucide-react';
import { Modal } from './Modal.jsx';

export function CustomEntryModal({ isOpen, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [captureInsight, setCaptureInsight] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      // Reset form when modal closes
      setTitle('');
      setCaptureInsight(false);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave(title.trim(), captureInsight);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Log a custom entry"
    >
      <p className="text-white/60 text-sm mb-6">
        Track reading outside your plan
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* Title Input */}
        <div className="mb-4">
          <label htmlFor="custom-title" className="block text-sm font-medium text-white/80 mb-2">
            What did you read?
          </label>
          <input
            id="custom-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Deep Work by Cal Newport"
            autoFocus
            className="w-full rounded-xl border border-white/20 bg-white/[0.03] px-4 py-3 text-white placeholder:text-white/40 focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>

        {/* Insight Toggle */}
        <div className="mb-6">
          <button
            type="button"
            onClick={() => setCaptureInsight(!captureInsight)}
            className="flex w-full items-center justify-between rounded-xl border border-white/20 bg-white/[0.03] px-4 py-3 text-left transition hover:border-white/30 hover:bg-white/[0.05]"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-white/[0.05] p-2">
                <Lucide.Sparkles className="h-4 w-4 text-white/60" />
              </div>
              <span className="text-sm text-white/80">Add insight after saving</span>
            </div>
            <div className={`h-5 w-9 rounded-full transition ${captureInsight ? 'bg-emerald-500' : 'bg-white/20'}`}>
              <div className={`h-5 w-5 rounded-full bg-white shadow-sm transition ${captureInsight ? 'translate-x-4' : 'translate-x-0'}`} />
            </div>
          </button>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-white/20 bg-transparent px-4 py-2.5 text-sm text-white/60 transition hover:border-white/30 hover:text-white/80"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!title.trim()}
            className="flex-1 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2.5 text-sm font-medium text-emerald-400 transition hover:bg-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-emerald-500/10"
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
}
