<!-- labels: rodada-1,dupla-06,funcionalidade -->
# [F06] Ordenar usuários alfabeticamente

**Rodada 1** · **Dupla 06** · **Tempo estimado:** 5 min · **Branch:** `feature/06-ordenar-usuarios`

Integrante A é o autor (código e PR); Integrante B é revisor de **outra dupla**.

## Descrição

Ordenar a lista de usuários por nome (A–Z ou Z–A) conforme o seletor "Ordem".

## Objetivo técnico

Ordenação sem alterar a lista original (cópia antes de `sort`) e comparação de textos localizada.

## Objetivo pedagógico

Imutabilidade: funções puras não podem modificar os dados recebidos.

## Arquivos que devem ser alterados

- `js/filters.js`

Qualquer outro arquivo reprova a verificação de escopo do PR.

## Contrato

```text
sortUsers(users, order) → object[]   (order: "none" | "asc" | "desc")
```

## Critérios de aceitação

- [ ] `asc` ordena por nome sem diferenciar acentos/caixa ("Álvaro", "ana", "Bruno").
- [ ] `desc` inverte a ordem.
- [ ] `none` mantém a ordem original.
- [ ] A lista recebida não é alterada (o teste usa `Object.freeze`).
- [ ] O teste `F06` passa sem estar "skipped".

## Exemplo de comportamento esperado

Escolher "Nome (Z–A)" → "Nicholas Runolfsdottir V" aparece no topo.

## Como validar

`npm test` (teste F06).

```bash
npm run validate
```

## Dependências

Nenhuma.

## Possíveis conflitos

Nenhum.

## Orientação

Procure a região `[F06]` em cada arquivo (entre `[F06]` e `[/F06]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F06` em `js/filters.js`.

`[...users]` cria uma cópia. `localeCompare` aceita a opção `{ sensitivity: "base" }`.

## Fluxo obrigatório

- [ ] `git switch develop && git pull origin develop`
- [ ] `git switch -c feature/06-ordenar-usuarios`
- [ ] Implementar, remover o marcador `NOT_IMPLEMENTED:F06` e rodar `npm run validate`
- [ ] Commit com mensagem `feat(F06): ...` e `git push -u origin feature/06-ordenar-usuarios`
- [ ] Abrir PR para **develop** com título `[F06] Ordenar usuários alfabeticamente` e `Closes #<número desta Issue>` no corpo
- [ ] Solicitar revisão de alguém de **outra dupla** (revisão cruzada)
- [ ] Pipeline verde + aprovação → merge → `git switch develop && git pull`
