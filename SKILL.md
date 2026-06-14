---
name: anti-ai-slop
description: >-
  Detects and removes AI writing tells in prose, docs, emails, READMEs, Czech outreach,
  LinkedIn posts, and UX copy. Use for de-slop, humanize, gate, linktwerk pipeline,
  sounds like AI, or anti-ai-slop. Routes visual UI slop to impeccable.
---

Detects and removes AI-generated writing tells in plain text. Real specificity, preserved voice, no corporate sanitization.

## Absolute bans (never ship)

These are non-negotiable in `de-slop`, `humanize`, and `gate` output unless the user explicitly overrides:

- **No em dashes (`—`) or `--` as dashes.** Replace with commas, parentheses, periods, or colons. The #1 recognized AI tell.
- **No meta-AI voice** — "I hope this helps", "Certainly!", "Great question!", "I'd be happy to"
- **No filler openers** — "It's worth noting", "In today's fast-paced world", "Let's dive in"
- **No formal transitions** — Furthermore, Moreover, Additionally (use "And", "So", or nothing)
- **No colon runways** — "The result:", "Here's the key insight:" (state the fact directly)
- **No Delvish clusters** — delve + tapestry + nuanced + robust + landscape in the same piece
- **No crucial-role formula** — "X plays a crucial role in shaping Y"
- **No isn't-it's pivots** — "The hard part isn't X. It's Y." / "It's not X. It's Y."
- **No lesson lists** — "Two things that helped:" + takeaway bullets
- **No kept/lost aphorisms** — "Kept the badge, lost the pep talk"
- **No fake-casual wit** — "felt on brand", "No big scene, just…"

Full lists: [registry/phrases.md](registry/phrases.md), [registry/structural.md](registry/structural.md).

## Philosophy

1. **The slop test:** if a reader could say "AI wrote this" without hesitation, it failed.
2. **Specificity beats polish** — concrete nouns, verbs, numbers, constraints.
3. **Preserve voice** — remove tells; keep the author's register unless asked to change it.
4. **Structural tells matter** — uniform triplets, mirrored pairs, faux-profound closers, signposting scaffolds.
5. **False-positive discipline** — lists and frameworks are fine in moderation; Delvish words need clusters; **em dashes have zero tolerance** in output.

## Setup

Before any command:

1. If the user invoked a sub-command, read `reference/<command>.md`. Non-optional.
2. **Pipeline:** `linktwerk then de-slop` → [reference/pipeline-linktwerk.md](reference/pipeline-linktwerk.md).
3. **Voice:** default preserve → [reference/voice-dial.md](reference/voice-dial.md).
4. Pick a register (first match wins):
   - Czech email, outreach (`Dobrý den`, vykání) → [registry/registers/email-cs.md](registry/registers/email-cs.md)
   - LinkedIn, job-hunt post, social → [registry/registers/social.md](registry/registers/social.md)
   - Email, essay, narrative (other) → [registry/registers/prose.md](registry/registers/prose.md)
   - README, API docs, runbooks → [registry/registers/docs.md](registry/registers/docs.md)
   - Taglines, hero copy, landing text → [registry/registers/marketing.md](registry/registers/marketing.md)
3. When a file path exists, **run `scan` before `audit`, `de-slop`, or `humanize`**:
   ```bash
   node .agents/skills/anti-ai-slop/scripts/scan.mjs --json <target>
   ```
4. **Scan score is a floor, not a pass.** Score 4 with LinkedIn/job-hunt/Czech email shape still requires LLM shape audit (fake humanized, lesson lists, fake stats). See [reference/audit.md](reference/audit.md).

## Commands

