<!-- labels: rodada-3,dupla-08,funcionalidade -->
# [F28] Exibir aviso de operação bem-sucedida

**Rodada 3** · **Dupla 08** · **Tempo estimado:** 6 min · **Branch:** `feature/28-aviso-sucesso`

Co-autoria (programação em par): A e B fazem commits na branch (A abre o PR); B revisa o PR de **outra dupla**.

## Descrição

Exibir um aviso verde de sucesso na área de mensagens quando os dados forem atualizados.

## Objetivo técnico

Manipulação de classes CSS, reutilização de variáveis de cor existentes.

## Objetivo pedagógico

Comparar com `showError` (já existente) e manter consistência visual.

## Arquivos que devem ser alterados

- `js/components.js`
- `css/components.css`

Qualquer outro arquivo reprova a verificação de escopo do PR.

## Contrato

```text
showSuccess(text, el)  ·  classe CSS `.message-success`
```

## Critérios de aceitação

- [ ] `el.textContent` recebe o texto informado.
- [ ] `el.className` contém `message-success` e `el.hidden === false`.
- [ ] `css/components.css` define `.message-success` usando `--success-bg` e `--success-text`.
- [ ] O teste `F28` passa sem estar "skipped".

## Exemplo de comportamento esperado

Abrir a página → faixa verde "Dados atualizados com sucesso.".

## Como validar

`npm test` (teste F28).

```bash
npm run validate
```

## Dependências

Nenhuma. `app.js` já chama `showSuccess`.

## Possíveis conflitos

F29 edita outra região de `components.css`; sem conflito de texto.

## Orientação

Procure a região `[F28]` em cada arquivo (entre `[F28]` e `[/F28]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F28` em `js/components.js`.

Copie a estrutura de `showError` e troque a classe.

## Fluxo obrigatório

- [ ] `git switch develop && git pull origin develop`
- [ ] `git switch -c feature/28-aviso-sucesso`
- [ ] Implementar, remover o marcador `NOT_IMPLEMENTED:F28` e rodar `npm run validate`
- [ ] Commit com mensagem `feat(F28): ...` e `git push -u origin feature/28-aviso-sucesso`
- [ ] Abrir PR para **develop** com título `[F28] Exibir aviso de operação bem-sucedida` e `Closes #<número desta Issue>` no corpo
- [ ] Solicitar revisão de alguém de **outra dupla** (revisão cruzada)
- [ ] Pipeline verde + aprovação → merge → `git switch develop && git pull`
