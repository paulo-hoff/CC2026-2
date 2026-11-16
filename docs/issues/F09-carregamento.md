<!-- labels: rodada-1,dupla-09,funcionalidade -->
# [F09] Criar indicador de carregamento

**Rodada 1** · **Dupla 09** · **Tempo estimado:** 4 min · **Branch:** `feature/09-carregamento`

Integrante A é o autor (código e PR); Integrante B é revisor de **outra dupla**.

## Descrição

Mostrar a mensagem "Carregando dados…" enquanto os dados são buscados e escondê-la ao terminar.

## Objetivo técnico

Propriedade `hidden` e uso de `try/finally` (já presente em `app.js`, que chama `setLoading`).

## Objetivo pedagógico

Entender que o app já tem o "encaixe" pronto e que o aluno só implementa o comportamento.

## Arquivos que devem ser alterados

- `js/components.js`

Qualquer outro arquivo reprova a verificação de escopo do PR.

## Contrato

```text
setLoading(isLoading, el = document.getElementById("loading"))
```

## Critérios de aceitação

- [ ] `setLoading(true, el)` deixa `el.hidden === false`.
- [ ] `setLoading(false, el)` deixa `el.hidden === true`.
- [ ] O teste `F09` passa sem estar "skipped".

## Exemplo de comportamento esperado

Recarregar a página com a rede lenta (DevTools → Network → Slow 3G) → a mensagem aparece e some.

## Como validar

`npm test` (teste F09).

```bash
npm run validate
```

## Dependências

Nenhuma.

## Possíveis conflitos

Nenhum.

## Orientação

Procure a região `[F09]` em cada arquivo (entre `[F09]` e `[/F09]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F09` em `js/components.js`.

O argumento é um booleano: `hidden` é o oposto dele.

## Fluxo obrigatório

- [ ] `git switch develop && git pull origin develop`
- [ ] `git switch -c feature/09-carregamento`
- [ ] Implementar, remover o marcador `NOT_IMPLEMENTED:F09` e rodar `npm run validate`
- [ ] Commit com mensagem `feat(F09): ...` e `git push -u origin feature/09-carregamento`
- [ ] Abrir PR para **develop** com título `[F09] Criar indicador de carregamento` e `Closes #<número desta Issue>` no corpo
- [ ] Solicitar revisão de alguém de **outra dupla** (revisão cruzada)
- [ ] Pipeline verde + aprovação → merge → `git switch develop && git pull`
