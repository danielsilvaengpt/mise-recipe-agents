import React, { useState } from 'react';
import { Package, Plus, Search, RefreshCw, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FoodCard } from './FoodCard';
import { AddFoodModal } from './AddFoodModal';

export const PantryView: React.FC = () => {
  const { alimentos, loadingAlimentos, alimentosError, fetchAlimentos, apiOnline } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'urgent' | 'safe'>('all');

  // Expiry classification helper
  const isUrgent = (validadeStr: string) => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const expiry = new Date(validadeStr);
      expiry.setHours(0, 0, 0, 0);
      const diffDays = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return diffDays <= 3;
    } catch {
      return false;
    }
  };

  const filteredAlimentos = alimentos.filter((item) => {
    const matchesSearch = item.nome.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;

    if (filterMode === 'urgent') return isUrgent(item.validade);
    if (filterMode === 'safe') return !isUrgent(item.validade);
    return true;
  });

  const urgentCount = alimentos.filter((a) => isUrgent(a.validade)).length;

  return (
    <div className="flex-grow flex flex-col max-w-5xl w-full mx-auto">
      {/* Header and Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 pb-6 border-b border-line">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wider uppercase bg-paper-2 border border-line text-ink-soft mb-2">
            <Package className="w-3.5 h-3.5 text-olive" />
            A Minha Despensa Digital
          </span>
          <h1 className="font-fraunces text-2xl sm:text-3xl font-bold text-ink">
            Gestão de Ingredientes & Mantimentos
          </h1>
          <p className="text-ink-soft text-xs sm:text-sm mt-1">
            {alimentos.length} alimento{alimentos.length === 1 ? '' : 's'} registado{alimentos.length === 1 ? '' : 's'} no backend
            {urgentCount > 0 && (
              <span className="ml-2 text-tomato font-semibold">
                · {urgentCount} com validade próxima!
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => fetchAlimentos()}
            disabled={loadingAlimentos}
            className="p-2.5 rounded-full bg-paper border border-line hover:bg-paper-2 text-ink-soft hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
            title="Atualizar lista do servidor"
            aria-label="Atualizar"
          >
            <RefreshCw className={`w-4 h-4 ${loadingAlimentos ? 'animate-spin text-tomato' : ''}`} />
          </button>

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-tomato text-paper text-sm font-medium hover:bg-tomato/90 transition-colors shadow-warm-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Ingrediente</span>
          </button>
        </div>
      </div>

      {/* Backend Offline Warning Banner if applicable */}
      {apiOnline === false && (
        <div className="mb-6 p-4 rounded-card bg-saffron/15 border border-saffron/40 flex items-start gap-3 text-xs font-mono text-ink">
          <AlertCircle className="w-4 h-4 text-saffron shrink-0 mt-0.5" />
          <div>
            <strong>O servidor backend FastAPI não está ativo.</strong> Para carregar, guardar e alterar alimentos reais, inicia o servidor no terminal:
            <code className="block mt-1 p-2 rounded bg-paper border border-line text-tomato">
              cd backend &amp;&amp; uvicorn src.api.api:app --reload
            </code>
          </div>
        </div>
      )}

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-grow max-w-xs">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft/60 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filtrar por nome..."
            className="w-full pl-9 pr-4 py-1.5 rounded-full bg-paper-2 border border-line text-xs text-ink focus:outline-none focus:ring-2 focus:ring-saffron"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-paper-2 p-1 rounded-full border border-line self-start sm:self-auto text-xs font-mono">
          <button
            type="button"
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1 rounded-full transition-colors ${
              filterMode === 'all'
                ? 'bg-paper text-ink font-semibold shadow-xs'
                : 'text-ink-soft hover:text-ink'
            }`}
          >
            Todos ({alimentos.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('urgent')}
            className={`px-3 py-1 rounded-full transition-colors ${
              filterMode === 'urgent'
                ? 'bg-tomato text-paper font-semibold shadow-xs'
                : 'text-ink-soft hover:text-tomato'
            }`}
          >
            Urgentes ({urgentCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('safe')}
            className={`px-3 py-1 rounded-full transition-colors ${
              filterMode === 'safe'
                ? 'bg-olive text-paper font-semibold shadow-xs'
                : 'text-ink-soft hover:text-olive'
            }`}
          >
            Frescos ({alimentos.length - urgentCount})
          </button>
        </div>
      </div>

      {/* Content Area */}
      {loadingAlimentos && alimentos.length === 0 ? (
        <div className="flex-grow flex flex-col items-center justify-center p-12 text-center">
          <RefreshCw className="w-8 h-8 text-tomato animate-spin mb-3" />
          <p className="text-xs font-mono text-ink-soft">A carregar alimentos da despensa...</p>
        </div>
      ) : alimentosError && alimentos.length === 0 ? (
        <div className="flex-grow bg-paper-2/40 border border-dashed border-line rounded-card p-12 text-center flex flex-col items-center justify-center">
          <span className="text-4xl mb-3">🥫</span>
          <h3 className="font-fraunces text-lg font-semibold text-ink">Nenhum alimento carregado</h3>
          <p className="text-xs text-ink-soft max-w-md mt-1 mb-4">
            Inicia o backend com <code className="bg-paper px-1 rounded">uvicorn src.api.api:app --reload</code> para sincronizar os alimentos.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-tomato text-paper text-xs font-medium"
          >
            <Plus className="w-3.5 h-3.5" />
            Adicionar Primeiro Alimento
          </button>
        </div>
      ) : filteredAlimentos.length === 0 ? (
        <div className="flex-grow bg-paper-2/30 border border-dashed border-line rounded-card p-12 text-center flex flex-col items-center justify-center">
          <span className="text-4xl mb-3">🔍</span>
          <h3 className="font-fraunces text-base font-semibold text-ink">Nenhum ingrediente encontrado</h3>
          <p className="text-xs text-ink-soft mt-1">
            {searchTerm
              ? `Nenhum resultado corresponde a «${searchTerm}».`
              : 'A tua despensa está vazia.'}
          </p>
          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterMode('all');
              }}
              className="mt-3 text-xs text-tomato hover:underline font-mono"
            >
              Limpar filtros
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-8">
          {filteredAlimentos.map((alimento) => (
            <FoodCard key={alimento.nome} alimento={alimento} />
          ))}
        </div>
      )}

      {/* Add Food Modal */}
      <AddFoodModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default PantryView;
