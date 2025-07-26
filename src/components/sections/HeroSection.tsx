import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Users, Calendar, MapPin } from "lucide-react";
import { Button } from "../ui/button";

export const HeroSection = () => {
  const stats = [
    {
      icon: <MapPin className="w-6 h-6" />,
      label: "Island-wide sessions",
      value: "60+",
    },
    {
      icon: <Users className="w-6 h-6" />,
      label: "Students impacted",
      value: "3000+",
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      label: "Annual Seminars",
      value: "17+",
    },
  ];

  return (
    <section
      id="home"
      className="relative flex items-center justify-center min-h-screen pt-20 overflow-hidden md:pt-20 lg:pt-15"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800">
        <div className="absolute inset-0 bg-black/20" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url(students-photo-1.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-white/20"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center px-5 py-3 mb-10 transition-all duration-300 border-2 rounded-full shadow-xl backdrop-blur-lg border-white/60 bg-white/20 hover:bg-white/30"
            style={{
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
              backdropFilter: "blur(8px)",
            }}
          >
            <img
              src="ypsl-logo-white.png"
              alt="IEEE Young Professionals Sri Lanka"
              className="w-auto h-6 md:h-8 lg:h-10 drop-shadow-lg"
              style={{ maxWidth: 180, filter: "brightness(1.2) contrast(1.2)" }}
            />
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6 text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl"
          >
            Sri Lanka{" "}
            <span className="text-transparent bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text">
              INSPIRE
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-4 text-xl font-light text-purple-100 md:text-2xl"
          >
            National Project
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="max-w-2xl mx-auto mb-12 text-lg leading-relaxed md:text-xl text-white/80"
          >
            Empowering Sri Lankan students with the guidance, resources, and
            tools they need to make informed decisions about their educational and vocational pathways.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col justify-center gap-4 mb-16 sm:flex-row"
          >
            <Button
              size="lg"
              className="px-8 py-4 text-lg font-semibold text-white transition-all duration-300 bg-purple-600 rounded-full shadow-lg hover:bg-purple-700 hover:shadow-xl"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-4 text-lg font-semibold text-purple-100 transition-colors duration-300 border-purple-300 rounded-full bg-white/10 hover:bg-white/20 hover:text-purple-200 backdrop-blur-sm"
            >
              Learn More
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="grid max-w-3xl grid-cols-1 gap-8 mx-auto md:grid-cols-3"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="p-6 border bg-white/10 backdrop-blur-sm rounded-2xl border-white/20"
              >
                <div className="flex items-center justify-center mb-3 text-purple-300">
                  {stat.icon}
                </div>
                <div className="mb-1 text-2xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-purple-200">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute transform -translate-x-1/2 bottom-8 left-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex justify-center w-6 h-10 border-2 rounded-full border-white/50"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 mt-2 rounded-full bg-white/50"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
