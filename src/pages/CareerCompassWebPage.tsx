import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Compass,
  GraduationCap,
  School,
  BookOpen,
  Atom,
  Dna,
  TrendingUp,
  Palette,
  Cpu,
  Layers,
  Sparkles,
  Award,
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { DegreeTableFilters } from "@/features/degree-compass/components/DegreeTableFilters";
import DegreeCardGrid from "@/features/degree-compass/components/DegreeCardGrid";
import {
  DegreeFilters,
  DegreeFilterOptions,
} from "@/features/degree-compass/types";

interface StreamPill {
  id: string;
  name: string;
  shortName: string;
  icon: React.ReactNode;
  color: string;
  activeColor: string;
}

const STREAM_PILLS: StreamPill[] = [
  {
    id: "",
    name: "All Streams",
    shortName: "All Streams",
    icon: <Layers className="w-4 h-4" />,
    color: "bg-white text-gray-700 border-gray-200 hover:bg-purple-50 hover:text-purple-700",
    activeColor: "bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-600/25",
  },
  {
    id: "physics",
    name: "Physical Science (Maths)",
    shortName: "Physical Science",
    icon: <Atom className="w-4 h-4" />,
    color: "bg-white text-gray-700 border-gray-200 hover:bg-sky-50 hover:text-sky-700",
    activeColor: "bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-600/25",
  },
  {
    id: "bio",
    name: "Biological Science",
    shortName: "Biological Science",
    icon: <Dna className="w-4 h-4" />,
    color: "bg-white text-gray-700 border-gray-200 hover:bg-emerald-50 hover:text-emerald-700",
    activeColor: "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/25",
  },
  {
    id: "commerce",
    name: "Commerce",
    shortName: "Commerce",
    icon: <TrendingUp className="w-4 h-4" />,
    color: "bg-white text-gray-700 border-gray-200 hover:bg-amber-50 hover:text-amber-700",
    activeColor: "bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-600/25",
  },
  {
    id: "art",
    name: "Arts & Humanities",
    shortName: "Arts",
    icon: <Palette className="w-4 h-4" />,
    color: "bg-white text-gray-700 border-gray-200 hover:bg-rose-50 hover:text-rose-700",
    activeColor: "bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-600/25",
  },
  {
    id: "tech",
    name: "Technology",
    shortName: "Technology",
    icon: <Cpu className="w-4 h-4" />,
    color: "bg-white text-gray-700 border-gray-200 hover:bg-indigo-50 hover:text-indigo-700",
    activeColor: "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/25",
  },
];

export const CareerCompassWebPage = () => {
  const [filters, setFilters] = useState<DegreeFilters>({
    university: "",
    course: "",
    majorField: "",
    subField: "",
    type: "",
    isPaid: "",
    courseMode: "",
    qualificationLevel: "",
    stream: "",
  });

  const [filterOptions, setFilterOptions] = useState<DegreeFilterOptions>({
    universities: [],
    majorFields: [],
    subFields: [],
    types: [],
    paymentStatuses: [],
    courseModes: [],
    qualificationLevels: [],
    streams: [],
  });

  const handleStreamSelect = (streamId: string) => {
    setFilters((prev) => ({
      ...prev,
      stream: streamId,
    }));
  };

  return (
    <PageLayout>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="relative text-center max-w-4xl mx-auto pt-6 pb-2">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-4 text-xs font-bold text-purple-700 bg-purple-100 rounded-full border border-purple-200 shadow-2xs">
            <Compass className="w-4 h-4 text-purple-600 animate-spin-slow" />
            <span>Sri Lankan Higher Education & Degree Pathway Explorer</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-4">
            Find Your Dream <span className="text-purple-600">Higher Education</span> Degree Pathway
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6">
            An IEEE Sri Lanka Inspire educational guide mapping 1,000+ undergraduate degree programs across Sri Lanka—spanning State Universities, UGC-recognized Private Higher Education Institutions, and Foreign Affiliated Degrees. Filter by your G.C.E. A/L stream, university, and course mode to plan your future.
          </p>

          {/* Impact Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mb-8">
            <div className="bg-white/80 backdrop-blur-sm p-3.5 rounded-2xl border border-purple-100 shadow-xs">
              <span className="block text-xl sm:text-2xl font-black text-purple-700">1,000+</span>
              <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">
                Degree Programs
              </span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-3.5 rounded-2xl border border-purple-100 shadow-xs">
              <span className="block text-xl sm:text-2xl font-black text-indigo-700">50+</span>
              <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">
                Universities & Institutes
              </span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-3.5 rounded-2xl border border-purple-100 shadow-xs">
              <span className="block text-xl sm:text-2xl font-black text-emerald-700">5</span>
              <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">
                G.C.E. A/L Streams
              </span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-3.5 rounded-2xl border border-purple-100 shadow-xs">
              <span className="block text-xl sm:text-2xl font-black text-rose-700">Free & Paid</span>
              <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">
                Pathways Available
              </span>
            </div>
          </div>

          {/* Interactive G.C.E. A/L Stream Quick-Filter Strip */}
          <div className="bg-white/90 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-purple-100 shadow-md">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-900 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-purple-600" />
                <span>Select Your G.C.E. A/L Subject Stream:</span>
              </span>
              <span className="text-xs text-gray-500 font-medium hidden sm:inline">
                Click any stream to filter degrees instantly
              </span>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {STREAM_PILLS.map((pill) => {
                const isActive =
                  filters.stream === pill.id ||
                  (pill.id === "physics" && filters.stream.toLowerCase().includes("math"));

                return (
                  <button
                    key={pill.id}
                    type="button"
                    onClick={() => handleStreamSelect(pill.id)}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all duration-200 cursor-pointer ${isActive ? pill.activeColor : pill.color
                      }`}
                  >
                    {pill.icon}
                    <span>{pill.shortName}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Filter Bar Component */}
        <DegreeTableFilters
          filters={filters}
          onChange={setFilters}
          universityOptions={filterOptions.universities}
          majorFieldOptions={filterOptions.majorFields}
          subFieldOptions={filterOptions.subFields}
          typeOptions={filterOptions.types}
          isPaidOptions={filterOptions.paymentStatuses}
          courseModeOptions={filterOptions.courseModes}
          qualificationLevelOptions={filterOptions.qualificationLevels}
          streamOptions={filterOptions.streams}
        />

        {/* Main Degrees Card Grid & Pagination */}
        <DegreeCardGrid
          filters={filters}
          onFiltersChange={setFilters}
          onFilterOptions={setFilterOptions}
        />
      </div>
    </PageLayout>
  );
};

export default CareerCompassWebPage;