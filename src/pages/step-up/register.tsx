// src/pages/step-up/register.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, CheckCircle } from "lucide-react";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxylGlC8OofZg_DpFeymtV13ddD5LFo1Tn3qvSYYZ1ZaadquDDpXwRduGS7Pw6bV-DZ/exec";

export default function RegisterPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
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
        } catch (err) { }
        finally {
            setLoading(false);
            setSuccess(true);
            setTimeout(() => navigate("/step-up/success"), 3000);
        }
    };

    return (
        <>
            <style jsx global>{`
                input:-webkit-autofill,
                input:-webkit-autofill:hover,
                input:-webkit-autofill:focus {
                    -webkit-text-fill-color: #ffffff !important;
                    -webkit-box-shadow: 0 0 0 1000px transparent inset;
                    transition: background-color 5000s ease-in-out 0s;
                }
                select option {
                    background: #1a0033 !important;
                    color: white !important;
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-20px); }
                }
                .float { animation: float 12s ease-in-out infinite; }
            `}</style>

            <div className="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6 py-12 relative overflow-hidden">
                {/* Background Orbs */}
                <div className="fixed inset-0 -z-10 pointer-events-none">
                    <div className="absolute top-10 left-10 w-72 h-72 sm:w-96 sm:h-96 bg-purple-700/50 rounded-full blur-3xl float" />
                    <div className="absolute bottom-10 right-10 w-72 h-72 sm:w-96 sm:h-96 bg-pink-700/50 rounded-full blur-3xl float delay-3000" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-96 sm:h-96 bg-cyan-700/40 rounded-full blur-3xl float delay-6000" />
                </div>

                <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-4xl">
                    {/* Header */}
                    <div className="text-center mb-10 sm:mb-16">
                        <motion.h1
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-tight bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
                        >
                            STEP UP IN TO THE FUTURE 2025
                        </motion.h1>
                        <p className="text-lg sm:text-2xl text-gray-300 mt-4">December 18 • TRACE Expert City</p>
                        <p className="text-base sm:text-xl text-red-400 font-bold mt-2">Only 110 seats • Almost gone!</p>
                    </div>

                    {/* SUCCESS */}
                    {success ? (
                        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-20">
                            <CheckCircle className="w-20 h-20 sm:w-32 sm:h-32 text-green-400 mx-auto mb-6" />
                            <h2 className="text-5xl sm:text-7xl font-black bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                                You're Registered!
                            </h2>
                            <p className="text-xl sm:text-3xl text-gray-300 mt-6">See you on December 18th</p>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
                            {/* ALL INPUTS – NO ICONS, NO TEXT, ONLY PLACEHOLDER */}
                            <GlassInput label="Full Name"        name="name"     required value={formData.name}     onChange={handleChange} />
                            <GlassInput label="Email Address"    name="email"    type="email" required value={formData.email}    onChange={handleChange} />
                            <GlassInput label="Phone Number"     name="phone"    required value={formData.phone}    onChange={handleChange} />
                            <GlassInput label="NIC Number"       name="nic"      required value={formData.nic}      onChange={handleChange} />
                            <GlassInput label="School"           name="school"   required value={formData.school}   onChange={handleChange} />
                            <GlassInput label="District"         name="district" required value={formData.district} onChange={handleChange} />

                            <GlassSelect
                                label="A/L Stream"
                                name="stream"
                                value={formData.stream}
                                onChange={handleChange}
                                options={["Biological Science", "Physical Science", "Commerce", "Arts", "Technology"]}
                                required
                            />

                            <GlassSelect
                                label="Interested Field"
                                name="field"
                                value={formData.field}
                                onChange={handleChange}
                                options={["Medicine", "Engineering", "IT & Software", "Business & Management", "Law", "Design", "Not Sure Yet"]}
                                required
                            />

                            {/* Submit Button */}
                            <div className="md:col-span-2 mt-8 sm:mt-12 flex justify-center">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="group relative w-full max-w-md px-12 py-6 sm:px-20 sm:py-8 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 rounded-3xl text-2xl sm:text-3xl font-bold shadow-2xl hover:shadow-purple-600/70 transition-all duration-500 flex items-center justify-center gap-4 overflow-hidden disabled:opacity-70"
                                >
                                    <span className="relative z-10">
                                        {loading ? "Registering..." : "Complete Registration"}
                                    </span>
                                    {loading ? (
                                        <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 animate-spin relative z-10" />
                                    ) : (
                                        <ArrowRight className="w-10 h-10 sm:w-12 sm:h-12 group-hover:translate-x-4 transition relative z-10" />
                                    )}
                                    <div className="absolute inset-0 bg-white/20 blur-2xl group-hover:blur-3xl transition-all" />
                                </button>
                            </div>
                        </form>
                    )}
                </motion.div>
            </div>
        </>
    );
}

// CLEAN INPUT – No icons, no extra text
const GlassInput = ({ label, value, onChange, ...props }: any) => (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="relative group">
        <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-purple-600/50 to-pink-600/50 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition" />
        <div className="relative bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl px-6 sm:px-10 py-5 sm:py-7">
            <input
                className="bg-transparent text-white text-base sm:text-xl w-full focus:outline-none placeholder-gray-400 caret-purple-400"
                placeholder={label}
                value={value}
                onChange={onChange}
                autoComplete="off"
                {...props}
            />
        </div>
    </motion.div>
);

// CLEAN SELECT – No icons, no extra text
const GlassSelect = ({ label, options, ...props }: any) => (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="relative group">
        <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-purple-600/50 to-pink-600/50 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition" />
        <div className="relative bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl px-6 sm:px-10 py-5 sm:py-7 flex items-center">
            <select
                className="bg-transparent text-white text-base sm:text-xl w-full focus:outline-none appearance-none cursor-pointer pr-10"
                {...props}
            >
                <option value="" disabled selected hidden>{label}</option>
                {options.map((opt: string) => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </select>
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 pointer-events-none absolute right-6 sm:right-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
            </svg>
        </div>
    </motion.div>
);