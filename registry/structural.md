# Structural slop patterns

Scripts use heuristics where possible; LLM audit catches the rest. Based on Wikipedia "Signs of AI Writing", WriteHuman 2026 data, and Markets2Mountains 15-pattern checklist.

## Em-dash saturation (hard ban)

AI uses em dashes at 3–5× human rate. **Default policy: zero** in output.

Scanner flags every `—` and `--` (not markdown `---` rules). Rewrite must remove all.

## Uniform triplets (tricolon abuse)

Everything in groups of three: "Faster. Smarter. Better." Three adjectives, three bullets, three examples, consistently.

**Fix:** Use two, four, or one. Save three for when the third item surprises.

## Colon-runway sentences

"The result: generic content fails." "Here's the key insight: quality matters."

AI overcorrected away from em dashes into this pattern. Max 0–1 per piece.

**Fix:** Delete the runway prefix.

## Crucial-role formula

"X plays a crucial/critical/important role in shaping Y" — top AI trigram shape (WriteHuman 2026).

**Fix:** Say what X actually does.

## Whether-you're-X-or-Y

False inclusivity opener. "Whether you're a startup or enterprise…"

**Fix:** Name the actual audience or drop the opener.

## Redundant intro pattern

Heading restates first sentence, or "In this article we will explore…"

**Fix:** Cut intro; start with substance.

## Excessive signposting

"First… Second… Third…" across the doc when order isn't load-bearing.

## Monotone cadence

Uniform sentence length for 8+ sentences. Voice-flat: grammatically perfect, no memorable detail (substitution test: swap author name, post still works).

## Aphoristic cadence

- "Not a X. A Y." / "It is not X; it is Y."
- **"The [hard/annoying/real] part isn't X. It's Y."** — the #1 fake-humanized LinkedIn pivot
- **"Kept X, lost Y."** — aphoristic micro-pair ("Kept the badge, lost the pep talk")
- Short punchy negation after every serious statement (OpenAI house style)
- Fortune-cookie section endings

**Threshold:** 2+ instances → flag. **Single `isn't…It's` pivot = blocker.**

## Fake humanized (passes buzzword scan, still slop)

Copy that removed em dashes and buzzwords but kept AI **shape**:

- Staccato drama openers: "No big scene, just a short call…"
- Manufactured balance: "Not amazing, but at least I know where I stand"
- Performative wit: "felt on brand", "which felt on brand"
- Lesson listicle: "Two things that actually helped:" + parallel bullets
- Outreach before/after lesson: "I stopped X and only Y when Z"
- Job-hunt pep: "excited about new opportunities", "new chapter"
- CV-update montage without a specific detail

**Fix:** Drop the lesson structure. State what happened; skip the moral. No pivot sentences. If there are takeaways, bury them in plain facts or cut them.

## Lesson-list framing

"Two things that actually helped:" followed by parallel takeaway bullets.

**Fix:** Delete the header and list. One narrative paragraph is enough.

## Numbered section markers

`01 / 02 / 03` as decorative eyebrows on 3+ sections.

## Bold-first bullets

Every list item starts with **Bold label:** rest of sentence. Markdown tell.

**Fix:** Plain bullets or vary structure.

## Self-referential framing

"This article explores…" "In the following sections we will…"

**Fix:** Start with the first fact.

## Manufactured profundity (LLM-only)

- Generic examples ("imagine a busy professional", "teams like yours")
- Symmetrical contrast pairs as recurring voice
- Closing that restates the title with no new information

## Fake stat citations (blocker)

- "A 20XX [Org] survey/study/report found [N]%…" without user-provided source
- Invented employer names used as social proof ("Left Hollow Creek Consulting…")

**Fix:** Delete the stat or replace with honest framing ("roughly 50 applications so far").

## Hashtag walls (blocker)

Five or more `#tags` on one line, usually at post end.

**Fix:** Delete hashtags or keep 0–2 that match the actual ask.

## Linktwerk / thought-leadership residue

Scanner flags many; LLM catches the rest:

- Staccato one-liner poetry (4+ short lines in a row)
- Arrow-list life lessons (`→` × 3+)
- Punch-pause ("Chew on that.", "I mean that literally.")
- Engagement CTAs ("Repost if…", "Tag someone…")
- Section titles: "Operating manual updates", "Signals I ignored", "Notes from the wreckage"

## Czech email slop (LLM + scan)

See [registers/email-cs.md](../registers/email-cs.md). Flag template closers and empty interest lists even when English scan is clean.

## Hedge stack

Two+ formal transitions or hedging verbs in one paragraph without new information.

## Voice violations (LLM audit)

- Guru language: unlock secrets, master the art of
- Hustle contamination: 10x, crush, grind through
- Over-intellectualizing: intricate, nuanced, multifaceted for simple topics
