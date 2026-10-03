import { PageLayout } from "@/components/layout/PageLayout";
import { HeroSection } from "@/features/landing/components/HeroSection";
import { ServicesSection } from "@/features/landing/components/ServicesSection";
import { MonthlySeminarsSection } from "@/features/sessions/components/MonthlySeminarsSection";
import { FeedbacksSection } from "@/features/testimonials/components/FeedbacksSection";

export const HomePage = () => {
  return (
    <PageLayout isMainPage={true} container="none">
      <HeroSection />
      <ServicesSection />
      <MonthlySeminarsSection />
      <FeedbacksSection />
    </PageLayout>
  );
};