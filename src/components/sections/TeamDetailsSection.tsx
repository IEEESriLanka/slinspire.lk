'use client'

import React, { useState, useMemo } from 'react';
import { ProjectTeamsDetails } from '../../data/ProjectTeamsDetails';
import { TeamMemberCard } from './TeamMemberCard.tsx';

export const TeamDetailsSection = () => {
  const availableYears = useMemo(() => {
    const years = Array.from(new Set(ProjectTeamsDetails.map(member => member.year)));
    return years.sort((a, b) => b - a); // Descending
  }, []);

  const [selectedYear, setSelectedYear] = useState<number>(availableYears[0]); // Default latest year

  const filteredMembers = ProjectTeamsDetails.filter(member => member.year === selectedYear);

  return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h1 className="text-2xl font-bold">Sri Lanka Inspire Organizing Committee</h1>
          <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="border rounded px-4 py-2"
          >
            {availableYears.map(year => (
                <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMembers.map(member => (
              <TeamMemberCard
                  key={member.id}
                  position={member.position}
                  name={member.name}
                  image={member.image}
                  contact={member.contact}
                  whatsapp={member.whatsapp}
                  email={member.email}
                  linkedIn={member.linkedIn}
              />

          ))}
        </div>
      </div>
  );
};

// Yahen --> implement team details section here
// Use ProjectTeamsDetails from src/data/ProjectTeamsDetails.ts (total number of team members is 15 for each year)
// i will update the data with real team members later
// Display team members with their position, name, contact, email, and image
//use card layout to display a team member
// Use responsive design to ensure it looks good on all devices
//if you need create separete component for team member card and import it here
//there should be a drop down to select the year (e.g., 2024, 2025)
// when a year is selected, the team members for that year should be displayed
// default should be the current year