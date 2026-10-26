import React, { useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { Clock, Users, CheckCircle2, RotateCcw } from 'lucide-react';
import { content } from '../data/content';
import { Button } from './Button';
import { Stamp } from './Stamp';
import { useAppMotion } from '../context/MotionContext';

export const Hero: React.FC = () => {
  const { shouldReduceMotion } = useAppMotion();
  const { hero, appUrl } = content;
  const heroRef = useRef<HTMLElement>(null);
  const ticketRef = useRef<HTMLDivElement>(null);
  const [sequenceKey, setSequenceKey] = useState(0);

  // Volumetric Studio Lighting tracking mouse across the Hero
  const mouseX = useMotionValue(400);
  const mouseY = useMotionValue(250);

  const springConfig = { damping: 26, stiffness: 180 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Background glow transform declared at top level (unconditional hook)
  const ambientGlowBackground = useTransform(
    [smoothMouseX, smoothMouseY],
    ([x, y]) =>
      `radial-gradient(circle 520px at ${x}px ${y}px, rgba(233,168,59,0.22), transparent 75%)`
  );

  // Dynamic paper sheen / glare position tracking mouse
  const ticketMouseX = useMotionValue(0);
  const ticketMouseY = useMotionValue(0);

  const glareX = useTransform(ticketMouseX, [-0.5, 0.5], ['5%', '95%']);
  const glareY = useTransform(ticketMouseY, [-0.5, 0.5], ['5%', '95%']);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion) return;
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleTicketMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = ticketRef.current?.getBoundingClientRect();
    if (!rect) return;
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    ticketMouseX.set(normX);
    ticketMouseY.set(normY);
  };

  const handleTicketMouseLeave = () => {
    ticketMouseX.set(0);
    ticketMouseY.set(0);
  };

  const replaySequence = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSequenceKey((prev) => prev + 1);
  };

  // Entrance animations for Left Column
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  // Crisp Mechanical Extrusion of the Docket (No blur filters to ensure 100% sharp text)
  const ticketExtrusionVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : -50,
      scaleY: shouldReduceMotion ? 1 : 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scaleY: 1,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.75,
        ease: [0.16, 1, 0.3, 1] as const,
        delay: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  // Staggered Ingredient Reveal
  const ingredientRowVariants = {
    hidden: {
      opacity: 0,
      x: shouldReduceMotion ? 0 : -24,
    },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: shouldReduceMotion ? 0 : 0.5 + i * 0.14,
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleHeroMouseMove}
      className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-paper"
    >
      {/* Volumetric Studio Lighting (Soft ambient glow following the mouse) */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-0 opacity-40 dark:opacity-25"
          style={{ background: ambientGlowBackground }}
          aria-hidden="true"
        />
      )}

      {/* Subtle paper grid texture accent */}
      <div
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.05] pointer-events-none z-0"
        style={{
          backgroundImage: `radial-gradient(var(--ink) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-5 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Promise & CTAs (6 cols) */}
          <motion.div
            className="lg:col-span-6 flex flex-col items-start"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge: Organic kitchen stamp instead of AI sparkles */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wider uppercase bg-paper-2 border border-line text-ink-soft shadow-xs">
                <span className="w-2 h-2 rounded-full bg-tomato animate-pulse" aria-hidden="true" />
                {hero.badge}
              </span>
            </motion.div>

            {/* H1 Title */}
            <motion.h1
              variants={itemVariants}
              className="font-fraunces font-extrabold text-ink mb-6 text-balance"
            >
              {hero.h1}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-ink-soft text-lg leading-relaxed max-w-text mb-8"
            >
              {hero.subtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-6"
            >
              <Button href={appUrl} external variant="primary" icon magnetic>
                {hero.primaryCta}
              </Button>
              <Button href="#como-funciona" variant="secondary">
                {hero.secondaryCta}
              </Button>
            </motion.div>

            {/* Micro-copy note */}
            <motion.p
              variants={itemVariants}
              className="text-xs font-mono text-ink-soft/80 flex items-center gap-2"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-olive shrink-0" strokeWidth={2} />
              <span>{hero.note}</span>
            </motion.p>
          </motion.div>

          {/* Right Column: The Night Kitchen Cinematic Docket Rig */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div
              ref={ticketRef}
              onMouseMove={handleTicketMouseMove}
              onMouseLeave={handleTicketMouseLeave}
              className="w-full max-w-md relative [perspective:1400px] cursor-grab active:cursor-grabbing"
            >
              {/* Cinematic Brass & Graphite Order Rail with Smooth Mounting */}
              <motion.div
                key={`rail-${sequenceKey}`}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-[94%] mx-auto h-4 bg-[#262018] dark:bg-[#1A150F] rounded-t-sm border border-[#3E3426] shadow-lg flex items-center justify-around px-8 relative z-30"
                aria-hidden="true"
              >
                {/* Brushed Brass Marble Clips with Specular Sheen */}
                <div className="w-3.5 h-3.5 rounded-full bg-saffron border border-[#8C6420] shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_2px_4px_rgba(0,0,0,0.5)] transform -translate-y-0.5" />
                <div className="w-3.5 h-3.5 rounded-full bg-saffron border border-[#8C6420] shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_2px_4px_rgba(0,0,0,0.5)] transform -translate-y-0.5" />
              </motion.div>

              {/* Ticket Wrapper with Stable, Pixel-Perfect Typography (No 3D Blur) */}
              <div
                className="relative"
                style={{
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                }}
              >
                {/* Thermal Printer Extrusion Motion Container */}
                <motion.div
                  key={`ticket-${sequenceKey}`}
                  variants={ticketExtrusionVariants}
                  initial="hidden"
                  animate="visible"
                  className="relative bg-paper-2 border-x-1.5 border-line shadow-warm overflow-hidden origin-top"
                  style={{
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden',
                  }}
                >
                  {/* Dynamic Specular Sheen (Reflexo de luz no papel) */}
                  {!shouldReduceMotion && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-20 z-20"
                      style={{
                        background: `radial-gradient(circle 380px at ${glareX} ${glareY}, rgba(255,255,255,0.9), transparent 65%)`,
                      }}
                      aria-hidden="true"
                    />
                  )}

                  {/* Top Saw-Tooth Paper Tear SVG */}
                  <div className="w-full h-2.5 overflow-hidden -mt-[1px]" aria-hidden="true">
                    <svg
                      className="w-full h-2.5 block text-paper-2 fill-current"
                      preserveAspectRatio="none"
                      viewBox="0 0 100 10"
                    >
                      <polygon points="0,10 2.5,0 5,10 7.5,0 10,10 12.5,0 15,10 17.5,0 20,10 22.5,0 25,10 27.5,0 30,10 32.5,0 35,10 37.5,0 40,10 42.5,0 45,10 47.5,0 50,10 52.5,0 55,10 57.5,0 60,10 62.5,0 65,10 67.5,0 70,10 72.5,0 75,10 77.5,0 80,10 82.5,0 85,10 87.5,0 90,10 92.5,0 95,10 97.5,0 100,10" />
                    </svg>
                  </div>

                  <div className="p-6 md:p-8 pt-6 pb-4 relative z-10">
                    {/* Chef's Masking Tape (Fita crepe de cozinha autêntica) */}
                    <div
                      className="absolute -top-3 left-1/2 -translate-x-1/2 w-36 h-6 bg-[#eeddbb]/90 dark:bg-[#3d3424]/90 border-y border-[#ddc89e] dark:border-[#524632] shadow-sm transform -rotate-1 flex items-center justify-center text-[10px] font-mono tracking-widest text-ink-soft select-none z-30"
                      style={{
                        clipPath: 'polygon(3% 0%, 97% 0%, 100% 50%, 97% 100%, 3% 100%, 0% 50%)',
                      }}
                      aria-hidden="true"
                    >
                      <span className="opacity-75">MISE · SERVIÇO Nº 14</span>
                    </div>

                    {/* Pinned Order Request Banner */}
                    <div className="bg-paper border border-line/80 rounded px-3 py-2 mb-5 flex items-center justify-between text-xs font-mono shadow-2xs">
                      <span className="text-ink-soft uppercase text-[10px] tracking-wider font-semibold">
                        PEDIDO REGISTADO:
                      </span>
                      <span className="text-ink font-bold">
                        «Algo rápido para 2 pessoas»
                      </span>
                    </div>

                    {/* Ticket Header & Metadata */}
                    <div className="border-b-1.5 border-dashed border-line pb-4 mb-5">
                      <div className="flex items-center justify-between text-xs font-mono text-ink-soft mb-1.5">
                        <span className="font-bold tracking-widest text-ink">
                          {hero.ticket.number}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-paper border border-line text-[10px] tracking-wider uppercase font-bold text-olive shadow-2xs">
                          VALIDADA · REVISOR
                        </span>
                      </div>

                      <h3 className="font-fraunces font-bold text-xl md:text-2xl text-ink leading-snug mt-2">
                        {hero.ticket.dishName}
                      </h3>

                      <div className="flex items-center gap-4 mt-2.5 text-xs font-mono text-ink-soft">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-tomato" strokeWidth={2} />
                          {hero.ticket.time}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-ink-soft" strokeWidth={2} />
                          {hero.ticket.servings}
                        </span>
                        <span className="ml-auto text-[11px] text-ink-soft/70 italic">
                          {hero.ticket.disclaimer}
                        </span>
                      </div>
                    </div>

                    {/* Ingredients Docket Table with Staggered Thermal Reveal */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-[11px] font-mono uppercase text-ink-soft tracking-wider border-b border-line/50 pb-1">
                        <span>Ingrediente na comanda</span>
                        <span className="text-right">Verificação</span>
                      </div>

                      <div className="divide-y divide-line/35">
                        {hero.ticket.ingredients.map((item, index) => (
                          <motion.div
                            key={item.name}
                            custom={index}
                            variants={ingredientRowVariants}
                            initial="hidden"
                            animate="visible"
                            className="py-2.5 flex items-center justify-between gap-3 text-sm"
                          >
                            <div className="flex flex-col min-w-0 pr-2">
                              <span className="font-medium text-ink truncate">
                                {item.name}
                              </span>
                              <span className="text-xs font-mono text-ink-soft">
                                {item.qty}
                                {item.note && (
                                  <span className="text-ink-soft/70 ml-1.5 text-[11px]">
                                    · {item.note}
                                  </span>
                                )}
                              </span>
                            </div>

                            <div className="shrink-0">
                              <Stamp
                                status={item.status}
                                animate={!shouldReduceMotion}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Ticket Footer: Pipeline & Cinematic Replay Button */}
                    <div className="mt-6 pt-4 border-t-1.5 border-dashed border-line flex items-center justify-between text-[11px] font-mono text-ink-soft">
                      <div className="flex items-center gap-1.5">
                        <span className="inline-block w-2 h-2 rounded-full bg-olive animate-pulse" />
                        <span>CHEF → REDATOR → REVISOR</span>
                      </div>

                      <button
                        type="button"
                        onClick={replaySequence}
                        className="inline-flex items-center gap-1 text-[10px] text-tomato hover:text-[#c23b24] bg-tomato/10 hover:bg-tomato/20 px-2.5 py-1 rounded font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-tomato shadow-2xs"
                        title="Rever a abertura cinemática da comanda"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Rever Sequência</span>
                      </button>
                    </div>
                  </div>

                  {/* Bottom Saw-Tooth Paper Tear SVG */}
                  <div className="w-full h-2.5 overflow-hidden -mb-[1px]" aria-hidden="true">
                    <svg
                      className="w-full h-2.5 block text-paper-2 fill-current"
                      preserveAspectRatio="none"
                      viewBox="0 0 100 10"
                    >
                      <polygon points="0,0 2.5,10 5,0 7.5,10 10,0 12.5,10 15,0 17.5,10 20,0 22.5,10 25,0 27.5,10 30,0 32.5,10 35,0 37.5,10 40,0 42.5,10 45,0 47.5,10 50,0 52.5,10 55,0 57.5,10 60,0 62.5,10 65,0 67.5,10 70,0 72.5,10 75,0 77.5,10 80,0 82.5,10 85,0 87.5,10 90,0 92.5,10 95,0 97.5,10 100,0" />
                    </svg>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
