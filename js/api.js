/**
 * api.js — acesso a dados remotos (JSONPlaceholder) e locais (data/mock.json).
 * Todas as funções recebem `fetchFn` para que os testes possam simular a rede.
 *
 * Regra do laboratório: edite SOMENTE a região da sua funcionalidade
 * (entre // [Fxx] e // [/Fxx]) e remova a linha NOT_IMPLEMENTED:Fxx ao concluir.
 */

export const API_BASE = 'https://jsonplaceholder.typicode.com';
export const LOCAL_DATA_URL = 'data/mock.json';

/** Erro de resposta HTTP (status fora de 200–299). */
export class HttpError extends Error {
  constructor(status, message = `Falha HTTP ${status}`) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
  }
}

// [F19] Tratamento de falhas HTTP
// NOT_IMPLEMENTED:F19
/**
 * Busca uma URL e devolve o JSON. Deve lançar HttpError(status) quando response.ok for false.
 * @returns {Promise<any>}
 */
export async function fetchJSON(url, fetchFn = globalThis.fetch) {
  const response = await fetchFn(url);
  return response.json(); // TODO(F19): verifique response.ok antes de ler o JSON
}

/**
 * Converte um erro em mensagem amigável (pt-BR) para o usuário final.
 * @param {Error} error
 * @returns {string}
 */
export function describeError(error) {
  return 'Não foi possível carregar os dados.'; // TODO(F19)
}
// [/F19]

/** Lê o arquivo local data/mock.json → { users, posts, todos }. */
export async function loadLocalData(fetchFn = globalThis.fetch) {
  const data = await fetchJSON(LOCAL_DATA_URL, fetchFn);
  return { users: data.users, posts: data.posts, todos: data.todos };
}

// [F11] Buscar usuários na API

/** @returns {Promise<object[]|null>} lista de GET {API_BASE}/users */
export async function fetchUsers(fetchFn = globalThis.fetch) {
  return fetchJSON(`${API_BASE}/users`, fetchFn);
}
// [/F11]

// [F12] Buscar publicações na API
// NOT_IMPLEMENTED:F12
/** @returns {Promise<object[]|null>} lista de GET {API_BASE}/posts */
export async function fetchPosts(fetchFn = globalThis.fetch) {
  return null; // TODO(F12)
}
// [/F12]

// [F13] Buscar tarefas na API

/** @returns {Promise<object[]|null>} lista de GET {API_BASE}/todos */
export async function fetchTodos(fetchFn = globalThis.fetch) {

  return fetchJSON(`${API_BASE}/todos`, fetchFn);

}
// [/F13]

// [F20] Fallback para dados locais
// NOT_IMPLEMENTED:F20
/**
 * Tenta a API (fetchUsers, fetchPosts, fetchTodos). Se qualquer chamada falhar ou não
 * devolver uma lista, usa loadLocalData.
 * @returns {Promise<{users: object[], posts: object[], todos: object[], source: 'remote'|'local'}>}
 */
export async function loadWithFallback(fetchFn = globalThis.fetch) {
  const local = await loadLocalData(fetchFn); // TODO(F20): tente a API primeiro
  return { ...local, source: 'local' };
}
// [/F20]

/** Ponto de entrada usado pelo app. */
export async function loadData(fetchFn = globalThis.fetch) {
  return loadWithFallback(fetchFn);
}
