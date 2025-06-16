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

  const [selectedProvince, setSelectedProvince] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const seminars = [
    {
      id: 1,
      province: "Western",
      university: "University of Colombo",
      date: "2025-02-15",
      time: "2:00 PM",
      category: "CAREER COMPASS",
      status: "Open",
      participants: 150,
      description: "Comprehensive career guidance session with industry professionals and alumni panel discussion.",
      image: "university-of-colombo.png"
    },
    {
      id: 2,
      province: "Central",
      university: "University of Peradeniya",
      date: "2025-02-20",
      time: "10:00 AM",
      category: "AFTER A/L",
      status: "Open",
      participants: 120,
      description: "Guidance for A/L completers on university admissions and alternative career paths.",
      image: "university-of-peradeniya.png"
    },
    {
      id: 3,
      province: "Southern",
      university: "University of Ruhuna",
      date: "2025-02-25",
      time: "9:00 AM",
      category: "AFTER O/L",
      status: "Filling Fast",
      participants: 100,
      description: "Helping O/L students choose their A/L streams and understand future opportunities.",
      image: "university-of-ruhuna.png"
    },
    {
      id: 4,
      province: "Northern",
      university: "University of Jaffna",
      date: "2025-03-05",
      time: "1:00 PM",
      category: "CAREER COMPASS",
      status: "Open",
      participants: 80,
      description: "Industry-specific career guidance with professionals from engineering and medicine.",
      image: "university-of-jaffna.png"
    },
    {
      id: 5,
      province: "Western",
      university: "University of Moratuwa",
      date: "2025-03-10",
      time: "11:00 AM",
      category: "AFTER A/L",
      status: "Open",
      participants: 200,
      description: "Technical career pathways discussion for physical science A/L students.",
      image: "university-of-moratuwa.png"
    },
    {
      id: 6,
      province: "Western",
      university: "University of Kelaniya",
      date: "2025-03-15",
      time: "2:30 PM",
      category: "AFTER O/L",
      status: "Open",
      participants: 90,
      description: "Stream selection guidance for O/L completers with aptitude test analysis.",
      image: "university-of-kelaniya.png"
    }
  ];

  const provinces = ["All", ...new Set(seminars.map(s => s.province))];
  const categories = ["All", ...new Set(seminars.map(s => s.category))];

  const filteredSeminars = seminars.filter(seminar => {
    return (selectedProvince === "All" || seminar.province === selectedProvince) &&
           (selectedCategory === "All" || seminar.category === selectedCategory);
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "CAREER COMPASS": return "bg-purple-100 text-purple-800";
      case "AFTER A/L": return "bg-blue-100 text-blue-800";
      case "AFTER O/L": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open": return "bg-green-100 text-green-800";
      case "Filling Fast": return "bg-orange-100 text-orange-800";
      case "Full": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section id="seminars" className="py-20 bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Monthly <span className="text-purple-600">Seminars</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join our island-wide career guidance seminars conducted at leading universities across all provinces.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap gap-4 justify-center mb-12"
        >
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <span className="text-gray-700 font-medium">Filter by:</span>
          </div>
          
          <select
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {provinces.map(province => (
              <option key={province} value={province}>{province} Province</option>
            ))}
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-purple-400 to-indigo-400 h-full rounded-full hidden lg:block" />

          <div className="grid gap-8 lg:gap-12">
            {filteredSeminars.map((seminar, index) => (
              <motion.div
                key={seminar.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
              >
                {/* Timeline dot */}
                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-purple-500 rounded-full border-4 border-white shadow-lg z-10" />

                {/* Content */}
                <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'}`}>
                  <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white">
                    <div className="relative h-48 overflow-hidden rounded-t-lg">
                      <img
                        src={seminar.image}
                        alt={seminar.university}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <Badge className={getCategoryColor(seminar.category)}>
                          {seminar.category}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge className={getStatusColor(seminar.status)}>
                          {seminar.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-900">
                          {seminar.university}
                        </h3>
                        <span className="text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                          {seminar.province} Province
                        </span>
                      </div>

                      <div className="flex items-center gap-4 mb-4 text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm">{seminar.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm">{seminar.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span className="text-sm">{seminar.participants} seats</span>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {seminar.description}
                      </p>

                      <Button 
                        className="w-full bg-purple-600 hover:bg-purple-700"
                        disabled={seminar.status === "Full"}
                      >
                        {seminar.status === "Full" ? "Registration Closed" : "Register Now"}
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Spacer for opposite side */}
                <div className="hidden lg:block w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};