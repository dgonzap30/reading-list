/**
 * Create a new fragment from session writing
 */
export function createFragment(sessionId, content, sectionTag, book, weekId) {
  const id = `frag-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const now = new Date().toISOString();

  return {
    id,
    content,
    status: 'Needs Work',
    sourceSessionId: sessionId,
    sourceBook: book,
    sectionTag,
    weekId,
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * Get all fragments filtered by section tag
 */
export function getFragmentsBySection(fragments, sectionTag) {
  return Object.values(fragments)
    .filter(f => f.sectionTag === sectionTag && f.status !== 'Discard')
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

/**
 * Get all fragments for a specific book
 */
export function getFragmentsByBook(fragments, bookTitle) {
  return Object.values(fragments)
    .filter(f => f.sourceBook === bookTitle && f.status !== 'Discard')
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
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
 * Get fragments by status
 */
export function getFragmentsByStatus(fragments, status) {
  return Object.values(fragments)
    .filter(f => f.status === status)
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
 * Get fragment statistics
 */
export function getFragmentStats(fragments) {
  const all = Object.values(fragments);
  return {
    total: all.length,
    final: all.filter(f => f.status === 'Final').length,
    needsWork: all.filter(f => f.status === 'Needs Work').length,
    discarded: all.filter(f => f.status === 'Discard').length,
    bySection: all.reduce((acc, f) => {
      acc[f.sectionTag] = (acc[f.sectionTag] || 0) + 1;
      return acc;
    }, {}),
  };
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
