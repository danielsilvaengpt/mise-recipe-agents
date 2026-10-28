# mise. — Studio de receitas com IA

Aplicação web que transforma os alimentos disponíveis na despensa em receitas personalizadas. Três agentes de IA trabalham em sequência — Chef, Redator e Revisor — para propor, escrever e validar cada receita.

## Funcionalidades

- Gerar receitas com base nos alimentos registados na despensa.
- Indicar restrições alimentares, tempo disponível e número de doses.
- Acompanhar quantidades e datas de validade dos alimentos.
- Guardar receitas geradas e descarregá-las em Markdown.
- Consultar sugestões de substituição e temperaturas internas seguras.

## Tecnologias

- **Interface:** Streamlit
- **API:** FastAPI
- **Agentes:** CrewAI
- **Modelo de linguagem:** Groq, através do LiteLLM
- **Persistência local:** ficheiros JSON e Markdown

## Requisitos

- Python 3.10 ou superior
- Uma chave de API da [Groq](https://console.groq.com/keys)

## Instalação

Execute os comandos a partir da pasta `backend`.

### Windows (PowerShell)

```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
```

### macOS ou Linux

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
pip install -r requirements.txt
```

Crie um ficheiro `.env` na pasta `backend` com a chave da Groq:

```dotenv
GROQ_API_KEY=a_sua_chave_da_groq
```

Opcionalmente, indique o endereço da API se não estiver a usar o endereço predefinido:

```dotenv
API_URL=http://127.0.0.1:8000
```

Não partilhe nem publique o ficheiro `.env`.

## Executar

Inicie a API e a interface em dois terminais diferentes, ambos na pasta `backend` e com o ambiente virtual ativo.

**Terminal 1 — API:**

```bash
uvicorn src.api.api:app --reload
```

A documentação interativa da API fica disponível em [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).

**Terminal 2 — interface web:**

```bash
streamlit run app.py
```

O Streamlit apresenta o endereço local da aplicação no terminal, normalmente [http://localhost:8501](http://localhost:8501).

### Modo de linha de comandos

Também é possível pedir uma receita diretamente no terminal:

```bash
python main.py
```

## Como funciona

1. Registe os alimentos e respetivas quantidades, unidades, restrições e validades na despensa.
2. Escolha os ingredientes a utilizar e indique as preferências da receita.
3. A API envia o pedido para uma equipa de agentes CrewAI:
   - **Chef:** propõe e escolhe um prato adequado.
   - **Redator:** escreve a receita com ingredientes e passos.
   - **Revisor:** verifica a coerência e o respeito pelo pedido.
4. A receita é apresentada na interface e guardada localmente.

## API

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/` | Verifica se a API está disponível. |
| `POST` | `/ask` | Gera e guarda uma receita. Recebe `{"question": "..."}`. |
| `GET` | `/receitas` | Lista as receitas guardadas. |
| `GET` | `/receitas/{ficheiro}` | Obtém uma receita guardada. |
| `GET` | `/alimentos` | Lista os alimentos da despensa. |
| `POST` | `/alimentos` | Adiciona um alimento à despensa. |
| `DELETE` | `/alimentos?nome=...` | Remove um alimento. |
| `PATCH` | `/alimentos/quantidade?nome=...` | Ajusta a quantidade de um alimento. |

## Dados locais

- A despensa é lida e atualizada em `src/data/JsonFiles/alimentos.json`.
- As receitas geradas são guardadas na pasta `outputs/`.
- A pasta `outputs/`, os ambientes virtuais, as caches e os segredos locais estão excluídos do Git pelo `.gitignore`.

## Estrutura do projeto

```text
backend/
├── app.py                  # Interface Streamlit
├── main.py                 # Execução por linha de comandos
├── tema.py                 # Estilos da interface
├── requirements.txt        # Dependências Python
└── src/
    ├── api/api.py          # Endpoints FastAPI
    ├── Crew/               # Agentes, tarefas, modelo e ferramentas
    ├── Repositories/       # Persistência da despensa
    ├── data/               # Modelos e ficheiros JSON
    └── utils/              # Funções auxiliares
```