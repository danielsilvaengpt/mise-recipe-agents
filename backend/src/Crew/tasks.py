from crewai import Task



class KitchenTasks:
    def __init__(self, incentivo=True, inventario: list[dict] | None = None):
        self.incentivo = (
            "\n\nSe a tua resposta cumprir todas as regras sem erros, "
            "será considerada excelente e receberás uma avaliação máxima."
            if incentivo
            else ""
        )
        self.inventario = (
            "\n".join(
                f"- {alimento['nome']}: {alimento['quantidade']} {alimento['unidade']}"
                for alimento in inventario
            )
            if inventario
            else "Nenhum alimento está registado no inventário."
        )
        self.contexto_inventario = (
            "\n\nInventário atual, lido do ficheiro de alimentos:\n"
            f"{self.inventario}\n"
            "Trata este inventário como a fonte factual do que está disponível."
        )
        
    def escolher_prato(self, agent, pedido):
        return Task(
            description=(
                f"Pedido da pessoa: {pedido}\n\n"
                f"{self.contexto_inventario}\n\n"
                "Propõe 2 pratos possíveis com os ingredientes indicados e escolhe o melhor, "
                "explicando em 2 linhas porquê. Continua a proposta mesmo que faltem alimentos; "
                "não inventes ingredientes disponíveis. No prato escolhido, distingue claramente "
                "os ingredientes que constam do inventário dos que faltam. "
                "Responde em português de Portugal."
                + self.incentivo
            ),
            expected_output=(
                "As 2 ideias de pratos, seguidas da escolha final, justificação curta e lista "
                "dos ingredientes em falta para o prato escolhido."
            ),
            agent=agent,
        )

    def escrever_receita(self, agent, context):
        return Task(
            description=(
                f"{self.contexto_inventario}\n\n"
                "Escreve a receita completa do prato escolhido pelo Chef, sem o alterar. "
                "Gera a receita mesmo que faltem ingredientes. Lista os ingredientes necessários "
                "e identifica claramente quais estão disponíveis no inventário e quais estão em falta. "
                "Responde em português de Portugal."
                + self.incentivo
            ),
            expected_output=(
                "Receita com: título, tempo total, número de doses, "
                "lista de ingredientes com quantidades exatas, indicação dos que faltam "
                "e passos numerados."
            ),
            agent=agent,
            context=context,
        )

    def rever_receita(self, agent, context, pedido):
        return Task(
            description=(
                f"Pedido original da pessoa: {pedido}\n\n"
                f"{self.contexto_inventario}\n\n"
                "Revê a receita escrita: usa só ingredientes indicados (ou básicos)? "
                "Respeita restrições e tempo? Quantidades, tempos e temperaturas são realistas? "
                "Lista e passos são coerentes? Corrige o que for preciso. "
                "Não elimines o prato por haver ingredientes em falta: mantém a receita e "
                "indica claramente quais ingredientes necessários não constam do inventário. "
                "Responde em português de Portugal."
                + self.incentivo
            ),
            expected_output=(
                "A receita FINAL completa e corrigida, no mesmo formato "
                "(título, tempo, doses, ingredientes, passos), pronta a cozinhar. "
                "Se faltar algum ingrediente, uma nota curta no fim."
            ),
            agent=agent,
            context=context,
        )