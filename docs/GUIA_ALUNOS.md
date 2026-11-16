# Guia do Aluno

Este guia diz **o que fazer, em qual ordem e onde** (navegador ou terminal). Ele não traz o código das funcionalidades: você vai construí-lo, e os testes dizem se está certo.

## 0. Antes da aula (15 minutos, faça em casa)

1. Tenha uma conta no GitHub e **aceite o convite** para o repositório (chega por e-mail; vale 7 dias).
2. Instale o **Git** (`git --version`) e o **Node.js 20+** (`node -v`).
3. Configure sua identidade no Git (uma vez):

   ```bash
   git config --global user.name "Seu Nome"
   git config --global user.email "o-mesmo-email-da-sua-conta-github@exemplo.com"
   ```

4. Clone e confirme que tudo funciona:

   ```bash
   git clone <URL-do-repositório>
   cd collaborative-dashboard
   npm run validate
   ```

   O resultado esperado é `APROVADO: pode abrir o Pull Request.`

## 1. Regras de ouro

- **Nunca** trabalhe direto em `main` ou `develop`. Todo código entra por Pull Request.
- Uma Issue = uma branch = um PR.
- Edite **somente a região da sua funcionalidade** (entre `// [Fxx]` e `// [/Fxx]`) e os arquivos listados na Issue.
- Ao terminar, **apague a linha `NOT_IMPLEMENTED:Fxx`**. Sem isso, a CI não testa a sua funcionalidade e o PR é reprovado.
- Rode `npm run validate` **antes** de abrir o PR.
- Seu PR é revisado por alguém de **outra dupla**, e você revisa o de outra dupla.
- Nunca use `git push --force`.

## 2. Quem faz o quê

| Rodada | Autor do código | Revisor (de outra dupla) |
|---|---|---|
| 1 | Integrante A | Integrante B |
| 2 | Integrante B | Integrante A |
| 3 | A e B juntos (A abre o PR) | Integrante B |

A tabela com a funcionalidade e o PR que cada dupla revisa está em [`BACKLOG.md`](BACKLOG.md). Sua Issue já vem com o seu nome (*Assignees*), a branch sugerida e os critérios de aceitação.

## 3. Sequência de trabalho (14 passos)

Legenda: 🌐 navegador (GitHub) · ⌨️ terminal · ✏️ editor de código.

| # | Passo | Onde | Como |
|---|---|:---:|---|
| 1 | Acessar o repositório | 🌐 | Abra o link, confirme que aparece o código e que a branch padrão é `develop`. |
| 2 | Identificar sua Issue | 🌐 | Aba **Issues** → filtro `assignee:@me`. Leia descrição, contrato e critérios. Anote o **número** (ex.: `#12`). |
| 3 | Atualizar o repositório local | ⌨️ | `git switch develop` e `git pull origin develop` |
| 4 | Criar a feature branch | ⌨️ | `git switch -c feature/NN-nome` (nome sugerido na Issue) |
| 5 | Implementar | ✏️ | Edite só sua região. Leia o comentário acima da função: ele explica o contrato. |
| 6 | Executar os testes locais | ⌨️ | `npm run validate`. Se algo falhar, leia a mensagem, corrija e rode de novo. |
| 7 | Criar o commit | ⌨️ | `git add <arquivos>` e `git commit -m "feat(Fxx): descrição curta"` |
| 8 | Enviar a branch | ⌨️ | `git push -u origin feature/NN-nome` |
| 9 | Abrir o PR para **develop** | 🌐 | Aba **Pull requests** → **New pull request**. **Base: `develop`** ← compare: sua branch. Título `[Fxx] Título da funcionalidade`. No corpo, mantenha o modelo e escreva `Closes #número-da-Issue`. |
| 10 | Solicitar revisão | 🌐 | Coluna **Reviewers** → escolha o integrante da dupla indicada em `BACKLOG.md`. Avise-o pessoalmente. |
| 11 | Acompanhar a pipeline | 🌐 | Na parte de baixo do PR, veja `ci-qualidade`, `ci-politica-branches` e `ci-resultado`. ✅ verde = ok · ❌ vermelho = clique em **Details** e leia o log. |
| 12 | Corrigir problemas | ✏️ ⌨️ | Corrija na **mesma branch**, `git commit`, `git push`. O PR e a pipeline se atualizam sozinhos. |
| 13 | Obter aprovação e fazer o merge | 🌐 | Com 1 aprovação, conversas resolvidas e pipeline verde, o botão **Merge pull request** é liberado. Clique e confirme. |
| 14 | Preparar a próxima rodada | ⌨️ | `git switch develop` · `git pull origin develop` · (opcional) `git branch -d feature/NN-nome` |

### Quando o PR é reprovado na revisão

O revisor escolheu **Request changes**. Leia os comentários, ajuste o código, faça novo commit e `git push`. Depois responda cada comentário e clique em **Resolve conversation**. O revisor reavalia.

### Quando a pipeline fica vermelha

1. Abra a aba **Checks** (ou o link **Details**) do PR.
2. Descubra qual job falhou: `ci-qualidade` (estrutura, sintaxe, testes ou smoke) ou `ci-politica-branches` (título, Issue, arquivos fora do escopo, marcador esquecido).
3. Reproduza localmente com `npm run validate`.
4. Corrija, commit, push. A CI roda de novo.

### Quando aparecer "This branch has conflicts"

Outra funcionalidade foi integrada e mexeu na mesma linha que você. Siga [`CONFLITOS.md`](CONFLITOS.md). **Não entre em pânico:** é uma parte normal do trabalho em equipe.

## 4. Revisão de PR (quando você for revisor)

Siga [`REVISAO_PR.md`](REVISAO_PR.md): leia o PR, rode o código da branch, deixe **pelo menos um comentário técnico** e registre a decisão (**Approve** ou **Request changes**).

## 5. Comandos que você vai usar

| Para… | Comando |
|---|---|
| Ver em qual branch você está | `git branch --show-current` |
| Ver o que mudou | `git status` e `git diff` |
| Rodar tudo como a CI | `npm run validate` |
| Rodar só os testes | `npm test` |
| Ver o site | `npm start` → http://localhost:8080 |

O guia completo, com resultado esperado e cuidados de cada comando, está em [`GUIA_GIT.md`](GUIA_GIT.md).

## 6. Treino de falha da pipeline (rodada de recuperação)

O professor vai pedir que você **quebre a pipeline de propósito** em uma branch de treino, para aprender a ler e corrigir falhas:

```bash
npm run falha -- syntax    # erro de sintaxe  → check:syntax falha
npm run falha -- logic     # função alterada  → npm test falha
npm run falha -- undo      # desfaz as duas
```

A terceira falha é de regra de integração: abra um PR com título `ajustes` (fora do padrão) e veja `ci-politica-branches` reprovar. Corrija o título (**Edit** ao lado do título do PR) e a verificação passa.

## 7. Travou? Lista de checagem

- [ ] Estou na branch certa? (`git branch --show-current`)
- [ ] Meu PR tem **base `develop`**?
- [ ] Apaguei `NOT_IMPLEMENTED:Fxx`?
- [ ] Alterei só os arquivos da Issue? (`git status`)
- [ ] O título é `[Fxx] ...` e o corpo tem `Closes #N`?
- [ ] Rodei `npm run validate`?
- [ ] Ainda assim travado? Abra uma Issue de **ajuda** ou chame o professor com a mensagem de erro copiada.
