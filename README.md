# Anti AI Slop

A [Cursor Agent Skill](https://cursor.com/docs/agent/skills) that **detects and removes AI writing tells** — em dashes, fake stats, lesson lists, LinkedIn engagement bait, Czech template emails, and the "humanized" shape that still smells like ChatGPT.

> Scan it. Gate it. De-slop it. Ship text that sounds like a person wrote it.

Pairs with [linktwerk](https://github.com/Vitrehac/linktwerk) for `cringe draft → human post` pipelines.

---

## What it does

Give the agent text that feels robotic, buzzword-heavy, or machine-generated. Anti AI Slop:

- **Scans** for 30+ tell categories (blockers + warnings)
- **Scores** slop 0–4 (0 = obvious AI, 4 = clean)
- **De-slops** aggressively while preserving your voice
- **Gates** output before send (pass/fail exit codes)
- **Loops** rewrite → re-gate until clean (max 3 iterations)

### Hard bans (zero tolerance)

| Tell | Example |
|------|---------|
| Em dashes | `It's not X — it's Y` |
| Isn't-it's pivots | `The hard part isn't the emails. It's the waiting.` |
| Fake stats | `A 2024 Stack Overflow survey found 41%…` |
| Lesson lists | `Two things that helped:` + bullets |
| LinkedIn bait | `Repost if…`, `Chew on that.`, hashtag walls |
| Czech templates | `Děkuji za Váš čas`, `rád se učím nové věci` |
| Meta-AI voice | `I hope this helps`, `Certainly!` |

### Registers (context-aware)

- **Social** — LinkedIn, job posts, linktwerk cleanup
- **Prose** — emails, essays, narratives
- **Email CS** — Czech outreach (`Dobrý den`, vykání)
- **Docs** — READMEs, API docs, runbooks
- **Marketing** — hero copy, taglines
- **UI copy** — extract text from `.tsx`/`.html` components

---

## Install

### Cursor (personal — all projects)

```bash
git clone https://github.com/Vitrehac/anti-ai-slop.git ~/.cursor/skills/anti-ai-slop
```

Windows (PowerShell):

```powershell
git clone https://github.com/Vitrehac/anti-ai-slop.git "$env:USERPROFILE\.cursor\skills\anti-ai-slop"
```

### Cursor (project-only)

```bash
git clone https://github.com/Vitrehac/anti-ai-slop.git .cursor/skills/anti-ai-slop
```

Or copy into `.agents/skills/anti-ai-slop/` if your project uses that layout.

Restart Cursor or start a new agent chat after installing.

### Claude Code

```bash
git clone https://github.com/Vitrehac/anti-ai-slop.git ~/.claude/skills/anti-ai-slop
```

---

## Usage

### In Cursor chat

```
@anti-ai-slop de-slop: [paste your text]
@anti-ai-slop humanize this email
@anti-ai-slop scan my README
linktwerk pipeline: I got fired and I'm job hunting
```

### CLI scripts (from repo root)

```bash
# Lint + score
node scripts/scan.mjs --json draft.txt

# Pass/fail gate (CI-friendly)
node scripts/gate.mjs --strict draft.txt

# Regression tests
node scripts/check-fixtures.mjs

# Extract UI copy from React/HTML
node scripts/extract-ui-copy.mjs src/Hero.tsx | node scripts/scan.mjs --stdin --json
```

### Commands

| Command | What |
|---------|------|
| `scan` | Fast deterministic lint, slop score 0–4 |
| `audit` | Scan + rhetorical review with findings |
| `de-slop` | Aggressive rewrite, remove tells, keep meaning |
| `humanize` | Light touch (~15% word change max) |
| `gate` | Pre-ship check — blockers fail |
| `loop` | De-slop + re-gate until pass (≤3×) |
| `pipeline linktwerk` | [Linktwerk](https://github.com/Vitrehac/linktwerk) cringe → human post |
| `ui-copy` | Scan copy inside JSX/HTML files |

### Voice modes

```
de-slop casual: [text]     # shorter, less corporate
de-slop formal: [text]     # keep formality, cut templates
de-slop: [text]            # preserve (default)
```

---

## Example

**Before (fake-humanized — passes buzzword scan, fails shape):**

> I got let go last month. No big scene, just a short call.
> The annoying part isn't the rejection emails. It's the in-between weeks.
> Two things that actually helped:
> - I stopped sending generic connect messages
> - Kept the badge, lost the pep talk

**After (de-slopped):**

> I got laid off last month on a 12-minute call. IT locked my laptop before I finished saying goodbye.
> Since then: 47 applications, 11 replies. I'm rewriting my CV again this week.
> I only message people when I have a question about the team or stack.

More before/after pairs in [examples.md](examples.md).

---

## Repo layout

```
anti-ai-slop/
├── SKILL.md                 # Main skill (start here)
├── README.md
├── examples.md              # Before/after by register
├── registry/
│   ├── phrases.md           # Banned phrases
│   ├── structural.md        # Pattern descriptions
│   └── registers/           # prose, social, email-cs, docs, marketing
├── reference/               # Per-command workflows
│   ├── de-slop.md
│   ├── gate.md
│   ├── loop.md
│   ├── pipeline-linktwerk.md
│   └── ...
├── scripts/
│   ├── scan.mjs             # Linter + scorer
│   ├── gate.mjs             # Pass/fail gate
│   ├── check-fixtures.mjs   # Regression tests
│   └── extract-ui-copy.mjs
└── tests/
    ├── fixtures.json
    └── fixtures/            # 7 test cases
```

---

## CI

```bash
node scripts/check-fixtures.mjs
node scripts/scan.mjs --json --strict docs/**/*.md
```

---

## Sibling skills

| Skill | Role |
|-------|------|
| [linktwerk](https://github.com/Vitrehac/linktwerk) | Generate cringe LinkedIn posts → pipe here |
| impeccable | Visual UI slop (gradients, card grids) — not text |

---

## License

MIT — use it, fork it, keep humans sounding human.
