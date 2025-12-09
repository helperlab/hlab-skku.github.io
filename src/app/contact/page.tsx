import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MapPin, Mail } from "lucide-react";

export const metadata = {
    title: "Contact | H-Lab",
    description: "Get in touch with H-Lab.",
};

export default function ContactPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />

            <main className="flex-grow pt-44 pb-24">
                <div className="container-custom">
                    <div className="text-center mb-24 animate-fade-in-up">
                        <h1 className="h1-hero mb-6">Contact Us</h1>
                        <p className="text-body text-[18px] max-w-3xl mx-auto leading-relaxed whitespace-pre-line">
                            Helper Lab – 로봇 학습 지능 연구실<br /><br />
                            연구 내용이나 게시글에 대한 문의, 새로운 의견 제시는 언제든지 연구실 이메일로 보내주세요.<br />
                            연구실의 비전과 연구 활동에 관심 있는 연구생들의 연락도 환영합니다.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-16 max-w-[980px] mx-auto">
                        {/* Contact Info */}
                        <div className="space-y-10">
                            <div className="p-8 rounded-[32px] bg-gray-50 dark:bg-[#111] transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                                <h3 className="h2-title mb-8 !text-[24px]">Get in Touch</h3>
                                <div className="space-y-8">
                                    <div className="flex items-start gap-5 group">
                                        <div className="shrink-0 mt-1 transition-transform duration-300 group-hover:scale-110">
                                            <MapPin className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-[17px] mb-1">Visit Us</h4>
                                            <p className="text-secondary leading-relaxed">
                                                경기도 수원시 장안구 서부로 2066<br />
                                                성균관대학교 제1공학관<br />
                                                (우) 16419
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-5 group">
                                        <div className="shrink-0 mt-1 transition-transform duration-300 group-hover:scale-110">
                                            <Mail className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-[17px] mb-1">Email Us</h4>
                                            <a href="mailto:helperlab@gmail.com" className="text-secondary hover:text-primary transition-colors font-medium">
                                                helperlab@gmail.com
                                            </a>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* Google Map Embed */}
                        <div className="bg-gray-100 dark:bg-[#1a1a1a] rounded-[32px] overflow-hidden h-full md:h-full aspect-[4/3] md:aspect-auto shadow-lg">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3163.6791552528147!2d126.97395027641217!3d37.29410317209703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b41e3d3090f27%3A0xc3124508ec39634!2z7ISx6reg6rSAOuMgO2SkeSxjCDdoJE!5e0!3m2!1sko!2skr!4v1716382000000!5m2!1sko!2skr"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Helper Lab Location"
                                className="w-full h-full"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </main >

            <Footer />
        </div >
    );
}
