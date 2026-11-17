/**
 * filters.js — pesquisa, filtros, ordenação, limite e paginação.
 * Funções puras: recebem dados e devolvem NOVOS dados (nunca alteram a entrada).
 *
 * Regra do laboratório: edite SOMENTE a região da sua funcionalidade
 * (entre // [Fxx] e // [/Fxx]) e remova a linha NOT_IMPLEMENTED:Fxx ao concluir.
 */
import { DEFAULT_CRITERIA } from './data.js';

/** Minúsculas, sem acentos e sem espaços nas pontas. Use para comparar textos. */
export function normalizeText(text) {
  return String(text ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();
}

/** Encadeia os filtros de usuários na ordem: nome → cidade → ordenação → limite. */
export function applyFilters(users, criteria = DEFAULT_CRITERIA) {
  let result = filterByName(users, criteria.query);
  result = filterByCity(result, criteria.city);
  result = sortUsers(result, criteria.sort);
  return limitRecords(result, criteria.limit);
}

/** Filtra tarefas conforme o status escolhido na tela. */
export function applyTodoFilter(todos, status = 'all') {
  if (status === 'completed') return filterCompletedTodos(todos);
  if (status === 'pending') return filterPendingTodos(todos);
  return todos;
}

// [F04] Pesquisa por nome
// NOT_IMPLEMENTED:F04
/**
 * @param {object[]} users
 * @param {string} query  texto digitado (pode ter acentos, maiúsculas e espaços)
 * @returns {object[]} usuários cujo nome contém a consulta; consulta vazia = todos
 */
export function filterByName(users, query) {
  return users; // TODO(F04)
}
// [/F04]

// [F05] Filtro por cidade
// NOT_IMPLEMENTED:F05
/**
 * @param {object[]} users
 * @param {string} city  cidade escolhida; '' = todas
 * @returns {object[]} usuários cuja user.address.city é igual à cidade (sem diferenciar acentos/caixa)
 */
export function filterByCity(users, city) {
  return users; // TODO(F05)
}

/**
 * @returns {string[]} cidades distintas, em ordem alfabética (pt-BR)
 */
export function getUniqueCities(users) {
  return []; // TODO(F05)
}
// [/F05]

// [F06] Ordenação alfabética
// NOT_IMPLEMENTED:F06
/**
 * @param {object[]} users
 * @param {'none'|'asc'|'desc'} order
 * @returns {object[]} NOVA lista ordenada por nome; 'none' mantém a ordem original
 */
export function sortUsers(users, order) {
  return users; // TODO(F06)
}
// [/F06]

// [F07] Limpar filtros
// NOT_IMPLEMENTED:F07
/**
 * @param {object} criteria  critérios atuais (não deve ser alterado)
 * @returns {object} NOVO objeto com os valores padrão (veja DEFAULT_CRITERIA em data.js)
 */
export function clearFilters(criteria) {
  return criteria; // TODO(F07)
}
// [/F07]

// [F15] Tarefas concluídas
/** @returns {object[]} somente as tarefas com completed === true */
export function filterCompletedTodos(todos) {
 return todos.filter(todo => todo.completed === true);
}
// [/F15]

// [F16] Tarefas pendentes
// NOT_IMPLEMENTED:F16
/** @returns {object[]} somente as tarefas com completed === false */
export function filterPendingTodos(todos) {
  return todos; // TODO(F16)
}
// [/F16]

// [F17] Limite de registros
// NOT_IMPLEMENTED:F17
/**
 * @param {any[]} list
 * @param {number} max  quantidade máxima; 0, negativo ou inválido = sem limite
 * @returns {any[]} NOVA lista com no máximo `max` itens
 */
export function limitRecords(list, max) {
  return list; // TODO(F17)
}
// [/F17]

// [F25] Filtro combinado
// NOT_IMPLEMENTED:F25
/**
 * Combina nome, cidade e status das tarefas (todos ao mesmo tempo).
 * criteria = { query, city, todoStatus: 'all' | 'completed' | 'pending' }
 * Com todoStatus 'completed'/'pending', mantém só usuários que possuem ao menos
 * uma tarefa (todos[].userId === user.id) com esse status.
 * Reutilize filterByName e filterByCity (contratos já existem).
 * @returns {object[]}
 */
export function combineFilters(users, todos, criteria) {
  return users; // TODO(F25)
}
// [/F25]

// [F27] Paginação
// NOT_IMPLEMENTED:F27
/**
 * @param {any[]} list
 * @param {number} page      página desejada (1 = primeira); valores fora do intervalo são ajustados
 * @param {number} pageSize  itens por página
 * @returns {{items: any[], page: number, totalPages: number, totalItems: number}}
 *          totalPages é no mínimo 1, mesmo com lista vazia
 */
export function paginate(list, page, pageSize) {
  return { items: list, page: 1, totalPages: 1, totalItems: list.length }; // TODO(F27)
}
// [/F27]
