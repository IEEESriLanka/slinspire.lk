import { Target, Users, BookOpen, Globe, Award, Heart } from "lucide-react";

export interface Goal {
    id: number;
    title: string;
    description: string;
    icon: React.ElementType;
    color: string;
    stats: string;
}
export const aboutUsData_goals: Goal[] = [
    {
        id: 1,
        title: "Educational Access",
        description: "Provide equal opportunities for all Sri Lankan students regardless of location or socio-economic background.",
        icon: BookOpen,
        color: "from-blue-500 to-cyan-500",
        stats: "9 Provinces Covered"
    },
    {
        id: 2,
        title: "Career Guidance",
        description: "Help students make informed decisions about their future through comprehensive guidance sessions.",
        icon: Target,
        color: "from-purple-500 to-pink-500",
        stats: "2000+ Students Guided"
    },
    {
        id: 3,
        title: "Community Building",
        description: "Create a supportive network to students with educators, and professionals across the island.",
        icon: Users,
        color: "from-green-500 to-teal-500",
        stats: "500+ Community Members"
    },
];

export const aboutUsData_uniPatners = [
    { name: "University of Colombo", logo: "university-of-colombo.png" },
    { name: "University of Peradeniya", logo: "university-of-peradeniya.png" },
    { name: "University of Moratuwa", logo: "university-of-moratuwa.png" },
    { name: "University of Kelaniya", logo: "university-of-kelaniya.png" },
    { name: "University of Ruhuna", logo: "university-of-ruhuna.png" },
    { name: "University of Jaffna", logo: "university-of-jaffna.png" }
];


export const aboutUsData_partners = [
    {
        id: 1,
        name: "IEEE Sri Lanka",
        logo: "ieee-blue-logo.png",
        description: "Leading professional organization for technology advancement",
        website: "https://ieee.lk",
        category: "Technology Partner"
    },
    {
        id: 2,
        name: "IFS Sri Lanka",
        logo: "ifs-logo-1.png",
        description: "Global enterprise software company supporting education",
        website: "https://ifs.com",
        category: "Sponsoring Partner"
    },
    {
        id: 3,
        name: "SL2C Sri Lanka",
        logo: "whatsapp-image-2025-04-28-at-00-14-42-3d774b8e-1.png",
        description: "Educational technology and career development organization",
        website: "#",
        category: "Educational Partner"
    }
];