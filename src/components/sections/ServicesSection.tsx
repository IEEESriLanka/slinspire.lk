import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, BookOpen, Compass, HelpCircle, FileText, Users, MessageSquare } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

export const ServicesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const services = [
    {
      id: 1,
      title: "Career Compass Online Web",
      description: "Comprehensive career guidance system to help you discover your ideal career path with personalized recommendations.",
      icon: <Compass className="h-8 w-8" />,
      action: "Explore Careers",
      image: "career-compass.png",
      featured: true,
      color: "from-purple-500 to-indigo-600"
    },
    {
      id: 2,
      title: "Career Compass Book",
      description: "Complete guide to career options, requirements, and pathways available in Sri Lanka and internationally.",
      icon: <BookOpen className="h-8 w-8" />,
      action: "Download Book",
      image: "career-book.png",
      featured: true,
      color: "from-indigo-500 to-purple-600"
    },
    // {
    //   id: 3,
    //   title: "Question Bank",
    //   description: "Practice with thousands of categorized exam questions for O/L and A/L preparations.",
    //   icon: <HelpCircle className="h-6 w-6" />,
    //   action: "Start Practicing",
    //   image: "question-bank.png",
    //   color: "from-blue-500 to-cyan-500"
    // },
    // {
    //   id: 4,
    //   title: "Past Papers",
    //   description: "Access comprehensive collection of O/L and A/L past papers with model answers.",
    //   icon: <FileText className="h-6 w-6" />,
    //   action: "View Collection",
    //   image: "past-papers.png",
    //   color: "from-green-500 to-teal-500"
    // },
    // {
    //   id: 5,
    //   title: "Online Forum",
    //   description: "Connect with peers and experts to discuss academic topics and get guidance.",
    //   icon: <MessageSquare className="h-6 w-6" />,
    //   action: "Join Discussion",
    //   image: "online-forum.png",
    //   color: "from-orange-500 to-red-500"
    // },
    // {
    //   id: 6,
    //   title: "Mentorship Program",
    //   description: "Get paired with industry professionals and university students for personalized guidance.",
    //   icon: <Users className="h-6 w-6" />,
    //   action: "Find Mentor",
    //   image: "career-compass.png",
    //   color: "from-pink-500 to-rose-500"
    // }
  ];

  const featuredServices = services.filter(service => service.featured);
  const regularServices = services.filter(service => !service.featured);

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-purple-600">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive resources and tools designed to support your educational journey 
            and career development at every step.
          </p>
        </motion.div>

        {/* Featured Services */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {featuredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card className="group h-full overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white to-gray-50">
                <div className="relative h-64 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-90`} />
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-6xl opacity-20">
                      {service.icon}
                    </div>
                  </div>
                </div>
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${service.color} text-white mr-4`}>
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <Button
                    className={`w-full bg-gradient-to-r ${service.color} hover:shadow-lg transition-all duration-300 group`}
                    onClick={() => window.open(
                      service.action === "Explore Careers"
                        ? "/slinspire.lk/#/career-compass-web"
                        : "#",
                      "_self"
                    )}
                  >
                    {service.action}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Regular Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {regularServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: (index + 2) * 0.1 }}
            >
              <Card className="group h-full hover:shadow-xl transition-all duration-300 border-0 bg-white">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-80`} />
                  <div className="absolute top-4 left-4">
                    <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white">
                      {service.icon}
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full group hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700"
                  >
                    {service.action}
                    <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
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