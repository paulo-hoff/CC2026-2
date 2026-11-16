<!-- labels: rodada-3,dupla-09,funcionalidade -->
# [F29] Criar botão de voltar ao início

**Rodada 3** · **Dupla 09** · **Tempo estimado:** 8 min · **Branch:** `feature/29-voltar-ao-inicio`

Co-autoria (programação em par): A e B fazem commits na branch (A abre o PR); B revisa o PR de **outra dupla**.

## Descrição

Adicionar um botão "Voltar ao início" no cabeçalho, visível só depois de rolar a página.

## Objetivo técnico

Evento `scroll`, `window.scrollY`, `scrollTo` com rolagem suave.

## Objetivo pedagógico

Conflito previsto com F22: aprender a resolver duas alterações legítimas na mesma linha.

## Arquivos que devem ser alterados

- `js/components.js`
- `js/events.js`
- `index.html`
- `css/components.css`

Qualquer outro arquivo reprova a verificação de escopo do PR.

## Contrato

```text
shouldShowBackToTop(scrollY, threshold = 300) → boolean  ·  scrollToTop(win)  ·  botão `id="btn-top"` (começa com `hidden`)
```

## Critérios de aceitação

- [ ] `shouldShowBackToTop(301)` → `true`; `(300)` e `(0)` → `false`; aceita limite personalizado.
- [ ] `scrollToTop(win)` chama `win.scrollTo({ top: 0, behavior: "smooth" })`.
- [ ] `index.html` contém `id="btn-top"` no bloco `header-actions`.
- [ ] O botão aparece ao rolar e leva ao topo ao clicar.
- [ ] O teste `F29` passa sem estar "skipped".

## Exemplo de comportamento esperado

Rolar 400 px → botão "↑ Início" aparece; clicar → volta ao topo.

## Como validar

`npm test` (teste F29) + teste manual.

```bash
npm run validate
```

## Dependências

Nenhuma.

## Possíveis conflitos

**Conflito previsto com F22**: ambas substituem a mesma linha de comentário em `index.html` (`header-actions`). Se a F22 for integrada primeiro, atualize sua branch e resolva mantendo os dois botões.

## Orientação

Procure a região `[F29]` em cada arquivo (entre `[F29]` e `[/F29]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F29` em `js/components.js`.

No navegador, o evento é `window.addEventListener("scroll", ...)`. Para o conflito, veja `docs/CONFLITOS.md`.

## Fluxo obrigatório

- [ ] `git switch develop && git pull origin develop`
- [ ] `git switch -c feature/29-voltar-ao-inicio`
- [ ] Implementar, remover o marcador `NOT_IMPLEMENTED:F29` e rodar `npm run validate`
- [ ] Commit com mensagem `feat(F29): ...` e `git push -u origin feature/29-voltar-ao-inicio`
- [ ] Abrir PR para **develop** com título `[F29] Criar botão de voltar ao início` e `Closes #<número desta Issue>` no corpo
- [ ] Solicitar revisão de alguém de **outra dupla** (revisão cruzada)
- [ ] Pipeline verde + aprovação → merge → `git switch develop && git pull`
