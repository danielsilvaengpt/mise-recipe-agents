# TASKS.md — Plano de Implementação da Versão 2 (Web App Mise)

> **Instruções para o Agente:** Executa rigorosamente **uma fase de cada vez**.
> Ao receber o comando `/phase <N>`, consulta a fase respetiva neste documento, executa todas as tarefas, testa a compilação com `npm run build` e atualiza as caixas `[ ]` para `[x]`, registando também o progresso no `MEMORY.md`.

---

## Fase V2.0 — Roteamento & Infraestrutura da Web App
- [x] Instalar o pacote de roteamento `react-router-dom` e o leitor de Markdown `react-markdown` (e plugins auxiliares como `remark-gfm`).
- [x] Configurar o roteamento principal em `src/App.tsx`:
  - Rota raiz `/`: Apresentação completa da Landing Page (V1 preservada a 100%).
  - Rota da aplicação `/app`: Redirecionamento e layout mestre da Web App (`AppLayout.tsx`).
  - Sub-rotas da aplicação: `/app/fogao` (Chat), `/app/despensa` (CRUD de alimentos) e `/app/livro` (Histórico).
- [x] Ligar todos os botões de ação da Landing Page (`Navbar`, `Hero`, `CtaFinal`) para navegar diretamente para a rota `/app`.
- [x] Construir o componente `AppLayout.tsx`:
  - Barra de navegação superior e/ou lateral da cozinha com logótipo, link de regresso à Landing Page, abas de navegação (O Fogão, A Despensa, O Livro) e alternadores de tema e «Lume vivo / Lume brando».
- [x] Assegurar compilação limpa com `npm run build` (0 erros).

---

## Fase V2.1 — Conector da API do Backend (FastAPI) & Estado da Cozinha
- [x] Configurar a comunicação com o backend em `src/api/config.ts`:
  - Definir URL base (`VITE_API_URL` com valor por defeito `http://localhost:8000`).
  - Configurar proxy de desenvolvimento no `vite.config.ts` (reencaminhando `/api` para `http://localhost:8000`) ou preparar cabeçalhos para chamada direta.
  - Se necessário, configurar `CORSMiddleware` no backend FastAPI (`backend/src/api/api.py`) para permitir requisições a partir do frontend.
- [x] Criar o cliente HTTP tipado em `src/api/client.ts` com funções que invocam diretamente a API FastAPI:
  - `POST /ask` (`{ question: string }` → `{ answer: string }`) — aciona a orquestração real do CrewAI.
  - `GET /alimentos` — lê os alimentos reais guardados no repositório do backend.
  - `POST /alimentos` — cria um novo alimento validado pelo Pydantic do backend.
  - `DELETE /alimentos?nome={nome}` — remove o alimento no repositório do backend.
  - `PATCH /alimentos/quantidade?nome={nome}` — ajusta a quantidade no backend.
  - `GET /receitas` — lista os ficheiros `.md` reais existentes na pasta `outputs/` do backend.
  - `GET /receitas/{ficheiro}` — obtém o texto integral do ficheiro `.md`.
- [x] Implementar verificação de estado em tempo real da API (`healthCheck` via `GET /`):
  - Criar componente visual de estado (`ApiStatusIndicator.tsx`) indicando «Backend Ligado» (verde) ou «Backend Desligado» (âmbar com instrução para iniciar o Uvicorn).
- [x] Criar o contexto global `src/context/AppContext.tsx` que centraliza as chamadas ao cliente da API, atualiza o inventário da despensa e gere as mensagens e receitas ativas.
- [x] Assegurar compilação limpa com `npm run build` (0 erros).

---

## Fase V2.2 — Módulo da Despensa Digital (CRUD de Alimentos)
- [x] Criar a visão `src/components/app/PantryView.tsx`:
  - Cabeçalho com métricas da despensa e botão magnético `+ Registar Novo Ingrediente`.
  - Filtros rápidos de visualização (Todos, Consumo Urgente, Prazo Normal).
