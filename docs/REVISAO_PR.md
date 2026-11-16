# Revisão de Pull Requests (code review)

A revisão é **obrigatória**: nenhum PR entra na `develop` sem a aprovação de pelo menos uma pessoa, de outra dupla. O objetivo é melhorar o código e aprender com o código dos colegas, não "dar nota".

## Terminologia: PR e MR

No **GitHub** chama-se **Pull Request (PR)**. No **GitLab** o mesmo conceito chama-se **Merge Request (MR)**. Em ambos, alguém propõe integrar uma branch em outra, a equipe discute, revisa e uma pipeline valida. A equivalência é conceitual: no GitHub **não existe** um recurso nativo chamado "Merge Request"; use sempre PR.

## O que cada PR precisa ter

- Título `[Fxx] descrição` (a CI verifica).
- Referência à Issue (`Closes #N`).
- Descrição da alteração e lista de arquivos modificados.
- **Como testar** e **evidência do teste** (saída do `npm run validate` ou print).
- Checklist do autor preenchido.

Tudo isso vem no modelo que o GitHub carrega ao abrir o PR.

## Roteiro de revisão (7 perguntas)

1. **O código atende à funcionalidade?** Leia a Issue e os critérios de aceitação. Marque cada um.
2. **Houve alteração indevida em outros arquivos?** Aba *Files changed*: só os arquivos da Issue devem aparecer.
3. **O código está legível?** Nomes claros, funções curtas, sem trechos comentados ou `console.log` esquecidos.
4. **Existe duplicação desnecessária?** Há algo que já existe pronto no projeto (`normalizeText`, `escapeHtml`, `DEFAULT_CRITERIA`)?
5. **Há risco de quebrar outra funcionalidade?** A assinatura do contrato mudou? Dados recebidos são alterados (mutação)? Texto de dados vai para `innerHTML` sem `escapeHtml`?
6. **Os testes passaram?** Pipeline verde e `NOT_IMPLEMENTED:Fxx` removido. Rode a branch localmente (`GUIA_GIT.md`, item 12) e teste na tela.
7. **Pode aprovar ou precisa de ajustes?** Registre a decisão.

## Três jeitos de comentar

| Tipo | Onde | Quando usar |
|---|---|---|
| **Comentário geral** | Aba *Conversation* do PR | Observações sobre o PR inteiro: escopo, descrição, evidência, dúvida de direção |
| **Comentário em linha de código** | Aba *Files changed* → botão **+** ao lado da linha | Ponto específico: bug, nome confuso, sugestão. Use **Add a suggestion** para propor a troca exata |
| **Revisão formal** | *Files changed* → **Review changes** | Fecha a sua análise com uma **decisão**: *Comment*, *Approve* ou *Request changes*. É o que libera (ou bloqueia) o merge |

Dica: use **Start a review** nos comentários em linha para enviá-los todos juntos na revisão formal.

## Decidindo

- **Approve**: critérios atendidos, escopo correto e pipeline verde. Podem sobrar sugestões menores.
- **Request changes**: algum critério não foi atendido, há risco real de quebrar algo ou o escopo está errado. Diga **o quê** e **por quê**.
- **Comment** não libera nem bloqueia: serve para dúvidas.

Exija **pelo menos um comentário técnico relevante**, mesmo ao aprovar (um risco, uma melhoria, ou a confirmação concreta do que você testou).

## Como escrever bons comentários

| Em vez de… | Prefira… |
|---|---|
| "Está errado." | "Com `limit = -3` a função devolve lista vazia; o critério pede a lista inteira. Que tal validar `max <= 0`?" |
| "Muda isso." | "Sugestão: reutilizar `normalizeText` em vez de `toLowerCase()`, assim `José` também é encontrado com `jose`." |
| "Ok." | "Rodei a branch: com `cle` aparecem as duas Clementines e `zzz` mostra a mensagem. Aprovado." |

Seja específico, respeitoso e foque no código, não na pessoa. Se o autor responder, resolva a conversa (**Resolve conversation**) quando a questão estiver tratada.

## Depois da aprovação

O autor (ou você, se combinarem) clica em **Merge pull request**. O botão só fica ativo com: pelo menos 1 aprovação, conversas resolvidas e `ci-resultado` verde. Em seguida, todos atualizam a `develop` local.
