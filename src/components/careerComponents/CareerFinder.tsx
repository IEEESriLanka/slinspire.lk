import React, { useState } from "react";
import { useCareerData } from "../../hooks/useCareerData";
import { MajorSelector } from "./MajorSelector";
import { SubFieldSelector } from "./SubFieldSelector";
import { JobList } from "./JobList";
import { JobSearch } from "./JobSearch";

export const CareerFinder: React.FC = () => {
    const { majors, getSubFields, getJobsBySub, searchByJobRole } = useCareerData();

    const [selectedMajor, setSelectedMajor] = useState("");
    const [selectedSub, setSelectedSub] = useState("");

    const subFields = selectedMajor ? getSubFields(selectedMajor) : [];
    const selectedSubData = selectedSub ? getJobsBySub(selectedSub) : undefined;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-2xl space-y-6">
            <h2 className="text-2xl font-bold text-center text-indigo-700">
                Career Path Finder
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
                <MajorSelector
                    majors={majors}
                    selectedMajor={selectedMajor}
                    onChange={(major) => {
                        setSelectedMajor(major);
                        setSelectedSub("");
                    }}
                />
                <SubFieldSelector
                    subFields={subFields}
                    selectedSub={selectedSub}
                    onChange={setSelectedSub}
                />
            </div>

            <JobList selectedSubData={selectedSubData} />
            <JobSearch onSearch={searchByJobRole} />
        </div>
    );
};