- [x] Desenvolver o cartão de ingrediente individual (`FoodCard.tsx`):
  - Estética de frasco/etiqueta com fita crepe rasgada nos cantos.
  - Indicadores cromáticos de validade baseados na data:
    - 🟢 Verde-azeitona: > 7 dias de validade.
    - 🟡 Açafrão: entre 2 e 7 dias.
    - 🔴 Tomate: ≤ 1 dia ou caducado.
  - Controlos táteis de quantidade `−` e `+` com chamada automática ao endpoint `PATCH /alimentos/quantidade`.
  - Botão de remoção com diálogo de confirmação amigável e acionamento de `DELETE /alimentos`.
- [x] Construir o modal `src/components/app/AddFoodModal.tsx`:
  - Formulário com validação em tempo real (Nome, Quantidade, Unidade com dropdown gastronómico, Restrições e Calendário).
  - Submissão com `POST /alimentos` e feedback imediato por notificação toast.
- [x] Assegurar compilação limpa com `npm run build` (0 erros).

---

## Fase V2.3 — Módulo do Fogão (Chat Interativo & Comanda de Receita)
- [x] Criar a visão `src/components/app/ChatView.tsx`:
  - Ecrã inicial com saudações da brigada e atalhos rápidos clicáveis para pedidos comuns.
  - Caixa de entrada estilizada na bancada de trabalho com envio via botão ou tecla `Enter`.
- [x] Implementar a animação cinemática de orquestração da brigada durante o carregamento (`POST /ask`):
  - Passos visuais sincronizados: 1. Chef Criativo → 2. Redator de Receitas → 3. Revisor de Segurança.
- [x] Desenvolver o componente `src/components/app/RecipeTicket.tsx`:
  - Renderização da resposta Markdown com estética de comanda/ticket de restaurante.
  - Tabela visual de honestidade com carimbos `DISPONÍVEL NA DESPENSA` e `EM FALTA`.
  - Passos numerados em `Space Mono`.
  - Ações no rodapé do ticket: botão de copiar para o clipboard e botão de impressão de comanda.
- [x] Assegurar compilação limpa com `npm run build` (0 erros).

---

## Fase V2.4 — Módulo do Livro de Receitas (Histórico Arquivado)
- [ ] Criar a visão `src/components/app/HistoryView.tsx`:
  - Listagem cronológica das receitas existentes na pasta `outputs/` via `GET /receitas`.
  - Apresentação em grelha de fichas culinárias encadernadas com data e título.
  - Estado vazio aconchegante caso o histórico esteja em branco, com botão direto para o Fogão.
- [ ] Implementar a gaveta lateral ou modal de consulta de receita:
  - Obtenção do conteúdo integral via `GET /receitas/{ficheiro}`.
  - Renderização completa no componente `RecipeTicket.tsx`.
- [ ] Assegurar compilação limpa com `npm run build` (0 erros).

---

## Fase V2.5 — Polimento Tátil, Notificações, Acessibilidade e Auditoria Final
- [ ] Criar sistema de notificações táteis (`ToastContext.tsx` e componente `Toast.tsx`) para todas as operações do CRUD e ações do chat.
- [ ] Refinar as animações de transição de abas e componentes com o Framer Motion, garantindo respeito pelo seletor «Lume vivo / Lume brando» e `prefers-reduced-motion`.
- [ ] Validar compatibilidade perfeita em Modo Claro e Modo Escuro em todos os componentes da Web App.
- [ ] Efetuar revisão responsiva minuciosa (ecrãs mobile de 375px a monitores 4K).
- [ ] Conduzir auditoria de acessibilidade (foco visível, contraste AA, navegação por teclado e atributos ARIA).
- [ ] Testar compilação de produção e integridade de tipos com `npm run build` (0 erros e 0 avisos).
