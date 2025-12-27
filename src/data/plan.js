import * as Lucide from 'lucide-react';

export const DOMAIN = {
  'Systems/Tech': { icon: Lucide.Brain, color: 'emerald' },
  'Human/EQ': { icon: Lucide.Heart, color: 'rose' },
  'Creative/Craft': { icon: Lucide.Paintbrush, color: 'amber' },
  'Society/Philosophy': { icon: Lucide.Globe, color: 'sky' },
  'Vision / Fiction': { icon: Lucide.Orbit, color: 'violet' },
  'Founder/Strategy': { icon: Lucide.Flag, color: 'indigo' },
  'Health': { icon: Lucide.Activity, color: 'lime' },
  Capstone: { icon: Lucide.Zap, color: 'cyan' },
};

export const RED_THREADS = [
  { emoji: '🧠', title: 'Systems Shape Behavior', books: 'Thinking in Systems → Cold Start → Systems Bible → Sapiens' },
  { emoji: '❤️', title: 'How a Person Becomes Whole', books: 'Frankl → Stoic → Brooks → Letters' },
  { emoji: '🎨', title: 'Creativity as Constraint', books: 'Bird by Bird → How Music Works → Steal Like an Artist' },
  { emoji: '🤝', title: 'The Human Interface', books: 'Righteous Mind → How to Know a Person → Meditations → Culture Map → Never Split' },
];

export const ENERGY_MATCHING = [
  { label: 'Feeling sharp?', action: 'Do Systems/Strategy' },
  { label: 'Feeling reflective?', action: 'Do EQ/Letters/Stoic' },
  { label: 'Feeling mentally foggy?', action: 'Do Creative/Craft' },
  { label: 'Feeling overstimulated?', action: 'Do Fiction/Sci-Fi' },
];

export const FICTION_LIBRARY = [
  {
    tier: 'Tier 1 — Core Sci-Fi / Vision',
    description: 'Perfect replacements on ANY sci-fi week.',
    books: [
      { title: 'The Left Hand of Darkness', author: 'Le Guin', desc: 'Philosophical, political, human, slow-burn wonder.' },
      { title: 'Never Let Me Go', author: 'Ishiguro', desc: 'Quiet, haunting, humane sci-fi. Fits your taste exactly.' },
      { title: 'Do Androids Dream of Electric Sheep?', author: 'PKD', desc: 'Blade Runner core text → fits all your interests rn.' },
      { title: 'Fahrenheit 451', author: 'Bradbury', desc: 'Short, powerful, atmospheric.' },
    ]
  },
  {
    tier: 'Tier 2 — Psychological / Speculative',
    description: 'Great when you’re overstimulated.',
    books: [
      { title: 'Annihilation', author: 'Jeff VanderMeer', desc: 'Atmospheric cosmic dread; extremely short; very you.' },
      { title: 'The Ocean at the End of the Lane', author: 'Gaiman', desc: 'Mythic, dark, emotional.' },
    ]
  },
  {
    tier: 'Tier 3 — Elegant Literary Fiction',
    description: 'For creative weeks or EQ weeks.',
    books: [
      { title: 'The Remains of the Day', author: 'Ishiguro', desc: 'Quiet, emotional, immaculate writing.' },
      { title: 'The Sense of an Ending', author: 'Julian Barnes', desc: 'Memory, regret, identity — short but heavy.' },
      { title: 'We Have Always Lived in the Castle', author: 'Shirley Jackson', desc: 'Eerie, psychological, brilliant.' },
    ]
  },
  {
    tier: 'Tier 4 — Short, High-Impact Classics',
    description: 'For burned-out weeks.',
    books: [
      { title: 'The Metamorphosis', author: 'Kafka', desc: '1 hour read.' },
      { title: 'The Stranger', author: 'Camus', desc: '' },
      { title: 'Notes from Underground', author: 'Dostoevsky', desc: 'Short version.' },
    ]
  }
];

