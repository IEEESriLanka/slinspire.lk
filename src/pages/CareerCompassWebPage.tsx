import React from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { DegreeTableFilters } from "@/features/degree-compass/components/DegreeTableFilters";
import DegreeCardGrid from "@/features/degree-compass/components/DegreeCardGrid";
import {
  DegreeFilters,
  DegreeFilterOptions,
} from "@/features/degree-compass/types";

export const CareerCompassWebPage = () => {
  const [filters, setFilters] = React.useState<DegreeFilters>({
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

  const [filterOptions, setFilterOptions] = React.useState<DegreeFilterOptions>({
    universities: [],
    majorFields: [],
    subFields: [],
    types: [],
    paymentStatuses: [],
    courseModes: [],
    qualificationLevels: [],
    streams: [],
  });

  return (
    <PageLayout>
      <DegreeTableFilters
        filters={filters}
        onChange={setFilters}
        universityOptions={filterOptions.universities}
        majorFieldOptions={filterOptions.majorFields}
        subFieldOptions={filterOptions.subFields}
        typeOptions={filterOptions.types}
        isPaidOptions={filterOptions.paymentStatuses}
        courseModeOptions={filterOptions.courseModes}
        qualificationLevelOptions={filterOptions.qualificationLevels}
        streamOptions={filterOptions.streams}
      />
      <DegreeCardGrid
        filters={filters}
        onFiltersChange={setFilters}
        onFilterOptions={setFilterOptions}
      />
    </PageLayout>
  );
};