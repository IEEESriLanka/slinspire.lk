// src/pages/step-up/register.tsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, ChevronLeft } from "lucide-react";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxylGlC8OofZg_DpFeymtV13ddD5LFo1Tn3qvSYYZ1ZaadquDDpXwRduGS7Pw6bV-DZ/exec";

export default function RegisterPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Removed 'success' state as we are redirecting immediately

    const [formData, setFormData] = useState({
        name: "", email: "", phone: "", nic: "", school: "", district: "", stream: "", field: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            nic: formData.nic.trim(),
            school: formData.school.trim(),
            district: formData.district.trim(),
            stream: formData.stream,
            field: formData.field,
        };

        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                body: JSON.stringify(payload),
                mode: "no-cors",
                headers: { "Content-Type": "text/plain" }
            });
        } catch (err) {
            console.error("Submission error", err);
        } finally {
            setLoading(false);
            // DIRECT REDIRECT TO SUCCESS PAGE
            navigate("/step-up/success");
        }
    };

    return (
        <>
            <style jsx global>{`
                input:-webkit-autofill,
                input:-webkit-autofill:hover,
                input:-webkit-autofill:focus {
                    -webkit-text-fill-color: #ffffff !important;
                    -webkit-box-shadow: 0 0 0 1000px #000000 inset !important;
                    transition: background-color 5000s ease-in-out 0s;
                }
                select option {
                    background: #0f0c29 !important;
                    color: white !important;
                    padding: 10px;
                }
            `}</style>

            <div className="min-h-screen bg-black text-white relative overflow-x-hidden flex flex-col">

                {/* BACKGROUND GLOWS */}
                <div className="fixed inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[120px] animate-pulse delay-1000" />
                </div>

                {/* NAVBAR */}
                <nav className="relative z-50 px-6 py-6 flex justify-between items-center">
                    <Link to="/step-up" className="flex items-center gap-2 text-gray-400 hover:text-white transition group">
                        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition" />
                        <span className="text-lg font-medium">Back to Event</span>
                    </Link>
                    <img src="/step-up/logo.png" alt="IEEE" className="h-8 sm:h-10 opacity-80" />
                </nav>

                {/* MAIN CONTENT */}
                <div className="flex-1 flex items-center justify-center p-4 relative z-10">
                    <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

                        {/* LEFT SIDE: Robot */}
                        <motion.div
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center lg:text-left"
                        >
                            <div className="relative inline-block mb-6 lg:mb-8">
                                <motion.img
                                    src="/step-up/robot2.png"
                                    alt="Assistant"
                                    animate={{ y: [0, -20, 0] }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                    className="w-[250px] lg:w-[400px] mx-auto lg:mx-0 object-contain drop-shadow-2xl"
                                />
                                <div className="absolute inset-0 bg-cyan-500/20 blur-[80px] -z-10" />
                            </div>

                            <h1 className="text-4xl lg:text-5xl font-black mb-4 leading-tight">
                                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    Join the Future
                                </span>
                            </h1>
                            <p className="text-lg lg:text-xl text-gray-400 max-w-md mx-auto lg:mx-0">
                                Fill in your details to secure one of the exclusive limited seats.
                            </p>
                        </motion.div>

                        {/* RIGHT SIDE: The Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="w-full max-w-xl mx-auto"
                        >
                            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <GlassInput label="Full Name" name="name" required value={formData.name} onChange={handleChange} />
                                    <GlassInput label="Email Address" name="email" type="email" required value={formData.email} onChange={handleChange} />

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <GlassInput label="WhatsApp Number" name="phone" required value={formData.phone} onChange={handleChange} />
                                        <GlassInput label="NIC Number" name="nic" required value={formData.nic} onChange={handleChange} />
                                    </div>

                                    <GlassInput label="School" name="school" required value={formData.school} onChange={handleChange} />

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <GlassSelect
                                            label="Select District"
                                            name="district"
                                            required
                                            value={formData.district}
                                            onChange={handleChange}
                                            options={[
                                                "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo",
                                                "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara",
                                                "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar",
                                                "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya",
                                                "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"
                                            ]}
                                        />
                                        <GlassSelect
                                            label="A/L Stream"
                                            name="stream"
                                            required
                                            value={formData.stream}
                                            onChange={handleChange}
                                            options={["Physical Science", "Biological Science", "Commerce", "Arts", "Technology"]}
                                        />
                                    </div>

                                    {/* <GlassSelect
                                        label="Preferred Career Field"
                                        name="field"
                                        required
                                        value={formData.field}
                                        onChange={handleChange}
                                        options={[
                                            "Administration & Secretarial Studies",
                                            "Allied Health Sciences",
                                            "Applied Sciences",
                                            "Arts (Visual & Performing)",
                                            "Aviation & Shipping",
                                            "Banking & Insurance",
                                            "Business Management",
                                            "Computer Science & IT",
                                            "Construction Related Fields",
                                            "Designing & Crafting",
                                            "Education, Teaching & Library",
                                            "Engineering",
                                            "Formal Sciences",
                                            "Hospitality, Tourism & Event Management",
                                            "Humanities & Social Sciences",
                                            "Journalism, Media & Communication",
                                            "Languages and Literature",
                                            "Law & Human Rights",
                                            "Medicine (Western & Traditional)",
                                            "Natural Science",
                                            "Religious Studies",
                                            "Sports Related Studies",
                                            "Training / Coaching"
                                        ]}
                                    /> */}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full mt-8 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 rounded-2xl text-xl font-bold text-white shadow-xl hover:shadow-purple-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 flex items-center justify-center gap-3"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="w-6 h-6 animate-spin" /> Processing...
                                            </>
                                        ) : (
                                            <>
                                                Confirm Registration <ArrowRight className="w-6 h-6" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
}

// --- REUSABLE COMPONENTS (Unchanged) ---

const GlassInput = ({ label, value, onFocus, onBlur, ...props }: any) => {
    const [isFocused, setIsFocused] = useState(false);
    const isActive = isFocused || (value && value.length > 0);

    return (
        <div className="relative group">
            <input
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-transparent focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all"
                value={value}
                onFocus={(e) => { setIsFocused(true); onFocus?.(e); }}
                onBlur={(e) => { setIsFocused(false); onBlur?.(e); }}
                {...props}
            />
            <label className={`absolute left-5 transition-all pointer-events-none px-2 rounded-md ${isActive ? "-top-2.5 text-xs text-purple-400 bg-black" : "top-4 text-gray-500 text-base bg-transparent"}`}>
                {label}
            </label>
        </div>
    );
};

const GlassSelect = ({ label, value, options, onFocus, onBlur, ...props }: any) => {
    const [isFocused, setIsFocused] = useState(false);
    const isActive = isFocused || (value && value.length > 0);

    return (
        <div className="relative group">
            <select
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all appearance-none cursor-pointer"
                value={value}
                onFocus={(e) => { setIsFocused(true); onFocus?.(e); }}
                onBlur={(e) => { setIsFocused(false); onBlur?.(e); }}
                {...props}
            >
                <option value="" disabled hidden></option>
                {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <label className={`absolute left-5 transition-all pointer-events-none px-2 rounded-md ${isActive ? "-top-2.5 text-xs text-purple-400 bg-black" : "top-4 text-gray-500 text-base bg-transparent"}`}>
                {label}
            </label>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
        </div>
    );
};