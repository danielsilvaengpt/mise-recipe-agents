# COMANDOS.md — Guia de Comandos para o Agente Mise

> **Instruções ao Agente:** Este documento define a especificação e o comportamento exato que deves adotar quando o utilizador utilizar os comandos especiais no chat. Não desvies deste protocolo.

---

## 1. Comando `/phase <número>`

### Propósito
O comando `/phase <número>` (por exemplo: `/phase V2.0`, `/phase V2.1`, ou `/phase 0`) serve para ordenar a **implementação integral de uma fase específica** descrita no [TASKS.md](file:///c:/Users/danie/Desktop/mise-recipe-agents/landing/TASKS.md).

### Protocolo de Execução Obrigatório
Sempre que receberes este comando, segue rigorosamente estes 5 passos sem saltar nenhum:

1. **Leitura Prévia:**
   - Consulta o ficheiro [MEMORY.md](file:///c:/Users/danie/Desktop/mise-recipe-agents/landing/MEMORY.md) para saber o contexto atual do projeto.
   - Consulta a secção da fase solicitada em [TASKS.md](file:///c:/Users/danie/Desktop/mise-recipe-agents/landing/TASKS.md).
   - Relembra os padrões estéticos em [DESIGN.md](file:///c:/Users/danie/Desktop/mise-recipe-agents/landing/DESIGN.md) e os textos em [CONTENT.md](file:///c:/Users/danie/Desktop/mise-recipe-agents/landing/CONTENT.md).

2. **Implementação de Código:**
   - Cria ou edita os ficheiros de código necessários para cumprir todos os itens da fase.
   - Não adiciones bibliotecas ou padrões desnecessários fora do escopo.
   - Garante código limpo, sem `any`, com tipagem TypeScript e acessibilidade.

3. **Verificação de Compilação:**
   - Executa no terminal:
     ```powershell
     npm run build
     ```
   - O comando deve terminar com **zero erros e zero avisos de TypeScript**. Se houver algum erro, corrige-o de imediato antes de prosseguir.

4. **Atualização Automática dos Ficheiros de Documentação:**
   - **No `TASKS.md`:** Altera os itens concluídos de `- [ ]` para `- [x]`.
   - **No `MEMORY.md`:**
     - Atualiza a **Secção 1 (Estado atual)** com a fase recém-concluída.
     - Atualiza a **Secção 2 (Próximo passo)** apontando para a fase seguinte.
     - Adiciona a entrada na **Secção 3 (Feito)** resumindo o que foi construído.
     - Insere uma nova linha na tabela da **Secção 7 (Registo de sessões)** com data, resumo e confirmação do build limpo.

5. **Relatório ao Utilizador:**
   - Responde com uma mensagem concisa, estruturada em:
     - **Resumo da Fase:** O que foi implementado.
     - **Ficheiros Criados / Modificados:** Lista clicável de ficheiros.
     - **Estado do Build:** Resultado do `npm run build`.
     - **Próximo Passo Sugerido:** Indicação da próxima fase pronta para o comando seguinte.

---

## 2. Comando `/new <descrição>`

### Propósito
O comando `/new <descrição>` (por exemplo: `/new Adicionar filtro por tempo de confeção no histórico` ou `/new Botão de exportação da receita em PDF com selo oficial`) serve para **criar novas funcionalidades, alterar regras de negócio ou ajustar requisitos de design** que não estavam originalmente previstos.

### Protocolo de Execução Obrigatório
Sempre que receberes este comando, o teu dever primordial é **manter a integridade de todos os ficheiros de especificação**:

1. **Análise de Impacto:**
   - Avalia a funcionalidade pedida e determina que áreas do ecossistema são afetadas (textos, design visual, tarefas, chamadas de API ou modelo de dados).

2. **Atualização em Cadeia dos Ficheiros `.md`:**
   - **Se envolver novos textos, botões ou rótulos:**
     - Atualiza primeiro o [CONTENT.md](file:///c:/Users/danie/Desktop/mise-recipe-agents/landing/CONTENT.md) em Português de Portugal.
   - **Se envolver novas diretrizes visuais ou componentes:**
     - Atualiza o [DESIGN.md](file:///c:/Users/danie/Desktop/mise-recipe-agents/landing/DESIGN.md) documentando a estética, estados interativos e animações correspondentes.
   - **Se exigir novas tarefas de desenvolvimento:**
     - Insere as novas tarefas no [TASKS.md](file:///c:/Users/danie/Desktop/mise-recipe-agents/landing/TASKS.md), quer como uma sub-tarefa na fase em curso, quer como uma nova fase específica.
   - **Registo no `MEMORY.md`:**
     - Adiciona a decisão e o motivo na **Secção 4 (Decisões tomadas)** com a data do dia.
     - Atualiza o estado em curso se a nova funcionalidade alterar as prioridades imediatas.

3. **Confirmação e Transparência:**
   - Mostra ao utilizador o resumo exato das atualizações efetuadas nos ficheiros `.md`.
   - Se o utilizador desejar avançar logo com a implementação, executa-a mantendo a mesma garantia de compilação sem erros (`npm run build`).

---

## 3. Comando `/auto` (Piloto Automático de Implementação)

### Propósito
O comando `/auto` ativa o **modo de piloto automático total da implementação**. Ao receber este comando, o agente assume a responsabilidade de implementar **todas as fases pendentes do [TASKS.md](file:///c:/Users/danie/Desktop/mise-recipe-agents/landing/TASKS.md) por ordem sequencial** (ex.: Fase V2.0 → Fase V2.1 → Fase V2.2 → Fase V2.3 → Fase V2.4 → Fase V2.5), sem interromper o fluxo desnecessariamente entre fases.

### Protocolo de Execução do Piloto Automático

1. **Autorização Prévia de Comandos de Terminal:**
   - O utilizador autoriza explicitamente a execução de todos os comandos necessários no terminal/PowerShell (como `npm install`, criação de pastas, compilação de testes e verificação de tipos) para avançar a implementação de forma contínua.

2. **Execução Sequencial por Fases:**
   - O agente analisa o `TASKS.md` para identificar a primeira fase ainda não concluída (`[ ]`).
   - Executa rigorosamente as tarefas dessa fase em código de produção.
   - Testa a compilação com `npm run build`.

3. **Atualização Imediata e Obrigatória dos Ficheiros `.md`:**
   - **A cada fase concluída**, antes de avançar para a seguinte, o agente atualiza imperativamente:
     - [TASKS.md](file:///c:/Users/danie/Desktop/mise-recipe-agents/landing/TASKS.md): Marca com `[x]` todas as tarefas terminadas da fase.
     - [MEMORY.md](file:///c:/Users/danie/Desktop/mise-recipe-agents/landing/MEMORY.md): Atualiza a fase atual (Secção 1), o próximo passo (Secção 2), o que foi feito (Secção 3) e insere uma nova linha de registo com estado do build (Secção 7).
     - [CONTENT.md](file:///c:/Users/danie/Desktop/mise-recipe-agents/landing/CONTENT.md) / [DESIGN.md](file:///c:/Users/danie/Desktop/mise-recipe-agents/landing/DESIGN.md): Caso tenham surgido ajustes de componentes ou novos textos em PT-PT.

4. **Regra Inviolável de Segurança (Sandbox do Projeto):**
   - **Isolamento Total:** O agente **SÓ PODE MEXER DENTRO DA PASTA DO PROJETO** (`c:\Users\danie\Desktop\mise-recipe-agents`).
   - É expressamente proibido ler, modificar, criar ou apagar qualquer ficheiro, pasta ou configuração fora desta raiz.
   - Qualquer comando de terminal deve ter como escopo estrito as subpastas do repositório (`landing/`, `backend/`, `web-app/`).

5. **Autocorreção em Caso de Falha:**
   - Se ocorrer algum erro durante a compilação (`npm run build`) ou na execução de um componente, o piloto automático **NÃO salta para a fase seguinte**.
   - O agente analisa o erro, ajusta o código na pasta do projeto e volta a testar o build até garantir **0 erros e 0 avisos** antes de prosseguir.

6. **Relatório de Conclusão Global:**
   - Ao terminar a última fase do plano, o piloto automático conclui com um relatório final estruturado:
     - Lista de todas as fases concluídas.
     - Confirmação de integridade do build.
     - Instruções claras de verificação para o utilizador testar a Web App e a API no browser.

---

## 4. Exemplos Rápidos de Uso

| O que queres fazer? | Comando a escrever | O que o agente faz automaticamente |
|---|---|---|
| **Executar toda a implementação em piloto automático** | `/auto` | Implementa todas as fases por ordem sequencial, aceita comandos no terminal, atualiza os `.md` e garante segurança estrita na pasta do projeto |
| Implementar uma fase individual | `/phase V2.0` | Instala dependências, cria rotas, faz build e atualiza `TASKS.md` + `MEMORY.md` |
| Conectar o Cliente FastAPI e Estado Global | `/phase V2.1` | Cria `client.ts` e contexto, faz build e atualiza a documentação |
| Construir o CRUD da Despensa | `/phase V2.2` | Desenvolve `PantryView` e modal, faz build e atualiza a documentação |
| Adicionar um novo requisito ou melhoria | `/new <descrição>` | Atualiza `CONTENT.md`, `DESIGN.md`, `TASKS.md` e `MEMORY.md` com a nova feature |
