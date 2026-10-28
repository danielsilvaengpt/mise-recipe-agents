import React from 'react';
import { motion } from 'framer-motion';
import { useAppMotion } from '../context/MotionContext';
import { content } from '../data/content';
import { Button } from './Button';
import { UtensilsCrossed } from 'lucide-react';

export const CtaFinal: React.FC = () => {
  const { shouldReduceMotion } = useAppMotion();
  const { ctaFinal, appUrl } = content;

  return (
    <section className="py-20 md:py-32 bg-paper-2 border-t border-line relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-5 md:px-8 relative text-center">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
          className="bg-paper border-1.5 border-line rounded-card p-10 md:p-16 shadow-warm relative overflow-hidden"
        >
          {/* Subtle decorative ticket border top and bottom */}
          <div
            className="absolute top-0 left-0 right-0 h-2 border-b border-dashed border-line/80 bg-paper-2"
            aria-hidden="true"
          />

          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 mb-6 rounded-full text-xs font-mono font-medium tracking-wider uppercase bg-paper-2 border border-line text-ink-soft shadow-xs">
            <UtensilsCrossed className="w-3.5 h-3.5 text-tomato" />
            MESA POSTA · SERVIÇO IMEDIATO
          </span>

          <h2 className="font-fraunces font-extrabold text-ink mb-6 text-balance max-w-xl mx-auto">
            {ctaFinal.h2}
          </h2>

          <div className="flex justify-center mt-8">
            <Button
              href={appUrl}
              variant="primary"
              icon
              className="!text-base !px-8 !py-4 shadow-md"
            >
              {ctaFinal.button}
            </Button>
          </div>

          <p className="text-xs font-mono text-ink-soft/80 mt-6">
            Sem registos complicados · Gratuito para experimentar
          </p>

          <div
            className="absolute bottom-0 left-0 right-0 h-2 border-t border-dashed border-line/80 bg-paper-2"
            aria-hidden="true"
          />
        </motion.div>
      </div>
    </section>
  );
};
