/**
 * components.js — funções que desenham (renderizam) partes da interface.
 * Cada função recebe o elemento (`el`) como parâmetro, o que permite testá-las sem navegador.
 *
 * Regra do laboratório: edite SOMENTE a região da sua funcionalidade
 * (entre // [Fxx] e // [/Fxx]) e remova a linha NOT_IMPLEMENTED:Fxx ao concluir.
 */
// Importações já prontas para as funcionalidades F10, F14, F22 e F26 (evita conflitos no topo do arquivo).
import { THEMES, completedPercentage } from './data.js';
import { escapeHtml, formatDateTime, formatUserName } from './formatters.js';

/* ---------- Já implementado (não alterar nas tarefas) ---------- */

export function renderUserList(users, el, criteria = {}) {
  el.innerHTML = '';
  if (users.length === 0) {
    renderEmptyState(el, criteria);
    return;
  }
  el.innerHTML = users
    .map(
      (user) => `<li class="user-card">
  <button type="button" class="user-card-button" data-user-id="${user.id}">
    <strong>${escapeHtml(formatUserName(user.name))}</strong>
    <span>${escapeHtml(user.address?.city ?? '')}</span>
    <span class="muted">${escapeHtml(user.email ?? '')}</span>
  </button>
</li>`,
    )
    .join('');
}

export function renderTodoList(todos, el) {
  el.innerHTML = todos
    .slice(0, 12)
    .map(
      (todo) =>
        `<li class="todo-item${todo.completed ? ' is-done' : ''}"><span aria-hidden="true">${todo.completed ? '✔' : '○'}</span><span>${escapeHtml(todo.title)}</span></li>`,
    )
    .join('');
}

export function renderCityOptions(cities, el, selected = '') {
  const options = ['<option value="">Todas as cidades</option>']
    .concat(
      cities.map(
        (city) =>
          `<option value="${escapeHtml(city)}"${city === selected ? ' selected' : ''}>${escapeHtml(city)}</option>`,
      ),
    )
    .join('');
  el.innerHTML = options;
}

export function showError(text, el) {
  el.className = 'messages message message-error';
  el.textContent = text;
  el.hidden = false;
}

export function clearMessages(el) {
  el.className = 'messages';
  el.textContent = '';
  el.hidden = true;
}

/* ---------- Rodada 1 ---------- */

// [F01] Contador de usuários
// NOT_IMPLEMENTED:F01
/** Escreve a quantidade de usuários em `el` (padrão: #count-users). */
export function renderUserCount(users, el = document.getElementById('count-users')) {
  // TODO(F01)
}
// [/F01]

// [F02] Contador de publicações
// NOT_IMPLEMENTED:F02
/** Escreve a quantidade de publicações em `el` (padrão: #count-posts). */
export function renderPostCount(posts, el = document.getElementById('count-posts')) {
  // TODO(F02)
}
// [/F02]

// [F03] Contador de tarefas
// NOT_IMPLEMENTED:F03
/** Escreve a quantidade de tarefas em `el` (padrão: #count-todos). */
export function renderTodoCount(todos, el = document.getElementById('count-todos')) {
  // TODO(F03)
}
// [/F03]

// [F08] Mensagem de lista vazia
// NOT_IMPLEMENTED:F08
/**
 * Chamada por renderUserList quando não há usuários.
 * Deve escrever em `el.innerHTML` um parágrafo com a classe "empty-state" e o texto
 * "Nenhum usuário encontrado." — se criteria.query não for vazio, inclua o termo (escapado).
 */
export function renderEmptyState(el, criteria = {}) {
  // TODO(F08)
}
// [/F08]

// [F09] Indicador de carregamento
// NOT_IMPLEMENTED:F09
/** Mostra (isLoading = true) ou esconde (false) o elemento #loading usando a propriedade `hidden`. */
export function setLoading(isLoading, el = document.getElementById('loading')) {
  // TODO(F09)
}
// [/F09]

