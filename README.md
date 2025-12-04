# 🎭 Meme Generator

A fun and interactive React application that allows you to create custom memes with personalized top and bottom text. Built with React and Vite, this app fetches meme templates from the Imgflip API and lets you add your own text to create hilarious memes!

![Meme Generator](https://img.shields.io/badge/React-19-blue) ![Vite](https://img.shields.io/badge/Vite-Latest-646CFF) ![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- 🎨 **Random Meme Selection**: Get random meme templates from a collection of 100+ memes
- ✏️ **Custom Text**: Add your own top and bottom text to any meme
- 🎯 **Real-time Preview**: See your meme update in real-time as you type
- 📥 **Download Memes**: Download your custom memes as PNG images
- 🗑️ **Clear Text**: Quickly reset text fields with one click
- ⏳ **Loading States**: Visual feedback while memes are loading
- 🚨 **Error Handling**: User-friendly error messages
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- ♿ **Accessible**: Built with ARIA labels and keyboard navigation support
- ⚡ **Fast Performance**: Built with Vite for lightning-fast development and builds
- 🎨 **Smooth Animations**: Beautiful transitions and hover effects

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/meme-generator.git
cd meme-generator
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

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Imgflip API** - Meme template source
- **CSS3** - Styling

## 📁 Project Structure

```
meme-generator/
├── components/
│   ├── Header.jsx      # Header component with logo
│   └── Main.jsx        # Main meme generator component
├── images/
│   └── troll-face.png # Header logo
├── App.jsx             # Root component
├── index.jsx           # Entry point
├── index.html          # HTML template
├── index.css           # Global styles
├── vite.config.js      # Vite configuration
└── package.json        # Project dependencies
```

## 🎯 How It Works

1. On component mount, the app fetches meme templates from the Imgflip API
2. Users can enter custom text in the top and bottom text fields
3. Clicking "Get a new meme image" randomly selects a new meme template
4. The meme displays with the user's custom text overlaid
5. Users can download their meme as a PNG image
6. Text can be cleared quickly using the "Clear Text" button

## 🎮 Usage

- **Top/Bottom Text**: Type your custom text in the input fields
- **Get New Meme**: Click to randomly select a new meme template
- **Clear Text**: Reset both text fields to empty
- **Download**: Save your meme as a PNG image file

## 🎨 Customization

You can customize the app by:

- Modifying `index.css` for styling changes
- Updating the default meme text in `Main.jsx`
- Changing the API endpoint or adding more features

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Imgflip API](https://imgflip.com/api) for providing meme templates
- [Scrimba](https://scrimba.com) for the learning resources
- [Vite](https://vitejs.dev) for the amazing build tool

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/meme-generator/issues).

---

Made with ❤️ using React and Vite
