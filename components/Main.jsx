import { useState, useEffect, useRef } from "react"

export default function Main() {
    const [meme, setMeme] = useState({
        topText: "One does not simply",
        bottomText: "Walk into Mordor",
        imageUrl: "http://i.imgflip.com/1bij.jpg"
    })
    const [allMemes, setAllMemes] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const memeRef = useRef(null)
    
    useEffect(() => {
        setIsLoading(true)
        setError(null)
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
    
    function getMemeImage() {
        if (allMemes.length === 0) {
            setError("No memes available. Please refresh the page.")
            return
        }
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const newMemeUrl = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            imageUrl: newMemeUrl
        }))
        setError(null)
    }
    
    function handleChange(event) {
        const {value, name} = event.currentTarget
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }
    
    function clearText() {
        setMeme(prevMeme => ({
            ...prevMeme,
            topText: "",
            bottomText: ""
        }))
    }
    
    function downloadMeme() {
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
                ctx.fillStyle = "white"
                ctx.strokeStyle = "black"
                ctx.textAlign = "center"
                ctx.textBaseline = "top"
                const fontSize = Math.max(30, Math.min(img.width / 15, 60))
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
    }

    return (
        <main>
            {error && (
                <div className="error-message" role="alert" aria-live="polite">
                    {error}
                </div>
            )}
            <div className="form">
                <label htmlFor="topText">
                    Top Text
                    <input
                        id="topText"
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                        onChange={handleChange}
                        value={meme.topText}
                        aria-label="Top text input"
                    />
                </label>

                <label htmlFor="bottomText">
                    Bottom Text
                    <input
                        id="bottomText"
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText"
                        onChange={handleChange}
                        value={meme.bottomText}
                        aria-label="Bottom text input"
                    />
                </label>
                <div className="button-group">
                    <button 
                        onClick={getMemeImage}
                        disabled={isLoading || allMemes.length === 0}
                        aria-label="Get a new random meme image"
                    >
                        {isLoading ? "Loading..." : "Get a new meme image 🖼"}
                    </button>
                    <button 
                        onClick={clearText}
                        className="secondary"
                        aria-label="Clear all text"
                    >
                        Clear Text
                    </button>
                    <button 
                        onClick={downloadMeme}
                        className="download"
                        disabled={isLoading}
                        aria-label="Download meme as image"
                    >
                        Download 📥
                    </button>
                </div>
            </div>
            <div className="meme" ref={memeRef}>
                {isLoading && (
                    <div className="loading-spinner" aria-label="Loading meme">
                        <div className="spinner"></div>
                        <p>Loading memes...</p>
                    </div>
                )}
                <img 
                    src={meme.imageUrl} 
                    alt="Meme template" 
                    style={{ display: isLoading ? "none" : "block" }}
                />
                {!isLoading && (
                    <>
                        <span className="top">{meme.topText}</span>
                        <span className="bottom">{meme.bottomText}</span>
                    </>
                )}
            </div>
        </main>
    )
}