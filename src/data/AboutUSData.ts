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
        title: "Tools",
        description: "Verified degree pathways with entry requirements and a comparison feature to help students find the best-fit programs for their goals.",
        icon: Globe,
        color: "from-blue-500 to-cyan-500",
        stats: ""
    },
    {
        id: 2,
        title: "Guidance",
        description: "Career guidance sessions across all provinces to raise awareness about academic, professional, and vocational qualifications.",
        icon: Target,
        color: "from-purple-500 to-pink-500",
        stats: ""
    },
    {
        id: 3,
        title: "Resources",
        description: "Trusted, well-maintained handbooks to help individuals choose the right career paths and higher-education options.",
        icon: BookOpen,
        color: "from-green-500 to-teal-500",
        stats: ""
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
    // {
    //     id: 1,
    //     name: "IEEE Sri Lanka",
    //     logo: "ieee-blue-logo.png",
    //     description: "Leading professional organization for technology advancement",
    //     website: "https://ieee.lk",
    //     category: "Technology Partner"
    // },
    {
        id: 2,
        name: "IFS",
        logo: "logo/ifs-logo.png",
        description: "IFS is a leading global software company with a long-standing presence in Sri Lanka, known for investing significantly in technology talent, education and community development across the country. Through its dedicated outreach and the IFS Foundation, IFS partners closely with IEEE Sri Lanka Inspire to bring logistical support to the Career Compass - Career guidance program, broadening student access to university admissions guidance, scholarship pathways, technical and vocational routes, and practical career skills. IFS’s collaboration with IEEE Sri Lanka Inspire began in March 2020, has enhanced both the scale and quality of these initiatives by enabling more school and regional sessions, speaker engagements and resource sharing, thereby creating valuable connections between students and professionals. In addition to their contributions to IEEE Sri Lanka Inspire, IFS and its Foundation also support a range of broader community projects that improve education, healthcare, and employment for young people and communities throughout Sri Lanka.",
        website: "https://ifs.com",
        category: "Sponsoring Partner"
    },
    {
        id: 3,
        name: "SL2C",
        logo: "logo/sl2c-logo.png",
        description: "SL2College is a Sri Lankan educational nonprofit established in 2005 with the mission of helping students achieve their higher education goals by sharing experiences, providing guidance, and offering practical information on both local and international study options. Since partnering with IEEE Sri Lanka Inspire in 2015, SL2College has played a pivotal role in strengthening the Career Compass program by contributing volunteer mentors and specialized guidance on university admissions, scholarships, standardized tests, and program selection—particularly for students at the O/L and A/L stages preparing for higher education. The strategies and content developed through this collaboration continue to support Career Compass sessions, university-based seminars, and various school outreach activities, where ambassadors and mentors share practical timelines, decision pathways, and real-life experiences to help students make confident, well-informed choices. Beyond its collaboration with IEEE Sri Lanka Inspire, SL2College continues its broader mission through webinars, an active ambassador network, and ongoing mentorship, empowering students to navigate higher education opportunities in Sri Lanka and beyond.",
        website: "https://web.facebook.com/sl2college/",
        category: "Educational Partner"
    }
];

export const aboutUsData_aboutUs = [
    {
        id: "slinspire",
        topic1: "About",
        topic2: "SLInspire",
        logo: "logo/sli-logo.png",
        description: "IEEE Sri Lanka Inspire (SLInspire) began as a collaborative effort by IEEE  Sri Lanka Section and SL2College to close guidance gaps for school students at key stages in their studies, and it has grown from University‑based seminars into a steady, island‑wide program built on mentorship, partnerships, and practical, student‑focused resources. Over time, shaped by feedback from teachers, counselors and students, IEEE Sri Lanka Inspire strengthened its Career Guidance series and mentoring to show clear routes into higher education, scholarships, technical and vocational options and early career skills. Today, IEEE Sri Lanka Inspire works across all provinces as a national volunteer network under the IEEE Young Professionals Sri Lanka, offering structured outreach, clear guidance, and easy‑to‑use resources that help pre university students - O/L and A/L students to make confident, informed choices. For the nation, IEEE Sri Lanka Inspire promotes fair access to opportunity, supports talent pipelines with industry‑relevant skills, and builds a culture of mentorship and civic responsibility, ensuring students, regardless of location, can navigate higher education and contribute meaningfully to Sri Lanka’s knowledge, economy and social progress."
    },
    {
        id: "ypsl",
        topic1: "About",
        topic2: "YPSL",
        logo: "logo/ypsl-logo.png",
        description: "IEEE Young Professionals Sri Lanka formed in October 2011 is an integral part of the IEEE Sri Lanka Section. IEEE Young Professionals is a group of IEEE members and volunteers who have graduated with their first professional degree within the past 15 years. It is an international community, whose members are interested in elevating their professional image, expanding their global network, connecting with peers locally and giving back to their community. Since it encompasses all members from recent university graduates to experienced professionals and entrepreneurs, the group is highly diverse in what it offers."
    }
]