# Anti AI Slop for Claude Code

## Install (recommended)

**macOS / Linux:**
```bash
curl -fsSL https://raw.githubusercontent.com/Vitrehac/anti-ai-slop/master/claude/install.sh | bash
```

**Windows (PowerShell):**
```powershell
irm https://raw.githubusercontent.com/Vitrehac/anti-ai-slop/master/claude/install.ps1 | iex
```

Creates `~/.anti-ai-slop/` (cache) and `~/.claude/skills/anti-ai-slop/` (adapter + symlinks).

## Quick install

```bash
git clone https://github.com/Vitrehac/anti-ai-slop.git ~/.claude/skills/anti-ai-slop
```

## Usage

```
/anti-ai-slop
de-slop: this email sounds robotic
node scripts/gate.mjs --strict draft.txt
```

## Update

Re-run install script, or `cd ~/.anti-ai-slop && git pull` then re-run install.
