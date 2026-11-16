<!-- labels: rodada-1,dupla-08,funcionalidade -->
# [F08] Exibir mensagem quando a lista estiver vazia

**Rodada 1** · **Dupla 08** · **Tempo estimado:** 5 min · **Branch:** `feature/08-lista-vazia`

Integrante A é o autor (código e PR); Integrante B é revisor de **outra dupla**.

## Descrição

Exibir "Nenhum usuário encontrado" quando a lista filtrada estiver vazia (incluindo o termo pesquisado).

## Objetivo técnico

Renderização condicional e escape de HTML (`escapeHtml`) para evitar injeção de código.

## Objetivo pedagógico

Segurança básica: nunca inserir texto digitado pelo usuário em `innerHTML` sem escapar.

## Arquivos que devem ser alterados

- `js/components.js`

Qualquer outro arquivo reprova a verificação de escopo do PR.

## Contrato

```text
renderEmptyState(el, criteria = {})  — chamada por renderUserList quando não há usuários
```

## Critérios de aceitação

- [ ] Escreve em `el.innerHTML` um `<p class="empty-state">` com "Nenhum usuário encontrado".
- [ ] Se `criteria.query` existir, o termo aparece escapado na mensagem.
- [ ] O teste `F08` passa sem estar "skipped".

## Exemplo de comportamento esperado

Buscar `zzz` → "Nenhum usuário encontrado para "zzz"." (exige F04 integrada para ver na tela).

## Como validar

`npm test` (teste F08).

```bash
npm run validate
```

## Dependências

Para ver na tela, depende de F04 (busca). O teste é independente.

## Possíveis conflitos

Nenhum.

## Orientação

Procure a região `[F08]` em cada arquivo (entre `[F08]` e `[/F08]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F08` em `js/components.js`.

O estilo `.empty-state` já existe no CSS.

## Fluxo obrigatório

- [ ] `git switch develop && git pull origin develop`
- [ ] `git switch -c feature/08-lista-vazia`
- [ ] Implementar, remover o marcador `NOT_IMPLEMENTED:F08` e rodar `npm run validate`
- [ ] Commit com mensagem `feat(F08): ...` e `git push -u origin feature/08-lista-vazia`
- [ ] Abrir PR para **develop** com título `[F08] Exibir mensagem quando a lista estiver vazia` e `Closes #<número desta Issue>` no corpo
- [ ] Solicitar revisão de alguém de **outra dupla** (revisão cruzada)
- [ ] Pipeline verde + aprovação → merge → `git switch develop && git pull`
