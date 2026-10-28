from datetime import datetime
from pathlib import Path

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from src.Crew.crew import run_crew
from src.data.models import Alimento
from src.Repositories.alimento import AlimentoRepository

PASTA = Path("outputs")


class AskRequest(BaseModel):
    question: str


class AskResponse(BaseModel):
    answer: str


class AjusteQuantidade(BaseModel):
    delta: float


app = FastAPI()
repo = AlimentoRepository()


@app.get("/")
async def root():
    return {"message": "Hello World"}


# --------------------------------------------------------------------------- #
# Receitas (crew)
# --------------------------------------------------------------------------- #
@app.post("/ask", response_model=AskResponse)
def ask(request: AskRequest):
    if not request.question.strip():
        raise HTTPException(status_code=422, detail="O pedido está vazio.")

    crew = run_crew(request.question)
    if crew is None:  # run_crew devolve None se o modelo não arrancar
        raise HTTPException(status_code=500, detail="Não foi possível iniciar o modelo. Verifica a GROQ_API_KEY.")

    try:
        resultado = crew.kickoff()
    except Exception as erro:
        raise HTTPException(status_code=500, detail=f"Erro ao gerar receita: {erro}")

    receita = str(resultado)

    PASTA.mkdir(exist_ok=True)
    nome = datetime.now().strftime("receita_%Y%m%d_%H%M%S.md")
    (PASTA / nome).write_text(receita, encoding="utf-8")

    return AskResponse(answer=receita)


def _titulo(texto: str) -> str:
    for linha in texto.splitlines():
        if linha.lstrip().startswith("#"):
            return linha.lstrip("# ").strip().replace("**", "") or "Receita sem título"
    return "Receita sem título"


@app.get("/receitas")
def listar_receitas():
    if not PASTA.exists():
        return []
    itens = []
    for caminho in sorted(PASTA.glob("receita_*.md"), reverse=True):
        try:
            data = datetime.strptime(caminho.stem.replace("receita_", ""), "%Y%m%d_%H%M%S")
            data_txt = data.strftime("%d/%m/%Y %H:%M")
        except ValueError:
            data_txt = caminho.name
        itens.append(
            {
                "ficheiro": caminho.name,
                "titulo": _titulo(caminho.read_text(encoding="utf-8")),
                "data": data_txt,
            }
        )
    return itens


@app.get("/receitas/{ficheiro}")
def ler_receita(ficheiro: str):
    caminho = PASTA / Path(ficheiro).name  # .name evita path traversal
    if not caminho.exists() or caminho.suffix != ".md":
        raise HTTPException(status_code=404, detail="Receita não encontrada.")
    return {"ficheiro": caminho.name, "texto": caminho.read_text(encoding="utf-8")}


# --------------------------------------------------------------------------- #
# Alimentos (despensa)
# O nome vai em query string (?nome=) para aceitar espaços, acentos e barras.
# --------------------------------------------------------------------------- #
@app.get("/alimentos")
def listar_alimentos():
    return repo.get_alimentos()


@app.post("/alimentos", status_code=201)
def criar_alimento(alimento: Alimento):
    if alimento.quantidade <= 0:
        raise HTTPException(status_code=422, detail="A quantidade tem de ser maior que zero.")
    try:
        datetime.strptime(alimento.validade, "%Y-%m-%d")
    except ValueError:
        raise HTTPException(status_code=422, detail="A validade tem de estar no formato AAAA-MM-DD.")
    repo.add_alimento(alimento)
    return alimento


@app.delete("/alimentos")
def apagar_alimento(nome: str):
    if not any(a["nome"] == nome for a in repo.get_alimentos()):
        raise HTTPException(status_code=404, detail=f"'{nome}' não existe na despensa.")
    repo.remove_alimento(nome)
    return {"removido": nome}


@app.patch("/alimentos/quantidade")
def ajustar_quantidade(nome: str, ajuste: AjusteQuantidade):
    if not any(a["nome"] == nome for a in repo.get_alimentos()):
        raise HTTPException(status_code=404, detail=f"'{nome}' não existe na despensa.")
    repo.change_quantidade(nome, ajuste.delta)
    return {"nome": nome, "delta": ajuste.delta}