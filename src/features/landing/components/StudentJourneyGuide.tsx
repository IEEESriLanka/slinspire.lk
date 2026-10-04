import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Compass,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Award,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface JourneyStep {
  step: number;
  id: string;
  stageName: string;
  audience: string;
  title: string;
  tagline: string;
  icon: React.ReactNode;
  dilemmas: string[];
  recommendedToolName: string;
  toolUrl: string;
  toolAction: string;
  accentColor: string;
  badgeBg: string;
}

export const StudentJourneyGuide: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps: JourneyStep[] = [
    {
      step: 1,
      id: "ol",
      stageName: "Step 1: O/Level Discovery",
      audience: "Grades 9, 10 & 11",
      title: "Select Your A/L Stream & Explore Subject Combinations",
      tagline: "Don't pick subjects based on peer pressure — choose what fits your natural skills and career dreams.",
      icon: <BookOpen className="w-6 h-6 text-purple-600" />,
      dilemmas: [
        "Difference between Physical Science, Bio, Tech (ET/BST), Commerce & Arts",
        "Understanding which A/L stream opens which university faculties later",
        "Alternative vocational & NVQ Level 3/4 diplomas if not doing traditional A/Ls",
        "Tips for managing O/L exam preparation alongside future planning",
      ],
      recommendedToolName: "Career Compass Book",
      toolUrl: `${import.meta.env.BASE_URL}#/career-compass-book`,
      toolAction: "Open Career Compass Book",
      accentColor: "from-purple-600 to-indigo-600",
      badgeBg: "bg-purple-100 text-purple-800 border-purple-200",
    },
    {
      step: 2,
      id: "al",
      stageName: "Step 2: A/L & University",
      audience: "Grade 12, 13 & Pre-University",
      title: "Match Your A/L Stream to State & Private University Degrees",
      tagline: "Simplify the UGC handbook. Find every degree you are eligible for based on your subject stream & Z-score.",
      icon: <Compass className="w-6 h-6 text-indigo-600" />,
      dilemmas: [
        "State university courses (Engineering, Medicine, Computing, Management, Arts, Tech)",
        "Minimum qualification criteria, subject basket rules, and past Z-scores",
        "Affordable external degrees and accredited private higher education institutes",
        "Higher National Diplomas (HNDs) from SLIATE, German Tech, and technical colleges",
      ],
      recommendedToolName: "Degree Pathway Explorer",
      toolUrl: `${import.meta.env.BASE_URL}#/career-compass-web`,
      toolAction: "Explore Degree Finder",
      accentColor: "from-indigo-600 to-violet-600",
      badgeBg: "bg-indigo-100 text-indigo-800 border-indigo-200",
    },
    {
      step: 3,
      id: "career",
      stageName: "Step 3: Industry & Careers",
      audience: "School Leavers & Job Seekers",
      title: "Navigate 200+ Career Roles & Real-World Skills in Demand",
      tagline: "Understand what employers actually look for — explore job roles, salary outlooks, and skills roadmaps.",
      icon: <Briefcase className="w-6 h-6 text-pink-600" />,
      dilemmas: [
        "Emerging fields in Software, AI, Mechatronics, Green Energy, Biotech & Finance",
        "Practical technical skills vs certifications (NVQ Level 4-7, IEEE, Cisco, AWS)",
        "Local industry vacancies vs remote and international career pathways",
        "How to transition from a student into a skilled young professional",
      ],
      recommendedToolName: "Career Explorer",
      toolUrl: `${import.meta.env.BASE_URL}#/career-explorer`,
      toolAction: "Open Career Explorer",
      accentColor: "from-pink-600 to-purple-600",
      badgeBg: "bg-pink-100 text-pink-800 border-pink-200",
    },
  ];

  const currentStep = steps.find((s) => s.step === activeStep) || steps[0];

  return (
    <section id="student-journey" className="py-20 bg-gradient-to-b from-white via-purple-50/40 to-white">
      <div className="container px-4 mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-3 text-xs font-semibold text-purple-700 bg-purple-100/80 rounded-full border border-purple-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Student Roadmap</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            How to Navigate Your Future in <span className="text-purple-600">3 Clear Steps</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-600 leading-relaxed">
            Whether you are sitting for O/Ls next month or waiting for university admission letters, here is the proven pathway Sri Lanka Inspire guides you through.
          </p>
        </div>

        {/* Step Navigation Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10">
          {steps.map((s) => {
            const isActive = activeStep === s.step;
            return (
              <button
                key={s.step}
                type="button"
                onClick={() => setActiveStep(s.step)}
                className={`relative p-5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between ${isActive
                  ? "bg-white shadow-xl border-purple-300 ring-2 ring-purple-500/20 scale-[1.02]"
                  : "bg-white/70 hover:bg-white border-gray-200/80 hover:border-purple-200 shadow-sm"
                  }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full border ${s.badgeBg}`}
                  >
                    {s.audience}
                  </span>
                  <div
                    className={`p-2 rounded-xl ${isActive ? "bg-purple-100" : "bg-gray-100"
                      }`}
                  >
                    {s.icon}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-purple-600 mb-1">
                    {s.stageName}
                  </h3>
                  <h4 className="text-base font-bold text-gray-900 line-clamp-1">
                    {s.title}
                  </h4>
                </div>

                {isActive && (
                  <motion.div
                    layoutId="active-indicator"
                    className="absolute bottom-0 left-6 right-6 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-t-full"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Detailed Step Content Box */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.step}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="p-6 sm:p-10 rounded-3xl bg-white border border-purple-100 shadow-2xl relative overflow-hidden"
          >
            {/* Top decorative gradient glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-purple-100/60 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left Column: Details & Dilemmas */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 text-xs font-semibold rounded-full border bg-purple-50 text-purple-700 border-purple-200">
                    <span>{currentStep.stageName}</span>
                    <span>•</span>
                    <span>{currentStep.audience}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
                    {currentStep.title}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed">
                    {currentStep.tagline}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Key Decisions & Questions We Solve:
                  </h4>
                  <ul className="space-y-2.5">
                    {currentStep.dilemmas.map((dilemma, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-700">
                        <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                        <span>{dilemma}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Recommended Tool Action Card */}
              <div className="lg:col-span-5">
                <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 text-white shadow-xl flex flex-col justify-between">
                  <div className="mb-6">
                    <span className="text-xs uppercase tracking-wider font-semibold text-purple-200">
                      Recommended Tool for This Step
                    </span>
                    <h4 className="text-2xl font-bold text-white mt-1">
                      {currentStep.recommendedToolName}
                    </h4>
                    <p className="text-xs text-purple-200/80 mt-2">
                      Designed by IEEE Young Professionals to provide official, accurate, and completely free guidance.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Button
                      asChild
                      size="lg"
                      className="w-full bg-white text-purple-900 hover:bg-purple-100 font-bold shadow-md hover:scale-[1.02] transition-all"
                    >
                      <a href={currentStep.toolUrl}>
                        {currentStep.toolAction}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    </Button>

                    <p className="text-[11px] text-center text-purple-200/70">
                      100% Free • Open Access • Mobile Friendly
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
