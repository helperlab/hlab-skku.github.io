import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Brain, HeartPulse, Bot, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { BASE_PATH } from "@/lib/constants";


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-grow">
        {/* Large Hero Section */}
        <section className="relative pt-28 pb-24 md:pt-60 md:pb-32 overflow-hidden">
          <div className="container-custom flex flex-col items-center text-center">
            <h1 className="h1-hero text-foreground mb-6 animate-fade-in-up">
              Intelligence. <br />
              <span className="text-secondary mt-[0.1em] block">Redefined.</span>
            </h1>
            <p className="text-body max-w-2xl mx-auto mb-10 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              인공지능, 헬스케어 데이터 사이언스, 그리고 로보틱스의 융합을 추구합니다.
            </p>



            {/* Subtle Hero Visual */}
            {/* Subtle Hero Visual */}
            <div className="relative mt-16 w-full max-w-[780px] h-[240px] md:h-[480px] bg-gradient-to-tr from-gray-100 to-gray-50 dark:from-[#111] dark:to-black rounded-3xl overflow-hidden shadow-2xl opacity-0 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
              <Image
                src={`${BASE_PATH}/images/hero_bg_wom_v2.png`}
                alt="H-Lab Hero Visual"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
            </div>
          </div>
        </section>

        {/* Bento Grid Research Areas */}
        <section id="research" className="pt-32 pb-24 bg-zinc-50 dark:bg-[#050505]">
          <div className="container-custom">
            <h2 className="h2-title mb-16 text-center text-[48px] sm:text-[56px] font-bold">Research Areas</h2>

            <div className="flex flex-col gap-6 items-center">
              {/* Card 3: Robotics */}
              <div className="group relative overflow-hidden rounded-[32px] bg-white dark:bg-[#111] p-6 md:p-8 flex flex-col justify-between transition-transform duration-500 hover:scale-[1.01] shadow-2xl shadow-black/5 hover:shadow-black/10 w-full max-w-[780px] min-h-[160px] md:h-[242px]">
                <div className="z-10">
                  <Link href="/research#robot_ai" className="hover:text-primary transition-colors">
                    <h3 className="text-2xl md:text-4xl font-bold text-foreground mb-2 md:mb-4">Robot Physical AI</h3>
                  </Link>
                  <p className="text-sm md:text-body max-w-md line-clamp-2">동적 환경에서 디지털 지능과 물리적 상호작용 간의 격차를 해소합니다.</p>
                </div>
                <div className="absolute right-0 bottom-0 w-1/2 h-full bg-gradient-to-l from-amber-50/50 to-transparent dark:from-amber-900/10 pointer-events-none" />
                <div className="mt-auto pt-4 md:pt-8 flex items-end justify-between relative z-10">
                  <Link href="/research#robot_ai" className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                  <Bot className="h-16 w-16 md:h-24 md:w-24 text-amber-500/20 absolute bottom-0 right-0 group-hover:rotate-12 transition-transform duration-700 ease-out" />
                </div>
              </div>

              {/* Card 1: AI (Large Span) */}
              <div className="group relative overflow-hidden rounded-[32px] bg-white dark:bg-[#111] p-6 md:p-8 flex flex-col justify-between transition-transform duration-500 hover:scale-[1.01] shadow-2xl shadow-black/5 hover:shadow-black/10 w-full max-w-[780px] min-h-[160px] md:h-[242px]">
                <div className="z-10">
                  <Link href="/research#assist_ai" className="hover:text-primary transition-colors">
                    <h3 className="text-2xl md:text-4xl font-bold text-foreground mb-2 md:mb-4">Human Assistive AI</h3>
                  </Link>
                  <p className="text-sm md:text-body max-w-md line-clamp-2">사용자의 의도와 움직임을 이해하고 안전하게 도움을 제공하는 상호작용 기술을 개발합니다.</p>
                </div>
                <div className="absolute right-0 bottom-0 w-1/2 h-full bg-gradient-to-l from-blue-50/50 to-transparent dark:from-blue-900/10 pointer-events-none" />
                <div className="mt-auto pt-4 md:pt-8 flex items-end justify-between relative z-10">
                  <Link href="/research#assist_ai" className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                  <Brain className="h-16 w-16 md:h-24 md:w-24 text-blue-500/20 absolute bottom-0 right-0 group-hover:scale-110 transition-transform duration-700 ease-out" />
                </div>
              </div>

              {/* Card 2: Healthcare (Tall) */}
              <div className="group relative overflow-hidden rounded-[32px] bg-white dark:bg-[#111] p-6 md:p-8 flex flex-col justify-between transition-transform duration-500 hover:scale-[1.01] shadow-2xl shadow-black/5 hover:shadow-black/10 w-full max-w-[780px] min-h-[160px] md:h-[242px]">
                <div className="z-10">
                  <Link href="/research#health_ai" className="hover:text-primary transition-colors">
                    <h3 className="text-2xl md:text-4xl font-bold text-foreground mb-2 md:mb-4">Healthcare AI</h3>
                  </Link>
                  <p className="text-sm md:text-body max-w-md line-clamp-2">데이터 기반 예측 모델링으로 맞춤형 진단을 혁신합니다.</p>
                </div>
                <div className="absolute right-0 bottom-0 w-1/2 h-full bg-gradient-to-l from-rose-50/50 to-transparent dark:from-rose-900/10 pointer-events-none" />
                <div className="mt-auto pt-4 md:pt-8 flex items-end justify-between relative z-10">
                  <Link href="/research#health_ai" className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                  <HeartPulse className="h-16 w-16 md:h-24 md:w-24 text-rose-500/20 absolute bottom-0 right-0 group-hover:scale-110 transition-transform duration-700 ease-out" />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Footer Callout */}
        <section className="py-20 bg-background border-t border-gray-100 dark:border-gray-900">
          <div className="container-custom text-center">
            <h2 className="text-[1.8rem] md:text-[2.25rem] font-bold mb-4 tracking-tight">Interested in joining us?</h2>
            <Link href="/contact" className="inline-block bg-primary text-white px-5 py-2 rounded-full text-[1.05rem] font-medium hover:bg-primary/90 transition-transform active:scale-95">
              문의하기
            </Link>
            <div className="mt-12 flex justify-center">
              <div className="relative w-full max-w-[299px] aspect-square bg-gradient-to-tr from-gray-100 to-gray-50 dark:from-[#111] dark:to-black rounded-3xl overflow-hidden shadow-2xl opacity-0 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
                <Image
                  src={`${BASE_PATH}/images/heli_pr_back.png`}
                  alt="Heli PR Back"
                  fill
                  className="object-contain transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
