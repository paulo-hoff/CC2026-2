#!/usr/bin/env node
/**
 * run-tests.js — executa os testes automatizados com o executor nativo do Node (node:test).
 * Uso: npm test
 * Procura tests/**\/*.test.js e funciona do Node 20 em diante (sem depender de glob).
 */
import { readdirSync, statSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { ROOT } from './lib/features.js';

function listTests(dir, found = []) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) listTests(full, found);
    else if (entry.endsWith('.test.js')) found.push(full);
  }
  return found;
}

const files = listTests(path.join(ROOT, 'tests')).sort();
const result = spawnSync(process.execPath, ['--test', '--test-reporter=spec', ...files], { stdio: 'inherit', cwd: ROOT });
process.exit(result.status ?? 1);
