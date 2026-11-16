<!-- labels: rodada-1,dupla-02,funcionalidade -->
# [F02] Exibir contador de publicações

**Rodada 1** · **Dupla 02** · **Tempo estimado:** 3 min · **Branch:** `feature/02-contador-publicacoes`

Integrante A é o autor (código e PR); Integrante B é revisor de **outra dupla**.

## Descrição

Mostrar, no card "Publicações", a quantidade de publicações carregadas.

## Objetivo técnico

Mesma técnica da F01, aplicada a outra coleção.

## Objetivo pedagógico

Perceber que tarefas parecidas em regiões vizinhas do mesmo arquivo não geram conflito quando cada uma edita só o seu trecho.

## Arquivos que devem ser alterados

- `js/components.js`

Qualquer outro arquivo reprova a verificação de escopo do PR.

## Contrato

```text
renderPostCount(posts, el = document.getElementById("count-posts"))
```

## Critérios de aceitação

- [ ] Com o mock, o card exibe `30`.
- [ ] Com lista vazia, exibe `0`.
- [ ] O teste `F02` passa sem estar "skipped".
- [ ] Somente `js/components.js` foi alterado.

## Exemplo de comportamento esperado

Abrir a página → o card "Publicações" mostra 30.

## Como validar

`npm test` (teste F02).

```bash
npm run validate
```

## Dependências

Nenhuma.

## Possíveis conflitos

Nenhum, desde que você edite apenas a região `[F02]`.

## Orientação

Procure a região `[F02]` em cada arquivo (entre `[F02]` e `[/F02]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F02` em `js/components.js`.

Veja como o contrato da F01 foi escrito no mesmo arquivo.

## Fluxo obrigatório

- [ ] `git switch develop && git pull origin develop`
- [ ] `git switch -c feature/02-contador-publicacoes`
- [ ] Implementar, remover o marcador `NOT_IMPLEMENTED:F02` e rodar `npm run validate`
- [ ] Commit com mensagem `feat(F02): ...` e `git push -u origin feature/02-contador-publicacoes`
- [ ] Abrir PR para **develop** com título `[F02] Exibir contador de publicações` e `Closes #<número desta Issue>` no corpo
- [ ] Solicitar revisão de alguém de **outra dupla** (revisão cruzada)
- [ ] Pipeline verde + aprovação → merge → `git switch develop && git pull`
