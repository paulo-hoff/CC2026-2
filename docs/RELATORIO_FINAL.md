# Relatório Final Individual

Laboratório de Desenvolvimento Colaborativo com GitHub e CI/CD

**Como responder:** baseie-se no que **você viveu** na atividade. Cite funcionalidades, arquivos, números de PR, mensagens da pipeline e trechos de código. Respostas com definições copiadas da internet, sem relação com a sua experiência, valem pouco. Cada resposta deve ter entre 5 e 12 linhas.

## Identificação

| Campo | Preenchimento |
|---|---|
| Nome completo | Rafael Ribeiro dos Santos |
| Usuário no GitHub | RafaelRibeiroBR |
| Dupla (nº) e colega | Dupla 01 João Guilherme Silva de Moraes |
| Integrante (A ou B) | B |
| Data | 16/11/2026 |

## Minhas funcionalidades e links

| Rodada | Funcionalidade (ID e título) | Papel (autor / co-autor / revisor) | Link do PR |
|:---:|---|---|---|
| 1 | F01 Exibir Contador de Usuários | Revisor | https://github.com/paulo-hoff/CC2026-2/pull/40 |
| 2 | F11 Buscar Usuários por API | Autor | https://github.com/paulo-hoff/CC2026-2/pull/44 |
| 3 |F21 Criar Botão de Atualizar Dados | Revisor | nada |

**PRs de outras duplas que revisei** (link e decisão: Approve / Request changes):

1.
2.

---

## Perguntas

### 1. Organização de branches
**Por que o projeto utiliza `main`, `develop` e branches de funcionalidades? Qual é a responsabilidade de cada uma?**

*Resposta:*
 A main mantém o código na sua forma segura e develop é onde fica toda a parte com funções do código pra gente copiar ela e editá-la com as nossas implementações
<br>

### 2. Colaboração
**Qual foi sua contribuição para o projeto e quais arquivos ou funcionalidades você modificou?**

*Resposta:*
Eu fiz a Função 11 onde deveria buscar usuários atráves da API e editei o arquivo api.js e modifiquei a F11
<br>

### 3. Pull Request
**Qual é a finalidade de um Pull Request? Por que não é recomendado realizar alterações diretamente na branch principal?**

*Resposta:*
O PR serve como forma de enviar a sua atualização da sua branch para o github onde terá alguém para verificar se ela não conflita com algo de outra Branch, e não se deve mandar PRs direto na Main pois é lá que fica toda a parte principal do código
<br>

### 4. Code review
**Você revisou o código de outro colega? Que problema, melhoria ou cuidado identificou durante a revisão?**

*Resposta:*
Revisei o código da minha dupla, houve alguns gargálos no processo mas que foram resolvidos e pessoalmente eu diria que para a situação em que estava ele não agiu mal, pelo contrário o tempo que ele levou para fazer algo fora da sua zona de conforto foi excelente.
<br>

### 5. Conflitos
**Você encontrou ou acompanhou algum conflito de merge? Explique o que provocou esse conflito e como ele foi resolvido.**

*Resposta:*
O merge inicialmente estava correto mas houve a indicação do professor  de que algo na descrição e título estavam erradas e ele mesmo fez o merge do computador dele
<br>

### 6. Atualização de branches
**O que pode acontecer quando uma branch de funcionalidade permanece desatualizada em relação à `develop`?**

*Resposta:*
Corre um risco enorme de quebrar o código dando conflito com alguma alteração não prevista, tanto antiga quanto nova(caso estejam mexendo na mesma branch e partes diferentes)
<br>

### 7. Integração contínua
**Quais verificações foram executadas pela pipeline de CI? Por que essas verificações são importantes antes de integrar uma alteração?**

*Resposta:*
Foram feitos testes para verificar se a cada funcionalidade funciona
<br>

### 8. Falhas da pipeline
**O que acontece quando um teste automatizado falha? Como o desenvolvedor deve proceder para corrigir o problema?**

*Resposta:*
Quando houver uma falha ela deve ser corrigida, e alguém neste caso o revisor(se eu entendi corretamente) deve verificar o erro e orientar a correção para depois fazer o teste novamente
<br>

### 9. Entrega contínua
**Como o código desenvolvido pelos alunos chegou à versão publicada? Qual é a diferença entre CI e CD nesse processo?**

*Resposta:*
O código chegou através dos PRs que foram analisadas antes de enviar o merge, o CI verfica o código para ver se tá funcionando e o CD prepara o código para ser enviado ao ambiente final
<br>

### 10. Reflexão sobre trabalho em equipe
**Qual foi a maior dificuldade encontrada ao trabalhar com vários desenvolvedores no mesmo projeto? O que você faria de maneira diferente em um projeto profissional?**

*Resposta:*
Neste projeto em específico eu diria que foi o acompanhamento, pessoalmente eu demorei para acompanhar o processo dele pois o que eu surgiria normalmente já havia sido pensado ou verificado, mas gostaria de usar outro projeto de exemplo sobre trabalho em equipe.
Havia uma AS do Saraiva onde deveriamos fazer um jogo e durante o processo de criação a gente se deparou com vários problemas durante a produção pois a gente eventualmente acabava mexendo em algo que ambos modificaram e ao fazer o merge dava muitos conflitos, então outro desenvolvedor mexendo em partes em conjunto com a sua é horrível 
<br>

---

## Declaração

Declaro que as respostas descrevem a minha participação e que as evidências citadas (PRs, commits e execuções da pipeline) são reais.

Assinatura (nome): ______________________________
