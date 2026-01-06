import React from 'react';
import { Calendar, MapPin, Share2, ExternalLink, Sparkles, Home } from 'lucide-react';

// Interfaces
interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subValue?: string;
  colorClass: string;
  bgColorClass: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ icon, label, value, subValue, colorClass, bgColorClass }) => (
  <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all duration-300 group/item cursor-default relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover/item:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
    
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${bgColorClass} ${colorClass} group-hover/item:scale-110 group-hover/item:rotate-3 transition-transform duration-300 shadow-inner shrink-0`}>
      {icon}
    </div>
    <div>
      <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest font-bold mb-0.5">{label}</p>
      <p className="text-gray-100 font-semibold text-sm md:text-base tracking-wide leading-tight">{value}</p>
      {subValue && <p className="text-gray-400 text-xs mt-0.5">{subValue}</p>}
    </div>
  </div>
);

const SuccessInvitation: React.FC = () => {

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'You\'re In! - STEP UP 2026',
          text: 'I just secured my seat for STEP UP 2026 at Trace Expert City!',
          url: 'https://slinspire.ieeeyp.lk/#step-up',
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      alert('See you at Trace Expert City!');
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#030303] flex items-center justify-center overflow-x-hidden relative selection:bg-purple-500 selection:text-white font-sans py-12 lg:py-0">
      
      {/* Background Ambience */}
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none brightness-100 contrast-150 mix-blend-overlay"></div>

      {/* MAIN GRID */}
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center px-6 z-10">
        
        {/* LEFT: 3D Mascot (NOW VISIBLE ON MOBILE) */}
        {/* Changed 'hidden lg:flex' to just 'flex' and added responsive sizing */}
        <div className="flex col-span-1 lg:col-span-5 justify-center items-center relative mb-4 lg:mb-0 order-1">
           <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-transparent blur-3xl rounded-full scale-110" />
           <img 
            src="/step-up/robot3.png" 
            alt="Mascot" 
            // max-w-[200px] on mobile, max-w-[500px] on desktop
            className="relative z-10 w-full max-w-[200px] lg:max-w-[500px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-float"
          />
        </div>

        {/* RIGHT: Invitation Card */}
        <div className="col-span-1 lg:col-span-7 flex justify-center lg:justify-start order-2">
          <div className="w-full max-w-[480px] relative group perspective-1000">
            
            {/* Animated Border Glow */}
            <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-purple-500 to-blue-500 rounded-[2.5rem] opacity-30 group-hover:opacity-100 transition duration-700 blur-sm"></div>
            
            {/* CARD BODY */}
            <div className="relative bg-[#0a0a0a]/95 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl overflow-hidden">
              
              {/* Header: Congratulations Badge */}
              <div className="flex justify-between items-start mb-6">
                 <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-yellow-500/20 bg-yellow-500/5 text-yellow-400 text-[10px] font-bold tracking-[0.2em] uppercase shadow-[0_0_15px_rgba(234,179,8,0.1)]">
                    <Sparkles className="w-3 h-3" />
                    Congratulations
                 </div>
                 <div className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-gray-500 font-mono">
                    2026 EDITION
                 </div>
              </div>

              {/* Main Title */}
              <div className="mb-8">
                <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-1 text-white leading-[0.9]">
                  YOU'RE <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 animate-gradient-x">IN!</span>
                </h1>
                <p className="text-gray-400 text-sm md:text-base font-medium mt-4 leading-relaxed max-w-sm">
                  Welcome to the elite circle of <span className="text-white font-semibold">STEP UP 2026</span>. Your seat is officially reserved.
                </p>
              </div>

              {/* Details Grid */}
              <div className="space-y-3 mb-8">
                <InfoRow 
                  icon={<Calendar className="w-5 h-5" />}
                  label="Date"
                  value="January 17, 2026"
                  colorClass="text-blue-400"
                  bgColorClass="bg-blue-500/10"
                />
                <InfoRow 
                  icon={<MapPin className="w-5 h-5" />}
                  label="Venue"
                  value="Trace Expert City"
                  subValue="Maradana, Colombo"
                  colorClass="text-purple-400"
                  bgColorClass="bg-purple-500/10"
                />
              </div>

              {/* Navigation Buttons Area */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                <a 
                  href="https://slinspire.ieeeyp.lk/#step-up"
                  className="col-span-1 group/btn flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-white text-black font-bold text-sm hover:bg-gray-200 hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] text-center"
                >
                  <Home className="w-4 h-4" />
                  <span>Event Home</span>
                </a>
                
                <a 
                  href="https://slinspire.ieeeyp.lk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="col-span-1 group/btn flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-sm hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] transition-all text-center"
                >
                  <span>SL Inspire</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover/btn:text-white transition-colors" />
                </a>
              </div>

              {/* Footer */}
              <div className="border-t border-white/10 pt-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">
                     Official Invitation
                   </span>
                </div>
                
                <button 
                    onClick={handleShare}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 transition-all duration-300"
                    title="Share Ticket"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SuccessInvitation;