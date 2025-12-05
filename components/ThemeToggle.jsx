import { memo } from "react"
import { useTheme } from "../hooks/useTheme"

function ThemeToggle() {
    const { isDark, toggleTheme } = useTheme()

    return (
        <button 
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            title={`Switch to ${isDark ? "light" : "dark"} mode`}
        >
            {isDark ? "☀️" : "🌙"}
        </button>
    )
}

export default memo(ThemeToggle)

