# MEMORY.md — Memória do projeto Mise (V1 Landing + V2 Web App)

> **Para o agente:** este ficheiro é a tua memória entre sessões. Não te lembras de conversas anteriores,
> só disto. **Lê-o no início de cada sessão** (depois de `CLAUDE.md`) e **atualiza-o no fim de cada fase
> ou sempre que tomares uma decisão**. Sê breve e factual. Nunca apagues o histórico, só acrescenta.

---

## 1. Estado atual
- **Fase atual:** Fase V2.3 Concluída com sucesso. Módulo do Fogão operacional (`ChatView.tsx`, `RecipeTicket.tsx`), orquestração sequencial dos 3 agentes (Chef → Redator → Revisor) durante o `POST /ask`, comanda gastronómica térmica com botões de cópia e impressão, e compilação limpa.
- **Última sessão:** 2026-10-28
- **Build a passar?** Sim (`npm run build` na pasta `landing` gerou com 0 erros e 0 avisos)
- **Servidor de dev:** `npm run dev -- --host` → http://localhost:5173
- **Em curso / a meio de:** Piloto automático `/auto` a avançar para a **Fase V2.4** (Módulo do Livro de Receitas / Histórico).

## 2. Próximo passo
1. Executar a **Fase V2.4**: Módulo do Livro de Receitas (`HistoryView.tsx` consumindo `GET /receitas` e `GET /receitas/{ficheiro}`, grelha de fichas arquivadas, modal de leitura completa da comanda).
2. Seguir para a **Fase V2.5**: Polimento Tátil, Notificações, Acessibilidade e Auditoria Final.

## 3. Feito (por fase)
- `[Fase V2.3]` Módulo do Fogão (Chat Interativo & Comanda de Receita): Implementação de `ChatView.tsx` com histórico persistente em `localStorage`, atalhos de sugestões de pedidos e loading cinemático da brigada (Chef, Redator, Revisor). Componente `RecipeTicket.tsx` com renderização de Markdown (`react-markdown` + `remark-gfm`), carimbos aprovados, tabelas estilizadas, passos numerados, ações de cópia para a área de transferência e impressão de comanda. Build limpo com 0 erros.
- `[Fase V2.2]` Módulo da Despensa Digital (CRUD de Alimentos): Implementação de `PantryView.tsx` com grelha de mantimentos, métricas de inventário, pesquisa em tempo real e filtros (Todos, Urgentes, Frescos). Cartões de alimento `FoodCard.tsx` com acabamento de fita adesiva, badges cromáticos de validade (>7d verde, 2-7d açafrão, ≤2d tomate) e ajuste imediato de quantidade `+`/`−`. Modal de criação `AddFoodModal.tsx` com validação estrita e feedback por toast. Build limpo com 0 erros.
- `[Fase V2.1]` Conector da API do Backend (FastAPI) & Estado da Cozinha: Configuração de `CORSMiddleware` no backend FastAPI. Tipagem completa em `types.ts` (`Alimento`, `AskRequest`, `AskResponse`, `ReceitaItem`, `ReceitaDetalhe`). Cliente HTTP em `client.ts` ligado aos endpoints reais `/ask`, `/alimentos` e `/receitas`. Contexto global `AppContext.tsx` gerindo dados reativos e notificações táteis de toast. Build limpo com 0 erros.
- `[Fase V2.0]` Roteamento e Infraestrutura da Web App: Instalação de `react-router-dom`, `react-markdown` e `remark-gfm`. Extração de `LandingPage.tsx`, criação de `AppLayout.tsx` com navegação de atelier gastronómico, tabs para O Fogão, A Despensa e O Livro, pílula de estado do backend em tempo real e vistas base. Todos os botões "Experimentar" da landing redirecionam agora internamente para `/app`. Compilação aprovada com 0 erros.
- `[V2 - Planeamento]` Arquivo da V1 em `.Claude V1/`. Criação da especificação integral da V2: `CLAUDE.md` (regras e API), `DESIGN.md` (conceito "A Bancada de Trabalho do Chef", anti-IA, tokens e telas), `CONTENT.md` (textos em PT-PT do Fogão, Despensa e Histórico), `TASKS.md` (Fases V2.0 a V2.5) e `COMANDOS.md` (especificação de `/phase <N>`, `/new <desc>` e `/auto`).
- `[Fase 11]` Polimento Técnico, Carrossel de Stack Tecnológica & Nitidez Tipográfica.
- `[Fase 10]` Human Craft & Anti-AI Polish (textura de papel analógico, fita crepe de chef, eliminação de sparkles e marginalia).
- `[Fase 9]` Tipografia Sistema 1 (Fraunces + Plus Jakarta Sans + Space Mono) e rebranding para Mise.
- `[Fase 8]` Abertura Cinemática do Hero («A Bancada Noturna do Chef»), iluminação volumétrica, acoplamento de calha e flutuação 3D.
- `[Fase 1]` Componentes base e Hero: `Button` (primário e secundário com foco visível e microinterações de hover), `Stamp` (carimbos com rotação -3°, borda dupla e animação de batimento), `Navbar` (translúcida/blur ao scroll, navegação mobile acessível, alternador claro/escuro) e `Hero` com grelha assimétrica e ticket de receita animado ("caderno de tasca") respeitando `prefers-reduced-motion`.
- `[Fase 2]` Secções narrativas implementadas: `Problem` (narrativa do problema e visualização dos ingredientes de exemplo do quotidiano), `Agents` (3 cartões de agentes com pipeline sequencial e fio tracejado SVG animado com o scroll) e `HowItWorks` (3 passos simples do frigorífico ao prato com numeração mono expressiva).
- `[Fase 3]` Secções de produto implementadas: `Pantry` (mockup visual da despensa digital com ordenação e adição), `Honesty` (comparação clara de alimentos disponíveis vs. em falta com carimbos e regra dos básicos), `RecipePreview` (receita completa em Markdown estilizado devidamente rotulado como "Exemplo ilustrativo" com passos numerados) e `Safety` (garantia de validação de temperaturas seguras, restrições e doses).
- `[Fase 4]` Fecho implementado: `Faq` (acordeão acessível com `aria-expanded`, navegação por teclado e animação suave com respeito por movimento reduzido), `CtaFinal` (chamada para ação com estética de talão e botão primário), `Footer` (atribuição, navegação, link de repositório e ano dinâmico), `og-image.svg` e `favicon.svg` devidamente integrados no `index.html`.
- `[Fase 5]` Auditoria e Qualidade concluídas: 100% Português de Portugal verificado em todos os textos da interface e metadados, conformidade estrita da tipografia (Fraunces + Inter + JetBrains Mono), contraste AA aprovado, anéis de foco visíveis em todos os elementos interativos, responsividade afinada (375px a 1536px), fallback total para `prefers-reduced-motion` e validação de honestidade (sem dados ou números inventados).
- `[Fase 6]` Animações Avançadas e Diagnóstico de Navegador:
  - Resolução do congelamento de animações por media query de acessibilidade do Windows.
  - Implementação de `MotionContext` e botão «Animações ON / OFF» na Navbar.
  - Tilt 3D interativo com física de mola (±12°) e reflexo dinâmico no Hero.
  - Botão «Reimprimir» interativo no ticket e botões magnéticos em toda a página.
