from src.data.models import Alimento
import json
from pathlib import Path
from src.utils.rep import ja_existe_igual   


class AlimentoRepository: 
    
    file_Alimentos = Path(__file__).resolve().parents[1] / "data" / "JsonFiles" / "alimentos.json"
      
    """
        CRUD Alimentos
    """  
    def __init__(self):
        self.file_Alimentos = type(self).file_Alimentos

    def _load_alimentos(self) -> list[dict]:
        file_path = Path(self.file_Alimentos)
        if not file_path.exists():
            return []

        conteudo = file_path.read_text(encoding="utf-8")
        if not conteudo.strip():
            return []

        alimentos = json.loads(conteudo)
        return alimentos if alimentos else []

    def add_alimento(self, alimento: Alimento):
        """
        Adiciona um alimento ao arquivo JSON.
        """
        # Verifica se o arquivo existe, se não, cria um novo
        file_path = Path(self.file_Alimentos)
        if not file_path.exists():
            with open(file_path, 'w') as f:
                json.dump([], f)
        
        # Lê os alimentos existentes
        alimentos = self._load_alimentos()
        
        
        if not ja_existe_igual(alimento, alimentos):
            # Adiciona o novo alimento
            alimentos.append(alimento.dict())
        else:
            #adicionar quantidade ao alimento existente
            for a in alimentos:
                if a['nome'] == alimento.nome:
                    a['quantidade'] += alimento.quantidade
                    break
                
        
        # Salva de volta no arquivo JSON
        with open(file_path, 'w') as f:
            json.dump(alimentos, f, indent=4)
    
    def remove_alimento(self, nome: str):
        """
        Remove um alimento do arquivo JSON pelo nome.
        """
        file_path = Path(self.file_Alimentos)
        if not file_path.exists():
            return  # Se o arquivo não existe, não há nada para remover
        
        # Lê os alimentos existentes
        alimentos = self._load_alimentos()
        
        # Filtra os alimentos, removendo o que tem o nome especificado
        alimentos = [alimento for alimento in alimentos if alimento['nome'] != nome]
        
        # Salva de volta no arquivo JSON
        with open(file_path, 'w') as f:
            json.dump(alimentos, f, indent=4)
            
    def get_alimentos(self) -> list[dict]:
        """
        Retorna a lista de alimentos do arquivo JSON.
        """
        file_path = Path(self.file_Alimentos)
        if not file_path.exists():
            return []  # Se o arquivo não existe, retorna uma lista vazia
        
        # Lê os alimentos existentes
        alimentos = self._load_alimentos()
        
        return alimentos if alimentos else []
    
    """
        Funções para atualizar campos específicos de um alimento no arquivo JSON.
    """
    
    def set_nome(self, nome: str, novo_nome: str):
        """
        Atualiza o nome de um alimento no arquivo JSON.
        """
        file_path = Path(self.file_Alimentos)
        if not file_path.exists():
            return  # Se o arquivo não existe, não há nada para atualizar
        
        # Lê os alimentos existentes
        alimentos = self._load_alimentos()
        
        # Atualiza o nome do alimento especificado
        for alimento in alimentos:
            if alimento['nome'] == nome:
                alimento['nome'] = novo_nome
        
        # Salva de volta no arquivo JSON
        with open(file_path, 'w') as f:
            json.dump(alimentos, f, indent=4)
            
    def change_quantidade(self, nome: str, nova_quantidade: float):
        """
        Atualiza a quantidade de um alimento no arquivo JSON.
        """
        file_path = Path(self.file_Alimentos)
        if not file_path.exists():
            return  # Se o arquivo não existe, não há nada para atualizar
        
        # Lê os alimentos existentes
        alimentos = self._load_alimentos()
        
        # Atualiza a quantidade do alimento especificado se for positivo : adiciona , se for negativo : subtrai
        for alimento in alimentos:
            if alimento['nome'] == nome:
                alimento['quantidade'] += nova_quantidade
        
        # Salva de volta no arquivo JSON
        with open(file_path, 'w') as f:
            json.dump(alimentos, f, indent=4)
            
    def set_unidade(self, nome: str, nova_unidade: str):
        """
        Atualiza a unidade de medida de um alimento no arquivo JSON.
        """
        file_path = Path(self.file_Alimentos)
        if not file_path.exists():
            return  # Se o arquivo não existe, não há nada para atualizar
        
        # Lê os alimentos existentes
        alimentos = self._load_alimentos()
        
        # Atualiza a unidade do alimento especificado
        for alimento in alimentos:
            if alimento['nome'] == nome:
                alimento['unidade'] = nova_unidade
        
        # Salva de volta no arquivo JSON
        with open(file_path, 'w') as f:
            json.dump(alimentos, f, indent=4)
            
    def set_restricoes(self, nome: str, novas_restricoes: list[str]):
        """
        Atualiza as restrições alimentares de um alimento no arquivo JSON.
        """
        file_path = Path(self.file_Alimentos)
        if not file_path.exists():
            return  # Se o arquivo não existe, não há nada para atualizar
        
        # Lê os alimentos existentes
        alimentos = self._load_alimentos()
        
        # Atualiza as restrições do alimento especificado
        for alimento in alimentos:
            if alimento['nome'] == nome:
                alimento['restricoes'] = novas_restricoes
        
        # Salva de volta no arquivo JSON
        with open(file_path, 'w') as f:
            json.dump(alimentos, f, indent=4)
            
    def set_validade(self, nome: str, nova_validade: str):
        """
        Atualiza a data de validade de um alimento no arquivo JSON.
        """
        file_path = Path(self.file_Alimentos)
        if not file_path.exists():
            return  # Se o arquivo não existe, não há nada para atualizar
        
        # Lê os alimentos existentes
        alimentos = self._load_alimentos()
        
        # Atualiza a validade do alimento especificado
        for alimento in alimentos:
            if alimento['nome'] == nome:
                alimento['validade'] = nova_validade
        
        # Salva de volta no arquivo JSON
        with open(file_path, 'w') as f:
            json.dump(alimentos, f, indent=4)