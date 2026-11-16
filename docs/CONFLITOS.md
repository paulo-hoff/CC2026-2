# Branches desatualizadas, conflitos e integração

## 1. Por que isso acontece

Enquanto você trabalha na sua `feature/*`, outras duplas integram PRs na `develop`. Sua branch continua baseada na `develop` **de quando você a criou**. Duas situações aparecem:

| Situação | O que o GitHub mostra | Gravidade |
|---|---|---|
| **Branch desatualizada** | "This branch is out-of-date with the base branch" | Baixa: o Git consegue juntar sozinho; basta atualizar |
| **Conflito de merge** | "This branch has conflicts that must be resolved" | Média: duas pessoas alteraram **a mesma linha** e o Git não sabe qual vale |

Uma branch desatualizada pode ainda quebrar a aplicação de forma silenciosa: seu código passa nos testes sozinho, mas falha ao se juntar ao código novo da `develop`. Por isso a CI roda sobre o resultado da junção (PR + `develop`).

> Quando há conflito, o GitHub **não executa a CI** do PR até o conflito ser resolvido. Se a pipeline não aparece, verifique se não há conflito.

## 2. Merge × rebase

| | **Merge** (`git merge origin/develop`) | **Rebase** (`git rebase origin/develop`) |
|---|---|---|
| O que faz | Traz a `develop` para dentro da sua branch com um **commit de junção** | **Reaplica** seus commits, um a um, por cima da `develop` |
| Histórico | Preserva exatamente o que aconteceu | Fica linear, "como se você tivesse começado agora" |
| Reescreve commits? | **Não** | **Sim** (cria commits novos com outros códigos) |
| Depois de enviar a branch | Basta `git push` | Exige `git push --force-with-lease` (reescreve histórico remoto) |
| Conflitos | Resolve-se **uma vez** | Pode ter que resolver **commit a commit** |
| Risco para iniciantes | Baixo | Alto em branches compartilhadas, como a da sua dupla |

**Estratégia principal neste laboratório: merge.** É reversível (`git merge --abort`), não exige reescrever histórico, não pede `--force` e funciona bem com o PR já aberto e com os dois integrantes da dupla trabalhando na mesma branch. O rebase é uma técnica útil, mas fica para quem já domina Git e trabalha **sozinho em uma branch local que ainda não foi enviada**.

## 3. Atualizando a branch (sem conflito)

```bash
git switch feature/NN-nome
git fetch origin
git merge origin/develop
npm run validate
git push
```

Resultado: `Merge made by the 'ort' strategy` e a lista dos arquivos trazidos. O aviso de desatualizada desaparece do PR.

## 4. Resolvendo um conflito

Exemplo real deste laboratório: **F22** (tema) e **F29** (voltar ao início) substituem a mesma linha de comentário em `index.html`. A F22 foi integrada primeiro e a dupla da F29 atualiza sua branch:

```bash
git switch feature/29-voltar-ao-inicio
git fetch origin
git merge origin/develop
```

```text
Auto-merging index.html
CONFLICT (content): Merge conflict in index.html
Automatic merge failed; fix conflicts and then commit the result.
```

`git status` mostra `UU index.html` (*both modified*). Dentro do arquivo:

```html
<div class="header-actions" id="header-actions">
<<<<<<< HEAD
      <button id="btn-top" type="button" class="btn" hidden>↑ Início</button>
=======
      <button id="btn-theme" type="button" class="btn">Alternar tema</button>
>>>>>>> origin/develop
</div>
```

- Entre `<<<<<<< HEAD` e `=======` está **a sua versão**.
- Entre `=======` e `>>>>>>> origin/develop` está **a que veio da `develop`**.

As duas alterações são legítimas e independentes, então o resultado correto é **manter as duas** e apagar as três linhas de marcação:

```html
<div class="header-actions" id="header-actions">
      <button id="btn-top" type="button" class="btn" hidden>↑ Início</button>
      <button id="btn-theme" type="button" class="btn">Alternar tema</button>
</div>
```

Depois:

```bash
npm run validate          # confirma que nada quebrou (e que não sobrou marcação)
git add index.html
git commit                # aceite a mensagem padrão
git push
```

Nem todo conflito se resolve juntando os dois lados. Se as duas versões fazem a **mesma coisa de formas diferentes**, é preciso escolher uma, ou combinar com cuidado. Em caso de dúvida, converse com a outra dupla.

### Se você se perder

```bash
git merge --abort         # volta ao estado anterior ao merge; nada é perdido
```

Depois tente de novo. No VS Code, os botões **Accept Current / Accept Incoming / Accept Both Changes** aparecem sobre cada conflito e fazem a edição por você.

## 5. Checklist de conflito

- [ ] Li os **dois** lados antes de decidir.
- [ ] Removi `<<<<<<<`, `=======` e `>>>>>>>`.
- [ ] Rodei `npm run validate`.
- [ ] Fiz `git add` do arquivo e o commit de junção.
- [ ] Dei `git push` e confirmei que o PR voltou a ficar "mergeable" e a CI rodou.

## 6. Como evitar conflitos

- Edite **somente** a região da sua funcionalidade e os arquivos da Issue.
- Não reformate o arquivo inteiro nem troque a indentação.
- Atualize a branch (`git merge origin/develop`) antes de abrir o PR e sempre que o GitHub avisar.
- Faça PRs pequenos e integre cedo.
