# MEMORY.md — Memória do projeto (landing Mise)

> **Para o agente:** este ficheiro é a tua memória entre sessões. Não te lembras de conversas anteriores,
> só disto. **Lê-o no início de cada sessão** (depois de `CLAUDE.md`) e **atualiza-o no fim de cada fase
> ou sempre que tomares uma decisão**. Sê breve e factual. Nunca apagues o histórico, só acrescenta.

---

## 1. Estado atual
- **Fase atual:** Fase 10 concluída com sucesso. Human Craft & Eliminação de Clichés de IA (Anti-AI Polish) implementado.
- **Última sessão:** 2026-10-26
- **Build a passar?** Sim (`npm run build` gerou com 0 erros e 0 avisos)
- **Servidor de dev:** `npm run dev -- --host` → http://localhost:5173
- **Em curso / a meio de:** nada

## 2. Próximo passo
1. Testar a experiência visual orgânica e tátil em http://localhost:5173.
2. Definir URL final da app Streamlit em produção (`VITE_APP_URL`) e preparar deploy (Vercel, Netlify ou GitHub Pages).

## 3. Feito (por fase)
- `[Fase 0]` Setup completo com Vite + React 19 + TypeScript + Tailwind CSS + Framer Motion + lucide-react. Tokens de cor e tipografia (`Fraunces`, `Inter`, `JetBrains Mono`) com variáveis CSS em `src/index.css` e suporte a modo claro/escuro. Metatags SEO e Open Graph em `index.html`. Base de dados tipada de textos em `src/data/content.ts` e `.env.example`.
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

## 4. Decisões tomadas
- Stack: Vite + React + TypeScript + Tailwind + Framer Motion + lucide-react — site estático, separado da app Streamlit.
- Conceito visual: "caderno de tasca + mesa de comando de IA" (ver `DESIGN.md`).
- Textos só de `CONTENT.md`, via `src/data/content.ts`.
- URL da app só via `VITE_APP_URL`.
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
