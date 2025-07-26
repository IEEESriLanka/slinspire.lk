import React from 'react'
import { motion } from "framer-motion";

interface VolunteeringInterestProps {
    inView: boolean;
}

export const VolunteeringInterest = ({ inView }: VolunteeringInterestProps) => {

    return (
        <>
            {/* Volunteering CTA */}
            < motion.div
                initial={{ opacity: 0, y: 30 }
                }
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1 }}
                className="p-8 mt-16 text-center bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl"
            >
                <h3 className="mb-4 text-2xl font-bold text-gray-900">
                    Interested in Volunteering?
                </h3>
                <p className="max-w-2xl mx-auto mb-6 text-gray-600">
                    Join us in our mission to empower Sri Lankan students. Let’s work together to create meaningful opportunities in education and career development.
                </p>
                <button className="px-8 py-3 font-semibold text-white transition-colors bg-purple-600 rounded-full hover:bg-purple-700">
                    Join Now
                </button>
            </motion.div >
        </>

    )
}
