# CONTENT.md — Textos Oficiais da Plataforma Mise V2 (PT-PT)

> **Fonte Única de Verdade:** Todos os textos e mensagens da interface devem ser extraídos exclusivamente deste ficheiro. Proibido inventar termos técnicos, mensagens em inglês ou grafia que não seja Português de Portugal.

---

## 1. Navegação Geral da Web App

- **Botão de Regresso:** `← Voltar à Apresentação`
- **Abas Principais:**
  - `O Fogão` (Chat com a Brigada)
  - `A Despensa` (Gestão de Ingredientes)
  - `O Livro de Receitas` (Histórico Arquivado)
- **Interruptor de Movimento:**
  - Ativo: `Lume vivo (Animações ativas)`
  - Inativo: `Lume brando (Modo estático / suave)`
- **Indicador de Estado da API do Backend:**
  - Ligado (Online): `● API do Backend Ativa (localhost:8000)`
  - Desligado (Offline): `○ API do Backend Offline · Inicia o servidor Python: uvicorn src.api.api:app --reload`
- **Aviso de Backend Offline (Banner Superior):**
  - `Atenção: O servidor backend (FastAPI) não está acessível na porta 8000. Para fazeres pedidos à brigada, gerires a despensa e consultares receitas reais, inicia o backend no terminal: cd backend && uvicorn src.api.api:app --reload`

---

## 2. O Fogão (Chat e Geração de Receitas)

- **Título do Ecrã:** `O Fogão da Brigada`
- **Subtítulo:** `Diz o que te apetece, o tempo disponível ou para quantas pessoas queres cozinhar. O Chef, o Redator e o Revisor tratam de tudo.`
- **Sugestões Rápidas de Início (Chips de Rascunho):**
  - `Jantar rápido para duas pessoas com o que tenho no frigorífico`
  - `Refeição reconfortante de aproveitamento sem carne`
  - `Almoço ligeiro e saciante em menos de 20 minutos`
  - `Ideia simples e saudável para aproveitar legumes esquecidos`
- **Caixa de Entrada (Input do Pedido):**
  - Placeholder: `Escreve aqui o teu pedido culinário... (ex.: Quero um prato quente para hoje à noite)`
  - Botão de Envio: `Lançar Pedido →`
  - Dica de Atalho: `Pressiona Enter para enviar`

### Estados da Orquestração da Brigada (Loading)
- `A consultar os mantimentos na despensa...`
- `1. O Chef Criativo está a desenhar duas opções com base no teu pedido...`
- `2. O Redator de Receitas está a estruturar as quantidades e passos de preparação...`
- `3. O Revisor de Segurança está a verificar temperaturas e restrições alimentares...`

### Ticket da Receita Gerada (Comanda de Cozinha)
- **Número de Série:** `COMANDA DE COZINHA Nº {numero}`
- **Carimbos de Auditoria:**
  - `BRIGADA MISE · REVISADO E APROVADO`
  - `SEGURANÇA ALIMENTAR CONFIRMADA`
- **Metadados do Prato:**
  - Tempo: `Tempo estimado: {tempo}`
  - Doses: `Rendimento: {doses}`
  - Dificuldade: `Dificuldade: {dificuldade}`
- **Tabela de Honestidade de Ingredientes:**
  - Título: `Ingredientes e Mantimentos`
  - Colunas: `Ingrediente`, `Dose necessária`, `Estado na Despensa`
  - Selo Verde: `DISPONÍVEL NA DESPENSA`
  - Selo Açafrão: `EM FALTA (SUGESTÃO DE SUBSTITUIÇÃO)`
  - Nota de Básicos: `* Sal, azeite, água e pimenta assumem-se sempre disponíveis na bancada.`
- **Passos de Confeção:**
  - Título: `Instruções de Preparação`
  - Indicador de Passo: `PASSO {n}`
- **Ações da Comanda:**
  - `Copiar Ficha Culinária`
  - `Imprimir Comanda`
  - Feedback de Cópia: `Receita copiada com sucesso para a área de transferência!`

---

## 3. A Despensa Digital (CRUD de Alimentos)

