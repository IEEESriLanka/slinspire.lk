import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { School } from "lucide-react";

interface UniversityPartner {
  name: string;
  shortName: string;
  image: string;
}

export const PartnerUniversitiesTicker: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
    <section ref={ref} className="py-14 bg-white border-y border-purple-100/70 overflow-hidden">
      <div className="container px-4 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center gap-2 px-3.5 py-1 mb-3 text-xs font-semibold text-purple-700 bg-purple-100/80 rounded-full border border-purple-200/80 shadow-sm"
          >
            <School className="w-3.5 h-3.5 text-purple-600" />
            <span>State University Network</span>
          </motion.div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            Conducted at & Partnered with Sri Lanka's Leading State Universities
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-2xl mx-auto">
            Inspire seminars take school students directly into university lecture halls and engineering faculties across all 9 provinces.
          </p>
        </motion.div>

        {/* Universities Grid with Staggered Scroll Entrance */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {universities.map((uni, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.04 }}
              whileHover={{ y: -6, scale: 1.04 }}
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-purple-50/40 hover:bg-purple-100/60 border border-purple-100/80 hover:border-purple-300 transition-all text-center group shadow-sm hover:shadow-md cursor-default"
            >
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 mb-2 flex items-center justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}images/uni/logos/${uni.image}`}
                  alt={uni.name}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain filter group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>
              <span className="text-xs font-semibold text-gray-800 line-clamp-1 group-hover:text-purple-700 transition-colors">
                {uni.name}
              </span>
              <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider mt-0.5">
                {uni.shortName}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
