#!/usr/bin/env bash
# Install anti-ai-slop for Claude Code (adapter + shared cache)
set -euo pipefail

REPO_URL="https://github.com/Vitrehac/anti-ai-slop.git"
CACHE_DIR="${HOME}/.anti-ai-slop"
SKILL_DIR="${HOME}/.claude/skills/anti-ai-slop"

LINK_DIRS=(reference registry scripts tests)
LINK_FILES=(examples.md)

echo "==> Anti AI Slop Claude installer"

if [ -d "${CACHE_DIR}/.git" ]; then
  echo "    Updating cache at ${CACHE_DIR}"
  git -C "${CACHE_DIR}" pull --ff-only
else
  echo "    Cloning to ${CACHE_DIR}"
  git clone "${REPO_URL}" "${CACHE_DIR}"
fi

mkdir -p "${SKILL_DIR}"

echo "    Installing adapter to ${SKILL_DIR}"
cp "${CACHE_DIR}/claude/SKILL.md" "${SKILL_DIR}/SKILL.md"
ln -sf "${CACHE_DIR}/SKILL.md" "${SKILL_DIR}/workflow.md"

for dir in "${LINK_DIRS[@]}"; do
  ln -sfn "${CACHE_DIR}/${dir}" "${SKILL_DIR}/${dir}"
done
for f in "${LINK_FILES[@]}"; do
  ln -sf "${CACHE_DIR}/${f}" "${SKILL_DIR}/${f}"
done

echo ""
echo "Done! Restart Claude Code or start a new session."
echo "Usage: /anti-ai-slop"
echo "       de-slop: [your text]"
