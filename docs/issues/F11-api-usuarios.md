<!-- labels: rodada-2,dupla-01,funcionalidade -->
# [F11] Buscar usuários na API

**Rodada 2** · **Dupla 01** · **Tempo estimado:** 4 min · **Branch:** `feature/11-api-usuarios`

Integrante B é o autor (código e PR); Integrante A é revisor de **outra dupla**.

## Descrição

Buscar a lista de usuários na API pública JSONPlaceholder.

## Objetivo técnico

`fetch`, URLs base e injeção da função de rede (`fetchFn`) para permitir testes sem internet.

## Objetivo pedagógico

Testar código de rede com um "fetch falso".

## Arquivos que devem ser alterados

- `js/api.js`

Qualquer outro arquivo reprova a verificação de escopo do PR.

## Contrato

```text
fetchUsers(fetchFn = globalThis.fetch) → Promise<object[]>   (GET `${API_BASE}/users`)
```

## Critérios de aceitação

- [ ] Chama exatamente `https://jsonplaceholder.typicode.com/users`.
- [ ] Retorna a lista recebida.
- [ ] Usa `fetchJSON` (já existe) para a requisição.
- [ ] O teste `F11` passa sem estar "skipped".

## Exemplo de comportamento esperado

No console: `await fetchUsers()` devolve 10 usuários (com internet).

## Como validar

`npm test` (teste F11 usa fetch falso).

```bash
npm run validate
```

## Dependências

Usa `fetchJSON` (melhorada na F19, mas o contrato já existe). Usada por F20.

## Possíveis conflitos

F12, F13, F19 e F20 editam regiões vizinhas de `api.js`; não altere as delas.

## Orientação

Procure a região `[F11]` em cada arquivo (entre `[F11]` e `[/F11]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F11` em `js/api.js`.

Procure a constante `API_BASE` no topo do arquivo.

## Fluxo obrigatório

- [ ] `git switch develop && git pull origin develop`
- [ ] `git switch -c feature/11-api-usuarios`
- [ ] Implementar, remover o marcador `NOT_IMPLEMENTED:F11` e rodar `npm run validate`
- [ ] Commit com mensagem `feat(F11): ...` e `git push -u origin feature/11-api-usuarios`
- [ ] Abrir PR para **develop** com título `[F11] Buscar usuários na API` e `Closes #<número desta Issue>` no corpo
- [ ] Solicitar revisão de alguém de **outra dupla** (revisão cruzada)
- [ ] Pipeline verde + aprovação → merge → `git switch develop && git pull`
