# CLAUDE.md — Landing page Mise

> Lê este ficheiro primeiro. Depois lê `MEMORY.md` (o que já foi feito e decidido), `DESIGN.md` (visual),
> `CONTENT.md` (textos) e `TASKS.md` (plano).
> **No fim de cada sessão ou fase, atualiza `MEMORY.md`** (estado, próximo passo, decisões, problemas).
> Se usares o Antigravity, copia este ficheiro também para `AGENTS.md` (ou `GEMINI.md`) na raiz.

## 1. O que é o produto
**Mise** (anteriormente AgentesCozinha) é uma app em Streamlit que orquestra uma equipa de agentes de IA para criar uma receita
a partir de dois inputs:
1. O **pedido** da pessoa (ex.: "algo rápido, sem glúten, para 2 pessoas").
2. Os **alimentos registados na despensa** (nome, quantidade, unidade, restrições, validade).

Se faltarem ingredientes, a receita **não falha**: mantém-se e diz claramente **o que está disponível e o que falta**.

### Como funciona (fonte de verdade: o código)
- **Pipeline sequencial de 3 agentes (CrewAI):**
  1. **Chef criativo** — propõe 2 pratos e escolhe o melhor.
  2. **Redator de receitas** — escreve a receita completa com quantidades e passos numerados.
  3. **Revisor de receitas** — valida realismo, segurança alimentar e restrições; devolve a versão final em Markdown.
- **Ferramentas dos agentes:** substituições de ingredientes, temperaturas internas seguras, consulta da despensa.
- **Despensa:** CRUD de alimentos (nome, quantidade, unidade, restrições, validade AAAA-MM-DD), guardada em JSON.
- **Regra dos básicos:** sal, azeite, água e pimenta assumem-se sempre disponíveis.
- **Saída:** receita em Markdown com tabela "disponível vs. em falta" + passos numerados; guardada em histórico.
- **Stack da app:** Streamlit (UI), FastAPI (API), CrewAI, LLM via Groq (`gpt-oss-120b`).
- **Língua:** Português de Portugal.

## 2. Objetivo da landing page
Converter visitantes em utilizadores: **clicar em "Experimentar"** e abrir a app Streamlit.
Secundário: perceber rapidamente como funciona (3 agentes) e confiar no resultado (segurança + sem desperdício).

- **CTA primário:** "Experimentar agora" → `APP_URL` (variável de ambiente, ver abaixo).
- **CTA secundário:** "Ver como funciona" → scroll para a secção de agentes.
- **Público:** pessoas que cozinham em casa e querem aproveitar o que têm; curiosos de IA/portfolio.

## 3. Stack da landing (decisão)
- **Vite + React + TypeScript**
- **Tailwind CSS** (tokens definidos em `DESIGN.md`)
- **Framer Motion** para animações (respeitar `prefers-reduced-motion`)
- **lucide-react** para ícones
- Sem backend. Site 100% estático. Deploy em Vercel/Netlify/GitHub Pages.
- Variável: `VITE_APP_URL` (URL do Streamlit). Nunca hardcode.

## 4. Estrutura de pastas
```
landing/
├── CLAUDE.md  DESIGN.md  CONTENT.md  TASKS.md
├── index.html
├── src/
│   ├── main.tsx  App.tsx  index.css
│   ├── components/   (Navbar, Hero, Problem, Agents, HowItWorks, Pantry, RecipePreview, Faq, CtaFinal, Footer)
│   ├── data/content.ts      # todos os textos vêm daqui (de CONTENT.md)
│   └── lib/                 # utilitários
└── public/                  # favicon, og-image
```

## 5. Regras de trabalho (obrigatórias)
1. **Textos só de `CONTENT.md`**. Não inventes funcionalidades, números, depoimentos ou logótipos de clientes.
2. **Estilo só de `DESIGN.md`**. Não uses cores/fontes fora dos tokens.
3. **Honestidade:** a app é um projeto novo. Sem "milhares de utilizadores", sem estrelas falsas.
4. Componentes pequenos, tipados, um por ficheiro. Sem `any`.
5. Acessibilidade: HTML semântico, contraste AA, foco visível, `alt` em imagens, navegação por teclado.
6. Mobile-first. Testar 375px, 768px, 1280px, 1536px.
7. Performance: imagens em WebP/SVG, fontes com `font-display: swap`, Lighthouse ≥ 95.
8. SEO: `<title>`, meta description, Open Graph, `lang="pt-PT"`.
9. Todo o texto da interface em **Português de Portugal** (ex.: "ecrã", "ficheiro", "utilizador").
10. Commits pequenos e descritivos. Antes de dar por concluído: `npm run build` sem erros nem warnings.

## 6. Comandos
```bash
npm install
npm run dev       # desenvolvimento
npm run build     # produção
npm run preview   # testar build
```

## 7. Definição de "pronto"
- [ ] Todas as secções de `CONTENT.md` implementadas
- [ ] Responsivo e acessível (teclado + leitor de ecrã básico)
- [ ] CTA funcional via `VITE_APP_URL`
- [ ] Lighthouse ≥ 95 (Performance, Acessibilidade, SEO, Boas práticas)
- [ ] Sem texto/números inventados