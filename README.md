# 🎭 Meme Generator v2.0

A fully-featured, production-ready React application for creating custom memes with personalized text. Built with React 18, Vite, and modern web technologies. Features dark mode, keyboard shortcuts, undo/redo, meme history, search functionality, and much more!

![Meme Generator](https://img.shields.io/badge/React-18.3-blue) ![Vite](https://img.shields.io/badge/Vite-5.4-646CFF) ![License](https://img.shields.io/badge/License-MIT-green) ![Version](https://img.shields.io/badge/Version-2.0-purple)

## ✨ Features

### Core Features
- 🎨 **Random Meme Selection**: Get random meme templates from a collection of 100+ memes
- 🔍 **Meme Search**: Search and browse through all available meme templates
- ✏️ **Custom Text**: Add your own top and bottom text to any meme
- 🎯 **Real-time Preview**: See your meme update in real-time as you type
- 📥 **Download Memes**: Download your custom memes as high-quality PNG images
- 📋 **Copy to Clipboard**: Copy memes directly to clipboard for quick sharing
- 🔗 **Share Functionality**: Share memes via native share API or copy link

### Advanced Features
- 🌙 **Dark Mode**: Beautiful dark theme with smooth transitions
- ⌨️ **Keyboard Shortcuts**: Power user shortcuts for all actions
- ↶ **Undo/Redo**: Full history support with undo/redo functionality
- 📜 **Meme History**: View and restore your recent memes (stored in localStorage)
- 🎨 **Text Customization**: Adjust font size and text color
- 💾 **Smart Caching**: Memes are cached for faster loading
- 🚨 **Error Boundary**: Graceful error handling with recovery options
- ⏳ **Loading States**: Visual feedback while memes are loading
- 📱 **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- ♿ **Accessible**: Built with ARIA labels and full keyboard navigation support
- ⚡ **Performance Optimized**: Memoization, code splitting, and optimized renders

### Developer Features
- 🧪 **ESLint & Prettier**: Code quality and formatting tools
- 🏗️ **Modular Architecture**: Custom hooks and component separation
- 🎯 **Type Safety Ready**: Easy to migrate to TypeScript
- 📦 **Production Ready**: Optimized build configuration

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/GeekKwame/Meme-Generator.git
cd Meme-Generator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## ⌨️ Keyboard Shortcuts

- `Ctrl/Cmd + D` - Download meme
- `Ctrl/Cmd + K` - Open meme search
- `Ctrl/Cmd + H` - Toggle meme history
- `Ctrl/Cmd + Z` - Undo
- `Ctrl/Cmd + Shift + Z` - Redo

## 📦 Build for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## 🛠️ Technologies Used

- **React 18.3** - Modern UI library
- **Vite 5.4** - Next-generation build tool
- **Imgflip API** - Meme template source
- **CSS3** - Advanced styling with CSS variables
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 📁 Project Structure

```
meme-generator/
├── components/
│   ├── ErrorBoundary.jsx    # Error boundary component
│   ├── Header.jsx            # Header with theme toggle
│   ├── Main.jsx              # Main meme generator component
│   ├── MemeDisplay.jsx       # Meme display component
│   ├── MemeForm.jsx          # Form with text inputs
│   ├── MemeSearch.jsx        # Meme search modal
│   └── ThemeToggle.jsx        # Dark mode toggle
├── hooks/
│   ├── useMemes.js           # Meme fetching hook
│   ├── useMemeHistory.js     # Meme history management
│   ├── useTheme.js           # Theme management
│   └── useUndoRedo.js        # Undo/redo functionality
├── images/
│   └── troll-face.png        # Header logo
├── App.jsx                    # Root component
├── index.jsx                  # Entry point
├── index.html                 # HTML template
├── index.css                  # Global styles with dark mode
├── vite.config.js             # Vite configuration
├── .eslintrc.cjs              # ESLint configuration
├── .prettierrc                # Prettier configuration
└── package.json               # Project dependencies
```

## 🎯 How It Works

1. **Initial Load**: App fetches meme templates from Imgflip API and caches them in localStorage
2. **Meme Selection**: Users can get random memes or search through available templates
3. **Text Customization**: Add custom top/bottom text with adjustable font size and color
4. **Real-time Preview**: Meme updates instantly as you type
5. **History Management**: All memes are saved to history for easy restoration
6. **Export Options**: Download as PNG, copy to clipboard, or share via native share API
7. **Theme Support**: Dark/light mode with preference persistence

## 🎮 Usage Guide

### Basic Usage
- **Top/Bottom Text**: Type your custom text in the input fields
- **Random Meme**: Click "Random 🎲" to get a random meme template
- **Search**: Click "Search 🔍" or press `Ctrl+K` to browse memes
- **Clear**: Reset both text fields
- **Download**: Save your meme as a PNG image
- **Copy**: Copy meme to clipboard
- **Share**: Share via native share API

### Advanced Usage
- **Undo/Redo**: Use `Ctrl+Z` and `Ctrl+Shift+Z` to navigate history
- **History**: Press `Ctrl+H` to view recent memes
- **Text Customization**: Adjust font size and color using the controls
- **Dark Mode**: Toggle theme using the button in the header
- **Keyboard Shortcuts**: Use shortcuts for faster workflow

## 🎨 Customization

### Styling
- Modify `index.css` for styling changes
- CSS variables are used for theming (see `:root` and `[data-theme="dark"]`)
- All colors and spacing can be customized via CSS variables

### Configuration
- Update API endpoint in `hooks/useMemes.js`
- Modify cache duration in `useMemes.js` (currently 1 hour)
- Adjust history limit in `hooks/useMemeHistory.js` (currently 20 items)
- Change undo/redo limit in `hooks/useUndoRedo.js` (currently 50 states)

## 🏗️ Architecture

### Custom Hooks
- **useMemes**: Handles meme fetching and caching
- **useTheme**: Manages dark/light theme state
- **useMemeHistory**: Manages meme history with localStorage
- **useUndoRedo**: Provides undo/redo functionality

### Component Structure
- **ErrorBoundary**: Catches and handles React errors
- **Main**: Main container with all functionality
- **MemeForm**: Text input and customization controls
- **MemeDisplay**: Meme image with overlaid text
- **MemeSearch**: Search modal with meme grid
- **ThemeToggle**: Theme switcher button

## 🚨 Error Handling

- **Error Boundary**: Catches React component errors
- **API Errors**: Graceful handling of API failures with user-friendly messages
- **CORS Errors**: Handled for image downloads
- **LocalStorage Errors**: Fallback when storage is unavailable

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints at 768px
- Touch-friendly buttons and controls
- Optimized layouts for all screen sizes

## ♿ Accessibility

- ARIA labels on all interactive elements
- Keyboard navigation support
- Screen reader friendly
- Focus indicators
- Semantic HTML

## 🔒 Privacy & Data

- All data stored locally in browser (localStorage)
- No external tracking
- No user data collection
- Memes cached for performance only

## 🐛 Known Issues

- CORS restrictions may prevent some meme downloads (browser-dependent)
- Clipboard API requires HTTPS (works in development, needs HTTPS in production)

## 🔮 Future Enhancements

Potential features for future versions:
- Image upload support
- Drag-and-drop text positioning
- Multiple text layers
- Meme templates gallery
- Social media integration
- PWA support
- Offline mode

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Imgflip API](https://imgflip.com/api) for providing meme templates
- [Scrimba](https://scrimba.com) for the learning resources
- [Vite](https://vitejs.dev) for the amazing build tool
- React team for the excellent framework

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/GeekKwame/Meme-Generator/issues).

### Development Setup

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run linting (`npm run lint`)
5. Format code (`npm run format`)
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## 📊 Project Stats

- **Version**: 2.0.0
- **React Version**: 18.3.1
- **Vite Version**: 5.4.2
- **Components**: 7
- **Custom Hooks**: 4
- **Features**: 20+

---

Made with ❤️ using React and Vite

**Enjoy creating memes! 🎉**
