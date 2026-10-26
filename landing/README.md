# Mise — Landing Page

> *Mise en place* na tua cozinha: uma brigada de especialistas que criam receitas com o que realmente tens em casa e dizem-te, sem rodeios, o que te falta.

Para a documentação completa, metodologia de Vibe Coding e histórico de fases, consulta o [README principal do repositório](../README.md).

---

## Stack Tecnológica

- **Framework:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Animações & Física:** [Framer Motion](https://www.framer.com/motion/)
- **Ícones:** [Lucide React](https://lucide.dev/)
- **Tipografia:** Google Fonts (`Fraunces`, `Plus Jakarta Sans`, `Space Mono`)

---

## Comandos Disponíveis

```bash
# Instalar dependências
npm install

# Iniciar servidor local com suporte a rede
npm run dev

# Compilar para produção com verificação TypeScript estrita
npm run build

# Pré-visualizar o build de produção localmente
npm run preview
```

---

## Variáveis de Ambiente

Cria um ficheiro `.env` baseado em `.env.example`:

```bash
VITE_APP_URL=https://agentes-cozinha.streamlit.app
```
