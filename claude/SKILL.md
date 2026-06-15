---
name: anti-ai-slop
description: >-
  Detects and removes AI writing tells in prose, docs, emails, READMEs, Czech outreach,
  LinkedIn posts, and UX copy. Use for de-slop, humanize, gate, linktwerk pipeline,
  sounds like AI, or anti-ai-slop.
disable-model-invocation: true
allowed-tools: Read Bash(node:*)
---

# Anti AI Slop (Claude Code)

Follow [workflow.md](workflow.md) — source of truth for commands, registers, and verification.

## Instructions

1. Read [workflow.md](workflow.md).
2. For sub-commands, read files in [reference/](reference/) (e.g. `de-slop.md`, `gate.md`, `loop.md`).
3. Run scripts from this directory:
   ```bash
   node scripts/scan.mjs --json <file>
   node scripts/gate.mjs --strict <file>
   ```
4. Invoke via `/anti-ai-slop` or natural language (`de-slop this email`).