- `[Fase 7]` Mesa de Orquestração Cinematográfica 3D nos Agentes (Conceito 1):
  - Bancada 3D em `src/components/Agents.tsx` com spotlight dinâmico no cursor, seletor de 3 postos com timeline automática de 5.5s e play/pause.
  - Projeção de duas receitas do Chef, redação em markdown e scanner laser com telemetria no Revisor.
- `[Fase 8]` Abertura Cinemática do Hero («A Bancada Noturna do Chef»):
  - Iluminação volumétrica de estúdio suave em gradiente radial que segue o cursor do rato por todo o palco do Hero.
  - Calha metálica com acoplamento elástico e grampos em latão escovado com brilho especular.
  - Extrusão em câmara lenta com física de ondulação de papel térmico (`scaleY`, desfoque dinâmico e transição fluida).
  - Revelação tipográfica escalonada de ingredientes e batimento dos carimbos com impacto elástico.
  - Flutuação 3D contínua (*ambient floating physics* com micro-respiração espacial), sensibilidade de tilt ampliada a ±14° e botão de ação rápida «↺ Rever Sequência».
- `[Fase 9]` Tipografia Sistema 1 e Rebranding para "Mise":
  - Adoção das fontes `Fraunces` (títulos editoriais quentes), `Plus Jakarta Sans` (corpo e UI moderno/legível) e `Space Mono` (números e dados técnicos de comanda).
  - Atualização dos tokens no Tailwind e folha base CSS (`font-jakarta`).
  - Renomeação da marca de "AgentesCozinha" para **Mise** em toda a interface, cabeçalho, rodapé, SEO e novo favicon com o monograma "M".
