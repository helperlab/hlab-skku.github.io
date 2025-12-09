import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { User, Mail, GraduationCap } from "lucide-react";


export const metadata = {
    title: "Members | H-Lab",
    description: "Meet the team behind H-Lab's innovative research.",
};

interface Member {
    name: string;
    email?: string;
    title?: string;
    bio?: string;
    research?: string;
    image?: string | null;
}

const members: { role: string; people: Member[] }[] = [
    {
        role: "Principal Investigator",
        people: [
            {
                name: "Mun-Taek Choi",
                title: "Professor",
                bio: "H-Lab의 연구 책임자입니다. 주 연구 분야는 AI, 로보틱스, 헬스케어입니다.",
                email: "mtchoi@skku.edu",
                image: null
            }
        ]
    },
    {
        role: "Ph.D. Students",
        people: [
            { name: "Hyungtai Kim", email: "gudxo1229@skku.edu", research: "로봇 피지컬 AI" },
            { name: "Tae-Rim Lee", email: "lee@hlab.skku.edu", research: "로봇 피지컬 AI" },
        ]
    },
    {
        role: "Masters Students",
        people: [
            { name: "Park Ji Sung", email: "park@hlab.skku.edu", research: "생성형 AI" },
        ]
    }
];

export default function MembersPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />

            <main className="flex-grow pt-32 pb-12">
                <div className="container-custom">
                    <div className="text-center mb-10 animate-fade-in-up">
                        <h1 className="h1-hero mb-3">Our Team</h1>
                        <p className="text-body text-[21px] max-w-2xl mx-auto">
                            Physical AI의 미래를 만들어가는 연구원들입니다.
                        </p>
                    </div>

                    <div className="space-y-16">
                        {members.map((group) => (
                            <div key={group.role} className="flex flex-col items-center">
                                <h2 className="text-[32px] font-bold mb-8 border-b border-gray-100 dark:border-gray-800 pb-2 tracking-tight w-fit px-10">{group.role}</h2>
                                <div className="flex flex-col items-center gap-5">
                                    {group.people.map((person) => (
                                        <div key={person.name} className="group flex flex-col items-center text-center p-6 rounded-[32px] hover:bg-gray-50 dark:hover:bg-[#111] transition-colors duration-300 w-full max-w-md">
                                            <div className="mb-4 relative">
                                                {person.image ? (
                                                    <div className="w-32 h-32 rounded-full overflow-hidden mb-2">
                                                        {/* Image placeholder if needed, or next/image */}
                                                    </div>
                                                ) : (
                                                    <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 mb-2">
                                                        <User className="w-12 h-12" />
                                                    </div>
                                                )}
                                            </div>
                                            <h3 className="text-[24px] font-semibold text-foreground mb-2">{person.name}</h3>
                                            {person.title && <p className="text-primary text-[17px] font-medium mb-1">{person.title}</p>}
                                            {person.research && <p className="text-secondary text-[17px] mb-2">{person.research}</p>}
                                            {person.bio && <p className="text-secondary text-[15px] mt-4 max-w-sm leading-relaxed">{person.bio}</p>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div >
    );
}
