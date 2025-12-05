import { useState, useEffect } from "react"

export function useMemes() {
    const [allMemes, setAllMemes] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setIsLoading(true)
        setError(null)
        
        // Try to load from localStorage first
        const cachedMemes = localStorage.getItem("cachedMemes")
        const cacheTime = localStorage.getItem("memesCacheTime")
        const now = Date.now()
        
        if (cachedMemes && cacheTime && now - parseInt(cacheTime) < 3600000) {
            // Use cached memes if less than 1 hour old
            try {
                setAllMemes(JSON.parse(cachedMemes))
                setIsLoading(false)
            } catch (e) {
                console.error("Failed to parse cached memes:", e)
            }
        }

        fetch("https://api.imgflip.com/get_memes")
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to fetch memes")
                }
                return res.json()
            })
            .then(data => {
                if (data.success) {
                    setAllMemes(data.data.memes)
                    // Cache the memes
                    localStorage.setItem("cachedMemes", JSON.stringify(data.data.memes))
                    localStorage.setItem("memesCacheTime", now.toString())
                } else {
                    throw new Error("API returned unsuccessful response")
                }
            })
            .catch(err => {
                console.error("Failed to fetch memes:", err)
                setError("Failed to load memes. Please try again later.")
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    return { allMemes, isLoading, error }
}

