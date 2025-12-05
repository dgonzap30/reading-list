const visionKey = 'Vision / Fiction';

// Near-monochrome theme - all domains use neutral grayscale
const neutralTheme = {
  pill: 'bg-white/5 border border-white/10 text-white/60',
  icon: 'text-white/40',
  halo: 'from-white/5 via-transparent to-transparent',
  filter: 'bg-white/5 border border-white/10 text-white/80',
  chip: 'bg-white/5 text-white/60',
};

export const DOMAIN_THEMES = {
  default: neutralTheme,
  'Systems/Tech': neutralTheme,
  'Human/EQ': neutralTheme,
  'Creative/Craft': neutralTheme,
  'Society/Philosophy': neutralTheme,
  'Founder/Strategy': neutralTheme,
  [visionKey]: neutralTheme,
  Capstone: neutralTheme,
};

export const getDomainTheme = (domain) => DOMAIN_THEMES[domain] || DOMAIN_THEMES.default;

DOMAIN_THEMES['Vision / Fiction'] = DOMAIN_THEMES[visionKey];
