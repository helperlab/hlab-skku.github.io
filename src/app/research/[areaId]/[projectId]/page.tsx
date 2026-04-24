import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getProject, getAllProjectParams } from "@/lib/research";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function generateStaticParams() {
    return getAllProjectParams();
}

export async function generateMetadata({ params }: { params: Promise<{ areaId: string; projectId: string }> }) {
    const { areaId, projectId } = await params;
    const result = getProject(areaId, projectId);
    if (!result) return { title: "Not Found | H-Lab" };
    return {
        title: `${result.project.title} | H-Lab`,
        description: result.project.description,
    };
}

function VideoEmbed({ video, title }: { video: { url: string; title?: string }; title: string }) {
    const isYouTube = video.url.includes("youtube.com") || video.url.includes("youtu.be");
    const youtubeUrl = isYouTube && !video.url.includes("autoplay")
        ? `${video.url}${video.url.includes("?") ? "&" : "?"}autoplay=1&mute=1`
        : video.url;

    return (
        <div className="relative w-full max-w-3xl aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-[#1a1a1a]">
            {isYouTube ? (
                <iframe
                    src={youtubeUrl}
                    title={video.title || title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            ) : (
                <video
                    src={video.url}
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full"
                    title={video.title || title}
                >
                    브라우저가 비디오 태그를 지원하지 않습니다.
                </video>
            )}
        </div>
    );
}

export default async function ProjectPage({ params }: { params: Promise<{ areaId: string; projectId: string }> }) {
    const { areaId, projectId } = await params;
    const result = getProject(areaId, projectId);
    if (!result) notFound();

    const { area, project } = result;

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />

            <main className="flex-grow pt-32 pb-24">
                <div className="container-custom max-w-4xl">
                    {/* 뒤로가기 */}
                    <Link
                        href={`/research#${area.id}`}
                        className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors mb-8"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span>{area.title}</span>
                    </Link>

                    {/* 헤더 */}
                    <div className="mb-12 animate-fade-in-up">
                        <h1 className="text-[32px] sm:text-[40px] font-bold tracking-tight mb-4">{project.title}</h1>
                        <p className="text-body text-lg">{project.description}</p>
                    </div>

                    {/* 본문 */}
                    <div className="space-y-12 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
                        {/* 연구 목표 */}
                        {project.overview && (
                            <section className="space-y-6">
                                <h2 className="text-2xl font-bold border-b border-gray-200 dark:border-gray-700 pb-3">연구 목표</h2>
                                {project.overview.description && (
                                    <p className="text-secondary leading-relaxed whitespace-pre-line">
                                        {project.overview.description}
                                    </p>
                                )}
                                {project.overview.images?.length > 0 && (
                                    <div className="flex flex-col items-center gap-4">
                                        {project.overview.images.map((img, i) => (
                                            <div key={i} className="relative w-full max-w-3xl aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-[#1a1a1a]">
                                                <Image src={img} alt={`${project.title} - 개요 ${i + 1}`} fill className="object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {project.overview.videos?.length > 0 && (
                                    <div className="flex flex-col items-center gap-4">
                                        {project.overview.videos.map((video, i) => (
                                            <VideoEmbed key={i} video={video} title={`${project.title} - 개요 동영상 ${i + 1}`} />
                                        ))}
                                    </div>
                                )}
                            </section>
                        )}

                        {/* 연구 내용 */}
                        {project.content && (
                            <section className="space-y-6">
                                <h2 className="text-2xl font-bold border-b border-gray-200 dark:border-gray-700 pb-3">연구 내용</h2>
                                {project.content.description && (
                                    <p className="text-secondary leading-relaxed whitespace-pre-line">
                                        {project.content.description}
                                    </p>
                                )}
                                {project.content.images?.length > 0 && (
                                    <div className="flex flex-col items-center gap-4">
                                        {project.content.images.map((img, i) => (
                                            <div key={i} className="relative w-full max-w-3xl aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-[#1a1a1a]">
                                                <Image src={img} alt={`${project.title} - 내용 ${i + 1}`} fill className="object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {project.content.videos?.length > 0 && (
                                    <div className="flex flex-col items-center gap-4">
                                        {project.content.videos.map((video, i) => (
                                            <VideoEmbed key={i} video={video} title={`${project.title} - 내용 동영상 ${i + 1}`} />
                                        ))}
                                    </div>
                                )}
                            </section>
                        )}

                        {/* 기대 효과 */}
                        {project.expectedEffects && (
                            <section className="space-y-6">
                                <h2 className="text-2xl font-bold border-b border-gray-200 dark:border-gray-700 pb-3">기대 효과</h2>
                                <p className="text-secondary leading-relaxed whitespace-pre-line">
                                    {project.expectedEffects}
                                </p>
                            </section>
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
            </main>

            <Footer />
        </div>
    );
}
