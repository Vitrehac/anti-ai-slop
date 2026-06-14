#!/usr/bin/env node
/**
 * Pre-ship gate — exit 0 pass, 1 fail.
 * node gate.mjs --stdin
 * node gate.mjs draft.txt
 * node gate.mjs --json --strict draft.txt
 */
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { analyzeContent, computeScore } from './scan.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function readStdin() {
  return new Promise((resolve, reject) => {
    const chunks = [];
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', c => chunks.push(c));
    process.stdin.on('end', () => resolve(chunks.join('')));
    process.stdin.on('error', reject);
  });
}

async function main() {
  const args = process.argv.slice(2);
  const json = args.includes('--json');
  const stdin = args.includes('--stdin');
  const strict = args.includes('--strict');
  const minScore = strict ? 3 : 2;
  const paths = args.filter(a => !a.startsWith('--'));

  let content;
  let file = '<stdin>';
  if (stdin) {
    content = await readStdin();
  } else if (paths[0]) {
    file = paths[0];
    content = fs.readFileSync(path.resolve(file), 'utf8');
  } else {
    process.stderr.write('Usage: gate.mjs [--json] [--strict] [--stdin] [file]\n');
    process.exit(2);
  }

  const findings = analyzeContent(content, file);
  const score = computeScore(findings);
  const blockers = findings.filter(f => f.severity === 'blocker');
  const pass = blockers.length === 0 && score >= minScore;

  const result = { pass, score, blockers: blockers.length, findings };

  if (json) {
    process.stdout.write(JSON.stringify(result, null, 2) + '\n');
  } else {
    process.stdout.write(pass ? `PASS (score ${score}/4)\n` : `FAIL (score ${score}/4, ${blockers.length} blocker(s))\n`);
    for (const f of blockers) {
      process.stdout.write(`  [blocker] ${f.id}: ${f.snippet}\n`);
    }
  }

  process.exit(pass ? 0 : 1);
}

main().catch(err => {
  process.stderr.write(`Error: ${err.message}\n`);
  process.exit(2);
});
