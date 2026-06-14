#!/usr/bin/env node
/**
 * Run fixture suite — exits 1 if any case fails.
 * node .agents/skills/anti-ai-slop/scripts/check-fixtures.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { analyzeContent, computeScore } from './scan.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'tests', 'fixtures.json'), 'utf8'));
const fixturesDir = path.join(root, 'tests', 'fixtures');

let failed = 0;

for (const spec of manifest) {
  const filePath = path.join(fixturesDir, spec.file);
  const content = fs.readFileSync(filePath, 'utf8');
  const findings = analyzeContent(content, spec.file);
  const score = computeScore(findings);
  const blockers = findings.filter(f => f.severity === 'blocker').length;
  const warnings = findings.filter(f => f.severity === 'warning').length;
  const ids = [...new Set(findings.map(f => f.id))];

  const errors = [];

  if (spec.minScore !== undefined && score < spec.minScore) {
    errors.push(`score ${score} < min ${spec.minScore}`);
  }
  if (spec.maxScore !== undefined && score > spec.maxScore) {
    errors.push(`score ${score} > max ${spec.maxScore}`);
  }
  if (spec.minBlockers !== undefined && blockers < spec.minBlockers) {
    errors.push(`blockers ${blockers} < min ${spec.minBlockers}`);
  }
  if (spec.maxBlockers !== undefined && blockers > spec.maxBlockers) {
    errors.push(`blockers ${blockers} > max ${spec.maxBlockers}`);
  }
  if (spec.minWarnings !== undefined && warnings < spec.minWarnings) {
    errors.push(`warnings ${warnings} < min ${spec.minWarnings}`);
  }
  if (spec.expectIds) {
    for (const id of spec.expectIds) {
      if (!ids.includes(id)) errors.push(`missing expected finding id: ${id}`);
    }
  }

  if (errors.length) {
    failed++;
    process.stderr.write(`FAIL ${spec.id}: ${errors.join('; ')}\n`);
    process.stderr.write(`  score=${score} blockers=${blockers} warnings=${warnings} ids=${ids.join(',')}\n`);
  } else {
    process.stdout.write(`ok ${spec.id} (score=${score})\n`);
  }
}

if (failed) {
  process.stderr.write(`\n${failed} fixture(s) failed\n`);
  process.exit(1);
}
process.stdout.write(`\nAll ${manifest.length} fixtures passed\n`);
