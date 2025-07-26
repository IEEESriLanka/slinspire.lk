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
      title: "Degree Pathway Explorer",
      description:
        "Comprehensive degree selection system based on your qualifications and your desired career path with personalized recommendations.",
      icon: <Compass className="w-8 h-8" />,
      action: "Explore Degree Database",
      image: "career-compass.png",
      featured: true,
      color: "from-purple-500 to-indigo-600",
    },
    {
      id: 2,
      title: "Career Compass Book",
      description:
        "A complete guidance for career pathways, educational, vocational and professional qualifications available in Sri Lanka and globally.",
      icon: <BookOpen className="w-8 h-8" />,
      action: "View Career Compass Book",
      image: "career-book.png",
      featured: true,
      color: "from-indigo-500 to-purple-600",
    },
    // {
    //   id: 3,
    //   title: "Question Bank",
    //   description: "Practice with thousands of categorized exam questions for O/L and A/L preparations.",
    //   icon: <HelpCircle className="w-6 h-6" />,
    //   action: "Start Practicing",
    //   image: "question-bank.png",
    //   color: "from-blue-500 to-cyan-500"
    // },
    // {
    //   id: 4,
    //   title: "Past Papers",
    //   description: "Access comprehensive collection of O/L and A/L past papers with model answers.",
    //   icon: <FileText className="w-6 h-6" />,
    //   action: "View Collection",
    //   image: "past-papers.png",
    //   color: "from-green-500 to-teal-500"
    // },
    // {
    //   id: 5,
    //   title: "Online Forum",
    //   description: "Connect with peers and experts to discuss academic topics and get guidance.",
    //   icon: <MessageSquare className="w-6 h-6" />,
    //   action: "Join Discussion",
    //   image: "online-forum.png",
    //   color: "from-orange-500 to-red-500"
    // },
    // {
    //   id: 6,
    //   title: "Mentorship Program",
    //   description: "Get paired with industry professionals and university students for personalized guidance.",
    //   icon: <Users className="w-6 h-6" />,
    //   action: "Find Mentor",
    //   image: "career-compass.png",
    //   color: "from-pink-500 to-rose-500"
    // }
  ];

  const featuredServices = services.filter(service => service.featured);
  const regularServices = services.filter(service => !service.featured);

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container px-4 mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Our <span className="text-purple-600">Services</span>
          </h2>
          <p className="max-w-3xl mx-auto text-xl leading-relaxed text-gray-600">
            Providing guidance, tools, and resources to support your educational
            journey and career development with confidence.
          </p>
        </motion.div>

        {/* Featured Services */}
        <div className="grid gap-8 mb-16 md:grid-cols-2">
          {featuredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card className="h-full overflow-hidden transition-all duration-500 border-0 shadow-xl group hover:shadow-2xl bg-gradient-to-br from-white to-gray-50">
                <div className="relative h-64 overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-90`}
                  />
                  <img
                    src={service.image}
                    alt={service.title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl text-white opacity-20">
                      {service.icon}
                    </div>
                  </div>
                </div>
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-br ${service.color} text-white mr-4`}
                    >
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {service.title}
                    </h3>
                  </div>
                  <p className="mb-6 leading-relaxed text-gray-600">
                    {service.description}
                  </p>
                  <Button
                    className={`w-full bg-gradient-to-r ${service.color} hover:shadow-lg transition-all duration-300 group`}
                    onClick={() =>
                      window.open(
                        service.id === 1
                          ? "/slinspire.lk/#/career-compass-web"
                          : service.id === 2
                          ? "/slinspire.lk/#/career-compass-book"
                          : "#",
                        "_self"
                      )
                    }
                  >
                    {service.action}
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Regular Services Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {regularServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: (index + 2) * 0.1 }}
            >
              <Card className="h-full transition-all duration-300 bg-white border-0 group hover:shadow-xl">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-80`}
                  />
                  <div className="absolute top-4 left-4">
                    <div className="p-2 text-white rounded-lg bg-white/20 backdrop-blur-sm">
                      {service.icon}
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-bold text-gray-900">
                    {service.title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-gray-600">
                    {service.description}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full group hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700"
                  >
                    {service.action}
                    <ArrowRight className="w-3 h-3 ml-2 transition-transform group-hover:translate-x-1" />
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