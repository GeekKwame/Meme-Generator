import { useState, useEffect } from "react"

export function useTheme() {
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("theme")
            if (saved) {
                return saved === "dark"
            }
            // Check system preference
            return window.matchMedia("(prefers-color-scheme: dark)").matches
        }
        return false
    })

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("theme", isDark ? "dark" : "light")
            document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light")
        }
    }, [isDark])

    const toggleTheme = () => setIsDark(!isDark)

    return { isDark, toggleTheme }
}