| Command | Purpose | Reference |
|---------|---------|-----------|
| `scan [target]` | Fast deterministic lint | [reference/scan.md](reference/scan.md) |
| `audit [target]` | Scan + rhetorical review, slop score 0–4 | [reference/audit.md](reference/audit.md) |
| `de-slop [target]` | Aggressive rewrite; remove tells, keep meaning | [reference/de-slop.md](reference/de-slop.md) |
| `humanize [target]` | Light rewrite; max ~15% word change | [reference/humanize.md](reference/humanize.md) |
| `gate [target]` | Pre-ship check; exit code pass/fail | [reference/gate.md](reference/gate.md) |
| `loop [target]` | De-slop + re-gate until clean (≤3×) | [reference/loop.md](reference/loop.md) |
| `pipeline linktwerk` | Cringe → human in one flow | [reference/pipeline-linktwerk.md](reference/pipeline-linktwerk.md) |
| `ui-copy [file]` | Scan extracted JSX/HTML text | [reference/ui-copy.md](reference/ui-copy.md) |

## Scripts

| Script | Purpose |
|--------|---------|
| [scripts/scan.mjs](scripts/scan.mjs) | Lint + score |
| [scripts/gate.mjs](scripts/gate.mjs) | Pass/fail gate (`--strict` = score ≥ 3, zero blockers) |
| [scripts/check-fixtures.mjs](scripts/check-fixtures.mjs) | Regression test suite |
| [scripts/extract-ui-copy.mjs](scripts/extract-ui-copy.mjs) | Pull copy from `.tsx`/`.html` |

### Slop score (0–4)

- **0** — obvious AI (5+ tells or dominant structural pattern)
- **1** — heavy (3–4 tells)
- **2** — noticeable (1–2 tells)
- **3** — mostly clean
- **4** — no tells; specific and human

## Routing rules

1. **First word matches a command** → load its reference and proceed. Everything after the command name is the target.
2. **No command, intent clear** ("this README sounds robotic") → default to `audit`.
3. **Target is UI** (`.tsx`, `.jsx`, `.html`, `.vue`, `.svelte`) → extract copy via [ui-copy](reference/ui-copy.md); visual layout → impeccable.
4. **User wants cringe LinkedIn only** → `linktwerk` alone.
5. **`linktwerk then de-slop` / `linktwerk pipeline`** → [pipeline-linktwerk.md](reference/pipeline-linktwerk.md) (uses both skills in sequence).
6. **Input is linktwerk output** → `de-slop` + social register + [loop.md](reference/loop.md).
7. **Pasted text with no file** → pipe to `scan.mjs --stdin` or `gate.mjs --stdin --strict`.

## Post-output verification (de-slop / humanize / gate)

Before sending rewritten text to the user:

1. Re-read the draft aloud (mentally): does any sentence sound like a template?
2. Re-run scan on the draft (stdin or temp file).
3. Confirm **zero** em dashes, isn't-it's pivots, lesson-list headers, fake stat citations, punch-pause lines, hashtag walls.
4. If target was social/email: one concrete detail survives; no invented org names or survey percentages unless user provided them.
5. If scan score ≥ 3 but shape still feels AI → [loop.md](reference/loop.md) (max 3 iterations):
   ```bash
   node .agents/skills/anti-ai-slop/scripts/gate.mjs --json --strict draft.txt
   ```

## Sibling skills

- **impeccable** — visual UI slop (gradients, card grids, layout).
- **linktwerk** — cringe generator; pair with `pipeline linktwerk` for human output.
- **frontend-design** — prevention at creation; this skill is review/fix at edit time.

## Registry

- [registry/phrases.md](registry/phrases.md) — banned and tired phrases
- [registry/structural.md](registry/structural.md) — pattern descriptions for LLM + script hints
- [registry/registers/prose.md](registry/registers/prose.md) — essays, general email
- [registry/registers/social.md](registry/registers/social.md) — LinkedIn, job posts
- [registry/registers/email-cs.md](registry/registers/email-cs.md) — Czech outreach
- [examples.md](examples.md) — before/after pairs per register
- [scripts/phrases.mjs](scripts/phrases.mjs) — shared phrase lists for scanner (aligned with impeccable detect-text.mjs)

## CI / regression tests

```bash
# Fixture suite (must pass before skill changes ship)
node .agents/skills/anti-ai-slop/scripts/check-fixtures.mjs

# Single file strict lint
node .agents/skills/anti-ai-slop/scripts/scan.mjs --json --strict docs/**/*.md
```

Fixtures live in [tests/fixtures.json](tests/fixtures.json). Add a case when you fix a regression.
