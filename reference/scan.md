# scan

Fast deterministic lint. Script-backed; no LLM required.

## Workflow

1. Resolve target:
   - **File path(s):** `.md`, `.mdx`, `.txt`
   - **Pasted text:** pipe to stdin or pass as quoted argument
2. Run:
   ```bash
   node scripts/scan.mjs --json <file>
   node scripts/scan.mjs --stdin --json   # piped text
   node scripts/scan.mjs --json --strict README.md  # exit 1 if score < 3
   ```
3. If `--json` omitted, output human-readable `file:line` format.
4. Report score and findings. Do not rewrite unless user asked for `de-slop` or `humanize`.

## Output format (human)

```
score: 2/4

README.md:12  [blocker] buzzword: "streamline your workflow"
README.md:4   [warning] em-dash-overuse: 6 em-dashes in body text
```

## Output format (JSON)

```json
{
  "score": 2,
  "findings": [
    { "id": "buzzword", "file": "README.md", "line": 12, "snippet": "streamline your workflow", "severity": "blocker" }
  ]
}
```

## When scan errors

- Missing file → tell user; offer to scan pasted text instead.
- Unsupported extension (`.tsx`, `.html`) → suggest impeccable for UI; offer to scan extracted copy only.

## Scanner coverage (v2)

| ID | Severity | Detects |
|----|----------|---------|
| `em-dash` | blocker | Every `—` and `--` |
| `fake-stat-citation` | blocker | 20XX Org + survey/study found + optional % |
| `hashtag-wall` | blocker | 5+ `#tags` on one line |
| `punch-pause` | blocker | Chew on that, Read that again, etc. |
| `linkedin-engagement` | blocker | Repost if, Tag someone, Drop one sentence |
| `linktwerk-residue` | warning | Operating manual, Signals I ignored, etc. |
| `czech-email-slop` | warning | Děkuji za Váš čas, rád se učím nové věci, etc. |
| `staccato-cadence` | warning | 4+ ultra-short consecutive lines |
| `arrow-list-triplet` | warning | 3+ parallel `→` list items |

**Important:** Score 4 does not mean human. Always run LLM shape audit on social/email/linktwerk input.

## Next steps

- Score ≤ 2 → suggest `de-slop` or `audit`
- Score 3 → suggest `humanize` for polish
- Score 4 → report clean; optional `audit` for rhetorical pass
