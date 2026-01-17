import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Added for reliable routing
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, 
  CheckCircle2, 
  Fingerprint, 
  Terminal, 
  Play, 
  Share2, 
  ThumbsUp
} from 'lucide-react';
import Confetti from 'react-confetti';

export const LaunchCeremony = () => {
  const navigate = useNavigate(); // Hook for URL redirection
  const [phase, setPhase] = useState('standby'); 
  const [guestIndex, setGuestIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  const guests = [
    { name: "Mr. Dhammika Marasinghe", title: "Section chair 2024 - IEEE Sri Lanka Section", img: "/launch-day/img/dammika.jpg" },
    { name: "Mr. Rushdi Hadhi", title: "Founder - iChampion.lk", img: "/launch-day/img/rushdi.jpg" },
    { name: "Mr. Heshan Mallawaarachchi", title: "Chair - IEEE YP Sri Lanka", img: "/launch-day/img/heshan.jpg" },
    { name: "Mr. Priyantha", title: "School Teacher ", img: "/launch-day/img/priyantha.png" },
    { name: "Mr. Kavindra Weerasinghe", title: "Chair - IEEE Sri Lanka Inspire", img: "/oc/2025/Kavindra.jpg" },
  ];

  useEffect(() => {
    const video = document.createElement('video');
    video.src = "/launch-day/kavindraAiyaDance.mp4";
    video.preload = "auto";
  }, []);

  const handleGuestAction = () => {
    // UPDATED: Progress incremented by 20% for 5 guests
    const nextProgress = (guestIndex + 1) * 20;
    setProgress(nextProgress);
    
    if (guestIndex < guests.length - 1) {
      setTimeout(() => setGuestIndex(prev => prev + 1), 600);
    } else {
      setTimeout(() => {
        setPhase('404');
        setTimeout(() => {
          setPhase('200');
          setTimeout(() => {
            setPhase('reveal');
            if (videoRef.current) {
              videoRef.current.play().catch(e => console.log(e));
            }
          }, 2000);
        }, 4000);
      }, 1200);
    }
  };

  const handleVideoEnd = () => {
    // FIXED: Using navigate to ensure the URL changes in the browser address bar
    navigate('/'); 
  };

  return (
    <div className="fixed inset-0 bg-[#0a0a0c] text-white flex flex-col items-center overflow-y-auto font-sans no-scrollbar">
      
      {/* ANIMATED BACKGROUND */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 opacity-[0.05]" 
             style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600 blur-[150px] rounded-full" 
        />
      </div>

      <AnimatePresence mode="wait">
        
        {/* PHASE 0: STANDBY */}
        {phase === 'standby' && (
          <motion.div key="standby" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full px-6 text-center">
            <div className="flex items-center gap-8 mb-12">
              <img src="/ypsl-logo-white.png" alt="YP" className="h-10 md:h-14 w-auto" />
              <div className="w-px h-12 bg-white/20" />
              <img src="/sli-logo.png" alt="SLI" className="h-10 md:h-14 w-auto" />
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-4">
              IEEE SRI LANKA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 font-bold">INSPIRE</span>
            </h1>
            <p className="text-xl md:text-2xl font-bold tracking-[0.4em] text-white/40 uppercase mb-12">Official Website Launching Ceremony</p>
            <button onClick={() => setPhase('deployment')} className="px-20 py-6 bg-white text-black font-black rounded-3xl hover:scale-105 transition-all shadow-2xl tracking-widest uppercase">INITIATE DEPLOYMENT</button>
          </motion.div>
        )}

        {/* PHASE 1: DEPLOYMENT */}
        {phase === 'deployment' && (
          <motion.div key="deploy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full max-w-4xl px-8">
            <div className="backdrop-blur-3xl bg-white/[0.02] border border-white/10 rounded-[4rem] p-12 md:p-20 shadow-2xl w-full">
                <AnimatePresence mode="wait">
                  <motion.div key={guestIndex} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-center mb-16">
                    <img src={guests[guestIndex].img} className="w-48 h-48 rounded-full mx-auto border-4 border-indigo-500 object-cover mb-8 shadow-2xl" alt="VIP" />
                    <h2 className="text-4xl font-bold tracking-tight text-white">{guests[guestIndex].name}</h2>
                    <p className="text-indigo-400 text-sm font-black uppercase tracking-[0.3em] mt-2">{guests[guestIndex].title}</p>
                  </motion.div>
                </AnimatePresence>
                <button onClick={handleGuestAction} className="w-full py-8 bg-indigo-600 text-white rounded-3xl font-black flex items-center justify-center gap-4 text-xl tracking-widest shadow-lg">
                  <Fingerprint className="w-8 h-8" /> Authorize Phase {guestIndex + 1}
                </button>
                <div className="mt-16 space-y-4">
                  <div className="flex justify-between text-[10px] font-black tracking-[0.5em] text-gray-500">
                    <span>Uplinking Infrastructure</span>
                    <span className="text-indigo-400">{progress}%</span>
                  </div>
                  <div className="h-10 w-full bg-white/5 rounded-2xl p-2 border border-white/10 relative overflow-hidden backdrop-blur-md">
                    <motion.div animate={{ width: `${progress}%` }} className="h-full bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-400 rounded-lg shadow-xl" />
                  </div>
                </div>
            </div>
          </motion.div>
        )}

        {/* PHASE 2: 404 & PHASE 3: 200 (Keep as is) */}
        {phase === '404' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-white z-[100] flex items-center justify-center font-sans text-gray-800">
             <div className="max-w-xl p-10 border-l-4 border-gray-200">
                <h1 className="text-9xl font-light text-gray-300 mb-4">404</h1>
                <h2 className="text-3xl font-bold mb-2 uppercase tracking-tighter">Not Found</h2>
                <p className="text-lg text-gray-500 italic leading-relaxed text-left">The requested URL /deployment/main-frame was not found on this server. That's all we know.</p>
             </div>
          </motion.div>
        )}

        {phase === '200' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center">
            <CheckCircle2 className="w-32 h-32 text-green-500 mx-auto mb-8 shadow-2xl animate-pulse" />
            <h1 className="text-9xl font-black text-green-500 tracking-tighter uppercase leading-none">200 OK</h1>
            <p className="text-gray-400 font-bold tracking-[0.5em] mt-6 uppercase text-sm">Deployment Success: Systems Verified</p>
          </motion.div>
        )}

        {/* PHASE 4: THE YOUTUBE REVEAL */}
        {phase === 'reveal' && (
          <motion.div 
            key="reveal" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} 
            className="relative z-10 w-full max-w-5xl px-6 pb-24 mx-auto"
            style={{ marginTop: '80px' }} // FIXED: Decreased gap (from 200px to 80px)
          >
            <Confetti numberOfPieces={500} recycle={false} gravity={0.15} />
            
            <div className="flex flex-col gap-8">
              <div className="relative w-full bg-black rounded-xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/10 group">
                <div className="pt-16 pb-8"> {/* Internal padding fix for head visibility */}
                  <video 
                    ref={videoRef} autoPlay playsInline onEnded={handleVideoEnd}
                    className="w-full h-auto max-h-[75vh] object-contain scale-[1.05] origin-bottom" 
                  >
                    <source src="/launch-day/kavindraAiyaDance.mp4" type="video/mp4" />
                  </video>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-6">
                        <Play className="w-6 h-6 fill-white" />
                        <div className="h-1.5 w-64 bg-white/20 rounded-full"><div className="h-full w-full bg-red-600" /></div>
                    </div>
                    <div className="text-xs font-bold uppercase tracking-[0.3em] text-white/60">Live 🔴 1.2M Watching</div>
                </div>
              </div>

              <div className="text-left space-y-6">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
                  Happiest Chair in the Moment! 🚀 | SL INSPIRE 2026 Grand Launch
                </h2>
                <div className="flex flex-wrap items-center justify-between gap-8 py-6 border-b border-white/10">
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center font-black text-2xl shadow-xl">SL</div>
                        <div>
                            <p className="font-bold text-2xl tracking-tight leading-none text-white">IEEE SL Inspire</p>
                            <p className="text-sm text-white/40 font-bold uppercase mt-2">3.4M Subscribers</p>
                        </div>
                        <button className="ml-8 px-10 py-3.5 bg-white text-black font-black rounded-full text-xs uppercase tracking-widest hover:bg-gray-200 transition-all">SUBSCRIBE</button>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 bg-white/5 px-8 py-4 rounded-full text-sm font-bold border border-white/10 shadow-inner"><ThumbsUp className="w-5 h-5" /> 842K</div>
                        <div className="flex items-center gap-3 bg-white/5 px-8 py-4 rounded-full text-sm font-bold border border-white/10 shadow-inner"><Share2 className="w-5 h-5" /> Share</div>
                    </div>
                </div>
                <div className="p-8 bg-white/[0.03] rounded-[2rem] text-xl text-white/70 leading-relaxed border border-white/5 font-medium">
                    <span className="font-bold text-white uppercase tracking-wider">4.2M views • Premiered Jan 17, 2026</span> <br />
                    Celebrating the successful deployment of the SL INSPIRE National Project Platform. Mission accomplished! 🎓✨
                </div>
              </div>
            </div>
            <div className="mt-24 flex items-center justify-center gap-3 text-white/10 font-mono text-[10px] tracking-[0.6em] uppercase">
               <Terminal className="w-4 h-4" /> Final Phase: Automatic Home Redirect...
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};