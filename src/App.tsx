import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { LoadingProvider } from "./contexts/LoadingContext";
import { CareerCompassWebPage } from "./pages/CareerCompassWebPage";
import { CareerCompassBookPage } from "./pages/CareerCompassBookPage";
import { GalleryPage } from "./pages/GalleryPage";

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
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/career-compass-web" element={<CareerCompassWebPage />} />
              <Route path="/career-compass-book" element={<CareerCompassBookPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </Router>
        </LoadingProvider>
      </ErrorBoundary>
    </div>
  );
};