import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { BASE_PATH } from "@/lib/constants";


export default function Home() {
  const areas = [
    {
      title: "Robot Physical AI",
      href: "/research#robot_ai",
      description: "동적 환경에서 디지털 지능과 물리적 상호작용 간의 격차를 해소합니다.",
      gradient: "from-amber-50/50 to-transparent dark:from-amber-900/10",
      image: `${BASE_PATH}/images/robot_physical_ai.png`,
    },
    {
      title: "Human Assistive AI",
      href: "/research#assist_ai",
      description: "사용자의 의도와 움직임을 이해하고 안전하게 도움을 제공하는 상호작용 기술을 개발합니다.",
      gradient: "from-blue-50/50 to-transparent dark:from-blue-900/10",
      image: `${BASE_PATH}/images/human_assist_ai.png`,
    },
    {
      title: "Healthcare AI",
      href: "/research#health_ai",
      description: "데이터 기반 예측 모델링으로 맞춤형 진단을 혁신합니다.",
      gradient: "from-rose-50/50 to-transparent dark:from-rose-900/10",
      image: `${BASE_PATH}/images/healthcare_ai.png`,
    },
  ];

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

            {/* Hero Visual */}
            <div className="mt-16 w-full max-w-[624px]">
              <div className="relative w-full h-[192px] md:h-[384px] bg-gradient-to-tr from-gray-100 to-gray-50 dark:from-[#111] dark:to-black rounded-3xl overflow-hidden shadow-2xl opacity-0 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
                <Image
                  src={`${BASE_PATH}/images/hero_bg_wom_v2.png`}
                  alt="H-Lab Hero Visual"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  priority
                />
              </div>
              <p className="text-xs text-secondary mt-2 text-center opacity-0 animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
                일러스트레이션 예시
              </p>
            </div>
          </div>
        </section>

        {/* Research Areas with Images */}
        <section id="research" className="pt-32 pb-24 bg-zinc-50 dark:bg-[#050505]">
          <div className="container-custom">
            <h2 className="h2-title mb-16 text-center text-[48px] sm:text-[56px] font-bold">Research Areas</h2>

            <div className="flex flex-col gap-6 items-center">
              {areas.map((area) => (
                <div key={area.title} className="group relative overflow-hidden rounded-[32px] bg-white dark:bg-[#111] p-6 md:p-8 flex flex-col md:flex-row items-center transition-transform duration-500 hover:scale-[1.01] shadow-2xl shadow-black/5 hover:shadow-black/10 w-full max-w-[780px] min-h-[160px] md:min-h-[242px]">
                  {/* 텍스트 */}
                  <div className="flex-1 z-10 flex flex-col justify-between h-full">
                    <div>
                      <Link href={area.href} className="hover:text-primary transition-colors">
                        <h3 className="text-2xl md:text-4xl font-bold text-foreground mb-2 md:mb-4">{area.title}</h3>
                      </Link>
                      <p className="text-sm md:text-body max-w-md line-clamp-2">{area.description}</p>
                    </div>
                    <div className="mt-4 md:mt-8">
                      <Link href={area.href} className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center hover:bg-primary hover:text-white transition-all inline-flex">
                        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                  {/* 이미지 */}
                  <div className="relative w-full md:w-[240px] h-[160px] md:h-[200px] rounded-2xl overflow-hidden mt-4 md:mt-0 md:ml-6 shrink-0">
                    <Image
                      src={area.image}
                      alt={area.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  {/* 그라데이션 */}
                  <div className={`absolute right-0 bottom-0 w-1/2 h-full bg-gradient-to-l ${area.gradient} pointer-events-none hidden md:block`} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-gradient-to-b from-background via-primary/3 to-background">
          <div className="container-custom max-w-[640px]">
            <div className="group relative overflow-hidden rounded-[24px] bg-white dark:bg-[#111] shadow-lg shadow-black/5 hover:shadow-xl px-6 py-8 md:px-10 md:py-10 transition-all duration-500 hover:scale-[1.02]">
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* 텍스트 */}
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-[1.3rem] md:text-[1.6rem] font-bold mb-2 tracking-tight">
                    Interested in joining us?
                  </h2>
                  <p className="text-body text-sm mb-5 max-w-sm">
                    연구에 함께할 열정적인 연구원을 찾습니다.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full text-[0.9rem] font-medium hover:bg-primary/90 transition-all active:scale-95 shadow-md shadow-primary/20"
                  >
                    문의하기
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
                {/* 이미지 */}
                <div className="relative w-[100px] h-[100px] md:w-[120px] md:h-[120px] shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
                  <Image
                    src={`${BASE_PATH}/images/heli_pr_back.png`}
                    alt="H-Lab Robot"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              {/* 배경 장식 */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent/5 rounded-full blur-2xl pointer-events-none" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
