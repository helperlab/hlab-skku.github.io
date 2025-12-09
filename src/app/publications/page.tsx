import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getPublications } from "@/lib/orcid";
import Link from "next/link";
import { ExternalLink, BookOpen } from "lucide-react";

export const metadata = {
    title: "Publications | H-Lab",
    description: "Research publications from H-Lab.",
};

export default async function PublicationsPage() {
    const publications = await getPublications();

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />

            <main className="flex-grow pt-44 pb-24">
                <div className="container-custom">
                    <div className="text-center mb-20 animate-fade-in-up">
                        <h1 className="h1-hero mb-6">Publications</h1>
                        <p className="text-body text-[18px] max-w-2xl mx-auto">
                            H-Lab의 주요 연구 성과 및 논문 목록입니다.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                        {publications.length === 0 ? (
                            <div className="text-center py-20 bg-gray-50 dark:bg-[#111] rounded-3xl">
                                <p className="text-secondary">게시물을 불러오는 중이거나 데이터가 없습니다.</p>
                                <Link
                                    href="https://orcid.org/0000-0002-5025-8785"
                                    target="_blank"
                                    className="text-primary hover:underline mt-4 inline-block"
                                >
                                    ORCID에서 직접 보기 &rarr;
                                </Link>
                            </div>
                        ) : (
                            publications.map((pub) => (
                                <div
                                    key={pub.id}
                                    className="group bg-white dark:bg-[#111] p-6 rounded-[24px] shadow-sm hover:shadow-md transition-all border border-transparent hover:border-gray-100 dark:hover:border-gray-800"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3 text-sm font-medium">
                                                <span className="text-primary bg-primary/10 px-3 py-1 rounded-full">
                                                    {pub.year}
                                                </span>
                                            </div>

                                            <h3 className="text-sm md:text-base font-bold leading-tight group-hover:text-primary transition-colors mb-2">
                                                {pub.url ? (
                                                    <a href={pub.url} target="_blank" rel="noopener noreferrer">
                                                        {pub.title}
                                                    </a>
                                                ) : (
                                                    pub.title
                                                )}
                                            </h3>

                                            {/* Authors and Journal */}
                                            <p className="text-sm text-secondary line-clamp-2">
                                                {pub.authors} <span className="font-semibold text-foreground/80"> — {pub.journal}</span>
                                            </p>
                                        </div>

                                        {pub.url && (
                                            <a
                                                href={pub.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="shrink-0 p-2 text-gray-400 hover:text-primary transition-colors"
                                            >
                                                <ExternalLink className="h-5 w-5" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
