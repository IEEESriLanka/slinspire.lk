import * as React from "react";
import { CircularProgress, Box, Paper } from "@mui/material";
import DegreeCard from "./DegreeCard";
import { DegreeRecord, DegreeFilters, DegreeFilterOptions } from "../types";
import { fetchDegrees, extractFilterOptions } from "../services/degreeService";

export type { DegreeRecord } from "../types";

export interface DegreeCardGridProps {
  filters: DegreeFilters;
  onFiltersChange?: (filters: DegreeFilters) => void;
  onFilterOptions: (options: DegreeFilterOptions) => void;
}

export default function DegreeCardGrid({
  filters,
  onFilterOptions,
}: DegreeCardGridProps) {
  const [data, setData] = React.useState<DegreeRecord[]>([]);
  const [loading, setLoading] = React.useState(true);

  const handleFilterOptions = React.useCallback(
    (dataRows: DegreeRecord[]) => {
      const options = extractFilterOptions(dataRows);
      onFilterOptions(options);
    },
    [onFilterOptions]
  );

  React.useEffect(() => {
    fetchDegrees()
      .then((dataRows) => {
        setData(dataRows);
        handleFilterOptions(dataRows);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch degrees:", error);
        setLoading(false);
      });
  }, [handleFilterOptions]);

  const filteredData = React.useMemo(() => {
    const filtered = data.filter((row) => {
      const match = (val: string | undefined, filter: string) =>
        !filter || val?.toLowerCase().includes(filter.toLowerCase());

      return (
        match(row.universityName, filters.university) &&
        match(row.courseName, filters.course) &&
        match(row.majorField, filters.majorField) &&
        match(row.subField, filters.subField) &&
        match(row.courseType, filters.type) &&
        (!filters.isPaid ||
          (filters.isPaid.toLowerCase() === "paid" ? row.isPaid : !row.isPaid)) &&
        match(row.courseMode, filters.courseMode) &&
        match(row.qualificationLevel, filters.qualificationLevel) &&
        (!filters.stream ||
          row.stream[
          filters.stream.toLowerCase() as keyof DegreeRecord["stream"]
          ] === true)
      );
    });

    handleFilterOptions(filtered);
    return filtered;
  }, [data, filters, handleFilterOptions]);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" py={10}>
        <CircularProgress />
      </Box>
    );

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        padding: 3,
        borderRadius: 3,
      }}
    >
      <h2 className="pb-4 font-medium">
        {filteredData.length} Degree Programs Found
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredData.map((row) => (
          <DegreeCard key={row.id} degree={row} />
        ))}
      </div>
    </Paper>
  );
}
