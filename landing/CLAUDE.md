# CLAUDE.md — Mise (Versão 2: Landing Page + Web App Integrada)

> **Regra de ouro:** Lê este ficheiro primeiro. Em seguida, consulta `MEMORY.md` (estado atual e histórico), `DESIGN.md` (sistema visual e componentes), `CONTENT.md` (textos oficiais em PT-PT) e `TASKS.md` (plano de fases).
> Para executar ou evoluir tarefas através dos comandos automatizados, consulta `COMANDOS.md` (`/auto`, `/phase <N>` e `/new <descrição>`).

---

## 1. O Produto Mise V2

O **Mise** evolui da landing page informativa para uma **aplicação web completa e viva**. 
Ao clicar no botão de ação principal ("Experimentar" / "Experimentar agora →") na landing page, o utilizador acede de imediato à **Web App** (`/app`), uma plataforma gastronómica pessoal onde tudo funciona em harmonia com a brigada de agentes de IA e a API backend:

1. **O Fogão (Chat Interativo com a Brigada):** O utilizador introduz o seu pedido ("quero um almoço leve em 15 minutos com o que tenho"). A orquestração do CrewAI (Chef, Redator e Revisor) gera uma receita personalizada em Markdown, apresentada visualmente como um **Ticket de Restaurante / Comanda de Cozinha**.
2. **A Despensa Digital (CRUD de Alimentos):** Gestão rigorosa dos ingredientes em casa (nome, quantidade, unidade de medida, restrições alimentares e data de validade). Permite adicionar, atualizar quantidades e remover alimentos.
3. **O Livro de Receitas (Histórico):** Registo cronológico de todas as receitas confecionadas ou geradas anteriormente, com consulta detalhada do ticket e ingredientes.

---

## 2. Contrato de Integração com o Backend (FastAPI)

A Web App comunica diretamente com o backend FastAPI localizado na pasta `backend/src/api/api.py`. Todos os endpoints devem estar devidamente tipados em TypeScript:

### 2.1. Receitas & Brigada
- **`POST /ask`**
  - **Payload:** `{ "question": string }`
  - **Resposta:** `{ "answer": string }` (Markdown completo da receita gerada pela brigada CrewAI)
  - **Ação interna:** A receita gerada é automaticamente arquivada pelo backend na pasta `outputs/` com a convenção `receita_AAAAMMDD_HHMMSS.md`.

- **`GET /receitas`**
  - **Resposta:** Lista de receitas arquivadas:
    ```typescript
    Array<{ ficheiro: string; titulo: string; data: string }>
    ```

- **`GET /receitas/{ficheiro}`**
  - **Resposta:** `{ "ficheiro": string, "texto": string }` (conteúdo integral em Markdown da receita arquivada)

### 2.2. Despensa (Alimentos)
- **`GET /alimentos`**
  - **Resposta:** Lista de alimentos registados na despensa:
    ```typescript
    Array<{
      nome: string;
      quantidade: number;
      unidade: string;
      restricoes: string[];
      validade: string; // formato AAAA-MM-DD
    }>
    ```

- **`POST /alimentos`** (Status 201)
  - **Payload:**
    ```typescript
    {
      nome: string;
      quantidade: number;
      unidade: string;
      restricoes: string[];
      validade: string; // validada no formato AAAA-MM-DD
    }
    ```

- **`DELETE /alimentos?nome={nome}`**
  - **Query param:** `nome` do alimento a remover
  - **Resposta:** `{ "removido": string }`

- **`PATCH /alimentos/quantidade?nome={nome}`**
  - **Query param:** `nome` do alimento
  - **Payload:** `{ "delta": number }` (incremento ou decremento na quantidade existente)
  - **Resposta:** `{ "nome": string, "delta": number }`

---

## 3. Arquitetura da Web App & Ligação Direta ao Backend

- **Cliente Frontend Puro:** A Web App é exclusivamente a interface de utilizador (UI) em React. **Toda a lógica de dados, persistência e IA corre estritamente no backend FastAPI (`backend/src/api/api.py`)**. Não há simulações nem recriação de lógica de backend na web app.
- **Ligação ao Backend:**
  - A aplicação consome a API do backend através da variável `VITE_API_URL` (por defeito: `http://localhost:8000`).
  - Pode também ser utilizado um proxy no Vite (`/api` → `http://localhost:8000`) para simplificar o desenvolvimento local.
  - Para chamadas diretas do browser, o backend FastAPI deve ter `CORSMiddleware` ativo ou receber os pedidos via proxy.
