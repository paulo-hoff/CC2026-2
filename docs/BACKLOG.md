# Backlog — 30 funcionalidades

Este documento é a fonte das 30 Issues do laboratório. Cada funcionalidade é pequena e independente: **10 minutos de código no máximo**. O arquivo de cada Issue (pronto para importar) está em `docs/issues/`.

## Como o projeto-base permite trabalho em paralelo

- Cada funcionalidade tem sua **região** no código, delimitada por `// [Fxx]` e `// [/Fxx]`. Edite somente a sua.
- Cada região começa com a linha `NOT_IMPLEMENTED:Fxx`. Ao concluir, **apague essa linha**: é o sinal para a CI começar a exigir o teste da sua funcionalidade.
- Funções que dependem de outras têm um **contrato** (assinatura) já presente no código, com comportamento neutro. Assim, ninguém espera ninguém.
- Os testes de todas as funcionalidades já existem em `tests/features.test.js`. Enquanto o marcador existe, o teste aparece como *skipped* e a CI continua verde.
- Conflitos reais são **raros e propositais** (F22 × F29).

## Visão geral

| ID | Funcionalidade | Rodada | Dupla | Branch sugerida | Tempo |
|---|---|:---:|:---:|---|:---:|
| F01 | Exibir contador de usuários | 1 | 01 | `feature/01-contador-usuarios` | 3 min |
| F02 | Exibir contador de publicações | 1 | 02 | `feature/02-contador-publicacoes` | 3 min |
| F03 | Exibir contador de tarefas | 1 | 03 | `feature/03-contador-tarefas` | 3 min |
| F04 | Criar pesquisa por nome | 1 | 04 | `feature/04-busca-nome` | 6 min |
| F05 | Criar filtro por cidade | 1 | 05 | `feature/05-filtro-cidade` | 6 min |
| F06 | Ordenar usuários alfabeticamente | 1 | 06 | `feature/06-ordenar-usuarios` | 5 min |
| F07 | Adicionar botão para limpar filtros | 1 | 07 | `feature/07-limpar-filtros` | 8 min |
| F08 | Exibir mensagem quando a lista estiver vazia | 1 | 08 | `feature/08-lista-vazia` | 5 min |
| F09 | Criar indicador de carregamento | 1 | 09 | `feature/09-carregamento` | 4 min |
| F10 | Exibir data da última atualização | 1 | 10 | `feature/10-ultima-atualizacao` | 7 min |
| F11 | Buscar usuários na API | 2 | 01 | `feature/11-api-usuarios` | 4 min |
| F12 | Buscar publicações na API | 2 | 02 | `feature/12-api-publicacoes` | 4 min |
| F13 | Buscar tarefas na API | 2 | 03 | `feature/13-api-tarefas` | 4 min |
| F14 | Calcular percentual de tarefas concluídas | 2 | 04 | `feature/14-percentual-concluidas` | 7 min |
| F15 | Filtrar tarefas concluídas | 2 | 05 | `feature/15-filtro-concluidas` | 4 min |
| F16 | Filtrar tarefas pendentes | 2 | 06 | `feature/16-filtro-pendentes` | 4 min |
| F17 | Limitar a quantidade de registros exibidos | 2 | 07 | `feature/17-limitar-registros` | 5 min |
| F18 | Formatar nomes dos usuários | 2 | 08 | `feature/18-formatar-nomes` | 8 min |
| F19 | Tratar falhas de requisição HTTP | 2 | 09 | `feature/19-erros-http` | 10 min |
| F20 | Implementar fallback para dados locais | 2 | 10 | `feature/20-fallback-local` | 10 min |
| F21 | Criar botão de atualizar dados | 3 | 01 | `feature/21-botao-atualizar` | 9 min |
| F22 | Implementar alternância entre tema claro e escuro | 3 | 02 | `feature/22-tema-claro-escuro` | 10 min |
| F23 | Salvar preferência de tema no localStorage | 3 | 03 | `feature/23-tema-localstorage` | 7 min |
| F24 | Criar validação de campo de busca | 3 | 04 | `feature/24-validar-busca` | 8 min |
| F25 | Criar filtro combinado | 3 | 05 | `feature/25-filtro-combinado` | 10 min |
| F26 | Mostrar detalhes de um usuário | 3 | 06 | `feature/26-detalhes-usuario` | 10 min |
| F27 | Implementar paginação simples | 3 | 07 | `feature/27-paginacao` | 10 min |
| F28 | Exibir aviso de operação bem-sucedida | 3 | 08 | `feature/28-aviso-sucesso` | 6 min |
| F29 | Criar botão de voltar ao início | 3 | 09 | `feature/29-voltar-ao-inicio` | 8 min |
| F30 | Adicionar indicador de dados locais ou remotos | 3 | 10 | `feature/30-indicador-origem` | 6 min |

## Distribuição por dupla e rodada

Cada dupla recebe **uma funcionalidade por rodada** (F0k, F1k e F2k para a dupla k). Os papéis alternam dentro da dupla e cada Pull Request é revisado por alguém de **outra dupla**, em anel:

- **Rodada 1:** Integrante A é o autor (código e PR); Integrante B é revisor de **outra dupla**.
- **Rodada 2:** Integrante B é o autor (código e PR); Integrante A é revisor de **outra dupla**.
- **Rodada 3:** Co-autoria (programação em par): A e B fazem commits na branch (A abre o PR); B revisa o PR de **outra dupla**.

| Dupla | Rodada 1 | Rodada 2 | Rodada 3 | Revisa na R1 | Revisa na R2 | Revisa na R3 |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 01 | F01 | F11 | F21 | Dupla 02 | Dupla 04 | Dupla 08 |
| 02 | F02 | F12 | F22 | Dupla 03 | Dupla 05 | Dupla 09 |
| 03 | F03 | F13 | F23 | Dupla 04 | Dupla 06 | Dupla 10 |
| 04 | F04 | F14 | F24 | Dupla 05 | Dupla 07 | Dupla 01 |
| 05 | F05 | F15 | F25 | Dupla 06 | Dupla 08 | Dupla 02 |
| 06 | F06 | F16 | F26 | Dupla 07 | Dupla 09 | Dupla 03 |
| 07 | F07 | F17 | F27 | Dupla 08 | Dupla 10 | Dupla 04 |
| 08 | F08 | F18 | F28 | Dupla 09 | Dupla 01 | Dupla 05 |
| 09 | F09 | F19 | F29 | Dupla 10 | Dupla 02 | Dupla 06 |
| 10 | F10 | F20 | F30 | Dupla 01 | Dupla 03 | Dupla 07 |

Leitura da tabela: "Revisa na R1: Dupla 02" significa que o **revisor** da dupla 01 na rodada 1 revisa o PR da dupla 02. Em cada rodada, cada PR recebe exatamente um revisor de outra dupla.

Resultado: **os 20 alunos escrevem código** (A na R1, B na R2, ambos na R3) e **os 20 revisam** (B na R1, A na R2, B na R3).

## Dependências entre funcionalidades

| Funcionalidade | Depende de (apenas para ver na tela) | Contrato inicial já no código |
|---|---|---|
| F08 mensagem de lista vazia | F04 (busca) | `renderEmptyState` (sem efeito) |
| F20 fallback | F11–F13 | `fetchUsers/Posts/Todos` devolvem `null` |
| F23 tema no localStorage | F22 | `saveTheme/loadTheme` (sem efeito) + `ctx.onThemeChange` pronto |
| F25 filtro combinado | F04, F05 | `filterByName/City` devolvem a lista sem filtrar |
| F30 origem dos dados | F20 | `state.source` já existe |
| F11–F13 | F19 (melhora `fetchJSON`) | `fetchJSON` básica já existe |

