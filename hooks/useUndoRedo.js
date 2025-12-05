import { useState, useCallback } from "react"

export function useUndoRedo(initialState) {
    const [history, setHistory] = useState([initialState])
    const [currentIndex, setCurrentIndex] = useState(0)

    const current = history[currentIndex]

    const setState = useCallback((newState) => {
        setHistory(prev => {
            const newHistory = prev.slice(0, currentIndex + 1)
            newHistory.push(newState)
            return newHistory.slice(-50) // Keep last 50 states
        })
        setCurrentIndex(prev => Math.min(prev + 1, 49))
    }, [currentIndex])

    const undo = useCallback(() => {
        setCurrentIndex(prev => Math.max(0, prev - 1))
    }, [])

    const redo = useCallback(() => {
        setCurrentIndex(prev => Math.min(history.length - 1, prev + 1))
    }, [history.length])

    const canUndo = currentIndex > 0
    const canRedo = currentIndex < history.length - 1

    return { current, setState, undo, redo, canUndo, canRedo }
}

