import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Flame } from 'lucide-react';
import { content } from '../data/content';
import { Button } from './Button';
import { useAppMotion } from '../context/MotionContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { motionEnabled, toggleMotion } = useAppMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-paper/95 dark:bg-paper/95 backdrop-blur-md shadow-warm-sm border-b border-line/60 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="font-fraunces font-extrabold text-2xl md:text-2xl text-ink tracking-tight flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron rounded-sm"
          aria-label="AgentesCozinha - Início"
        >
          <span className="w-3.5 h-3.5 rounded-full bg-tomato inline-block" aria-hidden="true" />
          <span>{content.navbar.logo}</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8" aria-label="Navegação principal">
          {content.navbar.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-ink-soft hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron rounded-sm py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions Desktop */}
        <div className="hidden md:flex items-center space-x-3">
          {/* Motion Toggle (Lume vivo vs. Lume brando) */}
          <button
            onClick={toggleMotion}
            type="button"
            className={`p-2 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron flex items-center gap-1.5 text-xs font-mono ${
              motionEnabled
                ? 'text-tomato bg-tomato/10 hover:bg-tomato/20 font-semibold'
                : 'text-ink-soft/60 hover:text-ink hover:bg-paper-2'
            }`}
            title={motionEnabled ? 'Lume vivo: animações ativadas (clique para pausar)' : 'Lume brando: animações pausadas (clique para ativar)'}
            aria-label={motionEnabled ? 'Mudar para lume brando (pausar animações)' : 'Mudar para lume vivo (ativar animações)'}
          >
            <Flame className={`w-4 h-4 ${motionEnabled ? 'fill-tomato/20' : ''}`} strokeWidth={2} />
            <span className="hidden lg:inline">{motionEnabled ? 'Lume vivo' : 'Lume brando'}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            type="button"
            className="p-2 text-ink-soft hover:text-ink rounded-full hover:bg-paper-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
            aria-label={isDarkMode ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-saffron" strokeWidth={1.75} />
            ) : (
              <Moon className="w-5 h-5 text-ink" strokeWidth={1.75} />
            )}
          </button>

          <Button href={content.appUrl} external variant="primary" className="!py-2 !px-5 !text-sm">
            {content.navbar.cta}
          </Button>
        </div>

        {/* Mobile Hamburger & Controls */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={toggleMotion}
            type="button"
            className={`p-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron ${
              motionEnabled ? 'text-tomato bg-tomato/10' : 'text-ink-soft'
            }`}
            aria-label={motionEnabled ? 'Mudar para lume brando (pausar animações)' : 'Mudar para lume vivo (ativar animações)'}
            title={motionEnabled ? 'Lume vivo' : 'Lume brando'}
          >
            <Flame className={`w-5 h-5 ${motionEnabled ? 'fill-tomato/20' : ''}`} strokeWidth={2} />
          </button>

          <button
            onClick={toggleTheme}
            type="button"
            className="p-2 text-ink-soft hover:text-ink rounded-full hover:bg-paper-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
            aria-label={isDarkMode ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-saffron" strokeWidth={1.75} />
            ) : (
              <Moon className="w-5 h-5 text-ink" strokeWidth={1.75} />
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="p-2 text-ink hover:text-ink rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" strokeWidth={1.75} />
            ) : (
              <Menu className="w-6 h-6" strokeWidth={1.75} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-paper dark:bg-paper border-b border-line px-6 py-6 shadow-warm"
        >
          <nav className="flex flex-col space-y-4" aria-label="Navegação móvel">
            {content.navbar.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMobileMenu}
                className="text-base font-medium text-ink hover:text-tomato py-2 border-b border-line/40 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3">
              <Button
                href={content.appUrl}
                external
                variant="primary"
                className="w-full text-center justify-center"
                onClick={closeMobileMenu}
              >
                {content.navbar.cta}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
