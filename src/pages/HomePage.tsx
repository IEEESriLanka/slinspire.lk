import React from "react";
import { Header } from "../components/layout/Header";
import { HeroSection } from "../components/sections/HeroSection";
import { ServicesSection } from "../components/sections/ServicesSection";
import { MonthlySeminarsSection } from "../components/sections/MonthlySeminarsSection";
import { GallerySection } from "../components/sections/GallerySection";
import { RegistrationSection } from "../components/sections/RegistrationSection";
import { PartnersSection } from "../components/sections/PartnersSection";
import { GoalsSection } from "../components/sections/GoalsSection";
import { TestimonialsSection } from "../components/sections/TestimonialsSection";
import { Footer } from "../components/layout/Footer";

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <Header isMainPage={true}/>
      <main>
        <HeroSection />
        <ServicesSection />
        <MonthlySeminarsSection />
        <GallerySection />
        <RegistrationSection />
        <PartnersSection />
        <GoalsSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
};