import React from 'react';
import { motion } from 'framer-motion';
import { useAppMotion } from '../context/MotionContext';
import { content } from '../data/content';
import { ShieldCheck, Thermometer, CheckCircle2 } from 'lucide-react';

export const Safety: React.FC = () => {
  const { shouldReduceMotion } = useAppMotion();
  const { safety } = content;

  return (
    <section className="py-20 md:py-28 bg-paper-2 border-t border-line relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-5 md:px-8 relative text-center">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-paper border border-line text-olive mb-6 shadow-sm">
            <ShieldCheck className="w-8 h-8" strokeWidth={1.75} />
          </div>

          <h2 className="font-fraunces font-bold text-ink mb-4 text-balance">
            {safety.h2}
          </h2>

          <p className="text-ink-soft text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            {safety.text}
          </p>

          {/* Validation Criteria Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-3xl mx-auto">
            <div className="bg-paper border border-line rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-1.5 text-olive font-mono text-xs uppercase font-bold">
                <Thermometer className="w-4 h-4" />
                <span>Temperaturas</span>
              </div>
              <p className="text-xs text-ink-soft">
                Verificação de temperaturas internas seguras para carnes e ovos.
              </p>
            </div>

            <div className="bg-paper border border-line rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-1.5 text-olive font-mono text-xs uppercase font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Restrições</span>
              </div>
              <p className="text-xs text-ink-soft">
                Confirmação de que ingredientes proibidos ou alergénios não entram.
              </p>
            </div>

            <div className="bg-paper border border-line rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-1.5 text-olive font-mono text-xs uppercase font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Tempos e Doses</span>
              </div>
              <p className="text-xs text-ink-soft">
                Realismo prático nos tempos e correspondência exata entre lista e passos.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
