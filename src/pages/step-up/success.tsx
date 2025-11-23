// src/pages/step-up/success.tsx
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, PartyPopper, Mail, Shirt, Pencil, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function SuccessPage() {
    // Confetti explosion on load
    useEffect(() => {
        const fireConfetti = () => {
            if (window.confetti) {
                window.confetti({
                    particleCount: 180,
                    spread: 80,
                    origin: { y: 0.55 },
                    colors: ['#a855f7', '#ec4899', '#06b6d4', '#10b981', '#f59e0b']
                });
            }
        };
        fireConfetti();
        const timer = setInterval(fireConfetti, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <>
            {/* Confetti Script */}
            <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js"></script>

            <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-16 relative overflow-hidden">
                {/* Floating gradient orbs */}
                <div className="fixed inset-0 -z-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/50 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-600/50 rounded-full blur-3xl animate-pulse delay-1000" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-600/40 rounded-full blur-3xl animate-pulse delay-2000" />
                </div>

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.7, type: "spring", stiffness: 200 }}
                    className="text-center max-w-4xl"
                >
                    {/* Big bouncing check + party poppers */}
                    <div className="relative mb-8">
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <CheckCircle className="w-32 h-32 sm:w-48 sm:h-48 mx-auto text-green-400 drop-shadow-2xl" />
                        </motion.div>
                        <PartyPopper className="absolute -top-8 left-1/2 -translate-x-1/2 w-20 h-20 text-yellow-400 animate-bounce" />
                        <PartyPopper className="absolute top-4 left-10 w-16 h-16 text-pink-400 rotate-12" />
                        <PartyPopper className="absolute top-4 right-10 w-16 h-16 text-cyan-400 -rotate-12" />
                    </div>

                    {/* Main joyful message */}
                    <motion.h1
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-6xl sm:text-8xl md:text-9xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent leading-tight"
                    >
                        YOU'RE IN!
                    </motion.h1>

                    <motion.p
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-2xl sm:text-4xl font-bold text-gray-200 mt-4"
                    >
                        Welcome to the STEP UP 2025 family!
                    </motion.p>

                    {/* Important Info Cards – Gifty Style */}
                    <motion.div
                        initial={{ y: 60, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
                    >
                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 text-center">
                            <Mail className="w-12 h-12 mx-auto mb-3 text-purple-400" />
                            <p className="text-xl font-bold">Verification Email</p>
                            <p className="text-gray-300 text-sm mt-2">Check your inbox (and spam) in the next 10 minutes!</p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 text-center">
                            <Shirt className="w-12 h-12 mx-auto mb-3 text-pink-400" />
                            <p className="text-xl font-bold">Dress Code</p>
                            <p className="text-gray-300 text-sm mt-2">Smart casual – look sharp!</p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 text-center">
                            <Pencil className="w-12 h-12 mx-auto mb-3 text-cyan-400" />
                            <p className="text-xl font-bold">Bring</p>
                            <p className="text-gray-300 text-sm mt-2">Notebook + pen (you’ll want to write!)</p>
                        </div>
                    </motion.div>

                    {/* Final celebration text */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.4 }}
                        className="mt-12 text-3xl sm:text-5xl font-black bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent"
                    >
                        See you on December 18th!
                    </motion.p>

                    {/* Back to Home Page Button */}
                    <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.6 }}
                        className="mt-16"
                    >
                        <Link
                            to="/"
                            className="group inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-2xl font-bold shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300"
                        >
                            Back to Home Page
                            <ArrowRight className="w-10 h-10 group-hover:translate-x-3 transition" />
                        </Link>
                    </motion.div>

                    {/* Little dancing message at the bottom */}
                    <motion.p
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="mt-20 text-4xl sm:text-6xl"
                    >
                        Let’s make history together
                    </motion.p>
                </motion.div>
            </div>
        </>
    );
}