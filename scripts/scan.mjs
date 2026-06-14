#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  OPENERS,
  CLOSERS,
  HEDGE_PHRASES,
  BUZZWORDS,
  ENGAGEMENT_BAIT,
  META_AI,
  COMMENT_SLOP,
  DELVISH_WORDS,
  HEDGING_VERBS,
  INTENSIFIERS,
  COLON_RUNWAYS,
  LESSON_FRAMERS,
  FAKE_CASUAL,
  JOB_HUNT_SLOP,
  PUNCH_PAUSE,
  LINKEDIN_ENGAGEMENT,
  LINKTWErk_RESIDUE,
  CZECH_SLOP,
  FAKE_STAT_MARKERS,
  SUBTLE_FAKE_HUMAN,
  FAKE_COMPANY_SUFFIXES,
} from './phrases.mjs';

const SUPPORTED_EXT = new Set(['.md', '.mdx', '.txt']);

function stripMarkdown(text) {
  return text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]+`/g, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_~]/g, '')
    .replace(/^>\s?/gm, '')
    .replace(/^[-*+]\s+/gm, '')
    .replace(/^\d+\.\s+/gm, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function lineOf(text, index) {
  return text.slice(0, index).split('\n').length;
}

function finding(id, file, line, snippet, severity) {
  return { id, file, line, snippet, severity };
}

function isInsideQuotes(content, idx) {
  const before = content.slice(0, idx);
  if ((before.match(/"/g) || []).length % 2 === 1) return true;
  if ((before.match(/`/g) || []).length % 2 === 1) return true;
  return false;
}

function isDocBanLine(lineText) {
  return /^\s*-\s+(no|never|max|fix:|flag)\b/i.test(lineText)
    || /^\s*\|\s*em dash/i.test(lineText)
    || /\*\*before:\*\*/i.test(lineText);
}

function findPhraseMatches(content, file, phrases, id, severity) {
  const lower = content.toLowerCase();
  const findings = [];
  const seen = new Set();

  for (const phrase of phrases) {
    let from = 0;
    while (true) {
      const idx = lower.indexOf(phrase, from);
      if (idx === -1) break;
      if (isInsideQuotes(content, idx)) {
        from = idx + phrase.length;
        continue;
      }
      const line = lineOf(content, idx);
      const lineText = content.split('\n')[line - 1] || '';
      if (isDocBanLine(lineText)) {
        from = idx + phrase.length;
        continue;
      }
      const key = `${id}:${line}:${phrase}`;
      if (!seen.has(key)) {
        seen.add(key);
        const start = Math.max(0, idx - 8);
        const end = Math.min(content.length, idx + phrase.length + 8);
        findings.push(finding(id, file, line, content.slice(start, end).trim(), severity));
      }
      from = idx + phrase.length;
    }
  }
  return findings;
}

/** Every em dash and -- (not ---) is a blocker — zero-tolerance default */
function checkEmDashes(content, file) {
  const findings = [];
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^---+\s*$/.test(line.trim())) continue;
    if (line.includes('```')) continue;

    const emRe = /—/g;
    let m;
    while ((m = emRe.exec(line)) !== null) {
      if (isInsideQuotes(line, m.index) || isDocBanLine(line)) continue;
      findings.push(finding('em-dash', file, i + 1, line.trim().slice(Math.max(0, m.index - 20), m.index + 20), 'blocker'));
    }

    const dhRe = /(?<!-)--(?!-)/g;
    while ((m = dhRe.exec(line)) !== null) {
      if (isInsideQuotes(line, m.index) || isDocBanLine(line)) continue;
      findings.push(finding('em-dash', file, i + 1, line.trim().slice(Math.max(0, m.index - 20), m.index + 25), 'blocker'));
    }
  }
  return findings;
}

