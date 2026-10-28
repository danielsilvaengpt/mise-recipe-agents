import React, { useState } from 'react';
import { Minus, Plus, Trash2, Calendar, AlertTriangle, ShieldCheck } from 'lucide-react';
import type { Alimento } from '../../api/types';
import { useApp } from '../../context/AppContext';

interface FoodCardProps {
  alimento: Alimento;
}

export const FoodCard: React.FC<FoodCardProps> = ({ alimento }) => {
  const { adjustQuantidade, deleteAlimento } = useApp();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isAdjusting, setIsAdjusting] = useState<boolean>(false);

  // Expiry calculation
  const getExpiryDetails = (validadeStr: string) => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const expiry = new Date(validadeStr);
      expiry.setHours(0, 0, 0, 0);

      const diffTime = expiry.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays < 0) {
        return {
          status: 'expired',
          color: 'bg-tomato/15 border-tomato text-tomato',
          icon: AlertTriangle,
          label: `Caducado há ${Math.abs(diffDays)} dia${Math.abs(diffDays) === 1 ? '' : 's'}`,
        };
      } else if (diffDays <= 2) {
        return {
          status: 'urgent',
          color: 'bg-tomato/15 border-tomato text-tomato font-semibold',
          icon: AlertTriangle,
          label: diffDays === 0 ? 'Caduca hoje!' : diffDays === 1 ? 'Caduca amanhã!' : 'Caduca em 2 dias',
        };
      } else if (diffDays <= 7) {
        return {
          status: 'warning',
          color: 'bg-saffron/20 border-saffron text-ink dark:text-saffron',
          icon: Calendar,
          label: `Consumir em breve (${diffDays} dias)`,
        };
      } else {
        return {
          status: 'safe',
          color: 'bg-olive/15 border-olive/40 text-olive',
          icon: ShieldCheck,
          label: `Fresco · Válido até ${validadeStr}`,
        };
      }
    } catch {
      return {
        status: 'unknown',
        color: 'bg-paper-2 border-line text-ink-soft',
        icon: Calendar,
        label: validadeStr,
      };
    }
  };

  const expiry = getExpiryDetails(alimento.validade);
  const ExpiryIcon = expiry.icon;

  const handleAdjust = async (delta: number) => {
    if (alimento.quantidade + delta <= 0) {
      setIsDeleting(true);
      return;
    }
    setIsAdjusting(true);
    await adjustQuantidade(alimento.nome, delta);
    setIsAdjusting(false);
  };

  const handleDelete = async () => {
    await deleteAlimento(alimento.nome);
  };

  return (
    <div className="bg-paper border-1.5 border-line rounded-card p-5 relative shadow-warm flex flex-col justify-between hover:shadow-warm-lg transition-all duration-200 group">
      {/* Decorative masking tape corner */}
      <div
        className="absolute -top-2.5 right-6 w-12 h-4 bg-paper-2/90 dark:bg-line/40 border border-line/60 rounded-xs shadow-xs transform rotate-2 pointer-events-none"
        aria-hidden="true"
      />

      {/* Top Header: Name & Delete confirmation */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-fraunces font-bold text-lg text-ink capitalize tracking-tight leading-snug">
            {alimento.nome}
          </h3>

          {!isDeleting ? (
            <button
              onClick={() => setIsDeleting(true)}
              className="text-ink-soft/50 hover:text-tomato p-1 rounded-md hover:bg-paper-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
              title="Remover ingrediente da despensa"
              aria-label={`Remover ${alimento.nome}`}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex items-center gap-1.5 animate-fade-in bg-paper-2 p-1 rounded-md border border-tomato/40">
              <button
                onClick={handleDelete}
                className="text-[11px] font-mono px-2 py-0.5 bg-tomato text-paper rounded font-medium hover:bg-tomato/90"
              >
                Eliminar
              </button>
              <button
                onClick={() => setIsDeleting(false)}
                className="text-[11px] font-mono px-1.5 py-0.5 text-ink-soft hover:text-ink"
              >
                Cancelar
              </button>
            </div>
          )}
        </div>

        {/* Dietary Restrictions Tags */}
        {alimento.restricoes && alimento.restricoes.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {alimento.restricoes.map((tag, idx) => (
              <span
                key={idx}
                className="inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-medium tracking-wide uppercase bg-paper-2 border border-line text-ink-soft"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Section: Quantity Controls & Expiry Badge */}
      <div className="pt-3 border-t border-line/60 mt-2 flex flex-col gap-3">
        {/* Quantity Controls */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-ink-soft">Quantidade em stock:</span>

          <div className="inline-flex items-center gap-2 bg-paper-2 px-2 py-1 rounded-full border border-line">
            <button
              onClick={() => handleAdjust(-1)}
              disabled={isAdjusting}
              className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-paper text-ink-soft hover:text-ink disabled:opacity-40 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-saffron"
              title="Diminuir quantidade"
              aria-label="Diminuir"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>

            <span className="font-mono font-bold text-sm text-ink min-w-[3rem] text-center">
              {alimento.quantidade} <span className="font-normal text-xs text-ink-soft">{alimento.unidade}</span>
            </span>

            <button
              onClick={() => handleAdjust(1)}
              disabled={isAdjusting}
              className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-paper text-ink-soft hover:text-ink disabled:opacity-40 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-saffron"
              title="Aumentar quantidade"
              aria-label="Aumentar"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Expiry Badge */}
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono w-full justify-center ${expiry.color}`}
        >
          <ExpiryIcon className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{expiry.label}</span>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
