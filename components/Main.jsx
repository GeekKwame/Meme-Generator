import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { useMemes } from "../hooks/useMemes"
import { useTheme } from "../hooks/useTheme"
import { useMemeHistory } from "../hooks/useMemeHistory"
import { useUndoRedo } from "../hooks/useUndoRedo"
import MemeForm from "./MemeForm"
import MemeDisplay from "./MemeDisplay"
import MemeSearch from "./MemeSearch"
import ThemeToggle from "./ThemeToggle"

export default function Main() {
    const initialMeme = {
        topText: "One does not simply",
        bottomText: "Walk into Mordor",
        imageUrl: "http://i.imgflip.com/1bij.jpg",
        fontSize: 1,
        textColor: "#ffffff"
    }

    const { current: meme, setState: setMeme, undo, redo, canUndo, canRedo } = useUndoRedo(initialMeme)
    const { allMemes, isLoading, error: fetchError } = useMemes()
    const { history, addToHistory, clearHistory } = useMemeHistory()
    const [error, setError] = useState(null)
    const [showSearch, setShowSearch] = useState(false)
    const [showHistory, setShowHistory] = useState(false)
    const memeRef = useRef(null)

    const getMemeImage = useCallback(() => {
        if (allMemes.length === 0) {
            setError("No memes available. Please refresh the page.")
            return
        }
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const newMemeUrl = allMemes[randomNumber].url
        const newMeme = {
            ...meme,
            imageUrl: newMemeUrl
        }
        setMeme(newMeme)
        addToHistory(newMeme)
        setError(null)
    }, [allMemes, meme, setMeme, addToHistory])

    const selectMeme = useCallback((url) => {
        const newMeme = {
            ...meme,
            imageUrl: url
        }
        setMeme(newMeme)
        addToHistory(newMeme)
        setError(null)
    }, [meme, setMeme, addToHistory])

    const handleChange = useCallback((event) => {
        const { value, name } = event.currentTarget
        const newMeme = {
            ...meme,
            [name]: value
        }
        setMeme(newMeme)
    }, [meme, setMeme])

    const handleFontSizeChange = useCallback((size) => {
        const newMeme = {
            ...meme,
            fontSize: size
        }
        setMeme(newMeme)
    }, [meme, setMeme])

    const handleTextColorChange = useCallback((color) => {
        const newMeme = {
            ...meme,
            textColor: color
        }
        setMeme(newMeme)
    }, [meme, setMeme])

    const clearText = useCallback(() => {
        const newMeme = {
            ...meme,
            topText: "",
            bottomText: ""
        }
        setMeme(newMeme)
    }, [meme, setMeme])

    const downloadMeme = useCallback(() => {
        if (!memeRef.current) return

        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")
        const img = new Image()
        img.crossOrigin = "anonymous"

        img.onerror = () => {
            setError("Failed to download meme. Please try again.")
            console.error("Image load error - CORS issue may prevent download")
        }

        img.onload = () => {
            try {
                canvas.width = img.width
                canvas.height = img.height
                ctx.drawImage(img, 0, 0)

                // Add text to canvas
                ctx.fillStyle = meme.textColor || "white"
                ctx.strokeStyle = "black"
                ctx.textAlign = "center"
                ctx.textBaseline = "top"
                const fontSize = Math.max(30, Math.min(img.width / 15, 60)) * (meme.fontSize || 1)
                ctx.font = `bold ${fontSize}px Impact, Arial Black, sans-serif`
                ctx.lineWidth = Math.max(2, fontSize / 12)

                // Top text
                if (meme.topText) {
                    const topY = Math.max(20, img.height * 0.05)
                    ctx.strokeText(meme.topText.toUpperCase(), canvas.width / 2, topY)
                    ctx.fillText(meme.topText.toUpperCase(), canvas.width / 2, topY)
                }

                // Bottom text
                if (meme.bottomText) {
                    ctx.textBaseline = "bottom"
                    const bottomY = canvas.height - Math.max(20, img.height * 0.05)
                    ctx.strokeText(meme.bottomText.toUpperCase(), canvas.width / 2, bottomY)
                    ctx.fillText(meme.bottomText.toUpperCase(), canvas.width / 2, bottomY)
                }

                // Download
                canvas.toBlob((blob) => {
                    if (blob) {
                        const url = URL.createObjectURL(blob)
                        const link = document.createElement("a")
                        link.href = url
                        link.download = `meme-${Date.now()}.png`
                        document.body.appendChild(link)
                        link.click()
                        document.body.removeChild(link)
                        URL.revokeObjectURL(url)
                        setError(null)
                    } else {
                        setError("Failed to create image. Please try again.")
                    }
                }, "image/png")
            } catch (err) {
                console.error("Error creating meme:", err)
                setError("Failed to download meme. Please try again.")
            }
        }

        img.src = meme.imageUrl
    }, [meme])

    const copyToClipboard = useCallback(async () => {
        try {
            const canvas = document.createElement("canvas")
            const ctx = canvas.getContext("2d")
            const img = new Image()
            img.crossOrigin = "anonymous"

            img.onload = () => {
                canvas.width = img.width
                canvas.height = img.height
                ctx.drawImage(img, 0, 0)

                ctx.fillStyle = meme.textColor || "white"
                ctx.strokeStyle = "black"
                ctx.textAlign = "center"
                const fontSize = Math.max(30, Math.min(img.width / 15, 60)) * (meme.fontSize || 1)
                ctx.font = `bold ${fontSize}px Impact, Arial Black, sans-serif`
                ctx.lineWidth = Math.max(2, fontSize / 12)

                if (meme.topText) {
                    ctx.textBaseline = "top"
                    const topY = Math.max(20, img.height * 0.05)
                    ctx.strokeText(meme.topText.toUpperCase(), canvas.width / 2, topY)
                    ctx.fillText(meme.topText.toUpperCase(), canvas.width / 2, topY)
                }

                if (meme.bottomText) {
                    ctx.textBaseline = "bottom"
                    const bottomY = canvas.height - Math.max(20, img.height * 0.05)
                    ctx.strokeText(meme.bottomText.toUpperCase(), canvas.width / 2, bottomY)
                    ctx.fillText(meme.bottomText.toUpperCase(), canvas.width / 2, bottomY)
                }

                canvas.toBlob(async (blob) => {
                    if (blob) {
                        await navigator.clipboard.write([
                            new ClipboardItem({ "image/png": blob })
                        ])
                        setError(null)
                        // Show success message
                        const successMsg = document.createElement("div")
                        successMsg.className = "success-message"
                        successMsg.textContent = "Copied to clipboard!"
                        document.body.appendChild(successMsg)
                        setTimeout(() => successMsg.remove(), 2000)
                    }
                }, "image/png")
            }

            img.src = meme.imageUrl
        } catch (err) {
            console.error("Failed to copy:", err)
            setError("Failed to copy to clipboard. Please try downloading instead.")
        }
    }, [meme])

    const shareMeme = useCallback(async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: "Check out this meme!",
                    text: `${meme.topText} ${meme.bottomText}`,
                    url: window.location.href
                })
            } catch (err) {
                if (err.name !== "AbortError") {
                    console.error("Share failed:", err)
                }
            }
        } else {
            // Fallback: copy link
            navigator.clipboard.writeText(window.location.href)
            const successMsg = document.createElement("div")
            successMsg.className = "success-message"
            successMsg.textContent = "Link copied to clipboard!"
            document.body.appendChild(successMsg)
            setTimeout(() => successMsg.remove(), 2000)
        }
    }, [meme])

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case "z":
                        if (e.shiftKey) {
                            e.preventDefault()
                            redo()
                        } else {
                            e.preventDefault()
                            undo()
                        }
                        break
                    case "d":
                        e.preventDefault()
                        downloadMeme()
                        break
                    case "k":
                        e.preventDefault()
                        setShowSearch(true)
                        break
                    case "h":
                        e.preventDefault()
                        setShowHistory(!showHistory)
                        break
                    default:
                        break
                }
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [undo, redo, showHistory, downloadMeme])

    const displayError = error || fetchError

    return (
        <main>
            {displayError && (
                <div className="error-message" role="alert" aria-live="polite">
                    {displayError}
                    <button onClick={() => setError(null)} className="error-close">×</button>
                </div>
            )}
            
            <MemeSearch 
                allMemes={allMemes}
                onSelectMeme={selectMeme}
                isOpen={showSearch}
                onClose={() => setShowSearch(false)}
            />

            {showHistory && history.length > 0 && (
                <div className="meme-history-overlay" onClick={() => setShowHistory(false)}>
                    <div className="meme-history-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="meme-history-header">
                            <h3>Recent Memes</h3>
                            <div>
                                <button onClick={clearHistory} className="clear-history-btn">Clear</button>
                                <button onClick={() => setShowHistory(false)} className="close-button">×</button>
                            </div>
                        </div>
                        <div className="meme-history-list">
                            {history.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="meme-history-item"
                                    onClick={() => {
                                        setMeme(item)
                                        setShowHistory(false)
                                    }}
                                >
                                    <img src={item.imageUrl} alt="Meme" />
                                    <p>{item.topText || "..."} / {item.bottomText || "..."}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <MemeForm
                meme={meme}
                onTextChange={handleChange}
                onFontSizeChange={handleFontSizeChange}
                onTextColorChange={handleTextColorChange}
            />

            <div className="button-group">
                <button 
                    onClick={getMemeImage}
                    disabled={isLoading || allMemes.length === 0}
                    aria-label="Get a new random meme image"
                    title="Get random meme (Ctrl+R)"
                >
                    {isLoading ? "Loading..." : "Random 🎲"}
                </button>
                <button 
                    onClick={() => setShowSearch(true)}
                    className="secondary"
                    aria-label="Search memes"
                    title="Search memes (Ctrl+K)"
                >
                    Search 🔍
                </button>
                <button 
                    onClick={clearText}
                    className="secondary"
                    aria-label="Clear all text"
                >
                    Clear
                </button>
                <button 
                    onClick={undo}
                    disabled={!canUndo}
                    className="secondary"
                    aria-label="Undo"
                    title="Undo (Ctrl+Z)"
                >
                    ↶ Undo
                </button>
                <button 
                    onClick={redo}
                    disabled={!canRedo}
                    className="secondary"
                    aria-label="Redo"
                    title="Redo (Ctrl+Shift+Z)"
                >
                    ↷ Redo
                </button>
                <button 
                    onClick={() => setShowHistory(true)}
                    className="secondary"
                    disabled={history.length === 0}
                    aria-label="Show history"
                    title="History (Ctrl+H)"
                >
                    History 📜
                </button>
                <button 
                    onClick={copyToClipboard}
                    className="share"
                    disabled={isLoading}
                    aria-label="Copy to clipboard"
                    title="Copy to clipboard"
                >
                    Copy 📋
                </button>
                <button 
                    onClick={shareMeme}
                    className="share"
                    disabled={isLoading}
                    aria-label="Share meme"
                    title="Share meme"
                >
                    Share 🔗
                </button>
                <button 
                    onClick={downloadMeme}
                    className="download"
                    disabled={isLoading}
                    aria-label="Download meme as image"
                    title="Download (Ctrl+D)"
                >
                    Download 📥
                </button>
            </div>

            <MemeDisplay
                meme={meme}
                isLoading={isLoading}
                memeRef={memeRef}
            />
        </main>
    )
}
