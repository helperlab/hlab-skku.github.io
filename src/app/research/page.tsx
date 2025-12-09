"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Brain, HeartPulse, Bot, Microscope, Cpu, Database, ChevronDown, ChevronUp, Play, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { BASE_PATH } from "@/lib/constants";

// ProjectCard 컴포넌트
function ProjectCard({ project }: { project: any }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const hasContent = project.detailedDescription || (project.images && project.images.length > 0) || (project.videos && project.videos.length > 0);

    return (
        <>
            <div className="rounded-xl bg-gray-50 dark:bg-[#111] border border-gray-100 dark:border-gray-800 overflow-hidden hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition-colors">
                <div 
                    className={cn(
                        "p-4",
                        hasContent && "cursor-pointer hover:bg-gray-100 dark:hover:bg-[#1a1a1a]"
                    )}
                    onClick={() => hasContent && setIsModalOpen(true)}
                >
                    <div className="flex items-start gap-3">
                        <span className="text-primary mt-0.5">{project.icon}</span>
                        <div className="flex-1">
                            <div className="flex items-center justify-between gap-2">
                                <h4 className="font-semibold text-[16px] mb-1">{project.title}</h4>
                                {hasContent && (
                                    <span className="text-secondary">
                                        <ChevronDown className="h-4 w-4" />
                                    </span>
                                )}
                            </div>
                            <p className="text-secondary text-[14px] leading-relaxed">{project.description}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 모달 */}
            {isModalOpen && hasContent && (
                <ProjectModal project={project} onClose={() => setIsModalOpen(false)} />
            )}
        </>
    );
}

