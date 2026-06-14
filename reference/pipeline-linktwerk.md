# pipeline — linktwerk → de-slop

One workflow: cringe draft → human post.

## Invoke

User says:
- `linktwerk then de-slop`
- `linktwerk pipeline: I got fired`
- `linktwerk + anti-ai-slop`

## Steps

1. **Linktwerk** — read [linktwerk/SKILL.md](../../linktwerk/SKILL.md). Generate cringe post only + character count. Save mentally as draft v0.
2. **Switch skill** — do not add more cringe. Load [social register](../registry/registers/social.md).
3. **De-slop** — [de-slop.md](de-slop.md) on v0. Remove all linktwerk tells (fake stats, hashtags, engagement bait, lesson lists).
4. **Loop** — [loop.md](loop.md) until gate passes (max 3 iterations).
5. **Output** — final human text + short changelog (what cringe was removed).

## Output format

```markdown
[final post]

**Changelog:**
- ...
```

Do not include the linktwerk v0 unless user asks to compare.

## Voice

Default: **preserve** casual/direct. User can say `formal` or `casual` — see [voice-dial.md](voice-dial.md).
