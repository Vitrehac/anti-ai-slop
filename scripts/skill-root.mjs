#!/usr/bin/env node
/** Print absolute path to skill root (directory containing SKILL.md). */
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
process.stdout.write(root + '\n');