- **Título do Ecrã:** `A Minha Despensa`
- **Subtítulo:** `Cada ingrediente registado permite à brigada saber exatamente com o que pode contar para criar as tuas receitas sem desperdício.`
- **Resumo de Inventário:**
  - `{total} alimentos registados`
  - `{urgentes} com validade próxima ou urgente`
- **Botão de Ação Primária:** `+ Registar Novo Ingrediente`
- **Filtros de Visualização:**
  - `Todos os mantimentos`
  - `Consumo urgente (< 3 dias)`
  - `Dentro do prazo normal`

### Cartão de Alimento na Grelha
- **Controlos de Quantidade:**
  - Botão Menos: `Reduzir quantidade (−)`
  - Botão Mais: `Aumentar quantidade (+)`
- **Crachás de Validade:**
  - `Fresco · Válido até {data}` (Mais de 7 dias)
  - `Consumir em breve · Restam {dias} dias` (Entre 2 e 7 dias)
  - `Urgente · Caduca hoje ou amanhã` (Até 24h)
  - `Caducado há {dias} dias` (Data ultrapassada)
- **Botão de Eliminação:** `Remover ingrediente`
- **Diálogo de Confirmação:** `Tens a certeza de que queres retirar «{nome}» da tua despensa?`
  - `Confirmar remoção` / `Manter na despensa`

### Formulário de Registo (`AddFoodModal`)
- **Título do Modal:** `Registar Alimento na Despensa`
- **Subtítulo:** `Adiciona o que tens guardado no frigorífico ou armário.`
- **Etiquetas de Campos e Sugestões:**
  - Nome do Alimento: `Nome do ingrediente`
    - Placeholder: `ex.: Grão-de-bico cozido, Ovos frescos, Cenouras`
  - Quantidade: `Quantidade existente`
    - Placeholder: `ex.: 400`
  - Unidade de Medida: `Unidade`
    - Opções: `g (gramas)`, `kg (quilogramas)`, `un (unidades)`, `ml (mililitros)`, `l (litros)`, `c. sopa (colheres)`, `dentes (alho)`
  - Data de Validade: `Data de validade limite`
  - Restrições / Etiquetas Alimentares: `Restrições ou características`
    - Opções rápidas: `Sem glúten`, `Vegan`, `Vegetariano`, `Sem lactose`, `Biológico`
- **Botões do Formulário:**
  - Cancelar: `Voltar atrás`
  - Submeter: `Guardar Ingrediente na Despensa`
- **Validações:**
  - `O nome do alimento é obrigatório.`
  - `A quantidade tem de ser maior que zero.`
  - `A data de validade deve cumprir o formato AAAA-MM-DD.`

---

## 4. O Livro de Receitas (Histórico de Confeções)

- **Título do Ecrã:** `O Livro de Receitas da Casa`
- **Subtítulo:** `O histórico completo de todas as receitas geradas pela brigada de agentes, arquivadas e prontas a repetir.`
- **Contador:** `{total} fichas de cozinha guardadas`
- **Lista de Entradas:**
  - Rótulo de Data: `Preparada a {data} às {hora}`
  - Botão de Ação: `Abrir comanda completa →`
- **Estado Vazio (Quando ainda não há histórico):**
  - `O teu livro de receitas ainda está em branco.`
  - `Visita o Fogão, faz o teu primeiro pedido à brigada e guarda aqui as tuas criações favoritas para cozinhares quando quiseres.`
  - Botão: `Ir para o Fogão agora →`

---

## 5. Notificações e Mensagens de Sistema (Toasts)

- **Sucesso ao Adicionar Alimento:** `«{nome}» guardado com sucesso na tua despensa!`
- **Sucesso ao Ajustar Quantidade:** `Quantidade de «{nome}» atualizada.`
- **Sucesso ao Remover Alimento:** `«{nome}» retirado da despensa.`
- **Erro de Rede / Backend Offline:** `Não foi possível ligar ao servidor local (porta 8000). A utilizar a memória local da bancada.`
- **Erro de Pedido Vazio:** `Escreve o teu pedido antes de chamar a brigada de cozinha.`
