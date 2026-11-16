<!-- labels: rodada-2,dupla-04,funcionalidade -->
# [F14] Calcular percentual de tarefas concluídas

**Rodada 2** · **Dupla 04** · **Tempo estimado:** 7 min · **Branch:** `feature/14-percentual-concluidas`

Integrante B é o autor (código e PR); Integrante A é revisor de **outra dupla**.

## Descrição

Calcular o percentual de tarefas concluídas e exibi-lo no card "Tarefas concluídas".

## Objetivo técnico

Contagem com `filter`, divisão, arredondamento (`Math.round`) e tratamento de lista vazia.

## Objetivo pedagógico

Pensar em casos de borda (lista vazia → 0) antes de codificar.

## Arquivos que devem ser alterados

- `js/data.js`
- `js/components.js`

Qualquer outro arquivo reprova a verificação de escopo do PR.

## Contrato

```text
completedPercentage(todos) → inteiro 0–100  ·  renderCompletedPercent(todos, el = document.getElementById("percent-completed"))
```

## Critérios de aceitação

- [ ] Lista vazia → `0`.
- [ ] 1 concluída em 3 → `33`; 3 em 4 → `75`; mock completo → `43`.
- [ ] `renderCompletedPercent` escreve o valor seguido de `%` (ex.: `50%`).
- [ ] O teste `F14` passa sem estar "skipped".

## Exemplo de comportamento esperado

Com o mock, o card mostra `43%`.

## Como validar

`npm test` (teste F14).

```bash
npm run validate
```

## Dependências

Nenhuma (usa o campo `completed` dos dados).

## Possíveis conflitos

Nenhum.

## Orientação

Procure a região `[F14]` em cada arquivo (entre `[F14]` e `[/F14]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F14` em `js/data.js`.

Evite dividir por zero. `Math.round` arredonda ao inteiro mais próximo.

## Fluxo obrigatório

- [ ] `git switch develop && git pull origin develop`
- [ ] `git switch -c feature/14-percentual-concluidas`
- [ ] Implementar, remover o marcador `NOT_IMPLEMENTED:F14` e rodar `npm run validate`
- [ ] Commit com mensagem `feat(F14): ...` e `git push -u origin feature/14-percentual-concluidas`
- [ ] Abrir PR para **develop** com título `[F14] Calcular percentual de tarefas concluídas` e `Closes #<número desta Issue>` no corpo
- [ ] Solicitar revisão de alguém de **outra dupla** (revisão cruzada)
- [ ] Pipeline verde + aprovação → merge → `git switch develop && git pull`
