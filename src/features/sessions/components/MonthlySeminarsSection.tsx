import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Calendar,
  MapPin,
  Users,
  School,
  Search,
  Filter,
  ExternalLink,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { careerCompassSessions } from "@/data/sessions";
import { SeminarPagination } from "./SeminarPagination";

export const MonthlySeminarsSection: React.FC = () => {
  const cardsSectionRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
  });

  const [selectedProvince, setSelectedProvince] = useState<string>("All");
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const cardsPerPage = 9;

  // Distinct provinces in alphabetical order
  const provinces = useMemo(() => {
    const raw = Array.from(new Set(careerCompassSessions.map((s) => s.province))).sort();
    return ["All", ...raw];
  }, []);

  // Distinct years in descending order
  const years = useMemo(() => {
    const raw = Array.from(new Set(careerCompassSessions.map((s) => s.year))).sort().reverse();
    return ["All", ...raw];
  }, []);

  // Compute dynamic seminar counts for each province based on the selected year
  const provinceCounts = useMemo(() => {
    const counts: Record<string, number> = { All: 0 };
    careerCompassSessions.forEach((s) => {
      const matchesYear = selectedYear === "All" || s.year === selectedYear;
      if (matchesYear) {
        counts[s.province] = (counts[s.province] || 0) + 1;
        counts.All += 1;
      }
    });
    return counts;
  }, [selectedYear]);

  // Handle province change with smart year cascading & immediate page reset
  const handleProvinceChange = (newProvince: string) => {
    setSelectedProvince(newProvince);
    setCurrentPage(1);

    // If a specific province is selected, check if current selectedYear has any sessions in that province.
    // If not, automatically reset selectedYear to "All" so the student sees results!
    if (newProvince !== "All" && selectedYear !== "All") {
      const hasSessionsInYear = careerCompassSessions.some(
        (s) => s.province === newProvince && s.year === selectedYear
      );
      if (!hasSessionsInYear) {
        setSelectedYear("All");
      }
    }
  };

  // Handle year change with smart province cascading & immediate page reset
  const handleYearChange = (newYear: string) => {
    setSelectedYear(newYear);
    setCurrentPage(1);

    // If a specific year is selected, check if current selectedProvince has any sessions in that year.
    // If not, automatically reset selectedProvince to "All" to avoid dead-ends.
    if (newYear !== "All" && selectedProvince !== "All") {
      const hasSessionsInProvince = careerCompassSessions.some(
        (s) => s.province === selectedProvince && s.year === newYear
      );
      if (!hasSessionsInProvince) {
        setSelectedProvince("All");
      }
    }
  };

  // Handle search query change with immediate page reset
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedProvince("All");
    setSelectedYear("All");
    setSearchQuery("");
    setCurrentPage(1);
  };

  // Handle page change with smooth scroll to seminar card section starting point
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const element = cardsSectionRef.current || document.getElementById("seminar-cards-start");
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

  // Filter and sort sessions
  const filteredSeminars = useMemo(() => {
    const trimmed = searchQuery.trim().toLowerCase();
    return careerCompassSessions
      .filter((seminar) => {
        const matchesProvince =
          selectedProvince === "All" || seminar.province === selectedProvince;
        const matchesYear =
          selectedYear === "All" || seminar.year === selectedYear;
        const matchesSearch =
          trimmed === "" ||
          seminar.name.toLowerCase().includes(trimmed) ||
          seminar.vanue.toLowerCase().includes(trimmed) ||
          seminar.province.toLowerCase().includes(trimmed) ||
          seminar.description.toLowerCase().includes(trimmed);

        return matchesProvince && matchesYear && matchesSearch;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [selectedProvince, selectedYear, searchQuery]);

  const totalPages = Math.ceil(filteredSeminars.length / cardsPerPage);

  // Safe current page: guarantees no empty slice when switching filters
  const safeCurrentPage = useMemo(() => {
    if (totalPages === 0) return 1;
    if (currentPage > totalPages) return 1;
    return currentPage;
  }, [currentPage, totalPages]);

  const paginatedSeminars = useMemo(() => {
    return filteredSeminars.slice(
      (safeCurrentPage - 1) * cardsPerPage,
      safeCurrentPage * cardsPerPage
    );
  }, [filteredSeminars, safeCurrentPage]);

  // Keep currentPage synced with safeCurrentPage if it adjusted
  useEffect(() => {
    if (currentPage !== safeCurrentPage) {
      setCurrentPage(safeCurrentPage);
    }
  }, [safeCurrentPage, currentPage]);

  const getYearBadgeClass = (year: string) => {
    switch (year) {
      case "2027":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "2026":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "2025":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      case "2024":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Ongoing":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Upcoming":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  // Helper to render page numbers
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (safeCurrentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (safeCurrentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          safeCurrentPage - 1,
          safeCurrentPage,
          safeCurrentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  const hasActiveFilters =
    selectedProvince !== "All" || selectedYear !== "All" || searchQuery.trim() !== "";

  return (
    <section id="seminars" className="py-24 bg-gradient-to-br from-purple-50/70 via-indigo-50/40 to-purple-50/70 border-t border-purple-100">
      <div className="container px-4 mx-auto max-w-7xl">
        {/* Section Heading */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-3 text-xs font-semibold text-purple-700 bg-purple-100 rounded-full border border-purple-200">
            <School className="w-3.5 h-3.5" />
            <span>Island-Wide Impact Across All 9 Provinces</span>
          </div>
          <h2 className="mb-4 text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Provincial <span className="text-purple-600">Career Compass</span> Sessions
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Physical, hands-on career guidance seminars conducted inside state university lecture halls and faculties across Sri Lanka.
          </p>
        </motion.div>

        {/* Filter Controls Bar */}
        <div className="mb-10 space-y-4 max-w-5xl mx-auto">
          {/* Main Filter Bar: Province Select, Year Select & Search */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-4 sm:p-5 bg-white/95 backdrop-blur-md rounded-2xl border border-purple-100 shadow-md">
            {/* Filter Label & Selects */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
              <div className="flex items-center gap-2 text-purple-800 shrink-0 pr-2 sm:border-r sm:border-purple-200">
                <Filter className="w-4 h-4 text-purple-600" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">
                  Filter by:
                </span>
              </div>

              {/* Province Select */}
              <select
                value={selectedProvince}
                onChange={(e) => handleProvinceChange(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-purple-200 bg-purple-50/70 text-purple-900 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition shadow-sm hover:bg-purple-100 cursor-pointer outline-none"
              >
                {provinces.map((province) => (
                  <option key={province} value={province}>
                    {province === "All" ? "All Provinces" : `${province} Province`}
                  </option>
                ))}
              </select>

              {/* Year Select */}
              <select
                value={selectedYear}
                onChange={(e) => handleYearChange(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-purple-200 bg-purple-50/70 text-purple-900 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition shadow-sm hover:bg-purple-100 cursor-pointer outline-none"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year === "All" ? "All Years" : `Year ${year}`}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Input & Reset Button */}
            <div className="flex items-center gap-2">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Search venue or school..."
                  className="w-full pl-9 pr-8 py-2.5 text-xs sm:text-sm bg-purple-50/40 border border-purple-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => handleSearchChange("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 p-1"
                  >
                    ✕
                  </button>
                )}
              </div>

              {hasActiveFilters && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetFilters}
                  className="shrink-0 gap-1.5 text-xs font-semibold text-purple-700 border-purple-200 hover:bg-purple-50"
                  title="Reset all filters"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset</span>
                </Button>
              )}
            </div>
          </div>

          {/* Quick Province Interactive Chips */}
          <div className="p-3 sm:p-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-purple-100 shadow-sm">
            <div className="flex items-center justify-between mb-2.5 px-1">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-purple-800">
                Quick Select Province:
              </span>
              <span className="text-xs text-gray-500 font-medium">
                Showing {filteredSeminars.length} session{filteredSeminars.length === 1 ? "" : "s"}
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {provinces.map((prov) => {
                const isActive = selectedProvince === prov;
                const count = provinceCounts[prov] || 0;
                return (
                  <button
                    key={prov}
                    type="button"
                    onClick={() => handleProvinceChange(prov)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${isActive
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/25 scale-[1.03]"
                      : "bg-white text-gray-700 hover:bg-purple-50 hover:text-purple-700 border border-gray-200/80"
                      }`}
                  >
                    <span>{prov === "All" ? "All Provinces" : prov}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${isActive
                        ? "bg-white/25 text-white"
                        : "bg-purple-100 text-purple-700"
                        }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Seminar Card Section Starting Point */}
        <div id="seminar-cards-start" ref={cardsSectionRef} className="scroll-mt-24" />

        {/* Top Pagination */}
        {totalPages > 1 && (
          <div className="mb-8">
            <SeminarPagination
              currentPage={safeCurrentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              getPageNumbers={getPageNumbers}
            />
          </div>
        )}

        {/* Seminars Grid */}
        {paginatedSeminars.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={`seminar-grid-page-${safeCurrentPage}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
            >
              {paginatedSeminars.map((seminar, index) => (
                <motion.div
                  key={`${seminar.id}-${seminar.province}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                  whileHover={{ y: -6 }}
                  className="h-full"
                >
                  <Card
                    className="flex flex-col h-full bg-white border border-gray-200/80 hover:border-purple-300 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden"
                  >
                    {/* Image Cover */}
                    <div className="relative h-48 overflow-hidden bg-purple-950">
                      <img
                        src={`${import.meta.env.BASE_URL}${seminar.image}`}
                        alt={seminar.vanue}
                        loading="lazy"
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `${import.meta.env.BASE_URL}hero_bg.jpeg`;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-black/30" />

                      {/* Province Tag */}
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 text-xs font-semibold text-white bg-purple-900/80 backdrop-blur-md rounded-full border border-purple-400/30 shadow">
                          {seminar.province} Province
                        </span>
                      </div>

                      {/* Status & Year Badges */}
                      <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-semibold rounded-full border shadow-sm ${getStatusBadgeClass(
                            seminar.status
                          )}`}
                        >
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-current" />
                          </span>
                          {seminar.status}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 text-[11px] font-bold rounded-full border shadow-sm ${getYearBadgeClass(
                            seminar.year
                          )}`}
                        >
                          {seminar.year}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <CardContent className="flex flex-col flex-1 p-5 sm:p-6 justify-between">
                      <div className="space-y-3 mb-4">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-700 transition-colors line-clamp-2">
                          {seminar.name}
                        </h3>

                        {/* Metadata details */}
                        <div className="space-y-1.5 text-xs text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-purple-600 shrink-0" />
                            <span>{seminar.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-purple-600 shrink-0" />
                            <span className="line-clamp-1">{seminar.vanue}</span>
                          </div>
                          <div className="flex items-center gap-4 pt-1">
                            <div className="flex items-center gap-1.5">
                              <School className="w-4 h-4 text-indigo-600 shrink-0" />
                              <span className="font-medium">
                                {seminar.schools ? `${seminar.schools} School(s)` : "Provincial"}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Users className="w-4 h-4 text-indigo-600 shrink-0" />
                              <span className="font-medium">
                                {seminar.participants ? `${seminar.participants} Students` : "N/A"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3">
                          {seminar.description}
                        </p>
                      </div>

                      {/* Album CTA */}
                      <div className="mt-auto pt-3 border-t border-gray-100">
                        <Button
                          asChild={Boolean(seminar.albumURL && seminar.status === "Completed")}
                          disabled={!seminar.albumURL || seminar.status !== "Completed"}
                          size="sm"
                          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium transition-all"
                        >
                          {seminar.albumURL && seminar.status === "Completed" ? (
                            <a
                              href={seminar.albumURL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-1.5"
                            >
                              <span>View Event Album</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          ) : (
                            <span>Photos Coming Soon</span>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        ) : (
          /* Empty State */
          <div className="text-center py-16 px-4 bg-white/70 rounded-3xl border border-purple-100 max-w-xl mx-auto shadow-sm">
            <School className="w-12 h-12 text-purple-300 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-gray-900 mb-1">
              No Seminars Found
            </h4>
            <p className="text-sm text-gray-600 mb-5">
              No sessions matched your filter criteria. Try selecting another province or clearing the search.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={resetFilters}
              className="gap-2 text-purple-700 border-purple-200 hover:bg-purple-50"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset All Filters</span>
            </Button>
          </div>
        )}

        {/* Bottom Pagination */}
        {totalPages > 1 && (
          <div className="mt-10">
            <SeminarPagination
              currentPage={safeCurrentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              getPageNumbers={getPageNumbers}
            />
          </div>
        )}
      </div>
    </section>
  );
};