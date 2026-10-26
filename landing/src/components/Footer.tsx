import React from 'react';
import { content } from '../data/content';
import { Github } from 'lucide-react';

export const Footer: React.FC = () => {
  const { footer, navbar } = content;

  return (
    <footer className="bg-paper border-t border-line py-12 md:py-16 text-sm text-ink-soft">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-line/60">
          {/* Logo & Info */}
          <div className="flex items-center gap-3">
            <span className="w-3.5 h-3.5 rounded-full bg-tomato inline-block" aria-hidden="true" />
            <span className="font-fraunces font-bold text-xl text-ink">
              {navbar.logo}
            </span>
            <span className="text-xs font-mono text-ink-soft/70">
              © {footer.year}
            </span>
          </div>

          {/* Quick links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium" aria-label="Links do rodapé">
            {navbar.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron rounded-sm"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Repo Link */}
          <div>
            <a
              href={footer.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full border border-line bg-paper-2 hover:bg-paper hover:text-tomato hover:border-tomato/40 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron shadow-2xs group"
              title="Abrir repositório no GitHub numa nova janela"
            >
              <Github className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              <span className="font-semibold">GitHub: mise-recipe-agents</span>
              <span className="text-[10px] opacity-60">↗</span>
            </a>
          </div>
        </div>

        {/* Bottom Attribution */}
        <div className="pt-8 text-center text-xs font-mono text-ink-soft/80 flex flex-col sm:flex-row items-center justify-center gap-2">
          <p>{footer.text}</p>
          <span className="hidden sm:inline opacity-40">·</span>
          <a
            href={footer.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-tomato hover:underline underline-offset-4 font-medium"
          >
            Ver código aberto no GitHub ↗
          </a>
        </div>
      </div>
    </footer>
  );
};
