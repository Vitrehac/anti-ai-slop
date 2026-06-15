# Install anti-ai-slop for Claude Code (adapter + shared cache)
$ErrorActionPreference = "Stop"

$RepoUrl = "https://github.com/Vitrehac/anti-ai-slop.git"
$CacheDir = Join-Path $env:USERPROFILE ".anti-ai-slop"
$SkillDir = Join-Path $env:USERPROFILE ".claude\skills\anti-ai-slop"

$LinkDirs = @("reference", "registry", "scripts", "tests")
$LinkFiles = @("examples.md")

Write-Host "==> Anti AI Slop Claude installer"

if (Test-Path (Join-Path $CacheDir ".git")) {
  Write-Host "    Updating cache at $CacheDir"
  git -C $CacheDir pull --ff-only
} else {
  Write-Host "    Cloning to $CacheDir"
  git clone $RepoUrl $CacheDir
}

New-Item -ItemType Directory -Force -Path $SkillDir | Out-Null

Write-Host "    Installing adapter to $SkillDir"
Copy-Item (Join-Path $CacheDir "claude\SKILL.md") (Join-Path $SkillDir "SKILL.md") -Force

function Link-OrCopy {
  param([string]$Source, [string]$Dest)
  if (Test-Path $Dest -PathType Container) { Remove-Item $Dest -Recurse -Force -ErrorAction SilentlyContinue }
  try {
    if ((Get-Item $Source).PSIsContainer) {
      New-Item -ItemType SymbolicLink -Path $Dest -Target $Source -Force | Out-Null
    } else {
      New-Item -ItemType SymbolicLink -Path $Dest -Target $Source -Force | Out-Null
    }
  } catch {
    if ((Get-Item $Source).PSIsContainer) {
      Copy-Item $Source $Dest -Recurse -Force
    } else {
      Copy-Item $Source $Dest -Force
    }
  }
}

Link-OrCopy (Join-Path $CacheDir "SKILL.md") (Join-Path $SkillDir "workflow.md")
foreach ($dir in $LinkDirs) {
  Link-OrCopy (Join-Path $CacheDir $dir) (Join-Path $SkillDir $dir)
}
foreach ($f in $LinkFiles) {
  Link-OrCopy (Join-Path $CacheDir $f) (Join-Path $SkillDir $f)
}

Write-Host ""
Write-Host "Done! Restart Claude Code or start a new session."
Write-Host "Usage: /anti-ai-slop"
Write-Host "       de-slop: [your text]"
