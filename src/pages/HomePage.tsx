import React from "react";
import { Header } from "../components/layout/Header";
import { HeroSection } from "../components/sections/HeroSection";
import { ServicesSection } from "../components/sections/ServicesSection";
import { MonthlySeminarsSection } from "../components/sections/MonthlySeminarsSection";
import { RegistrationSection } from "../components/sections/RegistrationSection";
import { FeedbacksSection } from "../components/sections/FeedbacksSection";
import { Footer } from "../components/layout/Footer";
import { StepUpPopup } from "../components/ui/StepUpPopup";

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <Header isMainPage={true} />
      <main>
        <HeroSection />
        <ServicesSection />
        <MonthlySeminarsSection />
        <RegistrationSection />
        <FeedbacksSection />
      </main>
      <Footer />
      <StepUpPopup />
    </div>
  );
};