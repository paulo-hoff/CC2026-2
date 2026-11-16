<!-- labels: rodada-3,dupla-04,funcionalidade -->
# [F24] Criar validação de campo de busca

**Rodada 3** · **Dupla 04** · **Tempo estimado:** 8 min · **Branch:** `feature/24-validar-busca`

Co-autoria (programação em par): A e B fazem commits na branch (A abre o PR); B revisa o PR de **outra dupla**.

## Descrição

Validar o texto da busca e mostrar uma mensagem de erro abaixo do campo quando for inválido.

## Objetivo técnico

Expressões regulares com Unicode (`\p{L}`), retorno estruturado `{ valid, message, value }`.

## Objetivo pedagógico

Validar entrada do usuário antes de usá-la.

## Arquivos que devem ser alterados

- `js/validators.js`

Qualquer outro arquivo reprova a verificação de escopo do PR.

## Contrato

```text
validateSearch(query) → { valid: boolean, message: string, value: string }
```

## Critérios de aceitação

- [ ] Após `trim`, mais de 40 caracteres → inválido, mensagem contendo `40`.
- [ ] Aceita letras com acento, espaço, apóstrofo, ponto e hífen (`O'Neil`, `Maria-José`).
- [ ] Dígitos e símbolos (`ana123`, `<b>`) → inválido, mensagem contendo `letras`.
- [ ] Texto vazio é válido. `value` volta sem espaços nas pontas.
- [ ] O teste `F24` passa sem estar "skipped".

## Exemplo de comportamento esperado

Digitar `ana123` → aparece "Use apenas letras…" abaixo do campo e a lista não muda.

## Como validar

`npm test` (teste F24) + digitar no campo.

```bash
npm run validate
```

## Dependências

Nenhuma. O campo já chama `validateSearch` (`events.js`).

## Possíveis conflitos

Nenhum.

## Orientação

Procure a região `[F24]` em cada arquivo (entre `[F24]` e `[/F24]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F24` em `js/validators.js`.

`/^[\p{L}\s'.-]*$/u` reconhece letras de qualquer idioma.

## Fluxo obrigatório

- [ ] `git switch develop && git pull origin develop`
- [ ] `git switch -c feature/24-validar-busca`
- [ ] Implementar, remover o marcador `NOT_IMPLEMENTED:F24` e rodar `npm run validate`
- [ ] Commit com mensagem `feat(F24): ...` e `git push -u origin feature/24-validar-busca`
- [ ] Abrir PR para **develop** com título `[F24] Criar validação de campo de busca` e `Closes #<número desta Issue>` no corpo
- [ ] Solicitar revisão de alguém de **outra dupla** (revisão cruzada)
- [ ] Pipeline verde + aprovação → merge → `git switch develop && git pull`