- **Deteção de Estado da API (Online / Offline):**
  - Ao carregar a aplicação, a Web App verifica a ligação ao backend através de `GET /`.
  - **Se a API estiver ligada:** A Web App funciona em pleno, consumindo os alimentos reais da despensa, gravando novas entradas, acionando o CrewAI no `/ask` e lendo o histórico de ficheiros `.md` gerados em `outputs/`.
  - **Se a API estiver desligada:** A Web App exibe uma barra de estado clara e calorosa, alertando o utilizador para iniciar o servidor Python:
    ```bash
    cd backend
    uvicorn src.api.api:app --reload
    ```
- **Roteamento:** Implementado via `react-router-dom` no projeto React existente:
  - `/`: Apresentação da Landing Page.
  - `/app`: Redirecionamento para a Web App conectada à API.
  - `/app/fogao`: Chat com a brigada de agentes (`POST /ask`).
  - `/app/despensa`: CRUD de alimentos (`GET`, `POST`, `DELETE`, `PATCH` em `/alimentos`).
  - `/app/livro`: Histórico de receitas arquivadas pelo backend (`GET /receitas`).
- **Renderização de Markdown:**
  - `react-markdown` configurado com `remark-gfm` para formatar a resposta textual da brigada em tickets gastronómicos com tabelas e selos.

---

## 4. Estrutura de Ficheiros

```
landing/
├── CLAUDE.md              # Este guia de orientação
├── DESIGN.md              # Especificação estética da V2 (Landing + Web App)
├── CONTENT.md             # Textos oficiais em Português de Portugal
├── TASKS.md               # Roteiro de fases de desenvolvimento
├── COMANDOS.md            # Especificação dos comandos /phase e /new
├── MEMORY.md              # Registo de memória viva e estado do projeto
├── .Claude V1/            # Arquivo histórico dos ficheiros de especificação da V1
├── index.html
├── src/
│   ├── main.tsx
│   ├── App.tsx            # Configuração de rotas principais (/ e /app/*)
│   ├── index.css          # Variáveis CSS, fontes e regras de modo claro/escuro
│   ├── context/
│   │   ├── MotionContext.tsx  # Controlo mestre «Lume vivo / Lume brando»
│   │   └── AppContext.tsx     # Estado global da despensa, histórico e mensagens
│   ├── api/
│   │   ├── client.ts          # Cliente HTTP tipado que consome os endpoints do FastAPI
│   │   └── config.ts          # Configuração do URL base da API (VITE_API_URL / localhost:8000)
│   ├── components/
│   │   ├── landing/           # Componentes originais da V1 (Hero, Agents, Faq, etc.)
│   │   ├── app/               # Componentes da Web App:
│   │   │   ├── AppLayout.tsx      # Barra lateral/topo de navegação da cozinha
│   │   │   ├── ChatView.tsx       # Conversação, prompt e estados da brigada
│   │   │   ├── RecipeTicket.tsx   # Comanda/Ticket de receita formatado
│   │   │   ├── PantryView.tsx     # Grelha de frascos/etiquetas da despensa
│   │   │   ├── AddFoodModal.tsx   # Formulário em papel vegetal para novo alimento
│   │   │   └── HistoryView.tsx    # Arquivo cronológico de fichas de receita
│   │   └── ui/                # Botões magnéticos, carimbos, crachás e toasts
│   └── data/
│       └── content.ts         # Base tipada de todos os textos de CONTENT.md
```

---

## 5. Regras de Conduta e Qualidade

1. **Human Craft & Zero Clichés de IA:** Nada de faíscas (`Sparkles`), gradientes azuis/rochosos artificiais, ou caixas de texto genéricas de chatbot. A interface deve parecer um caderno de cozinha analógico de alta gama misturado com uma comanda de serviço.
2. **Português de Portugal Estrito:** Todo o texto de interface, mensagens de erro, placeholders e validações deve utilizar exclusivamente a ortografia e léxico de Portugal (ex.: *«ecrã»*, *«utilizador»*, *«frigorífico»*, *«registo»*, *«guardar»*).
3. **Respeito por Acessibilidade:** Suporte total a navegação por teclado (`Tab`, `Enter`, `Escape` em modais), anéis de foco bem contrastados e respeito imperativo pelo modo `prefers-reduced-motion`.
4. **Verificação de Compilação:** Nenhuma fase ou alteração pode ser considerada concluída sem que o comando `npm run build` termine com **zero erros e zero avisos**.
