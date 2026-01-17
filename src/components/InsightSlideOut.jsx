import { WritingPanel } from './WritingPanel.jsx';

/**
 * InsightSlideOut: A wrapper around WritingPanel
 * On desktop: Could slide from right (future enhancement)
 * On mobile: Full-screen modal (current behavior)
 *
 * For now, this just wraps WritingPanel to maintain consistency
 * with the new component architecture.
 */
export function InsightSlideOut({
  isOpen,
  onClose,
  session,
  state,
  onSave
}) {
  if (!session) return null;

  const existingWriting = state.writings[session.id];
  const quote = null; // Could integrate quotes here

  return (
    <WritingPanel
      isOpen={isOpen}
      onClose={onClose}
      sessionId={session.id}
      bookTitle={session.book}
      domain={session.domain}
      existingWriting={existingWriting}
      onSave={onSave}
      quote={quote}
      sourceType="nonfiction"
    />
  );
}
