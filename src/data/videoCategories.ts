export interface VideoCategory {
    id: number;
    name: string;
    description: string;
    image?: string;
}

export const videoCategories: VideoCategory[] = [
    {
        id: 4,
        name: "Career Compass - Career Guidance Programs",
        description: "An initiative aimed at Grade 10 and 11 students, providing insights into academic, vocational, and professional development opportunities.",
        image: "/categories/cc.png"
    },
    {
        id: 1,
        name: "නිවැරදි දිශානතිය උසස් පෙළින් අනාගතයට",
        description: "A virtual program series for students after O/Ls, guiding them in selecting the right A/L stream.",
        image: "/categories/nd.png"
    },
    {
        id: 2,
        name: "After A/L Guidance Program",
        description: "A dedicated video series for students after A/Ls, guiding them in choosing the right academic, vocational, and professional pathways.",
        image: "/categories/al.png"
    },
    {
        id: 3,
        name: "Embedded Systems Workshop",
        description: "This workshop explores the basics, current trends and microcontrollers to kickstart your journey into the future of computing.",
        image: "/categories/emb.png"
    },


];