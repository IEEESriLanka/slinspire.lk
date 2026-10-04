import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Users,
  MapPin,
  GraduationCap,
  Sparkles,
  BookOpen,
  Compass,
  MessageCircle,
  School,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface StudentStage {
  id: "ol" | "al" | "afterSchool";
  title: string;
  badge: string;
  description: string;
  recommendedTool: string;
  toolUrl: string;
  toolAction: string;
}

export const HeroSection = () => {
  const [selectedStage, setSelectedStage] = useState<"ol" | "al" | "afterSchool">("ol");

  const stages: StudentStage[] = [
    {
      id: "ol",
      title: "Grade 9, 10 & 11 (O/L)",
      badge: "Choosing Your Stream",
      description: "Unsure which A/L stream to pick? Explore Physical Science, Bio, Tech, Commerce, Arts, and vocational paths tailored for Sri Lankan students.",
      recommendedTool: "Career Compass Book",
      toolUrl: `${import.meta.env.BASE_URL}#/career-compass-book`,
      toolAction: "Read Compass Book",
    },
    {
      id: "al",
      title: "A/Levels & Pre-University",
      badge: "University & Degree Finder",
      description: "Find matching degree programs in Sri Lankan State and Private universities based on your A/L stream, subject combination, and Z-scores.",
      recommendedTool: "Degree Pathway Explorer",
      toolUrl: `${import.meta.env.BASE_URL}#/career-compass-web`,
      toolAction: "Search Degree Database",
    },
    {
      id: "afterSchool",
      title: "After-School & Vocational",
      badge: "Careers & Industry Skills",
      description: "Explore 200+ local & international job roles, NVQ certifications, software & engineering tracks, and emerging industry demands.",
      recommendedTool: "Career Explorer",
      toolUrl: `${import.meta.env.BASE_URL}#/career-explorer`,
      toolAction: "Explore Career Paths",
    },
  ];

  const currentStage = stages.find((s) => s.id === selectedStage) || stages[0];

  const stats = [
    {
      icon: <MapPin className="w-5 h-5 text-purple-300" />,
      value: "9 / 9",
      label: "Provinces Covered",
      sublabel: "Across Sri Lanka",
    },
    {
      icon: <School className="w-5 h-5 text-indigo-300" />,
      value: "60+",
      label: "Provincial Seminars",
      sublabel: "At state universities",
    },
    {
      icon: <Users className="w-5 h-5 text-pink-300" />,
      value: "3,000+",
      label: "Students Mentored",
      sublabel: "O/L & A/L participants",
    },
    {
      icon: <GraduationCap className="w-5 h-5 text-violet-300" />,
      value: "15+",
      label: "University Partners",
      sublabel: "Academic network",
    },
  ];

  const scrollToServices = () => {
    const el = document.getElementById("services");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center min-h-screen pt-28 pb-16 overflow-hidden bg-gradient-to-br from-purple-950 via-indigo-950 to-purple-900"
    >
      {/* Background Image Texture */}
      <div
        className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}hero_bg.jpeg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Atmospheric ambient glowing orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-indigo-500/25 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10 px-4 mx-auto text-center max-w-6xl">
        {/* Top Organization Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 px-4 py-2 mb-6 transition-all duration-300 border rounded-full shadow-lg backdrop-blur-md border-white/20 bg-white/10 hover:bg-white/15"
        >
          <img
            src={`${import.meta.env.BASE_URL}ypsl-logo-white.png`}
            alt="IEEE Young Professionals Sri Lanka"
            className="w-auto h-6 md:h-7 drop-shadow"
          />
          <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-purple-300" />
          <span className="text-xs sm:text-sm font-medium tracking-wide text-purple-100">
            IEEE YP National Project
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Discover Your Path.{" "}
          <span className="text-transparent bg-gradient-to-r from-purple-300 via-pink-200 to-indigo-300 bg-clip-text">
            Shape Your Future.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-8 text-base sm:text-lg md:text-xl font-normal leading-relaxed text-purple-100/90"
        >
          Free, unbiased career guidance and degree pathway planning designed for{" "}
          <span className="font-semibold text-white">Sri Lankan students</span>{" "}
          in Grades 9–11, A/Levels, and after-school leavers across all 9 provinces.
        </motion.p>

        {/* Student Quick-Stage Selector */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-3xl mx-auto mb-10 p-2 sm:p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 p-1.5 mb-3 bg-black/20 rounded-xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-200 sm:pl-3">
              Where are you right now?
            </span>
            <div className="grid grid-cols-3 w-full sm:w-auto gap-1.5">
              {stages.map((stage) => {
                const isActive = selectedStage === stage.id;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => setSelectedStage(stage.id)}
                    className={`px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 ${isActive
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-900/50 scale-[1.02]"
                      : "text-purple-200 hover:text-white hover:bg-white/10"
                      }`}
                  >
                    {stage.id === "ol" && "🎒 O/Level"}
                    {stage.id === "al" && "🎓 A/Level"}
                    {stage.id === "afterSchool" && "🚀 After School"}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Dynamic Recommendation Box */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStage.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="p-4 sm:p-5 rounded-xl bg-purple-950/60 border border-purple-400/20 text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="inline-block px-2.5 py-0.5 text-xs font-medium text-purple-200 bg-purple-800/80 rounded-full border border-purple-500/30">
                    {currentStage.badge}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    {currentStage.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed max-w-xl">
                  {currentStage.description}
                </p>
              </div>

              <Button
                asChild
                size="sm"
                className="w-full sm:w-auto shrink-0 bg-white text-purple-950 hover:bg-purple-100 font-semibold shadow-md transition-transform hover:scale-105"
              >
                <a href={currentStage.toolUrl}>
                  {currentStage.toolAction}
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </a>
              </Button>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Primary CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
        >
          <Button
            size="lg"
            onClick={scrollToServices}
            className="w-full sm:w-auto px-8 py-6 text-base font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-full shadow-xl shadow-purple-900/40 hover:shadow-purple-600/50 hover:scale-[1.02] transition-all"
          >
            Explore All Guidance Tools
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto px-8 py-6 text-base font-semibold text-purple-100 border-purple-300/40 bg-white/10 hover:bg-white/20 hover:text-white rounded-full backdrop-blur-sm transition-all"
          >
            <a href={`${import.meta.env.BASE_URL}#/career-compass-book`}>
              <BookOpen className="w-5 h-5 mr-2" />
              Download Career Book (PDF)
            </a>
          </Button>
        </motion.div>

        {/* WhatsApp Community Direct Pill */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-14"
        >
          <a
            href="https://whatsapp.com/channel/0029VaXotgDHVvTh8UzRml32"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-1.5 text-xs sm:text-sm font-medium text-purple-200 hover:text-white bg-white/5 hover:bg-white/10 rounded-full border border-purple-400/20 backdrop-blur-sm transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-green-400" />
            <span>Join Official WhatsApp Channel</span>
            <ChevronRight className="w-3.5 h-3.5 text-purple-300" />
          </a>
        </motion.div>

        {/* 4-Item Impact Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -3 }}
              className="p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-left flex flex-col justify-between transition-all shadow-lg hover:border-purple-300/40"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 rounded-lg bg-white/10">{stat.icon}</div>
                <span className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  {stat.value}
                </span>
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-purple-100">
                  {stat.label}
                </h4>
                <p className="text-[11px] sm:text-xs text-purple-200/70">
                  {stat.sublabel}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
