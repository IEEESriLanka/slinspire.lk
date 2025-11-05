import React, { useState } from "react";
import { CareerData } from "../../types/career.type";

interface JobSearchProps {
    onSearch: (query: string) => CareerData[];
}

export const JobSearch: React.FC<JobSearchProps> = ({ onSearch }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<CareerData[]>([]);

    const handleSearch = (value: string) => {
        setQuery(value);
        const res = onSearch(value);
        setResults(res);
    };

    return (
        <div className="w-full mt-6">
            <label className="block text-sm font-semibold mb-2 text-gray-700">
                Search by Job Role
            </label>
            <input
                type="text"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Type a job title (e.g., Software Engineer)"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
            />

            {results.length > 0 && (
                <div className="mt-3 border border-gray-200 rounded-lg p-3 bg-gray-50">
                    <h4 className="text-sm font-semibold mb-2 text-gray-700">
                        Matching Job Roles
                    </h4>
                    <ul className="space-y-1">
                        {results.map((r, i) => (
                            <li key={i} className="text-sm">
                                <span className="font-medium text-indigo-600">{r.major}</span> →{" "}
                                {r.sub}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
