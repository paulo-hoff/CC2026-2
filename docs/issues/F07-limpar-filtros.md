<!-- labels: rodada-1,dupla-07,funcionalidade -->
# [F07] Adicionar botão para limpar filtros

**Rodada 1** · **Dupla 07** · **Tempo estimado:** 8 min · **Branch:** `feature/07-limpar-filtros`

Integrante A é o autor (código e PR); Integrante B é revisor de **outra dupla**.

## Descrição

Adicionar o botão "Limpar filtros", que devolve busca, cidade, ordem, limite e status das tarefas aos valores padrão.

## Objetivo técnico

Alterar HTML, ligar evento de clique e reutilizar uma função pura (`clearFilters`) que devolve um novo objeto.

## Objetivo pedagógico

Tarefa que cruza três arquivos (HTML, filtros e eventos) mantendo o escopo pequeno.

## Arquivos que devem ser alterados

- `js/filters.js`
- `js/events.js`
- `index.html`

Qualquer outro arquivo reprova a verificação de escopo do PR.

## Contrato

```text
clearFilters(criteria) → { query:"", city:"", sort:"none", limit:0, todoStatus:"all" }  ·  botão `id="btn-clear-filters"`
```

## Critérios de aceitação

- [ ] `clearFilters` devolve um NOVO objeto igual a `DEFAULT_CRITERIA` e não altera o recebido.
- [ ] `index.html` contém um botão com `id="btn-clear-filters"` dentro da região `[F07]`.
- [ ] Ao clicar, os campos da tela voltam ao padrão e a lista é redesenhada.
- [ ] O teste `F07` passa sem estar "skipped".

## Exemplo de comportamento esperado

Digitar `ana`, escolher uma cidade e clicar em "Limpar filtros" → campos vazios e 10 usuários na lista.

## Como validar

`npm test` (teste F07) + teste manual no navegador.

```bash
npm run validate
```

## Dependências

Nenhuma.

## Possíveis conflitos

F21 edita a região vizinha `[F21]` do mesmo bloco de `index.html`; não mexa nela.

## Orientação

Procure a região `[F07]` em cada arquivo (entre `[F07]` e `[/F07]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F07` em `js/filters.js`.

`DEFAULT_CRITERIA` está em `data.js` (congelado). Um spread `{ ...obj }` cria cópia. O evento de clique vai em `bindClearFilters`.

## Fluxo obrigatório

- [ ] `git switch develop && git pull origin develop`
- [ ] `git switch -c feature/07-limpar-filtros`
- [ ] Implementar, remover o marcador `NOT_IMPLEMENTED:F07` e rodar `npm run validate`
- [ ] Commit com mensagem `feat(F07): ...` e `git push -u origin feature/07-limpar-filtros`
- [ ] Abrir PR para **develop** com título `[F07] Adicionar botão para limpar filtros` e `Closes #<número desta Issue>` no corpo
- [ ] Solicitar revisão de alguém de **outra dupla** (revisão cruzada)
- [ ] Pipeline verde + aprovação → merge → `git switch develop && git pull`
