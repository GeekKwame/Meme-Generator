import { memo, useState, useMemo } from "react"

function MemeSearch({ allMemes, onSelectMeme, isOpen, onClose }) {
    const [searchTerm, setSearchTerm] = useState("")

    const filteredMemes = useMemo(() => {
        if (!searchTerm) return allMemes.slice(0, 20) // Show first 20 if no search
        return allMemes.filter(meme => 
            meme.name.toLowerCase().includes(searchTerm.toLowerCase())
        ).slice(0, 20)
    }, [allMemes, searchTerm])

    if (!isOpen) return null

    return (
        <div className="meme-search-overlay" onClick={onClose}>
            <div className="meme-search-modal" onClick={(e) => e.stopPropagation()}>
                <div className="meme-search-header">
                    <h3>Search Memes</h3>
                    <button onClick={onClose} className="close-button" aria-label="Close search">×</button>
                </div>
                <input
                    type="text"
                    placeholder="Search for a meme..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="meme-search-input"
                    autoFocus
                />
                <div className="meme-search-results">
                    {filteredMemes.length === 0 ? (
                        <p className="no-results">No memes found</p>
                    ) : (
                        filteredMemes.map(meme => (
                            <div
                                key={meme.id}
                                className="meme-search-item"
                                onClick={() => {
                                    onSelectMeme(meme.url)
                                    onClose()
                                }}
                            >
                                <img src={meme.url} alt={meme.name} />
                                <p>{meme.name}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default memo(MemeSearch)

