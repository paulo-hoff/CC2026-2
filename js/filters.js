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
/**
 * @param {object[]} users
 * @param {string} query  texto digitado (pode ter acentos, maiúsculas e espaços)
 * @returns {object[]} usuários cujo nome contém a consulta; consulta vazia = todos
 */
export function filterByName(users, query) {
  const term = normalizeText(query);
  if (!term) return users;
  return users.filter((user) => normalizeText(user.name).includes(term));
}
// [/F04]

// [F05] Filtro por cidade
/**
 * @param {object[]} users
 * @param {string} city  cidade escolhida; '' = todas
 * @returns {object[]} usuários cuja user.address.city é igual à cidade (sem diferenciar acentos/caixa)
 */
export function filterByCity(users, city) {
  const selectedCity = normalizeText(city);
  if (!selectedCity) return [...users];
  return users.filter((user) => normalizeText(user.address?.city) === selectedCity);
}

/**
 * @returns {string[]} cidades distintas, em ordem alfabética (pt-BR)
 */
export function getUniqueCities(users) {
  const cities = [];
  const seen = new Set();
  for (const user of users) {
    const city = user.address?.city?.trim();
    const key = normalizeText(city);
    if (key && !seen.has(key)) {
      seen.add(key);
      cities.push(city);
    }
  }
  return cities.sort((a, b) => a.localeCompare(b, 'pt-BR'));
}
// [/F05]

// [F06] Ordenação alfabética
/**
 * @param {object[]} users
 * @param {'none'|'asc'|'desc'} order
 * @returns {object[]} NOVA lista ordenada por nome; 'none' mantém a ordem original
 */
export function sortUsers(users, order) {
  const copia = [...users];

  if (order !== 'asc' && order !== 'desc') {
    return copia;
  }

  copia.sort((usuarioA, usuarioB) => {
    const nomeA = String(usuarioA.name ?? '');
    const nomeB = String(usuarioB.name ?? '');

    const resultado = nomeA.localeCompare(nomeB, 'pt-BR', { sensitivity: 'base' });

    return order === 'asc' ? resultado : -resultado;
  });

  return copia;
}
// [/F06]

// [F07] Limpar filtros
/**
 * @param {object} criteria  critérios atuais (não deve ser alterado)
 * @returns {object} NOVO objeto com os valores padrão (veja DEFAULT_CRITERIA em data.js)
 */
export function clearFilters(criteria) {
  return { ...DEFAULT_CRITERIA };
}
// [/F07]

// [F15] Tarefas concluídas
// NOT_IMPLEMENTED:F15
/** @returns {object[]} somente as tarefas com completed === true */
export function filterCompletedTodos(todos) {
  return todos; // TODO(F15)
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
 /**
  * @param {any[]} list
  * @param {number} max quantidade máxima; 0, negativo ou inválido = sem limite
  * @returns {any[]} NOVA lista com no máximo `max` itens
  */
 export function limitRecords(list, max) {
   const limite = Number(max);

   if (!Number.isInteger(limite) || limite <= 0) {
     return [...list];
   }

   return list.slice(0, limite);
 }
 // [/F17]

// [F25] Filtro combinado
/**
 * Combina nome, cidade e status das tarefas (todos ao mesmo tempo).
 * criteria = { query, city, todoStatus: 'all' | 'completed' | 'pending' }
 * Com todoStatus 'completed'/'pending', mantém só usuários que possuem ao menos
 * uma tarefa (todos[].userId === user.id) com esse status.
 * Reutilize filterByName e filterByCity (contratos já existem).
 * @returns {object[]}
 */
export function combineFilters(users, todos, { query, city, todoStatus } = DEFAULT_CRITERIA) {
  const byName = filterByName(users, query);
  const filteredUsers = filterByCity(byName, city);
  if (todoStatus !== 'completed' && todoStatus !== 'pending') return [...filteredUsers];

  const completed = todoStatus === 'completed';
  const matchingUserIds = new Set();
  for (const todo of todos) {
    if (Boolean(todo.completed) === completed) matchingUserIds.add(todo.userId);
  }
  return filteredUsers.filter((user) => matchingUserIds.has(user.id));
}
// [/F25]


 // [F27] Paginação
 /**
  * @param {any[]} list
  * @param {number} page
  * @param {number} pageSize
  * @returns {{items: any[], page: number, totalPages: number, totalItems: number}}
  */
 export function paginate(list, page, pageSize) {
   const totalItems = list.length;

   const tamanho = Number(pageSize);
   const tamanhoValido = Number.isInteger(tamanho) && tamanho > 0 ? tamanho : 5;

   const totalPages = Math.max(1, Math.ceil(totalItems / tamanhoValido));

   const paginaSolicitada = Number(page);
   const pagina = Number.isInteger(paginaSolicitada)
     ? Math.min(Math.max(paginaSolicitada, 1), totalPages)
     : 1;

   const inicio = (pagina - 1) * tamanhoValido;
   const items = list.slice(inicio, inicio + tamanhoValido);

   return { items, page: pagina, totalPages, totalItems };
 }
 // [/F27]

