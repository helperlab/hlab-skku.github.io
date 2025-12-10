"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Brain, HeartPulse, Bot, Microscope, Cpu, Database, ChevronDown, ChevronUp, Play, X, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { BASE_PATH } from "@/lib/constants";
import researchAreasData from "@/data/research-areas.json";

// 프로젝트 파일들 import
import smartFarmAi from "@/data/projects/robot_ai/smart_farm_ai.json";
import robotWbc from "@/data/projects/robot_ai/robot_wbc.json";
import elderSmartWalker from "@/data/projects/assist_ai/elder_smart_walker.json";
import strokeRehab from "@/data/projects/assist_ai/stroke_rehab.json";
import strokeRecoverPattern from "@/data/projects/assist_ai/stroke_recover_pattern.json";
import childAdhd from "@/data/projects/health_ai/child_adhd.json";
import constrHealth from "@/data/projects/health_ai/constr_health.json";
import developDisorder from "@/data/projects/health_ai/develop_disorder.json";
import earlyDetection from "@/data/projects/health_ai/early_detection.json";
import mildCognitive from "@/data/projects/health_ai/mild_cognitive.json";

// 프로젝트 파일 매핑
const projectMap: Record<string, any> = {
    "projects/robot_ai/smart_farm_ai.json": smartFarmAi,
    "projects/robot_ai/robot_wbc.json": robotWbc,
    "projects/assist_ai/elder_smart_walker.json": elderSmartWalker,
    "projects/assist_ai/stroke_rehab.json": strokeRehab,
    "projects/assist_ai/stroke_recover_pattern.json": strokeRecoverPattern,
    "projects/health_ai/child_adhd.json": childAdhd,
    "projects/health_ai/constr_health.json": constrHealth,
    "projects/health_ai/develop_disorder.json": developDisorder,
    "projects/health_ai/early_detection.json": earlyDetection,
    "projects/health_ai/mild_cognitive.json": mildCognitive,
};

// 아이콘 매핑 함수
const iconMap: Record<string, LucideIcon> = {
    Bot,
    Brain,
    HeartPulse,
    Microscope,
    Cpu,
    Database,
};

function getIconComponent(iconName: string, size: string = "h-5 w-5", color?: string) {
    const IconComponent = iconMap[iconName] || Bot;
    const colorClass = color ? `text-${color}` : "text-primary";
    return <IconComponent className={`${size} ${colorClass}`} />;
}

