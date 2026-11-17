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
/**
 * @param {{completed: boolean}[]} todos
 * @returns {number} inteiro de 0 a 100 (lista vazia = 0)
 */
export function completedPercentage(todos) {
  if(todos.length <= 0){
    return 0;
  }

  const tarefasConcluida = todos.filter((tarefa) => tarefa.completed).length;
  
  return Math.round((tarefasConcluida / todos.length) * 100);
}
// [/F14]

// [F23] Preferência de tema no localStorage
/**
 * Grava o tema em storage (chave THEME_KEY) somente se for um valor de THEMES.
 * @param {string} theme
 * @param {{setItem: Function}} storage
 */
export function saveTheme(theme, storage) {
  if (!THEMES.includes(theme)) {
    return;
  }

  try {
    storage.setItem(THEME_KEY, theme);
  } catch (error) {
    console.log('Não foi possível salvar o tema');
  }
  // TODO(F23)
}

/**
 * Lê o tema salvo. Se não existir, for inválido ou o storage falhar, retorna 'light'.
 * @param {{getItem: Function}} storage
 * @returns {'light'|'dark'}
 */
export function loadTheme(storage) {
  try {
    const theme = storage.getItem(THEME_KEY);

    if (THEMES.includes(theme)) {
      return theme;
    }
  } catch (error) {
    console.log('Não foi possível salvar o tema');
  }

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
  if (!user) return null;

  const userPosts = posts.filter((post) => post.userId === user.id);
  const userTodos = todos.filter((todo) => todo.userId === user.id);

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    website: user.website,
    company: user.company?.name ?? '',
    city: user.address?.city ?? '',
    postCount: userPosts.length,
    todoCount: userTodos.length,
    completedTodoCount: userTodos.filter((todo) => todo.completed).length,
  };
}
// [/F26]
