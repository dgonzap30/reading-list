/**
 * Create a new fragment from session writing
 */
export function createFragment(sessionId, content, sectionTag, book, weekId, sourceType = 'nonfiction', sourceChapter = null, sourcePage = null) {
  const id = `frag-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const now = new Date().toISOString();

  return {
    id,
    content,
    status: 'Needs Work',
    sourceSessionId: sessionId,
    sourceBook: book,
    sourceType,
    sourceChapter,
    sourcePage,
    sectionTag,
    weekId,
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * Get fragments created during a specific week
 */
export function getWeeklyFragments(fragments, weekId) {
  return Object.values(fragments)
    .filter(f => f.weekId === weekId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

/**
 * Get all non-discarded fragments
 */
export function getActiveFragments(fragments) {
  return Object.values(fragments)
    .filter(f => f.status !== 'Discard')
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

/**
 * Search fragments by text content
 */
export function searchFragments(fragments, query) {
  if (!query || query.trim().length === 0) {
    return getActiveFragments(fragments);
  }

  const normalizedQuery = query.toLowerCase();
  return Object.values(fragments)
    .filter(f => {
      if (f.status === 'Discard') return false;
      const contentMatch = f.content.toLowerCase().includes(normalizedQuery);
      const bookMatch = f.sourceBook.toLowerCase().includes(normalizedQuery);
      return contentMatch || bookMatch;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}
