<!-- labels: rodada-2,dupla-09,funcionalidade -->
# [F19] Tratar falhas de requisição HTTP

**Rodada 2** · **Dupla 09** · **Tempo estimado:** 10 min · **Branch:** `feature/19-erros-http`

Integrante B é o autor (código e PR); Integrante A é revisor de **outra dupla**.

## Descrição

Tratar respostas HTTP de erro e mostrar mensagens amigáveis ao usuário.

## Objetivo técnico

Verificar `response.ok`, lançar `HttpError` e mapear erros em mensagens (`instanceof`).

## Objetivo pedagógico

Falhar de forma explícita e comunicar a falha de modo compreensível.

## Arquivos que devem ser alterados

- `js/api.js`

Qualquer outro arquivo reprova a verificação de escopo do PR.

## Contrato

```text
fetchJSON(url, fetchFn) lança HttpError(status) se !ok  ·  describeError(error) → string
```

## Critérios de aceitação

- [ ] Resposta com `ok:false` lança `HttpError` com `status`.
- [ ] 404 → `Recurso não encontrado (404).`
- [ ] 500 ou mais → mensagem que contém o código (ex.: `500`).
- [ ] Outro status → mensagem que contém o código.
- [ ] `TypeError` (sem rede) → mensagem que contém "conexão".
- [ ] Qualquer outro erro → `Erro inesperado ao carregar os dados.`
- [ ] O teste `F19` passa sem estar "skipped".

## Exemplo de comportamento esperado

Em `describeError(new HttpError(404))` → "Recurso não encontrado (404).".

## Como validar

`npm test` (teste F19).

```bash
npm run validate
```

## Dependências

Nenhuma. `fetchJSON` é usada por F11–F13 e pela leitura do mock.

## Possíveis conflitos

Altera `fetchJSON`, usada por F11, F12, F13 e F20: preserve a assinatura.

## Orientação

Procure a região `[F19]` em cada arquivo (entre `[F19]` e `[/F19]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F19` em `js/api.js`.

`HttpError` já existe no arquivo. `error instanceof HttpError` diferencia os tipos.

## Fluxo obrigatório

- [ ] `git switch develop && git pull origin develop`
- [ ] `git switch -c feature/19-erros-http`
- [ ] Implementar, remover o marcador `NOT_IMPLEMENTED:F19` e rodar `npm run validate`
- [ ] Commit com mensagem `feat(F19): ...` e `git push -u origin feature/19-erros-http`
- [ ] Abrir PR para **develop** com título `[F19] Tratar falhas de requisição HTTP` e `Closes #<número desta Issue>` no corpo
- [ ] Solicitar revisão de alguém de **outra dupla** (revisão cruzada)
- [ ] Pipeline verde + aprovação → merge → `git switch develop && git pull`
