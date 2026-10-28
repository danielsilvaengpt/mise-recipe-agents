import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { ArrowLeft, Flame, Sun, Moon, Utensils, Package, BookOpen, X } from 'lucide-react';
import { useAppMotion } from '../../context/MotionContext';
import { useApp } from '../../context/AppContext';

export const AppLayout: React.FC = () => {
  const { motionEnabled, toggleMotion } = useAppMotion();
  const { apiOnline, toastMessage, hideToast } = useApp();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
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

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col font-jakarta selection:bg-saffron/30 selection:text-ink relative">
      {/* Background paper texture */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.02] dark:opacity-[0.035] select-none overflow-hidden"
        aria-hidden="true"
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="app-paper-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.1  0 0 0 0 0.1  0 0 0 0 0.1  0 0 0 1 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#app-paper-grain)" />
        </svg>
      </div>

      {/* Top Header / Kitchen Command Bar */}
      <header className="sticky top-0 z-40 bg-paper/95 dark:bg-paper-2/95 backdrop-blur-md border-b border-line shadow-xs transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Left: Back Link & Logo */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-ink-soft hover:text-tomato transition-colors p-1.5 rounded-lg hover:bg-paper-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
              title="Voltar à apresentação principal"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Apresentação</span>
            </Link>

            <span className="text-line" aria-hidden="true">|</span>

            <div className="flex items-center gap-2">
              <span className="font-fraunces font-extrabold text-xl text-ink tracking-tight">Mise</span>
              <span className="hidden md:inline-block text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-paper-2 border border-line text-ink-soft">
                Atelier Culinário
              </span>
            </div>
          </div>

          {/* Center: Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <NavLink
              to="/app/fogao"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-tomato text-paper shadow-sm font-semibold'
                    : 'text-ink-soft hover:text-ink hover:bg-paper-2'
                }`
              }
            >
              <Utensils className="w-4 h-4" />
              <span>O Fogão</span>
            </NavLink>

            <NavLink
              to="/app/despensa"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-tomato text-paper shadow-sm font-semibold'
                    : 'text-ink-soft hover:text-ink hover:bg-paper-2'
                }`
              }
            >
              <Package className="w-4 h-4" />
              <span>A Despensa</span>
            </NavLink>

            <NavLink
              to="/app/livro"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-tomato text-paper shadow-sm font-semibold'
                    : 'text-ink-soft hover:text-ink hover:bg-paper-2'
                }`
              }
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">O Livro</span>
              <span className="sm:hidden">Livro</span>
            </NavLink>
          </nav>

          {/* Right: API Indicator & Controls */}
          <div className="flex items-center gap-2">
            {/* Live Backend Indicator */}
            <div
              className={`hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono border ${
                apiOnline
                  ? 'bg-olive/10 border-olive/30 text-olive'
                  : 'bg-saffron/10 border-saffron/40 text-saffron dark:text-saffron'
              }`}
              title={
                apiOnline
                  ? 'API do Backend FastAPI conectada em http://localhost:8000'
                  : 'Backend offline: inicia com `cd backend && uvicorn src.api.api:app --reload`'
              }
            >
              <span className={`w-2 h-2 rounded-full ${apiOnline ? 'bg-olive animate-pulse' : 'bg-saffron'}`} />
              <span>{apiOnline ? 'Backend Online' : 'Backend Offline'}</span>
            </div>

            {/* Lume vivo / Lume brando */}
            <button
              onClick={toggleMotion}
              type="button"
              className={`p-2 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron ${
                motionEnabled ? 'text-tomato bg-tomato/10' : 'text-ink-soft hover:bg-paper-2'
              }`}
              title={motionEnabled ? 'Lume vivo (Animações ativas)' : 'Lume brando (Animações desativadas)'}
              aria-label={motionEnabled ? 'Desativar animações' : 'Ativar animações'}
            >
              <Flame className={`w-4 h-4 ${motionEnabled ? 'fill-tomato/20' : ''}`} />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              type="button"
              className="p-2 text-ink-soft hover:text-ink rounded-full hover:bg-paper-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
              aria-label={isDarkMode ? 'Modo claro' : 'Modo escuro'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-saffron" /> : <Moon className="w-4 h-4 text-ink" />}
            </button>
          </div>
        </div>

        {/* Offline Alert Banner if backend is not detected */}
        {apiOnline === false && (
          <div className="bg-saffron/15 border-t border-b border-saffron/30 px-4 py-2 text-center text-xs text-ink-soft font-mono">
            <span>
              ⚠️ <strong>Backend FastAPI Offline</strong> (porta 8000). Para usar a brigada real e a despensa, inicia no terminal:
              <code className="ml-1.5 px-1.5 py-0.5 rounded bg-paper border border-line text-ink font-semibold">
                cd backend &amp;&amp; uvicorn src.api.api:app --reload
              </code>
            </span>
          </div>
        )}
      </header>

      {/* Main App Content View */}
      <main className="flex-grow flex flex-col relative z-10 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 md:py-8">
        <Outlet />
      </main>

      {/* Floating Kitchen Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
          <div className="flex items-center gap-3 px-4 py-3 rounded-card bg-ink text-paper dark:bg-paper-2 dark:text-ink shadow-warm border border-line text-xs font-mono">
            <span>{toastMessage}</span>
            <button
              onClick={hideToast}
              className="p-1 rounded hover:bg-paper/20 transition-colors"
              aria-label="Fechar notificação"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppLayout;