function checkDelvishCluster(content, file) {
  const text = stripMarkdown(content).toLowerCase();
  const words = text.split(/\W+/).filter(Boolean);
  const hits = new Map();
  for (const w of words) {
    if (DELVISH_WORDS.includes(w)) {
      hits.set(w, (hits.get(w) || 0) + 1);
    }
  }
  const distinct = hits.size;
  const total = [...hits.values()].reduce((a, b) => a + b, 0);
  if (distinct < 3 && total < 3) return [];
  const sample = [...hits.keys()].slice(0, 5).join(', ');
  return [finding('delvish-cluster', file, 1, `${distinct} Delvish words (${total} hits): ${sample}`, 'blocker')];
}

function checkHedgingVerbs(content, file) {
  const text = stripMarkdown(content).toLowerCase();
  let count = 0;
  let first = '';
  for (const verb of HEDGING_VERBS) {
    const re = new RegExp(`\\b${verb}\\b`, 'g');
    let m;
    while ((m = re.exec(text)) !== null) {
      count++;
      if (!first) first = verb;
    }
  }
  if (count < 3) return [];
  return [finding('hedging-verb', file, 1, `${count} hedging verbs (e.g. "${first}")`, 'warning')];
}

function checkIntensifiers(content, file) {
  const text = stripMarkdown(content).toLowerCase();
  let count = 0;
  for (const word of INTENSIFIERS) {
    const re = new RegExp(`\\b${word}\\b`, 'g');
    count += (text.match(re) || []).length;
  }
  if (count < 3) return [];
  return [finding('intensifier-stack', file, 1, `${count} intensifier adverbs`, 'warning')];
}

function checkColonRunways(content, file) {
  return findPhraseMatches(content, file, COLON_RUNWAYS, 'colon-runway', 'warning');
}

function checkCrucialRole(content, file) {
  const text = stripMarkdown(content);
  const re = /\bplays?\s+(?:a\s+)?(?:crucial|critical|important|vital|pivotal)\s+role\s+in\b/gi;
  const findings = [];
  let m;
  while ((m = re.exec(text)) !== null) {
    findings.push(finding('crucial-role-formula', file, lineOf(content, m.index), m[0], 'blocker'));
  }
  return findings;
}

