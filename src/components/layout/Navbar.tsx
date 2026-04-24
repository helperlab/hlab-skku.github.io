"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { BASE_PATH } from "@/lib/constants";
import { useTheme } from "@/components/ThemeProvider";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const { resolved, setTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // 모바일 메뉴 열릴 때 배경 스크롤 방지
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const toggleTheme = () => {
        setTheme(resolved === "dark" ? "light" : "dark");
    };

    const navLinks = [
        { name: "Research", href: "/research" },
        { name: "Members", href: "/members" },
        { name: "Publications", href: "/publications" },
        { name: "Contact", href: "/contact" },
    ];

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-24 md:h-[110px] flex items-center",
                scrolled
                    ? "glass-nav"
                    : "bg-transparent"
            )}
        >
            <div className="container-custom flex items-center justify-between w-full">
                <Link href="/" className="flex items-center space-x-2 z-50 group">
                    <div className="relative h-[58px] md:h-24 w-auto">
                        <Image
                            src={`${BASE_PATH}/images/heli_no_backg.png`}
                            alt="H-Lab Logo"
                            width={360}
                            height={120}
                            className="h-full w-auto object-contain"
                            priority
                        />
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "text-[16px] font-normal transition-colors duration-300 tracking-wide",
                                isActive(link.href)
                                    ? "text-primary font-medium"
                                    : "text-foreground/80 hover:text-primary"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        aria-label="Toggle theme"
                    >
                        {resolved === "dark" ? (
                            <Sun className="h-5 w-5 text-foreground/80" />
                        ) : (
                            <Moon className="h-5 w-5 text-foreground/80" />
                        )}
                    </button>
                </div>

                {/* Mobile: Theme Toggle + Menu Toggle */}
                <div className="flex items-center gap-2 md:hidden z-50">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        aria-label="Toggle theme"
                    >
                        {resolved === "dark" ? (
                            <Sun className="h-5 w-5 text-foreground" />
                        ) : (
                            <Moon className="h-5 w-5 text-foreground" />
                        )}
                    </button>
                    <button
                        className="text-foreground"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute top-24 md:top-[110px] left-0 w-full h-[calc(100vh-96px)] md:h-[calc(100vh-110px)] bg-background/95 backdrop-blur-xl flex flex-col items-start px-10 pt-10 space-y-6 md:hidden z-40"
                        >
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={cn(
                                        "text-3xl font-medium transition-colors border-b border-gray-100 dark:border-gray-800 w-full pb-4",
                                        isActive(link.href)
                                            ? "text-primary"
                                            : "text-foreground hover:text-primary"
                                    )}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}
