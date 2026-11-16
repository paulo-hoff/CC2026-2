#!/usr/bin/env node
/**
 * check-pr.js — política de branches e de Pull Requests do laboratório.
 *
 * Regras:
 *   - PR para `main`    → somente a partir de `develop` e com título "Release: ...".
 *   - PR para `develop` → somente a partir de `feature/NN-nome` (NN de 01 a 30), com
 *       · título "[FNN] descrição" (mesmo NN da branch);
 *       · corpo com "Closes #número" (ou Fixes/Resolves);
 *       · marcador NOT_IMPLEMENTED:FNN removido (funcionalidade entregue);
 *       · alteração somente dos arquivos previstos para a funcionalidade.
 *
 * Uso local:  npm run check:pr                       (usa a branch atual; compara com develop)
 *             node scripts/check-pr.js --base main --head feature/01-contador-usuarios
 * Na CI:      lê GITHUB_BASE_REF, GITHUB_HEAD_REF e o evento do Pull Request automaticamente.
 *
 * Observação: o GitHub não tem como impedir a *criação* de um PR de feature/* para main.
 * Esta verificação, marcada como obrigatória na `main`, impede o *merge* dele.
 */
import { readFileSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { ROOT, featureFromBranch, isImplemented } from './lib/features.js';

const CLOSING = /\b(close[sd]?|fix(e[sd])?|resolve[sd]?)\s+#\d+/i;

/**
 * @param {{base:string, head:string, title?:string, body?:string, changedFiles?:string[]|null, root?:string}} input
 * @returns {{violations: string[], notes: string[]}}
 */
export function evaluatePolicy({ base, head, title, body, changedFiles = null, root = ROOT }) {
  const violations = [];
  const notes = [];

  if (!base || !head) {
    notes.push('Sem contexto de Pull Request (base/head ausentes): nada a verificar.');
    return { violations, notes };
  }

  if (base === 'main') {
    if (head !== 'develop') {
      violations.push(`Somente a branch "develop" pode ser integrada à "main" (origem informada: "${head}").`);
    }
    if (title !== undefined && !/^Release: .+/.test(title)) {
      violations.push('O título do PR para "main" deve começar com "Release: ".');
    }
    return { violations, notes };
  }

  if (base !== 'develop') {
    violations.push(`Base não permitida: "${base}". Use "develop" (funcionalidades) ou "main" (release a partir de develop).`);
    return { violations, notes };
  }

  const feature = featureFromBranch(head);
  if (!feature) {
    violations.push(`A branch "${head}" não segue o padrão feature/NN-nome (NN de 01 a 30).`);
    return { violations, notes };
  }

  if (title === undefined) notes.push('Título do PR não informado: verificação de título ignorada.');
  else {
    const match = /^\[F(\d{2})\] .{3,}/.exec(title);
    if (!match) violations.push('O título do PR deve seguir o padrão "[FNN] descrição" (ex.: "[F01] Exibe contador de usuários").');
    else if (match[1] !== feature.number) {
      violations.push(`O título cita F${match[1]}, mas a branch pertence à funcionalidade ${feature.id}.`);
    }
  }

  if (body === undefined) notes.push('Corpo do PR não informado: verificação da Issue ignorada.');
  else if (!CLOSING.test(body)) violations.push('O PR deve referenciar a Issue com "Closes #número" no corpo.');

  if (!isImplemented(feature, root)) {
    violations.push(`${feature.id} ainda contém o marcador NOT_IMPLEMENTED:${feature.id} em ${feature.file}. Remova-o ao concluir a tarefa.`);
  }

  if (changedFiles === null) notes.push('Não foi possível listar os arquivos alterados: verificação de escopo ignorada.');
  else if (changedFiles.length === 0) violations.push('O PR não altera nenhum arquivo.');
  else {
    const unexpected = changedFiles.filter((file) => !feature.allowed.includes(file));
    if (unexpected.length) {
      violations.push(
        `Arquivos fora do escopo de ${feature.id}: ${unexpected.join(', ')}. Permitidos: ${feature.allowed.join(', ')}.`,
      );
    }
  }

  return { violations, notes };
}

function git(args) {
  const result = spawnSync('git', args, { cwd: ROOT, encoding: 'utf8' });
  return result.status === 0 ? result.stdout.trim() : null;
}

/**
 * Arquivos alterados em relação ao ponto em que a branch saiu de develop/main.
 * Inclui o que já foi commitado, o que está só no disco (ainda sem commit) e arquivos novos,
 * para que `npm run validate` funcione antes do commit e a CI (checkout limpo) dê o mesmo resultado.
 */
function listChangedFiles(base) {
  for (const ref of [`origin/${base}`, base]) {
    const mergeBase = git(['merge-base', ref, 'HEAD']);
    if (mergeBase === null) continue;
    const tracked = git(['diff', '--name-only', mergeBase]) ?? '';
    const untracked = git(['ls-files', '--others', '--exclude-standard']) ?? '';
    return [...new Set(`${tracked}\n${untracked}`.split('\n').filter(Boolean))].sort();
  }
  return null;
}

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i].startsWith('--')) args[argv[i].slice(2)] = argv[i + 1]?.startsWith('--') ? true : argv[++i];
  }
  return args;
}

function readEventPayload() {
  const file = process.env.GITHUB_EVENT_PATH;
  if (!file || !existsSync(file)) return {};
  try {
    return JSON.parse(readFileSync(file, 'utf8')).pull_request ?? {};
  } catch {
    return {};
  }
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  const args = parseArgs(process.argv.slice(2));
  const inCI = process.env.GITHUB_ACTIONS === 'true';
  const pr = inCI ? readEventPayload() : {};

  const head = args.head ?? process.env.GITHUB_HEAD_REF ?? git(['branch', '--show-current']);
  const base = args.base ?? process.env.GITHUB_BASE_REF ?? 'develop';

  if (!args.head && !inCI && ['main', 'develop', '', null].includes(head)) {
    console.log(`✓ Política de PR: branch "${head ?? '?'}" não é uma feature — nada a verificar localmente.`);
    process.exit(0);
  }
  if (inCI && !process.env.GITHUB_BASE_REF) {
    console.log('✓ Política de PR: execução fora de um Pull Request — nada a verificar.');
    process.exit(0);
  }

  const { violations, notes } = evaluatePolicy({
    base,
    head,
    title: args.title ?? pr.title,
    body: args.body ?? pr.body ?? undefined,
    changedFiles: listChangedFiles(base),
  });

  notes.forEach((note) => console.log(`• ${note}`));
  if (violations.length) {
    console.error('✗ Política de PR violada:');
    violations.forEach((violation) => console.error(`  - ${violation}`));
    process.exit(1);
  }
  console.log(`✓ Política de PR OK (${head} → ${base}).`);
}
