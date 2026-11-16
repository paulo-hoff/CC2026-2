#!/usr/bin/env node
/**
 * validate.js — roda localmente as mesmas verificações da CI, na mesma ordem.
 * Uso: npm run validate        (rode antes de abrir o Pull Request)
 *      npm run validate -- --verbose   (mostra a saída completa de cada etapa)
 */
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { ROOT } from './lib/features.js';

const verbose = process.argv.includes('--verbose');
const skipPr = process.argv.includes('--no-pr');

const steps = [
  ['Estrutura de arquivos', 'check-structure.js'],
  ['Sintaxe JavaScript', 'check-syntax.js'],
  ['Testes automatizados', 'run-tests.js'],
  ['Smoke test (funcionalidades essenciais)', 'smoke-test.js'],
];
if (!skipPr) steps.push(['Política de branches / PR', 'check-pr.js']);

const results = [];
for (const [name, script] of steps) {
  const started = Date.now();
  const run = spawnSync(process.execPath, [path.join(ROOT, 'scripts', script)], { cwd: ROOT, encoding: 'utf8' });
  const ok = run.status === 0;
  results.push({ name, ok, seconds: ((Date.now() - started) / 1000).toFixed(1) });
  if (!ok || verbose) {
    process.stdout.write(`\n--- ${name} ---\n${run.stdout}${run.stderr}`);
  }
  if (!ok) break; // falha rápida, como na CI
}

console.log('\nResumo da validação local');
console.log('-------------------------');
for (const result of results) console.log(`${result.ok ? '✓' : '✗'} ${result.name} (${result.seconds}s)`);
const failed = results.find((result) => !result.ok);
if (failed) {
  console.error(`\nREPROVADO na etapa: ${failed.name}. Corrija e rode novamente.`);
  process.exit(1);
}
console.log('\nAPROVADO: pode abrir o Pull Request.');
