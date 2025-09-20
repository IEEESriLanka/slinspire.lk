import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronLeft, ChevronRight, Quote, Star, MapPin, Calendar } from "lucide-react";
import { Button } from "../ui/button";

interface FeedbackItem {
  id: number;
  name: string;
  grade: string;
  school: string;
  date: string;
  province: string;
  program: string;
  comment: string;
}

export const FeedbacksSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [feedbackData, setFeedbackData] = useState<FeedbackItem[]>([]);


  // get JSON data
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/StudentFeedbackData.json`)
      .then((res) => res.json())
      .then((data: FeedbackItem[]) => {
        setFeedbackData(data);
      })
      .catch((err) => console.error("Error loading Feedback data", err));
  }, [])

  // Auto-rotation effect
  useEffect(() => {
    if (!autoRotate) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % feedbackData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoRotate, feedbackData.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % feedbackData.length);
    setAutoRotate(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + feedbackData.length) % feedbackData.length);
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
    <section id="FeedbackData" className="py-20 bg-white">
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
          {feedbackData.length > 0 && (
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
                  {/* <div className="flex-shrink-0">
                  <div className="w-24 h-24 overflow-hidden border-4 border-white rounded-full shadow-lg md:w-32 md:h-32">
                    <img
                      src={FeedbackData[currentIndex].image}
                      alt={FeedbackData[currentIndex].name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div> */}

                  {/* Content */}
                  <div className="flex-1 text-center md:text-left">
                    {/* Quote Icon */}
                    <Quote className="w-8 h-8 mx-auto mb-4 text-purple-400 md:mx-0" />

                    {/* Rating */}
                    {/* <div className="flex justify-center mb-4 md:justify-start">
                    {[...Array(FeedbackData[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div> */}

                    {/* Comment */}
                    <p className="mb-6 text-lg italic leading-relaxed text-gray-700">
                      "{feedbackData[currentIndex].comment}"
                    </p>

                    {/* Student Info */}
                    <div className="space-y-2">
                      <h4 className="text-xl font-bold text-gray-900">
                        {feedbackData[currentIndex].name}
                      </h4>
                      <p className="text-gray-600">
                        {feedbackData[currentIndex].school} • Grade {feedbackData[currentIndex].grade}
                      </p>

                      <div className="flex flex-wrap justify-center gap-4 mt-4 md:justify-start">
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <MapPin className="w-4 h-4" />
                          {feedbackData[currentIndex].province}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          {feedbackData[currentIndex].date}
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getProgramColor(feedbackData[currentIndex].program)}`}>
                          {feedbackData[currentIndex].program}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}

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
          {feedbackData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
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
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${autoRotate
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