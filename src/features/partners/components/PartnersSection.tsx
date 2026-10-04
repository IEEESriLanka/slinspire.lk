import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink } from "lucide-react";
import { mainPartners, universityPartners } from "@/data/partners";
import { VolunteeringInterest } from "./VolunteeringInterest";

export const PartnersSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="partners" className="py-20 bg-white">
      <div className="container px-4 mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Our <span className="text-purple-600">Partners</span>
          </h2>
          <p className="max-w-3xl mx-auto text-xl leading-relaxed text-gray-600">
            Collaborating with leading organizations to provide guidance on the
            best educational opportunities for Sri Lankan students.
          </p>
        </motion.div>

        {/* Main Partners */}
        <div className="grid gap-8 mb-16 md:grid-cols-3">
          {mainPartners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group"
            >
              <div className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-lg rounded-2xl hover:shadow-xl">
                <div className="flex items-center justify-center h-48 p-8 bg-gradient-to-br from-purple-50 to-indigo-50">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="object-contain max-w-full max-h-full transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900">
                      {partner.name}
                    </h3>
                    <span className="px-2 py-1 text-xs font-medium text-purple-600 rounded-full bg-purple-50">
                      {partner.category}
                    </span>
                  </div>

                  <p className="mb-4 leading-relaxed text-gray-600">
                    {partner.description}
                  </p>

                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center font-medium text-purple-600 transition-colors hover:text-purple-700"
                  >
                    Visit Website
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* University Partners */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <h3 className="mb-8 text-2xl font-bold text-gray-900">
            University Partners
          </h3>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
            {universityPartners.map((sponsor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="group"
              >
                <div className="p-4 transition-all duration-300 border border-gray-100 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg">
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="object-contain w-full h-16 transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        {/* Volunteering CTA */}
        <VolunteeringInterest />
      </div>
    </section>
  );
};
