/**
 * Shared phrase lists for anti-ai-slop scanner.
 * Sources: impeccable detect-text.mjs, linktwerk, Reddit Delvish lists,
 * WriteHuman 2026 structural tells, Markets2Mountains anti-slop patterns.
 */

export const OPENERS = [
  "in today's fast-paced world",
  'in this digital world',
  'in an ever-changing landscape',
  'in the world of',
  "let's dive in",
  "let's dive into",
  "let's dive deeper",
  "here's the thing",
  "it's worth noting that",
  "it's important to recognize that",
  "it's important to note that",
  'what this means is',
  'it goes without saying',
  'without further ado',
  'picture this',
  'imagine a busy professional',
  'hot take:',
  "i'll keep this short",
  'i hope this email finds you well',
  'in this article',
  'in this guide we will',
];

export const CLOSERS = [
  'in conclusion',
  'to summarize',
  'the bottom line is',
  'only time will tell',
  'at the end of the day',
  'food for thought',
  'the takeaway is clear',
  'quality speaks for itself',
  'after all, the best',
];

export const HEDGE_PHRASES = [
  "it's important to note that",
  'furthermore',
  'additionally',
  'moreover',
  'subsequently',
  'consequently',
  'that being said',
  'with that in mind',
  'it should be noted',
];

export const BUZZWORDS = [
  'streamline your', 'empower your', 'supercharge your',
  'unleash your', 'unleash the power', 'leverage the power', 'harness the power',
  'built for the modern', 'trusted by leading', 'trusted by the world',
  'best-in-class', 'industry-leading', 'world-class', 'enterprise-grade',
  'next-generation', 'cutting-edge', 'transform your business',
  'revolutionize', 'game-changer', 'game changing', 'mission-critical',
  'best of breed', 'future-proof', 'future proof',
  'seamless experience', 'seamlessly integrate',
  'drive engagement', 'drive growth', 'drive results',
  'paradigm shift', 'transformative impact', 'revolutionary approach',
  'unlock the secrets', 'master the art of', 'discover the hidden',
  '10x your', 'crush your competitors', 'growth hack',
];

export const ENGAGEMENT_BAIT = [
  'thoughts?', 'agree?', 'let that sink in.', 'let me be clear', 'deep dive',
];

export const META_AI = [
  'as an ai', 'i hope this helps', 'certainly!', 'great question!',
  "i'd be happy to", 'feel free to', 'happy to help',
];

/** Reddit / Bruce Sterling "Delvish" vocabulary — flag in clusters, not alone */
export const DELVISH_WORDS = [
  'delve', 'delving', 'tapestry', 'kaleidoscope', 'foster', 'fostering',
  'nuanced', 'intricate', 'multifaceted', 'robust', 'pivotal', 'crucial',
  'essential', 'landscape', 'embark', 'embrace', 'elevate', 'elevating',
  'comprehensive', 'holistic', 'synergy', 'utilize',
];

/** WriteHuman 2026 hedging verbs — padding instead of stating facts */
export const HEDGING_VERBS = [
  'ensures', 'ensuring', 'highlights', 'underscores', 'showcases',
  'facilitates', 'reflects', 'demonstrates', 'underscore', 'showcase',
];

export const INTENSIFIERS = [
  'significantly', 'effectively', 'increasingly', 'remarkably',
  'fundamentally', 'inherently', 'undeniably', 'unquestionably',
];

export const COLON_RUNWAYS = [
  'the result:', 'the bottom line:', "here's the key", "here's the thing:",
  'the key insight:', 'the takeaway:', 'what this means:',
];

/** Lesson-listicle framing — reads "human" but scans as AI */
export const LESSON_FRAMERS = [
  'things that actually helped',
  'things that actually worked',
  'things that helped',
  'things that worked',
  'what actually helped',
  'what actually worked',
  "here's what worked",
  "here's what i learned",
  'lessons learned',
  'two things that',
  'three things that',
  'what i\'m actually doing differently',
  'doing differently this time',
  'what i\'d tell past-me',
  'what changed when i',
  'signals i ignored',
  'notes from the wreckage',
  'operating manual updates',
];

