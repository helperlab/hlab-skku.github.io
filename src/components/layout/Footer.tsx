import Image from "next/image";

export function Footer() {
    return (
        <footer className="bg-slate-50 dark:bg-slate-900 py-12 border-t border-slate-200 dark:border-slate-800">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex flex-col items-start gap-4 mb-4 md:mb-0">
                        <div className="flex items-center gap-8">
                            <Image
                                src="/images/hlab_logo_clear_transp.png"
                                alt="H-Lab"
                                width={360}
                                height={120}
                                className="h-24 w-auto object-contain"
                            />
                            <div className="h-20 w-px bg-slate-300 dark:bg-slate-700 mx-2" />
                            <Image
                                src="/images/Signature01_5.png"
                                alt="Sungkyunkwan University"
                                width={300}
                                height={90}
                                className="h-16 w-auto object-contain"
                            />
                        </div>
                    </div>
                    <div className="text-sm text-muted-foreground text-center md:text-right">
                        <p>&copy; {new Date().getFullYear()} H-Lab. All rights reserved.</p>
                        <p className="mt-1">경기도 수원시 장안구 서부로 2066 성균관대학교</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
