<!-- labels: rodada-1,dupla-01,funcionalidade -->
# [F01] Exibir contador de usuários

**Rodada 1** · **Dupla 01** · **Tempo estimado:** 3 min · **Branch:** `feature/01-contador-usuarios`

Integrante A é o autor (código e PR); Integrante B é revisor de **outra dupla**.

## Descrição

Mostrar, no card "Usuários", a quantidade de usuários carregados.

## Objetivo técnico

Escrever em um elemento do DOM a partir de dados (textContent) e entender funções de renderização que recebem o elemento como parâmetro.

## Objetivo pedagógico

Primeiro ciclo completo: branch → commit → PR → revisão, com uma mudança mínima.

## Arquivos que devem ser alterados

- `js/components.js`

Qualquer outro arquivo reprova a verificação de escopo do PR.

## Contrato

```text
renderUserCount(users, el = document.getElementById("count-users"))
```

## Critérios de aceitação

- [ ] Com os 10 usuários do mock, o card exibe `10`.
- [ ] Com lista vazia, exibe `0`.
- [ ] O teste `F01` da CI passa sem estar "skipped".
- [ ] Somente `js/components.js` foi alterado.

## Exemplo de comportamento esperado

Abrir a página → o card "Usuários" mostra 10 em vez de `--`.

## Como validar

`npm test` (teste F01). No navegador: conferir o card.

```bash
npm run validate
```

## Dependências

Nenhuma.

## Possíveis conflitos

Nenhum (região própria em `components.js`; F02 e F03 editam regiões vizinhas, não a sua).

## Orientação

Procure a região `[F01]` em cada arquivo (entre `[F01]` e `[/F01]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F01` em `js/components.js`.

O parâmetro `el` já recebe o elemento. Lembre que `textContent` espera texto.

## Fluxo obrigatório

- [ ] `git switch develop && git pull origin develop`
- [ ] `git switch -c feature/01-contador-usuarios`
- [ ] Implementar, remover o marcador `NOT_IMPLEMENTED:F01` e rodar `npm run validate`
- [ ] Commit com mensagem `feat(F01): ...` e `git push -u origin feature/01-contador-usuarios`
- [ ] Abrir PR para **develop** com título `[F01] Exibir contador de usuários` e `Closes #<número desta Issue>` no corpo
- [ ] Solicitar revisão de alguém de **outra dupla** (revisão cruzada)
- [ ] Pipeline verde + aprovação → merge → `git switch develop && git pull`
