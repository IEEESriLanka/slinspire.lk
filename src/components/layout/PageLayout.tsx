import React, { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface PageLayoutProps {
  children: ReactNode;
  isMainPage?: boolean;
  container?: "default" | "constrained" | "none";
  className?: string;
  showFooter?: boolean;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  isMainPage = false,
  container = "default",
  className = "",
  showFooter = true,
}) => {
  let containerClasses = "";
  if (container === "default") {
    containerClasses = "max-w-7xl mx-auto px-4 py-24";
  } else if (container === "constrained") {
    containerClasses = "max-w-5xl mx-auto px-4 py-24";
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 flex flex-col">
      <Header isMainPage={isMainPage} />
      <main className={`flex-1 ${containerClasses} ${className}`.trim()}>
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};
