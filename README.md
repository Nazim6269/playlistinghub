# 🎥 YouTube Playlist Saver

A simple **React app** that allows users to **save YouTube playlist IDs** in their browser’s `localStorage` and watch them later.  
This project demonstrates **React state management**, **localStorage usage**, and **dynamic rendering** of YouTube videos.

![YouTube Playlist Saver Preview](https://your-screenshot-link.com)

---

## 🚀 Features

- 💾 **Save Playlist IDs** – Store multiple YouTube playlists locally in your browser  
- ▶️ **Watch Videos** – Play videos directly from saved playlists  
- 🗑️ **Remove Playlist** – Delete playlists when no longer needed  
- 🔎 **Search & Add** – Easily add new playlist IDs  
- 📱 **Responsive Design** – Works on desktop, tablet, and mobile  
- 🧩 **Local Storage Persistence** – Saved playlists remain after browser refresh  

---

## 🧰 Tech Stack

| Category | Technologies |
|-----------|--------------|
| **Framework** | React 19 |
| **Styling** | Tailwind CSS |
| **State Management** | React Hooks (`useState`, `useEffect`) |
| **Storage** | LocalStorage API |
| **Hosting** | Vercel / Netlify |
| **Language** | JavaScript / TypeScript |

---

## ⚙️ Installation

### Clone the repository
```bash
git clone https://github.com/Nazim6269/YouTube_Project.git
cd YouTube_Project
```
## Install Dependencies
```yarn install
# or
npm install
```

## Run Development Server
```
yarn start
# or
npm start
```

## Open your Browser

Visit: [http://localhost:3000](http://localhost:3000)

## Project Structure
```
.
├── src/
│   ├── components/
│   │   ├── PlaylistCard.tsx     # Displays individual playlist info
│   │   ├── PlaylistForm.tsx     # Form to add new playlist IDs
│   │   └── VideoPlayer.tsx      # Plays selected YouTube videos
│   │
│   ├── hooks/
│   │   └── useLocalStorage.ts   # Custom hook for handling localStorage
│   │
│   ├── pages/
│   │   └── Home.tsx             # Main page with playlist management
│   │
│   ├── assets/                  # Icons, images, logos
│   ├── App.tsx                  # Root component
│   └── index.css                # Tailwind CSS global styles
│
├── public/                      # Static files
├── tailwind.config.js           # Tailwind CSS configuration
├── package.json
└── README.md
```

## Screenshots
| Home Page                                 | Playlist Added                                    | Video Player                                  |
| ----------------------------------------- | ------------------------------------------------- | --------------------------------------------- |
| ![Home](https://your-home-screenshot.com) | ![Playlist](https://your-playlist-screenshot.com) | ![Player](https://your-player-screenshot.com) |

## 💡 Key Functionalities

- Add / Remove Playlists: Simple form to manage playlist IDs
- Video Playback: Embedded YouTube player to watch playlists
- LocalStorage Persistence: Keeps playlists even after browser refresh
- Responsive UI: Works on all devices
- Reusable Components: PlaylistCard, PlaylistForm, VideoPlayer

## 🔮 Future Enhancements

- 🔗 Fetch playlist info via YouTube API (title, thumbnails, video count)
- 🗂️ Organize playlists into categories
- 🏷️ Add tags or notes for each playlist
- 🌙 Add dark mode toggle
- 🔔 Add notifications for new videos in saved playlists

## 💻 Deployment

Deployed on Vercel for live demo.  

🔗 Live Demo: [https://youtube-project-react.vercel.app/](https://youtube-project-react.vercel.app/)

## 👨‍💻 Author

Nazim Uddin  
Front-End Developer | React & Next.js Enthusiast

- 🌐 [Portfolio](https://portfolio-nextjs-one-tau.vercel.app/)
- 💼 [LinkedIn](https://www.linkedin.com/in/nazim-uddin-23a93a216/)
- 🐙 [GitHub](https://github.com/Nazim6269)
