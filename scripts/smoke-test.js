#!/usr/bin/env node
/**
 * smoke-test.js — validação das funcionalidades essenciais do projeto (a "fumaça").
 * Uso: npm run smoke
 * Verifica: elementos obrigatórios do HTML, imports entre módulos, dados locais, módulos
 * carregáveis e entrega real dos arquivos por um servidor HTTP local.
 */
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { ROOT } from './lib/features.js';
import { createStaticServer } from './serve.js';

export const REQUIRED_IDS = [
  'messages', 'loading', 'indicators', 'count-users', 'count-posts', 'count-todos',
  'percent-completed', 'last-update', 'toolbar', 'search-input', 'search-error',
  'filter-city', 'sort-order', 'limit-select', 'todo-status', 'user-list', 'todo-list',
  'pagination', 'btn-prev', 'btn-next', 'page-info', 'user-details', 'data-source', 'header-actions',
];

export async function runSmoke(root = ROOT) {
  const checks = [];
  const check = (name, ok, detail = '') => checks.push({ name, ok: Boolean(ok), detail });

  // 1. HTML
  const html = readFileSync(path.join(root, 'index.html'), 'utf8');
  for (const id of REQUIRED_IDS) check(`HTML contém #${id}`, html.includes(`id="${id}"`));
  check('HTML carrega js/app.js como módulo', /<script type="module" src="js\/app\.js">/.test(html));
  check('HTML contém cabeçalho, rodapé e <main>', /<header/.test(html) && /<footer/.test(html) && /<main/.test(html));

  // 2. Imports relativos resolvem para arquivos existentes
  for (const file of ['app', 'api', 'data', 'filters', 'formatters', 'validators', 'components', 'events']) {
    const source = readFileSync(path.join(root, `js/${file}.js`), 'utf8');
    for (const match of source.matchAll(/from\s+'(\.[^']+)'/g)) {
      check(`js/${file}.js importa ${match[1]}`, existsSync(path.join(root, 'js', match[1])));
    }
  }

  // 3. Dados locais
  const mock = JSON.parse(readFileSync(path.join(root, 'data/mock.json'), 'utf8'));
  check('mock.json tem 10 usuários', Array.isArray(mock.users) && mock.users.length === 10);
  check('mock.json tem publicações e tarefas', mock.posts?.length > 0 && mock.todos?.length > 0);
  check('usuários têm id, name, email e address.city', mock.users.every((u) => u.id && u.name && u.email && u.address?.city));
  check('tarefas têm completed booleano', mock.todos.every((t) => typeof t.completed === 'boolean'));

  // 4. Módulos sem DOM carregam e exportam o contrato mínimo
  const base = pathToFileURL(root + path.sep).href;
  const expectations = {
    'js/data.js': ['state', 'DEFAULT_CRITERIA', 'completedPercentage', 'loadTheme', 'saveTheme', 'getUserDetails'],
    'js/filters.js': ['applyFilters', 'applyTodoFilter', 'filterByName', 'filterByCity', 'sortUsers', 'limitRecords', 'paginate'],
    'js/formatters.js': ['escapeHtml', 'formatDateTime', 'formatUserName'],
    'js/validators.js': ['validateSearch'],
    'js/api.js': ['loadData', 'fetchJSON', 'loadWithFallback', 'describeError'],
    'js/components.js': ['renderUserList', 'renderUserCount', 'setLoading', 'showError', 'showSuccess'],
  };
  for (const [file, names] of Object.entries(expectations)) {
    try {
      const mod = await import(new URL(file, base).href);
      for (const name of names) check(`${file} exporta ${name}`, name in mod);
    } catch (error) {
      check(`${file} carrega sem erro`, false, error.message);
    }
  }

  // 5. Servidor HTTP local entrega a aplicação
  const server = createStaticServer(root);
  await new Promise((resolve) => server.listen(0, resolve));
  const { port } = server.address();
  try {
    for (const url of ['/', '/js/app.js', '/css/base.css', '/data/mock.json']) {
      const response = await fetch(`http://localhost:${port}${url}`);
      check(`HTTP 200 em ${url}`, response.status === 200, `status ${response.status}`);
    }
  } finally {
    server.close();
  }

  return checks;
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  const checks = await runSmoke();
  const failed = checks.filter((item) => !item.ok);
  if (process.argv.includes('--verbose')) checks.forEach((item) => console.log(`${item.ok ? '✓' : '✗'} ${item.name}`));
  if (failed.length) {
    console.error(`✗ Smoke test: ${failed.length} falha(s) em ${checks.length} verificações`);
    failed.forEach((item) => console.error(`  - ${item.name} ${item.detail}`));
    process.exit(1);
  }
  console.log(`✓ Smoke test OK (${checks.length} verificações).`);
}
