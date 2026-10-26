# Mise — Receitas com IA a partir da tua despensa

<p align="center">
  <img src="landing/public/favicon.svg" alt="Mise Logo" width="80" height="80" />
</p>

<p align="center">
  <strong>Mise en place na tua cozinha: uma brigada inteligente que cria receitas com o que realmente tens em casa e diz-te, com rigor e honestidade, o que te falta.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Vite-6.4-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Methodology-Vibe_Coding_&_CDD-E9A83B?style=for-the-badge" alt="Vibe Coding" />
  <img src="https://img.shields.io/badge/Language-Português_de_Portugal-D8432B?style=for-the-badge" alt="PT-PT" />
</p>

---

## 🗂️ Estrutura do Monorepo

```text
mise-recipe-agents/
├── landing/    # Landing page cinematográfica & editorial de alta fidelidade
└── app/        # Aplicação interativa em Python (CrewAI + FastAPI + Streamlit) [Em breve]
```

---

## 🍽️ Landing Page (`landing/`)

A landing page do **Mise** não é uma página genérica de SaaS ou inteligência artificial. Foi concebida como uma experiência sensorial e tátil onde o **caderno de receitas de uma tasca portuguesa contemporânea encontra uma mesa de comando de alta precisão**.

> **Direção de Arte:** Papel quente de alta gramagem, carimbos físicos com textura de borracha, fita-crepe de cozinheiro (*chef masking tape*), tipografia editorial e ausência deliberada de clichés sintéticos de IA.

---

### ⚡ Metodologia de Desenvolvimento: Agentic Vibe Coding & CDD

Este projeto foi construído do zero através de **Agentic Vibe Coding** de alta precisão, sustentado por **Context-Driven Development (CDD)**. Em vez de prompts caóticos, o desenvolvimento foi orquestrado por um ecossistema de especificação canónica em Markdown:

```mermaid
flowchart LR
    A["CLAUDE.md<br/><b>Regras Operacionais</b>"] --> E["Agentic Engine"]
    B["DESIGN.md<br/><b>Tokens & Artefactos</b>"] --> E
    C["CONTENT.md<br/><b>Fonte de Texto PT-PT</b>"] --> E
    D["TASKS.md<br/><b>Pipeline de Fases</b>"] --> E
    E --> F["MEMORY.md<br/><b>Estado & Continuidade</b>"]
    E --> G["Código Final a 60 FPS<br/><b>Build com 0 Erros</b>"]
```

- **`CLAUDE.md`** — Leis operacionais inegociáveis: respeito estrito a `prefers-reduced-motion`, proibição de dados inventados e validação obrigatória de compilação em cada fase.
- **`DESIGN.md`** — Paleta cromática autêntica (`--paper`, `--ink`, `--tomato`, `--olive`, `--saffron`), tokens de física de mola e princípios de *Human Craft*.
- **`CONTENT.md`** — Única fonte da verdade para toda a cópia em rigoroso **Português de Portugal**.
- **`TASKS.md`** — Roteiro faseado executado de forma sequencial, com validação de build a cada checkpoint.
- **`MEMORY.md`** — Memória contextual persistente para transição limpa entre sessões de desenvolvimento.

---

### 🚀 Do Zero à Concretização: As 11 Fases de Construção

A construção progrediu em etapas rigorosamente orquestradas e testadas em produção:

