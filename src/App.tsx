import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { LoadingProvider } from "./contexts/LoadingContext";
import { CareerCompassWebPage } from "./pages/CareerCompassWebPage";
import { CareerCompassBookPage } from "./pages/CareerCompassBookPage";
import { GalleryPage } from "./pages/GalleryPage";
import { AboutUsPage } from "./pages/AboutUsPage";
import { TeamPage } from "./pages/TeamPage";
import { PatnersPage } from "./pages/PatnersPage";
import { CareerExplorerPage } from "./pages/CareerExplorerPage";
import { SessionRecordingsPage } from "./pages/SessionRecordingsPage.tsx";
import { VideoPlaylistPage } from "./pages/VideoPlaylistPage.tsx";
import StepUpPage from "./pages/step-up/page.tsx";
import RegisterPage from "./pages/step-up/register.tsx";
import SuccessPage from "./pages/step-up/success.tsx";
import { ScrollToTop } from "./components/layout/ScrollTop";
import {LaunchCeremony} from "./pages/web-launch/page.tsx";

console.log("Deployed at:", new Date().toLocaleString());

export const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="absolute">
        {/* ... */}
      </div>
      <ErrorBoundary>
        <LoadingProvider>
          <Router>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/career-compass-web" element={<CareerCompassWebPage />} />
              <Route path="/career-compass-book" element={<CareerCompassBookPage />} />
              <Route path="/career-explorer" element={<CareerExplorerPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/aboutus" element={<AboutUsPage />} />
              <Route path="/patners" element={<PatnersPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/session-recordings" element={<SessionRecordingsPage />} />
              <Route path="/playlist/:categoryId" element={<VideoPlaylistPage />} />

              {/* Step Up Event*/}
              <Route path="/step-up" element={<StepUpPage />} />
              <Route path="/step-up/register" element={<RegisterPage />} />
              <Route path="/step-up/success" element={<SuccessPage />} />

              {/* website launch */}
              <Route path="/web-launch" element={<LaunchCeremony />} />

              <Route path="*" element={<HomePage />} />

            </Routes>
          </Router>
        </LoadingProvider>
      </ErrorBoundary>
    </div>
  );
};