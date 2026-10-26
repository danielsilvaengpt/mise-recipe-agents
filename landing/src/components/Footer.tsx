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

          {/* Repo Link (if available) */}
          <div>
            <a
              href={footer.repoUrl}
              className="inline-flex items-center gap-2 text-xs font-mono hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron rounded-sm py-1"
            >
              <Github className="w-4 h-4" />
              <span>{footer.repoLinkText}</span>
            </a>
          </div>
        </div>

        {/* Bottom Attribution */}
        <div className="pt-8 text-center text-xs font-mono text-ink-soft/80">
          <p>{footer.text}</p>
        </div>
      </div>
    </footer>
  );
};
