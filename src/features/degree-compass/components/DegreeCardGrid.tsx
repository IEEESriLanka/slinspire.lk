import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
  Compass,
  LayoutGrid,
  List as ListIcon,
  RotateCcw,
  Sparkles,
  BookOpen,
  University,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/common/Modal";
import DegreeCard from "./DegreeCard";
import DegreePopup from "./DegreePopup";
import { DegreeRecord, DegreeFilters, DegreeFilterOptions } from "../types";
import { fetchDegrees, extractFilterOptions, streamLabels } from "../services/degreeService";

export type { DegreeRecord } from "../types";

export interface DegreeCardGridProps {
  filters: DegreeFilters;
  onFiltersChange?: (filters: DegreeFilters) => void;
  onFilterOptions: (options: DegreeFilterOptions) => void;
}

export const DegreeCardGrid: React.FC<DegreeCardGridProps> = ({
  filters,
  onFiltersChange,
  onFilterOptions,
}) => {
  const [data, setData] = useState<DegreeRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDegree, setSelectedDegree] = useState<DegreeRecord | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(24);

  const gridTopRef = useRef<HTMLDivElement>(null);

  // Fetch degrees and extract options from the full master dataset ONCE
  useEffect(() => {
    fetchDegrees()
      .then((dataRows) => {
        setData(dataRows);
        const options = extractFilterOptions(dataRows);
        onFilterOptions(options);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch degrees:", error);
        setLoading(false);
      });
  }, [onFilterOptions]);

  // Reset to page 1 whenever any filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, pageSize]);

  // Filter dataset based on active filters
  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const match = (val: string | undefined, filter: string) =>
        !filter || (val && val.toLowerCase().includes(filter.toLowerCase()));

      // Match A/L stream
      const matchStream = () => {
        if (!filters.stream) return true;
        const normalized = filters.stream.toLowerCase();
        // Support direct key matches or friendly name matches
        if (normalized.includes("math") || normalized === "physics") {
          return row.stream.physics === true;
        }
        if (normalized.includes("bio")) {
          return row.stream.bio === true;
        }
        if (normalized.includes("commerce")) {
          return row.stream.commerce === true;
        }
        if (normalized.includes("art")) {
          return row.stream.art === true;
        }
        if (normalized.includes("tech")) {
          return row.stream.tech === true;
        }
        return (
          row.stream[normalized as keyof DegreeRecord["stream"]] === true
        );
      };

      // Match search query against courseName, universityName, majorField, or UGC code
      const matchSearch = () => {
        if (!filters.course) return true;
        const query = filters.course.toLowerCase().trim();
        return (
          row.courseName.toLowerCase().includes(query) ||
          row.universityName.toLowerCase().includes(query) ||
          row.majorField.toLowerCase().includes(query) ||
          (row.subField && row.subField.toLowerCase().includes(query)) ||
          (row.ugcCode && row.ugcCode.toLowerCase().includes(query))
        );
      };

      return (
        match(row.universityName, filters.university) &&
        matchSearch() &&
        match(row.majorField, filters.majorField) &&
        match(row.subField, filters.subField) &&
        match(row.courseType, filters.type) &&
        (!filters.isPaid ||
          (filters.isPaid.toLowerCase() === "paid" ? row.isPaid : !row.isPaid)) &&
        match(row.courseMode, filters.courseMode) &&
        match(row.qualificationLevel, filters.qualificationLevel) &&
        matchStream()
      );
    });
  }, [data, filters]);

  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const paginatedData = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, safeCurrentPage, pageSize]);

  // Handle page navigation with smooth scroll to top of grid
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const element = gridTopRef.current || document.getElementById("degree-grid-start");
    if (element) {
      const headerOffset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: "smooth",
      });
    }
  };

  // Helper to generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (safeCurrentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (safeCurrentPage >= totalPages - 3) {
        pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", safeCurrentPage - 1, safeCurrentPage, safeCurrentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  const clearAllFilters = () => {
    if (onFiltersChange) {
      onFiltersChange({
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
    }
  };

  // Shimmer Skeleton Loading State
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-64 bg-purple-200/50 rounded-xl animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="h-64 rounded-2xl bg-white border border-purple-100 p-5 shadow-sm animate-pulse flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex gap-3 items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl" />
                  <div className="space-y-1.5 flex-1">
                    <div className="h-3 bg-purple-100 rounded w-3/4" />
                    <div className="h-3 bg-purple-100 rounded w-1/2" />
                  </div>
                </div>
                <div className="h-4 bg-purple-100 rounded w-full mt-4" />
                <div className="h-4 bg-purple-100 rounded w-2/3" />
              </div>
              <div className="h-6 bg-purple-50 rounded-md w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const startRecord = (safeCurrentPage - 1) * pageSize + 1;
  const endRecord = Math.min(safeCurrentPage * pageSize, filteredData.length);

  return (
    <div className="space-y-6">
      {/* Anchor for Smooth Scrolling */}
      <div id="degree-grid-start" ref={gridTopRef} className="scroll-mt-24" />

      {/* Results Header: Count, Page Size Selector, View Mode */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-purple-100 shadow-xs">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <span>Explore Degree Programs</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700">
              {filteredData.length.toLocaleString()} total
            </span>
          </h2>
          {filteredData.length > 0 && (
            <p className="text-xs text-gray-500 mt-0.5">
              Showing {startRecord.toLocaleString()} – {endRecord.toLocaleString()} of{" "}
              {filteredData.length.toLocaleString()} programs
            </p>
          )}
        </div>

        {/* Controls: Page size & View toggle */}
        <div className="flex items-center gap-3 justify-end">
          {/* Page size select */}
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <span className="hidden sm:inline">Per page:</span>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="px-2.5 py-1.5 rounded-lg border border-purple-200 bg-white text-xs font-semibold text-gray-700 focus:ring-2 focus:ring-purple-400 focus:outline-none cursor-pointer"
            >
              <option value={12}>12</option>
              <option value={24}>24</option>
              <option value={48}>48</option>
            </select>
          </div>

          {/* View mode toggle */}
          <div className="flex items-center bg-purple-100/70 p-1 rounded-xl border border-purple-200">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === "grid"
                ? "bg-white text-purple-700 shadow-xs font-bold"
                : "text-purple-600 hover:text-purple-900"
                }`}
              title="Grid View"
              aria-label="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === "list"
                ? "bg-white text-purple-700 shadow-xs font-bold"
                : "text-purple-600 hover:text-purple-900"
                }`}
              title="Compact List View"
              aria-label="Compact List View"
            >
              <ListIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Results View */}
      {filteredData.length > 0 ? (
        <>
          {viewMode === "grid" ? (
            /* Grid View */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {paginatedData.map((row) => (
                <DegreeCard
                  key={row.id}
                  degree={row}
                  onSelect={(degree) => setSelectedDegree(degree)}
                />
              ))}
            </div>
          ) : (
            /* Compact List View */
            <div className="bg-white rounded-2xl border border-purple-100 shadow-xs divide-y divide-gray-100 overflow-hidden">
              {paginatedData.map((row) => (
                <div
                  key={row.id}
                  onClick={() => setSelectedDegree(row)}
                  className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-purple-50/50 cursor-pointer transition-colors group"
                >
                  <div className="flex items-start gap-3.5 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 p-1 flex items-center justify-center shrink-0">
                      <img
                        src={`${import.meta.env.BASE_URL}images/uni/logos/${row.uniId.toLowerCase()}.png`}
                        alt={row.universityName}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[11px] font-bold text-purple-700 uppercase line-clamp-1">
                        {row.universityName}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-purple-700 transition-colors line-clamp-1">
                        {row.courseName}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                        {row.majorField} {row.subField ? `• ${row.subField}` : ""}
                      </p>
                    </div>
                  </div>

                  {/* Badges & Action */}
                  <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                    {row.ugcCode && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-600 border border-gray-200">
                        {row.ugcCode}
                      </span>
                    )}
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${row.isPaid
                        ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                        : "bg-emerald-50 text-emerald-700 border-emerald-200"
                        }`}
                    >
                      {row.isPaid ? "Paid" : "Free"}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs font-semibold text-purple-600 group-hover:text-purple-800"
                    >
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 pb-2 border-t border-purple-100">
              <span className="text-xs text-gray-500 font-medium order-2 sm:order-1">
                Page {safeCurrentPage} of {totalPages}
              </span>

              <div className="flex items-center gap-1.5 order-1 sm:order-2">
                {/* Previous Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(safeCurrentPage - 1)}
                  disabled={safeCurrentPage === 1}
                  className="rounded-xl border-purple-200 text-purple-700 hover:bg-purple-50 disabled:opacity-40"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">Previous</span>
                </Button>

                {/* Numbered Page Buttons */}
                <div className="flex items-center gap-1">
                  {getPageNumbers().map((page, idx) =>
                    page === "..." ? (
                      <span
                        key={`ellipsis-${idx}`}
                        className="px-2 text-xs text-purple-400 font-bold"
                      >
                        ...
                      </span>
                    ) : (
                      <button
                        key={`page-${page}`}
                        type="button"
                        onClick={() => handlePageChange(Number(page))}
                        className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${safeCurrentPage === page
                          ? "bg-purple-600 text-white shadow-md shadow-purple-600/25"
                          : "bg-white border border-purple-200 text-purple-700 hover:bg-purple-50"
                          }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>

                {/* Next Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(safeCurrentPage + 1)}
                  disabled={safeCurrentPage === totalPages}
                  className="rounded-xl border-purple-200 text-purple-700 hover:bg-purple-50 disabled:opacity-40"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-6 bg-white/80 backdrop-blur-md rounded-3xl border border-purple-100 max-w-xl mx-auto shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center mx-auto mb-4 text-purple-600">
            <Compass className="w-8 h-8 text-purple-500 animate-spin-slow" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            No Degree Programs Match Your Filters
          </h3>
          <p className="text-sm text-gray-600 mb-6 leading-relaxed">
            We couldn't find any degrees matching your specific combination. Try selecting "All Universities", clearing search keywords, or selecting another subject stream.
          </p>
          <Button
            onClick={clearAllFilters}
            className="gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl px-5 shadow-md shadow-purple-600/25"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset All Filters</span>
          </Button>
        </div>
      )}

      {/* Single Hoisted Modal Instance */}
      <Modal
        isOpen={Boolean(selectedDegree)}
        onClose={() => setSelectedDegree(null)}
        title="Degree Program Overview"
      >
        {selectedDegree && <DegreePopup degree={selectedDegree} />}
      </Modal>
    </div>
  );
};

export default DegreeCardGrid;
