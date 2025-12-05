import { memo } from "react"

function MemeForm({ meme, onTextChange, onFontSizeChange, onTextColorChange }) {
    return (
        <div className="form">
            <label htmlFor="topText">
                Top Text
                <input
                    id="topText"
                    type="text"
                    placeholder="One does not simply"
                    name="topText"
                    onChange={onTextChange}
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
                    onChange={onTextChange}
                    value={meme.bottomText}
                    aria-label="Bottom text input"
                />
            </label>

            <div className="text-customization">
                <label htmlFor="fontSize">
                    Font Size
                    <input
                        id="fontSize"
                        type="range"
                        min="1"
                        max="3"
                        step="0.1"
                        value={meme.fontSize || 1}
                        onChange={(e) => onFontSizeChange(parseFloat(e.target.value))}
                    />
                    <span>{((meme.fontSize || 1) * 100).toFixed(0)}%</span>
                </label>
                <label htmlFor="textColor">
                    Text Color
                    <input
                        id="textColor"
                        type="color"
                        value={meme.textColor || "#ffffff"}
                        onChange={(e) => onTextColorChange(e.target.value)}
                    />
                </label>
            </div>
        </div>
    )
}

export default memo(MemeForm)

