# Configuração do GitHub (professor)

Tutorial para deixar o repositório pronto **antes da aula**: repositório, branches, permissões, proteções, Actions, Pages e Issues. Reserve **45 a 60 minutos** na primeira vez.

> Os nomes de menus do GitHub mudam de tempos em tempos. Os caminhos abaixo refletem a interface atual; se algo estiver em outro lugar, procure pelo nome da opção. Confirme os limites do seu plano em <https://docs.github.com>.

## Visão geral do que será configurado

```text
main     ← somente PR vindo de develop · exige 1 aprovação + ci-resultado + ci-politica-branches · publica no Pages
develop  ← somente PR (feature/*) · exige 1 aprovação + ci-resultado + ci-politica-branches · branch padrão
```

## 1. Escolha o tipo de repositório (importante)

| Recurso | Repositório **público** (plano Free) | Repositório **privado** |
|---|---|---|
| Branch protection / Rulesets | Disponível | **Não é aplicado** no plano Free (exige GitHub Pro, Team ou Enterprise) |
| GitHub Pages | Disponível | Exige plano pago (ou GitHub Education/Team) |
| GitHub Actions | Minutos gratuitos | Minutos gratuitos limitados no plano Free |

**Recomendação:** use um **repositório público**, em uma conta pessoal do professor ou, melhor, em uma **organização** (permite equipes e papéis). Isto é seguro porque o repositório **não contém gabarito**: ele está em pasta separada do professor.

Se precisar de repositório privado, veja a seção 12 (alternativas).

## 2. Criar o repositório e publicar `main` e `develop`

Crie um repositório **vazio** no GitHub (sem README, sem .gitignore, sem licença) e, na pasta do projeto, descompactada do ZIP:

```bash
cd collaborative-dashboard
npm run validate -- --no-pr          # deve estar APROVADO
git init -b main
git add -A
git commit -m "chore: projeto-base do laboratório"
git remote add origin https://github.com/ORGANIZACAO/collaborative-dashboard.git
git push -u origin main
git switch -c develop
git push -u origin develop
```

Antes de publicar, confirme que **nenhum material do professor** está na pasta (`gabarito`, `solucao`, `professor-private`): `npm run check:structure` falha se encontrar.

Edite `.github/CODEOWNERS` trocando `@USUARIO-DO-PROFESSOR` pelo seu login e faça o commit **antes** de proteger as branches (ou depois, via PR).

## 3. Definir `develop` como branch padrão

*Settings → General → Default branch* → ícone de troca → `develop` → **Update**.

Por quê: (a) quem clona já fica na `develop`; (b) o botão **Compare & pull request** abre o PR contra a `develop`; (c) `Closes #N` só **fecha a Issue automaticamente** quando o PR é integrado na branch padrão.

## 4. Configurações gerais de Pull Request

*Settings → General → Pull Requests*:

- ✅ **Allow merge commits**
- ⬜ Allow squash merging (desmarcar)
- ⬜ Allow rebase merging (desmarcar)
- ✅ **Automatically delete head branches**

Por quê: com um único método (commit de merge) a `develop` e a `main` mantêm histórico compatível e o aluno não precisa decidir. Squash ao integrar `develop` em `main` faria as duas divergirem e geraria conflitos repetidos na release seguinte.

## 5. Habilitar GitHub Actions

*Settings → Actions → General*:

- **Actions permissions:** *Allow all actions and reusable workflows* (ou *Allow actions created by GitHub*; os workflows usam somente `actions/*`).
- **Workflow permissions:** *Read repository contents and packages permissions* (os workflows declaram o que precisam).

Teste a pipeline: aba **Actions → CI → Run workflow** (branch `develop`). Deve terminar verde.

## 6. Permissões dos alunos

Peça os logins GitHub dos 20 alunos (e dos eventuais monitores) com antecedência.

**Com organização (recomendado):**

1. *Organization → People → Invite member* (envie para os e-mails/logins).
2. Crie a equipe `alunos` (*Teams → New team*) e adicione todos.
3. No repositório: *Settings → Collaborators and teams → Add teams* → `alunos` com papel **Write**.

**Sem organização:** *Settings → Collaborators → Add people*, papel **Write**, um por um.

| Papel | Pode | Use para |
|---|---|---|
| **Write** | Criar branches, abrir PRs, revisar, **aprovar (a aprovação só conta se o revisor tiver Write)** e fazer merge quando as regras permitirem | Alunos |
| Maintain / Admin | Alterar regras, configurações, contornar proteções | **Somente o professor** |
| Read / Triage | Ler, comentar | Evite: **aprovações de Read não contam** para a regra de revisão |

Os convites expiram em 7 dias: envie com antecedência e confirme os aceites em *Settings → Collaborators*.

O papel Write permite criar e alterar **qualquer branch não protegida**, inclusive mexer em `.github/workflows` dentro da própria branch. Veja a mitigação por CODEOWNERS (seção 9) e o limite honesto na seção 11.

## 7. Proteger `main` e `develop` (Repository Rulesets — recomendado)