Os **testes** de cada funcionalidade são independentes, ou se ajustam sozinhos quando a dependência ainda não foi integrada.

## Conflitos previstos

| Par | Onde | Tipo |
|---|---|---|
| **F22 × F29** | linha do comentário em `index.html` (`header-actions`) | Conflito de merge **real** (Cenário B) |
| F07 × F21 | bloco `toolbar-actions` de `index.html` | Regiões vizinhas, sem conflito |
| F17 × F27 | interação funcional (limite antes da paginação) | Sem conflito de texto |
| F11, F12, F13, F19, F20 | regiões vizinhas em `api.js` | Sem conflito se cada um editar só a sua |

---

# Detalhamento

## [F01] Exibir contador de usuários

| | |
|---|---|
| **Rodada** | 1 — Interface e manipulação básica |
| **Dupla responsável** | Dupla 01 |
| **Branch sugerida** | `feature/01-contador-usuarios` |
| **Tempo estimado** | 3 min |
| **Arquivos a alterar** | `js/components.js` |

**Descrição.** Mostrar, no card "Usuários", a quantidade de usuários carregados.

**Objetivo técnico.** Escrever em um elemento do DOM a partir de dados (textContent) e entender funções de renderização que recebem o elemento como parâmetro.

**Objetivo pedagógico.** Primeiro ciclo completo: branch → commit → PR → revisão, com uma mudança mínima.

**Contrato (assinatura que não pode mudar).**

```text
renderUserCount(users, el = document.getElementById("count-users"))
```

**Critérios de aceitação.**

- [ ] Com os 10 usuários do mock, o card exibe `10`.
- [ ] Com lista vazia, exibe `0`.
- [ ] O teste `F01` da CI passa sem estar "skipped".
- [ ] Somente `js/components.js` foi alterado.

**Exemplo de comportamento esperado.** Abrir a página → o card "Usuários" mostra 10 em vez de `--`.

**Teste / validação.** `npm test` (teste F01). No navegador: conferir o card.

**Dependências.** Nenhuma.

**Possíveis conflitos.** Nenhum (região própria em `components.js`; F02 e F03 editam regiões vizinhas, não a sua).

