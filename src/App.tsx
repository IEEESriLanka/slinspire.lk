import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { LoadingProvider } from "./contexts/LoadingContext";

export const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 overflow-x-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {/* ... */}
      </div>
      <ErrorBoundary>
        <LoadingProvider>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/*" element={<HomePage />} />
            </Routes>
          </Router>
        </LoadingProvider>
      </ErrorBoundary>
    </div>
  );
};