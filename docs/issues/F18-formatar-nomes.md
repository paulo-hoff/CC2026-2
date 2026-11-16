<!-- labels: rodada-2,dupla-08,funcionalidade -->
# [F18] Formatar nomes dos usuários

**Rodada 2** · **Dupla 08** · **Tempo estimado:** 8 min · **Branch:** `feature/18-formatar-nomes`

Integrante B é o autor (código e PR); Integrante A é revisor de **outra dupla**.

## Descrição

Padronizar o nome exibido: remover Mr./Mrs./Ms./Dr., colapsar espaços e capitalizar cada palavra.

## Objetivo técnico

Expressões regulares simples, `split/map/join` e manipulação de strings.

## Objetivo pedagógico

Escrever primeiro os exemplos (casos de teste) e depois a regra.

## Arquivos que devem ser alterados

- `js/formatters.js`

Qualquer outro arquivo reprova a verificação de escopo do PR.

## Contrato

```text
formatUserName(name) → string
```

## Critérios de aceitação

- [ ] `Mrs. Dennis Schulist` → `Dennis Schulist`.
- [ ] `  dr.   ana   MARIA  silva ` → `Ana Maria Silva`.
- [ ] `LEANNE graham` → `Leanne Graham`.
- [ ] `Nicholas Runolfsdottir V` permanece igual.
- [ ] Texto vazio → vazio.
- [ ] O teste `F18` passa sem estar "skipped".

## Exemplo de comportamento esperado

Na lista, "Mrs. Dennis Schulist" aparece como "Dennis Schulist".

## Como validar

`npm test` (teste F18).

```bash
npm run validate
```

## Dependências

Nenhuma. A lista de usuários já chama esta função.

## Possíveis conflitos

Nenhum.

## Orientação

Procure a região `[F18]` em cada arquivo (entre `[F18]` e `[/F18]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F18` em `js/formatters.js`.

`/^(mr|mrs|ms|dr)\.?\s+/i` reconhece o tratamento no início do texto.

## Fluxo obrigatório

- [ ] `git switch develop && git pull origin develop`
- [ ] `git switch -c feature/18-formatar-nomes`
- [ ] Implementar, remover o marcador `NOT_IMPLEMENTED:F18` e rodar `npm run validate`
- [ ] Commit com mensagem `feat(F18): ...` e `git push -u origin feature/18-formatar-nomes`
- [ ] Abrir PR para **develop** com título `[F18] Formatar nomes dos usuários` e `Closes #<número desta Issue>` no corpo
- [ ] Solicitar revisão de alguém de **outra dupla** (revisão cruzada)
- [ ] Pipeline verde + aprovação → merge → `git switch develop && git pull`
