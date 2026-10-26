# TASKS.md — Plano de construção (para o agente)

Executa **uma fase de cada vez**. No fim de cada fase: `npm run build`, mostra o que mudou e espera confirmação.
Antes de começar, lê `CLAUDE.md`, `DESIGN.md` e `CONTENT.md`.

## Fase 0 — Setup
- [x] `npm create vite@latest landing -- --template react-ts`
- [x] Instalar: `tailwindcss`, `framer-motion`, `lucide-react`
- [x] Configurar tokens de cor/fonte do `DESIGN.md` no Tailwind e em `index.css` (variáveis CSS + modo escuro)
- [x] Fontes: Fraunces, Inter, JetBrains Mono (Google Fonts, `display=swap`)
- [x] `index.html`: `lang="pt-PT"`, title, meta description, Open Graph
- [x] `src/data/content.ts` com todos os textos de `CONTENT.md`
- [x] `.env.example` com `VITE_APP_URL=`

## Fase 1 — Base e Hero
- [x] Navbar (sticky, muda ao scroll, menu mobile acessível)
- [x] Hero com ticket de receita animado (carimbos DISPONÍVEL / EM FALTA)
- [x] Botões primário/secundário e componente `Stamp`

## Fase 2 — Narrativa
- [x] Secção Problema
- [x] Secção Agentes com fio tracejado que se desenha no scroll
- [x] Secção Como funciona (3 passos)

## Fase 3 — Produto
- [x] Mockup da Despensa (HTML/CSS, dados fictícios claramente ilustrativos)
- [x] Secção "Se faltar, dizemos-te" (tabela disponível vs. em falta)
- [x] Pré-visualização de receita ("Exemplo ilustrativo")
- [x] Secção Segurança

## Fase 4 — Fecho
- [x] FAQ em acordeão acessível (teclado + `aria-expanded`)
- [x] CTA final e Footer
- [x] Favicon + OG image

## Fase 5 — Qualidade
- [x] Revisão responsiva (375 / 768 / 1280 / 1536)
- [x] `prefers-reduced-motion` respeitado
- [x] Contraste AA, foco visível, navegação por teclado
- [x] Lighthouse / Boas práticas (HTML semântico, swap de fontes, zero erros de compilação)
- [x] Verificar que não há texto/número inventado

## Fase 6 — Animações Avançadas e Interatividade Tátil (Ideia 3)
- [x] 6.1 Componente `MagneticButton` ou envolvente magnética para o botão primário (`Button.tsx`)
- [x] 6.2 Tilt 3D interativo com física de mola no Ticket do Hero (`useMotionValue`, `useSpring`, `rotateX`, `rotateY`)
- [x] 6.3 Efeito de saída mecânica de impressora de pedidos e revelação progressiva dos ingredientes no Hero
- [x] 6.4 Fio dos Agentes com pulso luminoso de dados a percorrer continuamente o traçado SVG
- [x] 6.5 Microinterações de elevação elástica tátil ("fita de etiqueta") na Despensa e Receita
- [x] 6.6 Teste de performance a 60fps, compilação de produção (`npm run build`) e respeito por `prefers-reduced-motion`

## Fase 7 — Mesa de Orquestração Cinematográfica 3D nos Agentes (Conceito 1)
- [x] 7.1 Estrutura da Mesa de Orquestração 3D com iluminação de estúdio reativa ao cursor (*dynamic spotlight*) em `src/components/Agents.tsx`
- [x] 7.2 Seletor tátil de postos / estações de trabalho (Chef → Redator → Revisor) com reprodução automática e controlo manual
- [x] 7.3 Estação 1 (Chef): Animação de projeção de duas receitas e seleção carimbada da melhor proposta
- [x] 7.4 Estação 2 (Redator): Redação tipográfica progressiva de quantidades e passos da receita
- [x] 7.5 Estação 3 (Revisor): Scanner laser vertical verde-azeitona e painel de telemetria de segurança alimentar (*temperaturas, tempos e restrições*) com carimbo de aprovação
- [x] 7.6 Validação responsiva, respeito integral por `prefers-reduced-motion` e compilação limpa (`npm run build`)

