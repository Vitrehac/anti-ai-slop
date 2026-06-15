# gate

Pre-ship check on the agent's own draft before sending to the user. Blockers only; fast.

## When to run

- User says "anti-ai-slop gate", "don't send slop", or similar
- Agent is about to deliver long-form prose (email draft, doc, blog post, README section) and wants a self-check

## Workflow

1. Take the draft about to be sent (not the user's source material).
2. Pipe to gate script:
   ```bash
   node scripts/gate.mjs --json --strict draft.txt
   # or: echo "<draft>" | node scripts/gate.mjs --stdin --strict --json
   ```
3. If fail → rewrite draft silently, re-run gate, then send. See [loop.md](loop.md) for max 3 iterations.

## Pass/fail

| Result | Action |
|--------|--------|
| **Pass** | No blockers; score ≥ 3 |
| **Fail** | Any blocker or score ≤ 1 → fix before send |

## Blockers (always fail)

- **Any em dash (`—`) or `--` used as dash**
- **isn't-it's pivot** — "The X part isn't… It's…"
- **lesson-framing** — "Two things that actually helped:" / "What I'm doing differently:" + list
- **kept-lost-pair** — "Kept the badge, lost the pep talk"
- **fake-stat-citation** — "A 2024 Stack Overflow survey found 41%…" without user-provided source
- **hashtag-wall** — 5+ hashtags on one line
- **punch-pause** — "Chew on that.", "Read that again.", "Let that sink in."
- **linkedin-engagement** — "Repost if…", "Tag someone who…", "Drop one sentence…"
- meta-ai-voice phrases
- engagement-bait closers
- opener/closer phrases from scan
- crucial-role-formula ("plays a crucial role in")
- delvish-cluster (3+ Delvish words)
- 3+ buzzword hits in short text (&lt; 500 words)

## Do not

- Gate code, diffs, or terse technical replies unless they're prose-heavy.
- Run gate on every one-line answer (overhead without benefit).
