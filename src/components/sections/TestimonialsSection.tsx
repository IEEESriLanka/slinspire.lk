import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronLeft, ChevronRight, Quote, Star, MapPin, Calendar } from "lucide-react";
import { Button } from "../ui/button";

export const TestimonialsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Kasun Perera",
      school: "Royal College, Colombo",
      province: "Western Province",
      grade: "Grade 13",
      date: "January 2025",
      rating: 5,
      comment: "The career guidance sessions were instrumental in helping me make a well-informed decision about my university path. The revision workshops significantly boosted my preparation and gave me the confidence to perform well.",
      program: "CAREER COMPASS",
      image: "students-photo-1.png"
    },
    {
      id: 2,
      name: "Nimali Fernando",
      school: "Visakha Vidyalaya, Colombo",
      province: "Western Province",
      grade: "Grade 12",
      date: "December 2024",
      rating: 5,
      comment: "Sri Lanka Inspire opened my eyes to career opportunities I never knew existed. The mentorship program connected me with industry professionals who guided me towards my dream of becoming a software engineer.",
      program: "AFTER A/L",
      image: "event-photo-3.png"
    },
    {
      id: 3,
      name: "Tharindu Silva",
      school: "Ananda College, Colombo",
      province: "Western Province",
      grade: "Grade 11",
      date: "November 2024",
      rating: 5,
      comment: "The subject selection guidance was exactly what I needed. The counselors helped me understand which A/L stream would best suit my interests and career goals. Highly recommend to all O/L students!",
      program: "AFTER O/L",
      image: "workshop-photo-3.png"
    },
    {
      id: 4,
      name: "Sachini Rajapaksa",
      school: "Girls' High School, Kandy",
      province: "Central Province",
      grade: "Grade 13",
      date: "October 2024",
      rating: 5,
      comment: "The university admission guidance was comprehensive and practical. They helped me with scholarship applications and provided valuable insights about different universities and their programs.",
      program: "CAREER COMPASS",
      image: "seminar-photo-1.png"
    },
    {
      id: 5,
      name: "Chamara Wickramasinghe",
      school: "Richmond College, Galle",
      province: "Southern Province",
      grade: "Grade 12",
      date: "September 2024",
      rating: 5,
      comment: "Being from a rural area, I had limited access to career guidance. Sri Lanka Inspire changed that completely. The online resources and virtual sessions were incredibly helpful and accessible.",
      program: "AFTER A/L",
      image: "students-photo-1.png"
    },
    {
      id: 6,
      name: "Dilini Amarasinghe",
      school: "Holy Family Convent, Bambalapitiya",
      province: "Western Province",
      grade: "Grade 11",
      date: "August 2024",
      rating: 5,
      comment: "The career assessment tools helped me discover my strengths and interests. I now have a clear vision of my future career path and the steps I need to take to achieve my goals.",
      program: "CAREER COMPASS",
      image: "event-photo-3.png"
    }
  ];

  // Auto-rotation effect
  useEffect(() => {
    if (!autoRotate) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoRotate, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setAutoRotate(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setAutoRotate(false);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setAutoRotate(false);
  };

  const getProgramColor = (program: string) => {
    switch (program) {
      case "CAREER COMPASS": return "bg-purple-100 text-purple-800";
      case "AFTER A/L": return "bg-blue-100 text-blue-800";
      case "AFTER O/L": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container px-4 mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Student <span className="text-purple-600">Feedbacks</span>
          </h2>
          <p className="max-w-3xl mx-auto text-xl leading-relaxed text-gray-600">
          Hear from students who discovered new ideas and direction through our programs and guidance
          </p>
        </motion.div>

        {/* Main Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="p-8 shadow-lg bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl md:p-12"
            >
              <div className="flex flex-col items-center gap-8 md:flex-row">
                {/* Student Image */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 overflow-hidden border-4 border-white rounded-full shadow-lg md:w-32 md:h-32">
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  {/* Quote Icon */}
                  <Quote className="w-8 h-8 mx-auto mb-4 text-purple-400 md:mx-0" />

                  {/* Rating */}
                  <div className="flex justify-center mb-4 md:justify-start">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="mb-6 text-lg italic leading-relaxed text-gray-700">
                    "{testimonials[currentIndex].comment}"
                  </p>

                  {/* Student Info */}
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold text-gray-900">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-gray-600">
                      {testimonials[currentIndex].school} • {testimonials[currentIndex].grade}
                    </p>
                    
                    <div className="flex flex-wrap justify-center gap-4 mt-4 md:justify-start">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <MapPin className="w-4 h-4" />
                        {testimonials[currentIndex].province}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {testimonials[currentIndex].date}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getProgramColor(testimonials[currentIndex].program)}`}>
                        {testimonials[currentIndex].program}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            onClick={prevTestimonial}
            className="absolute transform -translate-y-1/2 bg-white shadow-lg left-4 top-1/2 hover:shadow-xl"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={nextTestimonial}
            className="absolute transform -translate-y-1/2 bg-white shadow-lg right-4 top-1/2 hover:shadow-xl"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mb-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-purple-600 w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Auto-rotation Toggle */}
        <div className="text-center">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              autoRotate 
                ? 'bg-purple-100 text-purple-700' 
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {autoRotate ? 'Pause Auto-rotation' : 'Resume Auto-rotation'}
          </button>
        </div>
      </div>
    </section>
  );
};