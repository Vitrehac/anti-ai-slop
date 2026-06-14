# ui-copy — scan text inside components

Visual slop → `$impeccable`. **Copy slop** → this skill on extracted text.

## Workflow

1. Confirm target is UI file (`.tsx`, `.jsx`, `.html`, `.vue`, `.svelte`).
2. Extract copy:
   ```bash
   node .agents/skills/anti-ai-slop/scripts/extract-ui-copy.mjs src/components/Hero.tsx > /tmp/copy.txt
   node .agents/skills/anti-ai-slop/scripts/scan.mjs --json /tmp/copy.txt
   ```
3. Fix copy in source file (headlines, placeholders, aria-labels, button text).
4. Do not refactor layout here — route gradients/card grids to impeccable.

## What gets extracted

- JSX text nodes (`>Learn more<`)
- `placeholder`, `title`, `aria-label`, `alt`, `description` props
- HTML element text and attributes

## UI copy slop (scanner id: `ui-copy-slop`)

- "Learn more" / "Get started" / "Click here" / "Discover how"
- Marketing buzzwords in hero text
- Same CTA repeated 3+ times in one file

## Registers

Use [marketing.md](../registry/registers/marketing.md) for hero/taglines; [prose.md](../registry/registers/prose.md) for error messages and empty states.
