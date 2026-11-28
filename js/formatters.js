/**
 * formatters.js — funções que transformam dados em texto exibível.
 * Sem acesso ao DOM.
 *
 * Regra do laboratório: edite SOMENTE a região da sua funcionalidade
 * (entre // [Fxx] e // [/Fxx]) e remova a linha NOT_IMPLEMENTED:Fxx ao concluir.
 */

/** Escapa caracteres especiais de HTML. Use sempre que inserir texto vindo de dados em innerHTML. */
export function escapeHtml(text) {
  return String(text ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** pluralize(1, 'usuário', 'usuários') → 'usuário' */
export function pluralize(count, singular, plural) {
  return count === 1 ? singular : plural;
}

// [F10] Data e hora da última atualização
/**
 * @param {Date|null} date
 * @returns {string} 'dd/mm/aaaa HH:MM' (ex.: '05/01/2025 09:07'); sem data = '--'
 */
export function formatDateTime(date) {
  if (!date) return '--';
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d.getTime())) return '--';
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}
// [/F10]

// [F18] Formatação de nomes
/**
 * @param {string} name
 * @returns {string}
 */
export function formatUserName(name) {
  if (!name) return '';

  name = name.trim();

  name = name.replace(/^(Mr|Mrs|Ms|Dr)\.?\s+/i, '');

  return name
    .trim()
    .split(/\s+/)
    .map(word => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
// [/F18]