#!/usr/bin/env node
/**
 * inject-failure.js — provoca falhas CONTROLADAS na CI, para o exercício de recuperação.
 * Use sempre em uma branch de treino (ex.: feature/NN-... do seu PR), nunca em develop/main.
 *
 *   npm run falha -- syntax   cria js/falha-controlada.js com erro de sintaxe  → reprova ci-qualidade (sintaxe)
 *   npm run falha -- logic    altera normalizeText() em js/filters.js           → reprova ci-qualidade (testes)
 *   npm run falha -- undo     desfaz as duas alterações
 *
 * Terceira falha (regra de integração): abra um PR com título fora do padrão (ex.: "ajustes")
 * ou com a base errada. Veja docs/GUIA_ALUNOS.md.
 */
import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { ROOT } from './lib/features.js';

const mode = process.argv[2];
const broken = path.join(ROOT, 'js/falha-controlada.js');
const filters = path.join(ROOT, 'js/filters.js');
const GOOD = '.toLowerCase()\n    .trim();';
const BAD = '.toUpperCase()\n    .trim();';

if (mode === 'syntax') {
  writeFileSync(broken, '// Arquivo criado por inject-failure.js — contém erro de sintaxe de propósito.\nexport const quebrado = ;\n');
  console.log('Falha de sintaxe criada em js/falha-controlada.js. Rode: npm run check:syntax');
} else if (mode === 'logic') {
  const text = readFileSync(filters, 'utf8');
  if (!text.includes(GOOD)) {
    console.error('normalizeText() não está no formato esperado (já alterada?).');
    process.exit(1);
  }
  writeFileSync(filters, text.replace(GOOD, BAD));
  console.log('normalizeText() agora usa toUpperCase(). Rode: npm test');
} else if (mode === 'undo') {
  if (existsSync(broken)) rmSync(broken);
  const text = readFileSync(filters, 'utf8');
  if (text.includes(BAD)) writeFileSync(filters, text.replace(BAD, GOOD));
  console.log('Falhas controladas removidas. Rode: npm run validate');
} else {
  console.error('Uso: npm run falha -- <syntax|logic|undo>');
  process.exit(1);
}
