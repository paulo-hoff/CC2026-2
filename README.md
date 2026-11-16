# Collaborative Data Dashboard

Laboratório de desenvolvimento colaborativo com **Git, GitHub, Pull Requests, revisão de código e CI/CD**.

Um pequeno dashboard (HTML5, CSS3 e JavaScript puro) consulta usuários, publicações e tarefas da API pública [JSONPlaceholder](https://jsonplaceholder.typicode.com/) — ou de um arquivo local (`data/mock.json`) quando a API não responde. O projeto inicial **funciona, mas é propositalmente incompleto**: 20 alunos, em 10 duplas, implementam 30 pequenas funcionalidades em 3 rodadas, integrando-as por Pull Requests protegidos por uma pipeline de CI e publicando o resultado no GitHub Pages.

> Atividade de 2 horas. O objetivo não é construir um software complexo, e sim viver os desafios reais de uma equipe: branches, revisão, conflitos, pipeline vermelha e entrega.

## Começando

Requisitos: **Git** e **Node.js 20 ou superior** (sem instalar nenhuma dependência: `npm install` não é necessário).

```bash
git clone <URL-do-repositório>
cd collaborative-dashboard
git switch develop
npm run validate      # deve terminar com "APROVADO"
npm start             # abre o servidor em http://localhost:8080
```

Sem Node.js para o servidor, use `python3 -m http.server 8080`. A página usa módulos ES; abrir `index.html` com duplo clique **não** funciona (o navegador bloqueia módulos em `file://`).

## Comandos

| Comando | O que faz |
|---|---|
| `npm start` | Servidor HTTP local em `http://localhost:8080` |
| `npm run validate` | Roda **todas** as verificações da CI, na ordem. Execute antes de abrir o PR |
| `npm test` | Testes automatizados (`node:test`): utilitários e as 30 funcionalidades |
| `npm run check:structure` | Estrutura de arquivos e regiões das funcionalidades |
| `npm run check:syntax` | Sintaxe de todos os arquivos `.js` e do JSON de dados |
| `npm run smoke` | Funcionalidades essenciais: HTML, imports, dados e servidor HTTP |
| `npm run check:pr` | Política de branches e do PR (branch atual → `develop`) |
| `npm run build` | Gera `dist/` (o que vai ao GitHub Pages) |
| `npm run falha -- syntax\|logic\|undo` | Provoca/desfaz falhas controladas para o exercício da pipeline |

## Estrutura

```text
index.html            página (cabeçalho, indicadores, filtros, listas, mensagens, rodapé)
css/                  base.css (variáveis/tema) · components.css · dashboard.css (layout)
js/
  app.js              orquestra carregamento e renderização (não é alterado pelas tarefas)
  api.js              JSONPlaceholder e dados locais
  data.js             estado e regras sobre os dados
  filters.js          pesquisa, filtros, ordenação, limite, paginação
  formatters.js       texto, datas e nomes
  validators.js       validação de entradas
  components.js       funções de renderização (recebem o elemento como parâmetro)
  events.js           ligação de eventos
data/mock.json        10 usuários, 30 publicações, 40 tarefas (dados locais)
tests/                testes automatizados (contratos das 30 funcionalidades)
scripts/              validate, check-*, smoke, serve, build, falha controlada, criação das Issues
.github/              workflows (ci.yml, deploy.yml), template de PR, Issues, CODEOWNERS
docs/                 guias, backlog, relatório final
```

## Fluxo de branches

```text
main            produção (protegida, publicada no GitHub Pages)
 └── develop    integração (protegida, branch padrão)
      └── feature/NN-nome   uma branch por funcionalidade
```

- `feature/*` → PR → `develop` (revisão de outra dupla + pipeline verde).
- `develop` → PR → `main` (**somente** `develop`, feito pelo professor) → deploy automático.
- Nunca há push direto em `main` nem em `develop`.

## Pipeline

| Workflow | Quando | O que faz |
|---|---|---|
| `ci.yml` | PR para `develop` ou `main` | `ci-qualidade` (estrutura, sintaxe, testes, smoke) · `ci-politica-branches` (origem/destino, título, Issue, escopo) · `ci-resultado` (aprova ou reprova) |
| `deploy.yml` | push na `main` | valida, gera `dist/` e publica no GitHub Pages |

## Documentação

| Documento | Para quem |
|---|---|
| [`docs/GUIA_ALUNOS.md`](docs/GUIA_ALUNOS.md) | Sequência de trabalho do aluno |
| [`docs/GUIA_GIT.md`](docs/GUIA_GIT.md) | Comandos Git passo a passo |
| [`docs/REVISAO_PR.md`](docs/REVISAO_PR.md) | Como revisar um Pull Request |
| [`docs/CONFLITOS.md`](docs/CONFLITOS.md) | Branch desatualizada, conflitos, merge × rebase |
| [`docs/BACKLOG.md`](docs/BACKLOG.md) | As 30 funcionalidades, duplas e rodadas (`docs/issues/` tem as Issues) |
| [`docs/RELATORIO_FINAL.md`](docs/RELATORIO_FINAL.md) | Relatório individual (10 perguntas) |
| [`docs/CONFIGURACAO_GITHUB.md`](docs/CONFIGURACAO_GITHUB.md) | Configuração do repositório (professor) |

## Terminologia

No GitHub o nome é **Pull Request (PR)**. **Merge Request (MR)** é o termo do GitLab para o mesmo conceito: propor a integração de uma branch em outra, com discussão e revisão. Aqui usamos sempre PR.
