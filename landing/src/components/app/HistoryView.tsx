import React, { useState, useEffect } from 'react';
import { BookOpen, Search, RefreshCw, X, UtensilsCrossed, ArrowRight, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { api } from '../../api/client';
import type { ReceitaItem } from '../../api/types';
import { RecipeTicket } from './RecipeTicket';

export const HistoryView: React.FC = () => {
  const { receitas, loadingReceitas, receitasError, fetchReceitas, apiOnline } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReceita, setSelectedReceita] = useState<ReceitaItem | null>(null);
  const [fullRecipeText, setFullRecipeText] = useState<string | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  useEffect(() => {
    fetchReceitas();
  }, [fetchReceitas]);

  const handleOpenRecipe = async (item: ReceitaItem) => {
    setSelectedReceita(item);
    setLoadingDetail(true);
    setDetailError(null);
    setFullRecipeText(null);

    try {
      const data = await api.getReceita(item.ficheiro);
      setFullRecipeText(data.texto);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Não foi possível carregar o conteúdo da receita';
      setDetailError(message);
    } finally {
      setLoadingDetail(false);
    }
  };

  const filteredReceitas = receitas.filter((item) => {
    const term = searchTerm.toLowerCase();
    return item.titulo.toLowerCase().includes(term) || item.data.toLowerCase().includes(term);
  });

  return (
    <div className="flex-grow flex flex-col max-w-5xl w-full mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 pb-6 border-b border-line">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wider uppercase bg-paper-2 border border-line text-ink-soft mb-2">
            <BookOpen className="w-3.5 h-3.5 text-saffron" />
            O Livro de Receitas da Casa
          </span>
          <h1 className="font-fraunces text-2xl sm:text-3xl font-bold text-ink">
            Arquivo Culinário
          </h1>
          <p className="text-ink-soft text-xs sm:text-sm mt-1">
            {receitas.length} receita{receitas.length === 1 ? '' : 's'} arquivada{receitas.length === 1 ? '' : 's'} na pasta de saídas do backend.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => fetchReceitas()}
            disabled={loadingReceitas}
            className="p-2.5 rounded-full bg-paper border border-line hover:bg-paper-2 text-ink-soft hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
            title="Atualizar lista de receitas"
            aria-label="Atualizar"
          >
            <RefreshCw className={`w-4 h-4 ${loadingReceitas ? 'animate-spin text-tomato' : ''}`} />
          </button>

          <Link
            to="/app/fogao"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-tomato text-paper text-sm font-medium hover:bg-tomato/90 transition-colors shadow-warm-sm"
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>Criar Nova Receita</span>
          </Link>
        </div>
      </div>

      {/* Backend Offline Warning if applicable */}
      {apiOnline === false && (
        <div className="mb-6 p-4 rounded-card bg-saffron/15 border border-saffron/40 flex items-start gap-3 text-xs font-mono text-ink">
          <AlertCircle className="w-4 h-4 text-saffron shrink-0 mt-0.5" />
          <div>
            <strong>O backend FastAPI está offline.</strong> Para ler os ficheiros de receitas arquivadas em <code className="bg-paper px-1 rounded">outputs/</code>, inicia o servidor:
            <code className="block mt-1 p-2 rounded bg-paper border border-line text-tomato">
              cd backend &amp;&amp; uvicorn src.api.api:app --reload
            </code>
          </div>
        </div>
      )}

      {/* Search Input */}
      {receitas.length > 0 && (
        <div className="mb-6 relative max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft/60 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar por prato ou data..."
            className="w-full pl-9 pr-4 py-2 rounded-full bg-paper-2 border border-line text-xs text-ink focus:outline-none focus:ring-2 focus:ring-saffron font-jakarta"
          />
        </div>
      )}

      {/* Content Area */}
      {loadingReceitas && receitas.length === 0 ? (
        <div className="flex-grow flex flex-col items-center justify-center p-12 text-center">
          <RefreshCw className="w-8 h-8 text-tomato animate-spin mb-3" />
          <p className="text-xs font-mono text-ink-soft">A ler o arquivo de receitas do backend...</p>
        </div>
      ) : receitasError && receitas.length === 0 ? (
        <div className="flex-grow bg-paper-2/40 border border-dashed border-line rounded-card p-12 text-center flex flex-col items-center justify-center">
          <span className="text-4xl mb-3">📖</span>
          <h3 className="font-fraunces text-lg font-semibold text-ink">Não foi possível carregar o arquivo</h3>
          <p className="text-xs text-ink-soft max-w-md mt-1 mb-4">
            Inicia o backend com <code className="bg-paper px-1 rounded">uvicorn src.api.api:app --reload</code> para ler as tuas receitas.
          </p>
          <button
            onClick={() => fetchReceitas()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-paper border border-line text-xs font-mono hover:text-tomato"
          >
            Tentar novamente
          </button>
        </div>
      ) : filteredReceitas.length === 0 ? (
        /* Empty State */
        <div className="flex-grow bg-paper-2/30 border border-dashed border-line rounded-card p-12 text-center flex flex-col items-center justify-center">
          <span className="text-4xl mb-3">📖</span>
          <h3 className="font-fraunces text-xl font-bold text-ink mb-2">
            {searchTerm ? 'Nenhuma receita encontrada' : 'O teu livro de receitas ainda está em branco'}
          </h3>
          <p className="text-xs sm:text-sm text-ink-soft max-w-md mb-6 leading-relaxed">
            {searchTerm
              ? `Nenhuma comanda corresponde à pesquisa «${searchTerm}».`
              : 'Visita o Fogão, faz o teu primeiro pedido à brigada e guarda aqui as tuas criações favoritas para cozinhares quando quiseres.'}
          </p>
          <Link
            to="/app/fogao"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-tomato text-paper font-medium text-xs sm:text-sm hover:bg-tomato/90 transition-colors shadow-warm-sm"
          >
            <span>Ir para o Fogão agora</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        /* Grid of Recipe Cards */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredReceitas.map((item, idx) => (
            <div
              key={item.ficheiro}
              onClick={() => handleOpenRecipe(item)}
              className="bg-paper border-1.5 border-line rounded-card p-5 relative shadow-warm hover:shadow-warm-lg transition-all duration-200 cursor-pointer flex flex-col justify-between group"
            >
              {/* Decorative mini docket notch */}
              <div
                className="absolute top-0 right-6 w-10 h-3 bg-paper-2 border-b border-x border-line/60 rounded-b-xs"
                aria-hidden="true"
              />

              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-saffron font-bold mb-1.5 block">
                  FICHA CULINÁRIA #{String(idx + 1).padStart(3, '0')}
                </span>

                <h3 className="font-fraunces font-bold text-base sm:text-lg text-ink group-hover:text-tomato transition-colors leading-snug line-clamp-2 mb-2">
                  {item.titulo}
                </h3>
              </div>

              <div className="pt-3 border-t border-line/60 mt-4 flex items-center justify-between text-xs font-mono text-ink-soft">
                <span>{item.data}</span>
                <span className="text-tomato inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Ver comanda →
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Recipe Detail Modal */}
      {selectedReceita && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 dark:bg-black/70 backdrop-blur-xs animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto my-auto">
            {/* Close Button floating above modal */}
            <div className="sticky top-0 z-30 flex justify-end pb-2">
              <button
                onClick={() => setSelectedReceita(null)}
                className="p-2 rounded-full bg-paper dark:bg-paper-2 border border-line text-ink hover:text-tomato shadow-md transition-colors"
                aria-label="Fechar comanda"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {loadingDetail ? (
              <div className="bg-paper border border-line rounded-card p-12 text-center shadow-warm-lg">
                <RefreshCw className="w-8 h-8 text-tomato animate-spin mx-auto mb-3" />
                <p className="text-xs font-mono text-ink-soft">A abrir comanda {selectedReceita.ficheiro}...</p>
              </div>
            ) : detailError ? (
              <div className="bg-paper border border-line rounded-card p-8 text-center shadow-warm-lg">
                <AlertCircle className="w-8 h-8 text-tomato mx-auto mb-3" />
                <h4 className="font-fraunces font-bold text-ink">Erro ao abrir comanda</h4>
                <p className="text-xs font-mono text-tomato mt-1">{detailError}</p>
              </div>
            ) : fullRecipeText ? (
              <RecipeTicket recipeMarkdown={fullRecipeText} />
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryView;
