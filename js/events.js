/**
 * events.js — liga os eventos da página (cliques, digitação, seleção) às funções do app.
 * `ctx` traz { state, render, refresh, onSelectUser, onThemeChange } e é montado em app.js.
 *
 * Regra do laboratório: edite SOMENTE a região da sua funcionalidade
 * (entre // [Fxx] e // [/Fxx]).
 */
import { validateSearch } from './validators.js';
// Importações já prontas para as funcionalidades F07, F21, F22 e F29 (evita conflitos no topo do arquivo).
import { clearFilters } from './filters.js';
import { applyTheme, scrollToTop, setButtonBusy, shouldShowBackToTop, toggleTheme } from './components.js';

export function bindEvents(ctx) {
  bindSearch(ctx);
  bindFilterSelects(ctx);
  bindPagination(ctx);
  bindUserList(ctx);

  // Funcionalidades dos alunos (cada uma tem sua região abaixo)
  bindClearFilters(ctx);
  bindRefreshButton(ctx);
  bindThemeButton(ctx);
  bindBackToTop(ctx);
}

/* ---------- Já implementado ---------- */

function bindSearch(ctx) {
  const input = document.getElementById('search-input');
  const error = document.getElementById('search-error');
  input.addEventListener('input', () => {
    const result = validateSearch(input.value);
    if (!result.valid) {
      error.textContent = result.message;
      error.hidden = false;
      return;
    }
    error.hidden = true;
    ctx.state.criteria.query = result.value;
    ctx.state.page = 1;
    ctx.render();
  });
}

function bindFilterSelects(ctx) {
  const bindings = [
    ['filter-city', 'city', String],
    ['sort-order', 'sort', String],
    ['limit-select', 'limit', Number],
    ['todo-status', 'todoStatus', String],
  ];
  for (const [id, key, convert] of bindings) {
    document.getElementById(id).addEventListener('change', (event) => {
      ctx.state.criteria[key] = convert(event.target.value);
      ctx.state.page = 1;
      ctx.render();
    });
  }
}

function bindPagination(ctx) {
  document.getElementById('btn-prev').addEventListener('click', () => {
    ctx.state.page = Math.max(1, ctx.state.page - 1);
    ctx.render();
  });
  document.getElementById('btn-next').addEventListener('click', () => {
    ctx.state.page += 1; // render() ajusta se passar da última página
    ctx.render();
  });
}

function bindUserList(ctx) {
  document.getElementById('user-list').addEventListener('click', (event) => {
    const item = event.target.closest('[data-user-id]');
    if (item) ctx.onSelectUser(Number(item.dataset.userId));
  });
}

/* ---------- Funcionalidades dos alunos ---------- */

// [F07] Ligação do botão "Limpar filtros" (#btn-clear-filters)
/**
 * Ao clicar: state.criteria = clearFilters(state.criteria); devolver os valores padrão aos
 * campos da tela (#search-input, #filter-city, #sort-order, #limit-select, #todo-status);
 * state.page = 1; ctx.render().
 */
function bindClearFilters(ctx) {
  const botao = document.getElementById('btn-clear-filters');

   botao.addEventListener('click', () => {
     ctx.state.criteria = clearFilters(ctx.state.criteria);

     document.getElementById('search-input').value = '';
     document.getElementById('filter-city').value = '';
     document.getElementById('sort-order').value = 'none';
     document.getElementById('limit-select').value = '0';
     document.getElementById('todo-status').value = 'all';

     ctx.state.page = 1;
     ctx.render();
   });
}
// [/F07]

// [F21] Ligação do botão "Atualizar dados" (#btn-refresh)
/** Ao clicar: setButtonBusy(btn, true) → await ctx.refresh() → setButtonBusy(btn, false). */
function bindRefreshButton(ctx) {
  // TODO(F21)
}
// [/F21]

// [F22] Ligação do botão de tema (#btn-theme)
/** Ao clicar: ctx.onThemeChange(applyTheme(toggleTheme(ctx.state.theme))) — onThemeChange já guarda o tema. */
function bindThemeButton(ctx) {
  // TODO(F22)
}
// [/F22]

// [F29] Ligação do botão "Voltar ao início" (#btn-top)
/** Mostrar/esconder o botão no evento 'scroll' (shouldShowBackToTop) e rolar ao topo no clique. */
function bindBackToTop(ctx) {
  const botao = document.getElementById("btn-top")

  if (botao) {
    botao.addEventListener("click", () => scrollToTop());

    window.addEventListener("scroll", () => {
      shouldShowBackToTop(scrollY) ? botao.style.display = "block" : botao.style.display = "none";
    }); 
  } 
 // TODO(F29)
}
// [/F29]