export const PLAN = {
  phases: [
    {
      id: 'phase1',
      emoji: '🌱',
      title: 'Phase 1 · Foundations',
      subtitle: 'Weeks 1–3',
      goal: 'Meaning, systems literacy, and creative ignition.',
      weeks: [1, 2, 3],
    },
    {
      id: 'phase2',
      emoji: '🔍',
      title: 'Phase 2 · Expansion',
      subtitle: 'Weeks 4–7',
      goal: 'Chaos, habits, music, and power dynamics.',
      weeks: [4, 5, 6, 7],
    },
    {
      id: 'phase3',
      emoji: '🚀',
      title: 'Phase 3 · Core & Strategy',
      subtitle: 'Weeks 8–12',
      goal: 'Network effects, failures, intuition, and financial sanity.',
      weeks: [8, 9, 10, 11, 12],
    },
    {
      id: 'phase4',
      emoji: '🌌',
      title: 'Phase 4 · Integration',
      subtitle: 'Weeks 13–16',
      goal: 'Synthesis, scaling, and cognitive stretching.',
      weeks: [13, 14, 15, 16],
    },
  ],
  weeks: [
    {
      id: 1,
      phaseId: 'phase1',
      title: 'Meaning + Systems Foundation',
      metaIntent: 'Start with purpose and clarity.',
      anchor: 'Anchors purpose + system literacy.',
      smallWin: 'Write one sentence describing a system in my life I want to redesign.',
      primer: 'Frankl for the "why", Meadows for the "how".',
      sessions: [
        { id: 'w1s1', domain: 'Human/EQ', book: 'Man’s Search for Meaning', details: 'Part I.' },
        { id: 'w1s2', domain: 'Systems/Tech', book: 'Thinking in Systems', details: '“The Basics”.' },
      ],
      fiction: {
        title: 'Never Let Me Go',
        author: 'Ishiguro',
        match: 'Reflective, humane, existential. Soft, melancholic, perfect pairing with Frankl.',
        runnerUp: 'The Remains of the Day',
      },
    },
    {
      id: 2,
      phaseId: 'phase1',
      title: 'Writing Foundation + Structural Bias',
      metaIntent: 'Start with the atomic unit of creative work, notice hidden structures.',
      anchor: 'Individual creative practice + design-awareness.',
      smallWin: 'Write a "shitty first draft" of something you\'ve been avoiding.',
      primer: 'Start with the basics of creative work; society has hidden constraints.',
      sessions: [
        { id: 'w2s1', domain: 'Creative/Craft', book: 'Bird by Bird', details: '"Short Assignments," "Shitty First Drafts".' },
        { id: 'w2s2', domain: 'Society/Philosophy', book: 'Invisible Women', details: 'Intro + Part I (Ch. 1–2).' },
      ],
      fiction: {
        title: 'The Ocean at the End of the Lane',
        author: 'Gaiman',
        match: 'Mythic creativity. Childlike imagination. Soft contrast to data-bias heaviness.',
        runnerUp: 'Fahrenheit 451',
      },
    },
    {
      id: 3,
      phaseId: 'phase1',
      title: 'Creative Network + Moral Intuition',
      metaIntent: 'Understand how creative work fits into the world, understand the mind.',
      anchor: 'Collective creative practice + psychology for understanding people.',
      smallWin: 'Identify one artist/creator whose work you want to "steal from" this week.',
      primer: 'Creative work lives in networks; intuition drives judgment. (Fiction swap available)',
      sessions: [
        { id: 'w3s1', domain: 'Creative/Craft', book: 'Steal Like an Artist', details: 'Ch. 1–5.' },
        { id: 'w3s2', domain: 'Society/Philosophy', book: 'The Righteous Mind', details: 'Part I.' },
      ],
      fiction: {
        title: 'We Have Always Lived in the Castle',
        author: 'Shirley Jackson',
        match: 'First-person voice. Psychological nuance. Perfect for “intuition drives judgment”.',
        runnerUp: 'The Sense of an Ending',
      },
    },
    {
      id: 4,
      phaseId: 'phase2',
      title: 'Systemantics + The Human Interface',
      metaIntent: 'Zoom out to systems, zoom in to people, ground in Stoic practice.',
      anchor: 'Chaos-awareness + empathy + inner discipline.',
      smallWin: 'Describe one moment this week where a Systems Bible law showed up IRL.',
      primer: 'Systems fail naturally; empathy requires seeing past the failure. Meditations bridges Frankl to Stoic practice.',
      sessions: [
        { id: 'w4s1', domain: 'Systems/Tech', book: 'The Systems Bible', details: 'Core "Systemantics" laws.' },
        { id: 'w4s2', domain: 'Human/EQ', book: 'How to Know a Person', details: 'Ch. 1–4.' },
        { id: 'w4s3', domain: 'Human/EQ', book: 'Meditations', details: 'Select passages (Book II-IV).' },
      ],
      fiction: {
        title: 'Do Androids Dream of Electric Sheep?',
        author: 'PKD',
        match: 'Literal exploration of empathy. Systems vs humanity. Direct thematic resonance.',
        runnerUp: 'Never Let Me Go',
      },
    },
    {
      id: 5,
      phaseId: 'phase2',
      title: 'Habits + Historical Systems',
      metaIntent: 'Design habits, study humanity.',
      anchor: 'Behavior design + deep anthropology.',
      smallWin: 'Stack one new habit onto an existing one.',
      primer: 'Habits are personal systems; history is the aggregate of habits.',
      sessions: [
        { id: 'w5s1', domain: 'Systems/Tech', book: 'Atomic Habits', details: 'Ch. 1–6.' },
        { id: 'w5s2', domain: 'Systems/Tech', book: 'Sapiens', details: 'Part I (Cognitive Revolution).' },
      ],
      fiction: {
        title: 'Fahrenheit 451',
        author: 'Bradbury',
        match: 'Societal habits + engineered behavioral systems. Social evolution, regression, control.',
        runnerUp: 'The Metamorphosis',
      },
    },
    {
      id: 6,
      phaseId: 'phase2',
      title: 'Creative Constraints + Biological Foundation',
      metaIntent: 'Create with constraints, ground in biology.',
      anchor: 'Creativity meets real-world systems + longevity science.',
      smallWin: 'Share one piece of work-in-progress with a friend.',
      primer: 'Music is math with feeling; showing work creates feedback loops. Outlive grounds abstract creativity.',
      sessions: [
        { id: 'w6s1', domain: 'Creative/Craft', book: 'How Music Works', details: 'Ch. 1–3.' },
        { id: 'w6s2', domain: 'Creative/Craft', book: 'Show Your Work', details: 'Entire book.' },
        { id: 'w6s3', domain: 'Health', book: 'Outlive', details: 'Intro + Ch. 1-3 (The Long Game).' },
      ],
      fiction: {
        title: 'The Ocean at the End of the Lane',
        author: 'Gaiman',
        match: 'Mythic, emotional, dreamlike. Perfect creative week fiction.',
        runnerUp: 'The Left Hand of Darkness',
      },
    },
    {
      id: 7,
      phaseId: 'phase2',
      title: 'Power, Realism & Sci-Fi Society',
      metaIntent: 'Reflect on power & society.',
      anchor: 'Realpolitik x speculative imagination.',
      smallWin: 'Map the power dynamics in one meeting you attended.',
      primer: 'Read both as social commentary: one on power, one on evolution.',
      sessions: [
        { id: 'w7s1', domain: 'Society/Philosophy', book: 'The Prince', details: 'Cruelty/mercy, fear/love.' },
        { id: 'w7s2', domain: 'Vision / Fiction', book: 'The Time Machine', details: 'Entire novella.' },
        { id: 'w7s3', domain: 'Founder/Strategy', book: 'The Culture Map', details: 'Ch. 1-4 (Communicating, Evaluating, Persuading, Leading).' },
      ],
      fiction: {
        title: 'The Left Hand of Darkness',
        author: 'Le Guin',
        match: 'Politics, society, duality. Direct upgrade to “reflect on power & society”.',
        runnerUp: 'Annihilation',
      },
    },
    {
      id: 8,
      phaseId: 'phase3',
      title: 'Cold Start Problem (Movee CORE)',
      metaIntent: 'Build your founder core.',
      anchor: 'Entirely for Movee’s network engine.',
      smallWin: 'Sketch Movee’s atomic network on napkin-level detail.',
      primer: 'The hard part isn\'t scaling, it\'s starting.',
      sessions: [
        { id: 'w8s1', domain: 'Founder/Strategy', book: 'The Cold Start Problem', details: 'Part I: "The Cold Start Theory".' },
        { id: 'w8s2', domain: 'Founder/Strategy', book: 'The Cold Start Problem', details: 'Part II: "Atomic Networks".' },
        { id: 'w8s3', domain: 'Founder/Strategy', book: 'Thinking in Bets', details: 'Ch. 1-4 (Embracing Uncertainty).' },
      ],
      fiction: {
        title: 'The Sense of an Ending',
        author: 'Julian Barnes',
        match: 'Short, grounding, psychological. Lets your brain rest between heavy system theory.',
        runnerUp: 'Never Let Me Go',
      },
    },
    {
      id: 9,
      phaseId: 'phase3',
      title: 'Sapiens + Systems Failures',
      metaIntent: 'See where systems crack.',
      anchor: 'How systems break + how civilizations scaled/broke.',
      smallWin: 'Identify a "failure mode" in a tool you use daily.',
      primer: 'Scale creates fragility; know where the cracks form. (Fiction swap available)',
      sessions: [
        { id: 'w9s1', domain: 'Systems/Tech', book: 'Sapiens', details: 'Part II (Agricultural Revolution).' },
        { id: 'w9s2', domain: 'Systems/Tech', book: 'The Systems Bible', details: 'Failure modes section.' },
      ],
      fiction: {
        title: 'Annihilation',
        author: 'Jeff VanderMeer',
        match: 'Themes of decay, collapse, entropy. Atmospheric counterpart to failure modes.',
        runnerUp: 'Do Androids Dream...',
      },
    },
    {
      id: 10,
      phaseId: 'phase3',
      title: 'Righteous Mind Part II + Stoic Core + Frankl',
      metaIntent: 'Understand intuition, master reaction.',
      anchor: 'Intuition, emotion, and inner discipline.',
      smallWin: 'Practice "dichotomy of control" on one stressor.',
      primer: 'Control your reaction, understand their intuition, find meaning under pressure.',
      sessions: [
        { id: 'w10s1', domain: 'Society/Philosophy', book: 'The Righteous Mind', details: 'Part II.' },
        { id: 'w10s2', domain: 'Human/EQ', book: 'The Essential Stoic', details: 'Select Meditations.' },
        { id: 'w10s3', domain: 'Founder/Strategy', book: 'Never Split the Difference', details: 'Ch. 1-5 (Tactical Empathy, Mirroring, Labeling).' },
        { id: 'w10s4', domain: 'Human/EQ', book: "Man's Search for Meaning", details: 'Part II (Logotherapy).' },
      ],
      fiction: {
        title: 'We Have Always Lived in the Castle',
        author: 'Shirley Jackson',
        match: 'Studies intuition, social judgment, inner worlds. Perfect match for Haidt + Stoic work.',
        runnerUp: 'The Remains of the Day',
      },
    },
    {
      id: 11,
      phaseId: 'phase3',
      title: 'Letters + Design Philosophy',
      metaIntent: 'Be patient, be creative.',
      anchor: 'Artistic reflection and creative ecosystems.',
      smallWin: 'Write a letter to your younger self about patience.',
      primer: 'Patience is an active design choice.',
      sessions: [
        { id: 'w11s1', domain: 'Human/EQ', book: 'Letters to a Young Poet', details: 'Letters 1–3.' },
        { id: 'w11s2', domain: 'Creative/Craft', book: 'How Music Works', details: 'Ch. 4–6.' },
      ],
      fiction: {
        title: 'The Ocean at the End of the Lane',
        author: 'Gaiman',
        match: 'Emotional + craft-aligned. Soft, magical, introspective.',
        runnerUp: 'Never Let Me Go',
      },
    },
    {
      id: 12,
      phaseId: 'phase3',
      title: 'GEB + Strange Loops + Money Mindset',
      metaIntent: 'Stretch your brain with recursion, tidy your money.',
      anchor: 'Logic recursion + GEB documentation + financial sanity.',
      smallWin: 'Define "enough" for your current financial goals.',
      primer: 'I Am a Strange Loop is the "documentation" for GEB\'s "source code". Makes W14 GEB significantly more rewarding.',
      sessions: [
        { id: 'w12s1', domain: 'Systems/Tech', book: 'Gödel, Escher, Bach', details: '"MU Puzzle" + first Tortoise dialogue.' },
        { id: 'w12s2', domain: 'Systems/Tech', book: 'I Am a Strange Loop', details: 'Ch. 1-3 (Introduction to Strange Loops).' },
        { id: 'w12s3', domain: 'Founder/Strategy', book: 'The Psychology of Money', details: 'Key chapters (1–4, 11).' },
      ],
      fiction: {
        title: 'The Left Hand of Darkness',
        author: 'Le Guin',
        match: 'Deep themes, intellectual but emotional. A good counterbalance to GEB recursion.',
        runnerUp: 'The Metamorphosis',
      },
    },
    {
      id: 13,
      phaseId: 'phase4',
      title: 'Sapiens + Dispossessed',
      metaIntent: 'Study unity and utopia.',
      anchor: 'Societal synthesis + philosophical fiction.',
      smallWin: 'Compare Anarres to a modern startup culture.',
      primer: 'Utopia is ambiguous; unity is messy.',
      sessions: [
        { id: 'w13s1', domain: 'Systems/Tech', book: 'Sapiens', details: 'Part III (Unification of Humankind).' },
        { id: 'w13s2', domain: 'Vision / Fiction', book: 'The Dispossessed', details: 'First 4–5 chapters.' },
      ],
      fiction: {
        title: 'The Left Hand of Darkness',
        author: 'Le Guin',
        match: 'Gender, culture, political philosophy. Complements The Dispossessed insanely well.',
        runnerUp: 'Fahrenheit 451',
      },
    },
    {
      id: 14,
      phaseId: 'phase4',
      title: 'GEB Follow-Up + Stoic Finish',
      metaIntent: 'Loop inward, ground outward.',
      anchor: 'Cognitive stretching + grounding.',
      smallWin: 'Meditate on a "Strange Loop" in your own thinking.',
      primer: 'The mind is a loop; stoicism is the anchor.',
      sessions: [
        { id: 'w14s1', domain: 'Systems/Tech', book: 'Gödel, Escher, Bach', details: 'Next core dialogue.' },
        { id: 'w14s2', domain: 'Human/EQ', book: 'The Essential Stoic', details: 'Final passages.' },
      ],
      fiction: {
        title: 'The Sense of an Ending',
        author: 'Julian Barnes',
        match: 'Memory loops, unreliable narration. GEB-lite in emotional form.',
        runnerUp: 'Annihilation',
      },
    },
    {
      id: 15,
      phaseId: 'phase4',
      title: 'Cold Start Part III (Expansion Stage)',
      metaIntent: 'Think in tipping points.',
      anchor: 'Directly relevant to Movee scaling in Madison.',
      smallWin: 'Draft the "Tipping Point" strategy for Movee.',
      primer: 'Expansion requires breaking the initial constraints.',
      sessions: [
        { id: 'w15s1', domain: 'Founder/Strategy', book: 'The Cold Start Problem', details: '"Tipping Point" + "Escape Velocity".' },
        { id: 'w15s2', domain: 'Systems/Tech', book: 'Thinking, Fast and Slow', details: 'Part I (Two Systems).' },
      ],
      fiction: {
        title: 'The Ocean at the End of the Lane',
        author: 'Gaiman',
        match: 'Emotional decompression. Imagination reset.',
      },
    },
    {
      id: 16,
      phaseId: 'phase4',
      title: 'Integration + Optional Wrap-Up',
      metaIntent: 'Integrate & prepare the next arc.',
      anchor: 'Scientific Revolution + Fiction Reward.',
      smallWin: 'Plan your next 16-week cycle (or rest week).',
      primer: 'The end is a new beginning.',
      sessions: [
        { id: 'w16s1', domain: 'Systems/Tech', book: 'Sapiens', details: 'Part IV (Scientific Revolution).' },
        { id: 'w16s2', domain: 'Vision / Fiction', book: 'House of Leaves', details: 'Begin as reward (optional).' },
      ],
      fiction: {
        title: 'ANY from your library',
        author: '',
        match: 'This week is purely vibes.',
      },
    },
  ],
  sips: [
    { book: 'Letters to a Young Poet', details: 'Read 1–2 letters between sessions.' },
    { book: 'The Creative Act', details: 'Dip into a tiny chapter before deep work.' },
    { book: 'Meditations', details: 'One aphorism. Zero cognitive load.' },
    { book: 'House of Leaves', details: 'Optional deep dive for fiction reward.' },
  ],
  swaps: [
    { book: 'Fiction Library', details: 'Use fiction when your brain needs softness, imagination, or emotional reset. Swap freely — all progress counts.' },
  ],
};

