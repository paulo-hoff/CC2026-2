<!-- labels: rodada-3,dupla-05,funcionalidade -->
# [F25] Criar filtro combinado

**Rodada 3** · **Dupla 05** · **Tempo estimado:** 10 min · **Branch:** `feature/25-filtro-combinado`

Co-autoria (programação em par): A e B fazem commits na branch (A abre o PR); B revisa o PR de **outra dupla**.

## Descrição

Combinar nome, cidade e status de tarefas: listar usuários que tenham tarefas concluídas (ou pendentes) respeitando a pesquisa e a cidade.

## Objetivo técnico

Composição de funções (reuso de F04/F05), `Set` para consulta rápida e `Boolean()` para normalizar o campo.

## Objetivo pedagógico

Programar contra um contrato enquanto as funções reais ainda não foram integradas.

## Arquivos que devem ser alterados

- `js/filters.js`

Qualquer outro arquivo reprova a verificação de escopo do PR.

## Contrato

```text
combineFilters(users, todos, { query, city, todoStatus }) → object[]
```

## Critérios de aceitação

- [ ] `todoStatus: "all"` não filtra por tarefas.
- [ ] `"completed"` mantém usuários com ao menos uma tarefa concluída (`todo.userId === user.id`).
- [ ] `"pending"` mantém usuários com ao menos uma tarefa pendente.
- [ ] Aplica também `filterByName` e `filterByCity` (testado quando F04 e F05 estão integradas).
- [ ] O teste `F25` passa sem estar "skipped".

## Exemplo de comportamento esperado

Cidade "Rio de Janeiro" + "pending" → só usuários dessa cidade com alguma tarefa pendente.

## Como validar

`npm test` (teste F25).

```bash
npm run validate
```

## Dependências

Usa `filterByName` (F04) e `filterByCity` (F05) pelo contrato (versões iniciais devolvem a lista sem filtrar).

## Possíveis conflitos

Não altere `applyFilters` nem as funções de F04/F05.

## Orientação

Procure a região `[F25]` em cada arquivo (entre `[F25]` e `[/F25]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F25` em `js/filters.js`.

Primeiro filtre por nome e cidade; depois descubra os `userId` que têm tarefas com o status desejado.

## Fluxo obrigatório

- [ ] `git switch develop && git pull origin develop`
- [ ] `git switch -c feature/25-filtro-combinado`
- [ ] Implementar, remover o marcador `NOT_IMPLEMENTED:F25` e rodar `npm run validate`
- [ ] Commit com mensagem `feat(F25): ...` e `git push -u origin feature/25-filtro-combinado`
- [ ] Abrir PR para **develop** com título `[F25] Criar filtro combinado` e `Closes #<número desta Issue>` no corpo
- [ ] Solicitar revisão de alguém de **outra dupla** (revisão cruzada)
- [ ] Pipeline verde + aprovação → merge → `git switch develop && git pull`
