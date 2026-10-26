import React from 'react';
import { MotionProvider } from './context/MotionContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Problem } from './components/Problem';
import { Agents } from './components/Agents';
import { HowItWorks } from './components/HowItWorks';
import { Pantry } from './components/Pantry';
import { Honesty } from './components/Honesty';
import { RecipePreview } from './components/RecipePreview';
import { Safety } from './components/Safety';
import { Faq } from './components/Faq';
import { CtaFinal } from './components/CtaFinal';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <MotionProvider>
      <div className="min-h-screen bg-paper text-ink flex flex-col font-jakarta selection:bg-saffron/30 selection:text-ink relative">
        {/* Analog tactile paper grain texture overlay */}
        <div
          className="pointer-events-none fixed inset-0 z-50 opacity-[0.032] dark:opacity-[0.045] mix-blend-multiply dark:mix-blend-screen select-none overflow-hidden"
          aria-hidden="true"
        >
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <filter id="paper-grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.1  0 0 0 0 0.1  0 0 0 0 0.1  0 0 0 1 0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#paper-grain)" />
          </svg>
        </div>

        {/* Skip to content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-tomato focus:text-paper focus:rounded-md focus:shadow-md focus:outline-none"
        >
          Saltar para o conteúdo principal
        </a>

        {/* Navigation */}
        <Navbar />

        {/* Main Content */}
        <main id="main-content" className="flex-grow">
          <Hero />
          <Problem />
          <Agents />
          <HowItWorks />
          <Pantry />
          <Honesty />
          <RecipePreview />
          <Safety />
          <Faq />
          <CtaFinal />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </MotionProvider>
  );
};

export default App;
