"""
Modelos de dados para  o projeto AgentesCozinha. Quero criar modelo para guardar alimentos, receitas e pedidos. Por enquanto, vou criar apenas o modelo de alimentos.
"""

from pydantic import BaseModel, Field

class Alimento(BaseModel):
    nome: str = Field(..., description="Nome do alimento")
    quantidade: float = Field(..., description="Quantidade do alimento")
    unidade: str = Field(..., description="Unidade de medida do alimento (ex: gramas, litros, unidades)")
    restricoes: list[str] = Field(default_factory=list, description="Lista de restrições alimentares (ex: vegan, gluten-free)")
    validade: str = Field(..., description="Data de validade do alimento no formato YYYY-MM-DD")
