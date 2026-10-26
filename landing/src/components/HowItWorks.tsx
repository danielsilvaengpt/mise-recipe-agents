import React from 'react';
import { motion } from 'framer-motion';
import { useAppMotion } from '../context/MotionContext';
import { content } from '../data/content';
import { Refrigerator, MessageSquare, ReceiptText } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const { shouldReduceMotion } = useAppMotion();
  const { howItWorks } = content;

  const stepIcons = [
    <Refrigerator className="w-6 h-6 text-tomato" strokeWidth={1.75} />,
    <MessageSquare className="w-6 h-6 text-[#C47D15] dark:text-saffron" strokeWidth={1.75} />,
    <ReceiptText className="w-6 h-6 text-olive" strokeWidth={1.75} />,
  ];

  return (
    <section
      id="como-funciona"
      className="py-20 md:py-32 bg-paper-2 border-t border-line relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <span className="inline-block px-3 py-1 mb-4 rounded-full text-xs font-mono font-medium tracking-wider uppercase bg-paper border border-line text-ink-soft">
            PROCESSO SIMPLES
          </span>
          <h2 className="font-fraunces font-bold text-ink mb-4 text-balance">
            {howItWorks.h2}
          </h2>
        </div>

        {/* 3 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {howItWorks.steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.5,
                delay: shouldReduceMotion ? 0 : index * 0.12,
                ease: [0.2, 0.7, 0.2, 1],
              }}
              className="bg-paper border-1.5 border-line rounded-card p-8 shadow-warm flex flex-col justify-between relative hover:-translate-y-1 transition-transform duration-200"
            >
              <div>
                {/* Step Top: Number & Icon */}
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-full bg-paper-2 border border-line flex items-center justify-center shadow-sm">
                    {stepIcons[index]}
                  </div>
                  <span className="font-mono font-bold text-3xl text-line/80 dark:text-line/40">
                    0{step.number}
                  </span>
                </div>

                <h3 className="font-fraunces font-bold text-xl text-ink mb-3">
                  {step.title}
                </h3>

                <p className="text-ink-soft text-base leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Bottom detail */}
              <div className="mt-8 pt-4 border-t border-dashed border-line/60">
                <span className="text-[11px] font-mono text-ink-soft uppercase tracking-wider">
                  Passo {index + 1} de 3
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
