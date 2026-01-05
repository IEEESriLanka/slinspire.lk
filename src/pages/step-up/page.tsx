// src/pages/step-up/page.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Share2, MapPin, Calendar, Clock, ArrowRight, MessageCircle } from 'lucide-react';

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxylGlC8OofZg_DpFeymtV13ddD5LFo1Tn3qvSYYZ1ZaadquDDpXwRduGS7Pw6bV-DZ/exec";

const useInView = () => {
    const [inView, setInView] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const observer = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.1 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);
    return [ref, inView] as const;
};

export default function StepUpPage() {
    const [stats, setStats] = useState({ registered: 0, available: 110 });
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    const [heroRef, heroInView] = useInView();
    const [countdownRef, countdownInView] = useInView();
    const [orgRef, orgInView] = useInView();
    const [agendaRef, agendaInView] = useInView();

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const res = await fetch(GOOGLE_SCRIPT_URL + `?t=${Date.now()}`);
                const data = await res.json();
                setStats({ registered: data.count || 0, available: 110 });
            } catch (e) {}
        };
        fetchCount();
        const i = setInterval(fetchCount, 10000);
        return () => clearInterval(i);
    }, []);

    useEffect(() => {
        const target = new Date('2026-01-17T10:00:00').getTime();
        const i = setInterval(() => {
            const diff = target - Date.now();
            if (diff > 0) {
                setTimeLeft({
                    days: Math.floor(diff / 86400000),
                    hours: Math.floor((diff % 86400000) / 3600000),
                    minutes: Math.floor((diff % 3600000) / 60000),
                    seconds: Math.floor((diff % 60000) / 1000)
                });
            }
        }, 1000);
        return () => clearInterval(i);
    }, []);

    const seatsLeft = 110 - stats.registered;
    const isSoldOut = stats.registered >= 110;

    const shareEvent = () => {
        if (navigator.share) {
            navigator.share({ title: "STEP UP TO THE FUTURE 2025", url: window.location.href });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied!");
        }
    };

    return (
        <div className="bg-black text-white min-h-screen overflow-x-hidden">

            {/* NAVBAR - Fully Transparent with Larger Right Logo */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent pt-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    
                    {/* Left Logo */}
                    <img src="/step-up/logo.png" alt="IEEE" className="h-10 sm:h-12" />
                    
                    {/* Center Share Button */}
                    <button onClick={shareEvent} className="flex items-center gap-2 px-4 py-2 text-sm sm:text-base bg-white/10 rounded-full hover:bg-white/20 transition backdrop-blur-md">
                        <Share2 className="w-4 h-4 sm:w-5 sm:h-5" /> Share
                    </button>
                    
                    {/* Right Logo (Increased Size) */}
                    {/* Changed from h-12 to h-16 (mobile) and h-24 (desktop) */}
                    <img 
                        src="/step-up/YPSummit2025.png" 
                        alt="YP SUMMIT 2025" 
                        className="h-14 sm:h-24 object-contain" 
                    />
                </div>
            </nav>

            {/* HERO - With Floating Robot */}
            <section className="relative pt-24 pb-20 px-4 min-h-screen flex items-center justify-center overflow-hidden">
                
                {/* --- ROBOT LAYER START --- */}
                {/* This allows the robot to sit behind the text but in front of the black background */}
                <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none select-none z-0">
                    
                    {/* Glowing Aura behind robot */}
                    <div className="absolute w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] animate-pulse" />
                    
                    {/* Floating Robot Image */}
                    {/* Replace '/step-up/robot.png' with your actual transparent robot image */}
                    <motion.img 
                        src="/step-up/robot.png" 
                        alt="AI Companion"
                        initial={{ y: 0, opacity: 0 }}
                        animate={{ 
                            y: [0, -20, 0], // Gentle floating motion
                            opacity: 0.6 // Keep opacity slightly lower to not distract from text
                        }}
                        transition={{ 
                            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                            opacity: { duration: 1, delay: 0.5 }
                        }}
                        className="w-[300px] md:w-[500px] lg:w-[600px] object-contain drop-shadow-2xl mix-blend-lighten"
                        style={{
                            // Position it slightly to the right to balance the centered text
                            // Or keep it centered if you want it directly behind
                            transform: 'translateX(20%)' 
                        }}
                    />
                </div>
                {/* --- ROBOT LAYER END --- */}

                {/* Main Content - z-10 ensures it sits ON TOP of the robot */}
                <div ref={heroRef} className={`relative z-10 text-center transition-all duration-1000 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-6 leading-tight drop-shadow-xl">
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                            STEP UP TO THE FUTURE
                        </span>
                    </h1>
                    
                    {/* Added a subtle backdrop to text to ensure readability over the robot */}
                    <div className="inline-block relative">
                         <p className="text-2xl sm:text-4xl md:text-5xl text-gray-100 font-bold mb-6 drop-shadow-lg">
                            After A/L — Find Your Future Path
                        </p>
                    </div>

                    <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10 px-4 drop-shadow-md bg-black/30 backdrop-blur-sm rounded-xl py-2">
                        Join 110 top A/L students for the biggest career guidance event in Sri Lanka. Meet CEOs, deans, and experts — all in one day.
                    </p>
                    
                    {!isSoldOut ? (
                        <Link to="/step-up/register" className="inline-flex items-center gap-3 px-10 py-5 sm:px-14 sm:py-7 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xl sm:text-2xl font-bold hover:scale-110 transition shadow-2xl hover:shadow-purple-500/50">
                            Register Now <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8" />
                        </Link>
                    ) : (
                        <div className="text-4xl sm:text-6xl font-black text-red-500 animate-pulse">SOLD OUT</div>
                    )}
                </div>
            </section>

            {/* LIVE STATS - Mobile Grid */}
            <section className="py-12 bg-white/5 border-y border-white/10 relative z-20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <div className="grid grid-cols-3 gap-4 sm:gap-8">
                        <div>
                            <div className="text-4xl sm:text-5xl font-black text-purple-400">{stats.registered}</div>
                            <p className="text-sm sm:text-base text-gray-400 mt-2">Registered</p>
                        </div>
                        <div>
                            <div className={`text-4xl sm:text-5xl font-black ${isSoldOut ? 'text-red-500' : 'text-pink-400'}`}>
                                {isSoldOut ? 0 : seatsLeft}
                            </div>
                            <p className="text-sm sm:text-base text-gray-400 mt-2">Seats Left</p>
                        </div>
                        <div>
                            <div className="text-4xl sm:text-5xl font-black text-cyan-400">{Math.round((stats.registered / 110) * 100)}%</div>
                            <p className="text-sm sm:text-base text-gray-400 mt-2">Filled</p>
                        </div>
                    </div>
                    {seatsLeft <= 50 && seatsLeft > 0 && (
                        <p className="mt-6 text-xl sm:text-2xl font-bold text-orange-400 animate-pulse">
                            Only {seatsLeft} seats left!
                        </p>
                    )}
                </div>
            </section>

            {/* COUNTDOWN - Mobile Optimized */}
            <section ref={countdownRef} className="py-20 px-4 relative z-20">
                <h2 className="text-4xl sm:text-6xl font-black text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Event Starts In
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                    {["Days", "Hours", "Minutes", "Seconds"].map((label, i) => {
                        const value = Object.values(timeLeft)[i];
                        return (
                            <div key={label} className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/40 to-pink-600/40 rounded-3xl blur-xl" />
                                <div className="relative bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 sm:p-10 text-center">
                                    <div className="text-5xl sm:text-7xl lg:text-8xl font-black bg-gradient-to-br from-purple-300 to-pink-300 bg-clip-text text-transparent">
                                        {String(value).padStart(2, '0')}
                                    </div>
                                    <div className="text-sm sm:text-lg text-gray-400 mt-3 uppercase tracking-widest">{label}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* EVENT DESCRIPTION */}
            <section className="py-16 px-4 bg-white/5 relative z-20">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl sm:text-5xl font-black mb-8">What is STEP UP TO THE FUTURE?</h2>
                    <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                        STEP UP is Sri Lanka’s most exclusive career guidance event for A/L completed students.
                        Get direct guidance from university deans, top CEOs, and industry leaders.
                        Only 110 seats — handpicked for the most ambitious students in the country.
                    </p>
                </div>
            </section>

            {/* ORGANIZERS - Mobile Stacked */}
            <section ref={orgRef} className="py-16 px-4 relative z-20">
                <h2 className="text-4xl sm:text-5xl font-black text-center mb-12">Organized By</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {[
                        { name: "IEEE Sri Lanka INSPIRE", logo: "/logo/sli-logo.png", desc: "IEEE initiative empowering students nationwide with guidance." },
                        { name: "SL2C", logo: "/logo/yp_logo.png", desc: "SL2College strengthening student futures through mentorship and guidance." }
                    ].map((org, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            animate={orgInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: i * 0.2 }}
                            className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 text-center"
                        >
                            <img src={org.logo} alt={org.name} className="h-24 sm:h-28 mx-auto mb-6" />
                            <h3 className="text-2xl font-bold">{org.name}</h3>
                            <p className="text-gray-400 mt-4 text-sm sm:text-base">{org.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* SPEAKER & AGENDA - Mobile First */}
            <section ref={agendaRef} className="py-20 px-4 relative z-20">
                <h2 className="text-4xl sm:text-6xl font-black text-center pb-16 mb-16 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                    Featured Speaker & Agenda
                </h2>

                {/* Speaker Card - Full Width on Mobile */}
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 sm:p-10 text-center mb-12">
                        <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto mb-8">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-full blur-3xl opacity-70 animate-pulse" />
                            <div className="absolute inset-4 bg-gradient-to-br from-purple-600/50 to-pink-600/50 rounded-full blur-2xl" />
                            <div className="absolute inset-0 rounded-full overflow-hidden ring-8 ring-black/30 shadow-2xl">
                                <img src="/step-up/speacker.png" alt="Mr.Rushdi Hadhi" className="w-full h-full object-cover object-top" />
                            </div>
                        </div>
                        <h3 className="text-3xl sm:text-4xl font-black">Mr. Rushdi Hadhi</h3>
                        <p className="text-xl sm:text-2xl text-purple-300 mt-3">Senior Manager - Startup Ecosystem Development at ICTA</p>
                        <p className="text-gray-300 mt-2">Ecosystem Builder • Career Consultant • Certified HR Trainer</p>
                        <div className="mt-8 bg-white/5 rounded-2xl p-6 border border-white/10">
                            <p className="text-gray-400">Keynote Topic:</p>
                            <p className="text-2xl font-bold text-pink-300 mt-2">"After A/L — Find Your Future Path"</p>
                        </div>
                    </div>

                    {/* Agenda - Stacked on Mobile */}
                    <div className="space-y-4">
                        {[
                            { time: "09:30 AM", title: "Registration & Welcome Coffee" },
                            { time: "10:00 AM", title: "Opening Ceremony", speaker: "Organizers" },
                            { time: "10:30 AM", title: "Keynote Speech", speaker: "Mr. Rushdi Hadhi" },
                            { time: "11:30 AM", title: "University Guidance Panel" },
                            { time: "01:00 PM", title: "Networking Lunch" },
                            { time: "02:00 PM", title: "1-on-1 Career Counseling" },
                            { time: "03:30 PM", title: "Certificate Ceremony & Group Photo" },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
                                <div className="text-xl sm:text-2xl font-bold text-purple-400 w-24 sm:w-32 shrink-0">{item.time}</div>
                                <div>
                                    <h4 className="text-lg sm:text-xl font-semibold">{item.title}</h4>
                                    {item.speaker && <p className="text-purple-300 text-sm sm:text-base mt-1">{item.speaker}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* DATE, TIME & LOCATION */}
            <section className="py-16 px-4 bg-white/5 relative z-20">
                <h2 className="text-4xl sm:text-5xl font-black text-center mb-12">When & Where</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
                    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 text-center">
                        <Calendar className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                        <p className="text-2xl sm:text-3xl font-black">December 18, 2025</p>
                        <p className="text-gray-400">Wednesday</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 text-center">
                        <Clock className="w-12 h-12 mx-auto mb-4 text-pink-400" />
                        <p className="text-2xl sm:text-3xl font-black">10:00 AM - 4:00 PM</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 text-center">
                        <MapPin className="w-12 h-12 mx-auto mb-4 text-cyan-400" />
                        <p className="text-2xl sm:text-3xl font-black">TRACE Expert City</p>
                        <p className="text-gray-400">Maradana, Colombo</p>
                    </div>
                </div>
                <div className="rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.799595867144!2d79.85810001477253!3d6.916700000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2596f9d2f7e5d%3A0x8c8e0b5a5f8b8c8e!2sTrace%20Expert%20City!5e0!3m2!1sen!2slk!4v1734000000000"
                        width="100%"
                        height="400"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-24 px-4 text-center relative z-20">
                <h2 className="text-5xl sm:text-7xl font-black mb-10 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Secure Your Spot Now
                </h2>
                {!isSoldOut ? (
                    <Link to="/step-up/register" className="inline-flex items-center gap-4 px-16 py-8 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 rounded-full text-2xl sm:text-4xl font-bold hover:scale-110 transition shadow-2xl">
                        Register Now <ArrowRight className="w-10 h-10 sm:w-14 sm:h-14" />
                    </Link>
                ) : (
                    <div className="text-5xl sm:text-7xl font-black text-red-500 animate-pulse">EVENT IS FULL</div>
                )}
            </section>

            {/* WhatsApp Button */}
            <div className="fixed bottom-4 right-4 z-50">
                <a href="https://wa.me/94769851160" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-3 px-5 py-4 bg-green-600 rounded-full shadow-2xl hover:scale-110 transition text-lg font-bold">
                    <MessageCircle className="w-7 h-7" /> Help
                </a>
            </div>
        </div>
    );
}