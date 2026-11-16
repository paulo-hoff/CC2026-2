<!-- labels: rodada-3,dupla-03,funcionalidade -->
# [F23] Salvar preferência de tema no localStorage

**Rodada 3** · **Dupla 03** · **Tempo estimado:** 7 min · **Branch:** `feature/23-tema-localstorage`

Co-autoria (programação em par): A e B fazem commits na branch (A abre o PR); B revisa o PR de **outra dupla**.

## Descrição

Salvar a preferência de tema no `localStorage` e restaurá-la ao abrir a página.

## Objetivo técnico

`localStorage` com tratamento de erro (`try/catch`) e validação do valor lido.

## Objetivo pedagógico

Armazenamento do navegador pode falhar (modo privado): o app não pode quebrar.

## Arquivos que devem ser alterados

- `js/data.js`

Qualquer outro arquivo reprova a verificação de escopo do PR.

## Contrato

```text
saveTheme(theme, storage)  ·  loadTheme(storage) → "light" | "dark"   (chave `THEME_KEY`)
```

## Critérios de aceitação

- [ ] `saveTheme("dark", storage)` grava em `THEME_KEY`; valores fora de `THEMES` não são gravados.
- [ ] `loadTheme` devolve o valor salvo se válido; senão `light`.
- [ ] Se `storage` lançar erro, `loadTheme` devolve `light` e `saveTheme` não lança.
- [ ] O teste `F23` passa sem estar "skipped".

## Exemplo de comportamento esperado

Escolher o tema escuro, recarregar a página → continua escuro.

## Como validar

`npm test` (teste F23 usa storage falso).

```bash
npm run validate
```

## Dependências

Para ver na tela, depende da F22. O teste é independente.

## Possíveis conflitos

Nenhum (região própria em `data.js`).

## Orientação

Procure a região `[F23]` em cada arquivo (entre `[F23]` e `[/F23]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F23` em `js/data.js`.

`THEMES` e `THEME_KEY` estão no topo de `data.js`.

## Fluxo obrigatório

- [ ] `git switch develop && git pull origin develop`
- [ ] `git switch -c feature/23-tema-localstorage`
- [ ] Implementar, remover o marcador `NOT_IMPLEMENTED:F23` e rodar `npm run validate`
- [ ] Commit com mensagem `feat(F23): ...` e `git push -u origin feature/23-tema-localstorage`
- [ ] Abrir PR para **develop** com título `[F23] Salvar preferência de tema no localStorage` e `Closes #<número desta Issue>` no corpo
- [ ] Solicitar revisão de alguém de **outra dupla** (revisão cruzada)
- [ ] Pipeline verde + aprovação → merge → `git switch develop && git pull`
