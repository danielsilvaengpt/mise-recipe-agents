import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { content } from '../data/content';
import { Stamp } from './Stamp';
import { Check, AlertTriangle, Lightbulb } from 'lucide-react';

export const Honesty: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const { honesty } = content;

  return (
    <section className="py-20 md:py-32 bg-paper-2 border-t border-line relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 md:px-8 relative">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span className="inline-block px-3 py-1 mb-4 rounded-full text-xs font-mono font-medium tracking-wider uppercase bg-paper border border-line text-ink-soft">
            TRANSPARÊNCIA TOTAL
          </span>
          <h2 className="font-fraunces font-bold text-ink mb-4 text-balance">
            {honesty.h2}
          </h2>
          <p className="text-ink-soft text-lg leading-relaxed">
            {honesty.text}
          </p>
        </div>

        {/* Visual Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Card: Disponíveis */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
            className="bg-paper border-1.5 border-line rounded-card p-6 md:p-8 shadow-warm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-line">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-olive" strokeWidth={2.5} />
                  <span className="font-mono font-bold text-sm text-ink uppercase">
                    Alimentos na Despensa
                  </span>
                </div>
                <Stamp status="disponivel" animate={false} />
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-line/40">
                  <span className="text-ink font-medium">Massa de esparguete</span>
                  <span className="font-mono text-xs text-ink-soft">200g</span>
                </div>
                <div className="flex justify-between py-2 border-b border-line/40">
                  <span className="text-ink font-medium">Ovos frescos</span>
                  <span className="font-mono text-xs text-ink-soft">2 un</span>
                </div>
                <div className="flex justify-between py-2 border-b border-line/40">
                  <span className="text-ink font-medium">Limão</span>
                  <span className="font-mono text-xs text-ink-soft">1 un</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-dashed border-line/60 text-xs font-mono text-ink-soft bg-paper-2/60 p-3 rounded">
              <span className="font-semibold text-olive">Regra dos básicos:</span> Sal, azeite, água e pimenta contam sempre como disponíveis.
            </div>
          </motion.div>

          {/* Card: Em Falta */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1], delay: 0.1 }}
            className="bg-paper border-1.5 border-line rounded-card p-6 md:p-8 shadow-warm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-line">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-[#C47D15] dark:text-saffron" strokeWidth={2} />
                  <span className="font-mono font-bold text-sm text-ink uppercase">
                    Ingredientes em Falta
                  </span>
                </div>
                <Stamp status="falta" animate={false} />
              </div>

              <div className="space-y-3 text-sm">
                <div className="py-2 border-b border-line/40">
                  <div className="flex justify-between">
                    <span className="text-ink font-medium">Queijo parmesão ralado</span>
                    <span className="font-mono text-xs text-ink-soft">30g</span>
                  </div>
                  <p className="text-xs text-ink-soft mt-1 flex items-center gap-1.5">
                    <Lightbulb className="w-3 h-3 text-[#C47D15] dark:text-saffron shrink-0" />
                    <span>Dica de cozinha: Substituir por queijo curado da despensa ou dispensar.</span>
                  </p>
                </div>

                <div className="py-2 border-b border-line/40">
                  <div className="flex justify-between">
                    <span className="text-ink font-medium">Pinhões tostados</span>
                    <span className="font-mono text-xs text-ink-soft">15g</span>
                  </div>
                  <p className="text-xs text-ink-soft mt-1 flex items-center gap-1.5">
                    <Lightbulb className="w-3 h-3 text-[#C47D15] dark:text-saffron shrink-0" />
                    <span>Dica de cozinha: Opcional para textura, sem impacto na base.</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-dashed border-line/60 text-xs font-mono text-ink-soft bg-paper-2/60 p-3 rounded">
              <span className="font-semibold text-[#C47D15] dark:text-saffron">Sem surpresas:</span> Sabes exatamente o que precisas antes de ligar o fogão.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
