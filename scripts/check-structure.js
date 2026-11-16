#!/usr/bin/env node
/**
 * check-structure.js — confere se a estrutura do repositório está íntegra.
 * Uso: npm run check:structure
 * Falha (exit 1) se faltar arquivo obrigatório, se houver dependências externas
 * ou se algum material reservado ao professor tiver sido incluído no repositório.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { ROOT, FEATURES } from './lib/features.js';

export const REQUIRED_FILES = [
  'index.html',
  'css/base.css',
  'css/components.css',
  'css/dashboard.css',
  'js/app.js',
  'js/api.js',
  'js/data.js',
  'js/filters.js',
  'js/formatters.js',
  'js/validators.js',
  'js/components.js',
  'js/events.js',
  'data/mock.json',
  'package.json',
  'README.md',
  '.github/workflows/ci.yml',
  '.github/workflows/deploy.yml',
  '.github/PULL_REQUEST_TEMPLATE.md',
  'docs/GUIA_ALUNOS.md',
  'docs/RELATORIO_FINAL.md',
];

const FORBIDDEN_NAMES = [/gabarito/i, /solucao/i, /solution/i, /professor-private/i];
const FORBIDDEN_FRAMEWORKS = ['react', 'vue', 'angular', 'typescript', 'jquery', 'svelte'];

function walk(dir, found = [], base = dir) {
  for (const entry of readdirSync(dir)) {
    if (['.git', 'node_modules', 'dist'].includes(entry)) continue;
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, found, base);
    else found.push(path.relative(base, full).split(path.sep).join('/'));
  }
  return found;
}

export function checkStructure(root = ROOT) {
  const problems = [];

  for (const file of REQUIRED_FILES) {
    if (!existsSync(path.join(root, file))) problems.push(`Arquivo obrigatório ausente: ${file}`);
  }

  for (const file of walk(root)) {
    if (FORBIDDEN_NAMES.some((pattern) => pattern.test(file))) {
      problems.push(`Arquivo reservado ao professor não pode estar no repositório: ${file}`);
    }
  }

  const pkgPath = path.join(root, 'package.json');
  if (existsSync(pkgPath)) {
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
    const deps = Object.keys({ ...pkg.dependencies, ...pkg.devDependencies });
    for (const dep of deps) {
      problems.push(`Dependência externa não permitida neste laboratório: ${dep}`);
    }
    for (const name of FORBIDDEN_FRAMEWORKS) {
      if (deps.includes(name)) problems.push(`Framework não permitido: ${name}`);
    }
  }

  // Marcas de conflito de merge esquecidas no código (<<<<<<< ou >>>>>>>)
  for (const file of walk(root)) {
    if (!/^(js|css|data)\/|^index\.html$/.test(file)) continue;
    const text = readFileSync(path.join(root, file), 'utf8');
    if (/^(<{7}|>{7})( |$)/m.test(text)) {
      problems.push(`Marca de conflito de merge (<<<<<<< ou >>>>>>>) esquecida em ${file}. Resolva o conflito e remova as marcações.`);
    }
  }

  // Cada funcionalidade precisa ter seu marcador de região no arquivo correspondente
  for (const feature of FEATURES) {
    const file = path.join(root, feature.file);
    if (!existsSync(file)) continue;
    const text = readFileSync(file, 'utf8');
    if (!text.includes(`[${feature.id}]`) || !text.includes(`[/${feature.id}]`)) {
      problems.push(`Região ${feature.id} (marcadores [${feature.id}] e [/${feature.id}]) não encontrada em ${feature.file}`);
    }
  }

  return problems;
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  const problems = checkStructure();
  if (problems.length) {
    console.error('✗ Estrutura inválida:');
    problems.forEach((problem) => console.error(`  - ${problem}`));
    process.exit(1);
  }
  console.log(`✓ Estrutura OK (${REQUIRED_FILES.length} arquivos obrigatórios e ${FEATURES.length} regiões de funcionalidade).`);
}
