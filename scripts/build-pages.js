#!/usr/bin/env node
/**
 * build-pages.js — monta a pasta dist/ com SOMENTE o que vai para o GitHub Pages
 * (index.html, css, js e data). Testes, scripts e documentação não são publicados.
 * Uso: npm run build
 */
import { cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { ROOT } from './lib/features.js';

const dist = path.join(ROOT, 'dist');
rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

for (const item of ['index.html', 'css', 'js', 'data']) {
  cpSync(path.join(ROOT, item), path.join(dist, item), { recursive: true });
}
writeFileSync(path.join(dist, '.nojekyll'), '');
console.log('✓ dist/ gerado: index.html, css/, js/, data/');
