import React, { ReactNode, useState } from "react";
import {
  Award,
  BookOpen,
  Boxes,
  ExternalLink,
  GraduationCap,
  Hash,
  Layers,
  University,
  CheckCircle2,
  Clock,
  Coins,
} from "lucide-react";
import { DegreeRecord } from "../types";
import { streamLabels } from "../services/degreeService";

interface DetailRowProps {
  icon: ReactNode;
  label: string;
  value?: string;
  badge?: string;
}

function DetailRow({ icon, label, value, badge }: DetailRowProps) {
  if (!value && !badge) return null;
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-b-0">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600 border border-purple-100">
        {icon}
      </div>
      <div className="flex flex-col flex-1">
        <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
          {label}
        </span>
        <div className="flex items-center gap-2 mt-0.5">
          {value && <span className="text-sm font-semibold text-gray-900">{value}</span>}
          {badge && (
            <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200">
              {badge}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export interface DegreePopupProps {
  degree: DegreeRecord;
}

export const DegreePopup: React.FC<DegreePopupProps> = ({ degree }) => {
  const [logoError, setLogoError] = useState(false);
  const uniLogoSrc = `${import.meta.env.BASE_URL}images/uni/logos/${degree.uniId.toLowerCase()}.png`;

  const activeStreams = (
    Object.keys(streamLabels) as Array<keyof DegreeRecord["stream"]>
  ).filter((key) => degree.stream[key]);

  const getStreamColor = (key: string) => {
    switch (key) {
      case "physics":
        return "bg-sky-50 text-sky-800 border-sky-200";
      case "bio":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "commerce":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "art":
        return "bg-rose-50 text-rose-800 border-rose-200";
      case "tech":
        return "bg-purple-50 text-purple-800 border-purple-200";
      default:
        return "bg-gray-50 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="w-[min(92vw,560px)] max-h-[75vh] overflow-y-auto pr-1">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 via-indigo-50/50 to-purple-50 border border-purple-100 p-5 mb-5 shadow-xs">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-white border border-purple-200 shadow-sm flex items-center justify-center p-2 shrink-0">
            {logoError ? (
              <University className="w-7 h-7 text-purple-600" />
            ) : (
              <img
                src={uniLogoSrc}
                alt={degree.universityName}
                className="w-full h-full object-contain"
                onError={() => setLogoError(true)}
              />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <span className="text-xs font-bold tracking-wider text-purple-700 uppercase line-clamp-1">
              {degree.universityName}
            </span>
            <h3 className="text-lg font-extrabold text-gray-900 leading-tight mt-1 mb-1.5">
              {degree.courseName}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-gray-600 font-medium">
              <BookOpen className="w-3.5 h-3.5 text-purple-600 shrink-0" />
              <span>{degree.majorField}</span>
              {degree.subField && (
                <span className="text-gray-400 font-normal"> • {degree.subField}</span>
              )}
            </div>
          </div>
        </div>

        {/* Quick Attribute Badges */}
        <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-purple-100/80">
          <span
            className={`text-xs font-bold px-3 py-1 rounded-full border shadow-2xs ${degree.isPaid
              ? "bg-indigo-50 text-indigo-700 border-indigo-200"
              : "bg-emerald-50 text-emerald-700 border-emerald-200"
              }`}
          >
            {degree.isPaid ? "Paid / Private Course" : "Free State Degree"}
          </span>

          {degree.courseType && (
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 shadow-2xs">
              {degree.courseType === "INTERNAL" ? "Internal Degree" : degree.courseType}
            </span>
          )}

          {degree.courseMode && (
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-50 text-gray-700 border border-gray-200 shadow-2xs">
              {degree.courseMode}
            </span>
          )}
        </div>
      </div>

      {/* Program Details Table Card */}
      <div className="bg-white rounded-2xl border border-gray-200/90 px-4 py-1 mb-5 shadow-xs">
        {degree.ugcCode && (
          <DetailRow
            icon={<Hash className="w-4 h-4" />}
            label="UGC Admission Course Code"
            badge={degree.ugcCode}
          />
        )}
        <DetailRow
          icon={<BookOpen className="w-4 h-4" />}
          label="Academic Discipline (Major Field)"
          value={degree.majorField}
        />
        {degree.subField && (
          <DetailRow
            icon={<Layers className="w-4 h-4" />}
            label="Sub-Discipline / Specialization"
            value={degree.subField}
          />
        )}
        {degree.qualificationLevel && (
          <DetailRow
            icon={<Award className="w-4 h-4" />}
            label="Qualification Level"
            value={degree.qualificationLevel}
          />
        )}
        {degree.courseMode && (
          <DetailRow
            icon={<Clock className="w-4 h-4" />}
            label="Study Mode"
            value={degree.courseMode}
          />
        )}
        <DetailRow
          icon={<Coins className="w-4 h-4" />}
          label="Tuition Structure"
          value={degree.isPaid ? "Paid Tuition / Higher Education Fee" : "Government Funded / Tuition-Free"}
        />
      </div>

      {/* Eligible A/L Subject Streams */}
      {activeStreams.length > 0 && (
        <div className="mb-5 p-4 bg-purple-50/50 rounded-2xl border border-purple-100">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-900 mb-2.5">
            <Boxes className="w-4 h-4 text-purple-600" />
            <span>Eligible G.C.E. A/L Subject Streams</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {activeStreams.map((key) => (
              <span
                key={key}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border shadow-2xs ${getStreamColor(
                  key
                )}`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{streamLabels[key]}</span>
              </span>
            ))}
          </div>
          <p className="text-[11px] text-gray-500 mt-2.5 leading-relaxed">
            Students who completed G.C.E. Advanced Level in any of the above listed subject streams meet the primary eligibility criteria for this degree program.
          </p>
        </div>
      )}

      {/* Official Course Link */}
      {degree.courseUrl ? (
        <a
          href={degree.courseUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-purple-600/25 transition-all duration-200 hover:bg-purple-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
        >
          <ExternalLink className="w-4 h-4" />
          <span>Visit Official University / Degree Page</span>
        </a>
      ) : (
        <div className="text-center py-2 text-xs text-gray-500">
          Official link not available. Check university handbook or UGC prospectus for details.
        </div>
      )}
    </div>
  );
};

export default DegreePopup;
