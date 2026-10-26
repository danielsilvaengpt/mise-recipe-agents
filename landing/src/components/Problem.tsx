import React from 'react';
import { motion } from 'framer-motion';
import { useAppMotion } from '../context/MotionContext';
import { content } from '../data/content';
import { AlertCircle, HelpCircle } from 'lucide-react';

export const Problem: React.FC = () => {
  const { shouldReduceMotion } = useAppMotion();
  const { problem } = content;

  return (
    <section className="py-20 md:py-32 bg-paper-2 border-y border-line relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-5 md:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
          className="text-center"
        >
          {/* Subtle Icon Indicator */}
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-paper border border-line text-tomato mb-6 shadow-sm">
            <HelpCircle className="w-6 h-6" strokeWidth={1.75} />
          </div>

          {/* H2 Title */}
          <h2 className="font-fraunces font-bold text-ink mb-6 text-balance max-w-2xl mx-auto">
            {problem.h2}
          </h2>

          {/* Card containing the narrative */}
          <div className="bg-paper border-1.5 border-line rounded-card p-8 md:p-12 shadow-warm text-left relative mt-8">
            <div className="flex items-start gap-4">
              <div className="hidden sm:flex shrink-0 p-2.5 rounded-full bg-saffron/15 text-[#C47D15] dark:text-saffron mt-1">
                <AlertCircle className="w-5 h-5" strokeWidth={2} />
              </div>

              <div>
                <p className="text-ink text-lg md:text-xl leading-relaxed font-normal">
                  {problem.text}
                </p>

                {/* Ingredients tag visual representation strictly taken from text */}
                <div className="mt-8 pt-6 border-t border-dashed border-line flex flex-wrap gap-2.5 items-center">
                  <span className="text-xs font-mono uppercase text-ink-soft tracking-wider mr-2">
                    Cenário comum:
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-paper-2 border border-line text-ink">
                    Meio pacote de massa
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-paper-2 border border-line text-ink">
                    Um limão a murchar
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-paper-2 border border-line text-ink">
                    Dois ovos
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
