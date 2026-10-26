import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { content } from '../data/content';
import {
  CookingPot,
  ScrollText,
  ShieldCheck,
  Play,
  Pause,
  CheckCircle2,
  UtensilsCrossed,
  Thermometer,
  Clock,
  Flame,
  Check,
} from 'lucide-react';
import { useAppMotion } from '../context/MotionContext';

export const Agents: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const { shouldReduceMotion } = useAppMotion();
  const { agents } = content;

  // Active Station State (0: Chef, 1: Redator, 2: Revisor)
  const [activeStation, setActiveStation] = useState(0);
  const [isPlaying, setIsPlaying] = useState(!shouldReduceMotion);
  const [progress, setProgress] = useState(0);

  // Dynamic Studio Spotlight following the mouse
  const mouseX = useMotionValue(200);
  const mouseY = useMotionValue(150);

  const springConfig = { damping: 25, stiffness: 180 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Spotlight background transform declared unconditionally at top level
  const spotlightBackground = useTransform(
    [smoothMouseX, smoothMouseY],
    ([x, y]) =>
      `radial-gradient(circle 320px at ${x}px ${y}px, rgba(233,168,59,0.25), transparent 70%)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = deckRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // Auto-play timer for the 3 stations
  useEffect(() => {
    if (shouldReduceMotion || !isPlaying) return;

    const intervalTime = 50; // ms tick
    const totalDuration = 5500; // 5.5s per station
    const increment = (intervalTime / totalDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveStation((current) => (current + 1) % 3);
          return 0;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying, shouldReduceMotion, activeStation]);

  const selectStation = (index: number) => {
    setActiveStation(index);
    setProgress(0);
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const agentIcons = [
    <CookingPot className="w-5 h-5 text-tomato" strokeWidth={2} />,
    <ScrollText className="w-5 h-5 text-[#C47D15] dark:text-saffron" strokeWidth={2} />,
    <ShieldCheck className="w-5 h-5 text-olive" strokeWidth={2} />,
  ];

  const stationLabels = [
    { title: 'Chef criativo', step: 'POSTO 01', subtitle: 'Conceção & Escolha' },
    { title: 'Redator de receitas', step: 'POSTO 02', subtitle: 'Redação & Doses' },
    { title: 'Revisor', step: 'POSTO 03', subtitle: 'Telemetria & Segurança' },
  ];

  return (
    <section
      id="agentes"
      ref={containerRef}
      className="py-20 md:py-32 bg-paper relative overflow-hidden"
    >
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(var(--ink) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-5 md:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 mb-4 rounded-full text-xs font-mono font-medium tracking-wider uppercase bg-paper-2 border border-line text-ink-soft shadow-xs">
            <UtensilsCrossed className="w-3.5 h-3.5 text-tomato" />
            A BRIGADA DE COZINHA · ORDEM DE SERVIÇO
          </span>
          <h2 className="font-fraunces font-bold text-ink mb-4 text-balance">
            {agents.h2}
          </h2>
          <p className="text-ink-soft text-lg leading-relaxed">
            {agents.intro}
          </p>
        </div>

        {/* --- A MESA DE ORQUESTRAÇÃO DA BRIGADA (ESTÁVEL E COM TEXTO NÍTIDO) --- */}
        <div
          ref={deckRef}
          onMouseMove={handleMouseMove}
          className="relative bg-paper-2 border-1.5 border-line rounded-card shadow-warm overflow-hidden mb-12 p-6 md:p-10"
        >
          {/* Dynamic Studio Spotlight Overlay */}
          {!shouldReduceMotion && (
            <motion.div
              className="absolute inset-0 pointer-events-none z-10 opacity-35 dark:opacity-20"
              style={{ background: spotlightBackground }}
              aria-hidden="true"
            />
          )}

          {/* Top Control Bar: Station Scrubber & Play/Pause */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-line relative z-20">
            {/* 3 Interactive Station Tabs */}
            <div className="grid grid-cols-3 gap-2 w-full md:w-auto">
              {stationLabels.map((st, i) => {
                const isActive = activeStation === i;
                return (
                  <button
                    key={st.step}
                    type="button"
                    onClick={() => selectStation(i)}
                    className={`relative px-3 py-2.5 rounded-lg text-left transition-all duration-200 border ${
                      isActive
                        ? 'bg-paper border-tomato shadow-sm text-ink'
                        : 'bg-paper/50 border-line/60 hover:bg-paper/80 text-ink-soft'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wider uppercase mb-0.5">
                      <span className={isActive ? 'text-tomato' : 'text-ink-soft'}>
                        {st.step}
                      </span>
                      {isActive && isPlaying && (
                        <span className="w-1.5 h-1.5 rounded-full bg-tomato animate-ping" />
                      )}
                    </div>
                    <div className="text-xs font-fraunces font-bold truncate">
                      {st.title}
                    </div>

                    {/* Progress Bar under active station */}
                    {isActive && isPlaying && !shouldReduceMotion && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-line overflow-hidden rounded-b-lg">
                        <div
                          className="h-full bg-tomato transition-all duration-75"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Play/Pause & Live Status Indicator */}
            <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
              <span className="text-xs font-mono text-ink-soft flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-olive animate-pulse" />
                <span>FLUXO ORQUESTRADO AO VIVO</span>
              </span>

              <button
                type="button"
                onClick={togglePlay}
                className="p-2 rounded-full bg-paper border border-line text-ink hover:text-tomato transition-colors shadow-xs"
                title={isPlaying ? 'Pausar ciclo de estações' : 'Iniciar ciclo contínuo'}
                aria-label={isPlaying ? 'Pausar animação' : 'Reproduzir animação'}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4 ml-0.5" />
                )}
              </button>
            </div>
          </div>

          {/* Center Action Stage with Crisp Typography */}
          <div className="py-8 md:py-12 relative z-20 min-h-[360px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {/* --- ESTAÇÃO 1: CHEF CRIATIVO (A Forja de Ideias) --- */}
              {activeStation === 0 && (
                <motion.div
                  key="station-chef"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="w-full max-w-2xl"
                >
                  <div className="text-center mb-6">
                    <span className="text-xs font-mono uppercase tracking-wider text-tomato font-bold flex items-center justify-center gap-1.5 mb-1">
                      <Flame className="w-3.5 h-3.5" />
                      Posto do Chef Criativo · Análise da Despensa
                    </span>
                    <p className="text-xs font-mono text-ink-soft">
                      Entrada: «Algo rápido para duas pessoas com o que há na despensa»
                    </p>
                  </div>

                  {/* 2 Competing Recipe Proposals (Crisp & Horizontal for Legibility) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Proposal A (Winner) */}
                    <div className="bg-paper border-2 border-tomato rounded-xl p-5 shadow-warm relative overflow-hidden">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-tomato text-paper font-bold">
                          PROPOSTA A · ESCOLHIDA
                        </span>
                        <span className="text-xs font-mono font-bold text-tomato">15 min</span>
                      </div>
                      <h4 className="font-fraunces font-bold text-lg text-ink mb-2">
                        Massa com Ovos e Limão
                      </h4>
                      <p className="text-xs text-ink-soft leading-relaxed mb-4">
                        Aproveitamento máximo da despensa sem técnicas complexas.
                      </p>
                      <div className="pt-3 border-t border-dashed border-line flex items-center justify-between text-[11px] font-mono">
                        <span className="text-olive font-semibold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          3 ingredientes disponíveis
                        </span>
                        <span className="px-2 py-0.5 bg-olive/15 text-olive rounded font-bold uppercase text-[10px]">
                          SELECIONADA
                        </span>
                      </div>
                    </div>

                    {/* Proposal B (Discarded) */}
                    <div className="bg-paper border border-line rounded-xl p-5 shadow-xs relative opacity-75">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-paper-2 border border-line text-ink-soft">
                          PROPOSTA B · DESCARTADA
                        </span>
                        <span className="text-xs font-mono text-ink-soft">35 min</span>
                      </div>
                      <h4 className="font-fraunces font-bold text-lg text-ink/80 mb-2">
                        Gratinado de Forno
                      </h4>
                      <p className="text-xs text-ink-soft leading-relaxed mb-4">
                        Tempo de preparação superior ao pretendido pelo pedido rápido.
                      </p>
                      <div className="pt-3 border-t border-dashed border-line flex items-center justify-between text-[11px] font-mono text-ink-soft">
                        <span>Tempo excedido</span>
                        <span className="text-[10px] uppercase font-bold text-ink-soft/70">
                          REJEITADA
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    <span className="inline-block px-3 py-1 rounded-full bg-paper border border-line text-xs font-mono text-ink-soft">
                      Decisão: Proposta A aprovada e enviada para o Redator de Receitas →
                    </span>
                  </div>
                </motion.div>
              )}

              {/* --- ESTAÇÃO 2: REDATOR DE RECEITAS (A Máquina de Escrever) --- */}
              {activeStation === 1 && (
                <motion.div
                  key="station-redator"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="w-full max-w-2xl bg-paper border-1.5 border-line rounded-xl p-6 md:p-8 shadow-warm"
                >
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-line">
                    <div className="flex items-center gap-2">
                      <ScrollText className="w-4 h-4 text-[#C47D15] dark:text-saffron" />
                      <span className="text-xs font-mono uppercase tracking-wider text-ink font-bold">
                        Posto do Redator · Estruturação em Markdown
                      </span>
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-paper-2 border border-line text-ink-soft font-semibold">
                      REDAÇÃO EM CURSO
                    </span>
                  </div>

                  {/* Typing Recipe Simulation */}
                  <div className="space-y-3 font-mono text-xs">
                    <div className="bg-paper-2/60 p-2.5 rounded border border-line/60 flex items-center justify-between">
                      <span className="font-bold text-ink"># Massa com Ovos e Toque de Limão</span>
                      <span className="text-tomato font-semibold">Tempo: 15 min · 2 doses</span>
                    </div>

                    <div className="p-3 bg-paper rounded border border-line space-y-2">
                      <div className="text-[11px] text-ink-soft font-bold uppercase tracking-wider pb-1 border-b border-line/40">
                        Passos Cronológicos Numerados:
                      </div>
                      <div className="flex items-start gap-2 text-ink">
                        <span className="text-tomato font-bold">1.</span>
                        <span>Ferver água abundante com sal e cozer a massa pelo tempo indicado.</span>
                      </div>
                      <div className="flex items-start gap-2 text-ink">
                        <span className="text-tomato font-bold">2.</span>
                        <span>Escalfar os ovos numa frigideira com fio de azeite em lume brando.</span>
                      </div>
                      <div className="flex items-start gap-2 text-ink">
                        <span className="text-tomato font-bold">3.</span>
                        <span>Escorrer a massa e envolver com raspa e sumo de limão fresco.</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-dashed border-line flex items-center justify-between text-xs font-mono text-ink-soft">
                    <span>AÇÃO POR PASSO: VALIDADO</span>
                    <span className="text-[#C47D15] dark:text-saffron font-bold">
                      A ENVIAR PARA O REVISOR →
                    </span>
                  </div>
                </motion.div>
              )}

              {/* --- ESTAÇÃO 3: REVISOR (Scanner Laser & Telemetria de Segurança) --- */}
              {activeStation === 2 && (
                <motion.div
                  key="station-revisor"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="w-full max-w-2xl bg-paper border-1.5 border-line rounded-xl p-6 md:p-8 shadow-warm relative overflow-hidden"
                >
                  {/* Glowing Laser Scan Bar sweeping vertically */}
                  {!shouldReduceMotion && (
                    <motion.div
                      animate={{
                        top: ['0%', '98%', '0%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="absolute left-0 right-0 h-0.5 bg-olive shadow-[0_0_12px_rgba(79,93,47,0.9)] z-30 pointer-events-none"
                    />
                  )}

                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-line">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-olive" />
                      <span className="text-xs font-mono uppercase tracking-wider text-ink font-bold">
                        Posto do Revisor · Validação de Segurança Alimentar
                      </span>
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-olive/15 text-olive font-bold border border-olive/30">
                      SCANNER ATIVO
                    </span>
                  </div>

                  {/* 3 Telemetry Gauges / Checkpoints */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                    <div className="bg-paper-2/70 border border-line rounded-lg p-3">
                      <div className="flex items-center gap-1.5 text-olive font-mono text-[11px] font-bold uppercase mb-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Realismo</span>
                      </div>
                      <div className="text-ink font-bold text-sm">15 min</div>
                      <div className="text-[10px] font-mono text-olive font-semibold mt-0.5">
                        ✓ Tempo Exequível
                      </div>
                    </div>

                    <div className="bg-paper-2/70 border border-line rounded-lg p-3">
                      <div className="flex items-center gap-1.5 text-olive font-mono text-[11px] font-bold uppercase mb-1">
                        <Thermometer className="w-3.5 h-3.5" />
                        <span>Temperatura</span>
                      </div>
                      <div className="text-ink font-bold text-sm">Frango ≥ 74°C</div>
                      <div className="text-[10px] font-mono text-olive font-semibold mt-0.5">
                        ✓ Termalmente Seguro
                      </div>
                    </div>

                    <div className="bg-paper-2/70 border border-line rounded-lg p-3">
                      <div className="flex items-center gap-1.5 text-olive font-mono text-[11px] font-bold uppercase mb-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Restrições</span>
                      </div>
                      <div className="text-ink font-bold text-sm">Sem glúten</div>
                      <div className="text-[10px] font-mono text-olive font-semibold mt-0.5">
                        ✓ Zero Alergénios
                      </div>
                    </div>
                  </div>

                  {/* Final Approved Wax Seal Badge */}
                  <div className="pt-4 border-t border-dashed border-line flex items-center justify-between">
                    <span className="text-xs font-mono text-ink-soft">
                      CONFERÊNCIA ENTRE INGREDIENTES E PASSOS: 100%
                    </span>
                    <motion.div
                      initial={{ scale: shouldReduceMotion ? 1 : 1.3, rotate: -4 }}
                      animate={{ scale: 1, rotate: -2 }}
                      transition={{ type: 'spring', damping: 15 }}
                      className="px-3 py-1 rounded bg-olive text-paper font-mono font-bold text-xs uppercase tracking-wider shadow-sm flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" strokeWidth={3} />
                      <span>RECEITA VALIDADA</span>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* --- OS 3 CARTÕES INFORMATIVOS DE AGENTES --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
          {agents.list.map((agent, index) => {
            const isCurrent = activeStation === index;
            return (
              <motion.article
                key={agent.title}
                onClick={() => selectStation(index)}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.5,
                  delay: shouldReduceMotion ? 0 : index * 0.12,
                  ease: [0.2, 0.7, 0.2, 1],
                }}
                className={`border-1.5 rounded-card p-8 shadow-warm cursor-pointer transition-all duration-300 flex flex-col justify-between relative group ${
                  isCurrent
                    ? 'bg-paper border-tomato shadow-md -translate-y-1 ring-2 ring-tomato/20'
                    : 'bg-paper-2 border-line hover:-translate-y-1 hover:border-line/80'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-12 h-12 rounded-full border flex items-center justify-center shadow-xs transition-colors ${
                        isCurrent
                          ? 'bg-paper-2 border-tomato'
                          : 'bg-paper border-line'
                      }`}
                    >
                      {agentIcons[index]}
                    </div>
                    <span
                      className={`text-[11px] font-mono tracking-wider px-2.5 py-1 rounded border transition-colors ${
                        isCurrent
                          ? 'bg-tomato/10 text-tomato border-tomato/30 font-bold'
                          : 'bg-paper/80 text-ink-soft border-line/60'
                      }`}
                    >
                      {isCurrent ? '● ESTAÇÃO ATIVA' : `FASE 0${index + 1}`}
                    </span>
                  </div>

                  <h3
                    className={`font-fraunces font-bold text-2xl mb-4 transition-colors ${
                      isCurrent ? 'text-tomato' : 'text-ink'
                    }`}
                  >
                    {agent.title}
                  </h3>

                  <p className="text-ink-soft text-base leading-relaxed">
                    {agent.description}
                  </p>
                </div>

                {/* Footer action */}
                <div className="mt-8 pt-4 border-t border-dashed border-line/70 flex items-center justify-between text-xs font-mono">
                  <span className="text-ink-soft">
                    {index === 0 && '2 PROPOSTAS → ESCOLHA'}
                    {index === 1 && 'TEMPOS & DOSES EXATAS'}
                    {index === 2 && 'SEGURANÇA & VALIDAÇÃO'}
                  </span>
                  <span
                    className={`font-bold transition-transform group-hover:translate-x-1 ${
                      isCurrent ? 'text-tomato' : 'text-ink-soft/70'
                    }`}
                  >
                    Ver Posto →
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
