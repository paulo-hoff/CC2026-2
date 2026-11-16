/**
 * Registro das 30 funcionalidades do laboratório (fonte única para testes e verificações de PR).
 * - file:    arquivo onde fica o marcador NOT_IMPLEMENTED:Fxx
 * - allowed: arquivos que o PR da funcionalidade pode alterar
 * - htmlIds / css: o que deve existir no projeto quando a funcionalidade estiver pronta
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

const C = 'js/components.js';
const F = 'js/filters.js';
const FM = 'js/formatters.js';
const D = 'js/data.js';
const A = 'js/api.js';
const E = 'js/events.js';
const H = 'index.html';

const f = (id, round, slug, title, file, allowed, extra = {}) => ({
  id: `F${String(id).padStart(2, '0')}`,
  number: String(id).padStart(2, '0'),
  round,
  slug,
  title,
  file,
  allowed,
  htmlIds: [],
  css: [],
  ...extra,
});

export const FEATURES = [
  f(1, 1, 'contador-usuarios', 'Exibir contador de usuários', C, [C]),
  f(2, 1, 'contador-publicacoes', 'Exibir contador de publicações', C, [C]),
  f(3, 1, 'contador-tarefas', 'Exibir contador de tarefas', C, [C]),
  f(4, 1, 'busca-nome', 'Criar pesquisa por nome', F, [F]),
  f(5, 1, 'filtro-cidade', 'Criar filtro por cidade', F, [F]),
  f(6, 1, 'ordenar-usuarios', 'Ordenar usuários alfabeticamente', F, [F]),
  f(7, 1, 'limpar-filtros', 'Adicionar botão para limpar filtros', F, [F, E, H], { htmlIds: ['btn-clear-filters'] }),
  f(8, 1, 'lista-vazia', 'Exibir mensagem quando a lista estiver vazia', C, [C]),
  f(9, 1, 'carregamento', 'Criar indicador de carregamento', C, [C]),
  f(10, 1, 'ultima-atualizacao', 'Exibir data da última atualização', FM, [FM, C]),
  f(11, 2, 'api-usuarios', 'Buscar usuários na API', A, [A]),
  f(12, 2, 'api-publicacoes', 'Buscar publicações na API', A, [A]),
  f(13, 2, 'api-tarefas', 'Buscar tarefas na API', A, [A]),
  f(14, 2, 'percentual-concluidas', 'Calcular percentual de tarefas concluídas', D, [D, C]),
  f(15, 2, 'filtro-concluidas', 'Filtrar tarefas concluídas', F, [F]),
  f(16, 2, 'filtro-pendentes', 'Filtrar tarefas pendentes', F, [F]),
  f(17, 2, 'limitar-registros', 'Limitar a quantidade de registros exibidos', F, [F]),
  f(18, 2, 'formatar-nomes', 'Formatar nomes dos usuários', FM, [FM]),
  f(19, 2, 'erros-http', 'Tratar falhas de requisição HTTP', A, [A]),
  f(20, 2, 'fallback-local', 'Implementar fallback para dados locais', A, [A]),
  f(21, 3, 'botao-atualizar', 'Criar botão de atualizar dados', C, [C, E, H], { htmlIds: ['btn-refresh'] }),
  f(22, 3, 'tema-claro-escuro', 'Implementar alternância entre tema claro e escuro', C, [C, E, H, 'css/base.css'], {
    htmlIds: ['btn-theme'],
    css: [['css/base.css', '[data-theme="dark"]']],
  }),
  f(23, 3, 'tema-localstorage', 'Salvar preferência de tema no localStorage', D, [D]),
  f(24, 3, 'validar-busca', 'Criar validação de campo de busca', 'js/validators.js', ['js/validators.js']),
  f(25, 3, 'filtro-combinado', 'Criar filtro combinado', F, [F]),
  f(26, 3, 'detalhes-usuario', 'Mostrar detalhes de um usuário', D, [D, C]),
  f(27, 3, 'paginacao', 'Implementar paginação simples', F, [F, C]),
  f(28, 3, 'aviso-sucesso', 'Exibir aviso de operação bem-sucedida', C, [C, 'css/components.css'], {
    css: [['css/components.css', '.message-success']],
  }),
  f(29, 3, 'voltar-ao-inicio', 'Criar botão de voltar ao início', C, [C, E, H, 'css/components.css'], {
    htmlIds: ['btn-top'],
  }),
  f(30, 3, 'indicador-origem', 'Adicionar indicador de dados locais ou remotos', C, [C]),
];

export function getFeature(id) {
  return FEATURES.find((feature) => feature.id === id);
}

/** 'feature/04-busca-nome' → F04 (ou undefined). */
export function featureFromBranch(branch) {
  const match = /^feature\/(\d{2})-[a-z0-9-]+$/.exec(branch ?? '');
  return match ? getFeature(`F${match[1]}`) : undefined;
}

export function readProjectFile(relativePath, root = ROOT) {
  return readFileSync(path.join(root, relativePath), 'utf8');
}

/** Uma funcionalidade está "entregue" quando o marcador NOT_IMPLEMENTED:Fxx foi removido. */
export function isImplemented(feature, root = ROOT) {
  return !readProjectFile(feature.file, root).includes(`NOT_IMPLEMENTED:${feature.id}`);
}
