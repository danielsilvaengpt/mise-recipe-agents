export interface Alimento {
  nome: string;
  quantidade: number;
  unidade: string;
  restricoes: string[];
  validade: string; // formato AAAA-MM-DD
}

export interface AskRequest {
  question: string;
}

export interface AskResponse {
  answer: string;
}

export interface ReceitaItem {
  ficheiro: string;
  titulo: string;
  data: string;
}

export interface ReceitaDetalhe {
  ficheiro: string;
  texto: string;
}

export interface AjusteQuantidade {
  delta: number;
}
