import { test } from 'node:test';
import assert from 'node:assert/strict';
import { evaluatePolicy } from '../scripts/check-pr.js';

const ok = (input) => evaluatePolicy({ changedFiles: ['js/components.js'], ...input });

test('PR de feature para main é reprovado', () => {
  const { violations } = ok({ base: 'main', head: 'feature/01-contador-usuarios', title: 'Release: x' });
  assert.match(violations.join(' '), /Somente a branch "develop"/);
});

test('PR de develop para main com título Release é aceito', () => {
  const { violations } = ok({ base: 'main', head: 'develop', title: 'Release: rodada 1' });
  assert.deepEqual(violations, []);
});

test('PR de develop para main sem título Release é reprovado', () => {
  const { violations } = ok({ base: 'main', head: 'develop', title: 'ajustes' });
  assert.equal(violations.length, 1);
});

test('PR para develop exige branch feature/NN-nome', () => {
  const { violations } = ok({ base: 'develop', head: 'minha-branch', title: '[F01] x', body: 'Closes #1' });
  assert.match(violations.join(' '), /padrão feature\/NN-nome/);
});

test('título fora do padrão e sem Issue são reprovados', () => {
  const { violations } = ok({ base: 'develop', head: 'feature/02-contador-publicacoes', title: 'ajustes', body: 'sem issue' });
  assert.ok(violations.some((text) => text.includes('[FNN]')));
  assert.ok(violations.some((text) => text.includes('Closes #')));
});

test('título com número diferente da branch é reprovado', () => {
  const { violations } = ok({ base: 'develop', head: 'feature/02-contador-publicacoes', title: '[F03] algo', body: 'Closes #3' });
  assert.ok(violations.some((text) => text.includes('F03')));
});

test('arquivos fora do escopo da funcionalidade são reprovados', () => {
  const { violations } = evaluatePolicy({
    base: 'develop',
    head: 'feature/04-busca-nome',
    title: '[F04] Pesquisa por nome',
    body: 'Closes #4',
    changedFiles: ['js/filters.js', '.github/workflows/ci.yml'],
  });
  assert.ok(violations.some((text) => text.includes('.github/workflows/ci.yml')));
});

test('base diferente de develop/main é reprovada', () => {
  const { violations } = ok({ base: 'qualquer', head: 'develop' });
  assert.equal(violations.length, 1);
});

test('sem contexto de PR não há o que verificar', () => {
  const { violations } = evaluatePolicy({});
  assert.deepEqual(violations, []);
});
