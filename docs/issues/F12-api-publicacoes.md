<!-- labels: rodada-2,dupla-02,funcionalidade -->
# [F12] Buscar publicações na API

**Rodada 2** · **Dupla 02** · **Tempo estimado:** 4 min · **Branch:** `feature/12-api-publicacoes`

Integrante B é o autor (código e PR); Integrante A é revisor de **outra dupla**.

## Descrição

Buscar a lista de publicações na API pública JSONPlaceholder.

## Objetivo técnico

Mesma técnica da F11 para outro recurso (`/posts`).

## Objetivo pedagógico

Reconhecer padrão repetido e preservar o contrato entre funções irmãs.

## Arquivos que devem ser alterados

- `js/api.js`

Qualquer outro arquivo reprova a verificação de escopo do PR.

## Contrato

```text
fetchPosts(fetchFn = globalThis.fetch) → Promise<object[]>   (GET `${API_BASE}/posts`)
```

## Critérios de aceitação

- [ ] Chama exatamente `https://jsonplaceholder.typicode.com/posts`.
- [ ] Retorna a lista recebida.
- [ ] O teste `F12` passa sem estar "skipped".

## Exemplo de comportamento esperado

No console: `await fetchPosts()` devolve 100 publicações (com internet).

## Como validar

`npm test` (teste F12).

```bash
npm run validate
```

## Dependências

Usa `fetchJSON`. Usada por F20.

## Possíveis conflitos

Regiões vizinhas em `api.js` (F11, F13): edite só a sua.

## Orientação

Procure a região `[F12]` em cada arquivo (entre `[F12]` e `[/F12]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F12` em `js/api.js`.

Veja a Issue da F11 para o formato esperado.

## Fluxo obrigatório

- [ ] `git switch develop && git pull origin develop`
- [ ] `git switch -c feature/12-api-publicacoes`
- [ ] Implementar, remover o marcador `NOT_IMPLEMENTED:F12` e rodar `npm run validate`
- [ ] Commit com mensagem `feat(F12): ...` e `git push -u origin feature/12-api-publicacoes`
- [ ] Abrir PR para **develop** com título `[F12] Buscar publicações na API` e `Closes #<número desta Issue>` no corpo
- [ ] Solicitar revisão de alguém de **outra dupla** (revisão cruzada)
- [ ] Pipeline verde + aprovação → merge → `git switch develop && git pull`
