# Banned and tired phrases

Flag on sight unless the user brief explicitly requires them. Severity: **blocker** for meta-AI voice, engagement bait, em dashes, and Delvish clusters; **warning** for isolated vocabulary tells.

## Punctuation (hard ban)

**No em dashes. No `--` as dash.** This is the single most recognized AI tell (3–5× human rate per antislop research). On `de-slop` and `humanize`, remove every `—` and `--` used as punctuation. Replace with:

| Instead of | Use |
|------------|-----|
| em dash parenthetical | parentheses or commas |
| em dash dramatic pause | period; new sentence |
| em dash before a list | colon after a complete clause, or break into bullets |

Max em dashes in shipped copy: **0** (this skill default). Rare human essayists may override explicitly.

## Openers

- "In today's fast-paced world" / "In this digital world"
- "In the world of X" / "In an ever-changing landscape"
- "Let's dive in" / "Let's dive deeper"
- "Here's the thing"
- "It's worth noting that" / "It's important to recognize that"
- "What this means is"
- "I hope this email finds you well"
- "In this article we will explore"
- "Picture this" / "Imagine a busy professional"

## Closers

- "In conclusion" / "To summarize"
- "The bottom line is" / "At the end of the day"
- "Only time will tell" / "Food for thought"
- "Quality speaks for itself" (aphorism ending)
- "After all, the best X is X" (fortune-cookie close)

## Formal transitions (nobody says these aloud)

- Furthermore / Moreover / Additionally / Subsequently / Consequently
- Fix: "Also", "And", "So", or start the next sentence with no connector

## Hedge stacks

Flag when two or more appear in the same paragraph:

- "It's important to note that" + Furthermore / Moreover / Additionally

## Delvish vocabulary (Reddit / ChatGPTese)

Over-indexed words. One may be fine; **3+ distinct words** or **2+ occurrences** in a short piece = slop cluster:

- delve, tapestry, kaleidoscope, foster, nuanced, intricate, multifaceted
- robust, pivotal, crucial, essential, landscape (as filler: "in the X landscape")
- embark, embrace, elevate, comprehensive, holistic, synergy, utilize

## Hedging verbs (WriteHuman 2026)

AI pads with these instead of stating what happens:

- ensures / ensuring, highlights, underscores, showcases, facilitates, reflects, demonstrates

Fix: delete the hedge; say what the thing **does**.

## Intensifier adverbs

significantly, effectively, increasingly, remarkably, fundamentally, inherently — flag when 3+ in one piece.

## Marketing buzzwords

- streamline / empower / supercharge / unleash / leverage / harness the power
- world-class, enterprise-grade, cutting-edge, game-changer, paradigm shift
- unlock the secrets, master the art of, 10x your, crush your competitors

## Colon-runway sentences

AI em-dash substitute. Flag 2+ per piece:

- "The result: …" / "The bottom line: …" / "Here's the key insight: …"

Fix: delete the runway; state the fact.

## Structural sentence shapes

- "X plays a crucial/critical/important role in shaping Y"
- "Whether you're X or Y, …" (false inclusivity opener)
- "From X to Y, …" as default section opener
- "It is not X; it is Y" / "Not X. Y." (negative parallelism)

## Engagement bait

- Thoughts? / Agree? / Let that sink in. / Let me be clear

## Meta AI voice

- As an AI / I hope this helps / Certainly! / Great question! / I'd be happy to / Feel free to

## Isn't-it's pivot (blocker)

- "The annoying part isn't the rejection emails. It's the in-between weeks…"
- "It's not X. It's Y."
- "The real problem isn't… it's…"

**Fix:** Say what happened. Don't reframe into a lesson mid-paragraph.

## Kept/lost micro-pairs (blocker)

- "Kept the badge, lost the pep talk"

**Fix:** One plain sentence about what you changed.

## Lesson-list framing (blocker)

- "Two/three things that actually helped:"
- "Here's what I learned:"
- Numbered takeaway bullets after a personal story

**Fix:** Delete the list. Fold one fact into the narrative or cut takeaways entirely.

## Fake-casual wit (warning)

- "felt on brand" / "which felt on brand"
- "No big scene, just…" / "No drama, just…"
- "Not amazing, but at least…"

## Job-hunt / LinkedIn humanized slop

- "excited about new opportunities"
- "I'd love to connect" (generic)
- "where you stand"
- "new chapter" / "next chapter"

## Theater framing

- "\w+ theater" — productivity theater, engagement theater
- "not just X, it's Y"

## Email slop

- I hope this email finds you well
- Excessive Moreover / Furthermore in business email

## LinkedIn slop (from linktwerk / thought-leadership)

- Game-changer / Deep dive / Thoughts? / Agree?
- Punch-pause: Let that sink in. / Chew on that. / Read that again. / I mean that literally.
- Engagement bait: Repost if… / Tag someone… / Drop one sentence… / Comment below
- Fake stats: A 20XX [Gallup|Stack Overflow|CNBC|Gartner|McKinsey] … found [N]%
- Hashtag walls (5+ tags on one line)
- Linktwerk section titles: Operating manual updates / Signals I ignored / Notes from the wreckage
- Staccato poetry: 4+ consecutive ultra-short lines

## Czech email slop

- Děkuji za Váš čas / přeji hodně úspěchů (template close)
- Rád se učím nové věci (empty interest)
- Moc se mi líbí, co budujete (generic praise)
- Rád bych se zeptal, jestli by byla možnost (hedge stack)
- Dávalo by to smysl oběma stranám (corporate symmetry)