function checkWhetherYoure(content, file) {
  const text = stripMarkdown(content);
  const re = /\bwhether you(?:'re| are)\s+/gi;
  const findings = [];
  let m;
  while ((m = re.exec(text)) !== null) {
    findings.push(finding('whether-youre', file, lineOf(content, m.index), m[0].trim(), 'warning'));
  }
  return findings;
}

function checkInWorldOf(content, file) {
  return findPhraseMatches(content, file, ['in the world of'], 'in-world-of', 'warning');
}

function checkBoldFirstBullets(content, file) {
  const lines = content.split('\n');
  const bulletLines = lines.filter(l => /^\s*[-*+]\s+\*\*/.test(l));
  if (bulletLines.length < 4) return [];
  const ratio = bulletLines.length / Math.max(1, lines.filter(l => /^\s*[-*+]\s/.test(l)).length);
  if (ratio < 0.75) return [];
  return [finding('bold-first-bullets', file, lineOf(content, content.indexOf(bulletLines[0])), `${bulletLines.length} bold-first list items`, 'warning')];
}

function checkIsntItsPivot(content, file) {
  const text = stripMarkdown(content);
  const findings = [];
  const patterns = [
    /\bthe\s+\w+\s+part\s+isn'?t\b/gi,
    /\bisn'?t\s+[^.!?]{3,80}[.!?]\s+it'?s\s+/gi,
    /\bit'?s\s+not\s+[^.!?]{3,60}[.!?]\s+it'?s\s+/gi,
  ];
  for (const re of patterns) {
    let m;
    while ((m = re.exec(text)) !== null) {
      if (isDocBanLine(content.split('\n')[lineOf(content, m.index) - 1] || '')) continue;
      findings.push(finding('isnt-its-pivot', file, lineOf(content, m.index), m[0].trim().slice(0, 70), 'blocker'));
    }
  }
  return findings;
}

function checkKeptLostPair(content, file) {
  const text = stripMarkdown(content);
  const re = /\bkept\s+[^,.!?]{2,40},\s+lost\s+[^.!?]{2,40}/gi;
  const findings = [];
  let m;
  while ((m = re.exec(text)) !== null) {
    findings.push(finding('kept-lost-pair', file, lineOf(content, m.index), m[0].trim(), 'blocker'));
  }
  return findings;
}

function checkStaccatoSetup(content, file) {
  const text = stripMarkdown(content);
  const re = /\bno\s+\w+\s+\w+,?\s+just\s+/gi;
  const findings = [];
  let m;
  while ((m = re.exec(text)) !== null) {
    findings.push(finding('staccato-setup', file, lineOf(content, m.index), m[0].trim(), 'warning'));
  }
  return findings;
}

function checkFakeStatCitation(content, file) {
  const text = stripMarkdown(content);
  const findings = [];
  const orgRe = /\b(19|20)\d{2}\s+(Gallup|Stack Overflow|CNBC|Gartner|McKinsey|Deloitte|Harvard|Stanford|APA|WHO|OECD|Pew|BMC|MIT|Forbes|LinkedIn|KPMG|BCG|Nature)\b/gi;
  let m;
  while ((m = orgRe.exec(text)) !== null) {
    findings.push(finding('fake-stat-citation', file, lineOf(content, m.index), m[0].trim(), 'blocker'));
  }
  const lower = text.toLowerCase();
  for (const marker of FAKE_STAT_MARKERS) {
    const idx = lower.indexOf(marker);
    if (idx !== -1 && /\d+\s*%/.test(text.slice(idx, idx + 120))) {
      findings.push(finding('fake-stat-citation', file, lineOf(content, idx), text.slice(idx, idx + 60).trim(), 'blocker'));
      break;
    }
  }
  return findings;
}

function checkHashtagWall(content, file) {
  const lines = content.split('\n');
  const findings = [];
  for (let i = 0; i < lines.length; i++) {
    const tags = (lines[i].match(/#\w+/g) || []).length;
    if (tags >= 5) {
      findings.push(finding('hashtag-wall', file, i + 1, `${tags} hashtags on one line`, 'blocker'));
    }
  }
  return findings;
}

function checkArrowListTriplet(content, file) {
  const lines = content.split('\n');
  const arrowLines = lines.filter(l => /^\s*[→›▸-]\s+/.test(l) || /^\s*→/.test(l));
  if (arrowLines.length >= 3) {
    const idx = content.indexOf(arrowLines[0]);
    return [finding('arrow-list-triplet', file, lineOf(content, idx), `${arrowLines.length} parallel arrow/dash list items`, 'warning')];
  }
  return [];
}

function checkPunchPauseAndLinkedIn(content, file) {
  return [
    ...findPhraseMatches(content, file, PUNCH_PAUSE, 'punch-pause', 'blocker'),
    ...findPhraseMatches(content, file, LINKEDIN_ENGAGEMENT, 'linkedin-engagement', 'blocker'),
    ...findPhraseMatches(content, file, LINKTWErk_RESIDUE, 'linktwerk-residue', 'warning'),
  ];
}

function checkCzechSlop(content, file) {
  const findings = findPhraseMatches(content, file, CZECH_SLOP, 'czech-email-slop', 'warning');
  // Czech hedge stack: 2+ template phrases in same paragraph
  const paragraphs = content.split(/\n\s*\n/);
  for (const para of paragraphs) {
    const lower = para.toLowerCase();
    let hits = 0;
    for (const phrase of CZECH_SLOP) {
      if (lower.includes(phrase)) hits++;
    }
    if (hits >= 2) {
      findings.push(finding('czech-hedge-stack', file, lineOf(content, content.indexOf(para)), `${hits} Czech template phrases in one paragraph`, 'blocker'));
    }
  }
  return findings;
}

function checkSubtleFakeHuman(content, file) {
  return findPhraseMatches(content, file, SUBTLE_FAKE_HUMAN, 'subtle-fake-human', 'warning');
}

function checkInventedCompany(content, file) {
  const lower = content.toLowerCase();
  const findings = [];
  for (const suffix of FAKE_COMPANY_SUFFIXES) {
    const idx = lower.indexOf(suffix);
    if (idx !== -1) {
      findings.push(finding('invented-company', file, lineOf(content, idx), content.slice(Math.max(0, idx - 10), idx + suffix.length + 5).trim(), 'warning'));
    }
  }
  return findings;
}

function checkUiCopySlop(content, file) {
  if (!/\.(tsx|jsx|html|vue|svelte)$/i.test(file)) return [];
  const findings = [];
  const uiBuzz = ['streamline your', 'empower your', 'seamless', 'cutting-edge', 'game-changer', 'unlock your'];
  findings.push(...findPhraseMatches(content, file, uiBuzz, 'ui-copy-slop', 'warning'));
  const strings = content.match(/(?:placeholder|title|aria-label)=["']([^"']{8,})["']/gi) || [];
  for (const s of strings) {
    const val = s.replace(/^[^"']*["']|["']$/g, '');
    if (/learn more|get started|click here|discover how/i.test(val)) {
      findings.push(finding('ui-copy-slop', file, 1, val.slice(0, 50), 'warning'));
    }
  }
  return findings;
}

function checkStaccatoLines(content, file) {
  const lines = content.split('\n').map(l => l.trim()).filter(Boolean);
  let run = 0;
  let maxRun = 0;
  for (const line of lines) {
    const words = line.split(/\s+/).length;
    if (words <= 6 && !line.startsWith('#') && !line.startsWith('-')) {
      run++;
      maxRun = Math.max(maxRun, run);
    } else {
      run = 0;
    }
  }
  if (maxRun >= 4) {
    return [finding('staccato-cadence', file, 1, `${maxRun} consecutive ultra-short lines (LinkedIn poetry)`, 'warning')];
  }
  return [];
}

function checkLessonList(content, file) {
  const findings = [
    ...findPhraseMatches(content, file, LESSON_FRAMERS, 'lesson-framing', 'blocker'),
    ...findPhraseMatches(content, file, FAKE_CASUAL, 'fake-casual', 'warning'),
    ...findPhraseMatches(content, file, JOB_HUNT_SLOP, 'job-hunt-slop', 'warning'),
  ];
  const lines = content.split('\n');
  const numberedLessons = lines.filter(l => /^\s*\d+\.\s+/i.test(l) || /^\s*[-*+]\s+/i.test(l)).length;
  const hasLessonHeader = LESSON_FRAMERS.some(f => content.toLowerCase().includes(f));
  if (hasLessonHeader && numberedLessons >= 2) {
    findings.push(finding('lesson-list', file, lineOf(content, content.toLowerCase().indexOf('helped')), 'lesson header + 2+ list items', 'blocker'));
  }
  return findings;
}

function checkAphoristicCadence(content, file) {
  const text = stripMarkdown(content);
  const NOT_A_RE = /\bnot an? [a-z][^.!?]{1,40}[.!]\s+[a-z][^.!?]{1,60}[.!]/gi;
  const NOT_SEMI_RE = /\bit is not [^.!?]{1,40};\s*it is\b/gi;
  const SHORT_REBUTTAL_RE = /[.!?]\s+(No|Just)\s+(?!(?:motivational|em\b|filler\b|moreover\b|furthermore\b))[^.!?]{2,50}[.!]/g;
  let count = 0;
  let firstSample = '';
  let m;
  for (const re of [NOT_A_RE, NOT_SEMI_RE, SHORT_REBUTTAL_RE]) {
    re.lastIndex = 0;
    while ((m = re.exec(text)) !== null) {
      count++;
      if (!firstSample) firstSample = m[0].trim().slice(0, 80);
    }
  }
  if (count < 2) return [];
  return [finding('aphoristic-cadence', file, 1, `${count} aphoristic constructions: "${firstSample}"`, 'warning')];
}

function checkTheaterFraming(content, file) {
  const text = stripMarkdown(content);
  const findings = [];
  const theaterRe = /\b(\w+)\s+theater\b/gi;
  let m;
  while ((m = theaterRe.exec(text)) !== null) {
    if (isDocBanLine(content.split('\n')[lineOf(content, m.index) - 1] || '')) continue;
    findings.push(finding('theater-framing', file, lineOf(content, m.index), m[0], 'blocker'));
  }
  const notJustRe = /\bnot just [^.!?]{1,40},?\s+it'?s\b/gi;
  while ((m = notJustRe.exec(text)) !== null) {
    findings.push(finding('theater-framing', file, lineOf(content, m.index), m[0].trim(), 'warning'));
  }
  return findings;
}

function checkNumberedMarkers(content, file) {
  const text = stripMarkdown(content);
  const re = /\b(0[1-9]|1[0-2])\b/g;
  const seen = new Set();
  let m;
  while ((m = re.exec(text)) !== null) seen.add(m[1]);
  if (seen.size < 3) return [];
  const sorted = [...seen].sort();
  let sequential = 0;
  for (let i = 1; i < sorted.length; i++) {
    if (parseInt(sorted[i], 10) === parseInt(sorted[i - 1], 10) + 1) sequential++;
  }
  if (sequential < 2) return [];
  return [finding('numbered-section-markers', file, 1, `Sequence: ${sorted.slice(0, 6).join(', ')}`, 'warning')];
}

function isInsideParens(text, idx) {
  const before = text.slice(0, idx);
  return (before.match(/\(/g) || []).length > (before.match(/\)/g) || []).length;
}

function paragraphHedgeHits(paragraph) {
  const lower = paragraph.toLowerCase();
  let hits = 0;
  for (const phrase of HEDGE_PHRASES) {
    let from = 0;
    while (true) {
      const idx = lower.indexOf(phrase, from);
      if (idx === -1) break;
      const before = paragraph.slice(Math.max(0, idx - 6), idx);
      if (/\bno\s*$/i.test(before.trim())) { from = idx + phrase.length; continue; }
      if (isInsideQuotes(paragraph, idx) || isInsideParens(paragraph, idx)) {
        from = idx + phrase.length;
        continue;
      }
      hits++;
      from = idx + phrase.length;
    }
  }
  return hits;
}
function checkHedgeStack(content, file) {
  const paragraphs = content.split(/\n\s*\n/);
  const findings = [];
  for (let i = 0; i < paragraphs.length; i++) {
    const hits = paragraphHedgeHits(paragraphs[i]);
    if (hits >= 2) {
      const line = lineOf(content, content.indexOf(paragraphs[i]));
      findings.push(finding('hedge-stack', file, line, `${hits} hedge phrases in one paragraph`, 'warning'));
    }
  }
  return findings;
}

function checkSignposting(content, file) {
  const text = content.toLowerCase();
  const patterns = [
    /\bfirst[,.]\s/g, /\bsecond[,.]\s/g, /\bthird[,.]\s/g,
    /\bstep\s*1\b/g, /\bstep\s*2\b/g, /\bstep\s*3\b/g,
  ];
  let hits = 0;
  for (const re of patterns) {
    const matches = text.match(re);
    if (matches) hits += matches.length;
  }
  if (hits < 4) return [];
  return [finding('excessive-signposting', file, 1, `${hits} ordinal signposts in document`, 'warning')];
}

function checkMarkdownTells(content, file) {
  const findings = [];
  const emojiHeaderRe = /^#{1,6}\s+[\p{Emoji}\p{Emoji_Presentation}]/gmu;
  let m;
  while ((m = emojiHeaderRe.exec(content)) !== null) {
    findings.push(finding('markdown-tell', file, lineOf(content, m.index), 'emoji in section header', 'warning'));
  }
  const hrCount = (content.match(/^---\s*$/gm) || []).length;
  const headingCount = (content.match(/^#{1,3}\s+/gm) || []).length;
  if (headingCount >= 3 && hrCount >= headingCount - 1) {
    findings.push(finding('markdown-tell', file, 1, 'horizontal rule between every section', 'warning'));
  }
  return findings;
}

function checkMonotoneCadence(content, file) {
  const text = stripMarkdown(content);
  const sentences = text.split(/[.!?]+\s+/).filter(s => s.split(/\s+/).length >= 5);
  if (sentences.length < 8) return [];
  const lengths = sentences.map(s => s.split(/\s+/).length);
  const sorted = [...lengths].sort((a, b) => a - b);
  const median = sorted[Math.floor(sorted.length / 2)];
  const close = lengths.filter(l => Math.abs(l - median) <= 3).length;
  if (close / lengths.length > 0.75) {
    return [finding('monotone-cadence', file, 1, `sentence lengths cluster around ${median} words`, 'warning')];
  }
  return [];
}

function checkFauxFramework(content, file) {
  const re = /\b[A-Z](?:\.[A-Z]){2,}\b/g;
  const findings = [];
  let m;
  while ((m = re.exec(content)) !== null) {
    if (isInsideQuotes(content, m.index)) continue;
    findings.push(finding('faux-framework', file, lineOf(content, m.index), m[0], 'warning'));
  }
  return findings;
}

function checkCommentSlop(content, file) {
  if (!/\.(js|ts|jsx|tsx|mjs|cjs)$/i.test(file)) return [];
  const findings = [];
  const commentRe = /\/\/\s*(.+)|\/\*([\s\S]*?)\*\//g;
  let m;
  while ((m = commentRe.exec(content)) !== null) {
    const comment = (m[1] || m[2] || '').toLowerCase();
    for (const phrase of COMMENT_SLOP) {
      if (comment.includes(phrase)) {
        findings.push(finding('comment-slop', file, lineOf(content, m.index), comment.trim().slice(0, 60), 'warning'));
        break;
      }
    }
  }
  return findings;
}

function analyzeContent(content, file = '<stdin>') {
  const findings = [
    ...checkEmDashes(content, file),
    ...checkIsntItsPivot(content, file),
    ...checkKeptLostPair(content, file),
    ...checkStaccatoSetup(content, file),
    ...checkLessonList(content, file),
    ...checkPunchPauseAndLinkedIn(content, file),
    ...checkFakeStatCitation(content, file),
    ...checkHashtagWall(content, file),
    ...checkArrowListTriplet(content, file),
    ...checkCzechSlop(content, file),
    ...checkSubtleFakeHuman(content, file),
    ...checkInventedCompany(content, file),
    ...checkUiCopySlop(content, file),
    ...checkStaccatoLines(content, file),
    ...findPhraseMatches(content, file, OPENERS, 'opener', 'blocker'),
    ...findPhraseMatches(content, file, CLOSERS, 'closer', 'warning'),
    ...findPhraseMatches(content, file, BUZZWORDS, 'buzzword', 'blocker'),
    ...findPhraseMatches(content, file, ENGAGEMENT_BAIT, 'engagement-bait', 'blocker'),
    ...findPhraseMatches(content, file, META_AI, 'meta-ai-voice', 'blocker'),
    ...checkDelvishCluster(content, file),
    ...checkHedgingVerbs(content, file),
    ...checkIntensifiers(content, file),
    ...checkColonRunways(content, file),
    ...checkCrucialRole(content, file),
    ...checkWhetherYoure(content, file),
    ...checkInWorldOf(content, file),
    ...checkBoldFirstBullets(content, file),
    ...checkAphoristicCadence(content, file),
    ...checkTheaterFraming(content, file),
    ...checkNumberedMarkers(content, file),
    ...checkHedgeStack(content, file),
    ...checkSignposting(content, file),
    ...checkMarkdownTells(content, file),
    ...checkMonotoneCadence(content, file),
    ...checkFauxFramework(content, file),
    ...checkCommentSlop(content, file),
  ];

  return dedupeFindings(findings);
}

function dedupeFindings(findings) {
  const seen = new Set();
  return findings.filter(f => {
    const key = `${f.file}:${f.line}:${f.id}:${f.snippet}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function computeScore(findings) {
  const blockers = findings.filter(f => f.severity === 'blocker').length;
  const warnings = findings.filter(f => f.severity === 'warning').length;
  const total = blockers + warnings;

  const shapeBlockers = findings.filter(f =>
    ['fake-stat-citation', 'hashtag-wall', 'punch-pause', 'linkedin-engagement',
      'isnt-its-pivot', 'lesson-framing', 'lesson-list', 'kept-lost-pair',
      'linktwerk-residue'].includes(f.id)
  ).length;

  if (blockers >= 1 && findings.some(f => f.id === 'em-dash')) return Math.min(1, total >= 5 ? 0 : 1);
  if (shapeBlockers >= 2 || (shapeBlockers >= 1 && warnings >= 2)) return Math.min(1, 0);
  if (total >= 5 || blockers >= 3) return 0;
  if (total >= 3 || blockers >= 2) return 1;
  if (total >= 1) return 2;
  return 4;
}

function formatHuman(findings, score) {
  const lines = [`score: ${score}/4`, ''];
  if (findings.length === 0) {
    lines.push('(no findings)');
    return lines.join('\n');
  }
  for (const f of findings) {
    lines.push(`${f.file}:${f.line}  [${f.severity}] ${f.id}: ${JSON.stringify(f.snippet)}`);
  }
  return lines.join('\n');
}

function readStdin() {
  return new Promise((resolve, reject) => {
    const chunks = [];
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', c => chunks.push(c));
    process.stdin.on('end', () => resolve(chunks.join('')));
    process.stdin.on('error', reject);
  });
}

function expandArgs(args) {
  const files = [];
  for (const arg of args) {
    if (arg.includes('*')) {
      const dir = path.dirname(arg);
      const base = path.basename(arg).replace(/\*/g, '.*');
      const re = new RegExp(`^${base}$`);
      try {
        for (const name of fs.readdirSync(dir === '.' ? process.cwd() : dir)) {
          if (re.test(name)) files.push(path.join(dir === '.' ? '' : dir, name));
        }
      } catch {
        files.push(arg);
      }
    } else {
      files.push(arg);
    }
  }
  return files;
}

async function main() {
  const args = process.argv.slice(2);
  const json = args.includes('--json');
  const stdin = args.includes('--stdin');
  const strict = args.includes('--strict');
  const paths = expandArgs(args.filter(a => !a.startsWith('--')));

  const allFindings = [];

  if (stdin) {
    const content = await readStdin();
    allFindings.push(...analyzeContent(content, '<stdin>'));
  } else if (paths.length === 0) {
    process.stderr.write('Usage: scan.mjs [--json] [--stdin] [--strict] <file...>\n');
    process.exit(2);
  } else {
    for (const filePath of paths) {
      const resolved = path.resolve(filePath);
      if (!fs.existsSync(resolved)) {
        process.stderr.write(`Error: file not found: ${filePath}\n`);
        process.exit(2);
      }
      const ext = path.extname(resolved).toLowerCase();
      const commentExt = ['.js', '.ts', '.jsx', '.tsx', '.mjs', '.cjs'];
      if (!SUPPORTED_EXT.has(ext) && !commentExt.includes(ext)) {
        process.stderr.write(`Warning: unsupported extension ${ext} for ${filePath} (use impeccable for UI)\n`);
      }
      const content = fs.readFileSync(resolved, 'utf8');
      allFindings.push(...analyzeContent(content, filePath));
    }
  }

  const findings = dedupeFindings(allFindings);
  const score = computeScore(findings);

  if (json) {
    process.stdout.write(JSON.stringify({ score, findings }, null, 2) + '\n');
  } else {
    process.stdout.write(formatHuman(findings, score) + '\n');
  }

  if (strict && score < 3) process.exit(1);
}

export { analyzeContent, computeScore, dedupeFindings };

const isMain = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isMain) {
  main().catch(err => {
    process.stderr.write(`Error: ${err.message}\n`);
    process.exit(2);
  });
}
