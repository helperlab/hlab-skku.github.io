"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Research", href: "/research" },
        { name: "Members", href: "/members" },
        { name: "Publications", href: "/publications" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-16 md:h-[110px] flex items-center",
                scrolled
                    ? "glass-nav"
                    : "bg-transparent"
            )}
        >
            <div className="container-custom flex items-center justify-between w-full">
                <Link href="/" className="flex items-center space-x-2 z-50 group">
                    <div className="relative h-12 md:h-24 w-auto">
                        <Image
                            src="/images/hlab_logo_clear_transp.png"
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
                            className="text-[16px] font-normal text-foreground/80 hover:text-primary transition-colors duration-300 tracking-wide"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden z-50 text-foreground"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute top-16 md:top-[110px] left-0 w-full h-[calc(100vh-64px)] md:h-[calc(100vh-110px)] bg-background/95 backdrop-blur-xl flex flex-col items-start px-10 pt-10 space-y-6 md:hidden z-40"
                        >
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-2xl font-medium text-foreground hover:text-primary transition-colors border-b border-gray-100 dark:border-gray-800 w-full pb-4"
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
