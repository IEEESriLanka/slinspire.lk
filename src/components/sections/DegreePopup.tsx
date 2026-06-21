import {
    Award,
    BookOpen,
    Boxes,
    ExternalLink,
    GraduationCap,
    Hash,
    Layers,
    University,
} from "lucide-react";
import { ReactNode, useState } from "react";
import { DegreeRecord } from "./DegreeCardGrid";

const streamLabels: Record<keyof DegreeRecord["stream"], string> = {
    art: "Art",
    commerce: "Commerce",
    bio: "Bio",
    physics: "Physics",
    tech: "Tech",
};

function DetailRow({
    icon,
    label,
    value,
}: {
    icon: ReactNode;
    label: string;
    value?: string;
}) {
    if (!value) return null;
    return (
        <div className="flex items-start gap-3 py-2">
            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                {icon}
            </div>
            <div className="flex flex-col">
                <span className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
                    {label}
                </span>
                <span className="text-sm font-medium text-gray-800">{value}</span>
            </div>
        </div>
    );
}

export default function DegreePopup({ degree }: { degree: DegreeRecord }) {
    const activeStreams = (
        Object.keys(streamLabels) as Array<keyof DegreeRecord["stream"]>
    ).filter((key) => degree.stream[key]);

    const [hasError, setHasError] = useState(false);
    const uniLogoSrc = `/images/uni/logos/${degree.uniId.toLowerCase()}.png`;

    return (
        <div className="w-[min(90vw,520px)] max-h-[70vh] overflow-y-auto">
            {/* Header */}
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-50 to-purple-100">
                <div className="absolute -left-12 -bottom-24 h-72 w-72 rounded-full bg-white opacity-70" />
                <div className="relative flex gap-4 p-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
                        {hasError ? (
                            <div className="bg-purple-200 w-full h-full flex items-center justify-center rounded-xl">
                                <University size={22} color="purple" />
                            </div>
                        ) : (
                            <img src={uniLogoSrc} alt={degree.universityName} className='w-full h-full object-contain' onError={() => setHasError(true)} />
                        )}
                    </div>
                    <div className="flex flex-col">
                        <span className="inline-flex items-baseline gap-1 text-[10px] uppercase text-gray-500">
                            <University size={10} color="purple" /> {degree.universityName}
                        </span>
                        <h3 className="text-base font-semibold leading-snug text-gray-900">
                            {degree.courseName}
                        </h3>
                        <span className="-ml-1 inline-flex items-center gap-1 text-xs text-gray-600">
                            <BookOpen className="h-3" /> {degree.majorField}
                        </span>
                    </div>
                </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 pt-4">
                {degree.courseType && (
                    <span
                        className="inline-block rounded-sm bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium data-[internal=true]:bg-purple-500/30 data-[internal=true]:text-purple-700"
                        data-internal={degree.courseType === "INTERNAL" ? "true" : "false"}
                    >
                        {degree.courseType}
                    </span>
                )}
                <span
                    className="inline-block rounded-sm px-1.5 py-0.5 text-[10px] font-medium uppercase data-[internal=false]:bg-green-500/30 data-[internal=false]:text-green-700 data-[internal=true]:bg-blue-500/30 data-[internal=true]:text-blue-700"
                    data-internal={degree.isPaid ? "false" : "true"}
                >
                    {degree.isPaid ? "Paid" : "Free"}
                </span>
                {degree.courseMode && (
                    <span
                        className="inline-block rounded-sm px-1.5 py-0.5 text-[10px] font-medium uppercase data-[fulltime=true]:bg-green-500/30 data-[fulltime=true]:text-green-700 data-[parttime=true]:bg-blue-500/30 data-[parttime=true]:text-blue-700"
                        data-fulltime={degree.courseMode === "Full Time" ? "true" : "false"}
                        data-parttime={degree.courseMode === "Part Time" ? "true" : "false"}
                    >
                        {degree.courseMode}
                    </span>
                )}
            </div>

            {/* Details */}
            <div className="mt-4 divide-y divide-gray-100 rounded-xl border border-black/10 px-4 py-1">
                <DetailRow
                    icon={<BookOpen size={14} />}
                    label="Major Field"
                    value={degree.majorField}
                />
                <DetailRow
                    icon={<Layers size={14} />}
                    label="Sub Field"
                    value={degree.subField}
                />
                <DetailRow
                    icon={<Award size={14} />}
                    label="Qualification Level"
                    value={degree.qualificationLevel}
                />
                <DetailRow
                    icon={<GraduationCap size={14} />}
                    label="Course Type"
                    value={degree.courseType}
                />
                <DetailRow
                    icon={<Hash size={14} />}
                    label="UGC Code"
                    value={degree.ugcCode}
                />
            </div>

            {/* Streams */}
            {activeStreams.length > 0 && (
                <div className="mt-4">
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-wide text-gray-400">
                        <Boxes size={12} /> Eligible Streams
                    </span>
                    <div className="flex flex-wrap gap-2 pt-2">
                        {activeStreams.map((key) => (
                            <span
                                key={key}
                                className="rounded-full bg-purple-500/20 px-2.5 py-1 text-[11px] font-medium text-purple-700"
                            >
                                {streamLabels[key]}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Course link */}
            {degree.courseUrl && (
                <a
                    href={degree.courseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg transition-colors duration-100 hover:bg-purple-700"
                >
                    <ExternalLink size={16} /> Visit Course Page
                </a>
            )}
        </div>
    );
}
