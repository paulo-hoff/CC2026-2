<!-- labels: rodada-2,dupla-10,funcionalidade -->
# [F20] Implementar fallback para dados locais

**Rodada 2** · **Dupla 10** · **Tempo estimado:** 10 min · **Branch:** `feature/20-fallback-local`

Integrante B é o autor (código e PR); Integrante A é revisor de **outra dupla**.

## Descrição

Se a API falhar, carregar automaticamente os dados locais de `data/mock.json`.

## Objetivo técnico

`try/catch`, `Promise.all` e validação do formato da resposta.

## Objetivo pedagógico

Resiliência: o sistema continua útil quando uma dependência externa falha.

## Arquivos que devem ser alterados

- `js/api.js`

Qualquer outro arquivo reprova a verificação de escopo do PR.

## Contrato

```text
loadWithFallback(fetchFn) → Promise<{ users, posts, todos, source: "remote" | "local" }>
```

## Critérios de aceitação

- [ ] Se qualquer chamada à API lançar erro ou não devolver lista, retorna os dados locais com `source: "local"`.
- [ ] Se todas as chamadas devolverem listas, retorna `source: "remote"`.
- [ ] Funciona mesmo que F11–F13 ainda devolvam `null` (contrato inicial).
- [ ] O teste `F20` passa sem estar "skipped".

## Exemplo de comportamento esperado

Desligar a internet e recarregar → a página mostra os dados `[local]`.

## Como validar

`npm test` (teste F20 simula falha de rede).

```bash
npm run validate
```

## Dependências

Usa `fetchUsers`, `fetchPosts`, `fetchTodos` (F11–F13) pelo contrato; a versão inicial delas devolve `null`.

## Possíveis conflitos

Regiões vizinhas em `api.js`. A origem é exibida por F30.

## Orientação

Procure a região `[F20]` em cada arquivo (entre `[F20]` e `[/F20]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F20` em `js/api.js`.

`Array.isArray` verifica se o retorno é uma lista. Dentro do `catch`, chame `loadLocalData`.

## Fluxo obrigatório

- [ ] `git switch develop && git pull origin develop`
- [ ] `git switch -c feature/20-fallback-local`
- [ ] Implementar, remover o marcador `NOT_IMPLEMENTED:F20` e rodar `npm run validate`
- [ ] Commit com mensagem `feat(F20): ...` e `git push -u origin feature/20-fallback-local`
- [ ] Abrir PR para **develop** com título `[F20] Implementar fallback para dados locais` e `Closes #<número desta Issue>` no corpo
- [ ] Solicitar revisão de alguém de **outra dupla** (revisão cruzada)
- [ ] Pipeline verde + aprovação → merge → `git switch develop && git pull`
