import React from "react";
import { motion } from "framer-motion";

import { VolunteeringInterest } from "./VolunteeringInterest";
import { ExternalLink } from "lucide-react";
import {
  aboutUsData_aboutUs,
  aboutUsData_goals,
  aboutUsData_partners,
  aboutUsData_uniPatners
} from "../../data/AboutUSData";

export const AbousUsSection = () => {
  return (
    <section id="goals" className="py-20 bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="container px-4 mx-auto">
        {aboutUsData_aboutUs.map((ourData, index) => (
          <motion.div
            key={ourData.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, delay: index * 0.08 }}
            className="mb-16 text-center"
          >
            <div className="mx-auto max-w-4xl px-4">
              <h2 className="mb-5 text-4xl font-bold text-gray-900 md:text-5xl">
                {ourData.topic1} <span className="text-purple-600">{ourData.topic2}</span>
              </h2>
              <div className="inline-flex items-center justify-center p-4 mb-8 rounded-full bg-white/60 backdrop-blur-md border border-white/20 shadow-sm hover:scale-105 transition-transform">
                <img
                  src={ourData.logo}
                  alt={ourData.id}
                  className="h-14 md:h-20 object-contain"
                  style={{ maxWidth: 220, filter: "brightness(1.05) contrast(1.05)" }}
                />
              </div>
              <p className="mx-auto max-w-3xl text-lg text-justify leading-relaxed text-gray-700">
                {ourData.description}
              </p>
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            What <span className="text-purple-600">We Provide</span>
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {aboutUsData_goals.map((goal, index) => {
            const Icon = goal.icon;
            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group"
              >
                <div className="h-full flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-lg rounded-2xl hover:shadow-xl">
                  {/* Header with gradient */}
                  <div className={`h-2 bg-gradient-to-r ${goal.color}`} />

                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`inline-flex items-center justify-center p-3 rounded-xl bg-gradient-to-r ${goal.color} text-white group-hover:scale-105 transition-transform`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{goal.title}</h3>
                    </div>


                    <div className="mb-6">
                      <p className="leading-relaxed text-gray-600 h-30 md:h-30 lg:h-30 overflow-hidden">
                        {goal.description}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="mt-auto mb-0 flex items-center justify-between">
                      <div className={`inline-flex items-center px-4 py-1 rounded-full bg-gradient-to-r ${goal.color} bg-opacity-10 text-sm font-semibold`}>
                        <span className="text-transparent bg-gradient-to-r bg-clip-text" style={{
                          backgroundImage: `linear-gradient(to right, ${goal.color.split(' ')[1]}, ${goal.color.split(' ')[3]})`
                        }}>
                          {/* {goal.stats} */}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16 mt-10 text-center"
        >
          <div className="max-w-4xl p-8 mx-auto bg-white shadow-lg rounded-2xl md:p-12">
            <h3 className="mb-6 text-3xl font-bold text-gray-900">Our Mission</h3>
            <p className="mb-8 text-xl leading-relaxed text-gray-600">
              "Physically delivering our resources more efficiently and maintaining essential data
              libraries on online platforms that can be used in the long run"
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
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Our <span className="text-purple-600">Partners</span>
          </h2>
          <p className="max-w-3xl mx-auto text-xl leading-relaxed text-gray-600">
            Collaborating with leading organizations to provide guidance on the best educational
            opportunities for Sri Lankan students.
          </p>
        </motion.div>

        <div className="flex flex-col gap-6 mb-16">
          {aboutUsData_partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, delay: index * 0.12 }}
              className="group"
            >
              <div className="w-full flex flex-col md:flex-row items-stretch overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-lg rounded-2xl hover:shadow-xl">
                <div className="md:w-1/3 w-full flex items-center justify-center p-6 bg-gradient-to-br from-purple-50 to-indigo-50">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="object-contain max-w-full max-h-28 md:max-h-40 transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                  <div className="flex items-start md:items-center justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900">{partner.name}</h3>
                      <p className="text-sm text-gray-500 mt-1 hidden md:block">{partner.category}</p>
                    </div>
                    <div className="md:ml-4">
                      <span className="px-3 py-1 text-xs font-medium text-purple-600 rounded-full bg-purple-50">
                        {partner.category}
                      </span>
                    </div>
                  </div>
                  <p className="mb-4 leading-relaxed text-justify text-gray-600">
                    {partner.description}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-purple-600 bg-white border border-purple-100 rounded-lg shadow-sm hover:bg-purple-50 transition-colors"
                    >
                      Visit Website
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <h2 className="mb-3 text-3xl font-bold text-gray-900">University Partners</h2>
          <p className="max-w-3xl mb-8 mx-auto text-l leading-relaxed text-gray-600">
            IEEE Sri Lanka Inspire collaborates with 22 IEEE Student Branches established at
            universities across Sri Lanka, enabling the Career Compass program to reach schools in
            all nine provinces through local hosting, volunteer support, and speaker coordination.
            With these branches as on-ground partners, sessions are delivered consistently and
            contextually, ensuring equitable access to higher-education guidance and mentoring
            nationwide.
          </p>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {aboutUsData_uniPatners.map((uni, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="group"
              >
                <div className="p-4 transition-all duration-300 border border-gray-100 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg">
                  <img
                    src={`${import.meta.env.BASE_URL}${"logo/sb/"}${uni.logo}`}
                    alt={uni.name}
                    className="object-contain w-full h-16 transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <VolunteeringInterest />
      </div >
    </section >
  );
};
