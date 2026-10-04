import React from "react";
import { motion } from "framer-motion";
import { School, Award } from "lucide-react";

interface UniversityPartner {
  name: string;
  shortName: string;
  image: string;
}

export const PartnerUniversitiesTicker: React.FC = () => {
  const universities: UniversityPartner[] = [
    {
      name: "University of Moratuwa",
      shortName: "UoM",
      image: "9.png",
    },
    {
      name: "University of Peradeniya",
      shortName: "UoP",
      image: "10.png",
    },
    {
      name: "University of Ruhuna",
      shortName: "UoR",
      image: "11.png",
    },
    {
      name: "University of Sri Jayewardenepura",
      shortName: "USJ",
      image: "12.png",
    },
    {
      name: "University of Kelaniya",
      shortName: "UoK",
      image: "8.png",
    },
    {
      name: "University of Jaffna",
      shortName: "UoJ",
      image: "7.png",
    },
    {
      name: "Rajarata University of Sri Lanka",
      shortName: "RUSL",
      image: "2.png",
    },
    {
      name: "Wayamba University of Sri Lanka",
      shortName: "WUSL",
      image: "16.png",
    },
    {
      name: "Sabaragamuwa University",
      shortName: "SUSL",
      image: "3.png",
    },
    {
      name: "Uva Wellassa University",
      shortName: "UWU",
      image: "15.png",
    },
    {
      name: "South Eastern University",
      shortName: "SEUSL",
      image: "4.png",
    },
    {
      name: "University of Vavuniya, Sri Lanka",
      shortName: "UoV",
      image: "14.png",
    },
  ];

  return (
    <section className="py-12 bg-white border-y border-purple-100/70 overflow-hidden">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 text-xs font-semibold text-purple-700 bg-purple-100/70 rounded-full">
            <School className="w-3.5 h-3.5" />
            <span>State University Network</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Conducted at & Partnered with Sri Lanka's Leading State Universities
          </h2>
          <p className="text-sm text-gray-600 mt-1 max-w-2xl mx-auto">
            Inspire seminars take school students directly into university lecture halls and engineering faculties across all 9 provinces.
          </p>
        </div>

        {/* Universities Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {universities.map((uni, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-purple-50/50 hover:bg-purple-100/60 border border-purple-100/80 transition-all text-center group"
            >
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 mb-2 flex items-center justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}${"images/uni/logos/"}${uni.image}`}
                  alt={uni.name}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain filter group-hover:scale-110 transition-transform duration-200"
                  onError={(e) => {
                    // Fallback to initial badge if image fails
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>
              <span className="text-xs font-semibold text-gray-800 line-clamp-1 group-hover:text-purple-700">
                {uni.name}
              </span>
              <span className="text-[10px] font-medium text-purple-600 uppercase tracking-wider">
                {uni.shortName}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
