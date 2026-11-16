<!-- labels: rodada-1,dupla-04,funcionalidade -->
# [F04] Criar pesquisa por nome

**Rodada 1** · **Dupla 04** · **Tempo estimado:** 6 min · **Branch:** `feature/04-busca-nome`

Integrante A é o autor (código e PR); Integrante B é revisor de **outra dupla**.

## Descrição

Fazer o campo "Pesquisar por nome" filtrar os usuários cujo nome contém o texto digitado.

## Objetivo técnico

Filtragem de listas com `filter`, comparação de textos sem diferenciar acentos e maiúsculas (use `normalizeText`, que já existe).

## Objetivo pedagógico

Escrever função pura, sem DOM, e ver o teste automatizado validar o comportamento.

## Arquivos que devem ser alterados

- `js/filters.js`

Qualquer outro arquivo reprova a verificação de escopo do PR.

## Contrato

```text
filterByName(users, query) → object[]
```

## Critérios de aceitação

- [ ] `ana` retorna "Ana Silva" e "Mariana Costa" (conteúdo, não só início).
- [ ] `JOSE` encontra "José Álvares".
- [ ] Consulta vazia ou só com espaços retorna todos os usuários.
- [ ] Consulta sem correspondência retorna lista vazia.
- [ ] O teste `F04` passa sem estar "skipped".

## Exemplo de comportamento esperado

Digitar `cle` na busca → aparecem "Clementine Bauch" e "Clementina DuBuque".

## Como validar

`npm test` (teste F04). No navegador: digitar na busca.

```bash
npm run validate
```

## Dependências

Nenhuma. É usada por F08 (mensagem com o termo) e F25 (filtro combinado).

## Possíveis conflitos

F25 chama esta função; não altere a assinatura. Nenhum conflito de texto.

## Orientação

Procure a região `[F04]` em cada arquivo (entre `[F04]` e `[/F04]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F04` em `js/filters.js`.

Normalize os dois lados antes de comparar. `String.prototype.includes` ajuda.

## Fluxo obrigatório

- [ ] `git switch develop && git pull origin develop`
- [ ] `git switch -c feature/04-busca-nome`
- [ ] Implementar, remover o marcador `NOT_IMPLEMENTED:F04` e rodar `npm run validate`
- [ ] Commit com mensagem `feat(F04): ...` e `git push -u origin feature/04-busca-nome`
- [ ] Abrir PR para **develop** com título `[F04] Criar pesquisa por nome` e `Closes #<número desta Issue>` no corpo
- [ ] Solicitar revisão de alguém de **outra dupla** (revisão cruzada)
- [ ] Pipeline verde + aprovação → merge → `git switch develop && git pull`
