
# só depois os restantes imports:
from datetime import datetime
from pathlib import Path
from dotenv import load_dotenv
load_dotenv()  # lê a GROQ_API_KEY o ficheiro .env

from src.Crew.crew import run_crew

def main():
    pedido = input("QUal a receita que queres fazer?")
    crew = run_crew(pedido)

    # 6. Executar
    try:
        resultado = crew.kickoff()
    except Exception as erro:
        print(f"\nOcorreu um erro: {erro}")
        return

    receita = str(resultado)
    print("\n===== RECEITA FINAL =====\n")
    print(receita)

    # 7. Guardar em ficheiro
    pasta = Path("outputs")
    pasta.mkdir(exist_ok=True)
    nome = datetime.now().strftime("receita_%Y%m%d_%H%M%S.md")
    (pasta / nome).write_text(receita, encoding="utf-8")
    print(f"\nReceita guardada em outputs/{nome}")


if __name__ == "__main__":
    main()