export interface VideoCategory {
    id: number;
    name: string;
    description: string;
    image?: string;
}

export const videoCategories: VideoCategory[] = [
    {
        id: 1,
        name: "නිවැරදි දිශානතිය උසස් පෙළින් අනාගතයට",
        description: "මෙම වැඩසටහන් මාලාව හරහා, ඔබට උසස් පෙළ විෂය ක්ෂේත්‍රයන් පිළිබඳ විශ්වවිද්‍යාලීය කථිකාචාර්යවරුන් සමග පැවැත්වූ දේශන නැරඹීමට අවස්ථාව ලැබේ.  \n" +
            "\n" +
            "අධ්‍යාපනික දැනුම වර්ධනය කරගන්න, අලුත් අදහස් සොයාගන්න, සහ ඔබේ අනාගත අධ්‍යාපනික ගමන සදහා ප්‍රතිලාභ ලබා ගන්න. 🌟  ",
        image: "/categories/nd.png"
    },
    {
        id: 2,
        name: "After A/L Guidance Program",
        description: "If you’re planning to register for UGC university applications, this video series is perfect for you. From choosing the right courses to filling out your application forms and understanding all the related procedures, these videos will guide you step by step and help you solve any doubts along the way.",
        image: "/categories/al.png"
    },
    {
        id: 3,
        name: "Embedded Systems Workshop",
        description: "Embedded systems are the future of computing! Get started in the embedded world, which is a combination of electronics and software engineering, by learning the basic building blocks. In this first workshop of the workshop series, you will get an overview of the domain, what the current and future trends look like, and learn about microcontrollers",
        image: "/categories/emb.png"
    },
    {
        id: 4,
        name: "Career Compass - Career Guidance Programs",
        description: "ඔබ දැනට සාමාන්‍ය පෙළ හෝ උසස් පෙළ හදාරන පාසල් ශිෂ්‍යයෙක් නම්, ඔබේ ඉදිරි විභාග සඳහා තෝරා ගත යුතු විෂයයන් හෝ විෂය ධාරාවන් පිළිබඳව ඔබ නොදන්නේ නම්, නැතහොත් ඔබ ශ්‍රී ලංකාවේ කුමන ආකාරයේ වෘත්තීය මාර්ග තිබේද යන්න පිළිබඳ මග පෙන්වීමක් අවශ්‍ය අයෙක් නම්, මෙම වෘත්තීය මාර්ගෝපදේශන සැසිය ඔබට උපකාර වනු ඇත.",
        image: "/categories/cc.png"
    },

];