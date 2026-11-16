<!-- labels: rodada-3,dupla-10,funcionalidade -->
# [F30] Adicionar indicador de dados locais ou remotos

**Rodada 3** · **Dupla 10** · **Tempo estimado:** 6 min · **Branch:** `feature/30-indicador-origem`

Co-autoria (programação em par): A e B fazem commits na branch (A abre o PR); B revisa o PR de **outra dupla**.

## Descrição

Indicar no rodapé se os dados exibidos são locais (mock.json) ou remotos (API).

## Objetivo técnico

Mapeamento de valores em texto, `dataset` para marcar o estado no DOM.

## Objetivo pedagógico

Tornar visível uma decisão invisível do sistema (de onde vêm os dados).

## Arquivos que devem ser alterados

- `js/components.js`

Qualquer outro arquivo reprova a verificação de escopo do PR.

## Contrato

```text
describeSource(source) → string  ·  renderSourceIndicator(source, el = document.getElementById("data-source"))
```

## Critérios de aceitação

- [ ] `local` → `Dados locais (mock.json)`; `remote` → `Dados remotos (API)`; outro valor → `Origem desconhecida`.
- [ ] `renderSourceIndicator` escreve o texto em `el` e grava `el.dataset.source`.
- [ ] O teste `F30` passa sem estar "skipped".

## Exemplo de comportamento esperado

Sem internet: rodapé mostra "Dados locais (mock.json)".

## Como validar

`npm test` (teste F30).

```bash
npm run validate
```

## Dependências

Para ver "remoto" na tela, depende de F11–F13 e F20. O teste é independente.

## Possíveis conflitos

Nenhum (região própria em `components.js`).

## Orientação

Procure a região `[F30]` em cada arquivo (entre `[F30]` e `[/F30]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F30` em `js/components.js`.

O estado do app já guarda `source` com `local` ou `remote`.

## Fluxo obrigatório

- [ ] `git switch develop && git pull origin develop`
- [ ] `git switch -c feature/30-indicador-origem`
- [ ] Implementar, remover o marcador `NOT_IMPLEMENTED:F30` e rodar `npm run validate`
- [ ] Commit com mensagem `feat(F30): ...` e `git push -u origin feature/30-indicador-origem`
- [ ] Abrir PR para **develop** com título `[F30] Adicionar indicador de dados locais ou remotos` e `Closes #<número desta Issue>` no corpo
- [ ] Solicitar revisão de alguém de **outra dupla** (revisão cruzada)
- [ ] Pipeline verde + aprovação → merge → `git switch develop && git pull`
