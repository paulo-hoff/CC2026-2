<!-- labels: rodada-3,dupla-02,funcionalidade -->
# [F22] Implementar alternância entre tema claro e escuro

**Rodada 3** · **Dupla 02** · **Tempo estimado:** 10 min · **Branch:** `feature/22-tema-claro-escuro`

Co-autoria (programação em par): A e B fazem commits na branch (A abre o PR); B revisa o PR de **outra dupla**.

## Descrição

Alternar entre tema claro e escuro por um botão no cabeçalho.

## Objetivo técnico

Atributo `data-theme` no `<html>`, variáveis CSS e funções de alternância.

## Objetivo pedagógico

Colaboração com conflito previsto: a F29 também usa o bloco `header-actions`.

## Arquivos que devem ser alterados

- `js/components.js`
- `js/events.js`
- `index.html`
- `css/base.css`

Qualquer outro arquivo reprova a verificação de escopo do PR.

## Contrato

```text
toggleTheme(current) → "light" | "dark"  ·  applyTheme(theme, root) → tema aplicado  ·  botão `id="btn-theme"`  ·  CSS para o tema escuro em `css/base.css`
```

## Critérios de aceitação

- [ ] `toggleTheme("light")` → `dark`; `toggleTheme("dark")` → `light`.
- [ ] `applyTheme("dark", root)` define `root.dataset.theme = "dark"`; tema inválido vira `light`.
- [ ] `index.html` contém `id="btn-theme"` no bloco `header-actions`.
- [ ] `css/base.css` redefine as variáveis para o tema escuro.
- [ ] O teste `F22` passa sem estar "skipped".

## Exemplo de comportamento esperado

Clicar em "Alternar tema" → fundo escuro com texto claro.

## Como validar

`npm test` (teste F22) + teste manual.

```bash
npm run validate
```

## Dependências

Nenhuma. F23 guarda a escolha (usa `ctx.onThemeChange`, já pronto).

## Possíveis conflitos

**Conflito previsto com F29**: ambas substituem a mesma linha de comentário em `index.html` (`header-actions`).

## Orientação

Procure a região `[F22]` em cada arquivo (entre `[F22]` e `[/F22]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F22` em `js/components.js`.

Use `ctx.onThemeChange(...)` no clique: ele atualiza o estado e chama a gravação da F23.

## Fluxo obrigatório

- [ ] `git switch develop && git pull origin develop`
- [ ] `git switch -c feature/22-tema-claro-escuro`
- [ ] Implementar, remover o marcador `NOT_IMPLEMENTED:F22` e rodar `npm run validate`
- [ ] Commit com mensagem `feat(F22): ...` e `git push -u origin feature/22-tema-claro-escuro`
- [ ] Abrir PR para **develop** com título `[F22] Implementar alternância entre tema claro e escuro` e `Closes #<número desta Issue>` no corpo
- [ ] Solicitar revisão de alguém de **outra dupla** (revisão cruzada)
- [ ] Pipeline verde + aprovação → merge → `git switch develop && git pull`
