import { useMemo } from "react";
import Fuse from "fuse.js";
import data from "../data/careerData.json";
import { CareerData } from "../types/career.type";

export const useCareerData = () => {
    const careers: CareerData[] = data as CareerData[];

    // Unique majors
    const majors = useMemo(() => [...new Set(careers.map(c => c.major))], [careers]);

    const getSubFields = (major: string) =>
        careers.filter(c => c.major === major).map(c => c.sub);

    const getJobsBySub = (sub: string) =>
        careers.find(c => c.sub === sub);

    // Fuse.js search index
    const fuse = useMemo(
        () =>
            new Fuse(careers, {
                keys: ["localJobs", "foreignJobs"],
                threshold: 0.3,
            }),
        [careers]
    );

    const searchByJobRole = (query: string) =>
        query.trim() ? fuse.search(query).map(r => r.item) : [];

    return { majors, getSubFields, getJobsBySub, searchByJobRole };
};
