<!-- labels: rodada-1,dupla-05,funcionalidade -->
# [F05] Criar filtro por cidade

**Rodada 1** · **Dupla 05** · **Tempo estimado:** 6 min · **Branch:** `feature/05-filtro-cidade`

Integrante A é o autor (código e PR); Integrante B é revisor de **outra dupla**.

## Descrição

Permitir filtrar usuários por cidade e preencher a lista de cidades do seletor.

## Objetivo técnico

Comparação normalizada, remoção de duplicados (`Set`) e ordenação com `localeCompare`.

## Objetivo pedagógico

Entender contrato com duas funções cooperando (filtro + lista de opções).

## Arquivos que devem ser alterados

- `js/filters.js`

Qualquer outro arquivo reprova a verificação de escopo do PR.

## Contrato

```text
filterByCity(users, city) → object[]  ·  getUniqueCities(users) → string[]
```

## Critérios de aceitação

- [ ] `filterByCity(users, "RIO DE JANEIRO")` ignora caixa e acentos.
- [ ] Cidade vazia retorna todos.
- [ ] `getUniqueCities` não repete cidades e as devolve em ordem alfabética (pt-BR).
- [ ] O seletor "Cidade" da tela passa a listar as cidades dos usuários.
- [ ] O teste `F05` passa sem estar "skipped".

## Exemplo de comportamento esperado

Escolher "Gwenborough" → aparece só "Leanne Graham".

## Como validar

`npm test` (teste F05) e conferir o seletor no navegador.

```bash
npm run validate
```

## Dependências

Nenhuma. É usada por F25.

## Possíveis conflitos

F25 chama `filterByCity`; não altere a assinatura.

## Orientação

Procure a região `[F05]` em cada arquivo (entre `[F05]` e `[/F05]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F05` em `js/filters.js`.

A cidade está em `user.address.city`. Para ordenar textos com acentos use `localeCompare(b, "pt-BR")`.

## Fluxo obrigatório

- [ ] `git switch develop && git pull origin develop`
- [ ] `git switch -c feature/05-filtro-cidade`
- [ ] Implementar, remover o marcador `NOT_IMPLEMENTED:F05` e rodar `npm run validate`
- [ ] Commit com mensagem `feat(F05): ...` e `git push -u origin feature/05-filtro-cidade`
- [ ] Abrir PR para **develop** com título `[F05] Criar filtro por cidade` e `Closes #<número desta Issue>` no corpo
- [ ] Solicitar revisão de alguém de **outra dupla** (revisão cruzada)
- [ ] Pipeline verde + aprovação → merge → `git switch develop && git pull`
