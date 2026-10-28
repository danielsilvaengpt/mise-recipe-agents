import React from 'react';
import { Navbar } from '../Navbar';
import { Hero } from '../Hero';
import { TechStackCarousel } from '../TechStackCarousel';
import { Problem } from '../Problem';
import { Agents } from '../Agents';
import { HowItWorks } from '../HowItWorks';
import { Pantry } from '../Pantry';
import { Honesty } from '../Honesty';
import { RecipePreview } from '../RecipePreview';
import { Safety } from '../Safety';
import { Faq } from '../Faq';
import { CtaFinal } from '../CtaFinal';
import { Footer } from '../Footer';

export const LandingPage: React.FC = () => {
  return (
    <>
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main id="main-content" className="flex-grow">
        <Hero />
        <TechStackCarousel />
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
    </>
  );
};

export default LandingPage;
