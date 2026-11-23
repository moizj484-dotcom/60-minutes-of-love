# ❦ 60 Minutes of Love • Romantic Birthday Countdown ❦

A luxury, interactive romantic birthday countdown project consisting of **60 standalone mini websites** and a **central romantic dashboard**, created directly on your Windows Desktop.

---

## 🌹 Project Highlights

- **Desktop Location**: `C:\Users\hp\Desktop\60 Minutes of Love`
- **Central Homepage (`index.html`)**: Romantic dashboard featuring a live countdown clock to midnight (2 December, 12:00 AM), progress tracker, floating hearts canvas, Web Audio romantic melody generator, and links to all 60 minutes.
- **60 Standalone Mini Websites**: Each organized in its own folder (`Minute 1` to `Minute 60`) containing its own self-contained `index.html`, assigned photograph/video, unique romantic message, and smooth next/prev navigation.
- **Root Shortcuts**: Convenient `Minute 1.html` through `Minute 60.html` files in the root folder for direct 1-click access.
- **Google Drive Media**: All 60 photographs and memories from your Google Drive link have been retrieved and assigned uniquely from Minute 1 to Minute 60 (zero reuse).
- **Configurable 60-Minute Unlocking System**: 
  - Scheduled Start: **11:00 PM on 1 December**
  - Unlocks 1 minute at a time: Minute 1 at 11:00 PM, Minute 2 at 11:01 PM ... Minute 60 at 12:00 AM Midnight.
  - **Instant Unlock / Preview Mode**: A 1-click toggle button on the homepage that instantly unlocks all 60 pages so you can preview and test every single minute ahead of time!
  - **In-Page Settings Modal**: Allows customizing the start date/time, birthday date/time, and recipient name without touching any code.
- **Minute 60 Grand Finale**:
  - Celebration banner at 12:00 AM Midnight
  - Animated 3D birthday cake with flickering candles
  - Multi-cannon celebration confetti explosion
  - Heartfelt multi-paragraph love letter with wax seal aesthetic
  - Birthday celebration anthem sound chime
  - Printable love letter format
- **100% Functional Offline**: All HTML, CSS, JavaScript, floating particle engines, confetti cannons, ambient chimes, and media files are stored locally with zero external dependencies.

---

## 📂 Project Structure

```
C:\Users\hp\Desktop\60 Minutes of Love\
├── index.html                   # Central Romantic Dashboard & Countdown Hub
├── run_countdown.bat            # 1-Click Desktop Launcher
├── README.md                    # Project Documentation
├── HOW_TO_CUSTOMIZE_PHOTOS.txt  # Manual Photo & Text Replacement Guide
│
├── assets/
│   ├── css/
│   │   ├── theme.css            # Global romantic theme & animations
│   │   ├── hub.css              # Main homepage styles & 60-card grid
│   │   └── minute.css           # Showcase styles for minutes 1 to 60
│   ├── js/
│   │   ├── config.js            # Global countdown configuration
│   │   ├── unlock-engine.js     # Real-time unlocking logic & countdown timers
│   │   ├── hearts.js            # Canvas floating hearts & rose petals
│   │   ├── confetti.js          # Canvas celebration confetti cannon
│   │   └── audio.js             # Web Audio API romantic melody synthesizer
│   └── images/                  # All 60 downloaded high-res photos & videos
│       ├── minute_1.png ... minute_60.mp4
│
├── Minute 1/                    # Standalone Mini Website for Minute 1
│   ├── index.html               # Self-contained page
│   └── photo.png                # Minute 1 photograph
├── Minute 2/
│   ├── index.html
│   └── photo.png
...
├── Minute 59/
│   ├── index.html
│   └── media.mp4
└── Minute 60/                   # Grand Finale Mini Website
    ├── index.html               # Heartfelt letter, cake, final video & confetti
    └── media.mp4                # Grand Finale video/photo
```

---

## 🚀 How to Run the Project

1. Go to your Desktop and open the folder **"60 Minutes of Love"**.
2. Double-click `run_countdown.bat` (or double-click `index.html`).
3. It will open instantly in your default web browser (Chrome, Edge, Firefox, etc.).
4. **To Test Everything Immediately**:
   - Click the **"Preview Mode (Unlock All)"** button in the top navigation bar.
   - All 60 cards will unlock instantly so you can explore, click, and verify each minute!
5. **For the Birthday Night**:
   - Leave it in **"Live Countdown Mode"**.
   - At 11:00 PM on 1 December, Minute 1 will unlock, followed by Minute 2 at 11:01 PM, creating a romantic 60-minute countdown journey culminating in the Grand Finale at 12:00 AM Midnight!

---

## 🎨 Aesthetics & Styling

- **Color Palette**: Soft blush pink (`#fff0f3`, `#ffd1dc`), warm cream (`#fffbf7`), rose gold (`#c58988`, `#b76e79`), subtle red accents (`#d90429`), and glowing champagne gold.
- **Typography**: Playfair Display, Cormorant Garamond, and Montserrat.
- **Effects**: Floating hearts & petals canvas, glassmorphism blur cards, glowing stardust hover states, double rose-gold photo frames with corner motifs, and responsive mobile-first layouts.

*Crafted with endless love for an unforgettable birthday! ❤️*
