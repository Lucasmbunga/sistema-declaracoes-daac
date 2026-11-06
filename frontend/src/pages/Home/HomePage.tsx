import React from 'react';
import { Header } from '../../components/Header';
import { HeroSection } from '../../components/HeroSection';
import { FeatureCards } from '../../components/FeatureCards';
import { ProcessSteps } from '../../components/ProcessSteps';
import { InstitutionalBanner } from '../../components/InstitutionalBanner';
import { Footer } from '../../components/Footer';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-[#0f2c33] selection:text-white">
      <Header />
      <main className="grow">
        <HeroSection />
        <FeatureCards />
        <ProcessSteps />
        <InstitutionalBanner />
      </main>
      <Footer />
    </div>
  );
};