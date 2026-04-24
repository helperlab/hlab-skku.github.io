"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

const ThemeContext = createContext<{
    theme: Theme;
    setTheme: (theme: Theme) => void;
    resolved: "light" | "dark";
}>({
    theme: "system",
    setTheme: () => {},
    resolved: "light",
});

export function useTheme() {
    return useContext(ThemeContext);
}

function getSystemTheme(): "light" | "dark" {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>("system");
    const [resolved, setResolved] = useState<"light" | "dark">("light");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("theme") as Theme | null;
        if (stored && ["light", "dark", "system"].includes(stored)) {
            setTheme(stored);
        }
        setMounted(true);
    }, []);

    useEffect(() => {
        const r = theme === "system" ? getSystemTheme() : theme;
        setResolved(r);
        document.documentElement.classList.toggle("dark", r === "dark");
    }, [theme]);

    useEffect(() => {
        if (theme !== "system") return;
        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        const handler = () => {
            const r = getSystemTheme();
            setResolved(r);
            document.documentElement.classList.toggle("dark", r === "dark");
        };
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, [theme]);

    const handleSetTheme = (t: Theme) => {
        setTheme(t);
        localStorage.setItem("theme", t);
    };

    // Prevent flash by not rendering until mounted
    if (!mounted) {
        return <>{children}</>;
    }

    return (
        <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme, resolved }}>
            {children}
        </ThemeContext.Provider>
    );
}
