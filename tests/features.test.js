/**
 * Testes de contrato das 30 funcionalidades.
 *
 * Como funciona: enquanto o marcador NOT_IMPLEMENTED:Fxx existir no código, o teste da
 * funcionalidade aparece como "skipped" (pendente) e a CI continua verde. Quando o aluno
 * remove o marcador, o teste passa a valer e precisa passar. Os alunos NÃO editam este arquivo.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { FEATURES, ROOT, isImplemented, readProjectFile } from '../scripts/lib/features.js';
import { DEFAULT_CRITERIA, THEME_KEY, completedPercentage, getUserDetails, loadTheme, saveTheme } from '../js/data.js';
import * as filters from '../js/filters.js';
import { formatDateTime, formatUserName } from '../js/formatters.js';
import { validateSearch } from '../js/validators.js';
import * as api from '../js/api.js';
import * as ui from '../js/components.js';
import { brokenStorage, fakeEl, fakeStorage, hasClass, mock, okFetch } from './helpers/fakes.js';

const people = [
  { id: 1, name: 'Ana Silva', address: { city: 'Rio de Janeiro' } },
  { id: 2, name: 'Mariana Costa', address: { city: 'São Paulo' } },
  { id: 3, name: 'Bruno Lima', address: { city: 'Rio de Janeiro' } },
  { id: 4, name: 'José Álvares', address: { city: 'Curitiba' } },
];
const names = (list) => list.map((user) => user.name);

const checks = {
  F01() {
    const el = fakeEl();
    ui.renderUserCount(mock.users, el);
    assert.equal(el.textContent, '10');
    ui.renderUserCount([], el);
    assert.equal(el.textContent, '0');
  },
  F02() {
    const el = fakeEl();
    ui.renderPostCount(mock.posts, el);
    assert.equal(el.textContent, '30');
  },
  F03() {
    const el = fakeEl();
    ui.renderTodoCount(mock.todos, el);
    assert.equal(el.textContent, '40');
  },
  F04() {
    assert.deepEqual(names(filters.filterByName(people, 'ana')), ['Ana Silva', 'Mariana Costa']);
    assert.deepEqual(names(filters.filterByName(people, 'JOSE')), ['José Álvares']);
    assert.equal(filters.filterByName(people, '   ').length, 4);
    assert.deepEqual(filters.filterByName(people, 'zzz'), []);
  },
  F05() {
    assert.deepEqual(names(filters.filterByCity(people, 'RIO DE JANEIRO')), ['Ana Silva', 'Bruno Lima']);
    assert.equal(filters.filterByCity(people, '').length, 4);
    assert.deepEqual(filters.getUniqueCities(people), ['Curitiba', 'Rio de Janeiro', 'São Paulo']);
  },
  F06() {
    const original = Object.freeze([
      { name: 'Bruno' },
      { name: 'ana' },
      { name: 'Álvaro' },
    ]);
    assert.deepEqual(filters.sortUsers(original, 'asc').map((u) => u.name), ['Álvaro', 'ana', 'Bruno']);
    assert.deepEqual(filters.sortUsers(original, 'desc').map((u) => u.name), ['Bruno', 'ana', 'Álvaro']);
    assert.deepEqual(filters.sortUsers(original, 'none').map((u) => u.name), ['Bruno', 'ana', 'Álvaro']);
  },
  F07() {
    const dirty = { query: 'x', city: 'y', sort: 'asc', limit: 5, todoStatus: 'pending' };
    const cleaned = filters.clearFilters(dirty);
    assert.deepEqual(cleaned, { ...DEFAULT_CRITERIA });
    assert.notEqual(cleaned, dirty);
    assert.equal(dirty.query, 'x', 'o objeto original não pode ser alterado');
  },
  F08() {
    const el = fakeEl();
    ui.renderEmptyState(el, {});
    assert.ok(el.innerHTML.includes('empty-state'));
    assert.ok(el.innerHTML.includes('Nenhum usuário encontrado'));
    ui.renderEmptyState(el, { query: '<b>zz</b>' });
    assert.ok(el.innerHTML.includes('&lt;b&gt;zz&lt;/b&gt;'), 'o termo deve ser escapado');
  },
  F09() {
    const el = fakeEl();
    el.hidden = true;
    ui.setLoading(true, el);
    assert.equal(el.hidden, false);
    ui.setLoading(false, el);
    assert.equal(el.hidden, true);
  },
  F10() {
    assert.equal(formatDateTime(new Date(2025, 0, 5, 9, 7)), '05/01/2025 09:07');
    assert.equal(formatDateTime(new Date(2025, 11, 31, 23, 59)), '31/12/2025 23:59');
    assert.equal(formatDateTime(null), '--');
    const el = fakeEl();
    ui.renderLastUpdate(new Date(2025, 0, 5, 9, 7), el);
    assert.equal(el.textContent, '05/01/2025 09:07');
    ui.renderLastUpdate(null, el);
    assert.equal(el.textContent, '--');
  },
  async F11() {
    const fetchFn = okFetch([{ id: 1 }]);
    assert.deepEqual(await api.fetchUsers(fetchFn), [{ id: 1 }]);
    assert.deepEqual(fetchFn.calls, [`${api.API_BASE}/users`]);
  },
  async F12() {
    const fetchFn = okFetch([{ id: 7 }]);
    assert.deepEqual(await api.fetchPosts(fetchFn), [{ id: 7 }]);
    assert.deepEqual(fetchFn.calls, [`${api.API_BASE}/posts`]);
  },
  async F13() {
    const fetchFn = okFetch([{ id: 9 }]);
    assert.deepEqual(await api.fetchTodos(fetchFn), [{ id: 9 }]);
    assert.deepEqual(fetchFn.calls, [`${api.API_BASE}/todos`]);
  },
  F14() {
    assert.equal(completedPercentage([]), 0);
    assert.equal(completedPercentage([{ completed: true }, { completed: false }, { completed: false }]), 33);
    assert.equal(completedPercentage([{ completed: true }, { completed: true }, { completed: true }, { completed: false }]), 75);
    assert.equal(completedPercentage(mock.todos), 43);
    const el = fakeEl();
    ui.renderCompletedPercent([{ completed: true }, { completed: false }], el);
    assert.equal(el.textContent, '50%');
  },
  F15() {
    const todos = [{ id: 1, completed: true }, { id: 2, completed: false }, { id: 3, completed: true }];
    assert.deepEqual(filters.filterCompletedTodos(todos).map((t) => t.id), [1, 3]);
    assert.deepEqual(filters.applyTodoFilter(todos, 'completed').map((t) => t.id), [1, 3]);
  },
  F16() {
    const todos = [{ id: 1, completed: true }, { id: 2, completed: false }, { id: 3, completed: false }];
    assert.deepEqual(filters.filterPendingTodos(todos).map((t) => t.id), [2, 3]);
    assert.deepEqual(filters.applyTodoFilter(todos, 'pending').map((t) => t.id), [2, 3]);
  },
  F17() {
    const list = Object.freeze([1, 2, 3, 4, 5]);
    assert.deepEqual(filters.limitRecords(list, 2), [1, 2]);
    assert.deepEqual(filters.limitRecords(list, 0), [1, 2, 3, 4, 5]);
    assert.deepEqual(filters.limitRecords(list, 99), [1, 2, 3, 4, 5]);
    assert.deepEqual(filters.limitRecords(list, -3), [1, 2, 3, 4, 5]);
    assert.deepEqual(filters.limitRecords(list, 'abc'), [1, 2, 3, 4, 5]);
  },
  F18() {
    assert.equal(formatUserName('Mrs. Dennis Schulist'), 'Dennis Schulist');
    assert.equal(formatUserName('  dr.   ana   MARIA  silva '), 'Ana Maria Silva');
    assert.equal(formatUserName('LEANNE graham'), 'Leanne Graham');
    assert.equal(formatUserName('Nicholas Runolfsdottir V'), 'Nicholas Runolfsdottir V');
    assert.equal(formatUserName(''), '');
  },
  async F19() {
    const notFound = async () => ({ ok: false, status: 404, json: async () => ({}) });
    await assert.rejects(() => api.fetchJSON('x', notFound), (error) => error instanceof api.HttpError && error.status === 404);
    assert.deepEqual(await api.fetchJSON('x', okFetch({ a: 1 })), { a: 1 });
    assert.equal(api.describeError(new api.HttpError(404)), 'Recurso não encontrado (404).');
    assert.ok(api.describeError(new api.HttpError(500)).includes('500'));
    assert.ok(api.describeError(new api.HttpError(418)).includes('418'));
    assert.ok(api.describeError(new TypeError('Failed to fetch')).includes('conexão'));
    assert.equal(api.describeError(new Error('?')), 'Erro inesperado ao carregar os dados.');
  },
  async F20() {
    const localOnly = async (url) => {
      if (url.includes('jsonplaceholder')) throw new TypeError('Failed to fetch');
      return { ok: true, status: 200, json: async () => mock };
    };
    const offline = await api.loadWithFallback(localOnly);
    assert.equal(offline.source, 'local');
    assert.equal(offline.users.length, 10);
    // Com a API disponível (depende de F11–F13 já integradas)
    if (['F11', 'F12', 'F13'].every((id) => isImplemented(FEATURES.find((f) => f.id === id)))) {
      const remote = async (url) => ({
        ok: true,
        status: 200,
        json: async () => (url.endsWith('/users') ? [{ id: 1 }] : url.endsWith('/posts') ? [{ id: 2 }] : url.endsWith('/todos') ? [{ id: 3 }] : mock),
      });
      const online = await api.loadWithFallback(remote);
      assert.equal(online.source, 'remote');
      assert.deepEqual(online.users, [{ id: 1 }]);
    }
  },
  F21() {
    const button = fakeEl();
    ui.setButtonBusy(button, true);
    assert.equal(button.disabled, true);
    assert.equal(button.textContent, 'Atualizando…');
    ui.setButtonBusy(button, false);
    assert.equal(button.disabled, false);
    assert.equal(button.textContent, 'Atualizar dados');
  },
  F22() {
    assert.equal(ui.toggleTheme('light'), 'dark');
    assert.equal(ui.toggleTheme('dark'), 'light');
    assert.equal(ui.toggleTheme('qualquer'), 'dark');
    const root = fakeEl();
    assert.equal(ui.applyTheme('dark', root), 'dark');
    assert.equal(root.dataset.theme, 'dark');
    assert.equal(ui.applyTheme('invalido', root), 'light');
    assert.equal(root.dataset.theme, 'light');
  },
  F23() {
    const storage = fakeStorage();
    saveTheme('dark', storage);
    assert.equal(storage.data[THEME_KEY], 'dark');
    saveTheme('rosa', storage);
    assert.equal(storage.data[THEME_KEY], 'dark', 'valores inválidos não são gravados');
    assert.equal(loadTheme(storage), 'dark');
    assert.equal(loadTheme(fakeStorage({ [THEME_KEY]: 'rosa' })), 'light');
    assert.equal(loadTheme(fakeStorage()), 'light');
    assert.equal(loadTheme(brokenStorage()), 'light');
    assert.doesNotThrow(() => saveTheme('dark', brokenStorage()));
  },
  F24() {
    assert.deepEqual(validateSearch('  ana '), { valid: true, message: '', value: 'ana' });
    assert.deepEqual(validateSearch(''), { valid: true, message: '', value: '' });
    for (const ok of ["O'Neil", 'Maria-José', 'João', 'Dr. Silva']) assert.equal(validateSearch(ok).valid, true, ok);
    const tooLong = validateSearch('a'.repeat(41));
    assert.equal(tooLong.valid, false);
    assert.ok(tooLong.message.includes('40'));
    const digits = validateSearch('ana123');
    assert.equal(digits.valid, false);
    assert.ok(digits.message.includes('letras'));
    assert.equal(validateSearch('<b>').valid, false);
  },
  F25() {
    const todos = [
      { userId: 1, completed: true },
      { userId: 2, completed: false },
      { userId: 3, completed: true },
      { userId: 3, completed: false },
    ];
    const run = (criteria) => names(filters.combineFilters(people, todos, { query: '', city: '', todoStatus: 'all', ...criteria }));
    assert.deepEqual(run({}), people.map((p) => p.name));
    assert.deepEqual(run({ todoStatus: 'completed' }), ['Ana Silva', 'Bruno Lima']);
    assert.deepEqual(run({ todoStatus: 'pending' }), ['Mariana Costa', 'Bruno Lima']);
    // Combinação com nome/cidade (depende de F04 e F05 já integradas)
    const feature = (id) => FEATURES.find((f) => f.id === id);
    if (isImplemented(feature('F04')) && isImplemented(feature('F05'))) {
      assert.deepEqual(run({ city: 'Rio de Janeiro', todoStatus: 'pending' }), ['Bruno Lima']);
      assert.deepEqual(run({ query: 'ana', todoStatus: 'completed' }), ['Ana Silva']);
    }
  },
  F26() {
    const user = { id: 3, name: '<b>Ana</b>', email: 'ana@x.com', phone: '1', website: 'ana.dev', company: { name: 'ACME' }, address: { city: 'Rio' } };
    const posts = [{ userId: 3 }, { userId: 3 }, { userId: 4 }];
    const todos = [{ userId: 3, completed: true }, { userId: 3, completed: false }, { userId: 4, completed: true }];
    assert.deepEqual(getUserDetails(user, posts, todos), {
      id: 3,
      name: '<b>Ana</b>',
      email: 'ana@x.com',
      phone: '1',
      website: 'ana.dev',
      company: 'ACME',
      city: 'Rio',
      postCount: 2,
      todoCount: 2,
      completedTodoCount: 1,
    });
    const el = fakeEl();
    el.hidden = true;
    ui.renderUserDetails(getUserDetails(user, posts, todos), el);
    assert.equal(el.hidden, false);
    assert.ok(el.innerHTML.includes('&lt;b&gt;Ana&lt;/b&gt;'), 'nome deve ser escapado');
    assert.ok(el.innerHTML.includes('ana@x.com'));
    ui.renderUserDetails(null, el);
    assert.equal(el.hidden, true);
    assert.equal(el.innerHTML, '');
  },
  F27() {
    const list = Array.from({ length: 11 }, (_, i) => i + 1);
    assert.deepEqual(filters.paginate(list, 2, 5), { items: [6, 7, 8, 9, 10], page: 2, totalPages: 3, totalItems: 11 });
    assert.deepEqual(filters.paginate(list, 99, 5), { items: [11], page: 3, totalPages: 3, totalItems: 11 });
    assert.equal(filters.paginate(list, 0, 5).page, 1);
    assert.deepEqual(filters.paginate([], 1, 5), { items: [], page: 1, totalPages: 1, totalItems: 0 });
    const els = { label: fakeEl(), prev: fakeEl(), next: fakeEl() };
    ui.renderPagination({ page: 1, totalPages: 3 }, els);
    assert.equal(els.label.textContent, 'Página 1 de 3');
    assert.equal(els.prev.disabled, true);
    assert.equal(els.next.disabled, false);
    ui.renderPagination({ page: 3, totalPages: 3 }, els);
    assert.equal(els.prev.disabled, false);
    assert.equal(els.next.disabled, true);
  },
  F28() {
    const el = fakeEl();
    el.hidden = true;
    ui.showSuccess('Dados atualizados.', el);
    assert.equal(el.textContent, 'Dados atualizados.');
    assert.ok(hasClass(el, 'message-success'));
    assert.equal(el.hidden, false);
  },
  F29() {
    assert.equal(ui.shouldShowBackToTop(301), true);
    assert.equal(ui.shouldShowBackToTop(300), false);
    assert.equal(ui.shouldShowBackToTop(0), false);
    assert.equal(ui.shouldShowBackToTop(120, 100), true);
    const calls = [];
    ui.scrollToTop({ scrollTo: (options) => calls.push(options) });
    assert.equal(calls.length, 1);
    assert.equal(calls[0].top, 0);
    assert.equal(calls[0].behavior, 'smooth');
  },
  F30() {
    assert.equal(ui.describeSource('local'), 'Dados locais (mock.json)');
    assert.equal(ui.describeSource('remote'), 'Dados remotos (API)');
    assert.equal(ui.describeSource('x'), 'Origem desconhecida');
    const el = fakeEl();
    ui.renderSourceIndicator('remote', el);
    assert.equal(el.textContent, 'Dados remotos (API)');
    assert.equal(el.dataset.source, 'remote');
  },
};

for (const feature of FEATURES) {
  const pending = !isImplemented(feature);
  test(`${feature.id} · ${feature.title}`, { skip: pending ? 'pendente (NOT_IMPLEMENTED)' : false }, async () => {
    await checks[feature.id]();

    const html = readProjectFile('index.html');
    for (const id of feature.htmlIds) assert.ok(html.includes(`id="${id}"`), `index.html deve conter um elemento com id="${id}"`);
    for (const [file, text] of feature.css) {
      assert.ok(existsSync(path.join(ROOT, file)) && readProjectFile(file).includes(text), `${file} deve conter ${text}`);
    }
  });
}
