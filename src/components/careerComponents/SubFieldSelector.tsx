import React from "react";

interface SubFieldSelectorProps {
    subFields: string[];
    selectedSub: string;
    onChange: (sub: string) => void;
}

export const SubFieldSelector: React.FC<SubFieldSelectorProps> = ({
    subFields,
    selectedSub,
    onChange,
}) => {
    return (
        <div className="w-full">
            <label className="block text-sm font-semibold mb-2 text-gray-700">
                Select Sub Field
            </label>
            <select
                value={selectedSub}
                onChange={(e) => onChange(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
            >
                <option value="">-- Select Sub Field --</option>
                {subFields.map((sub) => (
                    <option key={sub} value={sub}>
                        {sub}
                    </option>
                ))}
            </select>
        </div>
    );
};