/* ---------- Rodada 2 ---------- */

// [F14] Exibição do percentual de tarefas concluídas
/** Escreve no formato '33%' em `el` (padrão: #percent-completed), usando completedPercentage (data.js). */
export function renderCompletedPercent(todos, el = document.getElementById('percent-completed')) {

  el.textContent = `${completedPercentage(todos)}%`;
}
// [/F14]

// [F10] Exibição da data da última atualização
/** Escreve a data formatada em `el` (padrão: #last-update) usando formatDateTime (formatters.js). */
export function renderLastUpdate(date, el = document.getElementById('last-update')) {
  // TODO(F10)
}
// [/F10]

/* ---------- Rodada 3 ---------- */

// [F21] Botão de atualizar dados
// NOT_IMPLEMENTED:F21
/**
 * Alterna o estado do botão: ocupado → disabled = true e texto 'Atualizando…';
 * livre → disabled = false e texto 'Atualizar dados'.
 */
export function setButtonBusy(button, busy) {
  // TODO(F21)
}
// [/F21]

// [F22] Alternância de tema
// NOT_IMPLEMENTED:F22
/** @returns {'light'|'dark'} o tema oposto ao atual ('dark' → 'light'; qualquer outro → 'dark'). */
export function toggleTheme(current) {
  return current; // TODO(F22)
}

/**
 * Aplica o tema no elemento raiz (root.dataset.theme). Temas fora de THEMES viram 'light'.
 * @returns {'light'|'dark'} o tema aplicado
 */
export function applyTheme(theme, root = document.documentElement) {
  return theme; // TODO(F22) — THEMES já está importado no topo do arquivo
}
// [/F22]

// [F26] Exibição dos detalhes de um usuário
/**
 * Mostra os dados de getUserDetails (data.js) em `el` (padrão: #user-details).
 * details = null → esconde o painel (hidden = true) e limpa o conteúdo.
 * Todo texto vindo dos dados deve passar por escapeHtml.
 */
export function renderUserDetails(details, el = document.getElementById('user-details')) {
  // TODO(F26)
}
// [/F26]

// [F27] Controles de paginação
/**
 * @param {{page:number, totalPages:number}} info
 * @param {{label: HTMLElement, prev: HTMLButtonElement, next: HTMLButtonElement}} els
 * label.textContent = 'Página X de Y'; prev desabilitado na 1ª página; next na última.
 */
export function renderPagination(info, els) {
  // TODO(F27)
}
// [/F27]

// [F28] Aviso de operação bem-sucedida
// NOT_IMPLEMENTED:F28
/**
 * Mostra uma mensagem de sucesso em `el` (veja showError como modelo).
 * Classe obrigatória: message-success. Estilo em css/components.css.
 */
export function showSuccess(text, el) {
  // TODO(F28)
}
// [/F28]

// [F29] Voltar ao início
// NOT_IMPLEMENTED:F29
/** @returns {boolean} true quando scrollY é maior que o limite (padrão 300 px). */
export function shouldShowBackToTop(scrollY, threshold = 300) {
  return false; // TODO(F29)
}

/** Rola a janela suavemente até o topo: win.scrollTo({ top: 0, behavior: 'smooth' }). */
export function scrollToTop(win = window) {
  // TODO(F29)
}
// [/F29]

// [F30] Indicador de dados locais ou remotos
// NOT_IMPLEMENTED:F30
/**
 * @param {'local'|'remote'|string} source
 * @returns {string} 'Dados locais (mock.json)' | 'Dados remotos (API)' | 'Origem desconhecida'
 */
export function describeSource(source) {
  return '--'; // TODO(F30)
}

/** Escreve describeSource(source) em `el` (padrão: #data-source) e grava el.dataset.source. */
export function renderSourceIndicator(source, el = document.getElementById('data-source')) {
  // TODO(F30)
}
// [/F30]
