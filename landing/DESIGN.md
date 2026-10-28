# DESIGN.md — Sistema Visual Mise V2 (Landing Page + Web App)

## 1. O Conceito Criativo: "A Bancada de Trabalho do Chef"

Se a Landing Page é a receção calorosa a uma casa de campo contemporânea com cheiro a lenha, a **Web App do Mise** é a **própria bancada de cozinha em pleno serviço**.
- **Metáfora:** Deixamos os ecrãs corporativos e entramos no atelier culinário: papéis de rascunho com notas à mão, fita adesiva de pintor (*masking tape*) a etiquetar frascos na despensa, carimbos de tinta prensada em madeira e comandas térmicas que saem com precisão.
- **Identidade:** Quente, humana, rigorosa, estética e cativante. Não parece um "software", parece uma ferramenta de artesão desenhada para quem tem prazer na mesa e na cozinha de aproveitamento.

---

## 2. Princípios Anti-IA (Zero Clichés de Inteligência Artificial)

A Web App respeita escrupulosamente os princípios anti-IA estipulados na V1:
1. **Sem "Sparkles" ou Estrelinhas:** Proibido o ícone de três estrelinhas (`Sparkles`) universalmente associado a ferramentas genéricas de IA.
2. **Sem Frieza de Chatbot:** O chat não tem avatares robóticos nem balões cinzentos de aplicação de mensagens descartável. O diálogo faz-se como um memorando de cozinha: os pedidos do utilizador são notas de comanda e as respostas da brigada são **fichas técnicas e tickets de restaurante ricamente desenhados**.
3. **Sem Gradientes Elétricos (Aurora/Neon):** Proibidos roxos, magentas e cianos de ficção científica. Toda a luminosidade vem de elementos naturais: azeite virgem, açafrão, brasa de tomate, papel envelhecido e ferro fundido.
4. **Textura Táctil e Fita Crepe:** Elementos de interface destacados (como novos alimentos ou a comanda em confeção) exibem acabamentos de fita adesiva de papel rasgada à mão nos cantos.

---

## 3. Paleta de Cores e Tokens

A aplicação mantém a paleta orgânica do Mise com suporte completo a **Modo Claro** (papel artesanal) e **Modo Escuro** (bancada noturna de ferro e pedra):

| Token | Modo Claro | Modo Escuro | Uso Gastronómico |
|---|---|---|---|
| `--paper` | `#FBF6EC` | `#17140F` | Fundo principal da bancada e base dos ecrãs |
| `--paper-2` | `#F3EAD8` | `#211D16` | Fundo dos cartões, balões de chat e gavetas |
| `--ink` | `#1E1B16` | `#F4ECDC` | Títulos e texto principal (máxima legibilidade) |
| `--ink-soft` | `#5C5547` | `#B3A98F` | Notas secundárias, unidades e legendas |
| `--tomato` | `#D8432B` | `#E04F37` | Ação principal, botão de enviar, alertas de validade expirada |
| `--olive` | `#4F5D2F` | `#728744` | Selo «DISPONÍVEL», alimentos frescos (>7 dias), sucesso |
| `--saffron` | `#E9A83B` | `#F5B853` | Selo «EM FALTA», alimentos a expirar (2–7 dias), foco |
| `--line` | `#D9CDB4` | `#3A3326` | Bordas de cadernos, separadores e picotados |

---

## 4. Tipografia de Autor

Mantém-se o sistema tipográfico de três famílias complementares:
1. **Fraunces Variable** (serifa expressiva): Nomes dos pratos principais, cabeçalhos de secção e números dos passos com ênfase humanista.
2. **Plus Jakarta Sans** (geométrica e humanista): Interface geral, botões, campos de entrada, etiquetas de formulário e textos descritivos.
3. **Space Mono** (monoespaçada): Comandas, gramagens e unidades, carimbos «DISPONÍVEL» / «EM FALTA», telemetria de tempos de cozedura e datas de validade.

---

## 5. Arquitetura Visual e Telas da Web App

### 5.1. Barra de Comandos da Cozinha (Layout Superior / Lateral)
- **Logótipo Mise:** Com link de regresso suave à Landing Page.
- **Seletor de Postos (Abas Principais):**
  - 🍳 **O Fogão (Chat):** Onde o pedido é feito e a receita nasce.
  - 🥫 **A Despensa (CRUD):** Onde os alimentos em stock são geridos.
  - 📖 **O Livro (Histórico):** O arquivo de receitas geradas anteriormente.
