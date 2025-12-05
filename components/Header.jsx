import { memo } from "react"
import trollFace from "../images/troll-face.png"
import ThemeToggle from "./ThemeToggle"

function Header() {
    return (
        <header className="header">
            <img 
                src={trollFace}
                alt="Troll face"
                aria-hidden="true"
            />
            <h1>Meme Generator</h1>
            <ThemeToggle />
        </header>
    )
}

export default memo(Header)