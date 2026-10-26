import React from 'react';
import { motion } from 'framer-motion';
import { useAppMotion } from '../context/MotionContext';
import { content } from '../data/content';
import { Clock, Users, FileText, CheckCircle2 } from 'lucide-react';
import { Stamp } from './Stamp';

export const RecipePreview: React.FC = () => {
  const { shouldReduceMotion } = useAppMotion();
  const { recipePreview } = content;

  return (
    <section className="py-20 md:py-32 bg-paper border-t border-line relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-5 md:px-8 relative">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span className="inline-block px-3.5 py-1 mb-4 rounded-full text-xs font-mono font-medium tracking-wider uppercase bg-paper-2 border border-line text-ink-soft shadow-xs">
            CADERNO DE PROVA · EXEMPLO REAL
          </span>
          <h2 className="font-fraunces font-bold text-ink mb-4 text-balance">
            {recipePreview.h2}
          </h2>
        </div>

        {/* Recipe Docket / Markdown Preview Card */}
        <motion.article
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
          className="bg-paper-2 border-1.5 border-line rounded-card p-6 md:p-10 shadow-warm relative"
        >
          {/* Card Top Meta */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b-1.5 border-dashed border-line">
            <div>
              <span className="inline-block text-[11px] font-mono uppercase bg-paper text-tomato px-2.5 py-0.5 rounded border border-line font-bold tracking-wider mb-2">
                {recipePreview.badge}
              </span>
              <h3 className="font-fraunces font-bold text-2xl md:text-3xl text-ink">
                {recipePreview.title}
              </h3>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-ink-soft bg-paper px-3 py-1.5 rounded-full border border-line">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-tomato" strokeWidth={2} />
                {recipePreview.time}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-ink-soft" strokeWidth={2} />
                {recipePreview.servings}
              </span>
            </div>
          </div>

          {/* Ingredients Breakdown Table */}
          <div className="my-8">
            <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-ink mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-tomato" />
              <span>Tabela de Ingredientes</span>
            </h4>

            <div className="bg-paper border border-line rounded-lg overflow-hidden">
              <div className="divide-y divide-line/40">
                <div className="p-3.5 flex items-center justify-between text-sm">
                  <span className="font-medium text-ink">Massa (esparguete) — 200g</span>
                  <Stamp status="disponivel" animate={false} />
                </div>
                <div className="p-3.5 flex items-center justify-between text-sm">
                  <span className="font-medium text-ink">Ovos frescos — 2 un</span>
                  <Stamp status="disponivel" animate={false} />
                </div>
                <div className="p-3.5 flex items-center justify-between text-sm">
                  <span className="font-medium text-ink">Limão — 1 un (raspa e sumo)</span>
                  <Stamp status="disponivel" animate={false} />
                </div>
                <div className="p-3.5 flex items-center justify-between text-sm">
                  <span className="font-medium text-ink">Azeite e sal — q.b.</span>
                  <Stamp status="disponivel" animate={false} text="BÁSICOS" />
                </div>
                <div className="p-3.5 flex items-center justify-between text-sm">
                  <span className="font-medium text-ink">Queijo ralado — 30g</span>
                  <Stamp status="falta" animate={false} />
                </div>
              </div>
            </div>
          </div>

          {/* Numbered Steps */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-ink mb-4">
              Passos de Preparação (Redigidos e Validados)
            </h4>

            <ol className="space-y-4">
              {recipePreview.steps.map((step, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3.5 text-ink text-base leading-relaxed bg-paper p-3.5 rounded-lg border border-line/60"
                >
                  <span className="flex shrink-0 w-6 h-6 rounded-full bg-tomato/10 text-tomato font-mono text-xs font-bold items-center justify-center mt-0.5">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            {/* Chef's Handwritten Marginal Note (Anotação de margem de cozinheiro) */}
            <div className="mt-6 p-3.5 bg-paper rounded border border-dashed border-[#D9CDB4] dark:border-[#3A3326] relative transform -rotate-0.5 shadow-2xs">
              <p className="font-fraunces italic text-ink-soft text-sm leading-relaxed flex items-start gap-2">
                <span className="text-tomato font-bold not-italic font-mono text-xs uppercase tracking-wider shrink-0 mt-0.5">Nota de fogão:</span>
                <span>«Guarda sempre meia concha da água fervente da cozedura. O amido emulsiona o azeite e o limão num molho cremoso sem precisares de manteiga nem natas.»</span>
              </p>
            </div>
          </div>

          {/* Footer note */}
          <div className="mt-8 pt-4 border-t border-dashed border-line/70 flex items-center justify-between text-xs font-mono text-ink-soft">
            <span className="flex items-center gap-1.5 text-olive font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Validada pelo Revisor
            </span>
            <span>FORMATO: MARKDOWN COMPLETO</span>
          </div>
        </motion.article>
      </div>
    </section>
  );
};
