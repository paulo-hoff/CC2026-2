/**
 * app.js — ponto de entrada. Orquestra carregamento, estado e renderização.
 * NÃO é alterado pelas tarefas dos alunos: cada funcionalidade já tem seu "encaixe" nos módulos.
 */
import { state, loadTheme, saveTheme } from './data.js';
import { loadData, describeError } from './api.js';
import { applyFilters, applyTodoFilter, getUniqueCities, paginate } from './filters.js';
import {
  applyTheme,
  clearMessages,
  renderCityOptions,
  renderCompletedPercent,
  renderLastUpdate,
  renderPagination,
  renderPostCount,
  renderSourceIndicator,
  renderTodoCount,
  renderTodoList,
  renderUserCount,
  renderUserDetails,
  renderUserList,
  setLoading,
  showError,
  showSuccess,
} from './components.js';
import { getUserDetails } from './data.js';
import { bindEvents } from './events.js';

const $ = (id) => document.getElementById(id);

export function render() {
  const filtered = applyFilters(state.users, state.criteria);
  const pageInfo = paginate(filtered, state.page, state.pageSize);
  state.page = pageInfo.page;

  renderCityOptions(getUniqueCities(state.users), $('filter-city'), state.criteria.city);
  renderUserList(pageInfo.items, $('user-list'), state.criteria);
  renderPagination(pageInfo, { label: $('page-info'), prev: $('btn-prev'), next: $('btn-next') });
  renderTodoList(applyTodoFilter(state.todos, state.criteria.todoStatus), $('todo-list'));

  renderUserCount(state.users, $('count-users'));
  renderPostCount(state.posts, $('count-posts'));
  renderTodoCount(state.todos, $('count-todos'));
  renderCompletedPercent(state.todos, $('percent-completed'));
  renderLastUpdate(state.lastUpdate, $('last-update'));
  renderSourceIndicator(state.source, $('data-source'));
}

export async function refresh() {
  const messages = $('messages');
  clearMessages(messages);
  setLoading(true, $('loading'));
  try {
    const data = await loadData();
    state.users = data.users;
    state.posts = data.posts;
    state.todos = data.todos;
    state.source = data.source ?? 'local';
    state.lastUpdate = new Date();
    showSuccess('Dados atualizados com sucesso.', messages);
  } catch (error) {
    showError(describeError(error), messages);
  } finally {
    setLoading(false, $('loading'));
  }
  render();
}

function onSelectUser(id) {
  const user = state.users.find((item) => item.id === id);
  if (!user) return;
  renderUserDetails(getUserDetails(user, state.posts, state.todos), $('user-details'));
}

function onThemeChange(theme) {
  state.theme = theme;
  saveTheme(theme, getStorage()); // F23 implementa a gravação
}

function getStorage() {
  try {
    return window.localStorage;
  } catch {
    return null; // navegação privada ou armazenamento bloqueado
  }
}

function init() {
  state.theme = applyTheme(loadTheme(getStorage()), document.documentElement);
  bindEvents({ state, render, refresh, onSelectUser, onThemeChange });
  refresh();
}

document.addEventListener('DOMContentLoaded', init);
