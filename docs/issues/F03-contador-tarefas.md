<!-- labels: rodada-1,dupla-03,funcionalidade -->
# [F03] Exibir contador de tarefas

**Rodada 1** · **Dupla 03** · **Tempo estimado:** 3 min · **Branch:** `feature/03-contador-tarefas`

Integrante A é o autor (código e PR); Integrante B é revisor de **outra dupla**.

## Descrição

Mostrar, no card "Tarefas", a quantidade total de tarefas carregadas.

## Objetivo técnico

Mesma técnica da F01, aplicada a tarefas.

## Objetivo pedagógico

Reforçar o fluxo Git com uma tarefa muito curta e treinar a revisão de um PR pequeno.

## Arquivos que devem ser alterados

- `js/components.js`

Qualquer outro arquivo reprova a verificação de escopo do PR.

## Contrato

```text
renderTodoCount(todos, el = document.getElementById("count-todos"))
```

## Critérios de aceitação

- [ ] Com o mock, o card exibe `40`.
- [ ] Com lista vazia, exibe `0`.
- [ ] O teste `F03` passa sem estar "skipped".
- [ ] Somente `js/components.js` foi alterado.

## Exemplo de comportamento esperado

Abrir a página → o card "Tarefas" mostra 40.

## Como validar

`npm test` (teste F03).

```bash
npm run validate
```

## Dependências

Nenhuma.

## Possíveis conflitos

Nenhum, desde que você edite apenas a região `[F03]`.

## Orientação

Procure a região `[F03]` em cada arquivo (entre `[F03]` e `[/F03]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F03` em `js/components.js`.

O total é de todas as tarefas, independentemente do filtro da tela.

## Fluxo obrigatório

- [ ] `git switch develop && git pull origin develop`
- [ ] `git switch -c feature/03-contador-tarefas`
- [ ] Implementar, remover o marcador `NOT_IMPLEMENTED:F03` e rodar `npm run validate`
- [ ] Commit com mensagem `feat(F03): ...` e `git push -u origin feature/03-contador-tarefas`
- [ ] Abrir PR para **develop** com título `[F03] Exibir contador de tarefas` e `Closes #<número desta Issue>` no corpo
- [ ] Solicitar revisão de alguém de **outra dupla** (revisão cruzada)
- [ ] Pipeline verde + aprovação → merge → `git switch develop && git pull`
