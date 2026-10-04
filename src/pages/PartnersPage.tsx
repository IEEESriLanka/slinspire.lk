import { PageLayout } from "@/components/layout/PageLayout";
import { PartnersSection } from "@/features/partners/components/PartnersSection";

export const PartnersPage = () => {
  return (
    <PageLayout>
      <PartnersSection />
    </PageLayout>
  );
};

// Backward-compatibility export for legacy typo
export const PatnersPage = PartnersPage;
export default PartnersPage;
