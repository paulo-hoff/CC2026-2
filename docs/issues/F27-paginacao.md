<!-- labels: rodada-3,dupla-07,funcionalidade -->
# [F27] Implementar paginação simples

**Rodada 3** · **Dupla 07** · **Tempo estimado:** 10 min · **Branch:** `feature/27-paginacao`

Co-autoria (programação em par): A e B fazem commits na branch (A abre o PR); B revisa o PR de **outra dupla**.

## Descrição

Paginar a lista de usuários (5 por página) e habilitar/desabilitar os botões Anterior/Próxima.

## Objetivo técnico

Cálculo de páginas, ajuste de limites (clamp) e atualização de botões.

## Objetivo pedagógico

Casos de borda: página 0, página acima do total, lista vazia.

## Arquivos que devem ser alterados

- `js/filters.js`
- `js/components.js`

Qualquer outro arquivo reprova a verificação de escopo do PR.

## Contrato

```text
paginate(list, page, pageSize) → { items, page, totalPages, totalItems }  ·  renderPagination(info, { label, prev, next })
```

## Critérios de aceitação

- [ ] 11 itens, página 2, tamanho 5 → itens 6–10, `totalPages: 3`.
- [ ] Página acima do total vai para a última; página 0 vai para a 1.
- [ ] Lista vazia → `{ items: [], page: 1, totalPages: 1, totalItems: 0 }`.
- [ ] `renderPagination` escreve `Página X de Y` e desabilita Anterior na 1ª página e Próxima na última.
- [ ] O teste `F27` passa sem estar "skipped".

## Exemplo de comportamento esperado

Com 10 usuários, a página 1 mostra 5 e "Página 1 de 2".

## Como validar

`npm test` (teste F27) + clicar nos botões.

```bash
npm run validate
```

## Dependências

Nenhuma. Os botões já estão ligados em `events.js`.

## Possíveis conflitos

F17 (limitar registros) é aplicado antes da paginação. Não altere `app.js`.

## Orientação

Procure a região `[F27]` em cada arquivo (entre `[F27]` e `[/F27]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F27` em `js/filters.js`.

`Math.ceil(total / tamanho)` dá o número de páginas; `slice(inicio, fim)` pega os itens.

## Fluxo obrigatório

- [ ] `git switch develop && git pull origin develop`
- [ ] `git switch -c feature/27-paginacao`
- [ ] Implementar, remover o marcador `NOT_IMPLEMENTED:F27` e rodar `npm run validate`
- [ ] Commit com mensagem `feat(F27): ...` e `git push -u origin feature/27-paginacao`
- [ ] Abrir PR para **develop** com título `[F27] Implementar paginação simples` e `Closes #<número desta Issue>` no corpo
- [ ] Solicitar revisão de alguém de **outra dupla** (revisão cruzada)
- [ ] Pipeline verde + aprovação → merge → `git switch develop && git pull`
