import React, { useState } from "react";
import {
  Search,
  School,
  SlidersHorizontal,
  RotateCcw,
  ChevronDown,
  X,
  BookOpen,
  Layers,
  GraduationCap,
  Clock,
  Coins,
  Sparkles,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DegreeFilters } from "../types";

export interface DegreeTableFiltersProps {
  filters: DegreeFilters;
  onChange: (filters: DegreeFilters) => void;
  universityOptions: string[];
  majorFieldOptions: string[];
  subFieldOptions: string[];
  typeOptions: string[];
  isPaidOptions: string[];
  courseModeOptions: string[];
  qualificationLevelOptions: string[];
  streamOptions: string[];
  totalResults?: number;
  totalMasterCount?: number;
}

type FilterKey = keyof DegreeFilters;

export const DegreeTableFilters: React.FC<DegreeTableFiltersProps> = ({
  filters,
  onChange,
  universityOptions,
  majorFieldOptions,
  subFieldOptions,
  typeOptions,
  isPaidOptions,
  courseModeOptions,
  qualificationLevelOptions,
  streamOptions,
  totalResults,
  totalMasterCount,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Active filters list for display tags
  const activeFilters = [
    { key: "stream" as FilterKey, label: "Stream", value: filters.stream },
    { key: "university" as FilterKey, label: "University", value: filters.university },
    { key: "course" as FilterKey, label: "Search", value: filters.course },
    { key: "isPaid" as FilterKey, label: "Tuition", value: filters.isPaid },
    { key: "majorField" as FilterKey, label: "Major", value: filters.majorField },
    { key: "subField" as FilterKey, label: "Sub-field", value: filters.subField },
    { key: "type" as FilterKey, label: "Type", value: filters.type },
    { key: "courseMode" as FilterKey, label: "Mode", value: filters.courseMode },
    { key: "qualificationLevel" as FilterKey, label: "Level", value: filters.qualificationLevel },
  ].filter((item) => item.value && item.value.trim() !== "");

  const filterCount = activeFilters.length;

  const clearAll = () => {
    onChange({
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
  };

  const clearSingle = (key: FilterKey) => {
    onChange({ ...filters, [key]: "" });
  };

  return (
    <div className="mb-8 space-y-4">
      {/* Main Filter Container */}
      <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-purple-100 shadow-md p-4 sm:p-6 transition-all duration-300 hover:shadow-lg">
        {/* Top Action Row: Title, Advanced Toggle & Reset */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-purple-100/70">
          <div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-purple-600" />
              <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
                Filter Degree Programs
              </h2>
              {filterCount > 0 && (
                <span className="px-2 py-0.5 text-xs font-bold text-white bg-purple-600 rounded-full shadow-xs">
                  {filterCount} active
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Refine by A/L stream, university, discipline, or course mode.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowAdvanced((prev) => !prev)}
              className={`gap-1.5 text-xs font-semibold rounded-xl border transition-all ${showAdvanced
                ? "bg-purple-100/80 text-purple-800 border-purple-300"
                : "bg-purple-50/50 text-purple-700 border-purple-200 hover:bg-purple-100"
                }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{showAdvanced ? "Hide Advanced" : "More Filters"}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${showAdvanced ? "rotate-180" : ""
                  }`}
              />
            </Button>

            {filterCount > 0 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearAll}
                className="gap-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 hover:text-rose-700 rounded-xl"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </Button>
            )}
          </div>
        </div>

        {/* Primary Controls Row: Search + Quick Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Global Search Input */}
          <div className="md:col-span-5 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
            <input
              type="text"
              value={filters.course}
              onChange={(e) => onChange({ ...filters, course: e.target.value })}
              placeholder="Search by degree title, major, UGC code..."
              className="w-full pl-9 pr-8 py-2.5 text-xs sm:text-sm bg-purple-50/40 border border-purple-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition"
            />
            {filters.course && (
              <button
                type="button"
                onClick={() => clearSingle("course")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 text-xs"
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* University / Institution Select */}
          <div className="md:col-span-4 relative">
            <select
              value={filters.university}
              onChange={(e) => onChange({ ...filters, university: e.target.value })}
              className="w-full pl-3 pr-8 py-2.5 text-xs sm:text-sm bg-purple-50/40 border border-purple-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition cursor-pointer appearance-none truncate"
            >
              <option value="">All Universities & Institutions</option>
              {universityOptions.map((uni) => (
                <option key={uni} value={uni}>
                  {uni}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Tuition Status Select */}
          <div className="md:col-span-3 relative">
            <select
              value={filters.isPaid}
              onChange={(e) => onChange({ ...filters, isPaid: e.target.value })}
              className="w-full pl-3 pr-8 py-2.5 text-xs sm:text-sm bg-purple-50/40 border border-purple-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition cursor-pointer appearance-none"
            >
              <option value="">All Tuition Types</option>
              <option value="Free">Free / State Funded</option>
              <option value="Paid">Paid / Private Course</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Collapsible Advanced Filters Drawer */}
        {showAdvanced && (
          <div className="mt-4 pt-4 border-t border-dashed border-purple-200/80 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
              {/* Major Field Select */}
              <div className="relative">
                <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                  Major Discipline
                </label>
                <select
                  value={filters.majorField}
                  onChange={(e) => onChange({ ...filters, majorField: e.target.value })}
                  className="w-full pl-3 pr-8 py-2 text-xs bg-purple-50/40 border border-purple-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition cursor-pointer appearance-none truncate"
                >
                  <option value="">All Major Disciplines</option>
                  {majorFieldOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 bottom-2.5 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
              </div>

              {/* Sub Field Select */}
              <div className="relative">
                <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                  Sub-Discipline
                </label>
                <select
                  value={filters.subField}
                  onChange={(e) => onChange({ ...filters, subField: e.target.value })}
                  className="w-full pl-3 pr-8 py-2 text-xs bg-purple-50/40 border border-purple-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition cursor-pointer appearance-none truncate"
                >
                  <option value="">All Sub-Disciplines</option>
                  {subFieldOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 bottom-2.5 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
              </div>

              {/* Course Type Select */}
              <div className="relative">
                <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                  Degree Type
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => onChange({ ...filters, type: e.target.value })}
                  className="w-full pl-3 pr-8 py-2 text-xs bg-purple-50/40 border border-purple-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition cursor-pointer appearance-none"
                >
                  <option value="">All Types</option>
                  {typeOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 bottom-2.5 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
              </div>

              {/* Course Mode Select */}
              <div className="relative">
                <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                  Study Mode
                </label>
                <select
                  value={filters.courseMode}
                  onChange={(e) => onChange({ ...filters, courseMode: e.target.value })}
                  className="w-full pl-3 pr-8 py-2 text-xs bg-purple-50/40 border border-purple-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition cursor-pointer appearance-none"
                >
                  <option value="">All Modes</option>
                  {courseModeOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 bottom-2.5 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
              </div>

              {/* Qualification Level Select */}
              <div className="relative">
                <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                  Qualification Level
                </label>
                <select
                  value={filters.qualificationLevel}
                  onChange={(e) => onChange({ ...filters, qualificationLevel: e.target.value })}
                  className="w-full pl-3 pr-8 py-2 text-xs bg-purple-50/40 border border-purple-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition cursor-pointer appearance-none truncate"
                >
                  <option value="">All Levels</option>
                  {qualificationLevelOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 bottom-2.5 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Active Filter Badges Strip */}
      {filterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-800 mr-1">
            Active:
          </span>
          {activeFilters.map((item) => (
            <span
              key={item.key}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-purple-700 bg-purple-100 rounded-full border border-purple-200 shadow-2xs"
            >
              <span className="font-normal text-purple-500">{item.label}:</span>
              <span>{item.value}</span>
              <button
                type="button"
                onClick={() => clearSingle(item.key)}
                className="hover:text-purple-900 focus:outline-none"
                aria-label={`Remove filter ${item.label}`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          <button
            type="button"
            onClick={clearAll}
            className="text-xs font-bold text-purple-600 hover:text-purple-800 underline ml-2"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export const DegreeTableFiltersOld = DegreeTableFilters;
export default DegreeTableFilters;