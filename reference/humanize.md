# humanize

Light rewrite: minimal edits, preserve voice. Max ~15% word change.

## Workflow

1. Load the matching register from `registry/registers/`.
2. **Run scan first** when a file path exists.
3. Fix **blockers** only; touch warnings only when a one-word swap suffices.
4. Do not restructure entire sections or change document outline.
5. Re-run scan if file-based; aim for score ≥ 3.

## Rewrite rules

- **Remove all em dashes and `--` dashes** (blockers); swap for commas, parentheses, or new sentences.
- Swap banned phrases and Delvish vocabulary for plain equivalents.
- Remove meta-AI voice lines entirely.
- Trim throat-clearing openers and colon runways if redundant.
- Keep sentence count within ~15% of original.
- Preserve formatting (headings, lists, code blocks) unless a heading is pure slop.

## Output format

Same as de-slop:

1. Rewritten text
2. Short changelog (2–4 bullets; only what changed)

## When to suggest de-slop instead

- Score ≤ 1 after humanize pass
- Structural patterns dominate (uniform triplets, aphoristic cadence throughout)
- User said "sounds like ChatGPT" and wants a full pass
