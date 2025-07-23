import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Calendar, MapPin, Users, Filter, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

export const MonthlySeminarsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  let currentYear = new Date().getFullYear();
  const [selectedProvince, setSelectedProvince] = useState("All");
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());

  const seminars = [
    {
      id: 1,
      province: "Western",
      university: "University of Colombo",
      date: "2024-02-15",
      time: "2:00 PM",
      year: "2024",
      status: "Completed",
      participants: 150,
      description: "Comprehensive career guidance session with industry professionals and alumni panel discussion.",
      image: "university-of-colombo.png"
    },
    {
      id: 2,
      province: "Central",
      university: "University of Peradeniya",
      date: "2024-02-20",
      time: "10:00 AM",
      year: "2024",
      status: "Completed",
      participants: 120,
      description: "Guidance for A/L completers on university admissions and alternative career paths.",
      image: "university-of-peradeniya.png"
    },
    {
      id: 3,
      province: "Southern",
      university: "University of Ruhuna",
      date: "2024-02-25",
      time: "9:00 AM",
      year: "2024",
      status: "Completed",
      participants: 100,
      description: "Helping O/L students choose their A/L streams and understand future opportunities.",
      image: "university-of-ruhuna.png"
    },
    {
      id: 4,
      province: "Northern",
      university: "University of Jaffna",
      date: "2024-03-05",
      time: "1:00 PM",
      year: "2024",
      status: "Completed",
      participants: 80,
      description: "Industry-specific career guidance with professionals from engineering and medicine.",
      image: "university-of-jaffna.png"
    },
    {
      id: 5,
      province: "Eastern",
      university: "South Eastern University of Sri Lanka",
      date: "2024-03-10",
      time: "11:00 AM",
      year: "2024",
      status: "Completed",
      participants: 110,
      description: "Career guidance for students in the Eastern province with focus on local opportunities.",
      image: "south-eastern-university.png"
    },
    {
      id: 6,
      province: "North Western",
      university: "Wayamba University of Sri Lanka",
      date: "2024-03-15",
      time: "2:30 PM",
      year: "2024",
      status: "Completed",
      participants: 90,
      description: "Stream selection guidance for O/L completers with aptitude test analysis.",
      image: "wayamba-university.png"
    },
    {
      id: 7,
      province: "North Central",
      university: "Rajarata University of Sri Lanka",
      date: "2024-03-20",
      time: "10:00 AM",
      year: "2024",
      status: "Completed",
      participants: 85,
      description: "Career guidance for students in agriculture and engineering fields.",
      image: "rajarata-university.png"
    },
    {
      id: 8,
      province: "Uva",
      university: "Uva Wellassa University",
      date: "2024-03-25",
      time: "9:30 AM",
      year: "2024",
      status: "Completed",
      participants: 70,
      description: "Entrepreneurship and technology career pathways for Uva province students.",
      image: "uva-wellassa-university.png"
    },
    {
      id: 9,
      province: "Sabaragamuwa",
      university: "Sabaragamuwa University of Sri Lanka",
      date: "2024-03-30",
      time: "1:30 PM",
      year: "2024",
      status: "Completed",
      participants: 95,
      description: "Career guidance and motivational session for Sabaragamuwa province students.",
      image: "sabaragamuwa-university.png"
    },
    {
      id: 10,
      province: "Western",
      university: "University of Kelaniya",
      date: "2025-02-12",
      time: "10:00 AM",
      year: "2025",
      status: "TODO",
      participants: 140,
      description: "Career planning and soft skills workshop for undergraduates in the Western province.",
      image: "university-of-kelaniya.png"
    },
    {
      id: 11,
      province: "Central",
      university: "University of Sri Jayewardenepura",
      date: "2025-02-18",
      time: "2:00 PM",
      year: "2025",
      status: "TODO",
      participants: 130,
      description: "Panel discussion on emerging career trends and opportunities for Central province students.",
      image: "university-of-sri-jayewardenepura.png"
    },
    {
      id: 12,
      province: "Southern",
      university: "Ocean University of Sri Lanka",
      date: "2025-02-24",
      time: "9:00 AM",
      year: "2025",
      status: "TODO",
      participants: 90,
      description: "Guidance on marine and environmental career paths for Southern province youth.",
      image: "ocean-university.png"
    },
    {
      id: 13,
      province: "Northern",
      university: "Vavuniya Campus",
      date: "2025-03-03",
      time: "11:00 AM",
      year: "2025",
      status: "TODO",
      participants: 75,
      description: "Career guidance for technology and business management students in the Northern region.",
      image: "vavuniya-campus.png"
    },
    {
      id: 14,
      province: "Eastern",
      university: "Eastern University of Sri Lanka",
      date: "2025-03-09",
      time: "1:00 PM",
      year: "2025",
      status: "TODO",
      participants: 105,
      description: "Seminar on higher education and scholarship opportunities for Eastern province students.",
      image: "eastern-university.png"
    },
    {
      id: 15,
      province: "North Western",
      university: "University of the Visual and Performing Arts",
      date: "2025-03-14",
      time: "10:30 AM",
      year: "2025",
      status: "TODO",
      participants: 80,
      description: "Creative careers and portfolio development workshop for North Western province students.",
      image: "uvpa.png"
    },
    {
      id: 16,
      province: "North Central",
      university: "Open University of Sri Lanka (Anuradhapura)",
      date: "2025-03-19",
      time: "2:00 PM",
      year: "2025",
      status: "TODO",
      participants: 95,
      description: "Distance learning and flexible career options for North Central province youth.",
      image: "open-university-anuradhapura.png"
    },
    {
      id: 17,
      province: "Uva",
      university: "Badulla Campus",
      date: "2025-03-24",
      time: "9:30 AM",
      year: "2025",
      status: "TODO",
      participants: 65,
      description: "Entrepreneurship and innovation seminar for students in the Uva province.",
      image: "badulla-campus.png"
    },
    {
      id: 18,
      province: "Sabaragamuwa",
      university: "Sabaragamuwa University of Sri Lanka",
      date: "2025-03-29",
      time: "1:30 PM",
      year: "2025",
      status: "TODO",
      participants: 100,
      description: "Motivational session and career guidance for Sabaragamuwa province undergraduates.",
      image: "sabaragamuwa-university.png"
    }
  ];

  const provinces = ["All", ...new Set(seminars.map(s => s.province))];
  const years = ["All", ...new Set(seminars.map(s => s.year))];

  const filteredSeminars = seminars.filter(seminar => {
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
              }else{
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
                    alt={seminar.university}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <Badge className={getYearColor(seminar.year)}>
                      {seminar.year}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className={getStatusColor(seminar.status)}>
                      {seminar.status}
                    </Badge>
                  </div>
                </div>
                <CardContent className="flex flex-col flex-1 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">
                      {seminar.university}
                    </h3>
                    <span className="px-3 py-1 text-sm font-medium text-purple-600 rounded-full bg-purple-50">
                      {seminar.province} Province
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 mb-4 text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{seminar.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{seminar.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">{seminar.participants} seats</span>
                    </div>
                  </div>
                  <p className="flex-1 mb-6 leading-relaxed text-gray-600">
                    {seminar.description}
                  </p>
                  <Button
                    className="w-full mt-auto bg-purple-600 hover:bg-purple-700"
                    disabled={seminar.status === "Full"}
                  >
                    {seminar.status === "Full" ? "Registration Closed" : "Register Now"}
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