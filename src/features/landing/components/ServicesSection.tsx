import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  ArrowRight,
  BookOpen,
  Compass,
  Video,
  Briefcase,
  CheckCircle2,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type AudienceFilter = "all" | "ol" | "al" | "career";

interface ServiceItem {
  id: number;
  title: string;
  category: "ol" | "al" | "career" | "all";
  audienceBadge: string;
  description: string;
  keyPoints: string[];
  icon: React.ReactNode;
  btnName: string;
  actionURL: string;
  image: string;
  gradient: string;
  accentBorder: string;
}

export const ServicesSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
  });

  const [activeFilter, setActiveFilter] = useState<AudienceFilter>("all");

  const services: ServiceItem[] = [
    {
      id: 1,
      title: "Degree Pathway Explorer",
      category: "al",
      audienceBadge: "For A/L & Pre-University",
      description:
        "Comprehensive degree selection database matching your A/L stream, subject combination, and qualifications to real Sri Lankan university programs.",
      keyPoints: [
        "100+ State & approved Private university degree programs",
        "Stream & subject basket eligibility guidelines simplified",
        "Direct link between high school streams and university faculties",
      ],
      icon: <Compass className="w-6 h-6" />,
      btnName: "Search Degree Database",
      actionURL: `${import.meta.env.BASE_URL}#/career-compass-web`,
      image: "service_bg/database1_service_bg.png",
      gradient: "from-purple-600 to-indigo-700",
      accentBorder: "hover:border-purple-400",
    },
    {
      id: 2,
      title: "Career Compass Book",
      category: "ol",
      audienceBadge: "Essential for Grades 9, 10, 11 & A/L",
      description:
        "The official, definitive career handbook covering school subject streams, higher educational pathways, and vocational qualifications across Sri Lanka.",
      keyPoints: [
        "In-depth guide for choosing the right A/L stream after O/Ls",
        "Directory of state universities, NVQ diplomas, and institutes",
        "100% Free downloadable PDF and digital web reader",
      ],
      icon: <BookOpen className="w-6 h-6" />,
      btnName: "Read Compass Book",
      actionURL: `${import.meta.env.BASE_URL}#/career-compass-book`,
      image: "service_bg/book_service_bg.png",
      gradient: "from-indigo-600 to-purple-700",
      accentBorder: "hover:border-indigo-400",
    },
    {
      id: 3,
      title: "Career Explorer",
      category: "career",
      audienceBadge: "For School Leavers & Careers",
      description:
        "Explore 200+ modern job roles, skills in demand, and local/global career routes across Technology, Engineering, Business, and Science.",
      keyPoints: [
        "Breakdown of job roles by industry sub-field and specialization",
        "Skills roadmap: What modern companies and startups require",
        "Local industry outlook vs foreign employment opportunities",
      ],
      icon: <Briefcase className="w-6 h-6" />,
      btnName: "Explore Career Roles",
      actionURL: `${import.meta.env.BASE_URL}#/career-explorer`,
      image: "service_bg/career_service_bg.png",
      gradient: "from-purple-700 to-pink-600",
      accentBorder: "hover:border-pink-400",
    },
    {
      id: 4,
      title: "Session Recordings & Video Hub",
      category: "all",
      audienceBadge: "For All Students & Parents",
      description:
        "A categorized collection of recorded seminars, expert speeches, and student guidance workshops conducted by the Sri Lanka Inspire team.",
      keyPoints: [
        "Physical seminar sessions delivered at state universities",
        "Insights from university graduates, engineers, and mentors",
        "Accessible online anytime on YouTube with categorized topics",
      ],
      icon: <Video className="w-6 h-6" />,
      btnName: "Watch Past Recordings",
      actionURL: `${import.meta.env.BASE_URL}#/session-recordings`,
      image: "service_bg/recording_service_bg.png",
      gradient: "from-violet-600 to-indigo-800",
      accentBorder: "hover:border-violet-400",
    },
  ];

  const filterTabs: { id: AudienceFilter; label: string }[] = [
    { id: "all", label: "All Tools & Resources" },
    { id: "ol", label: "🎒 Grade 9–11 (O/L)" },
    { id: "al", label: "🎓 A/L & University" },
    { id: "career", label: "🚀 Careers & Skills" },
  ];

  const filteredServices = services.filter((service) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "ol") return service.category === "ol" || service.category === "all";
    if (activeFilter === "al") return service.category === "al" || service.category === "all";
    if (activeFilter === "career") return service.category === "career" || service.category === "all";
    return true;
  });

  return (
    <section id="services" className="py-24 bg-white">
      <div className="container px-4 mx-auto max-w-7xl">
        {/* Section Heading */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-3 text-xs font-semibold text-purple-700 bg-purple-100/70 rounded-full border border-purple-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Guidance Tools</span>
          </div>
          <h2 className="mb-4 text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Our Core <span className="text-purple-600">Guidance Tools</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Free, student-tested platforms to help you choose the right school stream, pick your ideal university degree, and launch your dream career.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-14">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all duration-200 ${isActive
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/30 scale-105"
                  : "bg-purple-50 text-purple-700 hover:bg-purple-100 hover:text-purple-900 border border-purple-100"
                  }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Balanced 2x2 Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card
                  className={`h-full flex flex-col overflow-hidden bg-white border border-gray-200/90 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 group ${service.accentBorder}`}
                >
                  {/* Card Visual Header */}
                  <div className="relative h-56 overflow-hidden bg-purple-950">
                    <img
                      src={`${import.meta.env.BASE_URL}${service.image}`}
                      alt={service.title}
                      loading="lazy"
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110 opacity-85"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />

                    {/* Top Audience Pill */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-xs font-semibold text-white bg-black/60 backdrop-blur-md rounded-full border border-white/20 shadow">
                        {service.audienceBadge}
                      </span>
                    </div>

                    {/* Icon Pill */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-3">
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-br ${service.gradient} text-white shadow-lg`}
                      >
                        {service.icon}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white drop-shadow-md">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <CardContent className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                    <div className="space-y-4 mb-6">
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        {service.description}
                      </p>

                      <div className="pt-2 border-t border-gray-100">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 block mb-2">
                          What You Get:
                        </span>
                        <ul className="space-y-2">
                          {service.keyPoints.map((point, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-xs sm:text-sm text-gray-700"
                            >
                              <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <Button
                        asChild
                        className={`w-full py-5 text-sm sm:text-base font-semibold text-white bg-gradient-to-r ${service.gradient} hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 rounded-xl group/btn`}
                      >
                        <a href={service.actionURL}>
                          {service.btnName}
                          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};