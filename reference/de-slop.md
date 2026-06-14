# de-slop

Aggressive rewrite: remove tells, keep meaning. Voice preserved per register.

## Workflow

1. Load the matching register from `registry/registers/`.
2. **Run scan first** when a file path exists; fix every **blocker** from findings.
3. Read full target.
4. Rewrite applying register constraints and [registry/phrases.md](../registry/phrases.md) bans.
5. Re-run scan on the rewrite if file-based; score should be ≥ 3.
6. Output per format below.

## Rewrite rules

0. **Remove every em dash and `--` dash.** Use commas, parentheses, periods, or colons. Zero tolerance.
1. Run `scan` first; fix every **blocker** (including each `em-dash` finding).
2. **Kill fake-humanized shape:** no isn't-it's pivots, no lesson-list takeaways, no kept/lost pairs, no "felt on brand" wit.
3. Replace abstract verbs and hedging verbs (ensures, highlights, underscores) with what literally happens.
4. Cut intro/outro scaffolding, colon runways, and crucial-role formulas.
5. Vary sentence rhythm; break template structures (uniform triplets, signposting, Whether-you're-X-or-Y).
6. Keep facts, numbers, names, and technical terms accurate.
7. Do not add new claims the source did not support.
8. **Remove invented stats, company names, and survey citations** unless the user provided them.
9. **Social/email:** collapse lesson lists; max 0–2 hashtags; no repost/tag bait.

## Post-rewrite verification (mandatory)

Before output:

1. Re-run scan on the rewrite (`--stdin` or temp file).
2. Read [registry/structural.md](../registry/structural.md) fake-humanized section; fix any remaining shape tells.
3. If score still ≥ 3 but copy feels templated → rewrite once more; do not ship.

## Output format

Unless user asked for commentary only:

1. **Rewritten text** (full replacement, or edited file)
2. **Changelog** (3–6 bullets):
   - What tell was removed
   - What specificity was added

Example changelog:

```
- Removed "In today's fast-paced world" opener
- Replaced "streamline your workflow" with "exports CSV in under 2s"
- Cut redundant intro that repeated the H1
- Broke three identical "We help you…" bullets into varied constructions
```

## When target is a file

Apply edits to the file unless user pasted text for review only.

## Do not

- Sanitize into corporate voice unless register or user asks for it.
- Invoke linktwerk or add cringe patterns.
