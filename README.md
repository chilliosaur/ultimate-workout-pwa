# 🏋️ Ultimate Workout PWA

Modern, glassmorphism-styled Progressive Web App for home workouts with dual workout programs, intelligent timer system, and customizable rest periods.

## ✨ Features

- **🎨 Stunning Glassmorphism UI** - Modern design with backdrop blur, vibrant gradients, and smooth animations
- **💪 Dual Workout Programs** - Program A (Push & Legs) and Program B (Pull & Core)
- **⏱️ Smart Timer System** - Countdown timer with visual feedback, color transitions, and audio alerts
- **⚙️ Customizable Settings** - Adjust rest time (10s minimum, 5s increments)
- **📱 PWA Ready** - Install on Android/iOS, works offline
- **🇹🇷 Turkish Interface** - Full Turkish language support

## 📋 Workout Programs

### Program A: İtme ve Bacak (Pazartesi & Perşembe)
1. **Squat** - 3 Set x 12-15 Tekrar
2. **Şınav (Pushup)** - 3 Set x Maksimum
3. **Pike Pushup** - 3 Set x 8-10 Tekrar
4. **Dips** - 2 Set x 12 Tekrar
5. **Bulgarian Split Squat** - 2 Set x 10 Tekrar/Bacak

### Program B: Çekme ve Karın (Salı & Cuma)
1. **Pull-up / Chin-up** - 3 Set x Maksimum
2. **Bicep Curl & Hammer Curl** - 3 Set x 12 Tekrar
3. **Concentration Curl** - 2 Set x 12 Tekrar
4. **Plank & Side Plank** - 2'şer Tur
5. **Hollow Body & Shoulder Taps** - 2 Set

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Server

1. Run `npm run dev`
2. Open `http://localhost:5173` in your browser
3. The app will hot-reload as you make changes

## 📱 PWA Installation

### Android
1. Open the app in Chrome
2. Tap the menu (three dots)
3. Select "Add to Home Screen"
4. Follow the prompts

### iOS (Safari)
1. Open the app in Safari
2. Tap the Share button
3. Select "Add to Home Screen"
4. Follow the prompts

## 🎨 Adding Custom Icons

Replace the placeholder icons in `public/icons/` with your own:

**Required sizes:**
- `icon-72x72.png`
- `icon-96x96.png`
- `icon-128x128.png`
- `icon-144x144.png`
- `icon-152x152.png`
- `icon-192x192.png`
- `icon-384x384.png`
- `icon-512x512.png`

**Quick Tip:** Create a 512x512px icon and use an online tool like [RealFaviconGenerator](https://realfavicongenerator.net/) to generate all sizes.

## 🔊 Adding Custom Audio

Place your custom beep sound in `public/sounds/beep.mp3` to override the default audio alert.

Alternatively, update the `playBeep()` function in `src/components/Timer.jsx` to use your custom sound:

```javascript
const playBeep = () => {
  const audio = new Audio('/sounds/beep.mp3');
  audio.play();
};
```

## ⚙️ Customization

### Change Default Rest Time

Edit the default value in `src/components/Timer.jsx`:

```javascript
const [restTime, setRestTime] = useState(() => {
  const saved = localStorage.getItem('restTime');
  return saved ? parseInt(saved) : 60; // Change 60 to your preferred default
});
```

### Modify Exercises

Edit `src/data/workouts.js` to add, remove, or modify exercises:

```javascript
{
  id: 1,
  name: "Your Exercise",
  sets: 3,
  reps: "12",
  target: "Muscle Group",
  icon: YourIcon, // Import from lucide-react
  description: "Exercise description"
}
```

### Change Color Scheme

Update the gradient in `src/index.css`:

```css
body {
  background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e3a8a 100%);
}
```

Or change the theme color in `public/manifest.json` and `vite.config.js`.

## 🏗️ Project Structure

```
ultimate-pwa-workout/
├── public/
│   ├── icons/          # PWA icons (add your custom icons here)
│   ├── sounds/         # Audio files
│   ├── manifest.json   # PWA manifest
│   └── sw.js          # Service worker
├── src/
│   ├── components/
│   │   ├── HomeScreen.jsx      # Landing page
│   │   ├── WorkoutScreen.jsx   # Exercise display
│   │   ├── Timer.jsx           # Rest timer
│   │   └── Settings.jsx        # Settings panel
│   ├── data/
│   │   └── workouts.js         # Workout programs data
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # React entry point
│   └── index.css               # Global styles
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🛠️ Tech Stack

- **React 18** - UI framework
- **Vite 5** - Build tool
- **Tailwind CSS 3** - Styling with glassmorphism
- **Lucide React** - Modern icon library
- **Vite PWA Plugin** - PWA generation

## 📦 Build & Deploy

### Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

Or simply drag the `dist/` folder to [Netlify Drop](https://app.netlify.com/drop).

## 🐛 Troubleshooting

### Service Worker Not Updating
1. Unregister the old service worker
2. Clear browser cache
3. Hard refresh (Ctrl+Shift+R)

### Icons Not Showing
- Ensure icons are in `public/icons/` folder
- Check file names match `manifest.json`
- Rebuild the app: `npm run build`

### Timer Audio Not Working
- Some browsers block autoplay audio
- User must interact with the page first
- Consider using vibration API as fallback

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add new exercises
- Improve the UI/UX
- Add new features (workout history, statistics, etc.)
- Fix bugs

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

**Made with ❤️ for home fitness enthusiasts**

🎯 Start your workout journey today!
