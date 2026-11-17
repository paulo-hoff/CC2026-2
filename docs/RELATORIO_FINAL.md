# Relatório Final Individual

Laboratório de Desenvolvimento Colaborativo com GitHub e CI/CD

**Como responder:** baseie-se no que **você viveu** na atividade. Cite funcionalidades, arquivos, números de PR, mensagens da pipeline e trechos de código. Respostas com definições copiadas da internet, sem relação com a sua experiência, valem pouco. Cada resposta deve ter entre 5 e 12 linhas.

## Identificação

| Campo | Preenchimento |
|---|---|
| Nome completo | Marcus Vinicius Carneiro da Silva |
| Usuário no GitHub | omarcusviniciuz |
| Dupla (nº) e colega | 3 |
| Integrante (A ou B) | B |
| Data | 16/11/2004 |

## Minhas funcionalidades e links

| Rodada | Funcionalidade (ID e título) | Papel (autor / coautor / revisor) | Link do PR |
|:---:|---|---|---|
| 1 | [F03] Exibir contador de tarefas | Otavio/Marcus/Marcus | https://github.com/paulo-hoff/CC2026-2/issues/3 |
| 2 | [F13] Buscar tarefas na API | Otavio/Marcus/Marcus | https://github.com/paulo-hoff/CC2026-2/issues/13 |
| 3 | [F23] Salvar preferência de tema no localStorage | Otavio/Marcus/Marcus | https://github.com/paulo-hoff/CC2026-2/issues/23 |

**PRs de outras duplas que revisei** (link e decisão: Approve / Request changes):

1. [F03] Exibir contador de tarefas
2. [F23] Salvar preferência de tema no localStorage

---

## Perguntas

### 1. Organização de branches

**Por que o projeto utiliza `main`, `develop` e branches de funcionalidades? Qual é a responsabilidade de cada uma?**

As branches de funcionalidade são branches para testes isolados. A branch develop é usada para reunir novidades aprovadas. Já a main guarda o código final e concluído para o cliente!

### 2. Colaboração

**Qual foi sua contribuição para o projeto e quais arquivos ou funcionalidades você modificou?**

Eu contribuí fazendo: ([F13] Buscar tarefas na API), implementando a funcionalidade, e também fiz a revisão de 2 tarefas da minha dupla, juntamente com o merge!

### 3. Pull Request

**Qual é a finalidade de um Pull Request? Por que não é recomendado realizar alterações diretamente na branch principal?**

É conversar e revisar uma sequência de alterações feitas nos códigos.

### 4. Code review

**Você revisou o código de outro colega? Que problema, melhoria ou cuidado identificou durante a revisão?**

Sim, revisei! O código atendia aos requisitos solicitados e não tenho sugestões de melhoria!

### 5. Conflitos

**Você encontrou ou acompanhou algum conflito de merge? Explique o que provocou esse conflito e como ele foi resolvido.**

Sim! Uma outra dupla subiu um PR para a nossa tarefa, quando fomos tentar realizar o PR, foi constatado que tínhamos que ter as dependências deles.

Resolução: o professor auxiliou e usamos um comando com --force para sobrescrever o arquivo.

### 6. Atualização de branches

**O que pode acontecer quando uma branch de funcionalidade permanece desatualizada em relação à `develop`?**

Pode prejudicar bastante o código, por conta de que, quanto mais tempo sem atualização, maior a chance de ter bugs de conflito e atrasos nas entregas!

### 7. Integração contínua

**Quais verificações foram executadas pela pipeline de CI? Por que essas verificações são importantes antes de integrar uma alteração?**

Se a funcionalidade era atendida e o checklist de requisitos estava completo!

### 8. Falhas da pipeline

**O que acontece quando um teste automatizado falha? Como o desenvolvedor deve proceder para corrigir o problema?**

O Dev lê e identifica se o problema é no teste ou diretamente na aplicação.

### 9. Entrega contínua

**Como o código desenvolvido pelos alunos chegou à versão publicada? Qual é a diferença entre CI e CD nesse processo?**

A diferença é que o CI faz a entrega contínua e implementa já o CD entrega e disponibiliza depois de pronto!

### 10. Reflexão sobre trabalho em equipe

**Qual foi a maior dificuldade encontrada ao trabalhar com vários desenvolvedores no mesmo projeto? O que você faria de maneira diferente em um projeto profissional?**

A maior dificuldade foi a organização do que cada um iria fazer. Faria uma reunião com todos os envolvidos do projeto e faria um checklist completo do que fazer e não fazer!

---

## Declaração

Declaro que as respostas descrevem a minha participação e que as evidências citadas (PRs, commits e execuções da pipeline) são reais.

Assinatura (nome): Marcus Carneiro
