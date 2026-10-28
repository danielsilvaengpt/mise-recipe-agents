import { API_BASE_URL } from './config';
import type {
  Alimento,
  AskRequest,
  AskResponse,
  ReceitaItem,
  ReceitaDetalhe,
  AjusteQuantidade,
} from './types';

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let errorDetail = `Erro HTTP ${res.status}`;
    try {
      const data = await res.json();
      if (data && data.detail) {
        errorDetail = typeof data.detail === 'string' ? data.detail : JSON.stringify(data.detail);
      }
    } catch {
      // res was not JSON
    }
    throw new ApiError(errorDetail, res.status);
  }
  return res.json();
}

export const api = {
  /**
   * Health check to detect if FastAPI server is reachable
   */
  async checkHealth(): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE_URL}/`, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  /**
   * Run CrewAI agents to generate a recipe from a prompt
   */
  async ask(question: string): Promise<string> {
    const payload: AskRequest = { question };
    const res = await fetch(`${API_BASE_URL}/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await handleResponse<AskResponse>(res);
    return data.answer;
  },

  /**
   * List all pantry food items
   */
  async getAlimentos(): Promise<Alimento[]> {
    const res = await fetch(`${API_BASE_URL}/alimentos`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });
    return handleResponse<Alimento[]>(res);
  },

  /**
   * Create a new food item in the pantry
   */
  async addAlimento(alimento: Alimento): Promise<Alimento> {
    const res = await fetch(`${API_BASE_URL}/alimentos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(alimento),
    });
    return handleResponse<Alimento>(res);
  },

  /**
   * Delete an item by name
   */
  async deleteAlimento(nome: string): Promise<{ removido: string }> {
    const params = new URLSearchParams({ nome });
    const res = await fetch(`${API_BASE_URL}/alimentos?${params.toString()}`, {
      method: 'DELETE',
      headers: { Accept: 'application/json' },
    });
    return handleResponse<{ removido: string }>(res);
  },

  /**
   * Adjust quantity of an existing item
   */
  async adjustQuantidade(nome: string, delta: number): Promise<{ nome: string; delta: number }> {
    const params = new URLSearchParams({ nome });
    const payload: AjusteQuantidade = { delta };
    const res = await fetch(`${API_BASE_URL}/alimentos/quantidade?${params.toString()}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    return handleResponse<{ nome: string; delta: number }>(res);
  },

  /**
   * List all generated recipes in outputs/
   */
  async getReceitas(): Promise<ReceitaItem[]> {
    const res = await fetch(`${API_BASE_URL}/receitas`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });
    return handleResponse<ReceitaItem[]>(res);
  },

  /**
   * Read the full markdown text of a recipe
   */
  async getReceita(ficheiro: string): Promise<ReceitaDetalhe> {
    const res = await fetch(`${API_BASE_URL}/receitas/${encodeURIComponent(ficheiro)}`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });
    return handleResponse<ReceitaDetalhe>(res);
  },
};

export default api;
