const visionKey = 'Vision / Fiction';

export const DOMAIN_THEMES = {
  default: {
    pill: 'bg-white/5 border border-white/10 text-white/80',
    icon: 'text-white',
    halo: 'from-indigo-400/20 via-transparent to-transparent',
    filter: 'bg-white/5 border border-white/15 text-white/80',
    chip: 'bg-white/5 text-white/80',
  },
  'Systems/Tech': {
    pill: 'bg-emerald-500/15 border border-emerald-400/50 text-emerald-100',
    icon: 'text-emerald-200',
    halo: 'from-emerald-500/25 via-emerald-500/5 to-transparent',
    filter: 'bg-emerald-500/20 border border-emerald-400/60 text-emerald-50 shadow-[0_6px_30px_rgba(16,185,129,0.35)]',
    chip: 'bg-emerald-500/15 text-emerald-100',
  },
  'Human/EQ': {
    pill: 'bg-rose-500/15 border border-rose-400/40 text-rose-100',
    icon: 'text-rose-200',
    halo: 'from-rose-500/25 via-rose-500/5 to-transparent',
    filter: 'bg-rose-500/20 border border-rose-400/60 text-rose-50 shadow-[0_6px_30px_rgba(244,63,94,0.35)]',
    chip: 'bg-rose-500/15 text-rose-100',
  },
  'Creative/Craft': {
    pill: 'bg-amber-500/15 border border-amber-400/50 text-amber-100',
    icon: 'text-amber-200',
    halo: 'from-amber-500/25 via-amber-500/5 to-transparent',
    filter: 'bg-amber-500/20 border border-amber-400/60 text-amber-900 shadow-[0_6px_30px_rgba(245,158,11,0.35)]',
    chip: 'bg-amber-500/15 text-amber-900',
  },
  'Society/Philosophy': {
    pill: 'bg-sky-500/15 border border-sky-400/50 text-sky-100',
    icon: 'text-sky-200',
    halo: 'from-sky-500/25 via-sky-500/5 to-transparent',
    filter: 'bg-sky-500/20 border border-sky-400/60 text-sky-50 shadow-[0_6px_30px_rgba(14,165,233,0.35)]',
    chip: 'bg-sky-500/15 text-sky-100',
  },
  'Founder/Strategy': {
    pill: 'bg-indigo-500/15 border border-indigo-400/50 text-indigo-100',
    icon: 'text-indigo-200',
    halo: 'from-indigo-500/25 via-indigo-500/5 to-transparent',
    filter: 'bg-indigo-500/20 border border-indigo-400/60 text-indigo-50 shadow-[0_6px_30px_rgba(99,102,241,0.35)]',
    chip: 'bg-indigo-500/15 text-indigo-100',
  },
  [visionKey]: {
    pill: 'bg-violet-500/15 border border-violet-400/50 text-violet-100',
    icon: 'text-violet-200',
    halo: 'from-violet-500/25 via-violet-500/5 to-transparent',
    filter: 'bg-violet-500/20 border border-violet-400/60 text-violet-50 shadow-[0_6px_30px_rgba(139,92,246,0.35)]',
    chip: 'bg-violet-500/15 text-violet-100',
  },
  Capstone: {
    pill: 'bg-cyan-500/15 border border-cyan-400/50 text-cyan-100',
    icon: 'text-cyan-200',
    halo: 'from-cyan-500/25 via-cyan-500/5 to-transparent',
    filter: 'bg-cyan-500/20 border border-cyan-400/60 text-cyan-50 shadow-[0_6px_30px_rgba(34,211,238,0.35)]',
    chip: 'bg-cyan-500/15 text-cyan-100',
  },
};

export const getDomainTheme = (domain) => DOMAIN_THEMES[domain] || DOMAIN_THEMES.default;

DOMAIN_THEMES['Vision / Fiction'] = DOMAIN_THEMES[visionKey];
