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
/**
 * Busca uma URL e devolve o JSON. Deve lançar HttpError(status) quando response.ok for false.
 * @returns {Promise<any>}
 */
export async function fetchJSON(url, fetchFn = globalThis.fetch) {
  const response = await fetchFn(url);

  if (!response.ok)
      throw new HttpError(response.status, `Recurso não encontrado ${response.status}`);

  return response.json();
}

/**
 * Converte um erro em mensagem amigável (pt-BR) para o usuário final.
 * @param {Error} error
 * @returns {string}
 */
export function describeError(error) {

  if (error instanceof HttpError) {
    if (error.status === 404) return `Recurso não encontrado (${error.status}).`;
    if (error.status >= 500) return `Erro no servidor ${error.status}.`;
      return `Erro HTTP ${error.status}`;
  }

  if (error instanceof TypeError) return 'Erro de conexão com o servidor.';
  return `Erro inesperado ao carregar os dados.`;

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
// NOT_IMPLEMENTED:F13
/** @returns {Promise<object[]|null>} lista de GET {API_BASE}/todos */
export async function fetchTodos(fetchFn = globalThis.fetch) {
  return null; // TODO(F13)
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
