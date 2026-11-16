# Guia de comandos Git

Para cada operação: **comando exato**, **resultado esperado** e **cuidados**. Substitua `NN-nome` pelo nome da sua branch (ex.: `04-busca-nome`).

> **Nunca use `git push --force` em branches compartilhadas ou protegidas.** Se o Git pedir isso, pare e chame o professor. Em todos os casos deste guia existe uma alternativa segura.

## 1. Clonar o projeto

```bash
git clone <URL-do-repositório>
cd collaborative-dashboard
```

- **Esperado:** pasta `collaborative-dashboard/` criada, já na branch `develop` (branch padrão).
- **Cuidado:** clone uma única vez. Em caso de dúvida sobre a branch, `git branch --show-current`.

## 2. Criar uma branch de funcionalidade

```bash
git switch develop
git pull origin develop
git switch -c feature/NN-nome
```

- **Esperado:** `Switched to a new branch 'feature/NN-nome'`.
- **Cuidado:** sempre parta da `develop` **atualizada** (o `pull` do meio). Branch criada a partir de `main` ou de outra feature gera conflitos e arquivos fora do escopo.

## 3. Verificar o estado local

```bash
git status
git diff            # alterações ainda não adicionadas
git diff --staged   # alterações já adicionadas
git log --oneline -5
```

- **Esperado:** `status` lista os arquivos alterados. Só devem aparecer os arquivos da sua Issue.
- **Cuidado:** arquivo inesperado na lista? Desfaça com `git restore <arquivo>` (descarta as alterações dele).

## 4. Adicionar alterações

```bash
git add js/filters.js
```

- **Esperado:** `git status` mostra o arquivo em verde ("Changes to be committed").
- **Cuidado:** prefira nomear os arquivos. Evite `git add .` para não levar arquivo indesejado. Para tirar algo da área de preparo: `git restore --staged <arquivo>`.

## 5. Criar commits

```bash
git commit -m "feat(F04): implementa pesquisa por nome sem diferenciar acentos"
```

- **Esperado:** `1 file changed, ...`.
- **Cuidado:** mensagem no formato `tipo(Fxx): o que mudou`, no presente, curta. Commits pequenos e frequentes facilitam a revisão. Errou a mensagem **antes de enviar**? `git commit --amend -m "nova mensagem"`. **Depois de enviar**, não use `--amend`: faça outro commit.

## 6. Enviar a branch ao GitHub

```bash
git push -u origin feature/NN-nome     # primeira vez
git push                                # próximas vezes
```

- **Esperado:** o Git imprime o link para abrir o PR.
- **Cuidado:** se for rejeitado (`rejected ... non-fast-forward`), alguém (ou você, em outro lugar) enviou commits para a mesma branch. Rode `git pull origin feature/NN-nome` e envie de novo. **Não force.**

## 7. Atualizar a branch local `develop`

```bash
git switch develop
git pull origin develop
```

- **Esperado:** `Already up to date.` ou a lista de arquivos trazidos.
- **Cuidado:** não trabalhe na `develop`; ela só recebe atualizações. Se o Git disser que há alterações locais impedindo o `switch`, faça commit ou `git stash` antes.

## 8. Sincronizar a feature com `develop`

Estratégia principal para iniciantes: **merge** da `develop` na sua branch (veja `CONFLITOS.md`).

```bash
git switch feature/NN-nome
git fetch origin
git merge origin/develop
```

- **Esperado (sem conflito):** `Merge made by the 'ort' strategy.` ou `Already up to date.` Rode `npm run validate` e `git push`.
- **Esperado (com conflito):** `CONFLICT (content): Merge conflict in <arquivo>` → vá para o item 9.
- **Cuidado:** faça isso sempre que a `develop` tiver recebido outros PRs enquanto você trabalhava, ou quando o GitHub avisar "This branch is out-of-date".

## 9. Resolver conflitos

```bash
git status                  # arquivos "both modified" (UU) estão em conflito
```

Abra o arquivo: o Git marcou os dois lados.

```text
<<<<<<< HEAD
   (sua versão)
=======
   (versão que veio da develop)
>>>>>>> origin/develop
```

