import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Copy, Check, Printer, UtensilsCrossed, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface RecipeTicketProps {
  recipeMarkdown: string;
  ticketNumber?: string;
}

export const RecipeTicket: React.FC<RecipeTicketProps> = ({
  recipeMarkdown,
  ticketNumber = '042',
}) => {
  const { showToast } = useApp();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(recipeMarkdown);
    setCopied(true);
    showToast('Receita copiada com sucesso para a área de transferência!');
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-paper border-1.5 border-line rounded-card shadow-warm-lg p-6 sm:p-10 relative overflow-hidden font-jakarta text-ink max-w-3xl w-full mx-auto my-4 transition-all">
      {/* Perforated ticket top border */}
      <div
        className="absolute top-0 left-0 right-0 h-2.5 bg-paper-2 border-b border-dashed border-line/90 flex justify-between px-2 overflow-hidden"
        aria-hidden="true"
      />

      {/* Decorative brass clip & masking tape on top */}
      <div
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#3E3426]/90 border border-saffron/40 rounded-xs shadow-md flex items-center justify-around px-4 pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-2.5 h-2.5 rounded-full bg-saffron border border-[#8C6420] shadow-inner" />
        <div className="w-2.5 h-2.5 rounded-full bg-saffron border border-[#8C6420] shadow-inner" />
      </div>

      {/* Ticket Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 pb-5 border-b border-line mb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-mono tracking-wider uppercase bg-paper-2 border border-line text-ink-soft mb-1.5">
            <UtensilsCrossed className="w-3.5 h-3.5 text-tomato" />
            COMANDA DE COZINHA Nº {ticketNumber}
          </span>
          <p className="text-[11px] font-mono text-ink-soft">
            Mise en place · Brigada de Cozinha (Chef + Redator + Revisor)
          </p>
        </div>

        {/* Approval Stamp */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm border-2 border-olive text-olive font-mono text-xs uppercase tracking-wider font-bold transform -rotate-1 self-start sm:self-auto shadow-xs">
          <ShieldCheck className="w-4 h-4" />
          <span>REVISADO E APROVADO</span>
        </div>
      </div>

      {/* Markdown Content rendered with Culinary Styles */}
      <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none prose-headings:font-fraunces prose-headings:text-ink prose-p:text-ink-soft prose-p:leading-relaxed prose-li:text-ink-soft prose-table:border prose-table:border-line prose-th:bg-paper-2 prose-th:font-mono prose-th:text-xs prose-th:uppercase prose-td:border-b prose-td:border-line prose-td:p-3 font-jakarta">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <h1 className="font-fraunces text-2xl sm:text-3xl font-extrabold text-ink mb-4 pb-2 border-b border-line/60">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="font-fraunces text-xl font-bold text-ink mt-6 mb-3 flex items-center gap-2">
                <span>{children}</span>
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="font-fraunces text-lg font-semibold text-ink mt-4 mb-2">
                {children}
              </h3>
            ),
            table: ({ children }) => (
              <div className="overflow-x-auto my-4 rounded-lg border border-line shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm font-jakarta">{children}</table>
              </div>
            ),
            th: ({ children }) => (
              <th className="bg-paper-2 px-3 py-2.5 font-mono text-[11px] tracking-wider uppercase text-ink font-semibold border-b border-line">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="px-3 py-2 border-b border-line/60 text-ink-soft">
                {children}
              </td>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal pl-5 space-y-2 my-4 font-jakarta text-sm sm:text-base">
                {children}
              </ol>
            ),
            ul: ({ children }) => (
              <ul className="list-disc pl-5 space-y-1.5 my-3 font-jakarta text-sm sm:text-base">
                {children}
              </ul>
            ),
            li: ({ children }) => (
              <li className="leading-relaxed pl-1 text-ink">{children}</li>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-saffron bg-paper-2/60 px-4 py-2 my-4 rounded-r-md text-xs sm:text-sm font-mono text-ink-soft italic">
                {children}
              </blockquote>
            ),
          }}
        >
          {recipeMarkdown}
        </ReactMarkdown>
      </div>

      {/* Ticket Footer Actions */}
      <div className="mt-8 pt-5 border-t border-dashed border-line flex flex-wrap items-center justify-between gap-3">
        <span className="text-[11px] font-mono text-ink-soft">
          * Guardado automaticamente no arquivo do Livro de Receitas.
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            type="button"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-paper-2 border border-line hover:border-ink/40 text-xs font-mono font-medium text-ink transition-colors shadow-xs"
            title="Copiar receita completa em Markdown"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-olive" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copiada!' : 'Copiar Receita'}</span>
          </button>

          <button
            onClick={handlePrint}
            type="button"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-paper-2 border border-line hover:border-ink/40 text-xs font-mono font-medium text-ink transition-colors shadow-xs"
            title="Imprimir comanda"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir</span>
          </button>
        </div>
      </div>

      {/* Perforated ticket bottom border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-2 bg-paper-2 border-t border-dashed border-line/90"
        aria-hidden="true"
      />
    </div>
  );
};

export default RecipeTicket;