| Fase | Foco | O que foi alcançado |
|:---:|:---|:---|
| **Fase 0** | **Arquitetura de Contexto & Setup** | Inicialização do ecossistema com Vite, React 19, TypeScript e Tailwind CSS. Criação dos ficheiros canónicos de contexto e variáveis CSS de modo claro/escuro. |
| **Fase 1** | **Base & Ticket de Receita Tátil** | Construção da `Navbar` com efeito de vidro/blur ao scroll, componente `Stamp` (carimbos com ressalto a -3°) e o primeiro ticket animado de comanda no `Hero`. |
| **Fase 2** | **Narrativa & Coreografia Sequencial** | Secção `Problem` com o drama do desperdício doméstico, pipeline visual dos agentes interligados por linha tracejada SVG que se desenha no scroll e `HowItWorks` em 3 tempos. |
| **Fase 3** | **Produto & Transparência de Despensa** | Mockup interativo da despensa digital (`Pantry`), tabela honesta de alimentos disponíveis vs. em falta (`Honesty`), pré-visualização completa em Markdown e selos de segurança alimentar (`Safety`). |
| **Fase 4** | **Fecho, Acessibilidade & Ativos** | `Faq` em acordeão acessível via teclado (`aria-expanded`), `CtaFinal` em formato de talão de cozinha, rodapé semântico, monograma `favicon.svg` e `og-image.svg`. |
| **Fase 5** | **Auditoria de Qualidade & Rigor** | Verificação de conformidade total em Português de Portugal, auditoria de contraste AA, anéis de foco em todos os controlos e eliminação de qualquer texto inventado. |
| **Fase 6** | **Física de Mola & Efeitos Táteis** | Envolvente magnética com física elástica nos botões primários (`MagneticButton`), efeito de rotação 3D com molas (`rotateX`/`rotateY`) no ticket e criação do `MotionContext` com toggle persistido. |
| **Fase 7** | **Mesa de Orquestração 3D da Brigada** | Bancada de comando cinematográfica em `Agents.tsx`: iluminação de estúdio reativa ao rato, seletor tátil de 3 estações (Chef, Redator, Revisor), projeção de receitas em tempo real e scanner laser com telemetria. |
| **Fase 8** | **Abertura Cinemática «Bancada do Chef»** | Coreografia cinematográfica do `Hero`: feixe volumétrico de luz quente que segue o cursor, calha de latão com acoplamento mecânico, extrusão de papel térmico em câmara lenta e flutuação 3D contínua (±14°). |
| **Fase 9** | **Tipografia de Luxo & Rebranding "Mise"** | Transição de marca para **Mise** (*mise en place*). Adoção da tríade tipográfica de topo: `Fraunces Variable` (serifa gastronómica), `Plus Jakarta Sans` (interface legível) e `Space Mono` (dados de talão). |
| **Fase 10** | **Human Craft & Filosofia Anti-AI** | Purga de clichés sintéticos (zero `Sparkles`), textura tátil de papel com micro-grão SVG (`feTurbulence`), fita-crepe de cozinheiro (*masking tape*), anotações de margem manuscritas e controlo de animações «Lume vivo / Lume brando». |

---

### ✨ Detalhes que Impressionam (Design & Human Craft)

1. **A Bancada Noturna do Chef (Hero Cinemático):**
   - Feixe volumétrico de iluminação de estúdio suave em gradiente radial que segue o cursor do utilizador com física amortecida.
   - Calha mecânica em latão escovado com grampos de pressão que acopla elasticamente no topo da mesa.
   - Extrusão em câmara lenta com ondulação de papel térmico, brilho especular de tinta a secar e botão `↺ Rever Sequência`.
   - **Chef's Masking Tape:** Fita crepe recortada com dentes imperfeitos e rotação orgânica a segurar a comanda.

2. **Mesa de Orquestração 3D da Brigada (Pipeline dos Agentes):**
   - Três postos de trabalho em perspetiva com timeline automática de 5.5s e controlo manual (Play/Pause):
     - **Estação do Chef:** Projeção e comparação de duas propostas de receitas com carimbo da vencedora.
     - **Estação do Redator:** Datilografia mecânica com revelação progressiva dos 5 passos executivos.
     - **Estação do Revisor:** Scanner laser vertical verde-azeitona com telemetria ativa (*Temperaturas ≥ 74°C*, *Tempos realistas*, *Alergénios validados*).

3. **Filosofia Anti-AI (Sem Estética Sintética):**
   - **Zero Sparkles:** Proibição de estrelinhas genéricas de inteligência artificial.
   - **Textura Analógica de Papel:** Overlay vetorial com filtro SVG `feTurbulence` que adiciona a micro-textura táctil de papel de prensa de linho.
   - **Marginalia de Fogão:** Dicas manuscritas de cozinheiro à margem da receita (*«Guarda sempre meia concha da água da massa...»*).
   - **Lume Vivo vs. Lume Brando:** Controlo de animações sensível ao utilizador com metáfora culinária calorosa.

4. **Sistema Tipográfico Editorial de Referência:**
   - **Títulos & Expressão:** `Fraunces Variable` (serifa com raízes no design editorial do início do século XX).
   - **Corpo & Interface:** `Plus Jakarta Sans` (geométrica, moderna e ultra-legível).
   - **Comandas & Dados:** `Space Mono` (autenticidade mecânica de máquina de talões).

---

### 💻 Como Executar a Landing Page Localmente

```bash
# Entrar na pasta da landing page
cd landing

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento (Vite)
npm run dev

# Compilar para produção (TypeScript + Vite)
npm run build
```

---

## 🍳 Aplicação Python (`app/`)

> *Secção reservada para a integração da aplicação central com CrewAI, FastAPI e Streamlit.*

---

## 👤 Autor

Criado e desenhado por **[Daniel Silva](https://github.com/danielsilvaengpt)** através de engenharia de contexto e vibe coding de alta precisão.
