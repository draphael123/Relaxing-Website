# Fountain - Work Room 🌿

A comprehensive, feature-rich website designed for focused studying and working. Features automatic relaxing music playback, advanced Pomodoro timer, task management, statistics tracking, live chat, and much more!

## 🌐 Live Website

**Your website is publicly accessible at:**
- **Primary URL:** https://fountain-work-room.vercel.app
- **Alternative:** https://fountain-work-room-daniel-8982s-projects.vercel.app

The website is live and ready to use! Share these URLs with anyone you want to access the site.

## ✨ Features

### 🎵 Music & Audio
- **Multiple Music Playlists** - Choose from Lo-Fi Hip Hop, Classical, Nature Sounds, Jazz, Ambient, or Piano
- **Automatic Music Playback** - Relaxing background music starts automatically when you open the site
- **Audio Visualizer** - Beautiful real-time audio visualization
- **Ambient Sounds** - Layer ambient sounds (Rain, Forest, Ocean, Fireplace, Cafe, Thunder) with music
- **Volume Controls** - Separate controls for music and ambient sounds
- **Playlist Selection** - Easy dropdown to switch between different music styles

### ⏱️ Advanced Timer
- **Pomodoro Mode** - Automatic work/break cycles with short (5 min) and long (15 min) breaks
- **Custom Timer** - Set any duration from 1-120 minutes
- **Visual Progress Ring** - Circular progress indicator showing time remaining
- **Preset Buttons** - Quick access to 25, 45, and 60-minute timers
- **Session Tracking** - Automatic tracking of completed Pomodoros
- **Break Management** - Smart break scheduling (long break every 4 sessions)

### 📊 Statistics & Progress
- **Study Statistics Dashboard** - View total study time, completed Pomodoros, daily streaks
- **Session History** - Track all your study sessions with dates and durations
- **Daily Tracking** - See today's focus time
- **Streak Counter** - Maintain daily study streaks
- **Progress Visualization** - Beautiful stat cards showing your achievements

### ✅ Task Management
- **Interactive To-Do List** - Add, complete, and delete tasks
- **Task Persistence** - Tasks saved locally and persist between sessions
- **Clear All Option** - Quick way to reset your task list
- **Visual Feedback** - Completed tasks are visually marked

### 🎨 Customization
- **Dark Mode** - Beautiful dark theme for evening study sessions
- **Background Options** - Choose from multiple gradient themes or solid colors
- **Custom Background Colors** - Pick your own color scheme
- **Theme Persistence** - Your preferences are saved automatically

### 🎯 Focus Mode
- **Full-Screen Focus** - Distraction-free full-screen mode
- **Minimalist Display** - Shows only timer and motivational quote
- **Easy Exit** - One-click to return to normal view

### 💡 Suggestions & Feedback
- **Submit Suggestions** - Share ideas for improvements
- **Export/Import** - Export your suggestions as JSON or import from file
- **Local Storage** - All suggestions saved locally
- **Suggestion History** - View all your submitted suggestions

### ✨ Motivational Quotes
- **20+ Inspiring Quotes** - Rotating motivational messages
- **Auto-Rotate** - Quotes change automatically every 30 seconds
- **Manual Control** - Click "New Quote" for instant inspiration
- **Smooth Transitions** - Beautiful fade animations

### 🔔 Notifications
- **Customizable Notifications** - Toggle sound and visual notifications
- **Custom Messages** - Set your own notification text
- **Non-Intrusive** - Beautiful toast notifications
- **Timer Alerts** - Get notified when timer completes

### ⌨️ Keyboard Shortcuts
- **Space** - Play/Pause Music
- **1, 2, 3** - Quick timer presets (25, 45, 60 min)
- **N** - New Quote
- **F** - Toggle Focus Mode
- **S** - Open/Close Settings

### 👥 Social Features
- **Live Chat** - Chat with other users studying in the work room
- **Active Users Counter** - See how many people are currently using the site
- **Total Visitors** - Track total website visitors
- **Real-Time Updates** - Counters and chat update automatically
- **User Names** - Auto-generated unique usernames for chat

### 📱 Progressive Web App (PWA)
- **Installable** - Can be installed as an app on your device
- **Offline Capable** - Works offline (with cached resources)
- **Mobile Optimized** - Responsive design for all devices

