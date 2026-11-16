import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalizeText, applyTodoFilter, applyFilters } from '../js/filters.js';
import { DEFAULT_CRITERIA } from '../js/data.js';
import { mock } from './helpers/fakes.js';

test('normalizeText remove acentos, espaços das pontas e diferença de caixa', () => {
  assert.equal(normalizeText('  Álvaro '), 'alvaro');
  assert.equal(normalizeText('JOSÉ'), 'jose');
});

test('normalizeText tolera valores vazios', () => {
  assert.equal(normalizeText(null), '');
  assert.equal(normalizeText(undefined), '');
});

test('applyTodoFilter com "all" devolve a lista original', () => {
  const todos = [{ completed: true }, { completed: false }];
  assert.deepEqual(applyTodoFilter(todos, 'all'), todos);
});

test('applyFilters com critérios padrão não perde registros', () => {
  const result = applyFilters(mock.users, { ...DEFAULT_CRITERIA });
  assert.equal(result.length, mock.users.length);
});

test('applyFilters não altera a lista recebida', () => {
  const users = Object.freeze([...mock.users]);
  assert.doesNotThrow(() => applyFilters(users, { ...DEFAULT_CRITERIA, sort: 'asc', limit: 3 }));
});
