import { memo } from "react"

function MemeDisplay({ meme, isLoading, memeRef }) {
    return (
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
                    <span 
                        className="top" 
                        style={{
                            fontSize: `${(meme.fontSize || 1) * 2}rem`,
                            color: meme.textColor || "#ffffff"
                        }}
                    >
                        {meme.topText}
                    </span>
                    <span 
                        className="bottom"
                        style={{
                            fontSize: `${(meme.fontSize || 1) * 2}rem`,
                            color: meme.textColor || "#ffffff"
                        }}
                    >
                        {meme.bottomText}
                    </span>
                </>
            )}
        </div>
    )
}

export default memo(MemeDisplay)