## Fase 8 — Abertura Cinemática do Hero («A Bancada Noturna do Chef»)
- [x] 8.1 Iluminação de estúdio volumétrica com gradiente de foco cinemático dinâmico no Hero
- [x] 8.2 Animação coreografada da calha de pedidos em latão/ferro com acoplamento mecânico suave
- [x] 8.3 Extrusão da comanda em câmara lenta com física de ondulação de papel térmico
- [x] 8.4 Revelação tipográfica em brilho especular de tinta a secar
- [x] 8.5 Impacto dos carimbos com ressalto elástico, sombras dinâmicas e partículas de calor
- [x] 8.6 Flutuação 3D contínua (*floating physics*), tilt ampliado a ±14° e botão «↺ Rever Sequência»
- [x] 8.7 Validação de compilação de produção (`npm run build`) e respeito por `prefers-reduced-motion`

## Fase 9 — Tipografia Sistema 1 e Rebranding para "Mise"
- [x] 9.1 Atualização de fontes Google Fonts em `index.html`: Fraunces + Plus Jakarta Sans + Space Mono
- [x] 9.2 Reconfiguração dos tokens de tipografia em `tailwind.config.js` (`jakarta`, `mono: 'Space Mono'`) e `src/index.css`
- [x] 9.3 Substituição global da classe base para `font-jakarta` em `src/App.tsx`
- [x] 9.4 Rebranding integral para "Mise" (Navbar, Footer, SEO titles, metadados Open Graph e `CONTENT.md`)
- [x] 9.5 Novo favicon SVG com o monograma "M" em serifa editorial Fraunces
- [x] 9.6 Validação de compilação de produção (`npm run build` limpo, 0 erros e 0 avisos)

## Fase 10 — Human Craft & Eliminação de Clichés de IA (Anti-AI Polish)
- [x] 10.1 Purgar todos os ícones `Sparkles` e substituí-los por artefactos reais da gastronomia e atelier
- [x] 10.2 Adicionar textura tátil de papel com micro-grão SVG (`feTurbulence`) orgânico em overlay fixo
- [x] 10.3 Adicionar fita adesiva crepe de cozinheiro (*chef masking tape*) no ticket da comanda
- [x] 10.4 Alternador de animações temático na Navbar: «Lume vivo» vs. «Lume brando» com ícone de chama (`Flame`)
- [x] 10.5 Transição de vocabulário mecânico para terminologia da Brigada de Cozinha ("Ordem de Brigada", "Mise en place")
- [x] 10.6 Carimbos com textura física de borracha desgastada e micro-anotações à margem
- [x] 10.7 Compilação limpa de produção (`npm run build`, 0 erros, 0 avisos)

---

## Prompts prontos (colar no Antigravity)

**Prompt inicial**
> Lê `CLAUDE.md`, `MEMORY.md`, `DESIGN.md`, `CONTENT.md` e `TASKS.md`. Cria um plano e executa apenas a Fase 0 e Fase 1.
> No fim, corre o build, atualiza o `MEMORY.md` e diz-me o que fizeste. Não avances sem eu confirmar.

**Prompt para retomar (nova sessão)**
> Lê `CLAUDE.md` e `MEMORY.md`. Resume em 2 linhas onde ficámos e qual é o próximo passo.
> Depois continua a partir daí e atualiza o `MEMORY.md` no fim.

**Prompt para fechar a sessão**
> Atualiza o `MEMORY.md`: estado atual, o que foi feito, decisões novas, problemas abertos e os próximos 1–3 passos.

**Para elevar o design**
> Revê o Hero como um diretor de arte. Está genérico? Propõe 3 melhorias concretas fiéis ao conceito
> "caderno de tasca + mesa de comando" do `DESIGN.md` e implementa a melhor.

**Para polir**
> Faz uma auditoria de acessibilidade e performance. Lista problemas por gravidade e corrige-os.

**Para validar honestidade**
> Procura em todo o código textos que não estejam em `CONTENT.md` ou números/depoimentos inventados e remove-os.