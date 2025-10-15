import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Target, Users, BookOpen, Globe, Award, Heart } from "lucide-react";
import { VolunteeringInterest } from "./VolunteeringInterest";
import { ExternalLink } from "lucide-react";

export const GoalsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const goals = [
    {
      id: 1,
      title: "Educational Access",
      description: "Provide equal opportunities for all Sri Lankan students regardless of location or socio-economic background.",
      icon: <BookOpen className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      stats: "9 Provinces Covered"
    },
    {
      id: 2,
      title: "Career Guidance",
      description: "Help students make informed decisions about their future through comprehensive guidance sessions.",
      icon: <Target className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
      stats: "2000+ Students Guided"
    },
    {
      id: 3,
      title: "Community Building",
      description: "Create a supportive network to students with educators, and professionals across the island.",
      icon: <Users className="w-8 h-8" />,
      color: "from-green-500 to-teal-500",
      stats: "500+ Community Members"
    },
    {
      id: 4,
      title: "Global Opportunities",
      description: "Connect Sri Lankan students to international educational and career opportunities.",
      icon: <Globe className="w-8 h-8" />,
      color: "from-orange-500 to-red-500",
      stats: "50+ Global Partners"
    },
  ];

  const partners = [
    {
      id: 1,
      name: "IEEE Sri Lanka",
      logo: "ieee-blue-logo.png",
      description: "Leading professional organization for technology advancement",
      website: "https://ieee.lk",
      category: "Technology Partner"
    },
    {
      id: 2,
      name: "IFS Sri Lanka",
      logo: "ifs-logo-1.png",
      description: "Global enterprise software company supporting education",
      website: "https://ifs.com",
      category: "Sponsoring Partner"
    },
    {
      id: 3,
      name: "SL2C Sri Lanka",
      logo: "whatsapp-image-2025-04-28-at-00-14-42-3d774b8e-1.png",
      description: "Educational technology and career development organization",
      website: "#",
      category: "Educational Partner"
    }
  ];

  const sponsors = [
    { name: "University of Colombo", logo: "university-of-colombo.png" },
    { name: "University of Peradeniya", logo: "university-of-peradeniya.png" },
    { name: "University of Moratuwa", logo: "university-of-moratuwa.png" },
    { name: "University of Kelaniya", logo: "university-of-kelaniya.png" },
    { name: "University of Ruhuna", logo: "university-of-ruhuna.png" },
    { name: "University of Jaffna", logo: "university-of-jaffna.png" }
  ];

  return (
    <section id="goals" className="py-20 bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="container px-4 mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Our <span className="text-purple-600">Goals</span>
          </h2>
          <p className="max-w-3xl mx-auto text-xl leading-relaxed text-gray-600">
            What we strive to achieve through our initiatives and programs.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {goals.map((goal, index) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-lg rounded-2xl hover:shadow-xl">
                {/* Header with gradient */}
                <div className={`h-2 bg-gradient-to-r ${goal.color}`} />

                <div className="p-8">
                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${goal.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {goal.icon}
                  </div>

                  {/* Content */}
                  <h3 className="mb-4 text-2xl font-bold text-gray-900">
                    {goal.title}
                  </h3>

                  <p className="mb-6 leading-relaxed text-gray-600">
                    {goal.description}
                  </p>

                  {/* Stats */}
                  <div className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${goal.color} bg-opacity-10 text-sm font-semibold`}>
                    <span className="text-transparent bg-gradient-to-r bg-clip-text" style={{
                      backgroundImage: `linear-gradient(to right, ${goal.color.split(' ')[1]}, ${goal.color.split(' ')[3]})`
                    }}>
                      {/* {goal.stats} */}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16 mt-10 text-center"
        >
          <div className="max-w-4xl p-8 mx-auto bg-white shadow-lg rounded-2xl md:p-12">
            <h3 className="mb-6 text-3xl font-bold text-gray-900">
              Our Mission
            </h3>
            <p className="mb-8 text-xl leading-relaxed text-gray-600">
              "Physically delivering our resources more efficiently and maintaining essential data libraries on online platforms that can be used in the long run"
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="px-6 py-3 font-semibold text-purple-700 rounded-full bg-purple-50">
                #EmpowerStudents
              </div>
              <div className="px-6 py-3 font-semibold text-indigo-700 rounded-full bg-indigo-50">
                #EducationForAll
              </div>
              <div className="px-6 py-3 font-semibold text-blue-700 rounded-full bg-blue-50">
                #SriLankaInspire
              </div>
            </div>
          </div>
        </motion.div>

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
            Collaborating with leading organizations to provide guidance on the best educational opportunities for Sri Lankan students.
          </p>
        </motion.div>

        {/* Main Partners */}
        <div className="grid gap-8 mb-16 md:grid-cols-3">
          {partners.map((partner, index) => (
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
            {sponsors.map((sponsor, index) => (
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
        <VolunteeringInterest inView={inView} />
      </div>
    </section>
  );
};