import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Calendar, MapPin, Users, Filter, Search, School } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { careerCompassSessions } from "../../data/CareerCompassSessions";

export const MonthlySeminarsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  let currentYear = new Date().getFullYear();
  const [selectedProvince, setSelectedProvince] = useState("All");
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());

  const provinces = ["All", ...new Set(careerCompassSessions.map(s => s.province))];
  const years = ["All", ...new Set(careerCompassSessions.map(s => s.year))];

  const filteredSeminars = careerCompassSessions.filter(seminar => {
    return (selectedProvince === "All" || seminar.province === selectedProvince) &&
      (selectedYear === "All" || seminar.year === selectedYear);
  });

  const getYearColor = (year: string) => {
    switch (year) {
      case "2024": return "bg-purple-100 text-purple-800";
      case "2025": return "bg-blue-100 text-blue-800";
      case "2026": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "Ongoing": return "bg-orange-100 text-orange-800";
      case "TODO": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section id="seminars" className="py-20 bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="container px-4 mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Provincial <span className="text-purple-600">Career Compass</span> Sessions
          </h2>
          <p className="max-w-3xl mx-auto text-xl leading-relaxed text-gray-600">
            Join our island-wide career guidance seminars conducted at state universities across all provinces.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="font-medium text-gray-700">Filter by:</span>
          </div>

          <select
            value={selectedProvince}
            onChange={(e) => {
              setSelectedProvince(e.target.value);
              if (e.target.value != "All") {
                setSelectedYear("All");
              } else {
                setSelectedYear(currentYear.toString());
              }
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {provinces.map(province => (
              <option key={province} value={province}>{province} Province</option>
            ))}
          </select>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </motion.div>

        {/* Card Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredSeminars.slice(0, 9).map((seminar) => (
            <motion.div
              key={seminar.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <Card className="flex flex-col h-full transition-all duration-300 bg-white border-0 group hover:shadow-xl">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img
                    src={seminar.image}
                    alt={seminar.vanue}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-sm font-medium text-purple-600 rounded-full bg-purple-50">
                      {seminar.province} Province
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 flex flex-col items-end space-y-2">
                    <Badge className={getStatusColor(seminar.status)}>
                      {seminar.status}
                    </Badge>
                    <Badge className={getYearColor(seminar.year)}>
                      {seminar.year}
                    </Badge>
                  </div>
                </div>
                <CardContent className="flex flex-col flex-1 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">
                      {seminar.name}
                    </h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 mb-4 text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{seminar.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{seminar.vanue}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 mb-4 text-gray-600">
                    <div className="flex items-center gap-1">
                      <School className="w-4 h-4" />
                      <span className="text-sm">{seminar.schools ? `${seminar.schools} schools` : "N/A"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">{seminar.participants ? `${seminar.participants} Students` : "N/A"}</span>
                    </div>
                  </div>
                  <p className="flex-1 mb-6 leading-relaxed text-gray-600">
                    {seminar.description}
                  </p>
                  <Button
                    className="w-full mt-auto bg-purple-600 hover:bg-purple-700"
                    disabled={seminar.status !== "Completed" || !seminar.albumURL}
                    onClick={() => {
                      if (seminar.albumURL) {
                        window.open(seminar.albumURL, "_blank", "noopener,noreferrer");
                      }
                    }}
                  >
                    View Album
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};