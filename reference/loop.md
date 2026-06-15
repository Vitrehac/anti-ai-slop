# loop — rewrite until gate passes

Automated **agent** loop. Scripts gate; LLM rewrites. Max **3 iterations**.

## When to use

- `de-slop` or `humanize` on important copy (email, LinkedIn, outreach)
- User says "keep looping until clean"
- After `linktwerk` pipeline step 2

## Workflow

```
┌─────────┐     fail      ┌──────────┐
│  scan   │──────────────►│ de-slop  │
└────┬────┘               └────┬─────┘
     │ pass                     │
     ▼                          │
┌─────────┐◄───────────────────┘
│  gate   │  (repeat ≤3×)
└────┬────┘
     │ pass
     ▼
  ship to user
```

1. **Scan** draft:
   ```bash
   node scripts/scan.mjs --json <file>
   ```
2. **Gate** (blockers = hard fail):
   ```bash
   node scripts/gate.mjs --json --strict <file>
   ```
3. If fail → apply [de-slop.md](de-slop.md) + register + [voice-dial.md](voice-dial.md). Fix every blocker first.
4. Re-run gate. Repeat until pass or **3 iterations**.
5. If still failing after 3 → tell user what's stuck; do not ship slop.

## Pass criteria (`--strict`)

- Score ≥ 3
- Zero blocker findings
- LLM shape check: no lesson lists, fake stats, template closers (even if score 3)

## Do not

- Loop on one-line replies or code comments.
- Exceed 3 iterations without user input.
