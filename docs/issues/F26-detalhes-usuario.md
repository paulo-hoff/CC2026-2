<!-- labels: rodada-3,dupla-06,funcionalidade -->
# [F26] Mostrar detalhes de um usuário

**Rodada 3** · **Dupla 06** · **Tempo estimado:** 10 min · **Branch:** `feature/26-detalhes-usuario`

Co-autoria (programação em par): A e B fazem commits na branch (A abre o PR); B revisa o PR de **outra dupla**.

## Descrição

Mostrar o painel de detalhes do usuário ao clicar em um item da lista.

## Objetivo técnico

Agregação de dados (contagens por `userId`), montagem de HTML com escape.

## Objetivo pedagógico

Separar a regra (dados) da apresentação (HTML) e proteger contra injeção de HTML.

## Arquivos que devem ser alterados

- `js/data.js`
- `js/components.js`

Qualquer outro arquivo reprova a verificação de escopo do PR.

## Contrato

```text
getUserDetails(user, posts, todos) → { id, name, email, phone, website, company, city, postCount, todoCount, completedTodoCount }  ·  renderUserDetails(details, el)
```

## Critérios de aceitação

- [ ] `getUserDetails` devolve exatamente os campos do contrato (empresa = `user.company.name`, cidade = `user.address.city`).
- [ ] Conta publicações e tarefas do usuário (`userId`) e quantas tarefas estão concluídas.
- [ ] `renderUserDetails(null, el)` esconde o painel e limpa o conteúdo.
- [ ] Todo texto dos dados passa por `escapeHtml`.
- [ ] O teste `F26` passa sem estar "skipped".

## Exemplo de comportamento esperado

Clicar em "Leanne Graham" → painel com e-mail, empresa, 3 publicações e "x de 4 concluídas".

## Como validar

`npm test` (teste F26) + clicar na lista.

```bash
npm run validate
```

## Dependências

Nenhuma. O clique já chama as duas funções (`app.js`).

## Possíveis conflitos

Nenhum.

## Orientação

Procure a região `[F26]` em cada arquivo (entre `[F26]` e `[/F26]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F26` em `js/data.js`.

Use `<dl><dt>…</dt><dd>…</dd></dl>`; o CSS do painel já existe.

## Fluxo obrigatório

- [ ] `git switch develop && git pull origin develop`
- [ ] `git switch -c feature/26-detalhes-usuario`
- [ ] Implementar, remover o marcador `NOT_IMPLEMENTED:F26` e rodar `npm run validate`
- [ ] Commit com mensagem `feat(F26): ...` e `git push -u origin feature/26-detalhes-usuario`
- [ ] Abrir PR para **develop** com título `[F26] Mostrar detalhes de um usuário` e `Closes #<número desta Issue>` no corpo
- [ ] Solicitar revisão de alguém de **outra dupla** (revisão cruzada)
- [ ] Pipeline verde + aprovação → merge → `git switch develop && git pull`
