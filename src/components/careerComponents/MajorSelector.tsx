import React from "react";

interface MajorSelectorProps {
    majors: string[];
    selectedMajor: string;
    onChange: (major: string) => void;
}

export const MajorSelector: React.FC<MajorSelectorProps> = ({
    majors,
    selectedMajor,
    onChange,
}) => {
    return (
        <div className="w-full">
            <label className="block text-sm font-semibold mb-2 text-gray-700">
                Select Major Field
            </label>
            <select
                value={selectedMajor}
                onChange={(e) => onChange(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
            >
                <option value="">-- Select Major --</option>
                {majors.map((major) => (
                    <option key={major} value={major}>
                        {major}
                    </option>
                ))}
            </select>
        </div>
    );
};
