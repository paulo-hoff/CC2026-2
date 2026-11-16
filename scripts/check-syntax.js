#!/usr/bin/env node
/**
 * check-syntax.js — verificação sintática de todos os arquivos .js e do JSON de dados.
 * Uso: npm run check:syntax
 * Usa `node --check` (nativo), que detecta erros como chaves/parênteses sem fechar.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { ROOT } from './lib/features.js';

const FOLDERS = ['js', 'scripts', 'tests'];

function listJs(dir, found = []) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) listJs(full, found);
    else if (entry.endsWith('.js')) found.push(full);
  }
  return found;
}

export function checkSyntax(root = ROOT) {
  const problems = [];
  const files = FOLDERS.flatMap((folder) => listJs(path.join(root, folder)));
  for (const file of files) {
    const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
    if (result.status !== 0) {
      const detail = (result.stderr || '').split('\n').filter(Boolean).slice(0, 4).join('\n    ');
      problems.push(`Erro de sintaxe em ${path.relative(root, file)}\n    ${detail}`);
    }
  }
  try {
    JSON.parse(readFileSync(path.join(root, 'data/mock.json'), 'utf8'));
  } catch (error) {
    problems.push(`data/mock.json inválido: ${error.message}`);
  }
  return { problems, count: files.length };
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  const { problems, count } = checkSyntax();
  if (problems.length) {
    console.error('✗ Erros de sintaxe encontrados:');
    problems.forEach((problem) => console.error(`  - ${problem}`));
    process.exit(1);
  }
  console.log(`✓ Sintaxe OK (${count} arquivos .js e data/mock.json).`);
}
