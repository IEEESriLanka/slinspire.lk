import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { LoadingProvider } from "./contexts/LoadingContext";
import { CareerCompassWeb } from "./pages/CareerCompassWebPage";

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
              <Route path="/career-compass-web" element={<CareerCompassWeb />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </Router>
        </LoadingProvider>
      </ErrorBoundary>
    </div>
  );
};