import React from 'react';
import FloatingNavbar from '../components/FloatingNavbar';
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';
import ProblemsSection from '../components/ProblemsSection';
import WorkflowSection from '../components/WorkflowSection';
import FeaturesGrid from '../components/FeaturesGrid';
import CityMapPreview from '../components/CityMapPreview';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

const LandingPage = () => (
  <div className="bg-gray-50 overflow-x-hidden">
    <FloatingNavbar />
    <HeroSection />
    <StatsSection />
    <ProblemsSection />
    <WorkflowSection />
    <FeaturesGrid />
    <CityMapPreview />
    <CTASection />
    <Footer />
  </div>
);

export default LandingPage;
