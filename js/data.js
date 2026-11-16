/**
 * data.js — estado da aplicação e regras sobre os dados.
 * Não acessa o DOM: pode ser importado nos testes (Node) e no navegador.
 *
 * Regra do laboratório: edite SOMENTE a região da sua funcionalidade
 * (entre // [Fxx] e // [/Fxx]) e remova a linha NOT_IMPLEMENTED:Fxx ao concluir.
 */

export const THEMES = ['light', 'dark'];
export const THEME_KEY = 'cdd-theme';

export const DEFAULT_CRITERIA = Object.freeze({
  query: '',
  city: '',
  sort: 'none', // 'none' | 'asc' | 'desc'
  limit: 0, // 0 = sem limite
  todoStatus: 'all', // 'all' | 'completed' | 'pending'
});

export const state = {
  users: [],
  posts: [],
  todos: [],
  criteria: { ...DEFAULT_CRITERIA },
  page: 1,
  pageSize: 5,
  lastUpdate: null, // Date | null
  source: 'local', // 'local' | 'remote'
  theme: 'light',
};

// [F14] Percentual de tarefas concluídas
// NOT_IMPLEMENTED:F14
/**
 * @param {{completed: boolean}[]} todos
 * @returns {number} inteiro de 0 a 100 (lista vazia = 0)
 */
export function completedPercentage(todos) {
  return 0; // TODO(F14)
}
// [/F14]

// [F23] Preferência de tema no localStorage
// NOT_IMPLEMENTED:F23
/**
 * Grava o tema em storage (chave THEME_KEY) somente se for um valor de THEMES.
 * @param {string} theme
 * @param {{setItem: Function}} storage
 */
export function saveTheme(theme, storage) {
  // TODO(F23)
}

/**
 * Lê o tema salvo. Se não existir, for inválido ou o storage falhar, retorna 'light'.
 * @param {{getItem: Function}} storage
 * @returns {'light'|'dark'}
 */
export function loadTheme(storage) {
  return 'light'; // TODO(F23)
}
// [/F23]

// [F26] Detalhes de um usuário
// NOT_IMPLEMENTED:F26
/**
 * @returns {null | {id:number, name:string, email:string, phone:string, website:string,
 *   company:string, city:string, postCount:number, todoCount:number, completedTodoCount:number}}
 */
export function getUserDetails(user, posts, todos) {
  return null; // TODO(F26)
}
// [/F26]
