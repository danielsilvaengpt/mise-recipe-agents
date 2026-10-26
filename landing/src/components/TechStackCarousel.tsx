import React from 'react';
import { motion } from 'framer-motion';
import { useAppMotion } from '../context/MotionContext';
import { ExternalLink, Layers } from 'lucide-react';

interface TechItem {
  name: string;
  role: string;
  category: 'Frontend' | 'IA & Agentes' | 'Backend' | 'Design & Estilo';
  url: string;
  badge: string;
}

const techStack: TechItem[] = [
  {
    name: 'CrewAI',
    role: 'Orquestração da Brigada de Agentes',
    category: 'IA & Agentes',
    url: 'https://www.crewai.com/',
    badge: 'AGENTS',
  },
  {
    name: 'React 19',
    role: 'Interface Reativa & Arquitetura de Componentes',
    category: 'Frontend',
    url: 'https://react.dev/',
    badge: 'CORE UI',
  },
  {
    name: 'TypeScript',
    role: 'Segurança de Tipos & Contratos de Dados',
    category: 'Frontend',
    url: 'https://www.typescriptlang.org/',
    badge: 'TYPES',
  },
  {
    name: 'FastAPI',
    role: 'Endpoints Assíncronos de Alta Performance',
    category: 'Backend',
    url: 'https://fastapi.tiangolo.com/',
    badge: 'BACKEND',
  },
  {
    name: 'Framer Motion',
    role: 'Física de Mola, Gestos 3D & Animações 60 FPS',
    category: 'Frontend',
    url: 'https://www.framer.com/motion/',
    badge: 'PHYSICS',
  },
  {
    name: 'Streamlit',
    role: 'Aplicação Interativa de Receitas em Tempo Real',
    category: 'IA & Agentes',
    url: 'https://streamlit.io/',
    badge: 'APP',
  },
  {
    name: 'Tailwind CSS',
    role: 'Design Tokens Quentes & Utilitários Atómicos',
    category: 'Design & Estilo',
    url: 'https://tailwindcss.com/',
    badge: 'TOKENS',
  },
  {
    name: 'Vite',
    role: 'Bundler de Nova Geração & Servidor HMR Ultrarrápido',
    category: 'Frontend',
    url: 'https://vitejs.dev/',
    badge: 'BUILD',
  },
  {
    name: 'Lucide Icons',
    role: 'Iconografia Vetorial Precisa & Consistente',
    category: 'Design & Estilo',
    url: 'https://lucide.dev/',
    badge: 'ICONS',
  },
];

export const TechStackCarousel: React.FC = () => {
  const { shouldReduceMotion } = useAppMotion();

  // Duplicamos a lista para criar um loop de scroll infinito contínuo e sem costuras
  const marqueeItems = [...techStack, ...techStack];

  return (
    <section className="py-12 md:py-16 bg-paper-2/60 border-y border-line relative overflow-hidden">
      {/* Background Accent Grid */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(var(--ink) 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-5 md:px-8 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-2 text-xs font-mono text-ink-soft uppercase tracking-wider font-semibold">
          <Layers className="w-3.5 h-3.5 text-tomato" />
          <span>Arquitetura & Stack Tecnológica</span>
        </div>
        <span className="text-[11px] font-mono text-ink-soft/70">
          Clica em qualquer ferramenta para consultar a documentação oficial ↗
        </span>
      </div>

      {/* Marquee Wrapper with soft lateral gradient fade masks */}
      <div className="relative w-full overflow-hidden">
        {/* Left & Right Edge Vignette Fades */}
        <div
          className="absolute left-0 top-0 bottom-0 w-12 md:w-28 bg-gradient-to-r from-paper-2/95 to-transparent z-10 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-12 md:w-28 bg-gradient-to-l from-paper-2/95 to-transparent z-10 pointer-events-none"
          aria-hidden="true"
        />

        {/* Continuous Animated Track */}
        <div className="flex overflow-hidden group">
          <motion.div
            className="flex gap-4 shrink-0 py-2"
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    x: ['0%', '-50%'],
                  }
            }
            transition={
              shouldReduceMotion
                ? undefined
                : {
                    duration: 32,
                    repeat: Infinity,
                    ease: 'linear',
                  }
            }
          >
            {marqueeItems.map((tech, idx) => (
              <a
                key={`${tech.name}-${idx}`}
                href={tech.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-col justify-between w-64 md:w-72 p-4 rounded-xl bg-paper border border-line hover:border-tomato/50 hover:shadow-warm-sm transition-all duration-300 group/card relative select-none shrink-0"
              >
                {/* Card Header */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase bg-paper-2 border border-line text-ink-soft group-hover/card:text-tomato group-hover/card:border-tomato/30 transition-colors">
                    {tech.badge}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-ink-soft/70 group-hover/card:text-tomato transition-colors">
                    <span>{tech.category}</span>
                    <ExternalLink className="w-3 h-3 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                {/* Card Title & Role */}
                <div>
                  <h4 className="font-fraunces font-bold text-lg text-ink group-hover/card:text-tomato transition-colors">
                    {tech.name}
                  </h4>
                  <p className="text-xs text-ink-soft mt-1 line-clamp-1 leading-relaxed">
                    {tech.role}
                  </p>
                </div>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