// ProjectModal 컴포넌트
function ProjectModal({ project, onClose }: { project: any; onClose: () => void }) {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        document.addEventListener("keydown", handleEscape);
        document.body.style.overflow = "hidden"; // 모달 열릴 때 배경 스크롤 방지
        
        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [onClose]);

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div 
                className="relative w-full max-w-5xl max-h-[90vh] bg-background rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* 헤더 */}
                <div className="flex items-start justify-between p-6 border-b border-gray-200 dark:border-gray-800">
                    <div className="flex items-start gap-4 flex-1">
                        <span className="text-primary mt-1">{project.icon}</span>
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                            <p className="text-secondary">{project.description}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="ml-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        aria-label="Close"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* 내용 (스크롤 가능) */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* 상세 설명 */}
                    {project.detailedDescription && (
                        <div>
                            <h4 className="text-lg font-semibold mb-3">Description</h4>
                            <p className="text-secondary leading-relaxed whitespace-pre-line">
                                {project.detailedDescription}
                            </p>
                        </div>
                    )}

                    {/* 이미지 갤러리 */}
                    {project.images && project.images.length > 0 && (
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Images</h4>
                            <div className="flex flex-col items-center gap-4">
                                {project.images.map((img: string, imgIdx: number) => (
                                    <div key={imgIdx} className="relative w-full max-w-3xl aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-[#1a1a1a]">
                                        <Image
                                            src={img}
                                            alt={`${project.title} - Image ${imgIdx + 1}`}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 동영상 */}
                    {project.videos && project.videos.length > 0 && (
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Videos</h4>
                            <div className="flex flex-col items-center gap-4">
                                {project.videos.map((video: any, vidIdx: number) => (
                                    <div key={vidIdx} className="relative w-full max-w-3xl aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-[#1a1a1a]">
                                        <iframe
                                            src={video.url}
                                            title={video.title || `${project.title} - Video ${vidIdx + 1}`}
                                            className="w-full h-full"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 외부 링크 */}
                    {project.url && (
                        <div>
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                            >
                                자세히 보기 →
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function ResearchPage() {
    const researchAreas = [
        {
            id: "robot",
            title: "Robot Physical AI",
            icon: <Bot className="h-12 w-12 text-amber-500" />,
            description: "Developing robotic intelligence capable of interacting seamlessly with the physical world.",
            topics: [
                { name: "Robot Perception", icon: <Bot className="h-5 w-5" /> },
                { name: "Generative Learning Models", icon: <Brain className="h-5 w-5" /> },
                { name: "Sim2Real Transfer", icon: <Cpu className="h-5 w-5" /> },
            ],
            projects: [
                {
                    title: "Person Following Robot",
                    description: "딥러닝 기반 실시간 사람 추적 및 추종 로봇 개발",
                    icon: <Bot className="h-5 w-5" />,
                    detailedDescription: "본 연구는 딥러닝 기반의 실시간 사람 추적 및 추종 로봇을 개발합니다. YOLO와 DeepSORT 알고리즘을 결합하여 실시간으로 사람을 인식하고 추적하며, 로봇의 이동 경로를 최적화합니다.",
                    images: [
                        `${BASE_PATH}/images/robot_physical_ai.png`,
                        // `${BASE_PATH}/images/project1_img2.png`, // 추가 이미지 예시
                    ],
                    videos: [
                        // { url: "https://www.youtube.com/embed/VIDEO_ID", title: "데모 동영상" },
                    ],
                    // url: "https://example.com/project1", // 선택사항
                },
                {
                    title: "Sim2Real Transfer Learning",
                    description: "시뮬레이션 환경에서 학습한 모델을 실제 환경에 적용하는 연구",
                    icon: <Cpu className="h-5 w-5" />,
                    detailedDescription: "시뮬레이션 환경에서 학습한 모델을 실제 로봇 환경에 적용하기 위한 도메인 적응 기법을 연구합니다. Domain Randomization과 Adversarial Training을 활용하여 시뮬레이션과 실제 환경 간의 차이를 최소화합니다.",
                    images: [
                        `${BASE_PATH}/images/robot_physical_ai.png`,
                    ],
                },
                {
                    title: "Robot Manipulation",
                    description: "로봇 팔을 이용한 물체 조작 및 학습 연구",
                    icon: <Bot className="h-5 w-5" />,
                    detailedDescription: "강화학습을 활용한 로봇 팔의 물체 조작 연구입니다. 다양한 형태와 무게의 물체를 안정적으로 파지하고 이동시키는 능력을 학습합니다.",
                    images: [],
                },
            ],
            color: "bg-amber-50 dark:bg-amber-900/10",
            image: `${BASE_PATH}/images/robot_physical_ai.png`,
            // borderColor: "border-amber-200 dark:border-amber-800",
        },
        {
            id: "ai",
            title: "Human Assistive AI",
            icon: <Brain className="h-12 w-12 text-primary" />,
            description: "Advancing human-centric AI for assistive technologies and healthcare applications.",
            topics: [
                { name: "Generative Models", icon: <Cpu className="h-5 w-5" /> },
                { name: "Deep Learning Theory", icon: <Database className="h-5 w-5" /> },
                { name: "Multimodal Learning", icon: <Brain className="h-5 w-5" /> },
            ],
            projects: [
                {
                    title: "RAG LLM AI",
                    description: "검색 증강 생성 모델을 활용한 지식 기반 대화 시스템",
                    icon: <Brain className="h-5 w-5" />,
                    detailedDescription: "RAG(Retrieval-Augmented Generation) 기법을 활용하여 대규모 언어 모델의 지식 한계를 극복하고, 외부 지식베이스를 검색하여 정확한 답변을 생성하는 시스템을 개발합니다.",
                    images: [
                        `${BASE_PATH}/images/human_assist_ai.png`,
                    ],
                },
                {
                    title: "Multimodal Learning",
                    description: "텍스트, 이미지, 음성 등 다양한 모달리티를 통합한 학습 연구",
                    icon: <Database className="h-5 w-5" />,
                    detailedDescription: "다양한 모달리티의 데이터를 통합하여 학습하는 멀티모달 학습 연구입니다. Vision-Language 모델을 개발하여 이미지와 텍스트를 동시에 이해하고 처리할 수 있는 능력을 향상시킵니다.",
                    images: [],
                },
            ],
            color: "bg-blue-50 dark:bg-blue-900/10",
            image: `${BASE_PATH}/images/human_assist_ai.png`,
            // borderColor: "border-blue-200 dark:border-blue-800",
        },
        {
            id: "healthcare",
            title: "Healthcare AI",
            icon: <HeartPulse className="h-12 w-12 text-rose-500" />,
            description: "Transforming healthcare through data-driven insights and predictive modeling.",
            topics: [
                { name: "Activity Tracking Analysis", icon: <Microscope className="h-5 w-5" /> },
                { name: "Clinical Data Mining", icon: <Database className="h-5 w-5" /> },
                { name: "Personalized Medicine", icon: <HeartPulse className="h-5 w-5" /> },
            ],
            projects: [
                {
                    title: "보행 분석 AI",
                    description: "모션 캡처 데이터를 활용한 병리적 보행 패턴 분석 및 분류",
                    icon: <Microscope className="h-5 w-5" />,
                    detailedDescription: "3D 모션 캡처 시스템을 통해 수집한 보행 데이터를 딥러닝으로 분석하여 정상 보행과 병리적 보행을 자동으로 분류합니다. 파킨슨병, 뇌졸중 등 다양한 신경계 질환의 조기 진단에 활용할 수 있습니다.",
                    images: [
                        `${BASE_PATH}/images/healthcare_ai.png`,
                    ],
                },
                {
                    title: "Activity Tracking Analysis",
                    description: "활동 추적 데이터를 이용한 노인 우울 및 불안 선별 연구",
                    icon: <HeartPulse className="h-5 w-5" />,
                    detailedDescription: "스마트워치와 활동 추적기를 통해 수집한 일상 활동 데이터를 분석하여 노인의 우울 및 불안 증상을 조기 발견합니다. 머신러닝 모델을 통해 활동 패턴의 변화를 감지하고 건강 상태를 평가합니다.",
                    images: [],
                },
                {
                    title: "Clinical Data Mining",
                    description: "건설-제조 현장 작업자의 복합 질환 선별을 위한 데이터 마이닝",
                    icon: <Database className="h-5 w-5" />,
                    detailedDescription: "건설 및 제조 현장 작업자의 건강 검진 데이터를 분석하여 근골격계 질환, 호흡기 질환 등 복합 질환의 위험 요인을 파악합니다. 데이터 마이닝 기법을 활용하여 질환 간 상관관계를 분석하고 예측 모델을 구축합니다.",
                    images: [],
                },
            ],
            color: "bg-rose-50 dark:bg-rose-900/10",
            image: `${BASE_PATH}/images/healthcare_ai.png`,
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

                                    <div className="space-y-6 pt-6">
                                        {/* Research Projects */}
                                        {area.projects && area.projects.length > 0 && (
                                            <div>
                                                <h3 className="text-sm font-semibold text-secondary uppercase tracking-widest mb-4">Research Projects</h3>
                                                <div className="space-y-4">
                                                    {area.projects.map((project, idx) => (
                                                        <ProjectCard key={idx} project={project} />
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex-1 w-full flex justify-center">
                                    <div className={cn(
                                        "aspect-square rounded-[32px] w-3/4 border border-gray-100 dark:border-gray-800 overflow-hidden bg-gray-50 dark:bg-[#111] shadow-2xl shadow-gray-200/50 dark:shadow-black relative",
                                        // area.borderColor
                                    )}>
                                        <Image
                                            src={area.image || `${BASE_PATH}/images/hero_bg_wom_v2.png`}
                                            alt={area.title}
                                            fill
                                            className="object-contain"
                                        />
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
