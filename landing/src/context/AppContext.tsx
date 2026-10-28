import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../api/client';
import type { Alimento, ReceitaItem } from '../api/types';

interface AppContextType {
  // Connection state
  apiOnline: boolean | null;
  checkApiHealth: () => Promise<boolean>;

  // Pantry state & actions
  alimentos: Alimento[];
  loadingAlimentos: boolean;
  alimentosError: string | null;
  fetchAlimentos: () => Promise<void>;
  addAlimento: (alimento: Alimento) => Promise<boolean>;
  deleteAlimento: (nome: string) => Promise<boolean>;
  adjustQuantidade: (nome: string, delta: number) => Promise<boolean>;

  // History state & actions
  receitas: ReceitaItem[];
  loadingReceitas: boolean;
  receitasError: string | null;
  fetchReceitas: () => Promise<void>;

  // Toast notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;
  hideToast: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [apiOnline, setApiOnline] = useState<boolean | null>(null);

  // Pantry
  const [alimentos, setAlimentos] = useState<Alimento[]>([]);
  const [loadingAlimentos, setLoadingAlimentos] = useState<boolean>(false);
  const [alimentosError, setAlimentosError] = useState<string | null>(null);

  // Recipes
  const [receitas, setReceitas] = useState<ReceitaItem[]>([]);
  const [loadingReceitas, setLoadingReceitas] = useState<boolean>(false);
  const [receitasError, setReceitasError] = useState<string | null>(null);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
  }, []);

  const hideToast = useCallback(() => {
    setToastMessage(null);
  }, []);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const checkApiHealth = useCallback(async (): Promise<boolean> => {
    const isHealthy = await api.checkHealth();
    setApiOnline(isHealthy);
    return isHealthy;
  }, []);

  const fetchAlimentos = useCallback(async () => {
    setLoadingAlimentos(true);
    setAlimentosError(null);
    try {
      const data = await api.getAlimentos();
      setAlimentos(data);
      setApiOnline(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Falha ao carregar alimentos';
      setAlimentosError(message);
    } finally {
      setLoadingAlimentos(false);
    }
  }, []);

  const fetchReceitas = useCallback(async () => {
    setLoadingReceitas(true);
    setReceitasError(null);
    try {
      const data = await api.getReceitas();
      setReceitas(data);
      setApiOnline(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Falha ao carregar receitas';
      setReceitasError(message);
    } finally {
      setLoadingReceitas(false);
    }
  }, []);

  const addAlimento = async (alimento: Alimento): Promise<boolean> => {
    try {
      await api.addAlimento(alimento);
      showToast(`«${alimento.nome}» adicionado à despensa com sucesso!`);
      await fetchAlimentos();
      return true;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro ao adicionar alimento';
      showToast(`Erro: ${message}`);
      return false;
    }
  };

  const deleteAlimento = async (nome: string): Promise<boolean> => {
    try {
      await api.deleteAlimento(nome);
      showToast(`«${nome}» removido da despensa.`);
      await fetchAlimentos();
      return true;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro ao remover alimento';
      showToast(`Erro: ${message}`);
      return false;
    }
  };

  const adjustQuantidade = async (nome: string, delta: number): Promise<boolean> => {
    try {
      await api.adjustQuantidade(nome, delta);
      await fetchAlimentos();
      return true;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro ao ajustar quantidade';
      showToast(`Erro: ${message}`);
      return false;
    }
  };

  // Initial check on mount
  useEffect(() => {
    const init = async () => {
      const isOnline = await checkApiHealth();
      if (isOnline) {
        fetchAlimentos();
        fetchReceitas();
      }
    };
    init();

    const interval = setInterval(async () => {
      await checkApiHealth();
    }, 12000);
    return () => clearInterval(interval);
  }, [checkApiHealth, fetchAlimentos, fetchReceitas]);

  return (
    <AppContext.Provider
      value={{
        apiOnline,
        checkApiHealth,
        alimentos,
        loadingAlimentos,
        alimentosError,
        fetchAlimentos,
        addAlimento,
        deleteAlimento,
        adjustQuantidade,
        receitas,
        loadingReceitas,
        receitasError,
        fetchReceitas,
        toastMessage,
        showToast,
        hideToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp deve ser usado dentro de um AppProvider');
  }
  return context;
};