*Settings → Rules → Rulesets → New ruleset → New branch ruleset*. Crie **dois** rulesets com a mesma configuração, alterando só o nome e a branch alvo.

### 7.1 Ruleset `protege-develop`

| Campo | Valor |
|---|---|
| Ruleset Name | `protege-develop` |
| Enforcement status | **Active** |
| Bypass list | **vazia** (ninguém contorna; nem o professor) |
| Target branches | *Add target → Include by pattern* → `develop` |

Regras (*Branch rules*), marque:

| Regra | Configuração | Atende ao requisito |
|---|---|---|
| **Restrict deletions** | marcada | Bloquear exclusão (item 6) |
| **Block force pushes** | marcada | Bloquear *force push* (item 6) |
| **Require a pull request before merging** | marcada | **Impedir push direto** (item 5) |
| ↳ Required approvals | `1` | Exigir revisão (item 3) |
| ↳ Dismiss stale pull request approvals when new commits are pushed | marcada | Nova alteração exige nova revisão |
| ↳ Require review from Code Owners | marcada | Mudanças em `.github/`, `scripts/` e `tests/` exigem o professor |
| ↳ Require conversation resolution before merging | marcada | Exigir resolução de comentários (item 7) |
| ↳ Allowed merge methods | somente **Merge** | |
| **Require status checks to pass** | marcada | Exigir pipeline (item 4) |
| ↳ Required checks → **Add checks** | `ci-resultado` e `ci-politica-branches` | Ver nota abaixo |
| ↳ Require branches to be up to date before merging | **desmarcada** durante as rodadas 1–3 (ver abaixo) | |

**Não marque** *Restrict updates*: ela impede também o merge via PR para quem não está na lista de bypass. A regra *Require a pull request* já bloqueia o push direto.

Clique em **Create**.

### 7.2 Ruleset `protege-main`

Idêntico, mudando o nome (`protege-main`) e o alvo (`main`). Nada mais.

### 7.3 Sobre os status checks

- Marque **`ci-resultado`** (agrega a qualidade) e **`ci-politica-branches`** (origem/destino, título, Issue, escopo). Os nomes são os dos *jobs* e são estáveis.
- O campo de busca de checks só lista nomes que **já executaram** nos últimos 7 dias. Por isso: faça *Actions → CI → Run workflow* e, se `ci-politica-branches` não aparecer (ele é ignorado em execuções manuais), abra um PR de teste `feature/01-contador-usuarios` → `develop` e feche-o depois.
- Se um check não for encontrado, o ruleset não consegue exigi-lo. Verifique a grafia.

### 7.4 "Require branches to be up to date before merging" (modo estrito)

Com essa opção, a cada merge na `develop` **todos os outros PRs abertos ficam desatualizados** e precisam do botão **Update branch** antes de integrar. Isso cria fila e atrasa as rodadas 1–3, então deixe **desmarcada** no começo. **Ligue** durante o bloco "Branches desatualizadas, conflitos e correções" (65–85 min) para o Cenário A acontecer de forma natural, e desligue ao fim.

## 8. Impedir PRs de `feature/*` diretamente para `main`

**Limite da plataforma:** o GitHub não oferece regra para impedir a **criação** de um PR cuja origem seja `feature/*` com destino `main`, nem para restringir a branch de origem de um merge. As proteções acima impedem o *push direto* e exigem revisão e checks, mas **não** olham a origem do PR.

**Solução implementada (verificação obrigatória):** o job `ci-politica-branches` (`scripts/check-pr.js`) roda em todo PR e **reprova** quando:

- a base é `main` e a origem **não é** `develop`;
- a base é `develop` e a origem não segue `feature/NN-nome`;
- o título, a Issue ou o escopo de arquivos não seguem a política.

Como esse check é **obrigatório** na `main` (e na `develop`), o botão de merge fica bloqueado. O PR pode existir, mas **não pode ser integrado**.

Teste: abra um PR `feature/...` → `main`; o check `ci-politica-branches` deve ficar vermelho com a mensagem *Somente a branch "develop" pode ser integrada à "main"*.

## 9. CODEOWNERS

O arquivo `.github/CODEOWNERS` já está no projeto. Com *Require review from Code Owners* ligado, qualquer PR que altere `.github/`, `scripts/`, `tests/` ou `package.json` exige aprovação do professor. Para o código da aplicação (`js/`, `css/`, `index.html`) não há dono: o revisor da outra dupla basta. O professor precisa ter papel Write/Admin no repositório para ser dono válido.

## 10. Permitir que o professor integre `develop` em `main` sem contornar a pipeline

1. Mantenha a **Bypass list vazia** nos dois rulesets: o professor **não** é exceção.
2. O professor abre o PR `develop` → `main` com título `Release: ...`.
3. A aprovação deve vir de **outra pessoa com Write** (quem abre o PR não aprova o próprio). Opções:
   - um **monitor/professor assistente** com conta própria;
   - um **aluno voluntário** como "gerente de release" (Write) — também é boa experiência didática;
   - uma segunda conta sua (permitido pela plataforma, mas é a opção menos transparente).