### ♿ Accessibility
- **ARIA Labels** - Screen reader support
- **Keyboard Navigation** - Full keyboard accessibility
- **High Contrast** - Readable in all themes
- **Responsive Design** - Works on all screen sizes

## 🚀 Usage

1. **Open the Website** - Simply open `index.html` in your web browser
2. **Select Music** - Choose your preferred playlist from the dropdown
3. **Set Timer** - Use presets or set a custom duration
4. **Add Tasks** - Create your study task list
5. **Start Studying** - Click start and focus!
6. **Join Chat** - Click the 💬 icon to chat with other users
7. **Track Progress** - View your statistics and session history
8. **Customize** - Adjust theme, background, and notifications in settings

## ⚙️ Settings

Access settings by clicking the ⚙️ icon or pressing `S`:

- **Theme** - Switch between light and dark mode
- **Background** - Choose gradient or solid color backgrounds
- **Notifications** - Configure sound and visual alerts
- **Keyboard Shortcuts** - View all available shortcuts

## 📊 Statistics

View your study statistics by clicking the 📊 icon:

- **Total Study Time** - Cumulative time spent studying
- **Pomodoros Completed** - Number of completed focus sessions
- **Day Streak** - Consecutive days with study sessions
- **Today's Focus** - Time studied today

## 📜 Session History

Click the 📜 icon to view:

- **Past Sessions** - All your study sessions with dates
- **Duration Tracking** - See how long each session lasted
- **Daily Breakdown** - Study time per day

## 💬 Live Chat

Click the 💬 icon to open the chat panel:

- **Real-Time Messaging** - Chat with other users in the work room
- **Custom Username** - Set your own username (click ✏️ icon)
- **Message History** - View recent messages from other users
- **User Count** - See how many users are active
- **Cross-Tab Sync** - Messages sync across your browser tabs
- **Auto-Update** - Chat refreshes every 2 seconds to show new messages

**Note:** For true cross-user chat (users on different devices), you need to deploy the `/api/chat.js` serverless function on Vercel. The chat currently works across tabs on the same browser using localStorage + BroadcastChannel API.

## 🎯 Focus Mode

Press `F` or click the 🎯 icon to enter focus mode:

- **Full-Screen** - Distraction-free environment
- **Timer Display** - Large, easy-to-read timer
- **Motivational Quote** - Inspiring message
- **Minimal UI** - Nothing to distract you

## 💾 Data Storage

All data is stored locally in your browser:
- Tasks persist between sessions
- Statistics are saved automatically
- Settings preferences are remembered
- Suggestions are stored locally

## 🎵 Music Sources

The website uses royalty-free music sources. You can:
- Replace music files with your own
- Update playlist URLs in the JavaScript
- Add your own playlists

## 🔧 Customization

### Adding Your Own Music

1. Place your music files in the project folder
2. Update the `playlists` object in `script.js`:
```javascript
const playlists = {
    myplaylist: {
        name: 'My Playlist',
        tracks: [
            'path/to/your/music.mp3'
        ]
    }
};
```

### Adding Ambient Sounds

Update the `ambientSounds` object in `script.js` with your audio file paths.

## 🌐 Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Autoplay may be blocked in some browsers - simply click play if needed
- Audio visualizer requires Web Audio API support
- PWA features work best in Chrome/Edge

## 📝 Notes

- **Music Sources**: Uses royalty-free example tracks. Replace with your own music for best experience.
- **Ambient Sounds**: Currently uses placeholder sources. Add your own audio files for full functionality.
- **Statistics**: All data is stored locally - clearing browser data will reset statistics.
- **Offline Mode**: Basic functionality works offline, but music requires internet connection.
- **Privacy**: All data stays on your device - nothing is sent to external servers (except visitor counter API).

## 🎨 Themes

- **Light Mode** - Clean, bright interface
- **Dark Mode** - Easy on the eyes for evening study
- **Custom Backgrounds** - Multiple gradient options or solid colors

## 🚀 Future Enhancements

The website is designed to be extensible. Some ideas for future additions:
- Cloud sync for statistics
- Social sharing of achievements
- More music playlists
- Additional ambient sounds
- Study group features
- Achievement badges

## 📄 License

Free to use and modify for personal or educational purposes.

---

**Enjoy your focused study sessions! ✨**

*Take breaks, stay hydrated, and achieve your goals!*
