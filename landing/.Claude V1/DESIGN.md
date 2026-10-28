# DESIGN.md — Sistema visual Mise

## 1. Conceito criativo: "A cozinha dos agentes"
Em vez do típico site de receitas (fotos de comida genéricas, verde "saudável"), o conceito é
**um caderno de cozinha de tasca portuguesa encontra uma mesa de comando de IA**.
- Marca: **Mise** (alusão a *mise en place* — tudo no seu lugar antes de cozinhar).
- Calor, papel, tinta e ingredientes (o chef) **+** rigor, fluxos e etiquetas (a brigada de cozinha).
- Elemento assinatura: **a receita como "ticket de cozinha"** — cartões com fita de mascarar de chef (*masking tape*), bordas picotadas, carimbos com textura física de borracha ("DISPONÍVEL" / "EM FALTA") e um fio de linha tracejada que liga os 3 especialistas da brigada.
- Personalidade: confiante, caseira, inteligente, com atenção ao detalhe físico de um atelier gastronómico. Nunca fria, nunca robótica, nunca infantil.

**Princípios Anti-IA & Human Craft (Proibição estrita de AI-clichés):**
- **Zero Sparkles:** Proibido o uso de ícones de três faíscas/estrelinhas (`Sparkles`), o cliché universal de IA genérica.
- **Vocabulário Culinário Autêntico:** Substituição de termos de computação frios (*"pipeline sequencial"*, *"agentes de IA"*) por conceitos da tradição gastronómica (*"ordem de brigada"*, *"mise en place"*, *"serviço de três tempos"*).
- **Textura Táctil de Papel:** Camada subtil de grão analógico SVG com micro-ruído de prensa de tipografia, quebrando a frieza lisa de ecrãs de computador.
- **Artefactos Materiais Reais:** Fita adesiva crepe de cozinheiro (*masking tape* rasgada à mão), notas de margem com caligrafia de cozinheiro (*marginalia*), carimbos com tinta orgânica e textura de borracha envelhecida.
- **Humor e Calor de Cozinha:** Controlos temáticos (ex.: alternador de animações como *«Lume vivo»* vs. *«Lume brando»*, em vez de switches técnicos genéricos).
- Evitar: gradientes roxo/azul "aurora", glassmorphism plástico, fotos de banco de imagem, emojis soltos.

## 2. Cor (tokens)
Modo claro por defeito (papel quente). Modo escuro opcional.

| Token | Hex | Uso |
|---|---|---|
| `--paper` | `#FBF6EC` | Fundo principal |
| `--paper-2` | `#F3EAD8` | Secções alternadas, cartões |
| `--ink` | `#1E1B16` | Texto principal |
| `--ink-soft` | `#5C5547` | Texto secundário |
| `--tomato` | `#D8432B` | Cor de ação (CTA), destaques |
| `--olive` | `#4F5D2F` | "Disponível", sucesso |
| `--saffron` | `#E9A83B` | Realces, selos, "em falta" |
| `--line` | `#D9CDB4` | Bordas e linhas tracejadas |

Escuro: `--paper #17140F`, `--paper-2 #211D16`, `--ink #F4ECDC`, `--ink-soft #B3A98F`, `--line #3A3326`.
Contraste mínimo AA em todos os pares texto/fundo. CTA: fundo `--tomato`, texto `--paper`.

## 3. Tipografia (Sistema 1: Tasca Contemporânea & Editorial de Luxo)
- **Títulos:** `Fraunces Variable` (serifada expressiva, variable `opsz`) — pesos 600–800, tracking ligeiramente negativo, com itálicos editoriais em palavras de ênfase (ex.: *inventamos*).
- **Corpo/UI:** `Plus Jakarta Sans` — 400/500/600/700 (quente, geométrica, humanista e elegante).
- **Detalhe "ticket"/dados:** `Space Mono` — etiquetas, quantidades, passos e comanda (estética de talão de cozinha mecânico e autêntico).
- Escala fluida: H1 `clamp(2.6rem, 6vw, 5.2rem)`, H2 `clamp(1.9rem, 4vw, 3.2rem)`, corpo `1.0625rem/1.65`.
- Largura máx. de texto: 62ch.

## 4. Layout e espaçamento
- Container: `max-w-6xl`, padding lateral 20px (mobile) / 32px (desktop).
- Ritmo vertical: secções com `py-20 md:py-32`.
- Grelha de 12 colunas; hero assimétrico (texto 6 col / visual 6 col).
- Raio: 14px cartões, 999px botões/etiquetas. Bordas 1.5px `--line`. Sombras suaves e quentes
  (`0 10px 30px -12px rgba(60,40,10,.25)`).

## 5. Componentes-chave
- **Botão primário:** pílula `--tomato`, seta que desliza 4px no hover, foco com anel `--saffron`.
- **Botão secundário:** contorno `--ink`, fundo transparente.
- **Ticket (cartão de receita):** fundo `--paper`, borda picotada (mask em CSS) em cima/baixo, cabeçalho mono
  ("RECEITA Nº 014"), tabela de ingredientes com selos.
