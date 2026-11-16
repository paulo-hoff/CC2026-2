/**
 * validators.js — validações de entrada. Sem acesso ao DOM.
 *
 * Regra do laboratório: edite SOMENTE a região da sua funcionalidade
 * (entre // [Fxx] e // [/Fxx]) e remova a linha NOT_IMPLEMENTED:Fxx ao concluir.
 */

export function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

export function isValidEmail(value) {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// [F24] Validação do campo de busca
// NOT_IMPLEMENTED:F24
/**
 * Regras: após remover espaços das pontas, no máximo 40 caracteres e somente
 * letras (com acentos), espaços, apóstrofo, ponto e hífen.
 * @param {string} query
 * @returns {{valid: boolean, message: string, value: string}}
 */
export function validateSearch(query) {
  return { valid: true, message: '', value: String(query ?? '').trim() }; // TODO(F24)
}
// [/F24]
