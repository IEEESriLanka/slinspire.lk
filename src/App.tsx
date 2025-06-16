import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { LoadingProvider } from "./contexts/LoadingContext";

export const App = () => {
  return (
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
  );
};