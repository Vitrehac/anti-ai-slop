# audit

Scan plus rhetorical review. Produces slop score and actionable findings.

## Workflow

1. Load the matching register from `registry/registers/`.
2. **Run scan first** when a file path exists:
   ```bash
   node scripts/scan.mjs --json <target>
   ```
3. Read the full target (file or pasted text).
4. Apply script findings as blockers/warnings.
5. LLM pass for rhetorical tells scripts miss (see [registry/structural.md](../registry/structural.md)):
   - **Fake humanized** — no buzzwords/em dashes, but lesson shape, isn't-it's pivots, performative wit remain
   - **Fake stats** — plausible org + percentage with no user-provided source
   - **Linktwerk residue** — staccato lines, arrow lists, punch-pause, engagement CTAs
   - Manufactured profundity
   - Generic examples
   - Symmetrical contrast pairs as crutch
   - SaaS-blog / thought-leadership voice
6. Output using the template below.

## Critical rule

**Never trust score 4 alone** on LinkedIn posts, job-hunt copy, Czech outreach, or linktwerk input. Run the LLM shape checklist even when scan returns zero findings.

## Output template

```markdown
## Slop score: N/4

### Blockers (must fix)
- [category] finding → suggested fix

### Warnings
- [category] finding → suggested fix

### Clean strengths (keep these)
- ...

### Next step
Run `de-slop` for full rewrite, or `humanize` for light pass.
```

## Scoring

Combine script score with LLM assessment:

| Score | Criteria |
|-------|----------|
| 0 | 5+ tells or dominant structural pattern across the piece |
| 1 | 3–4 tells |
| 2 | 1–2 noticeable tells |
| 3 | Subtle issues only; mostly specific |
| 4 | No tells; reads human and specific |

Script `score` from scan.mjs is the floor; LLM may lower by 1 if rhetorical slop is severe but unscanned.

## Do not

- Rewrite the text unless user also asked for `de-slop` or `humanize`.
- Audit UI markup for visual slop — route to impeccable.
