<!-- labels: rodada-2,dupla-05,funcionalidade -->
# [F15] Filtrar tarefas concluídas

**Rodada 2** · **Dupla 05** · **Tempo estimado:** 4 min · **Branch:** `feature/15-filtro-concluidas`

Integrante B é o autor (código e PR); Integrante A é revisor de **outra dupla**.

## Descrição

Fazer a opção "Concluídas" do seletor de tarefas mostrar somente as tarefas concluídas.

## Objetivo técnico

`Array.prototype.filter` com campo booleano.

## Objetivo pedagógico

Funções simples e coesas facilitam revisão rápida.

## Arquivos que devem ser alterados

- `js/filters.js`

Qualquer outro arquivo reprova a verificação de escopo do PR.

## Contrato

```text
filterCompletedTodos(todos) → object[]   (já ligada ao seletor por `applyTodoFilter`)
```

## Critérios de aceitação

- [ ] Retorna só tarefas com `completed === true`.
- [ ] Mantém a ordem original.
- [ ] `applyTodoFilter(todos, "completed")` passa a funcionar.
- [ ] O teste `F15` passa sem estar "skipped".

## Exemplo de comportamento esperado

Escolher "Concluídas" → todas as tarefas listadas aparecem riscadas (✔).

## Como validar

`npm test` (teste F15).

```bash
npm run validate
```

## Dependências

Nenhuma.

## Possíveis conflitos

F16 edita a região vizinha; não mexa nela.

## Orientação

Procure a região `[F15]` em cada arquivo (entre `[F15]` e `[/F15]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F15` em `js/filters.js`.

O seletor `#todo-status` já está ligado: você só implementa a função.

## Fluxo obrigatório

- [ ] `git switch develop && git pull origin develop`
- [ ] `git switch -c feature/15-filtro-concluidas`
- [ ] Implementar, remover o marcador `NOT_IMPLEMENTED:F15` e rodar `npm run validate`
- [ ] Commit com mensagem `feat(F15): ...` e `git push -u origin feature/15-filtro-concluidas`
- [ ] Abrir PR para **develop** com título `[F15] Filtrar tarefas concluídas` e `Closes #<número desta Issue>` no corpo
- [ ] Solicitar revisão de alguém de **outra dupla** (revisão cruzada)
- [ ] Pipeline verde + aprovação → merge → `git switch develop && git pull`
