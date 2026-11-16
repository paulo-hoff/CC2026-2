<!-- labels: rodada-2,dupla-07,funcionalidade -->
# [F17] Limitar a quantidade de registros exibidos

**Rodada 2** · **Dupla 07** · **Tempo estimado:** 5 min · **Branch:** `feature/17-limitar-registros`

Integrante B é o autor (código e PR); Integrante A é revisor de **outra dupla**.

## Descrição

Limitar a quantidade de usuários exibidos conforme o seletor "Registros exibidos".

## Objetivo técnico

`slice`, conversão de tipos (`Number`) e validação de entradas inválidas.

## Objetivo pedagógico

Tratar entradas inesperadas (negativo, texto) sem quebrar a aplicação.

## Arquivos que devem ser alterados

- `js/filters.js`

Qualquer outro arquivo reprova a verificação de escopo do PR.

## Contrato

```text
limitRecords(list, max) → any[]   (max ≤ 0 ou inválido = sem limite)
```

## Critérios de aceitação

- [ ] `limitRecords([1,2,3,4,5], 2)` → `[1,2]`.
- [ ] `0`, negativos, texto e números maiores que o tamanho devolvem a lista inteira.
- [ ] A lista recebida não é alterada.
- [ ] O teste `F17` passa sem estar "skipped".

## Exemplo de comportamento esperado

Escolher "5" → no máximo 5 usuários na página.

## Como validar

`npm test` (teste F17).

```bash
npm run validate
```

## Dependências

Nenhuma.

## Possíveis conflitos

F27 (paginação) também reduz a quantidade exibida: o limite é aplicado antes da paginação. Não altere `applyFilters`.

## Orientação

Procure a região `[F17]` em cada arquivo (entre `[F17]` e `[/F17]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F17` em `js/filters.js`.

`Number.isInteger` ajuda a validar.

## Fluxo obrigatório

- [ ] `git switch develop && git pull origin develop`
- [ ] `git switch -c feature/17-limitar-registros`
- [ ] Implementar, remover o marcador `NOT_IMPLEMENTED:F17` e rodar `npm run validate`
- [ ] Commit com mensagem `feat(F17): ...` e `git push -u origin feature/17-limitar-registros`
- [ ] Abrir PR para **develop** com título `[F17] Limitar a quantidade de registros exibidos` e `Closes #<número desta Issue>` no corpo
- [ ] Solicitar revisão de alguém de **outra dupla** (revisão cruzada)
- [ ] Pipeline verde + aprovação → merge → `git switch develop && git pull`
