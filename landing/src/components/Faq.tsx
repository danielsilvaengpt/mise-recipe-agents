import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppMotion } from '../context/MotionContext';
import { content } from '../data/content';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const Faq: React.FC = () => {
  const { shouldReduceMotion } = useAppMotion();
  const { faq } = content;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-32 bg-paper border-t border-line relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-5 md:px-8 relative">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-full text-xs font-mono font-medium tracking-wider uppercase bg-paper-2 border border-line text-ink-soft">
            <HelpCircle className="w-3.5 h-3.5 text-tomato" />
            DÚVIDAS FREQUENTES
          </span>
          <h2 className="font-fraunces font-bold text-ink mb-4 text-balance">
            Perguntas frequentes
          </h2>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faq.items.map((item, index) => {
            const isOpen = openIndex === index;
            const headingId = `faq-heading-${index}`;
            const panelId = `faq-panel-${index}`;

            return (
              <div
                key={index}
                className="bg-paper-2 border-1.5 border-line rounded-card overflow-hidden transition-colors shadow-sm"
              >
                <h3>
                  <button
                    id={headingId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left font-fraunces font-bold text-lg md:text-xl text-ink hover:text-tomato focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron transition-colors"
                  >
                    <span className="pr-4">{item.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 text-ink-soft transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-tomato' : ''
                      }`}
                      strokeWidth={2}
                    />
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={headingId}
                      initial={
                        shouldReduceMotion
                          ? { opacity: 0 }
                          : { height: 0, opacity: 0 }
                      }
                      animate={
                        shouldReduceMotion
                          ? { opacity: 1 }
                          : { height: 'auto', opacity: 1 }
                      }
                      exit={
                        shouldReduceMotion
                          ? { opacity: 0 }
                          : { height: 0, opacity: 0 }
                      }
                      transition={{ duration: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-ink-soft text-base leading-relaxed border-t border-dashed border-line/60">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