**Orientação.** Procure a região `[F01]` em cada arquivo (entre `[F01]` e `[/F01]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F01` em `js/components.js`. O parâmetro `el` já recebe o elemento. Lembre que `textContent` espera texto.

---

## [F02] Exibir contador de publicações

| | |
|---|---|
| **Rodada** | 1 — Interface e manipulação básica |
| **Dupla responsável** | Dupla 02 |
| **Branch sugerida** | `feature/02-contador-publicacoes` |
| **Tempo estimado** | 3 min |
| **Arquivos a alterar** | `js/components.js` |

**Descrição.** Mostrar, no card "Publicações", a quantidade de publicações carregadas.

**Objetivo técnico.** Mesma técnica da F01, aplicada a outra coleção.

**Objetivo pedagógico.** Perceber que tarefas parecidas em regiões vizinhas do mesmo arquivo não geram conflito quando cada uma edita só o seu trecho.

**Contrato (assinatura que não pode mudar).**

```text
renderPostCount(posts, el = document.getElementById("count-posts"))
```

**Critérios de aceitação.**

- [ ] Com o mock, o card exibe `30`.
- [ ] Com lista vazia, exibe `0`.
- [ ] O teste `F02` passa sem estar "skipped".
- [ ] Somente `js/components.js` foi alterado.

**Exemplo de comportamento esperado.** Abrir a página → o card "Publicações" mostra 30.

**Teste / validação.** `npm test` (teste F02).

**Dependências.** Nenhuma.

**Possíveis conflitos.** Nenhum, desde que você edite apenas a região `[F02]`.

**Orientação.** Procure a região `[F02]` em cada arquivo (entre `[F02]` e `[/F02]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F02` em `js/components.js`. Veja como o contrato da F01 foi escrito no mesmo arquivo.

---

## [F03] Exibir contador de tarefas

| | |
|---|---|
| **Rodada** | 1 — Interface e manipulação básica |
| **Dupla responsável** | Dupla 03 |
| **Branch sugerida** | `feature/03-contador-tarefas` |
| **Tempo estimado** | 3 min |
| **Arquivos a alterar** | `js/components.js` |

**Descrição.** Mostrar, no card "Tarefas", a quantidade total de tarefas carregadas.

**Objetivo técnico.** Mesma técnica da F01, aplicada a tarefas.

**Objetivo pedagógico.** Reforçar o fluxo Git com uma tarefa muito curta e treinar a revisão de um PR pequeno.

**Contrato (assinatura que não pode mudar).**

```text
renderTodoCount(todos, el = document.getElementById("count-todos"))
```

**Critérios de aceitação.**

- [ ] Com o mock, o card exibe `40`.
- [ ] Com lista vazia, exibe `0`.
- [ ] O teste `F03` passa sem estar "skipped".
- [ ] Somente `js/components.js` foi alterado.

**Exemplo de comportamento esperado.** Abrir a página → o card "Tarefas" mostra 40.

**Teste / validação.** `npm test` (teste F03).

**Dependências.** Nenhuma.

**Possíveis conflitos.** Nenhum, desde que você edite apenas a região `[F03]`.

**Orientação.** Procure a região `[F03]` em cada arquivo (entre `[F03]` e `[/F03]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F03` em `js/components.js`. O total é de todas as tarefas, independentemente do filtro da tela.

---

## [F04] Criar pesquisa por nome

| | |
|---|---|
| **Rodada** | 1 — Interface e manipulação básica |
| **Dupla responsável** | Dupla 04 |
| **Branch sugerida** | `feature/04-busca-nome` |
| **Tempo estimado** | 6 min |
| **Arquivos a alterar** | `js/filters.js` |

**Descrição.** Fazer o campo "Pesquisar por nome" filtrar os usuários cujo nome contém o texto digitado.

**Objetivo técnico.** Filtragem de listas com `filter`, comparação de textos sem diferenciar acentos e maiúsculas (use `normalizeText`, que já existe).

**Objetivo pedagógico.** Escrever função pura, sem DOM, e ver o teste automatizado validar o comportamento.

**Contrato (assinatura que não pode mudar).**

```text
filterByName(users, query) → object[]
```

**Critérios de aceitação.**

- [ ] `ana` retorna "Ana Silva" e "Mariana Costa" (conteúdo, não só início).
- [ ] `JOSE` encontra "José Álvares".
- [ ] Consulta vazia ou só com espaços retorna todos os usuários.
- [ ] Consulta sem correspondência retorna lista vazia.
- [ ] O teste `F04` passa sem estar "skipped".

**Exemplo de comportamento esperado.** Digitar `cle` na busca → aparecem "Clementine Bauch" e "Clementina DuBuque".

**Teste / validação.** `npm test` (teste F04). No navegador: digitar na busca.

**Dependências.** Nenhuma. É usada por F08 (mensagem com o termo) e F25 (filtro combinado).

**Possíveis conflitos.** F25 chama esta função; não altere a assinatura. Nenhum conflito de texto.

**Orientação.** Procure a região `[F04]` em cada arquivo (entre `[F04]` e `[/F04]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F04` em `js/filters.js`. Normalize os dois lados antes de comparar. `String.prototype.includes` ajuda.

---

## [F05] Criar filtro por cidade

| | |
|---|---|
| **Rodada** | 1 — Interface e manipulação básica |
| **Dupla responsável** | Dupla 05 |
| **Branch sugerida** | `feature/05-filtro-cidade` |
| **Tempo estimado** | 6 min |
| **Arquivos a alterar** | `js/filters.js` |

**Descrição.** Permitir filtrar usuários por cidade e preencher a lista de cidades do seletor.

**Objetivo técnico.** Comparação normalizada, remoção de duplicados (`Set`) e ordenação com `localeCompare`.

**Objetivo pedagógico.** Entender contrato com duas funções cooperando (filtro + lista de opções).

**Contrato (assinatura que não pode mudar).**

```text
filterByCity(users, city) → object[]  ·  getUniqueCities(users) → string[]
```

**Critérios de aceitação.**

- [ ] `filterByCity(users, "RIO DE JANEIRO")` ignora caixa e acentos.
- [ ] Cidade vazia retorna todos.
- [ ] `getUniqueCities` não repete cidades e as devolve em ordem alfabética (pt-BR).
- [ ] O seletor "Cidade" da tela passa a listar as cidades dos usuários.
- [ ] O teste `F05` passa sem estar "skipped".

**Exemplo de comportamento esperado.** Escolher "Gwenborough" → aparece só "Leanne Graham".

**Teste / validação.** `npm test` (teste F05) e conferir o seletor no navegador.

**Dependências.** Nenhuma. É usada por F25.

**Possíveis conflitos.** F25 chama `filterByCity`; não altere a assinatura.

**Orientação.** Procure a região `[F05]` em cada arquivo (entre `[F05]` e `[/F05]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F05` em `js/filters.js`. A cidade está em `user.address.city`. Para ordenar textos com acentos use `localeCompare(b, "pt-BR")`.

---

## [F06] Ordenar usuários alfabeticamente

| | |
|---|---|
| **Rodada** | 1 — Interface e manipulação básica |
| **Dupla responsável** | Dupla 06 |
| **Branch sugerida** | `feature/06-ordenar-usuarios` |
| **Tempo estimado** | 5 min |
| **Arquivos a alterar** | `js/filters.js` |

**Descrição.** Ordenar a lista de usuários por nome (A–Z ou Z–A) conforme o seletor "Ordem".

**Objetivo técnico.** Ordenação sem alterar a lista original (cópia antes de `sort`) e comparação de textos localizada.

**Objetivo pedagógico.** Imutabilidade: funções puras não podem modificar os dados recebidos.

**Contrato (assinatura que não pode mudar).**

```text
sortUsers(users, order) → object[]   (order: "none" | "asc" | "desc")
```

**Critérios de aceitação.**

- [ ] `asc` ordena por nome sem diferenciar acentos/caixa ("Álvaro", "ana", "Bruno").
- [ ] `desc` inverte a ordem.
- [ ] `none` mantém a ordem original.
- [ ] A lista recebida não é alterada (o teste usa `Object.freeze`).
- [ ] O teste `F06` passa sem estar "skipped".

**Exemplo de comportamento esperado.** Escolher "Nome (Z–A)" → "Nicholas Runolfsdottir V" aparece no topo.

**Teste / validação.** `npm test` (teste F06).

**Dependências.** Nenhuma.

**Possíveis conflitos.** Nenhum.

**Orientação.** Procure a região `[F06]` em cada arquivo (entre `[F06]` e `[/F06]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F06` em `js/filters.js`. `[...users]` cria uma cópia. `localeCompare` aceita a opção `{ sensitivity: "base" }`.

---

## [F07] Adicionar botão para limpar filtros

| | |
|---|---|
| **Rodada** | 1 — Interface e manipulação básica |
| **Dupla responsável** | Dupla 07 |
| **Branch sugerida** | `feature/07-limpar-filtros` |
| **Tempo estimado** | 8 min |
| **Arquivos a alterar** | `js/filters.js`, `js/events.js`, `index.html` |

**Descrição.** Adicionar o botão "Limpar filtros", que devolve busca, cidade, ordem, limite e status das tarefas aos valores padrão.

**Objetivo técnico.** Alterar HTML, ligar evento de clique e reutilizar uma função pura (`clearFilters`) que devolve um novo objeto.

**Objetivo pedagógico.** Tarefa que cruza três arquivos (HTML, filtros e eventos) mantendo o escopo pequeno.

**Contrato (assinatura que não pode mudar).**

```text
clearFilters(criteria) → { query:"", city:"", sort:"none", limit:0, todoStatus:"all" }  ·  botão `id="btn-clear-filters"`
```

**Critérios de aceitação.**

- [ ] `clearFilters` devolve um NOVO objeto igual a `DEFAULT_CRITERIA` e não altera o recebido.
- [ ] `index.html` contém um botão com `id="btn-clear-filters"` dentro da região `[F07]`.
- [ ] Ao clicar, os campos da tela voltam ao padrão e a lista é redesenhada.
- [ ] O teste `F07` passa sem estar "skipped".

**Exemplo de comportamento esperado.** Digitar `ana`, escolher uma cidade e clicar em "Limpar filtros" → campos vazios e 10 usuários na lista.

**Teste / validação.** `npm test` (teste F07) + teste manual no navegador.

**Dependências.** Nenhuma.

**Possíveis conflitos.** F21 edita a região vizinha `[F21]` do mesmo bloco de `index.html`; não mexa nela.

**Orientação.** Procure a região `[F07]` em cada arquivo (entre `[F07]` e `[/F07]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F07` em `js/filters.js`. `DEFAULT_CRITERIA` está em `data.js` (congelado). Um spread `{ ...obj }` cria cópia. O evento de clique vai em `bindClearFilters`.

---

## [F08] Exibir mensagem quando a lista estiver vazia

| | |
|---|---|
| **Rodada** | 1 — Interface e manipulação básica |
| **Dupla responsável** | Dupla 08 |
| **Branch sugerida** | `feature/08-lista-vazia` |
| **Tempo estimado** | 5 min |
| **Arquivos a alterar** | `js/components.js` |

**Descrição.** Exibir "Nenhum usuário encontrado" quando a lista filtrada estiver vazia (incluindo o termo pesquisado).

**Objetivo técnico.** Renderização condicional e escape de HTML (`escapeHtml`) para evitar injeção de código.

**Objetivo pedagógico.** Segurança básica: nunca inserir texto digitado pelo usuário em `innerHTML` sem escapar.

**Contrato (assinatura que não pode mudar).**

```text
renderEmptyState(el, criteria = {})  — chamada por renderUserList quando não há usuários
```

**Critérios de aceitação.**

- [ ] Escreve em `el.innerHTML` um `<p class="empty-state">` com "Nenhum usuário encontrado".
- [ ] Se `criteria.query` existir, o termo aparece escapado na mensagem.
- [ ] O teste `F08` passa sem estar "skipped".

**Exemplo de comportamento esperado.** Buscar `zzz` → "Nenhum usuário encontrado para "zzz"." (exige F04 integrada para ver na tela).

**Teste / validação.** `npm test` (teste F08).

**Dependências.** Para ver na tela, depende de F04 (busca). O teste é independente.

**Possíveis conflitos.** Nenhum.

**Orientação.** Procure a região `[F08]` em cada arquivo (entre `[F08]` e `[/F08]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F08` em `js/components.js`. O estilo `.empty-state` já existe no CSS.

---

## [F09] Criar indicador de carregamento

| | |
|---|---|
| **Rodada** | 1 — Interface e manipulação básica |
| **Dupla responsável** | Dupla 09 |
| **Branch sugerida** | `feature/09-carregamento` |
| **Tempo estimado** | 4 min |
| **Arquivos a alterar** | `js/components.js` |

**Descrição.** Mostrar a mensagem "Carregando dados…" enquanto os dados são buscados e escondê-la ao terminar.

**Objetivo técnico.** Propriedade `hidden` e uso de `try/finally` (já presente em `app.js`, que chama `setLoading`).

**Objetivo pedagógico.** Entender que o app já tem o "encaixe" pronto e que o aluno só implementa o comportamento.

**Contrato (assinatura que não pode mudar).**

```text
setLoading(isLoading, el = document.getElementById("loading"))
```

**Critérios de aceitação.**

- [ ] `setLoading(true, el)` deixa `el.hidden === false`.
- [ ] `setLoading(false, el)` deixa `el.hidden === true`.
- [ ] O teste `F09` passa sem estar "skipped".

**Exemplo de comportamento esperado.** Recarregar a página com a rede lenta (DevTools → Network → Slow 3G) → a mensagem aparece e some.

**Teste / validação.** `npm test` (teste F09).

**Dependências.** Nenhuma.

**Possíveis conflitos.** Nenhum.

**Orientação.** Procure a região `[F09]` em cada arquivo (entre `[F09]` e `[/F09]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F09` em `js/components.js`. O argumento é um booleano: `hidden` é o oposto dele.

---

## [F10] Exibir data da última atualização

| | |
|---|---|
| **Rodada** | 1 — Interface e manipulação básica |
| **Dupla responsável** | Dupla 10 |
| **Branch sugerida** | `feature/10-ultima-atualizacao` |
| **Tempo estimado** | 7 min |
| **Arquivos a alterar** | `js/formatters.js`, `js/components.js` |

**Descrição.** Exibir, no card "Última atualização", a data e a hora do último carregamento no formato `dd/mm/aaaa HH:MM`.

**Objetivo técnico.** Formatação de datas com `Date` e `padStart`, sem bibliotecas.

**Objetivo pedagógico.** Separar formatação (função pura) de exibição (função de renderização).

**Contrato (assinatura que não pode mudar).**

```text
formatDateTime(date) → string  ·  renderLastUpdate(date, el = document.getElementById("last-update"))
```

**Critérios de aceitação.**

- [ ] `new Date(2025, 0, 5, 9, 7)` → `05/01/2025 09:07`.
- [ ] `null` (sem data) → `--`.
- [ ] `renderLastUpdate` escreve o texto formatado em `el`.
- [ ] O teste `F10` passa sem estar "skipped".

**Exemplo de comportamento esperado.** Abrir a página → card mostra algo como `16/11/2026 14:32`.

**Teste / validação.** `npm test` (teste F10).

**Dependências.** Nenhuma.

**Possíveis conflitos.** F30 (origem dos dados) trabalha no rodapé; sem conflito de texto.

**Orientação.** Procure a região `[F10]` em cada arquivo (entre `[F10]` e `[/F10]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F10` em `js/formatters.js`. Meses começam em 0 em `getMonth()`. `String(n).padStart(2, "0")` completa com zero.

---

## [F11] Buscar usuários na API

| | |
|---|---|
| **Rodada** | 2 — APIs, dados e regras |
| **Dupla responsável** | Dupla 01 |
| **Branch sugerida** | `feature/11-api-usuarios` |
| **Tempo estimado** | 4 min |
| **Arquivos a alterar** | `js/api.js` |

**Descrição.** Buscar a lista de usuários na API pública JSONPlaceholder.

**Objetivo técnico.** `fetch`, URLs base e injeção da função de rede (`fetchFn`) para permitir testes sem internet.

**Objetivo pedagógico.** Testar código de rede com um "fetch falso".

**Contrato (assinatura que não pode mudar).**

```text
fetchUsers(fetchFn = globalThis.fetch) → Promise<object[]>   (GET `${API_BASE}/users`)
```

**Critérios de aceitação.**

- [ ] Chama exatamente `https://jsonplaceholder.typicode.com/users`.
- [ ] Retorna a lista recebida.
- [ ] Usa `fetchJSON` (já existe) para a requisição.
- [ ] O teste `F11` passa sem estar "skipped".

**Exemplo de comportamento esperado.** No console: `await fetchUsers()` devolve 10 usuários (com internet).

**Teste / validação.** `npm test` (teste F11 usa fetch falso).

**Dependências.** Usa `fetchJSON` (melhorada na F19, mas o contrato já existe). Usada por F20.

**Possíveis conflitos.** F12, F13, F19 e F20 editam regiões vizinhas de `api.js`; não altere as delas.

**Orientação.** Procure a região `[F11]` em cada arquivo (entre `[F11]` e `[/F11]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F11` em `js/api.js`. Procure a constante `API_BASE` no topo do arquivo.

---

## [F12] Buscar publicações na API

| | |
|---|---|
| **Rodada** | 2 — APIs, dados e regras |
| **Dupla responsável** | Dupla 02 |
| **Branch sugerida** | `feature/12-api-publicacoes` |
| **Tempo estimado** | 4 min |
| **Arquivos a alterar** | `js/api.js` |

**Descrição.** Buscar a lista de publicações na API pública JSONPlaceholder.

**Objetivo técnico.** Mesma técnica da F11 para outro recurso (`/posts`).

**Objetivo pedagógico.** Reconhecer padrão repetido e preservar o contrato entre funções irmãs.

**Contrato (assinatura que não pode mudar).**

```text
fetchPosts(fetchFn = globalThis.fetch) → Promise<object[]>   (GET `${API_BASE}/posts`)
```

**Critérios de aceitação.**

- [ ] Chama exatamente `https://jsonplaceholder.typicode.com/posts`.
- [ ] Retorna a lista recebida.
- [ ] O teste `F12` passa sem estar "skipped".

**Exemplo de comportamento esperado.** No console: `await fetchPosts()` devolve 100 publicações (com internet).

**Teste / validação.** `npm test` (teste F12).

**Dependências.** Usa `fetchJSON`. Usada por F20.

**Possíveis conflitos.** Regiões vizinhas em `api.js` (F11, F13): edite só a sua.

**Orientação.** Procure a região `[F12]` em cada arquivo (entre `[F12]` e `[/F12]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F12` em `js/api.js`. Veja a Issue da F11 para o formato esperado.

---

## [F13] Buscar tarefas na API

| | |
|---|---|
| **Rodada** | 2 — APIs, dados e regras |
| **Dupla responsável** | Dupla 03 |
| **Branch sugerida** | `feature/13-api-tarefas` |
| **Tempo estimado** | 4 min |
| **Arquivos a alterar** | `js/api.js` |

**Descrição.** Buscar a lista de tarefas na API pública JSONPlaceholder.

**Objetivo técnico.** Mesma técnica da F11 para `/todos`.

**Objetivo pedagógico.** Mesma da F12, com atenção ao campo `completed`.

**Contrato (assinatura que não pode mudar).**

```text
fetchTodos(fetchFn = globalThis.fetch) → Promise<object[]>   (GET `${API_BASE}/todos`)
```

**Critérios de aceitação.**

- [ ] Chama exatamente `https://jsonplaceholder.typicode.com/todos`.
- [ ] Retorna a lista recebida.
- [ ] O teste `F13` passa sem estar "skipped".

**Exemplo de comportamento esperado.** No console: `await fetchTodos()` devolve 200 tarefas (com internet).

**Teste / validação.** `npm test` (teste F13).

**Dependências.** Usa `fetchJSON`. Usada por F20.

**Possíveis conflitos.** Regiões vizinhas em `api.js` (F12, F19, F20): edite só a sua.

**Orientação.** Procure a região `[F13]` em cada arquivo (entre `[F13]` e `[/F13]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F13` em `js/api.js`. Igual à F11, mudando o recurso.

---

## [F14] Calcular percentual de tarefas concluídas

| | |
|---|---|
| **Rodada** | 2 — APIs, dados e regras |
| **Dupla responsável** | Dupla 04 |
| **Branch sugerida** | `feature/14-percentual-concluidas` |
| **Tempo estimado** | 7 min |
| **Arquivos a alterar** | `js/data.js`, `js/components.js` |

**Descrição.** Calcular o percentual de tarefas concluídas e exibi-lo no card "Tarefas concluídas".

**Objetivo técnico.** Contagem com `filter`, divisão, arredondamento (`Math.round`) e tratamento de lista vazia.

**Objetivo pedagógico.** Pensar em casos de borda (lista vazia → 0) antes de codificar.

**Contrato (assinatura que não pode mudar).**

```text
completedPercentage(todos) → inteiro 0–100  ·  renderCompletedPercent(todos, el = document.getElementById("percent-completed"))
```

**Critérios de aceitação.**

- [ ] Lista vazia → `0`.
- [ ] 1 concluída em 3 → `33`; 3 em 4 → `75`; mock completo → `43`.
- [ ] `renderCompletedPercent` escreve o valor seguido de `%` (ex.: `50%`).
- [ ] O teste `F14` passa sem estar "skipped".

**Exemplo de comportamento esperado.** Com o mock, o card mostra `43%`.

**Teste / validação.** `npm test` (teste F14).

**Dependências.** Nenhuma (usa o campo `completed` dos dados).

**Possíveis conflitos.** Nenhum.

**Orientação.** Procure a região `[F14]` em cada arquivo (entre `[F14]` e `[/F14]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F14` em `js/data.js`. Evite dividir por zero. `Math.round` arredonda ao inteiro mais próximo.

---

## [F15] Filtrar tarefas concluídas

| | |
|---|---|
| **Rodada** | 2 — APIs, dados e regras |
| **Dupla responsável** | Dupla 05 |
| **Branch sugerida** | `feature/15-filtro-concluidas` |
| **Tempo estimado** | 4 min |
| **Arquivos a alterar** | `js/filters.js` |

**Descrição.** Fazer a opção "Concluídas" do seletor de tarefas mostrar somente as tarefas concluídas.

**Objetivo técnico.** `Array.prototype.filter` com campo booleano.

**Objetivo pedagógico.** Funções simples e coesas facilitam revisão rápida.

**Contrato (assinatura que não pode mudar).**

```text
filterCompletedTodos(todos) → object[]   (já ligada ao seletor por `applyTodoFilter`)
```

**Critérios de aceitação.**

- [ ] Retorna só tarefas com `completed === true`.
- [ ] Mantém a ordem original.
- [ ] `applyTodoFilter(todos, "completed")` passa a funcionar.
- [ ] O teste `F15` passa sem estar "skipped".

**Exemplo de comportamento esperado.** Escolher "Concluídas" → todas as tarefas listadas aparecem riscadas (✔).

**Teste / validação.** `npm test` (teste F15).

**Dependências.** Nenhuma.

**Possíveis conflitos.** F16 edita a região vizinha; não mexa nela.

**Orientação.** Procure a região `[F15]` em cada arquivo (entre `[F15]` e `[/F15]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F15` em `js/filters.js`. O seletor `#todo-status` já está ligado: você só implementa a função.

---

## [F16] Filtrar tarefas pendentes

| | |
|---|---|
| **Rodada** | 2 — APIs, dados e regras |
| **Dupla responsável** | Dupla 06 |
| **Branch sugerida** | `feature/16-filtro-pendentes` |
| **Tempo estimado** | 4 min |
| **Arquivos a alterar** | `js/filters.js` |

**Descrição.** Fazer a opção "Pendentes" do seletor de tarefas mostrar somente as tarefas ainda não concluídas.

**Objetivo técnico.** `filter` com negação do campo booleano.

**Objetivo pedagógico.** Comparar com a F15 e revisar o PR de outra dupla procurando inversões de lógica.

**Contrato (assinatura que não pode mudar).**

```text
filterPendingTodos(todos) → object[]   (já ligada ao seletor por `applyTodoFilter`)
```

**Critérios de aceitação.**

- [ ] Retorna só tarefas com `completed === false`.
- [ ] Mantém a ordem original.
- [ ] `applyTodoFilter(todos, "pending")` passa a funcionar.
- [ ] O teste `F16` passa sem estar "skipped".

**Exemplo de comportamento esperado.** Escolher "Pendentes" → nenhuma tarefa aparece riscada.

**Teste / validação.** `npm test` (teste F16).

**Dependências.** Nenhuma.

**Possíveis conflitos.** F15 edita a região vizinha; não mexa nela.

**Orientação.** Procure a região `[F16]` em cada arquivo (entre `[F16]` e `[/F16]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F16` em `js/filters.js`. É o oposto da F15.

---

## [F17] Limitar a quantidade de registros exibidos

| | |
|---|---|
| **Rodada** | 2 — APIs, dados e regras |
| **Dupla responsável** | Dupla 07 |
| **Branch sugerida** | `feature/17-limitar-registros` |
| **Tempo estimado** | 5 min |
| **Arquivos a alterar** | `js/filters.js` |

**Descrição.** Limitar a quantidade de usuários exibidos conforme o seletor "Registros exibidos".

**Objetivo técnico.** `slice`, conversão de tipos (`Number`) e validação de entradas inválidas.

**Objetivo pedagógico.** Tratar entradas inesperadas (negativo, texto) sem quebrar a aplicação.

**Contrato (assinatura que não pode mudar).**

```text
limitRecords(list, max) → any[]   (max ≤ 0 ou inválido = sem limite)
```

**Critérios de aceitação.**

- [ ] `limitRecords([1,2,3,4,5], 2)` → `[1,2]`.
- [ ] `0`, negativos, texto e números maiores que o tamanho devolvem a lista inteira.
- [ ] A lista recebida não é alterada.
- [ ] O teste `F17` passa sem estar "skipped".

**Exemplo de comportamento esperado.** Escolher "5" → no máximo 5 usuários na página.

**Teste / validação.** `npm test` (teste F17).

**Dependências.** Nenhuma.

**Possíveis conflitos.** F27 (paginação) também reduz a quantidade exibida: o limite é aplicado antes da paginação. Não altere `applyFilters`.

**Orientação.** Procure a região `[F17]` em cada arquivo (entre `[F17]` e `[/F17]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F17` em `js/filters.js`. `Number.isInteger` ajuda a validar.

---

## [F18] Formatar nomes dos usuários

| | |
|---|---|
| **Rodada** | 2 — APIs, dados e regras |
| **Dupla responsável** | Dupla 08 |
| **Branch sugerida** | `feature/18-formatar-nomes` |
| **Tempo estimado** | 8 min |
| **Arquivos a alterar** | `js/formatters.js` |

**Descrição.** Padronizar o nome exibido: remover Mr./Mrs./Ms./Dr., colapsar espaços e capitalizar cada palavra.

**Objetivo técnico.** Expressões regulares simples, `split/map/join` e manipulação de strings.

**Objetivo pedagógico.** Escrever primeiro os exemplos (casos de teste) e depois a regra.

**Contrato (assinatura que não pode mudar).**

```text
formatUserName(name) → string
```

**Critérios de aceitação.**

- [ ] `Mrs. Dennis Schulist` → `Dennis Schulist`.
- [ ] `  dr.   ana   MARIA  silva ` → `Ana Maria Silva`.
- [ ] `LEANNE graham` → `Leanne Graham`.
- [ ] `Nicholas Runolfsdottir V` permanece igual.
- [ ] Texto vazio → vazio.
- [ ] O teste `F18` passa sem estar "skipped".

**Exemplo de comportamento esperado.** Na lista, "Mrs. Dennis Schulist" aparece como "Dennis Schulist".

**Teste / validação.** `npm test` (teste F18).

**Dependências.** Nenhuma. A lista de usuários já chama esta função.

**Possíveis conflitos.** Nenhum.

**Orientação.** Procure a região `[F18]` em cada arquivo (entre `[F18]` e `[/F18]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F18` em `js/formatters.js`. `/^(mr|mrs|ms|dr)\.?\s+/i` reconhece o tratamento no início do texto.

---

## [F19] Tratar falhas de requisição HTTP

| | |
|---|---|
| **Rodada** | 2 — APIs, dados e regras |
| **Dupla responsável** | Dupla 09 |
| **Branch sugerida** | `feature/19-erros-http` |
| **Tempo estimado** | 10 min |
| **Arquivos a alterar** | `js/api.js` |

**Descrição.** Tratar respostas HTTP de erro e mostrar mensagens amigáveis ao usuário.

**Objetivo técnico.** Verificar `response.ok`, lançar `HttpError` e mapear erros em mensagens (`instanceof`).

**Objetivo pedagógico.** Falhar de forma explícita e comunicar a falha de modo compreensível.

**Contrato (assinatura que não pode mudar).**

```text
fetchJSON(url, fetchFn) lança HttpError(status) se !ok  ·  describeError(error) → string
```

**Critérios de aceitação.**

- [ ] Resposta com `ok:false` lança `HttpError` com `status`.
- [ ] 404 → `Recurso não encontrado (404).`
- [ ] 500 ou mais → mensagem que contém o código (ex.: `500`).
- [ ] Outro status → mensagem que contém o código.
- [ ] `TypeError` (sem rede) → mensagem que contém "conexão".
- [ ] Qualquer outro erro → `Erro inesperado ao carregar os dados.`
- [ ] O teste `F19` passa sem estar "skipped".

**Exemplo de comportamento esperado.** Em `describeError(new HttpError(404))` → "Recurso não encontrado (404).".

**Teste / validação.** `npm test` (teste F19).

**Dependências.** Nenhuma. `fetchJSON` é usada por F11–F13 e pela leitura do mock.

**Possíveis conflitos.** Altera `fetchJSON`, usada por F11, F12, F13 e F20: preserve a assinatura.

**Orientação.** Procure a região `[F19]` em cada arquivo (entre `[F19]` e `[/F19]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F19` em `js/api.js`. `HttpError` já existe no arquivo. `error instanceof HttpError` diferencia os tipos.

---

## [F20] Implementar fallback para dados locais

| | |
|---|---|
| **Rodada** | 2 — APIs, dados e regras |
| **Dupla responsável** | Dupla 10 |
| **Branch sugerida** | `feature/20-fallback-local` |
| **Tempo estimado** | 10 min |
| **Arquivos a alterar** | `js/api.js` |

**Descrição.** Se a API falhar, carregar automaticamente os dados locais de `data/mock.json`.

**Objetivo técnico.** `try/catch`, `Promise.all` e validação do formato da resposta.

**Objetivo pedagógico.** Resiliência: o sistema continua útil quando uma dependência externa falha.

**Contrato (assinatura que não pode mudar).**

```text
loadWithFallback(fetchFn) → Promise<{ users, posts, todos, source: "remote" | "local" }>
```

**Critérios de aceitação.**

- [ ] Se qualquer chamada à API lançar erro ou não devolver lista, retorna os dados locais com `source: "local"`.
- [ ] Se todas as chamadas devolverem listas, retorna `source: "remote"`.
- [ ] Funciona mesmo que F11–F13 ainda devolvam `null` (contrato inicial).
- [ ] O teste `F20` passa sem estar "skipped".

**Exemplo de comportamento esperado.** Desligar a internet e recarregar → a página mostra os dados `[local]`.

**Teste / validação.** `npm test` (teste F20 simula falha de rede).

**Dependências.** Usa `fetchUsers`, `fetchPosts`, `fetchTodos` (F11–F13) pelo contrato; a versão inicial delas devolve `null`.

**Possíveis conflitos.** Regiões vizinhas em `api.js`. A origem é exibida por F30.

**Orientação.** Procure a região `[F20]` em cada arquivo (entre `[F20]` e `[/F20]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F20` em `js/api.js`. `Array.isArray` verifica se o retorno é uma lista. Dentro do `catch`, chame `loadLocalData`.

---

## [F21] Criar botão de atualizar dados

| | |
|---|---|
| **Rodada** | 3 — Interações e melhorias |
| **Dupla responsável** | Dupla 01 |
| **Branch sugerida** | `feature/21-botao-atualizar` |
| **Tempo estimado** | 9 min |
| **Arquivos a alterar** | `js/components.js`, `js/events.js`, `index.html` |

**Descrição.** Adicionar o botão "Atualizar dados", que recarrega os dados e indica que está ocupado.

**Objetivo técnico.** HTML, evento de clique assíncrono (`async/await`) e atualização do estado visual do botão.

**Objetivo pedagógico.** Integrar HTML + JS + função pura em uma pequena funcionalidade completa.

**Contrato (assinatura que não pode mudar).**

```text
setButtonBusy(button, busy)  ·  botão `id="btn-refresh"`
```

**Critérios de aceitação.**

- [ ] `index.html` contém um botão com `id="btn-refresh"` dentro da região `[F21]`.
- [ ] Ocupado: `disabled === true` e texto `Atualizando…`; livre: `disabled === false` e texto `Atualizar dados`.
- [ ] Ao clicar, chama `ctx.refresh()` e restaura o botão ao final.
- [ ] O teste `F21` passa sem estar "skipped".

**Exemplo de comportamento esperado.** Clicar no botão → o texto muda para "Atualizando…" e o "Última atualização" muda.

**Teste / validação.** `npm test` (teste F21) + teste manual.

**Dependências.** Nenhuma.

**Possíveis conflitos.** F07 usa a região vizinha `[F07]` do mesmo bloco de `index.html`.

**Orientação.** Procure a região `[F21]` em cada arquivo (entre `[F21]` e `[/F21]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F21` em `js/components.js`. Dentro de `bindRefreshButton`, use `await` para só restaurar o botão depois do `refresh`.

---

## [F22] Implementar alternância entre tema claro e escuro

| | |
|---|---|
| **Rodada** | 3 — Interações e melhorias |
| **Dupla responsável** | Dupla 02 |
| **Branch sugerida** | `feature/22-tema-claro-escuro` |
| **Tempo estimado** | 10 min |
| **Arquivos a alterar** | `js/components.js`, `js/events.js`, `index.html`, `css/base.css` |

**Descrição.** Alternar entre tema claro e escuro por um botão no cabeçalho.

**Objetivo técnico.** Atributo `data-theme` no `<html>`, variáveis CSS e funções de alternância.

**Objetivo pedagógico.** Colaboração com conflito previsto: a F29 também usa o bloco `header-actions`.

**Contrato (assinatura que não pode mudar).**

```text
toggleTheme(current) → "light" | "dark"  ·  applyTheme(theme, root) → tema aplicado  ·  botão `id="btn-theme"`  ·  CSS para o tema escuro em `css/base.css`
```

**Critérios de aceitação.**

- [ ] `toggleTheme("light")` → `dark`; `toggleTheme("dark")` → `light`.
- [ ] `applyTheme("dark", root)` define `root.dataset.theme = "dark"`; tema inválido vira `light`.
- [ ] `index.html` contém `id="btn-theme"` no bloco `header-actions`.
- [ ] `css/base.css` redefine as variáveis para o tema escuro.
- [ ] O teste `F22` passa sem estar "skipped".

**Exemplo de comportamento esperado.** Clicar em "Alternar tema" → fundo escuro com texto claro.

**Teste / validação.** `npm test` (teste F22) + teste manual.

**Dependências.** Nenhuma. F23 guarda a escolha (usa `ctx.onThemeChange`, já pronto).

**Possíveis conflitos.** **Conflito previsto com F29**: ambas substituem a mesma linha de comentário em `index.html` (`header-actions`).

**Orientação.** Procure a região `[F22]` em cada arquivo (entre `[F22]` e `[/F22]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F22` em `js/components.js`. Use `ctx.onThemeChange(...)` no clique: ele atualiza o estado e chama a gravação da F23.

---

## [F23] Salvar preferência de tema no localStorage

| | |
|---|---|
| **Rodada** | 3 — Interações e melhorias |
| **Dupla responsável** | Dupla 03 |
| **Branch sugerida** | `feature/23-tema-localstorage` |
| **Tempo estimado** | 7 min |
| **Arquivos a alterar** | `js/data.js` |

**Descrição.** Salvar a preferência de tema no `localStorage` e restaurá-la ao abrir a página.

**Objetivo técnico.** `localStorage` com tratamento de erro (`try/catch`) e validação do valor lido.

**Objetivo pedagógico.** Armazenamento do navegador pode falhar (modo privado): o app não pode quebrar.

**Contrato (assinatura que não pode mudar).**

```text
saveTheme(theme, storage)  ·  loadTheme(storage) → "light" | "dark"   (chave `THEME_KEY`)
```

**Critérios de aceitação.**

- [ ] `saveTheme("dark", storage)` grava em `THEME_KEY`; valores fora de `THEMES` não são gravados.
- [ ] `loadTheme` devolve o valor salvo se válido; senão `light`.
- [ ] Se `storage` lançar erro, `loadTheme` devolve `light` e `saveTheme` não lança.
- [ ] O teste `F23` passa sem estar "skipped".

**Exemplo de comportamento esperado.** Escolher o tema escuro, recarregar a página → continua escuro.

**Teste / validação.** `npm test` (teste F23 usa storage falso).

**Dependências.** Para ver na tela, depende da F22. O teste é independente.

**Possíveis conflitos.** Nenhum (região própria em `data.js`).

**Orientação.** Procure a região `[F23]` em cada arquivo (entre `[F23]` e `[/F23]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F23` em `js/data.js`. `THEMES` e `THEME_KEY` estão no topo de `data.js`.

---

## [F24] Criar validação de campo de busca

| | |
|---|---|
| **Rodada** | 3 — Interações e melhorias |
| **Dupla responsável** | Dupla 04 |
| **Branch sugerida** | `feature/24-validar-busca` |
| **Tempo estimado** | 8 min |
| **Arquivos a alterar** | `js/validators.js` |

**Descrição.** Validar o texto da busca e mostrar uma mensagem de erro abaixo do campo quando for inválido.

**Objetivo técnico.** Expressões regulares com Unicode (`\p{L}`), retorno estruturado `{ valid, message, value }`.

**Objetivo pedagógico.** Validar entrada do usuário antes de usá-la.

**Contrato (assinatura que não pode mudar).**

```text
validateSearch(query) → { valid: boolean, message: string, value: string }
```

**Critérios de aceitação.**

- [ ] Após `trim`, mais de 40 caracteres → inválido, mensagem contendo `40`.
- [ ] Aceita letras com acento, espaço, apóstrofo, ponto e hífen (`O'Neil`, `Maria-José`).
- [ ] Dígitos e símbolos (`ana123`, `<b>`) → inválido, mensagem contendo `letras`.
- [ ] Texto vazio é válido. `value` volta sem espaços nas pontas.
- [ ] O teste `F24` passa sem estar "skipped".

**Exemplo de comportamento esperado.** Digitar `ana123` → aparece "Use apenas letras…" abaixo do campo e a lista não muda.

**Teste / validação.** `npm test` (teste F24) + digitar no campo.

**Dependências.** Nenhuma. O campo já chama `validateSearch` (`events.js`).

**Possíveis conflitos.** Nenhum.

**Orientação.** Procure a região `[F24]` em cada arquivo (entre `[F24]` e `[/F24]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F24` em `js/validators.js`. `/^[\p{L}\s'.-]*$/u` reconhece letras de qualquer idioma.

---

## [F25] Criar filtro combinado

| | |
|---|---|
| **Rodada** | 3 — Interações e melhorias |
| **Dupla responsável** | Dupla 05 |
| **Branch sugerida** | `feature/25-filtro-combinado` |
| **Tempo estimado** | 10 min |
| **Arquivos a alterar** | `js/filters.js` |

**Descrição.** Combinar nome, cidade e status de tarefas: listar usuários que tenham tarefas concluídas (ou pendentes) respeitando a pesquisa e a cidade.

**Objetivo técnico.** Composição de funções (reuso de F04/F05), `Set` para consulta rápida e `Boolean()` para normalizar o campo.

**Objetivo pedagógico.** Programar contra um contrato enquanto as funções reais ainda não foram integradas.

**Contrato (assinatura que não pode mudar).**

```text
combineFilters(users, todos, { query, city, todoStatus }) → object[]
```

**Critérios de aceitação.**

- [ ] `todoStatus: "all"` não filtra por tarefas.
- [ ] `"completed"` mantém usuários com ao menos uma tarefa concluída (`todo.userId === user.id`).
- [ ] `"pending"` mantém usuários com ao menos uma tarefa pendente.
- [ ] Aplica também `filterByName` e `filterByCity` (testado quando F04 e F05 estão integradas).
- [ ] O teste `F25` passa sem estar "skipped".

**Exemplo de comportamento esperado.** Cidade "Rio de Janeiro" + "pending" → só usuários dessa cidade com alguma tarefa pendente.

**Teste / validação.** `npm test` (teste F25).

**Dependências.** Usa `filterByName` (F04) e `filterByCity` (F05) pelo contrato (versões iniciais devolvem a lista sem filtrar).

**Possíveis conflitos.** Não altere `applyFilters` nem as funções de F04/F05.

**Orientação.** Procure a região `[F25]` em cada arquivo (entre `[F25]` e `[/F25]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F25` em `js/filters.js`. Primeiro filtre por nome e cidade; depois descubra os `userId` que têm tarefas com o status desejado.

---

## [F26] Mostrar detalhes de um usuário

| | |
|---|---|
| **Rodada** | 3 — Interações e melhorias |
| **Dupla responsável** | Dupla 06 |
| **Branch sugerida** | `feature/26-detalhes-usuario` |
| **Tempo estimado** | 10 min |
| **Arquivos a alterar** | `js/data.js`, `js/components.js` |

**Descrição.** Mostrar o painel de detalhes do usuário ao clicar em um item da lista.

**Objetivo técnico.** Agregação de dados (contagens por `userId`), montagem de HTML com escape.

**Objetivo pedagógico.** Separar a regra (dados) da apresentação (HTML) e proteger contra injeção de HTML.

**Contrato (assinatura que não pode mudar).**

```text
getUserDetails(user, posts, todos) → { id, name, email, phone, website, company, city, postCount, todoCount, completedTodoCount }  ·  renderUserDetails(details, el)
```

**Critérios de aceitação.**

- [ ] `getUserDetails` devolve exatamente os campos do contrato (empresa = `user.company.name`, cidade = `user.address.city`).
- [ ] Conta publicações e tarefas do usuário (`userId`) e quantas tarefas estão concluídas.
- [ ] `renderUserDetails(null, el)` esconde o painel e limpa o conteúdo.
- [ ] Todo texto dos dados passa por `escapeHtml`.
- [ ] O teste `F26` passa sem estar "skipped".

**Exemplo de comportamento esperado.** Clicar em "Leanne Graham" → painel com e-mail, empresa, 3 publicações e "x de 4 concluídas".

**Teste / validação.** `npm test` (teste F26) + clicar na lista.

**Dependências.** Nenhuma. O clique já chama as duas funções (`app.js`).

**Possíveis conflitos.** Nenhum.

**Orientação.** Procure a região `[F26]` em cada arquivo (entre `[F26]` e `[/F26]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F26` em `js/data.js`. Use `<dl><dt>…</dt><dd>…</dd></dl>`; o CSS do painel já existe.

---

## [F27] Implementar paginação simples

| | |
|---|---|
| **Rodada** | 3 — Interações e melhorias |
| **Dupla responsável** | Dupla 07 |
| **Branch sugerida** | `feature/27-paginacao` |
| **Tempo estimado** | 10 min |
| **Arquivos a alterar** | `js/filters.js`, `js/components.js` |

**Descrição.** Paginar a lista de usuários (5 por página) e habilitar/desabilitar os botões Anterior/Próxima.

**Objetivo técnico.** Cálculo de páginas, ajuste de limites (clamp) e atualização de botões.

**Objetivo pedagógico.** Casos de borda: página 0, página acima do total, lista vazia.

**Contrato (assinatura que não pode mudar).**

```text
paginate(list, page, pageSize) → { items, page, totalPages, totalItems }  ·  renderPagination(info, { label, prev, next })
```

**Critérios de aceitação.**

- [ ] 11 itens, página 2, tamanho 5 → itens 6–10, `totalPages: 3`.
- [ ] Página acima do total vai para a última; página 0 vai para a 1.
- [ ] Lista vazia → `{ items: [], page: 1, totalPages: 1, totalItems: 0 }`.
- [ ] `renderPagination` escreve `Página X de Y` e desabilita Anterior na 1ª página e Próxima na última.
- [ ] O teste `F27` passa sem estar "skipped".

**Exemplo de comportamento esperado.** Com 10 usuários, a página 1 mostra 5 e "Página 1 de 2".

**Teste / validação.** `npm test` (teste F27) + clicar nos botões.

**Dependências.** Nenhuma. Os botões já estão ligados em `events.js`.

**Possíveis conflitos.** F17 (limitar registros) é aplicado antes da paginação. Não altere `app.js`.

**Orientação.** Procure a região `[F27]` em cada arquivo (entre `[F27]` e `[/F27]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F27` em `js/filters.js`. `Math.ceil(total / tamanho)` dá o número de páginas; `slice(inicio, fim)` pega os itens.

---

## [F28] Exibir aviso de operação bem-sucedida

| | |
|---|---|
| **Rodada** | 3 — Interações e melhorias |
| **Dupla responsável** | Dupla 08 |
| **Branch sugerida** | `feature/28-aviso-sucesso` |
| **Tempo estimado** | 6 min |
| **Arquivos a alterar** | `js/components.js`, `css/components.css` |

**Descrição.** Exibir um aviso verde de sucesso na área de mensagens quando os dados forem atualizados.

**Objetivo técnico.** Manipulação de classes CSS, reutilização de variáveis de cor existentes.

**Objetivo pedagógico.** Comparar com `showError` (já existente) e manter consistência visual.

**Contrato (assinatura que não pode mudar).**

```text
showSuccess(text, el)  ·  classe CSS `.message-success`
```

**Critérios de aceitação.**

- [ ] `el.textContent` recebe o texto informado.
- [ ] `el.className` contém `message-success` e `el.hidden === false`.
- [ ] `css/components.css` define `.message-success` usando `--success-bg` e `--success-text`.
- [ ] O teste `F28` passa sem estar "skipped".

**Exemplo de comportamento esperado.** Abrir a página → faixa verde "Dados atualizados com sucesso.".

**Teste / validação.** `npm test` (teste F28).

**Dependências.** Nenhuma. `app.js` já chama `showSuccess`.

**Possíveis conflitos.** F29 edita outra região de `components.css`; sem conflito de texto.

**Orientação.** Procure a região `[F28]` em cada arquivo (entre `[F28]` e `[/F28]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F28` em `js/components.js`. Copie a estrutura de `showError` e troque a classe.

---

## [F29] Criar botão de voltar ao início

| | |
|---|---|
| **Rodada** | 3 — Interações e melhorias |
| **Dupla responsável** | Dupla 09 |
| **Branch sugerida** | `feature/29-voltar-ao-inicio` |
| **Tempo estimado** | 8 min |
| **Arquivos a alterar** | `js/components.js`, `js/events.js`, `index.html`, `css/components.css` |

**Descrição.** Adicionar um botão "Voltar ao início" no cabeçalho, visível só depois de rolar a página.

**Objetivo técnico.** Evento `scroll`, `window.scrollY`, `scrollTo` com rolagem suave.

**Objetivo pedagógico.** Conflito previsto com F22: aprender a resolver duas alterações legítimas na mesma linha.

**Contrato (assinatura que não pode mudar).**

```text
shouldShowBackToTop(scrollY, threshold = 300) → boolean  ·  scrollToTop(win)  ·  botão `id="btn-top"` (começa com `hidden`)
```

**Critérios de aceitação.**

- [ ] `shouldShowBackToTop(301)` → `true`; `(300)` e `(0)` → `false`; aceita limite personalizado.
- [ ] `scrollToTop(win)` chama `win.scrollTo({ top: 0, behavior: "smooth" })`.
- [ ] `index.html` contém `id="btn-top"` no bloco `header-actions`.
- [ ] O botão aparece ao rolar e leva ao topo ao clicar.
- [ ] O teste `F29` passa sem estar "skipped".

**Exemplo de comportamento esperado.** Rolar 400 px → botão "↑ Início" aparece; clicar → volta ao topo.

**Teste / validação.** `npm test` (teste F29) + teste manual.

**Dependências.** Nenhuma.

**Possíveis conflitos.** **Conflito previsto com F22**: ambas substituem a mesma linha de comentário em `index.html` (`header-actions`). Se a F22 for integrada primeiro, atualize sua branch e resolva mantendo os dois botões.

**Orientação.** Procure a região `[F29]` em cada arquivo (entre `[F29]` e `[/F29]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F29` em `js/components.js`. No navegador, o evento é `window.addEventListener("scroll", ...)`. Para o conflito, veja `docs/CONFLITOS.md`.

---

## [F30] Adicionar indicador de dados locais ou remotos

| | |
|---|---|
| **Rodada** | 3 — Interações e melhorias |
| **Dupla responsável** | Dupla 10 |
| **Branch sugerida** | `feature/30-indicador-origem` |
| **Tempo estimado** | 6 min |
| **Arquivos a alterar** | `js/components.js` |

**Descrição.** Indicar no rodapé se os dados exibidos são locais (mock.json) ou remotos (API).

**Objetivo técnico.** Mapeamento de valores em texto, `dataset` para marcar o estado no DOM.

**Objetivo pedagógico.** Tornar visível uma decisão invisível do sistema (de onde vêm os dados).

**Contrato (assinatura que não pode mudar).**

```text
describeSource(source) → string  ·  renderSourceIndicator(source, el = document.getElementById("data-source"))
```

**Critérios de aceitação.**

- [ ] `local` → `Dados locais (mock.json)`; `remote` → `Dados remotos (API)`; outro valor → `Origem desconhecida`.
- [ ] `renderSourceIndicator` escreve o texto em `el` e grava `el.dataset.source`.
- [ ] O teste `F30` passa sem estar "skipped".

**Exemplo de comportamento esperado.** Sem internet: rodapé mostra "Dados locais (mock.json)".

**Teste / validação.** `npm test` (teste F30).

**Dependências.** Para ver "remoto" na tela, depende de F11–F13 e F20. O teste é independente.

**Possíveis conflitos.** Nenhum (região própria em `components.js`).

**Orientação.** Procure a região `[F30]` em cada arquivo (entre `[F30]` e `[/F30]`) e edite **somente ela**. Ao concluir, apague a linha `NOT_IMPLEMENTED:F30` em `js/components.js`. O estado do app já guarda `source` com `local` ou `remote`.
