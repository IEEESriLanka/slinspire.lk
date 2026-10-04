import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ROUTES } from "@/config/routes";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { ScrollToTop } from "@/components/layout/ScrollTop";

// Page Components
import { HomePage } from "@/pages/HomePage";
import { CareerCompassWebPage } from "@/pages/CareerCompassWebPage";
import { CareerCompassBookPage } from "@/pages/CareerCompassBookPage";
import { CareerExplorerPage } from "@/pages/CareerExplorerPage";
import { GalleryPage } from "@/pages/GalleryPage";
import { AboutUsPage } from "@/pages/AboutUsPage";
import { PartnersPage, PatnersPage } from "@/pages/PartnersPage";
import { TeamPage } from "@/pages/TeamPage";
import { SessionRecordingsPage } from "@/pages/SessionRecordingsPage";
import { VideoPlaylistPage } from "@/pages/VideoPlaylistPage";
import StepUpPage from "@/pages/step-up/page";
import RegisterPage from "@/pages/step-up/register";
import SuccessPage from "@/pages/step-up/success";
import { LaunchCeremony } from "@/pages/web-launch/page";

console.log("Deployed at:", new Date().toLocaleString());

export const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <ErrorBoundary>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route
              path={ROUTES.CAREER_COMPASS_WEB}
              element={<CareerCompassWebPage />}
            />
            <Route
              path={ROUTES.CAREER_COMPASS_BOOK}
              element={<CareerCompassBookPage />}
            />
            <Route
              path={ROUTES.CAREER_EXPLORER}
              element={<CareerExplorerPage />}
            />
            <Route path={ROUTES.GALLERY} element={<GalleryPage />} />
            <Route path={ROUTES.ABOUT_US} element={<AboutUsPage />} />
            <Route path={ROUTES.PARTNERS} element={<PartnersPage />} />
            <Route
              path={ROUTES.PARTNERS_LEGACY}
              element={<PatnersPage />}
            />
            <Route path={ROUTES.TEAM} element={<TeamPage />} />
            <Route
              path={ROUTES.SESSION_RECORDINGS}
              element={<SessionRecordingsPage />}
            />
            <Route
              path={ROUTES.PLAYLIST}
              element={<VideoPlaylistPage />}
            />

            {/* Step Up Event */}
            <Route path={ROUTES.STEP_UP} element={<StepUpPage />} />
            <Route
              path={ROUTES.STEP_UP_REGISTER}
              element={<RegisterPage />}
            />
            <Route
              path={ROUTES.STEP_UP_SUCCESS}
              element={<SuccessPage />}
            />

            {/* Website Launch */}
            <Route path={ROUTES.WEB_LAUNCH} element={<LaunchCeremony />} />

            {/* Fallback */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Router>
      </ErrorBoundary>
    </div>
  );
};