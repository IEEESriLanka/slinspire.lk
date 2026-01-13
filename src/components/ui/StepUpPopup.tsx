import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Sparkles, ArrowRight, Calendar, MapPin, Clock, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const StepUpPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => setIsOpen(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-xl z-[9998]"
            onClick={handleClose}
          />

          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              className="relative bg-[#05010d] rounded-[2.5rem] border border-white/10 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto overflow-x-hidden no-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* MOBILE OPTIMIZED CLOSE BUTTON */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-[100] bg-white text-black rounded-full p-3 shadow-lg active:scale-95 transition-transform md:bg-white/10 md:text-white md:hover:bg-white/20"
                aria-label="Close popup"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex flex-col md:flex-row">
                
                {/* Visual Side */}
                <div className="relative w-full md:w-[40%] bg-gradient-to-br from-purple-900/30 to-transparent p-6 md:p-12 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/5">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-28 md:w-full max-w-[200px]"
                  >
                    <div className="absolute inset-0 bg-purple-500/30 blur-[50px] rounded-full" />
                    <img 
                      src="/step-up/robot.png" 
                      alt="Step Up" 
                      className="relative z-10 w-full h-auto drop-shadow-2xl"
                    />
                  </motion.div>

                  <div className="mt-4 text-center">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-purple-400 font-bold">Guest Speaker</span>
                    <h4 className="text-white font-semibold text-base mt-1">Mr. Rushdi Hadhi</h4>
                    <p className="text-gray-400 text-[11px]">Career Consultant & Coach</p>
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full md:w-[60%] p-6 md:p-10 flex flex-col">
                  {/* Badge */}
                  <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1 self-start mb-6">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-medium text-gray-300 uppercase">Registration Open • 110 Seats</span>
                  </div>

                  <h2 className="text-2xl md:text-4xl font-extrabold text-white leading-tight mb-3">
                    Step Up to <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                      The Future
                    </span>
                  </h2>

                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-6">
                    Explore higher education and career opportunities after A/Ls with industry experts.
                  </p>

                  {/* Info Grid - Adaptive for Mobile */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-4 mb-6">
                    <div className="flex flex-col gap-1 p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                      <Calendar className="w-4 h-4 text-purple-400" />
                      <p className="text-[9px] text-gray-500 uppercase font-bold">Date</p>
                      <p className="text-xs text-white font-medium">Jan 17, 2026</p>
                    </div>
                    <div className="flex flex-col gap-1 p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                      <Clock className="w-4 h-4 text-pink-400" />
                      <p className="text-[9px] text-gray-500 uppercase font-bold">Time</p>
                      <p className="text-xs text-white font-medium">9AM—1PM</p>
                    </div>
                    <div className="col-span-2 sm:col-span-1 flex flex-col gap-1 p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                      <MapPin className="w-4 h-4 text-blue-400" />
                      <p className="text-[9px] text-gray-500 uppercase font-bold">Venue</p>
                      <p className="text-xs text-white font-medium truncate">TRACE Expert City</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-3">
                    <Link
                      to="/step-up/register"
                      onClick={handleClose}
                      className="w-full bg-white text-black py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 active:scale-95"
                    >
                      Register Now
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <a
                      href="#/step-up"
                      onClick={handleClose}
                      className="w-full bg-white/5 border border-white/10 text-white py-4 rounded-2xl font-bold text-center active:bg-white/10"
                    >
                      Learn More
                    </a>
                    
                    {/* MOBILE ONLY DISMISS */}
                    <button 
                      onClick={handleClose}
                      className="md:hidden text-gray-500 text-xs font-medium py-2 hover:text-gray-300"
                    >
                      Maybe Later
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};