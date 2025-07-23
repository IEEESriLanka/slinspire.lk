import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Target, Users, BookOpen, Globe, Award, Heart } from "lucide-react";

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
      stats: "20+ Provinces Covered"
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
    {
      id: 5,
      title: "Excellence Recognition",
      description: "Recognize and celebrate academic achievements and career successes of our students.",
      icon: <Award className="w-8 h-8" />,
      color: "from-yellow-500 to-orange-500",
      stats: "100+ Awards Given"
    },
    {
      id: 6,
      title: "Social Impact",
      description: "Create positive social change by empowering the next generation of Sri Lankan leaders.",
      icon: <Heart className="w-8 h-8" />,
      color: "from-pink-500 to-rose-500",
      stats: "Nationwide Impact"
    }
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

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
                      {goal.stats}
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
          className="mt-16 text-center"
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
      </div>
    </section>
  );
};