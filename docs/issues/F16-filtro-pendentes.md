<!-- labels: rodada-2,dupla-06,funcionalidade -->
# [F16] Filtrar tarefas pendentes

**Rodada 2** · **Dupla 06** · **Tempo estimado:** 4 min · **Branch:** `feature/16-filtro-pendentes`

Integrante B é o autor (código e PR); Integrante A é revisor de **outra dupla**.

## Descrição

Fazer a opção "Pendentes" do seletor de tarefas mostrar somente as tarefas ainda não concluídas.

## Objetivo técnico

`filter` com negação do campo booleano.

## Objetivo pedagógico

Comparar com a F15 e revisar o PR de outra dupla procurando inversões de lógica.

## Arquivos que devem ser alterados

- `js/filters.js`

Qualquer outro arquivo reprova a verificação de escopo do PR.

## Contrato

```text
filterPendingTodos(todos) → object[]   (já ligada ao seletor por `applyTodoFilter`)
```

## Critérios de aceitação

- [ ] Retorna só tarefas com `completed === false`.
- [ ] Mantém a ordem original.
- [ ] `applyTodoFilter(todos, "pending")` passa a funcionar.
- [ ] O teste `F16` passa sem estar "skipped".

## Exemplo de comportamento esperado

Escolher "Pendentes" → nenhuma tarefa aparece riscada.

## Como validar

`npm test` (teste F16).

```bash
npm run validate
```

## Dependências

Nenhuma.

## Possíveis conflitos

F15 edita a região vizinha; não mexa nela.

## Orientação

Procure a região `[F16]` em cada arquivo (entre `[F16]` e `[/F16]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F16` em `js/filters.js`.

É o oposto da F15.

## Fluxo obrigatório

- [ ] `git switch develop && git pull origin develop`
- [ ] `git switch -c feature/16-filtro-pendentes`
- [ ] Implementar, remover o marcador `NOT_IMPLEMENTED:F16` e rodar `npm run validate`
- [ ] Commit com mensagem `feat(F16): ...` e `git push -u origin feature/16-filtro-pendentes`
- [ ] Abrir PR para **develop** com título `[F16] Filtrar tarefas pendentes` e `Closes #<número desta Issue>` no corpo
- [ ] Solicitar revisão de alguém de **outra dupla** (revisão cruzada)
- [ ] Pipeline verde + aprovação → merge → `git switch develop && git pull`
