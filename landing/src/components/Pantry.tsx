import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { content } from '../data/content';
import { Check, Plus, Calendar, Tag, Layers } from 'lucide-react';

export const Pantry: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const { pantry } = content;

  // Mockup data for pantry table (clearly illustrative)
  const mockupItems = [
    { name: 'Arroz carolino', qty: '1 kg', expiry: '2026-12-15', tag: 'Sem glúten' },
    { name: 'Tomate pelado', qty: '2 latas', expiry: '2026-11-20', tag: 'Vegan' },
    { name: 'Ovos frescos', qty: '6 un', expiry: '2026-11-04', tag: 'Vegetariano' },
    { name: 'Esparguete', qty: '500 g', expiry: '2027-01-10', tag: 'Massa' },
  ];

  return (
    <section
      id="despensa"
      className="py-20 md:py-32 bg-paper relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          {/* Left Column: Description & Bullets */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
            className="lg:col-span-5"
          >
            <span className="inline-block px-3 py-1 mb-4 rounded-full text-xs font-mono font-medium tracking-wider uppercase bg-paper-2 border border-line text-ink-soft">
              GESTÃO DE INGREDIENTES
            </span>

            <h2 className="font-fraunces font-bold text-ink mb-6 text-balance">
              {pantry.h2}
            </h2>

            <p className="text-ink-soft text-lg leading-relaxed mb-8">
              {pantry.text}
            </p>

            <ul className="space-y-4">
              {pantry.bullets.map((bullet) => (
                <li key={bullet} className="flex items-center gap-3 text-ink font-medium">
                  <div className="w-6 h-6 rounded-full bg-olive/15 text-olive flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                  </div>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right Column: Interactive-looking Pantry Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1], delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="bg-paper-2 border-1.5 border-line rounded-card shadow-warm p-6 md:p-8">
              {/* Mockup Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-line">
                <div className="flex items-center gap-2.5">
                  <Layers className="w-5 h-5 text-tomato" strokeWidth={2} />
                  <span className="font-mono font-bold text-sm text-ink tracking-wide">
                    DESPENSA DIGITAL
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono uppercase bg-paper px-2 py-0.5 rounded border border-line text-ink-soft">
                    Exemplo ilustrativo
                  </span>
                  <span className="text-xs font-mono text-ink-soft bg-paper px-2.5 py-1 rounded border border-line flex items-center gap-1.5">
                    <Plus className="w-3.5 h-3.5 text-tomato" strokeWidth={2} />
                    Adicionar
                  </span>
                </div>
              </div>

              {/* Items List with Adhesive Tape Micro-elevation */}
              <div className="mt-5 space-y-3">
                {mockupItems.map((item) => (
                  <div
                    key={item.name}
                    className="bg-paper border border-line/80 rounded-lg p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 transition-all duration-200 hover:scale-[1.015] hover:-translate-y-0.5 hover:shadow-warm-sm hover:border-tomato/40 cursor-default group"
                  >
                    <div>
                      <span className="font-medium text-ink block sm:inline mr-2 group-hover:text-tomato transition-colors">
                        {item.name}
                      </span>
                      <span className="inline-block text-xs font-mono px-2 py-0.5 rounded bg-paper-2 text-ink-soft border border-line/60 group-hover:border-tomato/30 transition-colors">
                        {item.qty}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono text-ink-soft shrink-0">
                      <span className="flex items-center gap-1">
                        <Tag className="w-3 h-3 text-ink-soft/70" strokeWidth={2} />
                        {item.tag}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-ink-soft/70" strokeWidth={2} />
                        Val: {item.expiry}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mockup Footer Notice */}
              <div className="mt-5 pt-4 border-t border-dashed border-line/70 flex items-center justify-between text-[11px] font-mono text-ink-soft">
                <span>ITENS REGISTADOS: 4</span>
                <span className="text-ink-soft">ORDENADO POR VALIDADE</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
