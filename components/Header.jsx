import trollFace from "../images/troll-face.png"

export default function Header() {
    return (
        <header className="header">
            <img 
                src={trollFace}
                alt="Troll face"
                aria-hidden="true"
            />
            <h1>Meme Generator</h1>
        </header>
    )
}