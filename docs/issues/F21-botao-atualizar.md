<!-- labels: rodada-3,dupla-01,funcionalidade -->
# [F21] Criar botão de atualizar dados

**Rodada 3** · **Dupla 01** · **Tempo estimado:** 9 min · **Branch:** `feature/21-botao-atualizar`

Co-autoria (programação em par): A e B fazem commits na branch (A abre o PR); B revisa o PR de **outra dupla**.

## Descrição

Adicionar o botão "Atualizar dados", que recarrega os dados e indica que está ocupado.

## Objetivo técnico

HTML, evento de clique assíncrono (`async/await`) e atualização do estado visual do botão.

## Objetivo pedagógico

Integrar HTML + JS + função pura em uma pequena funcionalidade completa.

## Arquivos que devem ser alterados

- `js/components.js`
- `js/events.js`
- `index.html`

Qualquer outro arquivo reprova a verificação de escopo do PR.

## Contrato

```text
setButtonBusy(button, busy)  ·  botão `id="btn-refresh"`
```

## Critérios de aceitação

- [ ] `index.html` contém um botão com `id="btn-refresh"` dentro da região `[F21]`.
- [ ] Ocupado: `disabled === true` e texto `Atualizando…`; livre: `disabled === false` e texto `Atualizar dados`.
- [ ] Ao clicar, chama `ctx.refresh()` e restaura o botão ao final.
- [ ] O teste `F21` passa sem estar "skipped".

## Exemplo de comportamento esperado

Clicar no botão → o texto muda para "Atualizando…" e o "Última atualização" muda.

## Como validar

`npm test` (teste F21) + teste manual.

```bash
npm run validate
```

## Dependências

Nenhuma.

## Possíveis conflitos

F07 usa a região vizinha `[F07]` do mesmo bloco de `index.html`.

## Orientação

Procure a região `[F21]` em cada arquivo (entre `[F21]` e `[/F21]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F21` em `js/components.js`.

Dentro de `bindRefreshButton`, use `await` para só restaurar o botão depois do `refresh`.

## Fluxo obrigatório

- [ ] `git switch develop && git pull origin develop`
- [ ] `git switch -c feature/21-botao-atualizar`
- [ ] Implementar, remover o marcador `NOT_IMPLEMENTED:F21` e rodar `npm run validate`
- [ ] Commit com mensagem `feat(F21): ...` e `git push -u origin feature/21-botao-atualizar`
- [ ] Abrir PR para **develop** com título `[F21] Criar botão de atualizar dados` e `Closes #<número desta Issue>` no corpo
- [ ] Solicitar revisão de alguém de **outra dupla** (revisão cruzada)
- [ ] Pipeline verde + aprovação → merge → `git switch develop && git pull`
