from src.data.models import Alimento

def ja_existe_igual(alimento: Alimento, alimentos: list[dict]) -> bool:
    """
    Verifica se já existe um alimento com o mesmo nome na lista de alimentos.
    """
    for a in alimentos:
        if a['nome'] == alimento.nome and a['quantidade'] == alimento.quantidade and a['unidade'] == alimento.unidade and a['restricoes'] == alimento.restricoes and a['validade'] == alimento.validade:
            return True
    return False