import React, { useState } from "react";
import { BookOpen, University, GraduationCap, ChevronRight } from "lucide-react";
import { DegreeRecord } from "../types";
import { streamLabels } from "../services/degreeService";

export interface DegreeCardProps {
  degree: DegreeRecord;
  onSelect: (degree: DegreeRecord) => void;
}

export const DegreeCard: React.FC<DegreeCardProps> = ({ degree, onSelect }) => {
  const [logoError, setLogoError] = useState(false);
  const uniLogoSrc = `${import.meta.env.BASE_URL}images/uni/logos/${degree.uniId.toLowerCase()}.png`;

  // Filter streams that are eligible for this degree
  const eligibleStreams = (
    Object.keys(streamLabels) as Array<keyof DegreeRecord["stream"]>
  ).filter((key) => degree.stream[key]);

  const getStreamBadgeColor = (key: string) => {
    switch (key) {
      case "physics":
        return "bg-sky-50 text-sky-700 border-sky-200";
      case "bio":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "commerce":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "art":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "tech":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(degree)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(degree);
        }
      }}
      className="group relative flex flex-col justify-between h-full bg-white rounded-2xl border border-purple-100 hover:border-purple-300 shadow-sm hover:shadow-xl transition-all duration-300 p-5 cursor-pointer overflow-hidden focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
    >
      {/* Background Decorative Gradient Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-100/40 via-transparent to-transparent pointer-events-none rounded-tr-2xl" />

      <div>
        {/* Top Header: Uni Logo & Name */}
        <div className="flex items-start gap-3.5 mb-3">
          <div className="w-12 h-12 rounded-xl bg-purple-50/80 border border-purple-100 flex items-center justify-center p-1.5 shrink-0 group-hover:scale-105 transition-transform duration-300 overflow-hidden shadow-inner">
            {logoError ? (
              <University className="w-6 h-6 text-purple-600" />
            ) : (
              <img
                src={uniLogoSrc}
                alt={degree.universityName}
                loading="lazy"
                className="w-full h-full object-contain"
                onError={() => setLogoError(true)}
              />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <span className="text-[11px] font-bold tracking-wider text-purple-700 uppercase line-clamp-1">
              {degree.universityName}
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              {degree.ugcCode && (
                <span className="inline-block text-[10px] font-semibold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">
                  UGC: {degree.ugcCode}
                </span>
              )}
              {degree.qualificationLevel && (
                <span className="text-[10px] text-gray-500 line-clamp-1">
                  {degree.qualificationLevel}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Course Title */}
        <h3 className="text-base font-bold text-gray-900 group-hover:text-purple-700 transition-colors line-clamp-2 leading-snug mb-2">
          {degree.courseName}
        </h3>

        {/* Major & Sub Field */}
        <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-3.5">
          <BookOpen className="w-3.5 h-3.5 text-purple-600 shrink-0" />
          <span className="line-clamp-1 font-medium">
            {degree.majorField}
            {degree.subField && (
              <span className="text-gray-400 font-normal"> • {degree.subField}</span>
            )}
          </span>
        </div>

        {/* Eligible A/L Streams */}
        {eligibleStreams.length > 0 && (
          <div className="mb-4">
            <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Eligible A/L Streams:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {eligibleStreams.map((key) => (
                <span
                  key={key}
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border shadow-2xs ${getStreamBadgeColor(
                    key
                  )}`}
                >
                  {streamLabels[key]}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Badges & Action */}
      <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2 mt-auto">
        <div className="flex flex-wrap items-center gap-1.5">
          {/* Tuition Status */}
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${degree.isPaid
              ? "bg-indigo-50 text-indigo-700 border-indigo-200"
              : "bg-emerald-50 text-emerald-700 border-emerald-200"
              }`}
          >
            {degree.isPaid ? "Paid / Private" : "Free / State"}
          </span>

          {/* Course Type */}
          {degree.courseType && (
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${degree.courseType === "INTERNAL"
                ? "bg-purple-50 text-purple-700 border-purple-200"
                : "bg-sky-50 text-sky-700 border-sky-200"
                }`}
            >
              {degree.courseType}
            </span>
          )}

          {/* Mode */}
          {degree.courseMode && (
            <span className="text-[10px] font-medium text-gray-600 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-md">
              {degree.courseMode}
            </span>
          )}
        </div>

        {/* Interactive View Prompt */}
        <span className="inline-flex items-center text-xs font-semibold text-purple-600 group-hover:text-purple-800 transition-colors shrink-0">
          <span className="hidden sm:inline">Details</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </div>
  );
};

export default DegreeCard;
