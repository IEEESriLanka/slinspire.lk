// src/pages/step-up/success.tsx
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, PartyPopper, Mail, Shirt, CalendarClock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Ensure TypeScript knows about the confetti library
declare global {
    interface Window {
        confetti: any;
    }
}

export default function SuccessPage() {
    // Confetti explosion on load
    useEffect(() => {
        const fireConfetti = () => {
            if (window.confetti) {
                window.confetti({
                    particleCount: 150,
                    spread: 100,
                    origin: { y: 0.6 },
                    colors: ['#a855f7', '#ec4899', '#06b6d4', '#ffffff', '#f59e0b']
                });
            }
        };
        // Fire a few bursts for celebration
        setTimeout(fireConfetti, 500);
        setTimeout(fireConfetti, 1500);
        setTimeout(fireConfetti, 2500);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
    };

    return (
        <>
            {/* Confetti Script */}
            <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js"></script>

            <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-12 relative overflow-hidden">
                
                {/* BACKGROUND GLOWS */}
                <div className="fixed inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-600/30 rounded-full blur-[120px] animate-pulse delay-1000" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-600/20 rounded-full blur-[100px]" />
                </div>

                <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
                    
                    {/* LEFT SIDE: Relaxing Robot */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, type: "spring" }}
                        className="hidden lg:flex flex-col items-center justify-center"
                    >
                        <div className="relative">
                            {/* ROBOT: Lying Down / Relaxing Pose */}
                            {/* Animation: Slow, dreamy float since he is lying down */}
                            <motion.img 
                                src="/step-up/robot3.png" 
                                alt="Mission Accomplished"
                                animate={{ 
                                    y: [0, -15, 0],      
                                    rotate: [0, 2, 0]    
                                }}
                                transition={{ 
                                    duration: 6, 
                                    repeat: Infinity, 
                                    ease: "easeInOut" 
                                }}
                                className="w-[500px] object-contain drop-shadow-2xl z-10 relative"
                            />
                            
                            {/* Intense "Success" Glow behind him */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-green-500/20 to-cyan-500/20 blur-[80px] -z-10 animate-pulse" />
                        </div>
                        <h2 className="text-4xl font-black mt-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
                            Mission Accomplished!
                        </h2>
                    </motion.div>

                    {/* RIGHT SIDE: Success Message Glass Panel */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[3rem] p-8 sm:p-12 text-center shadow-2xl relative"
                    >
                        {/* Decorative Party Poppers */}
                        <PartyPopper className="absolute top-8 left-8 w-12 h-12 text-purple-400 rotate-12 animate-bounce opacity-50" />
                        <PartyPopper className="absolute top-8 right-8 w-12 h-12 text-pink-400 -rotate-12 animate-bounce delay-300 opacity-50" />

                        {/* Big Checkmark */}
                        <motion.div variants={itemVariants} className="mb-6 relative inline-block">
                             <div className="absolute inset-0 bg-green-500/30 blur-3xl rounded-full animate-pulse" />
                            <CheckCircle className="w-32 h-32 sm:w-40 sm:h-40 mx-auto text-green-400 drop-shadow-[0_0_25px_rgba(74,222,128,0.5)] relative z-10" />
                        </motion.div>

                        {/* Main Heading */}
                        <motion.h1
                            variants={itemVariants}
                            className="text-6xl sm:text-7xl md:text-8xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent leading-none mb-4"
                        >
                            YOU'RE IN!
                        </motion.h1>

                        <motion.p variants={itemVariants} className="text-2xl sm:text-3xl font-bold text-white">
                            Welcome to the <span className="text-purple-300">STEP UP 2025</span> family.
                        </motion.p>
                        <motion.p variants={itemVariants} className="text-gray-300 mt-2 text-lg">
                            Your seat is officially secured. Let's get you ready.
                        </motion.p>

                        {/* Info Cards (Data Chips) */}
                        <motion.div variants={containerVariants} className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                            <InfoChip 
                                icon={Mail} 
                                color="text-purple-400" 
                                title="Check Email" 
                                desc="Verification sent. Check spam too!" 
                                delay={1}
                            />
                            <InfoChip 
                                icon={Shirt} 
                                color="text-pink-400" 
                                title="Dress Code" 
                                desc="Smart Casual. Dress to impress." 
                                delay={1.2}
                            />
                             <InfoChip 
                                icon={CalendarClock} 
                                color="text-cyan-400" 
                                title="Be There" 
                                desc="Dec 18th @ 9:00 AM. Don't be late!" 
                                delay={1.4}
                            />
                        </motion.div>

                        {/* Back to Home Button */}
                        <motion.div variants={itemVariants} className="mt-12">
                            <Link
                                to="/step-up" 
                                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 rounded-full text-xl sm:text-2xl font-bold shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 overflow-hidden"
                            >
                                <span className="relative z-10">Back to Event Page</span>
                                <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition relative z-10" />
                                <div className="absolute inset-0 bg-white/20 blur-2xl group-hover:blur-3xl transition-all opacity-0 group-hover:opacity-100" />
                            </Link>
                        </motion.div>

                        <motion.p variants={itemVariants} className="mt-8 text-gray-400 text-sm">
                            See you at TRACE Expert City!
                        </motion.p>
                    </motion.div>
                </div>
            </div>
        </>
    );
}

// Info Chip Component
const InfoChip = ({ icon: Icon, color, title, desc, delay }: any) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay, type: "spring" }}
        className="bg-black/40 border border-white/10 rounded-2xl p-5 flex flex-col items-center sm:items-start text-center sm:text-left hover:bg-white/5 transition-colors group"
    >
        <div className={`p-3 rounded-full bg-white/5 mb-3 group-hover:scale-110 transition-transform ${color} drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]`}>
            <Icon className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
        <p className="text-gray-400 text-sm leading-tight">{desc}</p>
    </motion.div>
);