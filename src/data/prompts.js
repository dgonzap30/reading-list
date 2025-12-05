export const PROMPTS = {
    'Systems/Tech': [
        "What is the feedback loop driving this system?",
        "Where is the leverage point here?",
        "How does this system fail?",
        "Draw the stock and flow diagram mentally.",
        "What constraint is actually a feature?"
    ],
    'Human/EQ': [
        "How does this change my view of someone I know?",
        "What emotion is being described here?",
        "When have I felt this way?",
        "What would the Stoics say about this?",
        "Is this a 'how' problem or a 'who' problem?"
    ],
    'Creative/Craft': [
        "What constraint did the artist use here?",
        "Steal one specific technique from this chapter.",
        "How would I apply this to my current project?",
        "Is this about quantity or quality?",
        "What is the 'shitty first draft' version of this?"
    ],
    'Society/Philosophy': [
        "What invisible structure is being revealed?",
        "Who benefits from this arrangement?",
        "Is this a truth or a social construct?",
        "How does this explain a recent news event?",
        "What is the counter-argument?"
    ],
    'Vision / Fiction': [
        "What if this world was real?",
        "Which character represents a part of me?",
        "What is the core conflict here?",
        "How does this future reflect our present?",
        "What emotion does this setting evoke?"
    ],
    'Founder/Strategy': [
        "What is the 'cold start' problem here?",
        "How does this scale?",
        "What is the unit economics of this idea?",
        "Is this a vitamin or a painkiller?",
        "What is the distribution strategy?"
    ],
    'Capstone': [
        "How does this connect to everything else?",
        "What is the synthesis?",
        "If I could only remember one thing, what is it?",
        "How does this change my life strategy?"
    ]
};

export function getPrompt(domain) {
    const prompts = PROMPTS[domain] || PROMPTS['Capstone'];
    return prompts[Math.floor(Math.random() * prompts.length)];
}