- **Selo/carimbo:** rotação −3°, borda dupla, mono maiúsculas. Verde-azeitona = DISPONÍVEL; açafrão = EM FALTA.
- **Fio dos agentes:** linha tracejada SVG que se "desenha" ao fazer scroll, ligando Chef → Redator → Revisor.
- **Navbar:** transparente, ganha fundo `--paper` com blur leve ao fazer scroll. Logo em Fraunces.

## 6. Secções (ordem)
1. **Navbar** — logotipo, navegação, seletor de tema e interruptor mestre «Lume vivo / Lume brando»
2. **Hero** — promessa + CTA + ticket de receita com fita crepe de cozinheiro e extrusão mecânica cristalina
3. **Carrossel da Stack Tecnológica** — infinite marquee contínuo a 60 FPS com 9 ferramentas e links oficiais
4. **Problema** — "Tens comida em casa e não sabes o que cozinhar"
5. **Os 3 agentes (Brigada)** — mesa de orquestração com 3 postos (Chef, Redator, Revisor) com tipografia horizontal pixel-perfect
6. **Como funciona** — 3 passos (regista despensa → pede → recebe receita)
7. **Despensa** — mockup da lista de alimentos com validade
8. **Honestidade ingrediente** — "Disponível vs. em falta" (o diferenciador)
9. **Pré-visualização da receita** — exemplo completo em Markdown com anotação manual de fogão
10. **FAQ** — acordeão acessível
11. **CTA final** + **Footer** (com link direto de código aberto para o GitHub)

## 7. Movimento, Interatividade e Nitidez Tipográfica
- **Regra de Ouro de Nitidez Tipográfica (Zero 3D Blur):**
  - Textos de leitura nunca devem sofrer rotações 3D contínuas (`preserve-3d`, `rotateX/Y` agressivos) nem filtros de desfoque (`filter: blur(...)`).
  - Fontes renderizadas com antialiasing subpixel nítido (`-webkit-font-smoothing: antialiased`, `text-rendering: optimizeLegibility`).
  - Texturas analógicas de papel mantidas sempre no fundo (`z-0`) para não interferir na acuidade das letras.
- **Hero — Abertura Cinemática «A Bancada Noturna do Chef»:**
  - Iluminação volumétrica de estúdio: foco dinâmico que projeta luz quente (`--saffron` / `--paper`) e profundidade de campo que reage ao cursor do rato.
  - Coreografia sequencial de abertura com extrusão mecânica suave e estável, assentando com tipografia perfeitamente horizontal e nítida.
  - Comando cinemático «↺ Rever Sequência» para acionar a experiência a qualquer momento.
- **Carrossel da Stack Tecnológica (Infinite Marquee):**
  - Loop contínuo a 60 FPS com desvanecimento lateral (*edge vignette fade*) ligando o ecossistema à documentação oficial.
  - Pausa e renderização estática imediata quando em modo «Lume brando».
- **A Brigada de Cozinha — Mesa de Orquestração com Tipografia Nítida:**
  - 3 postos de trabalho coordenados por linha do tempo automática (5.5s) e controlo manual (Play/Pause).
  - Transições puras entre estações sem distorções fracionárias ou rotações diagonais, garantindo leitura rápida e agradável.
- **Controlo Mestre de Animações («Lume Vivo» vs. «Lume Brando»):**
  - Alternador temático na Navbar ligado a `MotionContext`, comandando instantaneamente todas as secções da página.
- **Despensa e Listas — Efeito Fita Adesiva / Etiqueta Destacada:**
  - As linhas da lista da despensa reagem ao hover com ligeira elevação elástica e efeito de etiqueta adesiva.
- **Botões — Microinteração Magnética:**
  - Os botões primários têm uma atração magnética subtil em direção ao cursor quando o ponteiro se aproxima (`magnetic button`).
- **Acessibilidade e Desempenho:**
  - **Obrigatório:** Se `prefers-reduced-motion: reduce` estiver ativo, todas as transformações 3D no rato, pulsos contínuos e passos mecânicos são desativados, mantendo apresentação estática, legível e limpa.
  - 60fps constantes com aceleração por hardware e transformações CSS/SVG.

## 8. Imagem e ícones
- Sem fotos de stock. Usar **ilustrações SVG** simples (ingredientes em traço, estilo gravura) e mockups em HTML/CSS.
- Ícones: `lucide-react`, traço 1.75px, cor `--ink`.
- Favicon: monograma "M" em Fraunces sobre `--tomato`.
- OG image 1200×630: ticket de receita com a marca Mise sobre `--paper`.

## 9. Tom de voz
Português de Portugal. Direto, caloroso, com humor leve de cozinha caseira. Frases curtas.
Exemplo: "Abre o frigorífico. Nós tratamos do resto."
