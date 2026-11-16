import { test } from 'node:test';
import assert from 'node:assert/strict';
import { escapeHtml, pluralize } from '../js/formatters.js';
import { isNonEmptyString, isValidEmail } from '../js/validators.js';

test('escapeHtml neutraliza tags e aspas', () => {
  assert.equal(escapeHtml('<script>alert("x")</script>'), '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;');
  assert.equal(escapeHtml("O'Neil & Co"), 'O&#39;Neil &amp; Co');
});

test('escapeHtml aceita null e undefined', () => {
  assert.equal(escapeHtml(null), '');
  assert.equal(escapeHtml(undefined), '');
});

test('pluralize escolhe singular ou plural', () => {
  assert.equal(pluralize(1, 'usuário', 'usuários'), 'usuário');
  assert.equal(pluralize(0, 'usuário', 'usuários'), 'usuários');
  assert.equal(pluralize(7, 'usuário', 'usuários'), 'usuários');
});

test('validadores básicos', () => {
  assert.equal(isNonEmptyString('  a '), true);
  assert.equal(isNonEmptyString('   '), false);
  assert.equal(isValidEmail('ana@exemplo.com'), true);
  assert.equal(isValidEmail('ana@exemplo'), false);
});