4. Com `ci-resultado` e `ci-politica-branches` verdes, aprovação dada e conversas resolvidas, o professor clica em **Merge pull request**. Nada foi contornado.

Evite a opção "bypass" ou o merge como administrador: ela existe para emergências e retira o sentido da atividade.

## 11. Limites honestos desta proteção

- Uma pessoa com Write pode **alterar os workflows na própria branch** e o PR executará a versão alterada. A mitigação é o CODEOWNERS (alteração em `.github/` ou `scripts/` exige o professor) e o fato de a verificação de escopo apontar o arquivo fora do previsto. Acompanhe a aba *Files changed* de PRs suspeitos.
- A proteção da `main` e da `develop` só vale enquanto os rulesets estiverem **Active**.
- Aprovações de quem não tem Write não contam.

## 12. Se algo não estiver disponível no seu plano

| Situação | Alternativa |
|---|---|
| Repositório **privado** no plano Free (proteções não aplicadas, sem Pages) | Use repositório **público** (seguro: o gabarito está fora). Ou use GitHub Education / organização com plano Team, que habilitam proteções em repositórios privados |
| Ruleset indisponível | Use **Branch protection rules** clássicas: *Settings → Branches → Add branch protection rule* → padrão `develop` (e `main`). Marque: *Require a pull request before merging* (1 aprovação, *Dismiss stale…*, *Require review from Code Owners*), *Require status checks to pass* (`ci-resultado`, `ci-politica-branches`), *Require conversation resolution before merging*, *Do not allow bypassing the above settings*. Deixe *Allow force pushes* e *Allow deletions* **desmarcados** |
| Nenhuma proteção possível (plano Free + privado) | **Controle por convenção e auditoria:** o professor é o único com Admin; alunos com Write; acompanhe *Insights → Network* e a lista de commits em `main`/`develop`. Peça que **ninguém** faça push direto; a CI e o `check-pr` continuam avisando, mas **não bloqueiam** o merge |
| Sem GitHub Pages no plano | Rode `npm run build` e publique `dist/` em outro serviço de hospedagem estática, ou demonstre localmente com `npm start`; o workflow `deploy.yml` fica documentado, sem execução |
| Sem organização | Convide cada aluno como *Collaborator* (Write) |

## 13. GitHub Pages e ambiente de implantação

1. *Settings → Pages → Build and deployment → Source:* **GitHub Actions** (não use "Deploy from a branch").
2. *Settings → Environments →* `github-pages` (criado automaticamente ao configurar o Pages). Em **Deployment branches and tags**, escolha **Selected branches and tags** e adicione `main`. Assim, nenhuma outra branch consegue publicar.
3. O workflow `deploy.yml` já declara as permissões exigidas pelo mecanismo oficial:

   ```yaml
   permissions:
     contents: read
     pages: write      # publicar no Pages
     id-token: write   # autenticação OIDC da ação deploy-pages
   ```

4. Ele dispara somente em `push` na `main` (e manualmente). O job `validar` roda `npm run validate`, gera `dist/` e envia o artefato com `actions/upload-pages-artifact`; o job `publicar` usa `actions/deploy-pages` no ambiente `github-pages`.
5. O endereço fica em *Settings → Pages* e no resumo do job `publicar`: `https://ORGANIZACAO.github.io/collaborative-dashboard/`.

Primeira publicação: integre qualquer PR `develop` → `main` ou, antes da aula, rode *Actions → Deploy → Run workflow* na branch `main` para testar.

As versões das ações (`checkout@v4`, `setup-node@v4`, `configure-pages@v5`, `upload-pages-artifact@v3`, `deploy-pages@v4`) eram as vigentes ao criar este material; consulte as páginas das ações no GitHub Marketplace e atualize se houver aviso de descontinuação.

## 14. Criar as 30 Issues

Com a GitHub CLI autenticada (`gh auth login`), dentro do repositório clonado:

```bash
bash scripts/create-issues.sh                 # cria rótulos e as 30 Issues
bash scripts/create-issues.sh duplas.csv      # também atribui os responsáveis
```

`duplas.csv` (um por linha, sem cabeçalho obrigatório): `dupla,login_integrante_A,login_integrante_B`. O script atribui: **R1 → A**, **R2 → B**, **R3 → A e B**.

Sem a CLI: crie as Issues manualmente copiando cada arquivo de `docs/issues/` (título na primeira linha; rótulos na linha `<!-- labels: ... -->`).

Cada Issue já traz critérios, contrato e checklist do fluxo. O PR se liga à Issue pela frase `Closes #N` no corpo (a barra lateral **Development** do PR mostra a Issue vinculada). Ao integrar na `develop` (branch padrão), a Issue fecha sozinha.

## 15. Verificação final

Execute o checklist completo do professor (`CHECKLIST_VALIDACAO.md`, material separado) antes da aula. Os pontos críticos:

- [ ] Push direto em `main` e em `develop` é recusado.
- [ ] PR `feature/*` → `main` fica com `ci-politica-branches` vermelho e merge bloqueado.
- [ ] PR sem aprovação não pode ser integrado.
- [ ] Deploy publica a página e abre em `https://…github.io/collaborative-dashboard/`.
