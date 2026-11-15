import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  ChevronLeft,
  ChevronRight,
  Quote,
  MapPin,
  Calendar,
  School,
  Heart,
  Pause,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeedbackItem } from "../types";

export const FeedbacksSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [autoRotate, setAutoRotate] = useState(true);
  const [feedbackData, setFeedbackData] = useState<FeedbackItem[]>([]);

  // Load JSON data safely
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/StudentFeedbackData.json`)
      .then((res) => res.json())
      .then((data: FeedbackItem[]) => {
        setFeedbackData(data);
      })
      .catch((err) => console.error("Error loading Feedback data", err));
  }, []);

  // Auto-rotation effect
  useEffect(() => {
    if (!autoRotate || feedbackData.length === 0) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % feedbackData.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [autoRotate, feedbackData.length]);

  const nextTestimonial = () => {
    if (feedbackData.length === 0) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % feedbackData.length);
    setAutoRotate(false);
  };

  const prevTestimonial = () => {
    if (feedbackData.length === 0) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + feedbackData.length) % feedbackData.length);
    setAutoRotate(false);
  };

  const goToTestimonial = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setAutoRotate(false);
  };

  const currentItem = feedbackData[currentIndex];

  const isSinhala = (text: string) => {
    return /[\u0D80-\u0DFF]/.test(text);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.3, ease: "easeIn" },
    }),
  };

  return (
    <section ref={ref} id="feedback" className="py-24 bg-white border-t border-purple-100 overflow-hidden">
      <div className="container px-4 mx-auto max-w-6xl">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-3 text-xs font-semibold text-purple-700 bg-purple-100/70 rounded-full border border-purple-200 shadow-sm">
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
            <span>Real Student Experiences</span>
          </div>
          <h2 className="mb-4 text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Voices of Sri Lankan <span className="text-purple-600">Students</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Real feedback from school students who attended physical Career Compass seminars conducted across Sri Lankan state universities.
          </p>
        </motion.div>

        {/* Main Testimonial Showcase */}
        {feedbackData.length > 0 && currentItem && (
          <div className="relative max-w-4xl mx-auto mb-10">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="p-7 sm:p-12 shadow-xl bg-gradient-to-br from-purple-50/80 via-white to-indigo-50/80 rounded-3xl border border-purple-100 relative overflow-hidden"
              >
                {/* Background decorative quotation with gentle floating animation */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-6 -right-6 pointer-events-none"
                >
                  <Quote className="w-36 h-36 text-purple-100/70" />
                </motion.div>

                <div className="relative z-10 space-y-6">
                  {/* Top Metadata Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-purple-100">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-purple-600 text-white shadow-sm">
                        Grade {currentItem.grade} Student
                      </span>
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                        {currentItem.program}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                      <Calendar className="w-3.5 h-3.5 text-purple-500" />
                      <span>{currentItem.date}</span>
                    </div>
                  </div>

                  {/* Comment Body */}
                  <div className="relative py-2">
                    <p
                      className={`text-base sm:text-lg md:text-xl leading-relaxed text-gray-800 ${isSinhala(currentItem.comment)
                        ? "font-sinhala leading-loose text-[17px] sm:text-[19px]"
                        : "italic"
                        }`}
                    >
                      "{currentItem.comment}"
                    </p>
                  </div>

                  {/* Student & Venue Info Footer */}
                  <div className="pt-4 border-t border-purple-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <h4 className="text-sm sm:text-base font-bold text-gray-900">
                        {currentItem.name}
                      </h4>
                      <div className="flex items-center gap-1.5 text-xs text-purple-700 font-medium">
                        <School className="w-4 h-4 text-purple-600 shrink-0" />
                        <span className="line-clamp-1">{currentItem.school}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-gray-700 bg-white rounded-full border border-gray-200 shadow-sm shrink-0">
                      <MapPin className="w-3.5 h-3.5 text-purple-600" />
                      <span>{currentItem.province}</span>
                    </div>
                  </div>
                </div>

                {/* Animated countdown progress bar for auto-rotation */}
                {autoRotate && (
                  <motion.div
                    key={`progress-${currentIndex}`}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 6, ease: "linear" }}
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-600 to-indigo-600"
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Chevron Buttons */}
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-lg border border-purple-200 hover:bg-purple-50 hover:text-purple-700 text-gray-700 transition-all z-20 hover:scale-105"
              aria-label="Previous story"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-lg border border-purple-200 hover:bg-purple-50 hover:text-purple-700 text-gray-700 transition-all z-20 hover:scale-105"
              aria-label="Next story"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        )}

        {/* Carousel Indicators & Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            {feedbackData.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goToTestimonial(index)}
                aria-label={`Go to student story ${index + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${index === currentIndex
                  ? "bg-purple-600 w-8"
                  : "bg-purple-200 hover:bg-purple-300 w-2.5"
                  }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setAutoRotate(!autoRotate)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 transition-colors"
          >
            {autoRotate ? (
              <>
                <Pause className="w-3 h-3" />
                <span>Pause Auto-play</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3" />
                <span>Resume Auto-play</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};