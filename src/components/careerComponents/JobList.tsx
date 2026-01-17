import React from "react";
import { CareerData } from "../../types/career.type";

interface JobListProps {
    selectedSubData?: CareerData;
}

export const JobList: React.FC<JobListProps> = ({ selectedSubData }) => {
    if (!selectedSubData) return null;

    return (
        <div className="w-full mt-4">
            <h3 className="text-lg font-semibold text-indigo-600 mb-2">
                Job Roles under {selectedSubData.sub}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h4 className="font-medium mb-2 text-gray-700">Local Jobs</h4>
                    <ul className="list-disc pl-5 space-y-1">
                        {selectedSubData.localJobs.map((job) => (
                            <li key={job}>{job}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="font-medium mb-2 text-gray-700">Foreign Jobs</h4>
                    <ul className="list-disc pl-5 space-y-1">
                        {selectedSubData.foreignJobs.map((job) => (
                            <li key={job}>{job}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
