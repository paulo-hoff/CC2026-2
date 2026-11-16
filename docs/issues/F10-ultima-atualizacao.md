<!-- labels: rodada-1,dupla-10,funcionalidade -->
# [F10] Exibir data da última atualização

**Rodada 1** · **Dupla 10** · **Tempo estimado:** 7 min · **Branch:** `feature/10-ultima-atualizacao`

Integrante A é o autor (código e PR); Integrante B é revisor de **outra dupla**.

## Descrição

Exibir, no card "Última atualização", a data e a hora do último carregamento no formato `dd/mm/aaaa HH:MM`.

## Objetivo técnico

Formatação de datas com `Date` e `padStart`, sem bibliotecas.

## Objetivo pedagógico

Separar formatação (função pura) de exibição (função de renderização).

## Arquivos que devem ser alterados

- `js/formatters.js`
- `js/components.js`

Qualquer outro arquivo reprova a verificação de escopo do PR.

## Contrato

```text
formatDateTime(date) → string  ·  renderLastUpdate(date, el = document.getElementById("last-update"))
```

## Critérios de aceitação

- [ ] `new Date(2025, 0, 5, 9, 7)` → `05/01/2025 09:07`.
- [ ] `null` (sem data) → `--`.
- [ ] `renderLastUpdate` escreve o texto formatado em `el`.
- [ ] O teste `F10` passa sem estar "skipped".

## Exemplo de comportamento esperado

Abrir a página → card mostra algo como `16/11/2026 14:32`.

## Como validar

`npm test` (teste F10).

```bash
npm run validate
```

## Dependências

Nenhuma.

## Possíveis conflitos

F30 (origem dos dados) trabalha no rodapé; sem conflito de texto.

## Orientação

Procure a região `[F10]` em cada arquivo (entre `[F10]` e `[/F10]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F10` em `js/formatters.js`.

Meses começam em 0 em `getMonth()`. `String(n).padStart(2, "0")` completa com zero.

## Fluxo obrigatório

- [ ] `git switch develop && git pull origin develop`
- [ ] `git switch -c feature/10-ultima-atualizacao`
- [ ] Implementar, remover o marcador `NOT_IMPLEMENTED:F10` e rodar `npm run validate`
- [ ] Commit com mensagem `feat(F10): ...` e `git push -u origin feature/10-ultima-atualizacao`
- [ ] Abrir PR para **develop** com título `[F10] Exibir data da última atualização` e `Closes #<número desta Issue>` no corpo
- [ ] Solicitar revisão de alguém de **outra dupla** (revisão cruzada)
- [ ] Pipeline verde + aprovação → merge → `git switch develop && git pull`
