import React from 'react';
import { motion } from 'framer-motion';
import { useAppMotion } from '../context/MotionContext';

interface StampProps {
  status: 'disponivel' | 'falta';
  text?: string;
  className?: string;
  animate?: boolean;
}

export const Stamp: React.FC<StampProps> = ({
  status,
  text,
  className = '',
  animate = true,
}) => {
  const { shouldReduceMotion } = useAppMotion();
  const label = text || (status === 'disponivel' ? 'DISPONÍVEL' : 'EM FALTA');

  const statusStyles =
    status === 'disponivel'
      ? 'text-olive border-olive/85 bg-olive/10 shadow-[inset_0_0_5px_rgba(79,93,47,0.15)] ring-1 ring-olive/30'
      : 'text-[#C47D15] dark:text-saffron border-[#C47D15]/85 dark:border-saffron/85 bg-saffron/10 shadow-[inset_0_0_5px_rgba(233,168,59,0.15)] ring-1 ring-[#C47D15]/30 dark:ring-saffron/30';

  const baseClasses = `inline-block px-2.5 py-0.5 text-[11px] font-mono font-bold tracking-widest uppercase border-2 border-double rounded-[2px] transform -rotate-2.5 select-none relative overflow-hidden ${statusStyles} ${className}`;

  if (shouldReduceMotion || !animate) {
    return <span className={baseClasses}>{label}</span>;
  }

  return (
    <motion.span
      className={baseClasses}
      initial={{ scale: 1.25, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 450,
        damping: 25,
      }}
    >
      {label}
    </motion.span>
  );
};
