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
1. **Navbar**
2. **Hero** — promessa + CTA + ticket de receita animado (digitação dos ingredientes, carimbos a aparecer)
3. **Problema** — "Tens comida em casa e não sabes o que cozinhar"
4. **Os 3 agentes** — fio tracejado, 3 cartões (Chef, Redator, Revisor)
5. **Como funciona** — 3 passos (regista despensa → pede → recebe receita)
6. **Despensa** — mockup da lista de alimentos com validade
7. **Honestidade ingrediente** — "Disponível vs. em falta" (o diferenciador)
8. **Pré-visualização da receita** — exemplo completo em Markdown estilizado
9. **FAQ** — acordeão acessível
10. **CTA final** + **Footer**

## 7. Movimento e Interatividade (Ecossistema Cinemático: Artesanal e Tecnológico)
- **Hero — Abertura Cinemática «A Bancada Noturna do Chef»:**
  - Iluminação volumétrica de estúdio: foco dinâmico que projeta luz quente (`--saffron` / `--paper`) e profundidade de campo que reage ao cursor do rato.
  - Coreografia sequencial de abertura:
    1. Abertura do foco de luz suave sobre a bancada;
    2. A calha metálica em latão e ferro forjado acopla com magnetismo visual;
    3. A comanda de pedidos desenrola-se em câmara lenta com física de papel térmico, ondulando suavemente até assentar;
    4. A tipografia da receita ganha vida com brilho especular de tinta fresca a secar no papel;
    5. Os carimbos `DISPONÍVEL` e `EM FALTA` estampam com ressalto elástico e micro-ondas de sombra e partículas quentes;
    6. Flutuação tridimensional contínua (*floating physics*): o ticket mantém uma respiração orgânica no espaço 3D, com inclinação de perspetiva de alta sensibilidade (±14°) e reflexo de brilho dinâmico (*glare*).
  - Comando cinemático «↺ Rever Sequência» para acionar a experiência a qualquer momento.
- **Pipeline dos Agentes — Mesa de Orquestração Cinematográfica 3D:**
  - Bancada de comando em perspetiva 3D com iluminação de estúdio reativa ao cursor do rato (*dynamic spotlight* que projeta sombras quentes e reflexos nos postos de trabalho).
  - A comanda de papel físico viaja por uma calha mecânica tridimensional entre as 3 estações de trabalho:
    1. **Estação do Chef (A Forja de Ideias):** Entrada do pedido de rascunho. O Chef projeta e avalia duas propostas de receitas no ar, seleciona a vencedora e estampa-a com impacto elástico.
    2. **Estação do Redator (A Máquina de Escrever de Precisão):** A comanda desliza para o posto do redator. Uma cabeça tipográfica desenha as doses e os 5 passos numerados com tinta progressiva que transita de fresca para seca.
    3. **Estação do Revisor (O Scanner de Telemetria de Segurança):** Um scanner laser vertical verde-azeitona (`--olive`) varre a receita de cima a baixo. Painéis de telemetria laterais revelam dados de segurança alimentar em tempo real (*«Tempo [REALISTA]»*, *«Frango ≥ 74°C [SEGURO]»*, *«Alergénios [CONFIRMADOS]»*), rematado por um selo de segurança com onda de choque elástica.
  - Controlo interactivo: o utilizador pode alternar entre as 3 estações manualmente através de um seletor táctil de postos ou deixar o ciclo fluir em ritmo cinemático contínuo.
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
