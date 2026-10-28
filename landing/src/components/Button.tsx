import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useAppMotion } from '../context/MotionContext';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  href?: string;
  external?: boolean;
  children: React.ReactNode;
  icon?: boolean;
  magnetic?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  href,
  external = false,
  children,
  icon = false,
  magnetic = true,
  className = '',
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { shouldReduceMotion } = useAppMotion();

  // Magnetic spring physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 14, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !magnetic || variant !== 'primary') return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Amplified magnetic attraction factor for clear responsiveness
    const distanceX = (e.clientX - centerX) * 0.32;
    const distanceY = (e.clientY - centerY) * 0.32;

    x.set(distanceX);
    y.set(distanceY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseClasses =
    'inline-flex items-center justify-center font-medium transition-colors duration-200 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:opacity-50 disabled:cursor-not-allowed group text-sm md:text-base px-6 py-3 select-none cursor-pointer';

  const variants = {
    primary:
      'bg-tomato text-paper hover:bg-[#c23b24] shadow-warm-sm active:translate-y-0.5',
    secondary:
      'border-1.5 border-ink text-ink bg-transparent hover:bg-ink/5 active:translate-y-0.5',
  };

  const combinedClasses = `${baseClasses} ${variants[variant]} ${className}`;

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {icon && (
        <ArrowRight
          className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 relative z-10"
          strokeWidth={2}
          aria-hidden="true"
        />
      )}
    </>
  );

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: shouldReduceMotion ? 0 : springX,
        y: shouldReduceMotion ? 0 : springY,
      }}
      className="inline-block"
    >
      {href ? (
        !external && href.startsWith('/') ? (
          <Link to={href} className={combinedClasses}>
            {content}
          </Link>
        ) : (
          <a
            href={href}
            className={combinedClasses}
            {...(external
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
          >
            {content}
          </a>
        )
      ) : (
        <button className={combinedClasses} {...props}>
          {content}
        </button>
      )}
    </motion.div>
  );
};
