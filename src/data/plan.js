import * as Lucide from 'lucide-react';

export const DOMAIN = {
  'Systems/Tech': { icon: Lucide.Brain, color: 'emerald' },
  'Human/EQ': { icon: Lucide.Heart, color: 'rose' },
  'Creative/Craft': { icon: Lucide.Paintbrush, color: 'amber' },
  'Society/Philosophy': { icon: Lucide.Globe, color: 'sky' },
  'Vision (Sci‑Fi)': { icon: Lucide.Orbit, color: 'violet' },
  Capstone: { icon: Lucide.Zap, color: 'cyan' },
};

export const PLAN = {
  phases: [
    {
      id: 'phase1',
      emoji: '🌱',
      title: 'Phase 1 · Foundations',
      subtitle: 'Weeks 1–3',
      goal: 'Prime your systems thinking, empathy, and creative flow — lens calibration.',
      weeks: [1, 2, 3],
    },
    {
      id: 'phase2',
      emoji: '🔍',
      title: 'Phase 2 · Expansion',
      subtitle: 'Weeks 4–8',
      goal: 'Stretch into social cognition, moral reasoning, and creative systems.',
      weeks: [4, 5, 6, 7, 8],
    },
    {
      id: 'phase3',
      emoji: '🚀',
      title: 'Phase 3 · Synthesis',
      subtitle: 'Weeks 9–12',
      goal: 'Connect threads into worldview and practice — philosophy, society, future design.',
      weeks: [9, 10, 11, 12],
    },
  ],
  weeks: [
    {
      id: 1,
      phaseId: 'phase1',
      title: 'Systems & Perspective',
      anchor: 'How do systems — biological, social, mental — shape my experience of meaning?',
      sessions: [
        { id: 'w1s1', domain: 'Systems/Tech', book: 'Thinking in Systems', details: '“The Basics” — stocks, flows, feedback.' },
        { id: 'w1s2', domain: 'Human/EQ', book: 'Man’s Search for Meaning', details: 'Part I — camp phases.' },
        { id: 'w1s3', domain: 'Creative/Craft', book: 'Steal Like an Artist', details: 'Ch. 1–5 — energizing principles.' },
      ],
    },
    {
      id: 2,
      phaseId: 'phase1',
      title: 'Interfaces of Identity',
      anchor: 'What unseen structures bias what we build or believe?',
      sessions: [
        { id: 'w2s1', domain: 'Society/Philosophy', book: 'Invisible Women', details: 'Intro + Part I ch. 1–2.' },
        { id: 'w2s2', domain: 'Creative/Craft', book: 'Bird by Bird', details: '“Short Assignments” + “Shitty First Drafts”.' },
        { id: 'w2s3', domain: 'Systems/Tech', book: 'Thinking in Systems', details: 'Ch. 2 — Systems Zoo tour.' },
      ],
    },
    {
      id: 3,
      phaseId: 'phase1',
      title: 'Loops & Creativity',
      anchor: 'Where do loops in my life fuel or block creativity?',
      microProject: 'Map a feedback loop in your life or creative process (30 min sketch).',
      sessions: [
        { id: 'w3s1', domain: 'Systems/Tech', book: 'The Systems Bible', details: '“Systemantics” introduction.' },
        { id: 'w3s2', domain: 'Society/Philosophy', book: 'The Righteous Mind', details: 'Part I — Intuitions first.' },
        { id: 'w3s3', domain: 'Creative/Craft', book: 'Bird by Bird', details: '“Perfectionism” + “Polaroids”.' },
      ],
    },
    {
      id: 4,
      phaseId: 'phase2',
      title: 'Moral Models',
      anchor: 'How do feedback loops manifest in moral and cultural systems?',
      sessions: [
        { id: 'w4s1', domain: 'Society/Philosophy', book: 'The Righteous Mind', details: 'Part II — Intuitive dog.' },
        { id: 'w4s2', domain: 'Systems/Tech', book: 'Thinking in Systems', details: 'Ch. 3 — System traps + leverage.' },
      ],
    },
    {
      id: 5,
      phaseId: 'phase2',
      title: 'Design of Habits',
      anchor: 'How can we reprogram small loops for lasting change?',
      sessions: [
        { id: 'w5s1', domain: 'Creative/Craft', book: 'Atomic Habits', details: 'Ch. 1–6 — fundamentals.' },
        { id: 'w5s2', domain: 'Creative/Craft', book: 'Bird by Bird', details: '“Plot” + “Character”.' },
      ],
    },
    {
      id: 6,
      phaseId: 'phase2',
      title: 'Strange Loops',
      anchor: 'Where does creativity mirror recursion — art imitating the mind?',
      sessions: [
        { id: 'w6s1', domain: 'Systems/Tech', book: 'Gödel, Escher, Bach', details: 'Part I intro + dialogue.' },
        { id: 'w6s2', domain: 'Creative/Craft', book: 'Steal Like an Artist', details: 'Ch. 6–10 — remix & share.' },
      ],
    },
    {
      id: 7,
      phaseId: 'phase2',
      title: 'Growth & Depth',
      anchor: 'How does meaning emerge from broken systems?',
      sessions: [
        { id: 'w7s1', domain: 'Human/EQ', book: 'Man’s Search for Meaning', details: 'Finish Part II — logotherapy insights.' },
        { id: 'w7s2', domain: 'Systems/Tech', book: 'The Systems Bible', details: '“Failure Modes” collection.' },
      ],
    },
    {
      id: 8,
      phaseId: 'phase2',
      title: 'Data, Design, Bias',
      anchor: 'How do data choices encode who gets seen or sidelined?',
      microProject: 'Audit one product/algorithm for hidden bias and propose a fix.',
      sessions: [
        { id: 'w8s1', domain: 'Society/Philosophy', book: 'Invisible Women', details: 'Part II — design bias cases.' },
        { id: 'w8s2', domain: 'Society/Philosophy', book: 'The Righteous Mind', details: 'Part III — moral matrix.' },
      ],
    },
    {
      id: 9,
      phaseId: 'phase3',
      title: 'Machines & Habits',
      anchor: 'What does it mean to “design” human behavior?',
      sessions: [
        { id: 'w9s1', domain: 'Systems/Tech', book: 'The Systems Bible', details: '“Big Machines” essays.' },
        { id: 'w9s2', domain: 'Creative/Craft', book: 'Atomic Habits', details: 'Finish — 3rd & 4th laws + tracker.' },
      ],
    },
    {
      id: 10,
      phaseId: 'phase3',
      title: 'Morality & Technique',
      anchor: 'What makes creation ethical?',
      sessions: [
        { id: 'w10s1', domain: 'Society/Philosophy', book: 'The Righteous Mind', details: 'Conclusion + synthesis.' },
        { id: 'w10s2', domain: 'Creative/Craft', book: 'Steal Like an Artist', details: 'Revisit notes + moral creativity.' },
      ],
    },
    {
      id: 11,
      phaseId: 'phase3',
      title: 'Interfaces at Scale',
      anchor: 'What happens when human bias meets infinite recursion?',
      sessions: [
        { id: 'w11s1', domain: 'Society/Philosophy', book: 'Invisible Women', details: 'Final section — global impacts.' },
        { id: 'w11s2', domain: 'Systems/Tech', book: 'Gödel, Escher, Bach', details: 'Music/art parallels chapter.' },
      ],
    },
    {
      id: 12,
      phaseId: 'phase3',
      title: 'Cosmic Perspective',
      anchor: 'How do systems, empathy, and art converge into a philosophy of action?',
      microProject: 'Final synthesis: one-page reflection or map connecting systems + empathy + art.',
      sessions: [
        { id: 'w12s1', domain: 'Vision (Sci‑Fi)', book: 'The Dispossessed', details: 'Select chapters (Anarres/Urras contrast).' },
        { id: 'w12s2', domain: 'Human/EQ', book: 'Letters to a Young Poet', details: 'Letters 1–3.' },
      ],
    },
  ],
  sips: [
    { book: 'Letters to a Young Poet', details: 'Read 1–2 letters between sessions.' },
    { book: 'The Creative Act', details: 'Dip into a tiny chapter before deep work.' },
    { book: 'The Dispossessed', details: 'Optional sci‑fi immersion beyond Week 12.' },
    { book: 'Do Androids Dream of Electric Sheep?', details: 'Use short chapter blocks as palette cleansers.' },
  ],
  swaps: [],
};
