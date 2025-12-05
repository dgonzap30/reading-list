export const SECTIONS = {
  Feeling: {
    label: 'Feeling',
    emoji: '💭',
    icon: 'Heart',
    color: 'rose',
    description: 'Emotional states and responses',
    keywords: {
      high: [
        'feel', 'feeling', 'felt', 'emotion', 'emotional', 'mood',
        'anxious', 'anxiety', 'afraid', 'fear', 'scared', 'worry', 'worried',
        'sad', 'sadness', 'grief', 'grieve', 'mourn', 'loss',
        'angry', 'anger', 'frustrated', 'frustration', 'irritated',
        'happy', 'joy', 'joyful', 'excited', 'excitement', 'hope', 'hopeful',
        'calm', 'peace', 'peaceful', 'serene', 'content', 'contentment',
        'overwhelmed', 'stressed', 'stress', 'tension', 'tense',
        'lonely', 'loneliness', 'isolated', 'shame', 'guilt', 'regret',
        'grateful', 'gratitude', 'appreciation', 'relief', 'relieved'
      ],
      medium: [
        'sense', 'sensation', 'body', 'heart', 'gut', 'chest',
        'tears', 'cry', 'crying', 'laugh', 'laughing', 'smile',
        'heavy', 'light', 'warm', 'cold', 'tight', 'loose',
        'uncomfortable', 'comfortable', 'uneasy', 'restless',
        'numb', 'raw', 'vulnerable', 'exposed', 'safe', 'unsafe'
      ],
      low: [
        'noticed', 'realized', 'triggered', 'reminded', 'struck',
        'resonated', 'moved', 'touched', 'affected', 'impacted'
      ]
    }
  },

  Self: {
    label: 'Self',
    emoji: '🪞',
    icon: 'User',
    color: 'amber',
    description: 'Identity and personal growth',
    keywords: {
      high: [
        'i am', "i'm", 'myself', 'identity', 'who i am',
        'habit', 'habits', 'routine', 'discipline', 'practice',
        'growth', 'growing', 'develop', 'development', 'improve', 'improvement',
        'belief', 'beliefs', 'believe', 'value', 'values',
        'strength', 'weakness', 'capability', 'potential', 'limit', 'limitation',
        'goal', 'goals', 'aspiration', 'dream', 'dreams', 'ambition',
        'character', 'personality', 'trait', 'traits', 'tendency',
        'pattern', 'patterns', 'behavior', 'behaviours', 'mindset'
      ],
      medium: [
        'learn', 'learning', 'skill', 'skills', 'ability', 'abilities',
        'change', 'changing', 'transform', 'become', 'becoming',
        'struggle', 'struggling', 'challenge', 'challenging',
        'confidence', 'confident', 'doubt', 'doubting', 'insecure',
        'authentic', 'true', 'honest', 'integrity', 'core'
      ],
      low: [
        'think', 'thinking', 'thought', 'thoughts', 'mind',
        'want', 'wanting', 'need', 'needing', 'desire',
        'choice', 'choose', 'decision', 'decide'
      ]
    }
  },

  Others: {
    label: 'Others',
    emoji: '👥',
    icon: 'Users',
    color: 'sky',
    description: 'Relationships and social',
    keywords: {
      high: [
        'relationship', 'relationships', 'friend', 'friends', 'friendship',
        'family', 'parent', 'parents', 'mother', 'father', 'sibling', 'brother', 'sister',
        'partner', 'spouse', 'husband', 'wife', 'boyfriend', 'girlfriend',
        'colleague', 'coworker', 'boss', 'team', 'teammates',
        'communication', 'communicate', 'conversation', 'talk', 'talking',
        'empathy', 'empathize', 'understand', 'understanding', 'listen', 'listening',
        'conflict', 'argument', 'disagree', 'disagreement', 'tension',
        'trust', 'trusting', 'betrayal', 'loyalty', 'forgive', 'forgiveness'
      ],
      medium: [
        'they', 'them', 'their', 'he', 'she', 'her', 'his',
        'person', 'people', 'someone', 'anyone', 'everyone',
        'help', 'helping', 'support', 'supporting', 'care', 'caring',
        'love', 'loving', 'respect', 'respecting', 'appreciate',
        'boundary', 'boundaries', 'distance', 'close', 'closeness'
      ],
      low: [
        'said', 'told', 'asked', 'replied', 'responded',
        'met', 'meeting', 'encounter', 'interaction'
      ]
    }
  },

  Connection: {
    label: 'Connection',
    emoji: '🌐',
    icon: 'Link',
    color: 'emerald',
    description: 'Belonging and community',
    keywords: {
      high: [
        'belong', 'belonging', 'community', 'communities', 'tribe',
        'culture', 'cultural', 'society', 'societal', 'collective',
        'group', 'groups', 'movement', 'movements', 'organization',
        'shared', 'sharing', 'common', 'together', 'togetherness',
        'inclusion', 'inclusive', 'exclusion', 'excluded', 'outsider',
        'tradition', 'traditions', 'ritual', 'rituals', 'ceremony',
        'network', 'networks', 'web', 'interconnected', 'interdependent'
      ],
      medium: [
        'we', 'us', 'our', 'ours', 'ourselves',
        'united', 'unity', 'solidarity', 'alliance', 'coalition',
        'participate', 'participation', 'contribute', 'contribution',
        'gathering', 'gatherings', 'event', 'events', 'celebration',
        'institution', 'institutions', 'system', 'systems', 'structure'
      ],
      low: [
        'social', 'public', 'private', 'civic', 'citizen',
        'norm', 'norms', 'rule', 'rules', 'expectation'
      ]
    }
  },

  Existence: {
    label: 'Existence',
    emoji: '✨',
    icon: 'Sparkles',
    color: 'violet',
    description: 'Meaning and mortality',
    keywords: {
      high: [
        'meaning', 'meaningful', 'meaningless', 'purpose', 'purposeful',
        'death', 'dying', 'mortality', 'mortal', 'finite', 'end', 'ending',
        'life', 'living', 'alive', 'existence', 'exist', 'existing',
        'legacy', 'remember', 'remembered', 'forget', 'forgotten',
        'eternal', 'eternity', 'forever', 'infinite', 'infinity',
        'transcend', 'transcendence', 'transcendent', 'spiritual', 'spirit',
        'soul', 'consciousness', 'aware', 'awareness', 'awakening',
        'ultimate', 'fundamental', 'essential', 'core', 'truth'
      ],
      medium: [
        'why', 'reason', 'reasons', 'matter', 'matters', 'significance',
        'time', 'moment', 'moments', 'fleeting', 'passing', 'impermanent',
        'universe', 'cosmic', 'vast', 'small', 'insignificant',
        'wonder', 'wondering', 'awe', 'mystery', 'mysterious',
        'sacred', 'holy', 'divine', 'god', 'gods', 'faith'
      ],
      low: [
        'question', 'questions', 'answer', 'answers', 'seek', 'searching',
        'believe', 'belief', 'doubt', 'uncertain', 'certainty'
      ]
    }
  }
};

export const STATES = {
  Sharp: {
    label: 'Sharp',
    emoji: '⚡',
    icon: 'Zap',
    color: 'emerald',
    suggestion: 'Systems/Strategy',
    description: 'Focused and analytical'
  },
  Reflective: {
    label: 'Reflective',
    emoji: '🌙',
    icon: 'Moon',
    color: 'sky',
    suggestion: 'EQ/Letters/Stoic',
    description: 'Thoughtful and introspective'
  },
  Foggy: {
    label: 'Foggy',
    emoji: '☁️',
    icon: 'Cloud',
    color: 'zinc',
    suggestion: 'Creative/Craft',
    description: 'Open and exploratory'
  },
  Overstimulated: {
    label: 'Overstimulated',
    emoji: '🌊',
    icon: 'Waves',
    color: 'violet',
    suggestion: 'Fiction',
    description: 'Need escape and story'
  }
};

export const FRAGMENT_STATUSES = [
  { id: 'Final', label: 'Final', color: 'emerald' },
  { id: 'Needs Work', label: 'Needs Work', color: 'amber' },
  { id: 'Discard', label: 'Discard', color: 'red' }
];