- **Controlos Rápidos & Telemetria:**
  - **Pílula de Ligação à API:** Indicador tátil no topo com pulso verde suave quando a API FastAPI está ligada (`● Backend Conectado`), ou aviso âmbar quando offline (`○ Backend Offline`), permitindo saber imediatamente se o servidor local está ativo.
  - Alternador de tema (Claro / Escuro).
  - Interruptor mestre **«Lume vivo / Lume brando»** (gestão de animações suaves e acessibilidade).

---

### 5.2. Módulo 1: O Fogão (Chat com a Brigada)
- **Área de Diálogo:**
  - **Mensagem do Utilizador:** Cartão ligeiro com borda de fita de marinheiro, alinhado à direita, texto nítido em `Plus Jakarta Sans`.
  - **Estado de Orquestração da Brigada (Loading Cinemático):**
    Quando o pedido é enviado (`POST /ask`), surge um mostrador sequencial com 3 luzes indicadoras e microanimação tátil:
    1. *«O Chef está a analisar a despensa e a propor duas ideias...»*
    2. *«O Redator está a converter a escolha em passos numerados...»*
    3. *«O Revisor está a inspecionar temperaturas e restrições...»*
  - **Resposta da Brigada (O Ticket Vivo):**
    A resposta em Markdown é renderizada com um componente visual idêntico a uma **comanda de restaurante de autor**:
    - Cabeçalho picotado com número da comanda (ex.: `RECEITA Nº 042`).
    - Nome do prato em `Fraunces` grande e imponente.
    - Badges de tempo de preparação, doses e nível de dificuldade.
    - **Tabela de Honestidade de Ingredientes:**
      - Verde-azeitona com carimbo `DISPONÍVEL` para o que está na despensa.
      - Açafrão com carimbo `EM FALTA` (com nota de substituição quando aplicável).
    - Passos de confeção numerados em `Space Mono`, com instruções concisas e tempos exatos.
    - Botão de ação rápida no rodapé do ticket: **«Copiar Receita»** e **«Imprimir Comanda»**.

---

### 5.3. Módulo 2: A Despensa Digital (CRUD de Alimentos)
- **Cabeçalho da Despensa:** Mostra o total de alimentos registados e resumo de alertas (ex.: *«12 alimentos registados · 2 a expirar esta semana»*).
- **Botão Primário de Ação:** `+ Adicionar Alimento` (botão com efeito magnético no hover).
- **Grelha de Alimentos:**
  - Cada alimento é apresentado como um **frasco/etiqueta de mantimentos**:
    - Nome do alimento em destaque tipográfico.
    - Quantidade e unidade com controlos imediatos de ajuste `−` e `+` (acionam `PATCH /alimentos/quantidade`).
    - Chips de restrições alimentares (ex.: `Sem Glúten`, `Vegan`).
    - **Indicador Cromático de Validade:**
      - 🟢 Verde-azeitona: Validade folgada (> 7 dias).
      - 🟡 Açafrão: Consumo prioritário (entre 2 e 7 dias).
      - 🔴 Tomate: Alerta imediato (hoje, amanhã ou já caducado).
    - Botão discreto de remoção com confirmação tátil (aciona `DELETE /alimentos`).
- **Painel Modal de Criação (`AddFoodModal`):**
  - Desliza suavemente como um bloco de notas de mercearia.
  - Campos: Nome, Quantidade, Unidade (com seletor rápido: g, kg, un, ml, l, c. sopa, dentes), Restrições e Calendário de Validade.

---

### 5.4. Módulo 3: O Livro de Receitas (Histórico)
- **Catálogo Cronológico:** Lista das receitas previamente geradas (`GET /receitas`), apresentadas como fichas de arquivo culinário encadernadas.
- **Informação de Cada Entrada:** Título do prato, data e hora de criação formatadas em português (ex.: `28/10/2026 às 19:30`).
- **Interação:** Clicar num item abre a gaveta de visualização com o **Ticket Completo**, permitindo reler todos os passos e ingredientes sem necessidade de voltar a gastar tokens de IA.

---

## 6. Física de Movimento e Microinterações (Framer Motion)

- **Transição Entre Postos (Tabs):** Deslize lateral com fade suave (`x: 16`, `opacity: 0` para `x: 0`, `opacity: 1`), transmitindo fluidez contínua.
- **Ajuste de Quantidades:** O número da quantidade sofre uma micro-elevação elástica ao ser incrementado ou decrementado.
- **Carimbos:** Os carimbos de validação surgem com rotação aleatória subtil (−2° a +2°) e impacto suave de batimento com borracha.
- **Respeito Acessível (`prefers-reduced-motion`):**
  - Quando o modo de movimento reduzido está ativo no sistema ou o interruptor «Lume brando» é selecionado, todas as transições tornam-se cortes diretos sem desfoques nem deslocamentos espaciais.