1. Decida o resultado final (muitas vezes é **manter os dois**) e **apague as três linhas de marcação** (`<<<<<<<`, `=======`, `>>>>>>>`).
2. Teste: `npm run validate`.
3. Registre a resolução:

   ```bash
   git add <arquivo-resolvido>
   git commit            # aceite a mensagem padrão do merge
   git push
   ```

- **Esperado:** o PR deixa de mostrar conflito e a CI roda de novo.
- **Cuidado:** não escolha um lado "no escuro": converse com a outra dupla se não entender a alteração dela. Nunca deixe marcações `<<<<<<<` no código (a CI reprova).

## 10. Continuar ou abortar um merge

```bash
git merge --continue    # depois de resolver tudo e dar git add (equivale ao commit)
git merge --abort       # desiste e volta ao estado de antes do merge
```

- **Esperado do `--abort`:** sua branch volta exatamente como estava antes do `git merge`.
- **Cuidado:** `--abort` descarta a resolução parcial. Use quando se perder; depois tente de novo com calma.

## 11. Abrir um Pull Request pelo GitHub (navegador)

1. Depois do `push`, abra o repositório: aparece a faixa **Compare & pull request**. Ou use **Pull requests → New pull request**.
2. Confira **base: `develop`** ← **compare: `feature/NN-nome`**.
3. Título `[Fxx] Título da funcionalidade`. Preencha o modelo: Issue (`Closes #N`), descrição, arquivos, como testar e evidência (cole o resumo do `npm run validate`).
4. Em **Reviewers**, escolha o revisor de outra dupla. Clique **Create pull request**.

- **Esperado:** a pipeline inicia em segundos.
- **Cuidado:** base errada (`main`) é a causa mais comum de erro: o PR será reprovado por `ci-politica-branches`. Use **Edit** ao lado do título para trocar a base.

## 12. Revisar alterações de outro desenvolvedor

No navegador: abra o PR → aba **Files changed**. Para rodar o código dele:

```bash
git fetch origin
git switch --detach origin/feature/NN-nome-do-colega
npm run validate
npm start
```

- **Esperado:** você está num estado "detached HEAD" (olhando o código dele sem criar branch).
- **Cuidado:** não faça commits ali. Ao terminar, volte com `git switch develop`. Detalhes de como comentar e decidir: [`REVISAO_PR.md`](REVISAO_PR.md).

## 13. Corrigir um PR reprovado

```bash
git switch feature/NN-nome
# ... corrija o código conforme os comentários / a pipeline ...
npm run validate
git add <arquivos>
git commit -m "fix(Fxx): ajusta conforme revisão"
git push
```

- **Esperado:** o novo commit aparece no mesmo PR e a pipeline roda de novo.
- **Cuidado:** não feche o PR nem abra outro. Responda cada comentário e use **Resolve conversation** quando tratar o ponto. A aprovação anterior é descartada quando há novos commits: peça nova revisão.

## 14. Atualizar o PR com novos commits

É o mesmo fluxo do item 13: todo `git push` na branch atualiza o PR automaticamente.

- **Cuidado:** se `develop` avançou, faça antes o item 8 (merge da `develop` na sua branch).

## 15. Excluir uma branch após o merge

```bash
git switch develop
git pull origin develop
git branch -d feature/NN-nome              # apaga a branch local
git push origin --delete feature/NN-nome   # apaga no GitHub (se ainda existir)
```

- **Esperado:** `Deleted branch feature/NN-nome`.
- **Cuidado:** `-d` (minúsculo) só apaga se a branch já foi integrada; é a versão segura. O GitHub pode apagar a branch remota sozinho após o merge (botão **Delete branch** ou configuração automática).

## Resumo: ciclo completo de uma funcionalidade

```bash
git switch develop && git pull origin develop
git switch -c feature/NN-nome
# implementar + remover NOT_IMPLEMENTED:Fxx
npm run validate
git add <arquivos> && git commit -m "feat(Fxx): ..."
git push -u origin feature/NN-nome
# navegador: abrir PR para develop → revisão → merge
git switch develop && git pull origin develop
```
