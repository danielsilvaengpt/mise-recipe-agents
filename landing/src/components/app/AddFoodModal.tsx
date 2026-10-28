import React, { useState } from 'react';
import { X, Plus, Package } from 'lucide-react';
import type { Alimento } from '../../api/types';
import { useApp } from '../../context/AppContext';

interface AddFoodModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const COMMON_UNITS = [
  { value: 'g', label: 'g (gramas)' },
  { value: 'kg', label: 'kg (quilogramas)' },
  { value: 'un', label: 'un (unidades)' },
  { value: 'ml', label: 'ml (mililitros)' },
  { value: 'l', label: 'l (litros)' },
  { value: 'c. sopa', label: 'c. sopa (colheres)' },
  { value: 'dentes', label: 'dentes (alho)' },
];

const COMMON_RESTRICTIONS = ['Sem glúten', 'Vegan', 'Vegetariano', 'Sem lactose', 'Biológico'];

export const AddFoodModal: React.FC<AddFoodModalProps> = ({ isOpen, onClose }) => {
  const { addAlimento } = useApp();

  // Default validity date to 7 days in the future
  const defaultDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split('T')[0];
  };

  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState<number | ''>(1);
  const [unidade, setUnidade] = useState('un');
  const [validade, setValidade] = useState(defaultDate());
  const [restricoes, setRestricoes] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleRestriction = (tag: string) => {
    setRestricoes((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!nome.trim()) {
      setError('O nome do ingrediente é obrigatório.');
      return;
    }

    if (quantidade === '' || Number(quantidade) <= 0) {
      setError('A quantidade tem de ser maior que zero.');
      return;
    }

    if (!validade) {
      setError('A data de validade é obrigatória.');
      return;
    }

    setIsSubmitting(true);

    const novoAlimento: Alimento = {
      nome: nome.trim(),
      quantidade: Number(quantidade),
      unidade,
      restricoes,
      validade,
    };

    const success = await addAlimento(novoAlimento);
    setIsSubmitting(false);

    if (success) {
      // Reset form & close
      setNome('');
      setQuantidade(1);
      setUnidade('un');
      setRestricoes([]);
      setValidade(defaultDate());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 dark:bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-lg bg-paper border border-line rounded-card shadow-warm-lg p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6 pb-4 border-b border-line">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono uppercase bg-paper-2 border border-line text-ink-soft mb-2">
              <Package className="w-3.5 h-3.5 text-tomato" />
              Registo de Mantimentos
            </span>
            <h2 className="font-fraunces font-bold text-2xl text-ink">
              Adicionar à Despensa
            </h2>
            <p className="text-xs text-ink-soft mt-1">
              Guarda cada ingrediente para a brigada saber o que tens disponível.
            </p>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="p-1.5 rounded-full hover:bg-paper-2 text-ink-soft hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error notification */}
        {error && (
          <div className="mb-4 p-3 rounded-md bg-tomato/10 border border-tomato/30 text-tomato text-xs font-mono">
            ⚠️ {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nome */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wide text-ink-soft mb-1.5">
              Nome do Ingrediente *
            </label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="ex.: Grão-de-bico, Ovos frescos, Arroz basmati"
              required
              className="w-full px-3.5 py-2.5 rounded-lg bg-paper-2 border border-line text-ink text-sm focus:outline-none focus:ring-2 focus:ring-saffron"
            />
          </div>

          {/* Quantidade e Unidade */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wide text-ink-soft mb-1.5">
                Quantidade *
              </label>
              <input
                type="number"
                step="any"
                min="0.1"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value === '' ? '' : parseFloat(e.target.value))}
                required
                className="w-full px-3.5 py-2.5 rounded-lg bg-paper-2 border border-line text-ink text-sm focus:outline-none focus:ring-2 focus:ring-saffron font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wide text-ink-soft mb-1.5">
                Unidade *
              </label>
              <select
                value={unidade}
                onChange={(e) => setUnidade(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-paper-2 border border-line text-ink text-sm focus:outline-none focus:ring-2 focus:ring-saffron"
              >
                {COMMON_UNITS.map((u) => (
                  <option key={u.value} value={u.value}>
                    {u.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Validade */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wide text-ink-soft mb-1.5">
              Data de Validade (AAAA-MM-DD) *
            </label>
            <input
              type="date"
              value={validade}
              onChange={(e) => setValidade(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-lg bg-paper-2 border border-line text-ink text-sm focus:outline-none focus:ring-2 focus:ring-saffron font-mono"
            />
          </div>

          {/* Restrições Alimentares */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wide text-ink-soft mb-2">
              Restrições ou Características
            </label>
            <div className="flex flex-wrap gap-2">
              {COMMON_RESTRICTIONS.map((tag) => {
                const selected = restricoes.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleRestriction(tag)}
                    className={`px-3 py-1 rounded-full text-xs font-mono transition-colors border ${
                      selected
                        ? 'bg-olive text-paper border-olive font-semibold'
                        : 'bg-paper-2 text-ink-soft border-line hover:border-ink/40'
                    }`}
                  >
                    {selected ? `✓ ${tag}` : `+ ${tag}`}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-line mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-xs font-mono text-ink-soft hover:text-ink transition-colors"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-tomato text-paper font-medium text-sm hover:bg-tomato/90 disabled:opacity-50 transition-colors shadow-warm-sm"
            >
              <Plus className="w-4 h-4" />
              <span>{isSubmitting ? 'A guardar...' : 'Guardar Ingrediente'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFoodModal;
