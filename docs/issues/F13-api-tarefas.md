<!-- labels: rodada-2,dupla-03,funcionalidade -->
# [F13] Buscar tarefas na API

**Rodada 2** · **Dupla 03** · **Tempo estimado:** 4 min · **Branch:** `feature/13-api-tarefas`

Integrante B é o autor (código e PR); Integrante A é revisor de **outra dupla**.

## Descrição

Buscar a lista de tarefas na API pública JSONPlaceholder.

## Objetivo técnico

Mesma técnica da F11 para `/todos`.

## Objetivo pedagógico

Mesma da F12, com atenção ao campo `completed`.

## Arquivos que devem ser alterados

- `js/api.js`

Qualquer outro arquivo reprova a verificação de escopo do PR.

## Contrato

```text
fetchTodos(fetchFn = globalThis.fetch) → Promise<object[]>   (GET `${API_BASE}/todos`)
```

## Critérios de aceitação

- [ ] Chama exatamente `https://jsonplaceholder.typicode.com/todos`.
- [ ] Retorna a lista recebida.
- [ ] O teste `F13` passa sem estar "skipped".

## Exemplo de comportamento esperado

No console: `await fetchTodos()` devolve 200 tarefas (com internet).

## Como validar

`npm test` (teste F13).

```bash
npm run validate
```

## Dependências

Usa `fetchJSON`. Usada por F20.

## Possíveis conflitos

Regiões vizinhas em `api.js` (F12, F19, F20): edite só a sua.

## Orientação

Procure a região `[F13]` em cada arquivo (entre `[F13]` e `[/F13]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F13` em `js/api.js`.

Igual à F11, mudando o recurso.

## Fluxo obrigatório

- [ ] `git switch develop && git pull origin develop`
- [ ] `git switch -c feature/13-api-tarefas`
- [ ] Implementar, remover o marcador `NOT_IMPLEMENTED:F13` e rodar `npm run validate`
- [ ] Commit com mensagem `feat(F13): ...` e `git push -u origin feature/13-api-tarefas`
- [ ] Abrir PR para **develop** com título `[F13] Buscar tarefas na API` e `Closes #<número desta Issue>` no corpo
- [ ] Solicitar revisão de alguém de **outra dupla** (revisão cruzada)
- [ ] Pipeline verde + aprovação → merge → `git switch develop && git pull`