- `[Fase 10]` Human Craft & Anti-AI Polish:
  - Eliminação total dos ícones `Sparkles` e tech-clichés em prol de artefactos gastronómicos (fita crepe de chef, carimbos texturados, vocabulário de Brigada de Cozinha).
  - Inclusão de textura de ruído analógico de papel de prensa de tipografia (`feTurbulence`) em toda a página.
  - Alternador de animações temático: «Lume vivo» vs. «Lume brando» com ícone `Flame`.
  - Anotações de margem de cozinheiro (*marginalia*) e materialidade táctil.
- `[Fase 11]` Polimento Técnico, Carrossel de Stack & Nitidez Tipográfica:
  - Resolução do erro de hooks do React (`useTransform` condicional) no alternador «Lume vivo / Lume brando».
  - Unificação do hook `useAppMotion()` em todos os componentes para controlo global imediato.
  - Hiperligação direta com `target="_blank"` para o repositório GitHub [mise-recipe-agents](https://github.com/danielsilvaengpt/mise-recipe-agents) no rodapé.
  - Criação do componente `TechStackCarousel.tsx`: carrossel contínuo (infinite marquee a 60 FPS) entre o Hero e o Problema, com links oficiais para CrewAI, React 19, TypeScript, FastAPI, Framer Motion, Streamlit, Tailwind CSS, Vite e Lucide.
  - Eliminação total do desfoque de texto: remoção de filtros de blur e distorções 3D contínuas em `Hero.tsx` e `Agents.tsx`, com antialiasing subpixel nítido (`text-rendering: optimizeLegibility`).

## 4. Decisões tomadas
- Stack: Vite + React + TypeScript + Tailwind + Framer Motion + lucide-react.
- 2026-10-28 (V2): **Comando `/auto` (Piloto Automático):** Criado comando para execução autónoma e sequencial de todas as fases de implementação, com autorização prévia de comandos no terminal, atualização mandatória de todos os ficheiros `.md` a cada fase e isolamento estrito de segurança à pasta do projeto (`c:\Users\danie\Desktop\mise-recipe-agents`).
- 2026-10-28 (V2): **Ligação Estrita ao Backend FastAPI:** A Web App é puramente um cliente frontend. Não cria lógica nem dados em memória simulada; quando o backend FastAPI (`backend/src/api/api.py`) for iniciado na porta 8000, a Web App liga-se diretamente a ele via cliente HTTP tipado (`/ask`, `/alimentos`, `/receitas`). Se o backend estiver desligado, a interface exibe um aviso claro com o comando de inicialização.
- Conceito visual: "caderno de tasca + mesa de comando de IA" (ver `DESIGN.md`).
- Textos só de `CONTENT.md`, via `src/data/content.ts`.
- URL da app só via `VITE_APP_URL`.
- 2026-10-26: Eliminação de projeções 3D contínuas sobre áreas de leitura tipográfica para garantir que as fontes mantêm nitidez de 100% sem desfoque de renderização.
- 2026-10-26: Implementação do `TechStackCarousel` com links oficiais da stack para conferir credibilidade e transparência técnica.
- 2026-10-26: Aprovado o Sistema 1 de Tipografia (`Fraunces` + `Plus Jakarta Sans` + `Space Mono`) para conferir personalidade quente de cozinha e sofisticação editorial.
- 2026-10-26: Aprovado o Sistema 1 de Tipografia (`Fraunces` + `Plus Jakarta Sans` + `Space Mono`) para conferir personalidade quente de cozinha e sofisticação editorial.
- 2026-10-26: Rebranding oficial da landing page para **Mise** (alusão a *mise en place*).
- 2026-10-26: Removida a sobreposição forçada de CSS global de reduced-motion em `src/index.css` que bloqueava animações JavaScript do Framer Motion em navegadores com sinalizador do Windows ativado.
- 2026-10-26: Criado botão de alternância explícita de animações na Navbar para controlo direto pelo utilizador, com persistência em `localStorage`.
- 2026-10-26: Ângulo do Tilt 3D aumentado para ±14° no Hero com flutuação contínua e reflexo de luz dinâmico (*specular sheen*).
- 2026-10-26: Implementada a Abertura Cinemática do Hero («A Bancada Noturna do Chef») e a Mesa de Orquestração 3D nos Agentes.

## 5. Problemas conhecidos / dívida técnica
- [x] Ausência de animações visíveis no browser — resolvido com a remoção da regra de CSS limitadora, ativação de `MotionContext` e ampliação das forças de física de mola.

## 6. Pendente de decisão (perguntar à pessoa)
- [ ] URL final da app Streamlit (`VITE_APP_URL`)
- [x] Link do repositório para o footer: `https://github.com/danielsilvaengpt/mise-recipe-agents`
- [ ] Domínio / sítio de deploy (Vercel, Netlify, GitHub Pages)

## 7. Registo de sessões

| Data | Resumo | Estado do build |
|---|---|---|
| 2026-10-28 | Conclusão da Fase V2.3: Módulo do Fogão (ChatView, RecipeTicket com react-markdown, comanda e impressão) | Passou (0 erros) |
| 2026-10-28 | Conclusão da Fase V2.2: Despensa Digital CRUD (PantryView, FoodCard, AddFoodModal, filtros e PATCH/DELETE) | Passou (0 erros) |
| 2026-10-28 | Conclusão da Fase V2.1: Conector tipado FastAPI (client.ts), CORS no backend, AppContext e toasts | Passou (0 erros) |
| 2026-10-28 | Conclusão da Fase V2.0: Roteamento React Router (/ e /app/*), AppLayout gastronómico, botões conectados e build limpo | Passou (0 erros) |
| 2026-10-28 | Planeamento da V2: Especificação da Web App com ligação direta ao backend FastAPI (`/ask`, `/alimentos`, `/receitas`) | Passou (0 erros) |
| 2026-10-26 | Conclusão da Fase 11: Polimento Técnico, Carrossel de Stack Tecnológica & Nitidez Tipográfica | Passou (0 erros) |
| 2026-10-26 | Conclusão da Fase 10: Human Craft & Anti-AI Polish (textura de papel analógico, fita crepe de chef, eliminação de sparkles e marginalia) | Passou (0 erros) |
| 2026-10-26 | Conclusão da Fase 9: Tipografia Sistema 1 (Fraunces + Plus Jakarta Sans + Space Mono) e rebranding para Mise | Passou (0 erros) |
| 2026-10-26 | Conclusão da Fase 8: Abertura Cinemática do Hero («A Bancada Noturna do Chef»), iluminação volumétrica, acoplamento de calha e flutuação 3D | Passou (0 erros) |
| 2026-10-26 | Conclusão da Fase 7: Mesa de Orquestração 3D com iluminação reativa, projeção de receitas, redação e scanner laser com telemetria | Passou (0 erros) |
| 2026-10-26 | Planeamento da Fase 7: Conceito 1 aprovado para os Agentes (Mesa de Orquestração 3D), atualização de `DESIGN.md`, `TASKS.md` e `MEMORY.md` | Passou (0 erros) |
| 2026-10-26 | Correção e ativação plena das animações: MotionContext, botão Animações ON/OFF, botão Reimprimir, tilt 3D ampliado e servidor ativo | Passou (0 erros) |
| 2026-10-26 | Conclusão da Fase 6: Animações avançadas, tilt 3D, impressora térmica, pulso SVG e botões magnéticos | Passou (0 erros) |
| 2026-10-26 | Planeamento da Fase 6: Ideia 3 aprovada, atualização de `DESIGN.md`, `TASKS.md` e `MEMORY.md` | Passou (0 erros) |
| 2026-10-26 | Conclusão da Fase 5: Auditoria de qualidade, validação PT-PT, tipografia, contraste e responsividade | Passou (0 erros) |
| 2026-10-26 | Conclusão da Fase 4: FAQ em acordeão acessível, CTA final, Footer, og-image.svg e favicon | Passou (0 erros) |
| 2026-10-26 | Conclusão da Fase 3: Despensa (mockup), Honestidade de ingredientes, Pré-visualização de receita e Segurança | Passou (0 erros) |
| 2026-10-26 | Conclusão da Fase 2: Secção Problema, Agentes com fio tracejado ao scroll e Como funciona | Passou (0 erros) |
| 2026-10-26 | Conclusão das Fases 0 e 1: Setup do ecossistema, tokens de design, `content.ts`, Navbar, Hero com ticket animado | Passou (0 erros) |

---

## Regras de manutenção deste ficheiro
1. No **início** da sessão: lê `CLAUDE.md` → `MEMORY.md` → `TASKS.md`. Resume em 2 linhas onde estamos antes de mexer em código.
2. No **fim** da sessão (ou fase): atualiza secções 1, 2, 3 e 7. Corre `npm run build` e regista o resultado.
3. Decisões novas vão para a secção 4 **no momento em que são tomadas**, não no fim.
4. Se algo neste ficheiro contradiz o código, confia no código e corrige o ficheiro.
5. Não guardes segredos, chaves de API nem dados pessoais aqui.
6. Máximo ~150 linhas. Se crescer, resume o histórico antigo numa linha por fase.
