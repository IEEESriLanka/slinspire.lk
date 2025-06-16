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
      description: "Provide equal opportunities for all Sri Lankan students regardless of location or socioeconomic background.",
      icon: <BookOpen className="h-8 w-8" />,
      color: "from-blue-500 to-cyan-500",
      stats: "20+ Provinces Covered"
    },
    {
      id: 2,
      title: "Career Guidance",
      description: "Help students make informed decisions about their future careers through comprehensive guidance programs.",
      icon: <Target className="h-8 w-8" />,
      color: "from-purple-500 to-pink-500",
      stats: "2000+ Students Guided"
    },
    {
      id: 3,
      title: "Community Building",
      description: "Create a supportive network of students, educators, and professionals across the island.",
      icon: <Users className="h-8 w-8" />,
      color: "from-green-500 to-teal-500",
      stats: "500+ Community Members"
    },
    {
      id: 4,
      title: "Global Opportunities",
      description: "Connect Sri Lankan students with international educational and career opportunities.",
      icon: <Globe className="h-8 w-8" />,
      color: "from-orange-500 to-red-500",
      stats: "50+ Global Partners"
    },
    {
      id: 5,
      title: "Excellence Recognition",
      description: "Recognize and celebrate academic achievements and career successes of our students.",
      icon: <Award className="h-8 w-8" />,
      color: "from-yellow-500 to-orange-500",
      stats: "100+ Awards Given"
    },
    {
      id: 6,
      title: "Social Impact",
      description: "Create positive social change by empowering the next generation of Sri Lankan leaders.",
      icon: <Heart className="h-8 w-8" />,
      color: "from-pink-500 to-rose-500",
      stats: "Nationwide Impact"
    }
  ];

  return (
    <section id="goals" className="py-20 bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-purple-600">Goals</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            What we strive to achieve through our initiatives and programs across Sri Lanka.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {goals.map((goal, index) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 h-full">
                {/* Header with gradient */}
                <div className={`h-2 bg-gradient-to-r ${goal.color}`} />
                
                <div className="p-8">
                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${goal.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {goal.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {goal.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {goal.description}
                  </p>

                  {/* Stats */}
                  <div className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${goal.color} bg-opacity-10 text-sm font-semibold`}>
                    <span className="bg-gradient-to-r bg-clip-text text-transparent" style={{
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
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Our Mission
            </h3>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              "To empower every Sri Lankan student with the knowledge, resources, and opportunities 
              they need to make informed decisions about their future and achieve their full potential, 
              regardless of their background or circumstances."
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-purple-50 text-purple-700 px-6 py-3 rounded-full font-semibold">
                #EmpowerStudents
              </div>
              <div className="bg-indigo-50 text-indigo-700 px-6 py-3 rounded-full font-semibold">
                #EducationForAll
              </div>
              <div className="bg-blue-50 text-blue-700 px-6 py-3 rounded-full font-semibold">
                #SriLankaInspire
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};