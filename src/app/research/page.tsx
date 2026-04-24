"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Brain, HeartPulse, Bot, Microscope, Cpu, Database, ChevronRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { getResearchAreas, type ProjectData, type AreaData } from "@/lib/research";

// 아이콘 매핑
const iconMap: Record<string, LucideIcon> = {
    Bot, Brain, HeartPulse, Microscope, Cpu, Database,
};

function getIcon(iconName: string, size: string = "h-5 w-5", color?: string) {
    const IconComponent = iconMap[iconName] || Bot;
    const colorClass = color ? `text-${color}` : "text-primary";
    return <IconComponent className={`${size} ${colorClass}`} />;
}

function ProjectCard({ project }: { project: ProjectData }) {
    const hasContent = project.overview || project.content || project.expectedEffects;
    const href = `/research/${project.areaId}/${project.id}`;

    const card = (
        <div className="group/card rounded-xl bg-gray-50 dark:bg-[#111] border border-gray-100 dark:border-gray-800 overflow-hidden hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
            <div className="p-4">
                <div className="flex items-start gap-3">
                    <span className="text-primary mt-0.5 transition-transform duration-300 group-hover/card:scale-110">{getIcon(project.iconName)}</span>
                    <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                            <h4 className="font-semibold text-[16px] mb-1 transition-colors duration-300 group-hover/card:text-primary">{project.title}</h4>
                            {hasContent && (
                                <span className="text-secondary transition-transform duration-300 group-hover/card:translate-x-1">
                                    <ChevronRight className="h-4 w-4" />
                                </span>
                            )}
                        </div>
                        <p className="text-secondary text-[14px] leading-relaxed">{project.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );

    if (hasContent) {
        return <Link href={href}>{card}</Link>;
    }
    return card;
}

export default function ResearchPage() {
    const researchAreas = getResearchAreas();

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />

            <main className="flex-grow pt-32 pb-24">
                <div className="container-custom">
                    <div className="text-center max-w-2xl mx-auto mb-20 animate-fade-in-up">
                        <h1 className="h1-hero mb-6">Research Areas</h1>
                        <p className="text-body text-[21px] leading-relaxed">
                            우리 연구실은 최신 AI 기술을 로보틱스와 헬스케어에 적용하여 혁신적인 연구를 진행합니다.
                        </p>
                    </div>

                    <div className="space-y-32">
                        {researchAreas.map((area, index) => (
                            <div key={area.id}>
                                <div
                                    id={area.id}
                                    className={cn(
                                        "flex flex-col md:flex-row gap-16 items-center scroll-mt-32",
                                        index % 2 === 1 ? "md:flex-row-reverse" : ""
                                    )}
                                >
                                    {/* 데스크톱: 좌측 */}
                                    <div className="flex-[1.3] flex flex-col space-y-6 order-1 md:order-none hidden md:flex">
                                        <div className="space-y-6">
                                            <div className={cn("inline-flex p-5 rounded-3xl mb-4 transition-transform duration-500 hover:scale-110 hover:rotate-3", area.color)}>
                                                {getIcon(area.iconName, "h-12 w-12", area.iconColor)}
                                            </div>
                                            <h2 className="h2-title">{area.title}</h2>
                                            <p className="text-body text-lg">{area.description}</p>
                                        </div>

                                        {area.projects.length > 0 && (
                                            <div className="space-y-6 pt-6">
                                                <h3 className="text-sm font-semibold text-secondary uppercase tracking-widest mb-4">Research Projects</h3>
                                                <div className="space-y-4">
                                                    {area.projects.map((project) => (
                                                        <ProjectCard key={project.id} project={project} />
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* 모바일: 제목 */}
                                    <div className="flex-1 space-y-6 order-1 md:hidden">
                                        <div className={cn("inline-flex p-5 rounded-3xl mb-4", area.color)}>
                                            {getIcon(area.iconName, "h-12 w-12", area.iconColor)}
                                        </div>
                                        <h2 className="h2-title">{area.title}</h2>
                                        <p className="text-body text-lg">{area.description}</p>
                                    </div>

                                    {/* 이미지/비디오 */}
                                    <div className="flex-1 w-full flex flex-col items-center gap-4 order-2 -my-[19px] md:my-0">
                                        {area.video ? (
                                            <>
                                                {area.image && (
                                                    <>
                                                        <div className="group/img aspect-square rounded-[32px] w-[52%] md:w-[85%] border border-gray-100 dark:border-gray-800 overflow-hidden bg-gray-50 dark:bg-[#111] shadow-2xl shadow-gray-200/50 dark:shadow-black relative transition-shadow duration-500 hover:shadow-3xl">
                                                            <Image src={area.image} alt={area.title} fill className="object-cover transition-transform duration-700 group-hover/img:scale-105" />
                                                        </div>
                                                        <p className="text-xs text-secondary">일러스트레이션 예시</p>
                                                    </>
                                                )}
                                                <div className="aspect-video rounded-[32px] w-[52%] md:w-[85%] border border-gray-100 dark:border-gray-800 overflow-hidden bg-gray-50 dark:bg-[#111] shadow-2xl shadow-gray-200/50 dark:shadow-black relative">
                                                    <iframe
                                                        src={area.video}
                                                        title={area.title}
                                                        className="w-full h-full"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                    />
                                                </div>
                                                <p className="text-xs text-secondary">실제 학습 시뮬레이션 장면</p>
                                            </>
                                        ) : (
                                            <>
                                                <div className="group/img aspect-square rounded-[32px] w-[52%] md:w-[85%] border border-gray-100 dark:border-gray-800 overflow-hidden bg-gray-50 dark:bg-[#111] shadow-2xl shadow-gray-200/50 dark:shadow-black relative transition-shadow duration-500 hover:shadow-3xl">
                                                    <Image
                                                        src={area.image || "/images/hero_bg_wom_v2.png"}
                                                        alt={area.title}
                                                        fill
                                                        className={cn(
                                                            "object-cover transition-transform duration-700 group-hover/img:scale-105",
                                                            area.id === "assist_ai" && "scale-150"
                                                        )}
                                                        style={area.id === "assist_ai" ? { objectPosition: "60% center" } : undefined}
                                                    />
                                                </div>
                                                <p className="text-xs text-secondary">일러스트레이션 예시</p>
                                            </>
                                        )}
                                    </div>

                                    {/* 모바일: Projects */}
                                    <div className="flex-1 space-y-6 order-3 md:hidden">
                                        {area.projects.length > 0 && (
                                            <div className="space-y-6 pt-6">
                                                <h3 className="text-sm font-semibold text-secondary uppercase tracking-widest mb-4">Research Projects</h3>
                                                <div className="space-y-4">
                                                    {area.projects.map((project) => (
                                                        <ProjectCard key={project.id} project={project} />
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {index < researchAreas.length - 1 && (
                                    <div className="mt-[82px] pt-[41px] border-t border-gray-200 dark:border-gray-800"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
