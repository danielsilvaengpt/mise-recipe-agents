from crewai import Crew , Process
from src.Crew.agents import KitchenAgents
from src.Crew.tasks import KitchenTasks
from src.Repositories.alimento import AlimentoRepository
from src.Crew.llm import criar_llm 
from dotenv import load_dotenv
import os
load_dotenv()

llm_crew = criar_llm(api_key=os.getenv("GROQ_API_KEY"))
def run_crew(input_text: str):
    
    try: 
        llm = criar_llm(
            model="groq/openai/gpt-oss-120b",   # podes mudar para "groq/openai/gpt-oss-20b" se quiseres o mais rápido
            temperature=0.5,
            api_key=os.getenv("GROQ_API_KEY"),
        )
    except Exception as erro:
        print(f"Erro ao inicializar o modelo: {erro}")
        return
    
    # 2. Pedido da pessoa
    pedido = input_text
    if not pedido:
        print("Não escreveste nada. Tenta outra vez.")
        return

    # 3. Agentes
    agentes = KitchenAgents(llm)
    chef = agentes.chef()
    redator = agentes.redator()
    revisor = agentes.revisor()

    # 4. Tarefas (encadeadas com context)
    inventario = AlimentoRepository().get_alimentos()
    tarefas = KitchenTasks(incentivo=True, inventario=inventario)
    t1 = tarefas.escolher_prato(chef, pedido)
    t2 = tarefas.escrever_receita(redator, [t1])
    t3 = tarefas.rever_receita(revisor, [t2], pedido)

    # 5. Equipa
    return Crew(
        agents=[chef, redator, revisor],
        tasks=[t1, t2, t3],
        process=Process.sequential,
        verbose=True,
    )
    