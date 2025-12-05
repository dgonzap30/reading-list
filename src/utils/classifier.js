import { SECTIONS } from '../data/sections.js';

// Weights for keyword matches
const WEIGHTS = { high: 3, medium: 2, low: 1 };

// Minimum score threshold to suggest a section
const MIN_CONFIDENCE_THRESHOLD = 3;

// Minimum ratio between top and second suggestion to show only one
const SINGLE_SUGGESTION_RATIO = 2.0;

/**
 * Classify a note into sections based on keyword matching
 * @param {string} noteText - The user's note text
 * @returns {Array<{section: string, score: number, label: string, emoji: string, color: string, confidence: 'high'|'medium'|'low'}>}
 */
export function classifyNote(noteText) {
  if (!noteText || noteText.trim().length < 10) {
    return [];
  }

  const normalizedText = noteText.toLowerCase();
  const scores = {};

  // Calculate scores for each section
  Object.entries(SECTIONS).forEach(([sectionKey, section]) => {
    let score = 0;

    Object.entries(section.keywords).forEach(([weight, keywords]) => {
      keywords.forEach(keyword => {
        // Count occurrences (word boundary aware for multi-word phrases)
        const regex = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
        const matches = normalizedText.match(regex);
        if (matches) {
          score += matches.length * WEIGHTS[weight];
        }
      });
    });

    scores[sectionKey] = score;
  });

  // Sort by score descending
  const ranked = Object.entries(scores)
    .filter(([_, score]) => score >= MIN_CONFIDENCE_THRESHOLD)
    .sort((a, b) => b[1] - a[1])
    .map(([section, score]) => ({
      section,
      score,
      label: SECTIONS[section].label,
      emoji: SECTIONS[section].emoji,
      color: SECTIONS[section].color,
      confidence: score >= 10 ? 'high' : score >= 6 ? 'medium' : 'low'
    }));

  // Return top 2 suggestions, or just 1 if the top is significantly higher
  if (ranked.length === 0) return [];
  if (ranked.length === 1) return [ranked[0]];

  if (ranked[0].score / ranked[1].score >= SINGLE_SUGGESTION_RATIO) {
    return [ranked[0]];
  }

  return ranked.slice(0, 2);
}

/**
 * Get section metadata by key
 */
export function getSection(sectionKey) {
  return SECTIONS[sectionKey] || null;
}

/**
 * Get all section keys with metadata
 */
export function getAllSections() {
  return Object.entries(SECTIONS).map(([key, value]) => ({
    key,
    ...value
  }));
}
