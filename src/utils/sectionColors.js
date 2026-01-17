/**
 * Static Tailwind class mappings for section colors.
 * Required because dynamic class strings like `bg-${color}-500` won't work with Tailwind JIT.
 */

export const SECTION_COLOR_CLASSES = {
  rose: {
    bg: 'bg-rose-500/20',
    bgMedium: 'bg-rose-500/30',
    text: 'text-rose-300',
    textLight: 'text-rose-100',
    border: 'border-rose-500/60',
    borderLeft: 'border-l-rose-500/60',
    ring: 'ring-rose-500/20',
  },
  amber: {
    bg: 'bg-amber-500/20',
    bgMedium: 'bg-amber-500/30',
    text: 'text-amber-300',
    textLight: 'text-amber-100',
    border: 'border-amber-500/60',
    borderLeft: 'border-l-amber-500/60',
    ring: 'ring-amber-500/20',
  },
  sky: {
    bg: 'bg-sky-500/20',
    bgMedium: 'bg-sky-500/30',
    text: 'text-sky-300',
    textLight: 'text-sky-100',
    border: 'border-sky-500/60',
    borderLeft: 'border-l-sky-500/60',
    ring: 'ring-sky-500/20',
  },
  emerald: {
    bg: 'bg-emerald-500/20',
    bgMedium: 'bg-emerald-500/30',
    text: 'text-emerald-300',
    textLight: 'text-emerald-100',
    border: 'border-emerald-500/60',
    borderLeft: 'border-l-emerald-500/60',
    ring: 'ring-emerald-500/20',
  },
  violet: {
    bg: 'bg-violet-500/20',
    bgMedium: 'bg-violet-500/30',
    text: 'text-violet-300',
    textLight: 'text-violet-100',
    border: 'border-violet-500/60',
    borderLeft: 'border-l-violet-500/60',
    ring: 'ring-violet-500/20',
  },
  // Status colors
  red: {
    bg: 'bg-red-500/20',
    text: 'text-red-300',
  },
  gray: {
    bg: 'bg-gray-500/20',
    text: 'text-gray-300',
    borderLeft: 'border-l-gray-500/60',
  },
  // Additional colors from STATES
  zinc: {
    bg: 'bg-zinc-500/20',
    bgMedium: 'bg-zinc-500/30',
    text: 'text-zinc-300',
    textLight: 'text-zinc-100',
    border: 'border-zinc-500/60',
    borderLeft: 'border-l-zinc-500/60',
    ring: 'ring-zinc-500/20',
  },
};

/**
 * Get static Tailwind classes for a given color.
 * @param {string} color - Color name (e.g., 'rose', 'amber')
 * @returns {object} Object containing static class strings
 */
export const getSectionClasses = (color) => {
  return SECTION_COLOR_CLASSES[color] || SECTION_COLOR_CLASSES.gray;
};
