from crewai.tools import tool
from src.Repositories.alimento import AlimentoRepository

SUBSTITUICOES = {
    "manteiga": "azeite (cerca de 3/4 da quantidade) ou margarina",
    "natas": "leite com um pouco de amido de milho",
    "açúcar": "mel (cerca de 3/4 da quantidade)",
    "ovo": "1 colher de sopa de linhaça moída com 3 de água, por ovo (só em bolos e pães)",
    "cebola": "alho-francês ou cebolinho",
    "leite": "bebida vegetal ou água com um pouco de natas",
    "limão": "vinagre de vinho branco (menos quantidade)",
}

TEMPERATURAS = {
    "frango": "74 °C no interior, sem partes rosadas",
    "peru": "74 °C no interior",
    "carne picada": "71 °C no interior",
    "porco": "63 °C no interior, com 3 minutos de descanso",
    "peixe": "63 °C, a carne deve ficar opaca e separar-se facilmente",
    "ovos": "cozinhar até a gema e a clara estarem firmes",
    "sobras": "reaquecer até 74 °C",
}


@tool("Consultar substituicoes")
def consultar_substituicao(ingrediente: str) -> str:
    """Sugere uma substituição para um ingrediente em falta.
    Recebe o nome do ingrediente em português (ex.: manteiga)."""
    chave = ingrediente.strip().lower()
    return SUBSTITUICOES.get(chave, f"Sem substituição conhecida para '{ingrediente}'.")


@tool("Consultar temperatura segura")
def consultar_temperatura(alimento: str) -> str:
    """Indica a temperatura interna segura para cozinhar um alimento.
    Recebe o nome do alimento em português (ex.: frango)."""
    chave = alimento.strip().lower()
    return TEMPERATURAS.get(chave, f"Sem dados para '{alimento}'.")

@tool("Consultar ingredientes disponíveis")
def consultar_ingredientes_disponiveis(consulta: str) -> str:
    """Retorna todas as características dos alimentos disponíveis."""
    repository = AlimentoRepository()
    alimentos = repository.get_alimentos()

    if not alimentos:
        return "Nenhum ingrediente disponível."

    return "\n\n".join(
        f"Nome: {alimento['nome']}\n"
        f"Quantidade: {alimento['quantidade']} {alimento['unidade']}\n"
        f"Restrições: {', '.join(alimento['restricoes']) if alimento['restricoes'] else 'Nenhuma'}\n"
        f"Validade: {alimento['validade']}"
        for alimento in alimentos
    )


