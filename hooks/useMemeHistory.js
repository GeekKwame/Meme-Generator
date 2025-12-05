import { useState, useEffect } from "react"

export function useMemeHistory() {
    const [history, setHistory] = useState(() => {
        try {
            const saved = localStorage.getItem("memeHistory")
            return saved ? JSON.parse(saved) : []
        } catch {
            return []
        }
    })

    useEffect(() => {
        localStorage.setItem("memeHistory", JSON.stringify(history))
    }, [history])

    const addToHistory = (meme) => {
        setHistory(prev => {
            const newHistory = [meme, ...prev].slice(0, 20) // Keep last 20
            return newHistory
        })
    }

    const clearHistory = () => {
        setHistory([])
        localStorage.removeItem("memeHistory")
    }

    return { history, addToHistory, clearHistory }
}

