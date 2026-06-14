# voice-dial

How much to change voice during `de-slop` / `humanize`. User overrides default.

| Mode | When | Rules |
|------|------|-------|
| **preserve** (default) | Most rewrites | Remove tells only. Keep sentence rhythm, formality, and quirks unless they're slop. |
| **casual** | User says "more casual" / "less corporate" | Shorten sentences. Contractions OK. Drop formal transitions. Still no slop tells. |
| **formal** | Business email, legal-ish | Keep vykání / formal register. Remove template phrases, not formality. No stiff AI hedge stacks. |

## Preserve mode (critical)

Do **not** flatten into generic LinkedIn voice. If draft says "Got let go" keep blunt tone. If Czech vykání, keep vykání.

## Detect mode

1. User names it: `de-slop casual`, `humanize formal`
2. Else: Czech email → formal preserve; linktwerk pipeline → preserve casual; README → preserve technical

## Anti-patterns per mode

| Tell | preserve | casual | formal |
|------|----------|--------|--------|
| Em dash | remove | remove | remove |
| Fake stat | remove | remove | remove |
| Author's blunt opener | keep | keep | soften only if rude |
| Slang | keep | keep | remove if out of register |
