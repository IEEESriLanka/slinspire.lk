import { useState, useMemo } from "react";
import { teamMembers } from "@/data/team";
import { TeamMemberCard } from "./TeamMemberCard";
import { motion } from "framer-motion";

export const TeamDetailsSection = () => {
  const availableYears = useMemo(() => {
    const years = Array.from(new Set(teamMembers.map((member) => member.year)));
    return years.sort((a, b) => b - a); // Descending
  }, []);

  const [selectedYear, setSelectedYear] = useState<number>(availableYears[0]); // Default latest year

  const filteredMembers = teamMembers.filter(
    (member) => member.year === selectedYear
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8 }}
      className="p-6"
    >
      <div className="mb-16 text-center">
        <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
          Sri Lanka Inspire <br />
          Organizing Committee <span className="text-purple-600">{selectedYear}</span>
        </h2>
      </div>

      <div className="flex justify-end items-end mb-6 flex-wrap gap-4">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="border rounded px-4 py-2 bg-purple-100 text-purple-800 border-purple-300"
          aria-label="Select committee year"
        >
          {availableYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMembers.map((member) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <TeamMemberCard
              position={member.position}
              name={member.name}
              image={member.image}
              contact={member.contact}
              whatsapp={member.whatsapp}
              email={member.email}
              linkedIn={member.linkedIn}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
