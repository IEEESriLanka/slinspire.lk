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

export const aboutUsData_aboutUs = [
    {
        id: "slinspire",
        topic1: "About",
        topic2: "SLInspire",
        logo: "logo/sli-logo.png",
        description: "IEEE Sri Lanka Inspire (SLI) began as a collaborative effort by IEEE  Sri Lanka Section and SL2College to close guidance gaps for school students at key stages in their studies, and it has grown from university‑based seminars into a steady, island‑wide program built on mentorship, partnerships, and practical, student‑focused resources. Over time, shaped by feedback from teachers, counselors and students, IEEE Sri Lanka Inspire strengthened its Career Compass series and mentoring to show clear routes into higher education, scholarships, technical and vocational options, and early career skills. Today, IEEE Sri Lanka Inspire works across all provinces as a national volunteer network, offering structured outreach, clear guidance, and easy‑to‑use resources that help pre university students - O/L and A/L students to make confident, informed choices. For the nation, IEEE Sri Lanka Inspire promotes fair access to opportunity, supports talent pipelines with industry‑relevant skills, and builds a culture of mentorship and civic responsibility, ensuring students, regardless of location, can navigate higher education and contribute meaningfully to Sri Lanka’s knowledge, economy and social progress."
    },
    {
        id: "ypsl",
        topic1: "About",
        topic2: "YPSL",
        logo: "logo/ypsl-logo.png",
        description: "IEEE Young Professionals Sri Lanka formed in October 2011 is an integral part of the IEEE Sri Lanka Section. IEEE Young Professionals is a group of IEEE members and volunteers who have graduated with their first professional degree within the past 15 years. It is an international community, whose members are interested in elevating their professional image, expanding their global network, connecting with peers locally and giving back to their community. Since it encompasses all members from recent university graduates to experienced professionals and entrepreneurs, the group is highly diverse in what it offers."
    }
]