// ProjectCard 컴포넌트
function ProjectCard({ project }: { project: any }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const hasContent = project.overview || project.content || project.expectedEffects;

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
                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    {/* 연구 목표 */}
                    {project.overview && (
                        <div className="space-y-4">
                            <h4 className="text-xl font-bold border-b border-gray-200 dark:border-gray-700 pb-2">연구 목표</h4>
                            {project.overview.description && (
                                <p className="text-secondary leading-relaxed whitespace-pre-line">
                                    {project.overview.description}
                                </p>
                            )}
                            
                            {/* 개요 이미지 */}
                            {project.overview.images && project.overview.images.length > 0 && (
                                <div className="flex flex-col items-center gap-4">
                                    {project.overview.images.map((img: string, imgIdx: number) => (
                                        <div key={imgIdx} className="relative w-full max-w-3xl aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-[#1a1a1a]">
                                            <Image
                                                src={img}
                                                alt={`${project.title} - 개요 이미지 ${imgIdx + 1}`}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* 개요 동영상 */}
                            {project.overview.videos && project.overview.videos.length > 0 && (
                                <div className="flex flex-col items-center gap-4">
                                    {project.overview.videos.map((video: any, vidIdx: number) => {
                                        const isYouTube = video.url.includes('youtube.com') || video.url.includes('youtu.be');
                                        return (
                                            <div key={vidIdx} className="relative w-full max-w-3xl aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-[#1a1a1a]">
                                                {isYouTube ? (
                                                    <iframe
                                                        src={video.url}
                                                        title={video.title || `${project.title} - 개요 동영상 ${vidIdx + 1}`}
                                                        className="w-full h-full"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                    />
                                                ) : (
                                                    <video
                                                        src={video.url}
                                                        controls
                                                        className="w-full h-full"
                                                        title={video.title || `${project.title} - 개요 동영상 ${vidIdx + 1}`}
                                                    >
                                                        브라우저가 비디오 태그를 지원하지 않습니다.
                                                    </video>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}

                    {/* 연구 내용 */}
                    {project.content && (
                        <div className="space-y-4">
                            <h4 className="text-xl font-bold border-b border-gray-200 dark:border-gray-700 pb-2">연구 내용</h4>
                            {project.content.description && (
                                <p className="text-secondary leading-relaxed whitespace-pre-line">
                                    {project.content.description}
                                </p>
                            )}

                            {/* 내용 이미지 */}
                            {project.content.images && project.content.images.length > 0 && (
                                <div className="flex flex-col items-center gap-4">
                                    {project.content.images.map((img: string, imgIdx: number) => (
                                        <div key={imgIdx} className="relative w-full max-w-3xl aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-[#1a1a1a]">
                                            <Image
                                                src={img}
                                                alt={`${project.title} - 내용 이미지 ${imgIdx + 1}`}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* 내용 동영상 */}
                            {project.content.videos && project.content.videos.length > 0 && (
                                <div className="flex flex-col items-center gap-4">
                                    {project.content.videos.map((video: any, vidIdx: number) => {
                                        const isYouTube = video.url.includes('youtube.com') || video.url.includes('youtu.be');
                                        return (
                                            <div key={vidIdx} className="relative w-full max-w-3xl aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-[#1a1a1a]">
                                                {isYouTube ? (
                                                    <iframe
                                                        src={video.url}
                                                        title={video.title || `${project.title} - 내용 동영상 ${vidIdx + 1}`}
                                                        className="w-full h-full"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                    />
                                                ) : (
                                                    <video
                                                        src={video.url}
                                                        controls
                                                        className="w-full h-full"
                                                        title={video.title || `${project.title} - 내용 동영상 ${vidIdx + 1}`}
                                                    >
                                                        브라우저가 비디오 태그를 지원하지 않습니다.
                                                    </video>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}

                    {/* 기대 효과 */}
                    {project.expectedEffects && (
                        <div className="space-y-4">
                            <h4 className="text-xl font-bold border-b border-gray-200 dark:border-gray-700 pb-2">기대 효과</h4>
                            <p className="text-secondary leading-relaxed whitespace-pre-line">
                                {project.expectedEffects}
                            </p>
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
    // JSON 데이터를 컴포넌트에서 사용 가능한 형태로 변환
    const researchAreas = researchAreasData.researchAreas.map((area) => ({
        id: area.id,
        title: area.title,
        icon: getIconComponent(area.iconName, "h-12 w-12", area.iconColor),
        description: area.description,
        topics: area.topics.map((topic) => ({
            name: topic.name,
            icon: getIconComponent(topic.iconName, "h-5 w-5"),
        })),
        projects: area.projectFiles.map((projectFile: string) => {
            const project = projectMap[projectFile];
            if (!project) return null;
            return {
            title: project.title,
            description: project.description,
            icon: getIconComponent(project.iconName, "h-5 w-5"),
            overview: project.overview ? {
                description: project.overview.description,
                images: (project.overview.images || []).map((img: string) => img.startsWith('/') ? `${BASE_PATH}${img}` : img),
                videos: (project.overview.videos || []).map((video: any) => ({
                    ...video,
                    url: video.url.startsWith('http') ? video.url : (video.url.startsWith('/') ? `${BASE_PATH}${video.url}` : video.url)
                })),
            } : undefined,
            content: project.content ? {
                description: project.content.description,
                images: (project.content.images || []).map((img: string) => img.startsWith('/') ? `${BASE_PATH}${img}` : img),
                videos: (project.content.videos || []).map((video: any) => ({
                    ...video,
                    url: video.url.startsWith('http') ? video.url : (video.url.startsWith('/') ? `${BASE_PATH}${video.url}` : video.url)
                })),
            } : undefined,
            expectedEffects: project.expectedEffects,
            url: project.url || undefined,
        };
        }).filter((p: any) => p !== null),
        color: area.color,
        image: area.image.startsWith('/') ? `${BASE_PATH}${area.image}` : area.image,
    }));

    /* 기존 하드코딩된 데이터 (참고용으로 주석 처리)
    const researchAreas = [
        {
            id: "robot",
            title: "Robot Physical AI",
            icon: <Bot className="h-12 w-12 text-amber-500" />,
            description: "동적 환경에서 디지털 지능과 물리적 상호작용 간의 격차를 해소합니다.",
            topics: [
                { name: "Robot Perception", icon: <Bot className="h-5 w-5" /> },
                { name: "Generative Learning Models", icon: <Brain className="h-5 w-5" /> },
                { name: "Sim2Real Transfer", icon: <Cpu className="h-5 w-5" /> },
            ],
            projects: [
                {
                    title: "시각 물체 추적을 사용한 강화 학습 기반 모바일 조작 로봇의 전신 제어",
                    description: "Reinforcement Learning Based Whole-Body Control of a Mobile Manipulation Robot using Visual Object Tracking",
                    icon: <Bot className="h-5 w-5" />,
                    overview: {
                        description: "로봇의 모바일 베이스와 머니퓰레이터를 분리해서 순차적으로 제어하는 것은 비효율적이며 경우에 따라서는 작업 공간의 감소를 야기할 수 있음\n\n운동 모델의 한계와 온라인 장애물 회피의 부족을 극복하기 위해서 전신 제어(Whole-Body Control, WBC)를 위한 심층 강화 학습(Deep Reinforcement Learning, DRL) 전략을 제안함\n\nRL 접근법은 시뮬레이션에서 상태 최신 방법과 비교되며, 복잡한 환경에서 모바일 조작기에 검증된 RL 훈련 정책을 통해 빠른 임무 시간을 입증",
                        images: [
                            `${BASE_PATH}/images/robot_physical_ai.png`,
                        ],
                        videos: [
                            // { url: "https://www.youtube.com/embed/VIDEO_ID", title: "개요 동영상" },
                        ],
                    },
                    content: {
                        description: "비전 기반 인식 및 추적: 로봇에 탑재된 카메라와 센서를 이용하여 환경 내의 물체와 인간을 실시간으로 인식하고 추적\n\n강화학습을 통한 WBC 최적화: 로봇의 모든 부분을 통합적으로 제어하는 WBC 기술에 강화학습을 적용하여, 로봇이 다양한 작업을 더 효율적으로 수행할 수 있는 동작 전략을 스스로 학습\n\n자율적 작업 수행: Human Following, 물체 인식 및 Picking, Navigation, Manipulation 작업을 자율적으로 수행할 수 있도록 함\n\n비전 기술과 강화학습의 결합을 통해 로봇은 복잡한 환경에서도 높은 수준의 작업 수행 능력을 발휘하게함\n\nSim2real 기술 적용: 환경의 변화를 자동으로 무작위화하는 domain randomization 기술을 적용하여, 로봇이 더 넓은 범위의 환경 조건에 대해 학습하고 불확실성에 강인하게 적응할 수 있도록 함",
                        images: [
                            // `${BASE_PATH}/images/project1_content_img1.png`,
                        ],
                        videos: [
                            // { url: "https://www.youtube.com/embed/VIDEO_ID", title: "내용 동영상" },
                        ],
                    },
                    expectedEffects: "동적 변화에 적응할 수 있는 실시간, 반응적 제어를 가능하게 함\n\n로봇의 기지와 조작기를 일체로 관리하는 통합 제어 전략 적용을 통해 전체 임무 시간을 줄임\n\n시뮬레이션에서 훈련된 것을 실제 시스템에 직접 전송할 수 있음을 보여줌으로써 이론적 모델과 실제 사용성 사이의 격차를 해소",
                },
                {
                    title: "Sim2Real Transfer Learning",
                    description: "시뮬레이션 환경에서 학습한 모델을 실제 환경에 적용하는 연구",
                    icon: <Cpu className="h-5 w-5" />,
                    overview: {
                        description: "시뮬레이션 환경에서 학습한 모델을 실제 로봇 환경에 적용하기 위한 도메인 적응 기법을 연구합니다.",
                        images: [
                            `${BASE_PATH}/images/robot_physical_ai.png`,
                        ],
                    },
                    content: {
                        description: "Domain Randomization과 Adversarial Training을 활용하여 시뮬레이션과 실제 환경 간의 차이를 최소화합니다.",
                    },
                    expectedEffects: "시뮬레이션에서 학습한 모델을 실제 환경에 효율적으로 전이하여 로봇 학습의 비용과 시간을 크게 절감할 수 있습니다.",
                },
                {
                    title: "Robot Manipulation",
                    description: "로봇 팔을 이용한 물체 조작 및 학습 연구",
                    icon: <Bot className="h-5 w-5" />,
                    overview: {
                        description: "강화학습을 활용한 로봇 팔의 물체 조작 연구입니다.",
                    },
                    content: {
                        description: "다양한 형태와 무게의 물체를 안정적으로 파지하고 이동시키는 능력을 학습합니다.",
                    },
                    expectedEffects: "유연하고 적응적인 로봇 조작 시스템을 구축하여 제조업, 물류 등 다양한 분야에 활용할 수 있습니다.",
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
            description: "사용자의 의도와 움직임을 이해하고 안전하게 도움을 제공하는 상호작용 기술을 개발합니다.",
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
                    overview: {
                        description: "RAG(Retrieval-Augmented Generation) 기법을 활용하여 대규모 언어 모델의 지식 한계를 극복하고, 외부 지식베이스를 검색하여 정확한 답변을 생성하는 시스템을 개발합니다.",
                        images: [
                            `${BASE_PATH}/images/human_assist_ai.png`,
                        ],
                    },
                    content: {
                        description: "벡터 데이터베이스를 활용한 효율적인 지식 검색 및 생성 파이프라인을 구축하고, 다양한 도메인에 특화된 RAG 시스템을 개발합니다.",
                    },
                    expectedEffects: "정확하고 신뢰할 수 있는 AI 대화 시스템을 구축하여 교육, 고객 서비스, 의료 상담 등 다양한 분야에 활용할 수 있습니다.",
                },
                {
                    title: "Multimodal Learning",
                    description: "텍스트, 이미지, 음성 등 다양한 모달리티를 통합한 학습 연구",
                    icon: <Database className="h-5 w-5" />,
                    overview: {
                        description: "다양한 모달리티의 데이터를 통합하여 학습하는 멀티모달 학습 연구입니다.",
                    },
                    content: {
                        description: "Vision-Language 모델을 개발하여 이미지와 텍스트를 동시에 이해하고 처리할 수 있는 능력을 향상시킵니다.",
                    },
                    expectedEffects: "다양한 형태의 정보를 통합적으로 이해하는 AI 시스템을 구축하여 더욱 자연스럽고 정확한 인간-AI 상호작용을 가능하게 합니다.",
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
            description: "데이터 기반 예측 모델링으로 맞춤형 헬스케어 서비스를 혁신합니다.",
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
                    overview: {
                        description: "3D 모션 캡처 시스템을 통해 수집한 보행 데이터를 딥러닝으로 분석하여 정상 보행과 병리적 보행을 자동으로 분류합니다.",
                        images: [
                            `${BASE_PATH}/images/healthcare_ai.png`,
                        ],
                    },
                    content: {
                        description: "파킨슨병, 뇌졸중 등 다양한 신경계 질환의 보행 패턴을 학습하여 조기 진단을 지원하는 AI 모델을 개발합니다.",
                    },
                    expectedEffects: "비침습적이고 저렴한 보행 분석을 통해 신경계 질환의 조기 발견 및 모니터링이 가능하여 환자의 삶의 질을 향상시킬 수 있습니다.",
                },
                {
                    title: "Activity Tracking Analysis",
                    description: "활동 추적 데이터를 이용한 노인 우울 및 불안 선별 연구",
                    icon: <HeartPulse className="h-5 w-5" />,
                    overview: {
                        description: "스마트워치와 활동 추적기를 통해 수집한 일상 활동 데이터를 분석하여 노인의 우울 및 불안 증상을 조기 발견합니다.",
                    },
                    content: {
                        description: "머신러닝 모델을 통해 활동 패턴의 변화를 감지하고 건강 상태를 평가합니다.",
                    },
                    expectedEffects: "일상 활동 데이터만으로 정신 건강 상태를 모니터링하여 조기 개입이 가능하며, 노인 건강 관리의 효율성을 크게 향상시킬 수 있습니다.",
                },
                {
                    title: "Clinical Data Mining",
                    description: "건설-제조 현장 작업자의 복합 질환 선별을 위한 데이터 마이닝",
                    icon: <Database className="h-5 w-5" />,
                    overview: {
                        description: "건설 및 제조 현장 작업자의 건강 검진 데이터를 분석하여 근골격계 질환, 호흡기 질환 등 복합 질환의 위험 요인을 파악합니다.",
                    },
                    content: {
                        description: "데이터 마이닝 기법을 활용하여 질환 간 상관관계를 분석하고 예측 모델을 구축합니다.",
                    },
                    expectedEffects: "작업 환경과 건강 상태의 연관성을 파악하여 산업 현장의 안전과 건강을 개선하고, 질병 예방 프로그램 개발에 기여할 수 있습니다.",
                },
                {
                    title: "장애아동 조기발견 모델개발 연구",
                    description: "Development of early detection model for children with disabilities",
                    icon: <HeartPulse className="h-5 w-5" />,
                    overview: {
                        description: "영유아의 장애위험요인을 조기에 발견하여 조기에 중재를 지원하는 것은 장애 위험요인을 제거하여 아동의 장애를 예방하는 효과와 함께 2차 장애발생을 예방하는 효과\n\n장애의 발견이 늦어질 경우 아동의 발달과업을 수행하지 못함으로 인해 발달의 지연 가중\n\n언어발달의 완성기인 6세가 지나 장애를 발견할 경우 언어발달의 최적기를 지나게 되어 언어적 의사소통의 어려움 지속",
                    },
                    content: {
                        description: "아동의 장애 조기발견을 위해서는 조기에 부모가 인식하고 관련 지원을 요청해야만 하므로 검사 비용과 대상을 확대하는 정책만으로는 한계가 있음\n\n부모가 조기에 장애를 인식할 수 있도록 하는 홍보와 교육 등의 체계도 함께 이루어져야 하지만, 장기적으로는 부모가 조기에 인식하지 못하더라도 정부가 아동의 장애 위험요인을 찾아낼 수 있는 체계가 구축되어야 함\n\n영유아 건강검진을 통해 위험군 아동의 복지지원모델을 개발하여 발달이 지체된 아동의 장애 발생 예방을 위해 국민건강보험공단의 표본 코호트 DB, 영유아 검진 코호트 DB, 맞춤형 DB 등의 장애아동 진료명세서, 진료내역, 상병내역, 처방전교부상세, 영유아 건강검진, 영유아 구강검진 결과를 분석하여 장애아동의 진료 경로를 분석하여 장애의 조기발견 모델을 개발",
                    },
                    expectedEffects: "장애를 보일 가능성이 높은 아동들을 조기에 발견하여 적절한 대응을 해야함의 필요성을 인지하고 이를 해결하기 위한 방법으로 국민건강보험 데이터를 이용하는 연구를 진행\n\n빅데이터 분석에 적합한 기계학습 알고리즘을 이용하여 그 가능성을 검증\n\n다양한 요인에 의해 장애위험에 빠질 수 있는 아동들을 조기에 선별하여 적절한 치료를 받아 장애를 예방하거나 정도를 낮출 수 있고, 실제로 장애를 겪고 있지만 부모의 초기인식이 늦어지게 되어 장애 진단까지 오래 걸릴 수 있는 아동을 선별하여 적절한 치료 가능\n\n본 과제로 개발한 시스템을 활용하여 타 장애 및 교육대상군에 필요한 행동데이터 측정/분석 기술 확산 가능",
                },
            ],
            color: "bg-rose-50 dark:bg-rose-900/10",
            image: `${BASE_PATH}/images/healthcare_ai.png`,
            // borderColor: "border-rose-200 dark:border-rose-800",
        },
    ];
    */

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
                                {/* 왼쪽 컨테이너 (데스크톱에서만 사용) */}
                                <div className="flex-1 flex flex-col space-y-6 order-1 md:order-none hidden md:flex">
                                    {/* 제목/설명 */}
                                    <div className="space-y-6">
                                        <div className={cn("inline-flex p-5 rounded-3xl mb-4", area.color)}>
                                            {area.icon}
                                        </div>
                                        <h2 className="h2-title">{area.title}</h2>
                                        <p className="text-body text-lg">
                                            {area.description}
                                        </p>
                                    </div>

                                    {/* Projects */}
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

                                {/* 모바일: 제목/설명 */}
                                <div className="flex-1 space-y-6 order-1 md:hidden">
                                    <div className={cn("inline-flex p-5 rounded-3xl mb-4", area.color)}>
                                        {area.icon}
                                    </div>
                                    <h2 className="h2-title">{area.title}</h2>
                                    <p className="text-body text-lg">
                                        {area.description}
                                    </p>
                                </div>

                                {/* 이미지 */}
                                <div className="flex-1 w-full flex justify-center order-2 -my-[19px] md:my-0">
                                    <div className={cn(
                                        "aspect-square rounded-[32px] w-[52%] md:w-3/4 border border-gray-100 dark:border-gray-800 overflow-hidden bg-gray-50 dark:bg-[#111] shadow-2xl shadow-gray-200/50 dark:shadow-black relative",
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

                                {/* 모바일: Projects */}
                                <div className="flex-1 space-y-6 order-3 md:hidden">
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