/** Punch-pause / LinkedIn engagement theater */
export const PUNCH_PAUSE = [
  'let that sink in.',
  'chew on that.',
  'read that again.',
  'sit with that',
  'pause here.',
  'i mean that literally.',
  'still with me?',
];

export const LINKEDIN_ENGAGEMENT = [
  'repost if',
  'repost for',
  'tag someone who',
  'tag the person who',
  'drop one sentence',
  'comment below',
  'comment "receipt"',
  'share this with someone',
  'send this to the friend',
  'what\'s the worst tuesday',
  'what\'s the messiest lesson',
];

/** Residue from linktwerk / thought-leadership generators */
export const LINKTWErk_RESIDUE = [
  'soft lives don\'t produce',
  'renting your spine',
  'cringe-soaked',
  'let that sink in',
  'i don\'t say this to brag',
  'version 1.0 of me',
  'the room moved on in 90 seconds',
  'comedy if it happened to you',
  'curriculum because it happened to me',
];

/** Czech email / outreach slop (LLM + scan) */
export const CZECH_SLOP = [
  'děkuji za váš čas',
  'děkuji za vás čas',
  'rád se učím nové věci',
  'moc se mi líbí, co budujete',
  'rád bych se zeptal, jestli by byla možnost',
  'dávalo by to smysl oběma stranám',
  'přeji hodně úspěchů',
  'doufám, že se máte dobře',
  'těším se na vaši odpověď',
  's pozdravem a přáním',
  'bylo by mi ctí',
  'dovoluji si vás oslovit',
  'obracím se na vás s prosbou',
  'vážím si vašeho času',
  's úctou a přáním',
  'budu rád za jakoukoli zpětnou vazbu',
  'zůstávám s pozdravem',
  's přáním hezkého dne',
];

/** Fake-casual wit — performative relatability */
export const FAKE_CASUAL = [
  'felt on brand',
  'no big scene, just',
  'no drama, just',
  'not amazing, but at least',
  'where you stand',
  'excited about new opportunities',
  "i'd love to connect",
  'the real lesson',
  'the real takeaway',
];

export const JOB_HUNT_SLOP = [
  'open to work',
  'excited about new opportunities',
  'new chapter',
  'next chapter',
  'journey continues',
  'thrilled to announce',
  'humbled and excited',
  'passionate about',
  'looking for my next opportunity',
  'open to new opportunities',
];

/** Fake survey / stat citation openers */
export const FAKE_STAT_MARKERS = [
  'survey found',
  'study found',
  'report found',
  'index found',
  'poll found',
  'meta-analysis found',
  'brief found',
];

/** Subtle fake-humanized (passes buzzword scan) */
export const SUBTLE_FAKE_HUMAN = [
  'felt on brand',
  'which felt on brand',
  'not amazing, but at least',
  'not great, but at least',
  'not great math. honest math',
  'where you stand',
  'this week i',
  'again this week',
  'rewriting my cv again',
  'updating my cv again',
  'took "open to work" off',
  'the green badge is still there',
  'i only dm people when',
  'i only reach out when',
  'i only write to people when',
];

/** Invented company name suffixes */
export const FAKE_COMPANY_SUFFIXES = [
  ' creek consulting',
  ' vale systems',
  ' hollow creek',
  ' bracket & sons',
  ' northvale systems',
  ' meridian labs',
];

export const COMMENT_SLOP = [
  'this function handles',
  'this method handles',
  'responsible for',
  'utility function',
  'helper function that',
  'performs the',
  'used to handle',
];

/** Hard ban: never leave these in de-slop / humanize output */
export const PUNCTUATION_BANS = {
  emDash: true,
  doubleHyphenAsDash: true,
  maxEmDashesPerPiece: 0,
};
