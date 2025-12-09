import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Brain, HeartPulse, Bot, Microscope, Cpu, Database } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata = {
    title: "Research | H-Lab",
    description: "Explore our research in AI, Healthcare Data Science, and Robot Physical AI.",
};

export default function ResearchPage() {
    const researchAreas = [
        {
            id: "robot",
            title: "Robot Physical AI",
            icon: <Bot className="h-12 w-12 text-amber-500" />,
            description: "Developing intelligent robots capable of interacting seamlessly with the physical world.",
            topics: [
                { name: "Robot Perception", icon: <Bot className="h-5 w-5" /> },
                { name: "Human-Robot Interaction", icon: <Brain className="h-5 w-5" /> },
                { name: "Sim2Real Transfer", icon: <Cpu className="h-5 w-5" /> },
            ],
            color: "bg-amber-50 dark:bg-amber-900/10",
            // borderColor: "border-amber-200 dark:border-amber-800",
        },
        {
            id: "ai",
            title: "Human Assistive AI",
            icon: <Brain className="h-12 w-12 text-primary" />,
            description: "Pushing the boundaries of machine intelligence through fundamental and applied research.",
            topics: [
                { name: "Generative Models", icon: <Cpu className="h-5 w-5" /> },
                { name: "Deep Learning Theory", icon: <Database className="h-5 w-5" /> },
                { name: "Multimodal Learning", icon: <Brain className="h-5 w-5" /> },
            ],
            color: "bg-blue-50 dark:bg-blue-900/10",
            // borderColor: "border-blue-200 dark:border-blue-800",
        },
        {
            id: "healthcare",
            title: "Healthcare Data Science",
            icon: <HeartPulse className="h-12 w-12 text-rose-500" />,
            description: "Transforming healthcare through data-driven insights and predictive modeling.",
            topics: [
                { name: "Medical Imaging Analysis", icon: <Microscope className="h-5 w-5" /> },
                { name: "EHR Data Mining", icon: <Database className="h-5 w-5" /> },
                { name: "Personalized Medicine", icon: <HeartPulse className="h-5 w-5" /> },
            ],
            color: "bg-rose-50 dark:bg-rose-900/10",
            // borderColor: "border-rose-200 dark:border-rose-800",
        },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />

            <main className="flex-grow pt-32 pb-24">
                <div className="container-custom">
                    <div className="text-center max-w-2xl mx-auto mb-20 animate-fade-in-up">
                        <h1 className="h1-hero mb-6">Research Areas</h1>
                        <p className="text-body text-[21px] leading-relaxed">
                            Our lab intersects cutting-edge AI with vital applications in healthcare and robotics.
                        </p>
                    </div>

                    <div className="space-y-32">
                        {researchAreas.map((area, index) => (
                            <div
                                key={area.id}
                                id={area.id}
                                className={cn(
                                    "flex flex-col md:flex-row gap-16 items-center",
                                    index % 2 === 1 ? "md:flex-row-reverse" : ""
                                )}
                            >
                                <div className="flex-1 space-y-6">
                                    <div className={cn("inline-flex p-5 rounded-3xl mb-4", area.color)}>
                                        {area.icon}
                                    </div>
                                    <h2 className="h2-title">{area.title}</h2>
                                    <p className="text-body text-lg">
                                        {area.description}
                                    </p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 pt-6">
                                        {area.topics.map((topic) => (
                                            <div key={topic.name} className="flex items-center gap-3 py-2 border-b border-gray-100 dark:border-gray-800">
                                                <span className="text-secondary">{topic.icon}</span>
                                                <span className="font-medium text-[15px]">{topic.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex-1 w-full">
                                    <div className={cn(
                                        "aspect-square md:aspect-[4/3] rounded-[32px] w-full border border-gray-100 dark:border-gray-800 flex items-center justify-center bg-gray-50 dark:bg-[#111] shadow-2xl shadow-gray-200/50 dark:shadow-black",
                                        // area.borderColor
                                    )}>
                                        <span className="text-secondary font-medium tracking-wide text-sm opacity-50">Visual Placeholder</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
