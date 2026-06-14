#!/usr/bin/env node
/**
 * Extract human-readable copy from UI files for scanning.
 * node extract-ui-copy.mjs Component.tsx > copy.txt
 * node extract-ui-copy.mjs page.html | node scan.mjs --stdin --json
 */
import fs from 'node:fs';
import path from 'node:path';

const file = process.argv[2];
if (!file) {
  process.stderr.write('Usage: extract-ui-copy.mjs <file.tsx|jsx|html|vue>\n');
  process.exit(2);
}

const content = fs.readFileSync(path.resolve(file), 'utf8');
const ext = path.extname(file).toLowerCase();
const chunks = new Set();

function add(s) {
  const t = s.replace(/\s+/g, ' ').trim();
  if (t.length >= 8 && t.length < 500 && /[a-zA-Z]{3,}/.test(t)) chunks.add(t);
}

if (['.tsx', '.jsx', '.vue', '.svelte'].includes(ext)) {
  // JSX text nodes
  for (const m of content.matchAll(/>([^<>{}]{8,200})</g)) add(m[1]);
  // string props
  for (const prop of ['placeholder', 'title', 'aria-label', 'alt', 'label', 'description']) {
    const re = new RegExp(`${prop}=["']([^"']+)["']`, 'gi');
    for (const m of content.matchAll(re)) add(m[1]);
  }
  // template strings in JSX children
  for (const m of content.matchAll(/["'`]([^"'`\n]{12,200})["'`]/g)) {
    if (!/^(import|from|className|http|\/)/.test(m[1])) add(m[1]);
  }
} else if (ext === '.html') {
  for (const m of content.matchAll(/>([^<>]{8,200})</g)) add(m[1]);
  for (const m of content.matchAll(/(?:placeholder|title|alt|aria-label)=["']([^"']+)["']/gi)) add(m[1]);
}

process.stdout.write([...chunks].join('\n\n') + '\n');
