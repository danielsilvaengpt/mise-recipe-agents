# Mise — Receitas com IA a partir da tua despensa

> *Mise en place* na tua cozinha: uma brigada de especialistas de IA que criam receitas com o que realmente tens em casa e dizem-te, com rigor e honestidade, o que te falta.

---

## Estrutura do Repositório

```text
mise-recipe-agents/
├── landing/    # Landing page estática de alta fidelidade (Vite + React 19 + TypeScript + Tailwind CSS + Framer Motion)
└── app/        # Aplicação interativa em Python (CrewAI + FastAPI + Streamlit)
```

---

## 🍽️ 1. Landing Page (`landing/`)

Página de apresentação desenvolvida com direção de arte editorial gastronómica e foco em *human craft*:

- **Stack:** Vite, React 19, TypeScript, Tailwind CSS, Framer Motion, Lucide React.
- **Tipografia:** Fraunces (títulos editoriais), Plus Jakarta Sans (interface e corpo) e Space Mono (comandas e talões).
- **Funcionalidades:** Abertura cinemática em estúdio, mesa de orquestração 3D da brigada, mockup interativo de despensa e cálculo de ingredientes disponíveis vs. em falta.

### Como correr a landing page localmente:

```bash
cd landing
npm install
npm run dev
```

Para gerar a compilação de produção:

```bash
npm run build
```

---

## 🍳 2. Aplicação Python (`app/`)

Aplicação central com a lógica de agentes inteligentes e interface de utilizador:

- **Brigada de Cozinha:**
  - **Chef Criativo:** Avalia o pedido e a despensa disponível, selecionando a melhor proposta culinária.
  - **Redator de Receitas:** Estrutura passos precisos, tempos, quantidades e regras de execução.
  - **Revisor de Segurança:** Valida restrições alimentares, temperaturas seguras e consistência da lista de compras.

---

## Licença

Projeto desenvolvido por [Daniel Silva](https://github.com/danielsilvaengpt).
