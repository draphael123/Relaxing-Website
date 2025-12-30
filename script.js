// ==================== GLOBAL VARIABLES ====================

const timerDisplay = document.getElementById('timerDisplay');
const focusTimer = document.getElementById('focusTimer');
const startTimerBtn = document.getElementById('startTimer');
const resetTimerBtn = document.getElementById('resetTimer');
const presetButtons = document.querySelectorAll('.preset-btn');
const customTimerInput = document.getElementById('customTimer');
const progressRing = document.querySelector('.progress-ring-circle');
const sessionCount = document.getElementById('sessionCount');
const breakType = document.getElementById('breakType');

const audio = document.getElementById('backgroundMusic');
const playPauseBtn = document.getElementById('playPauseBtn');
const playIcon = document.getElementById('playIcon');
const volumeSlider = document.getElementById('volumeSlider');
const playlistSelect = document.getElementById('playlistSelect');
const trackName = document.getElementById('trackName');
const uploadMusicBtn = document.getElementById('uploadMusicBtn');
const manageMusicBtn = document.getElementById('manageMusicBtn');
const youtubeSearchBtn = document.getElementById('youtubeSearchBtn');
const musicFileInput = document.getElementById('musicFileInput');
const musicUploadInput = document.getElementById('musicUploadInput');
const musicUploadModal = document.getElementById('musicUploadModal');
const manageMusicModal = document.getElementById('manageMusicModal');
const youtubeSearchModal = document.getElementById('youtubeSearchModal');
const closeMusicModal = document.getElementById('closeMusicModal');
const closeManageModal = document.getElementById('closeManageModal');
const closeYoutubeModal = document.getElementById('closeYoutubeModal');
const uploadDropzone = document.getElementById('uploadDropzone');
const uploadedFilesList = document.getElementById('uploadedFilesList');
const myMusicList = document.getElementById('myMusicList');
const youtubeSearchInput = document.getElementById('youtubeSearchInput');
const youtubeSearchButton = document.getElementById('youtubeSearchButton');
const youtubeResults = document.getElementById('youtubeResults');
const youtubePlayerContainer = document.getElementById('youtubePlayerContainer');
const youtubePlayer = document.getElementById('youtubePlayer');
const youtubeVideoTitle = document.getElementById('youtubeVideoTitle');

const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
const nextQuoteBtn = document.getElementById('nextQuoteBtn');
const focusQuote = document.getElementById('focusQuote');

const suggestionForm = document.getElementById('suggestionForm');
const suggestionInput = document.getElementById('suggestionInput');
const suggestionsUl = document.getElementById('suggestionsUl');
const exportBtn = document.getElementById('exportSuggestions');
const importBtn = document.getElementById('importSuggestions');
const importFile = document.getElementById('importFile');

const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const clearTasksBtn = document.getElementById('clearTasks');

const activeUsersDisplay = document.getElementById('activeUsers');
const totalVisitorsDisplay = document.getElementById('totalVisitors');

const settingsBtn = document.getElementById('settingsBtn');
const settingsPanel = document.getElementById('settingsPanel');
const closeSettings = document.getElementById('closeSettings');
const themeToggle = document.getElementById('themeToggle');
const bgOptions = document.querySelectorAll('.bg-option');
const customBgColor = document.getElementById('customBgColor');
const soundNotifications = document.getElementById('soundNotifications');
const visualNotifications = document.getElementById('visualNotifications');
const customNotificationText = document.getElementById('customNotificationText');
const defaultTimerDuration = document.getElementById('defaultTimerDuration');
const autoStartBreak = document.getElementById('autoStartBreak');

const focusModeBtn = document.getElementById('focusModeBtn');
const focusOverlay = document.getElementById('focusOverlay');
const exitFocusBtn = document.getElementById('exitFocusBtn');

const statsBtn = document.getElementById('statsBtn');
const statsPanel = document.getElementById('statsPanel');
const closeStats = document.getElementById('closeStats');
const totalStudyTime = document.getElementById('totalStudyTime');
const pomodoroCount = document.getElementById('pomodoroCount');
const currentStreak = document.getElementById('currentStreak');
const todayTime = document.getElementById('todayTime');

const historyBtn = document.getElementById('historyBtn');
const historyPanel = document.getElementById('historyPanel');
const closeHistory = document.getElementById('closeHistory');
const historyList = document.getElementById('historyList');

const chatBtn = document.getElementById('chatBtn');
const chatPanel = document.getElementById('chatPanel');
const closeChat = document.getElementById('closeChat');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendChatBtn = document.getElementById('sendChatBtn');
const chatUserCount = document.getElementById('chatUserCount');
const currentUsernameDisplay = document.getElementById('currentUsernameDisplay');
const editUsernameBtn = document.getElementById('editUsernameBtn');
const usernameModal = document.getElementById('usernameModal');
const usernameInput = document.getElementById('usernameInput');
const saveUsernameBtn = document.getElementById('saveUsernameBtn');
const cancelUsernameBtn = document.getElementById('cancelUsernameBtn');
const chatFileInput = document.getElementById('chatFileInput');
const uploadFileBtn = document.getElementById('uploadFileBtn');
const imagePreview = document.getElementById('imagePreview');
const previewImage = document.getElementById('previewImage');
const removePreviewBtn = document.getElementById('removePreviewBtn');

const notification = document.getElementById('notification');


// State variables
let timerInterval = null;
let timerSeconds = 25 * 60;
let isTimerRunning = false;
let timerMode = 'pomodoro';
let pomodoroSessions = 0;
let isBreakTime = false;
let totalSeconds = 25 * 60;

// Chat variables
let chatUserName = null;
let chatMessagesData = [];
let chatUpdateInterval = null;
const CHAT_STORAGE_KEY = 'fountain-chat-messages';
const CHAT_API_URL = 'https://api.jsonbin.io/v3/b'; // Using JSONBin for shared storage
const CHAT_BIN_ID = '675a123e1f5677401f3a1234'; // This will be created/updated
let chatLastUpdate = 0;
let lastMessageCount = 0;
let lastMessageIds = new Set();


// Music playlists - Add your own music URLs here
// Free music sources: freemusicarchive.org, incompetech.com, bensound.com
// For best results, host your music files and use those URLs
const playlists = {
    lofi: {
        name: 'Lo-Fi Hip Hop',
        tracks: [
            // Add your music URLs here, e.g.:
            // 'https://your-domain.com/music/lofi1.mp3',
            // 'https://your-domain.com/music/lofi2.mp3'
        ]
    },
    classical: {
        name: 'Classical',
        tracks: [
            // Add your music URLs here
        ]
    },
    jazz: {
        name: 'Jazz',
        tracks: [
            // Add your music URLs here
        ]
    },
    ambient: {
        name: 'Ambient',
        tracks: [
            // Add your music URLs here
        ]
    },
    piano: {
        name: 'Piano',
        tracks: [
            // Add your music URLs here
        ]
    },
    nature: {
        name: 'Nature Sounds',
        tracks: []
    },
    custom: {
        name: 'My Music',
        tracks: []
    }
};

let currentTrackIndex = 0;

// YouTube player variables
let youtubePlayerInstance = null;
let currentYoutubeVideoId = null;

// User uploaded music storage
const USER_MUSIC_KEY = 'fountain-user-music';
let userMusic = [];

// Load user uploaded music
function loadUserMusic() {
    try {
        const stored = localStorage.getItem(USER_MUSIC_KEY);
        if (stored) {
            userMusic = JSON.parse(stored);
            // Update custom playlist with user music
            if (!playlists.custom) {
                playlists.custom = { name: 'My Music', tracks: [] };
            }
            playlists.custom.tracks = userMusic.map(m => m.url);
            updateMyMusicList();
        }
    } catch (e) {
        console.error('Error loading user music:', e);
        userMusic = [];
    }
}

// Save user uploaded music
function saveUserMusic() {
    try {
        localStorage.setItem(USER_MUSIC_KEY, JSON.stringify(userMusic));
        if (playlists.custom) {
            playlists.custom.tracks = userMusic.map(m => m.url);
        }
    } catch (e) {
        console.error('Error saving user music:', e);
        showNotification('Error saving music. Storage may be full.', 3000);
    }
}

// Update my music list display
function updateMyMusicList() {
    if (!myMusicList) return;
    
    myMusicList.innerHTML = '';
    
    if (userMusic.length === 0) {
        myMusicList.innerHTML = '<p class="no-music-message">No music uploaded yet. Click "Upload Music" to add your tracks!</p>';
        return;
    }
    
    userMusic.forEach((music, index) => {
        const musicItem = document.createElement('div');
        musicItem.className = 'music-item';
        musicItem.innerHTML = `
            <div class="music-item-info">
                <span class="music-item-name">${music.name}</span>
                <span class="music-item-size">${formatFileSize(music.size)}</span>
            </div>
            <div class="music-item-actions">
                <button class="play-music-btn" data-index="${index}" title="Play">▶</button>
                <button class="delete-music-btn" data-index="${index}" title="Delete">🗑️</button>
            </div>
        `;
        myMusicList.appendChild(musicItem);
    });
    
    // Add event listeners
    myMusicList.querySelectorAll('.play-music-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            playUserMusic(index);
        });
    });
    
    myMusicList.querySelectorAll('.delete-music-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            deleteUserMusic(index);
        });
    });
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function playUserMusic(index) {
    if (userMusic[index] && audio) {
        audio.src = userMusic[index].url;
        audio.load();
        audio.play().catch(() => {});
        if (playlistSelect) playlistSelect.value = 'custom';
        if (trackName) trackName.textContent = userMusic[index].name;
    }
}

function deleteUserMusic(index) {
    const musicToDelete = userMusic[index];
    if (!musicToDelete) return;
    
    if (confirm(`Delete "${musicToDelete.name}"?`)) {
        // If currently playing this track, stop
        if (audio && audio.src === musicToDelete.url) {
            audio.pause();
            audio.src = '';
            if (playIcon) playIcon.textContent = '▶';
        }
        
        // Revoke object URL to free memory
        if (musicToDelete.url && musicToDelete.url.startsWith('blob:')) {
            URL.revokeObjectURL(musicToDelete.url);
        }
        
        userMusic.splice(index, 1);
        saveUserMusic();
        updateMyMusicList();
        showNotification('Music deleted', 2000);
    }
}

// Motivational quotes
const motivationalQuotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
    { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
    { text: "Focus on being productive instead of busy.", author: "Tim Ferriss" },
    { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
    { text: "Progress, not perfection.", author: "Unknown" },
    { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { text: "Dream big and dare to fail.", author: "Norman Vaughan" },
    { text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson" },
    { text: "The harder you work for something, the greater you'll feel when you achieve it.", author: "Unknown" },
    { text: "Every accomplishment starts with the decision to try.", author: "John F. Kennedy" },
    { text: "You are capable of more than you know.", author: "Unknown" },
    { text: "Small steps every day lead to big results.", author: "Unknown" },
    { text: "Your limitation—it's only your imagination.", author: "Unknown" }
];

let currentQuoteIndex = Math.floor(Math.random() * motivationalQuotes.length);

// ==================== INITIALIZATION ====================
function init() {
    loadSettings();
    loadTasks();
    loadSuggestions();
    loadStatistics();
    setupEventListeners();
    updateTimerDisplay();
    displayQuote(currentQuoteIndex);
    incrementTotalVisitors();
    sendHeartbeat();
    loadActiveUsers();
    // Load user uploaded music
    loadUserMusic();
    
    // Load default playlist
    if (audio && playlistSelect) {
        loadPlaylist('lofi');
        audio.volume = 0.5;
        if (volumeSlider) volumeSlider.value = 50;
    }
    
    // Set intervals
    setInterval(sendHeartbeat, 30000);
    setInterval(loadActiveUsers, 10000);
    setInterval(() => {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * motivationalQuotes.length);
        } while (newIndex === currentQuoteIndex && motivationalQuotes.length > 1);
        currentQuoteIndex = newIndex;
        displayQuote(currentQuoteIndex);
    }, 30000);
}

// ==================== MUSIC CONTROLS ====================
function loadPlaylist(playlistKey) {
    const playlist = playlists[playlistKey];
    if (!playlist || !audio) return;
    
    // If custom playlist and no tracks, show message
    if (playlistKey === 'custom' && (!playlist.tracks || playlist.tracks.length === 0)) {
        if (trackName) trackName.textContent = 'No music uploaded yet. Click "Upload Music" to add tracks!';
        audio.src = '';
        if (playIcon) playIcon.textContent = '▶';
        return;
    }
    
    if (!playlist.tracks || playlist.tracks.length === 0) {
        if (trackName) trackName.textContent = playlist.name + ' (No tracks available)';
        audio.src = '';
        if (playIcon) playIcon.textContent = '▶';
        return;
    }
    
    currentTrackIndex = 0;
    if (trackName) trackName.textContent = playlist.name;
    const trackUrl = playlist.tracks[currentTrackIndex];
    
    audio.src = trackUrl;
    audio.load();
    
    // Try to play automatically
    const playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                if (playIcon) playIcon.textContent = '⏸';
            })
            .catch(() => {
                if (playIcon) playIcon.textContent = '▶';
            });
    }
}

// Play next track when current ends
if (audio) {
    audio.addEventListener('ended', () => {
        const currentPlaylist = playlistSelect ? playlistSelect.value : 'lofi';
        const playlist = playlists[currentPlaylist];
        if (playlist && playlist.tracks.length > 0) {
            currentTrackIndex = (currentTrackIndex + 1) % playlist.tracks.length;
            audio.src = playlist.tracks[currentTrackIndex];
            audio.load();
            audio.play().catch(() => {});
        }
    });
}

// Playlist selection
if (playlistSelect) {
    playlistSelect.addEventListener('change', (e) => {
        const wasPlaying = !audio.paused;
        loadPlaylist(e.target.value);
        if (wasPlaying) {
            setTimeout(() => {
                audio.play().catch(() => {});
            }, 100);
        }
    });
}

// Play/Pause button
if (playPauseBtn) {
    playPauseBtn.addEventListener('click', () => {
        if (!audio.src) {
            loadPlaylist(playlistSelect ? playlistSelect.value : 'lofi');
            return;
        }
        
        if (audio.paused) {
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        if (playIcon) playIcon.textContent = '⏸';
                    })
                    .catch(error => {
                        console.error('Playback failed:', error);
                        showNotification('Unable to play music. Please check your browser settings.', 3000);
                    });
            }
        } else {
            audio.pause();
            if (playIcon) playIcon.textContent = '▶';
        }
    });
}

// Volume control
if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
        if (audio) audio.volume = e.target.value / 100;
    });
}

// Update play icon when audio state changes
if (audio) {
    audio.addEventListener('play', () => {
        if (playIcon) playIcon.textContent = '⏸';
    });
    audio.addEventListener('pause', () => {
        if (playIcon) playIcon.textContent = '▶';
    });
}

// ==================== ENHANCED TIMER ====================
function updateTimerDisplay() {
    const minutes = Math.floor(timerSeconds / 60);
    const seconds = timerSeconds % 60;
    const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    timerDisplay.textContent = display;
    if (focusOverlay.classList.contains('active')) {
        focusTimer.textContent = display;
    }
    
    // Update progress ring
    if (progressRing && totalSeconds > 0) {
        const progress = 1 - (timerSeconds / totalSeconds);
        const circumference = 2 * Math.PI * 90;
        const offset = circumference * progress;
        progressRing.style.strokeDashoffset = offset;
    }
}

function startTimer() {
    if (isTimerRunning) {
        clearInterval(timerInterval);
        isTimerRunning = false;
        startTimerBtn.textContent = 'Start';
    } else {
        timerInterval = setInterval(() => {
            if (timerSeconds > 0) {
                timerSeconds--;
                updateTimerDisplay();
            } else {
                clearInterval(timerInterval);
                isTimerRunning = false;
                startTimerBtn.textContent = 'Start';
                handleTimerComplete();
            }
        }, 1000);
        isTimerRunning = true;
        startTimerBtn.textContent = 'Pause';
        saveSessionStart();
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    if (timerMode === 'pomodoro' && isBreakTime) {
        timerSeconds = 5 * 60; // Short break
        totalSeconds = 5 * 60;
    } else {
        timerSeconds = 25 * 60;
        totalSeconds = 25 * 60;
    }
    updateTimerDisplay();
    startTimerBtn.textContent = 'Start';
}

function handleTimerComplete() {
    if (timerMode === 'pomodoro') {
        if (!isBreakTime) {
            pomodoroSessions++;
            isBreakTime = true;
            timerSeconds = pomodoroSessions % 4 === 0 ? 15 * 60 : 5 * 60;
            totalSeconds = timerSeconds;
            breakType.textContent = pomodoroSessions % 4 === 0 ? 'Long' : 'Short';
            showNotification('Pomodoro complete! Time for a break 🎉');
            updateStatistics();
        } else {
            isBreakTime = false;
            timerSeconds = 25 * 60;
            totalSeconds = 25 * 60;
            showNotification('Break over! Back to work 💪');
        }
        sessionCount.textContent = pomodoroSessions;
    } else {
        showNotification('Timer complete! ⏰');
        saveSessionEnd();
    }
    updateTimerDisplay();
}

startTimerBtn.addEventListener('click', startTimer);
resetTimerBtn.addEventListener('click', resetTimer);

presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const minutes = parseInt(btn.dataset.minutes);
        timerSeconds = minutes * 60;
        totalSeconds = minutes * 60;
        updateTimerDisplay();
        if (isTimerRunning) resetTimer();
    });
});

customTimerInput.addEventListener('change', (e) => {
    const minutes = parseInt(e.target.value);
    if (minutes > 0 && minutes <= 120) {
        timerSeconds = minutes * 60;
        totalSeconds = minutes * 60;
        updateTimerDisplay();
        if (isTimerRunning) resetTimer();
    }
});

document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        timerMode = btn.dataset.mode;
        resetTimer();
    });
});

// ==================== QUOTES ====================
function displayQuote(index) {
    const quote = motivationalQuotes[index];
    quoteText.style.opacity = '0';
    quoteAuthor.style.opacity = '0';
    
    setTimeout(() => {
        quoteText.textContent = `"${quote.text}"`;
        quoteAuthor.textContent = `— ${quote.author}`;
        quoteText.style.opacity = '1';
        quoteAuthor.style.opacity = '1';
        if (focusOverlay.classList.contains('active')) {
            focusQuote.textContent = `"${quote.text}" — ${quote.author}`;
        }
    }, 200);
}

nextQuoteBtn.addEventListener('click', () => {
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * motivationalQuotes.length);
    } while (newIndex === currentQuoteIndex && motivationalQuotes.length > 1);
    currentQuoteIndex = newIndex;
    displayQuote(currentQuoteIndex);
});

// ==================== TASK LIST ====================
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('studyTasks') || '[]');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        addTaskToDOM(task, index);
    });
}

function addTaskToDOM(task, index) {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    li.innerHTML = `
        <input type="checkbox" ${task.completed ? 'checked' : ''} data-index="${index}">
        <span class="task-text">${task.text}</span>
        <button class="delete-task" data-index="${index}">×</button>
    `;
    taskList.appendChild(li);
    
    li.querySelector('input').addEventListener('change', (e) => {
        const tasks = JSON.parse(localStorage.getItem('studyTasks') || '[]');
        tasks[e.target.dataset.index].completed = e.target.checked;
        localStorage.setItem('studyTasks', JSON.stringify(tasks));
        li.classList.toggle('completed');
    });
    
    li.querySelector('.delete-task').addEventListener('click', (e) => {
        const tasks = JSON.parse(localStorage.getItem('studyTasks') || '[]');
        tasks.splice(e.target.dataset.index, 1);
        localStorage.setItem('studyTasks', JSON.stringify(tasks));
        loadTasks();
    });
}

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (text) {
        const tasks = JSON.parse(localStorage.getItem('studyTasks') || '[]');
        tasks.push({ text, completed: false });
        localStorage.setItem('studyTasks', JSON.stringify(tasks));
        taskInput.value = '';
        loadTasks();
    }
});

clearTasksBtn.addEventListener('click', () => {
    if (confirm('Clear all tasks?')) {
        localStorage.removeItem('studyTasks');
        loadTasks();
    }
});

// ==================== SUGGESTIONS ====================
function loadSuggestions() {
    const suggestions = JSON.parse(localStorage.getItem('studyWebsiteSuggestions') || '[]');
    suggestionsUl.innerHTML = '';
    
    if (suggestions.length === 0) {
        const emptyMsg = document.createElement('li');
        emptyMsg.className = 'empty-suggestions';
        emptyMsg.textContent = 'No suggestions yet. Be the first to share an idea!';
        suggestionsUl.appendChild(emptyMsg);
    } else {
        suggestions.forEach((suggestion, index) => {
            const li = document.createElement('li');
            li.textContent = suggestion;
            suggestionsUl.appendChild(li);
        });
    }
}

suggestionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const suggestion = suggestionInput.value.trim();
    if (suggestion) {
        const suggestions = JSON.parse(localStorage.getItem('studyWebsiteSuggestions') || '[]');
        suggestions.push(suggestion);
        localStorage.setItem('studyWebsiteSuggestions', JSON.stringify(suggestions));
        suggestionInput.value = '';
        loadSuggestions();
        
        const submitBtn = suggestionForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '✓ Submitted!';
        submitBtn.style.background = 'linear-gradient(135deg, #00b894 0%, #00a085 100%)';
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)';
        }, 2000);
    }
});


// ==================== SETTINGS ====================
function loadSettings() {
    const theme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    if (themeToggle) {
        themeToggle.textContent = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
    }
    
    const bg = localStorage.getItem('background') || 'gradient1';
    document.body.setAttribute('data-bg', bg);
    bgOptions.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.bg === bg);
    });
    
    const customColor = localStorage.getItem('customBgColor');
    if (customColor && customBgColor) {
        customBgColor.value = customColor;
        document.documentElement.style.setProperty('--custom-bg-color', customColor);
    }
    
    if (soundNotifications) {
        soundNotifications.checked = localStorage.getItem('soundNotifications') !== 'false';
    }
    if (visualNotifications) {
        visualNotifications.checked = localStorage.getItem('visualNotifications') !== 'false';
    }
    if (customNotificationText) {
        customNotificationText.value = localStorage.getItem('customNotificationText') || '';
    }
    
    if (defaultTimerDuration) {
        const savedDuration = localStorage.getItem('defaultTimerDuration') || '25';
        defaultTimerDuration.value = savedDuration;
    }
    
    if (autoStartBreak) {
        autoStartBreak.checked = localStorage.getItem('autoStartBreak') !== 'false';
    }
    
}

settingsBtn.addEventListener('click', () => {
    settingsPanel.classList.add('active');
});

closeSettings.addEventListener('click', () => {
    settingsPanel.classList.remove('active');
});

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
});

bgOptions.forEach(btn => {
    btn.addEventListener('click', () => {
        const bg = btn.dataset.bg;
        document.body.setAttribute('data-bg', bg);
        localStorage.setItem('background', bg);
        bgOptions.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

customBgColor.addEventListener('change', (e) => {
    document.documentElement.style.setProperty('--custom-bg-color', e.target.value);
    localStorage.setItem('customBgColor', e.target.value);
    if (document.body.getAttribute('data-bg') === 'solid') {
        document.body.style.background = e.target.value;
    }
});

soundNotifications.addEventListener('change', (e) => {
    localStorage.setItem('soundNotifications', e.target.checked);
});

visualNotifications.addEventListener('change', (e) => {
    localStorage.setItem('visualNotifications', e.target.checked);
});

if (customNotificationText) {
    customNotificationText.addEventListener('change', (e) => {
        localStorage.setItem('customNotificationText', e.target.value);
    });
}

if (defaultTimerDuration) {
    defaultTimerDuration.addEventListener('change', (e) => {
        const duration = parseInt(e.target.value);
        if (duration >= 5 && duration <= 120) {
            localStorage.setItem('defaultTimerDuration', duration);
            if (!isTimerRunning) {
                timerSeconds = duration * 60;
                totalSeconds = duration * 60;
                updateTimerDisplay();
            }
        }
    });
}

if (autoStartBreak) {
    autoStartBreak.addEventListener('change', (e) => {
        localStorage.setItem('autoStartBreak', e.target.checked);
    });
}


// ==================== FOCUS MODE ====================
focusModeBtn.addEventListener('click', () => {
    focusOverlay.classList.add('active');
    focusQuote.textContent = `"${motivationalQuotes[currentQuoteIndex].text}" — ${motivationalQuotes[currentQuoteIndex].author}`;
});

exitFocusBtn.addEventListener('click', () => {
    focusOverlay.classList.remove('active');
});

// ==================== STATISTICS ====================
function loadStatistics() {
    const stats = JSON.parse(localStorage.getItem('studyStatistics') || '{}');
    const totalMinutes = Math.floor((stats.totalStudyTime || 0) / 60);
    totalStudyTime.textContent = `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`;
    pomodoroCount.textContent = stats.pomodoros || 0;
    currentStreak.textContent = calculateStreak(stats);
    todayTime.textContent = `${Math.floor((stats.todayTime || 0) / 60)}m`;
}

function calculateStreak(stats) {
    if (!stats.dailySessions) return 0;
    const today = new Date().toDateString();
    const sessions = Object.keys(stats.dailySessions).sort().reverse();
    let streak = 0;
    let currentDate = new Date();
    
    for (let i = 0; i < sessions.length; i++) {
        const sessionDate = new Date(sessions[i]);
        const diffDays = Math.floor((currentDate - sessionDate) / (1000 * 60 * 60 * 24));
        if (diffDays === streak) {
            streak++;
            currentDate = sessionDate;
        } else {
            break;
        }
    }
    return streak;
}

function saveSessionStart() {
    const stats = JSON.parse(localStorage.getItem('studyStatistics') || '{}');
    stats.currentSessionStart = Date.now();
    localStorage.setItem('studyStatistics', JSON.stringify(stats));
}

function saveSessionEnd() {
    const stats = JSON.parse(localStorage.getItem('studyStatistics') || '{}');
    if (stats.currentSessionStart) {
        const duration = Date.now() - stats.currentSessionStart;
        stats.totalStudyTime = (stats.totalStudyTime || 0) + duration;
        
        const today = new Date().toDateString();
        stats.todayTime = (stats.todayTime || 0) + duration;
        
        if (!stats.dailySessions) stats.dailySessions = {};
        if (!stats.dailySessions[today]) stats.dailySessions[today] = 0;
        stats.dailySessions[today] += duration;
        
        delete stats.currentSessionStart;
        localStorage.setItem('studyStatistics', JSON.stringify(stats));
        loadStatistics();
    }
}

function updateStatistics() {
    const stats = JSON.parse(localStorage.getItem('studyStatistics') || '{}');
    stats.pomodoros = (stats.pomodoros || 0) + 1;
    localStorage.setItem('studyStatistics', JSON.stringify(stats));
    loadStatistics();
}

statsBtn.addEventListener('click', () => {
    statsPanel.classList.add('active');
    loadStatistics();
});

closeStats.addEventListener('click', () => {
    statsPanel.classList.remove('active');
});

// ==================== SESSION HISTORY ====================
function loadHistory() {
    const stats = JSON.parse(localStorage.getItem('studyStatistics') || '{}');
    historyList.innerHTML = '';
    
    if (!stats.dailySessions || Object.keys(stats.dailySessions).length === 0) {
        historyList.innerHTML = '<p style="text-align: center; color: #999;">No session history yet</p>';
        return;
    }
    
    const sessions = Object.entries(stats.dailySessions)
        .sort((a, b) => new Date(b[0]) - new Date(a[0]))
        .slice(0, 20);
    
    sessions.forEach(([date, duration]) => {
        const minutes = Math.floor(duration / 60000);
        const item = document.createElement('div');
        item.className = 'history-item';
        item.innerHTML = `
            <strong>${new Date(date).toLocaleDateString()}</strong>
            <span style="float: right;">${Math.floor(minutes / 60)}h ${minutes % 60}m</span>
        `;
        historyList.appendChild(item);
    });
}

historyBtn.addEventListener('click', () => {
    historyPanel.classList.add('active');
    loadHistory();
});

closeHistory.addEventListener('click', () => {
    historyPanel.classList.remove('active');
});

// ==================== NOTIFICATIONS ====================
function showNotification(message, duration = 3000) {
    const customMsg = customNotificationText && customNotificationText.value ? customNotificationText.value : message;
    const useSound = soundNotifications && soundNotifications.checked;
    const useVisual = visualNotifications && visualNotifications.checked;
    
    if (useVisual && notification) {
        notification.textContent = customMsg;
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, duration);
    }
    
    if (useSound) {
        try {
            const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp3pVJ');
            audio.volume = 0.3;
            audio.play().catch(() => {});
        } catch (e) {
            // Sound notification failed, continue silently
        }
    }
}

// ==================== KEYBOARD SHORTCUTS ====================
document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    
    switch(e.key) {
        case ' ':
            e.preventDefault();
            playPauseBtn.click();
            break;
        case '1':
            if (presetButtons[0]) presetButtons[0].click();
            break;
        case '2':
            if (presetButtons[1]) presetButtons[1].click();
            break;
        case '3':
            if (presetButtons[2]) presetButtons[2].click();
            break;
        case 'n':
        case 'N':
            nextQuoteBtn.click();
            break;
        case 'f':
        case 'F':
            focusModeBtn.click();
            break;
        case 's':
        case 'S':
            if (!settingsPanel.classList.contains('active')) {
                settingsBtn.click();
            } else {
                closeSettings.click();
            }
            break;
    }
});

// ==================== USER TRACKING ====================
const COUNT_API_BASE = 'https://api.countapi.xyz';
const NAMESPACE = 'relaxing-study-website';
const TOTAL_VISITORS_KEY = 'total-visitors';
const ACTIVE_USERS_KEY = 'active-users';
const USER_SESSION_KEY = 'user-session-id';
const HEARTBEAT_INTERVAL = 30000;
const ACTIVE_TIMEOUT = 60000;

function getSessionId() {
    let sessionId = localStorage.getItem(USER_SESSION_KEY);
    if (!sessionId) {
        sessionId = 'user-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem(USER_SESSION_KEY, sessionId);
    }
    return sessionId;
}

async function incrementTotalVisitors() {
    const sessionId = getSessionId();
    const visitedKey = `visited-${sessionId}`;
    
    if (!sessionStorage.getItem(visitedKey)) {
        try {
            const response = await fetch(`${COUNT_API_BASE}/hit/${NAMESPACE}/${TOTAL_VISITORS_KEY}`);
            const data = await response.json();
            if (data.value !== undefined) {
                totalVisitorsDisplay.textContent = data.value;
            }
            sessionStorage.setItem(visitedKey, 'true');
        } catch (error) {
            const localCount = parseInt(localStorage.getItem('localVisitorCount') || '0') + 1;
            localStorage.setItem('localVisitorCount', localCount.toString());
            totalVisitorsDisplay.textContent = localCount;
        }
    } else {
        loadTotalVisitors();
    }
}

async function loadTotalVisitors() {
    try {
        const response = await fetch(`${COUNT_API_BASE}/get/${NAMESPACE}/${TOTAL_VISITORS_KEY}`);
        const data = await response.json();
        if (data.value !== undefined) {
            totalVisitorsDisplay.textContent = data.value;
        }
    } catch (error) {
        const localCount = localStorage.getItem('localVisitorCount') || '0';
        totalVisitorsDisplay.textContent = localCount;
    }
}

async function sendHeartbeat() {
    const sessionId = getSessionId();
    const timestamp = Date.now();
    
    try {
        localStorage.setItem(`heartbeat-${sessionId}`, timestamp.toString());
        
        const activeSessions = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('heartbeat-')) {
                const heartbeatTime = parseInt(localStorage.getItem(key) || '0');
                if (Date.now() - heartbeatTime < ACTIVE_TIMEOUT) {
                    activeSessions.push(key);
                } else {
                    localStorage.removeItem(key);
                }
            }
        }
        
        const activeCount = activeSessions.length;
        activeUsersDisplay.textContent = activeCount;
        
        try {
            await fetch(`${COUNT_API_BASE}/set/${NAMESPACE}/${ACTIVE_USERS_KEY}?value=${activeCount}`);
        } catch (e) {}
    } catch (error) {}
}

async function loadActiveUsers() {
    try {
        const activeSessions = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('heartbeat-')) {
                const heartbeatTime = parseInt(localStorage.getItem(key) || '0');
                if (Date.now() - heartbeatTime < ACTIVE_TIMEOUT) {
                    activeSessions.push(key);
                } else {
                    localStorage.removeItem(key);
                }
            }
        }
        
        activeUsersDisplay.textContent = activeSessions.length;
        
        try {
            const response = await fetch(`${COUNT_API_BASE}/get/${NAMESPACE}/${ACTIVE_USERS_KEY}`);
            const data = await response.json();
            if (data.value !== undefined && data.value > activeSessions.length) {
                activeUsersDisplay.textContent = data.value;
            }
        } catch (e) {}
    } catch (error) {
        activeUsersDisplay.textContent = '?';
    }
}

['mousedown', 'keydown', 'scroll', 'touchstart'].forEach(event => {
    document.addEventListener(event, () => {
        sendHeartbeat();
    }, { passive: true });
});

// ==================== SETUP EVENT LISTENERS ====================
function setupEventListeners() {
    // Close panels on outside click
    [settingsPanel, statsPanel, historyPanel, chatPanel].forEach(panel => {
        panel.addEventListener('click', (e) => {
            if (e.target === panel) {
                panel.classList.remove('active');
            }
        });
    });
}

// ==================== LIVE CHAT ====================
function initChat() {
    // Get or create username
    chatUserName = localStorage.getItem('chatUserName');
    if (!chatUserName) {
        // Generate a temporary username but prompt user to set their own
        const adjectives = ['Focused', 'Studious', 'Brilliant', 'Dedicated', 'Ambitious', 'Creative', 'Wise', 'Curious'];
        const nouns = ['Learner', 'Scholar', 'Student', 'Thinker', 'Explorer', 'Achiever', 'Dreamer', 'Builder'];
        const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
        const noun = nouns[Math.floor(Math.random() * nouns.length)];
        const num = Math.floor(Math.random() * 1000);
        chatUserName = `${adj}${noun}${num}`;
        // Don't save auto-generated name - let user choose
    }
    
    updateUsernameDisplay();
    loadChatMessages();
    updateChatUserCount();
    
    // Set up BroadcastChannel listener for cross-tab sync
    if (typeof BroadcastChannel !== 'undefined') {
        const channel = new BroadcastChannel('fountain-chat');
        channel.onmessage = (event) => {
            if (event.data.type === 'new-messages') {
                chatMessagesData = event.data.messages;
                loadChatMessages();
            } else if (event.data.type === 'request-sync') {
                // Respond with current messages
                const currentMessages = JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY) || '[]');
                channel.postMessage({ type: 'new-messages', messages: currentMessages });
            }
        };
    }
    
    // Update chat every 5 seconds (reduced frequency to prevent flashing)
    chatUpdateInterval = setInterval(() => {
        loadChatMessages(true); // Pass true to indicate it's a background update
        updateChatUserCount();
    }, 5000);
}

function updateUsernameDisplay() {
    if (currentUsernameDisplay && chatUserName) {
        currentUsernameDisplay.textContent = chatUserName;
    }
}

function showUsernameModal() {
    if (usernameModal) {
        usernameModal.classList.add('active');
        if (usernameInput) {
            usernameInput.value = chatUserName || '';
            setTimeout(() => usernameInput.focus(), 100);
        }
    }
}

function hideUsernameModal() {
    if (usernameModal) {
        usernameModal.classList.remove('active');
    }
}

function validateUsername(username) {
    // Username must be 3-20 characters, alphanumeric and spaces only
    const regex = /^[a-zA-Z0-9\s]{3,20}$/;
    return regex.test(username.trim());
}

function saveUsername() {
    const newUsername = usernameInput.value.trim();
    
    if (!newUsername) {
        showNotification('Please enter a username', 3000);
        return;
    }
    
    if (!validateUsername(newUsername)) {
        showNotification('Username must be 3-20 characters, letters and numbers only', 4000);
        return;
    }
    
    // Update username
    const oldUsername = chatUserName;
    chatUserName = newUsername;
    localStorage.setItem('chatUserName', chatUserName);
    updateUsernameDisplay();
    hideUsernameModal();
    
    // Notify in chat that user changed name (optional)
    if (oldUsername && oldUsername !== newUsername) {
        const systemMessage = {
            id: Date.now() + Math.random(),
            userName: 'System',
            text: `${oldUsername} is now known as ${newUsername}`,
            timestamp: Date.now(),
            isSystem: true
        };
        
        const messages = JSON.parse(localStorage.getItem('fountainChatMessages') || '[]');
        messages.push(systemMessage);
        if (messages.length > 500) {
            messages.splice(0, messages.length - 500);
        }
        localStorage.setItem('fountainChatMessages', JSON.stringify(messages));
        loadChatMessages();
    }
    
    showNotification('Username updated!', 2000);
}

async function loadChatMessages(isBackgroundUpdate = false) {
    try {
        // Try to load from shared storage first
        const sharedMessages = await loadSharedChatMessages();
        if (sharedMessages && sharedMessages.length > 0) {
            chatMessagesData = sharedMessages;
            // Also save to localStorage as backup
            localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(sharedMessages));
        } else {
            // Fallback to localStorage
            const localMessages = JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY) || '[]');
            chatMessagesData = localMessages;
        }
    } catch (error) {
        console.log('Error loading shared messages, using local storage:', error);
        // Fallback to localStorage
        const localMessages = JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY) || '[]');
        chatMessagesData = localMessages;
    }
    
    // Check if messages have actually changed
    const currentMessageCount = chatMessagesData.length;
    const currentMessageIds = new Set(chatMessagesData.map(msg => msg.id));
    
    // Only update if messages have changed
    if (isBackgroundUpdate && currentMessageCount === lastMessageCount && 
        currentMessageIds.size === lastMessageIds.size &&
        [...currentMessageIds].every(id => lastMessageIds.has(id))) {
        // No changes, skip update to prevent flashing
        return;
    }
    
    // Update tracking
    lastMessageCount = currentMessageCount;
    lastMessageIds = currentMessageIds;
    
    // Store scroll position before update
    const wasAtBottom = chatMessages.scrollHeight - chatMessages.scrollTop <= chatMessages.clientHeight + 50;
    const oldScrollHeight = chatMessages.scrollHeight;
    
    // Remove all existing elements
    chatMessages.innerHTML = '';
    
    // Show welcome message only if no messages exist
    if (chatMessagesData.length === 0) {
        const welcome = document.createElement('div');
        welcome.className = 'chat-welcome';
        welcome.innerHTML = `
            <p>Welcome to Fountain Work Room chat! 💬</p>
            <p>Share your study progress, ask questions, or just say hi!</p>
            ${!chatUserName ? '<p style="margin-top: 10px; font-size: 0.9em; color: #666;">Click ✏️ above to set your username</p>' : ''}
        `;
        chatMessages.appendChild(welcome);
    }
    
    // Display messages (show last 100)
    const messagesToShow = chatMessagesData.slice(-100);
    messagesToShow.forEach(msg => {
        displayChatMessage(msg);
    });
    
    // Restore scroll position if user wasn't at bottom, otherwise scroll to bottom
    if (wasAtBottom) {
        scrollChatToBottom();
    } else {
        const newScrollHeight = chatMessages.scrollHeight;
        const scrollDifference = newScrollHeight - oldScrollHeight;
        chatMessages.scrollTop += scrollDifference;
    }
}

async function loadSharedChatMessages() {
    try {
        // Try to load from API endpoint first (for cross-user communication)
        const response = await fetch('/api/chat');
        if (response.ok) {
            const data = await response.json();
            if (data.messages && Array.isArray(data.messages)) {
                // Update localStorage with API messages for offline access
                localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(data.messages));
                return data.messages;
            }
        }
    } catch (e) {
        // API not available, fall back to localStorage
        console.log('API not available, using localStorage');
    }
    
    // Fallback to localStorage + cross-tab sync
    return await syncChatFromSharedStorage();
}

async function syncChatFromSharedStorage() {
    // Use BroadcastChannel API for cross-tab communication
    // This allows messages to sync across tabs/windows on the same browser
    // For true cross-user sharing, we'd need a backend
    
    // Check if we have messages in localStorage
    const localMessages = JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY) || '[]');
    
    // Use BroadcastChannel to sync across tabs
    if (typeof BroadcastChannel !== 'undefined') {
        const channel = new BroadcastChannel('fountain-chat');
        channel.postMessage({ type: 'request-sync' });
    }
    
    return localMessages;
}

async function saveChatToSharedStorage(messages) {
    // Try to save to API first (for cross-user communication)
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.userName && (lastMessage.text || lastMessage.image)) {
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName: lastMessage.userName,
                    text: lastMessage.text || '',
                    image: lastMessage.image || null
                })
            });
            
            // If API save was successful, reload messages from API to get all users' messages
            if (response.ok) {
                // Reload from API to get updated messages from all users
                setTimeout(() => loadChatMessages(), 500);
            }
        } catch (e) {
            // API not available, continue with localStorage
            console.log('API not available, using localStorage');
        }
    }
    
    // Also save to localStorage for offline access
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    
    // Broadcast to other tabs
    if (typeof BroadcastChannel !== 'undefined') {
        const channel = new BroadcastChannel('fountain-chat');
        channel.postMessage({ type: 'new-messages', messages: messages });
    }
}

function displayChatMessage(message) {
    const messageDiv = document.createElement('div');
    
    // System messages have different styling
    if (message.isSystem) {
        messageDiv.className = 'chat-message system-message';
        const systemText = document.createElement('div');
        systemText.className = 'system-message-text';
        systemText.textContent = message.text;
        messageDiv.appendChild(systemText);
        chatMessages.appendChild(messageDiv);
        return;
    }
    
    messageDiv.className = `chat-message ${message.userName === chatUserName ? 'own-message' : 'other-message'}`;
    
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    
    // Add image if present
    if (message.image) {
        const imgContainer = document.createElement('div');
        imgContainer.className = 'message-image-container';
        const img = document.createElement('img');
        img.src = message.image;
        img.className = 'message-image';
        img.alt = 'Uploaded image';
        img.loading = 'lazy';
        // Make image clickable to view full size
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            const fullScreen = document.createElement('div');
            fullScreen.className = 'image-fullscreen';
            fullScreen.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); z-index: 10000; display: flex; align-items: center; justify-content: center; cursor: pointer;';
            const fullImg = document.createElement('img');
            fullImg.src = message.image;
            fullImg.style.cssText = 'max-width: 90%; max-height: 90%; object-fit: contain;';
            fullScreen.appendChild(fullImg);
            fullScreen.addEventListener('click', () => fullScreen.remove());
            document.body.appendChild(fullScreen);
        });
        imgContainer.appendChild(img);
        bubble.appendChild(imgContainer);
    }
    
    // Add text if present
    if (message.text) {
        const textDiv = document.createElement('div');
        textDiv.className = 'message-text';
        textDiv.textContent = message.text;
        bubble.appendChild(textDiv);
    }
    
    const meta = document.createElement('div');
    meta.className = 'message-meta';
    
    const author = document.createElement('span');
    author.className = 'message-author';
    author.textContent = message.userName === chatUserName ? 'You' : message.userName;
    
    const time = document.createElement('span');
    time.className = 'message-time';
    time.textContent = formatChatTime(message.timestamp);
    
    meta.appendChild(author);
    meta.appendChild(time);
    
    messageDiv.appendChild(bubble);
    messageDiv.appendChild(meta);
    chatMessages.appendChild(messageDiv);
}

function formatChatTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return 'just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

async function sendChatMessage() {
    const text = chatInput ? chatInput.value.trim() : '';
    const imageData = previewImage && previewImage.src && previewImage.src.startsWith('data:') ? previewImage.src : null;
    
    // Require either text or image
    if (!text && !imageData) return;
    
    if (!chatUserName) {
        showNotification('Please set a username first', 3000);
        showUsernameModal();
        return;
    }
    
    const message = {
        id: Date.now() + Math.random(),
        userName: chatUserName,
        text: text || '',
        image: imageData || null,
        timestamp: Date.now()
    };
    
    // Get current messages
    const messages = chatMessagesData.length > 0 ? [...chatMessagesData] : 
                     JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY) || '[]');
    messages.push(message);
    
    // Keep only last 500 messages to prevent storage bloat
    if (messages.length > 500) {
        messages.splice(0, messages.length - 500);
    }
    
    // Save to shared storage
    await saveChatToSharedStorage(messages);
    chatMessagesData = messages;
    chatInput.value = '';
    
    // Clear image preview
    clearImagePreview();
    
    // Reload messages to show the new one
    loadChatMessages();
    updateChatUserCount();
    
    // Scroll to bottom after sending
    setTimeout(() => scrollChatToBottom(), 100);
}

function scrollChatToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function updateChatUserCount() {
    // Count unique users who have sent messages in the last hour
    const messages = JSON.parse(localStorage.getItem('fountainChatMessages') || '[]');
    const oneHourAgo = Date.now() - 3600000;
    const recentUsers = new Set();
    
    messages.forEach(msg => {
        if (msg.timestamp > oneHourAgo) {
            recentUsers.add(msg.userName);
        }
    });
    
    chatUserCount.textContent = recentUsers.size || 1;
}

chatBtn.addEventListener('click', () => {
    chatPanel.classList.toggle('active');
    if (chatPanel.classList.contains('active')) {
        // Check if user has a username
        if (!chatUserName) {
            showUsernameModal();
        }
        setTimeout(() => {
            if (!usernameModal.classList.contains('active')) {
                chatInput.focus();
            }
            scrollChatToBottom();
        }, 100);
    }
});

closeChat.addEventListener('click', () => {
    chatPanel.classList.remove('active');
    hideUsernameModal();
});

editUsernameBtn.addEventListener('click', () => {
    if (usernameInput) {
        usernameInput.value = chatUserName || '';
    }
    showUsernameModal();
});

saveUsernameBtn.addEventListener('click', saveUsername);

cancelUsernameBtn.addEventListener('click', () => {
    hideUsernameModal();
    // If no username exists, show modal again after a moment
    if (!chatUserName) {
        setTimeout(() => {
            if (chatPanel.classList.contains('active')) {
                showUsernameModal();
            }
        }, 100);
    }
});

usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        saveUsername();
    }
});

sendChatBtn.addEventListener('click', () => {
    if (!chatUserName) {
        showNotification('Please set a username first', 3000);
        showUsernameModal();
        return;
    }
    sendChatMessage();
});

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        if (!chatUserName) {
            showNotification('Please set a username first', 3000);
            showUsernameModal();
            return;
        }
        sendChatMessage();
    }
});

// File upload functionality
if (uploadFileBtn && chatFileInput) {
    uploadFileBtn.addEventListener('click', () => {
        chatFileInput.click();
    });

    chatFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                showNotification('Please select an image file', 3000);
                chatFileInput.value = '';
                return;
            }
            
            // Check file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                showNotification('Image size must be less than 5MB', 3000);
                chatFileInput.value = '';
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (event) => {
                if (previewImage && imagePreview) {
                    previewImage.src = event.target.result;
                    imagePreview.style.display = 'block';
                }
            };
            reader.onerror = () => {
                showNotification('Error reading image file', 3000);
                chatFileInput.value = '';
            };
            reader.readAsDataURL(file);
        }
    });
}

if (removePreviewBtn) {
    removePreviewBtn.addEventListener('click', () => {
        clearImagePreview();
    });
}

function clearImagePreview() {
    if (previewImage) previewImage.src = '';
    if (imagePreview) imagePreview.style.display = 'none';
    if (chatFileInput) chatFileInput.value = '';
}

// ==================== MUSIC UPLOAD ====================
if (uploadMusicBtn) {
    uploadMusicBtn.addEventListener('click', () => {
        if (musicUploadModal) musicUploadModal.classList.add('active');
    });
}

if (manageMusicBtn) {
    manageMusicBtn.addEventListener('click', () => {
        updateMyMusicList();
        if (manageMusicModal) manageMusicModal.classList.add('active');
    });
}

if (closeMusicModal) {
    closeMusicModal.addEventListener('click', () => {
        if (musicUploadModal) musicUploadModal.classList.remove('active');
    });
}

if (closeManageModal) {
    closeManageModal.addEventListener('click', () => {
        if (manageMusicModal) manageMusicModal.classList.remove('active');
    });
}

// Close modals when clicking outside
if (musicUploadModal) {
    musicUploadModal.addEventListener('click', (e) => {
        if (e.target === musicUploadModal) {
            musicUploadModal.classList.remove('active');
        }
    });
}

if (manageMusicModal) {
    manageMusicModal.addEventListener('click', (e) => {
        if (e.target === manageMusicModal) {
            manageMusicModal.classList.remove('active');
        }
    });
}

// File upload handling
if (musicUploadInput) {
    musicUploadInput.addEventListener('change', handleMusicUpload);
}

// Drag and drop
if (uploadDropzone) {
    uploadDropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadDropzone.classList.add('drag-over');
    });
    
    uploadDropzone.addEventListener('dragleave', () => {
        uploadDropzone.classList.remove('drag-over');
    });
    
    uploadDropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadDropzone.classList.remove('drag-over');
        const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('audio/'));
        if (files.length > 0) {
            processMusicFiles(files);
        }
    });
}

function handleMusicUpload(e) {
    const files = Array.from(e.target.files).filter(file => file.type.startsWith('audio/'));
    if (files.length > 0) {
        processMusicFiles(files);
    }
    e.target.value = ''; // Reset input
}

function processMusicFiles(files) {
    if (!uploadedFilesList) return;
    
    uploadedFilesList.innerHTML = '';
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    files.forEach((file, index) => {
        if (file.size > maxSize) {
            showNotification(`${file.name} is too large (max 10MB)`, 3000);
            return;
        }
        
        const fileItem = document.createElement('div');
        fileItem.className = 'upload-file-item';
        fileItem.innerHTML = `
            <span class="upload-file-name">${file.name}</span>
            <span class="upload-file-status">Processing...</span>
        `;
        uploadedFilesList.appendChild(fileItem);
        
        // Create blob URL for immediate playback
        const blobUrl = URL.createObjectURL(file);
        
        const musicData = {
            name: file.name,
            size: file.size,
            type: file.type,
            url: blobUrl,
            uploadedAt: Date.now()
        };
        
        userMusic.push(musicData);
        saveUserMusic();
        
        fileItem.querySelector('.upload-file-status').textContent = '✓ Uploaded';
        fileItem.classList.add('uploaded');
        
        showNotification(`${file.name} uploaded successfully!`, 2000);
        updateMyMusicList();
    });
}

// ==================== YOUTUBE INTEGRATION ====================
if (youtubeSearchBtn) {
    youtubeSearchBtn.addEventListener('click', () => {
        if (youtubeSearchModal) youtubeSearchModal.classList.add('active');
        if (youtubeSearchInput) {
            setTimeout(() => youtubeSearchInput.focus(), 100);
        }
    });
}

if (closeYoutubeModal) {
    closeYoutubeModal.addEventListener('click', () => {
        if (youtubeSearchModal) youtubeSearchModal.classList.remove('active');
        // Stop YouTube player when closing
        if (youtubePlayerInstance) {
            youtubePlayerInstance.stopVideo();
        }
    });
}

if (youtubeSearchModal) {
    youtubeSearchModal.addEventListener('click', (e) => {
        if (e.target === youtubeSearchModal) {
            youtubeSearchModal.classList.remove('active');
            if (youtubePlayerInstance) {
                youtubePlayerInstance.stopVideo();
            }
        }
    });
}

// YouTube search functionality
if (youtubeSearchButton) {
    youtubeSearchButton.addEventListener('click', () => {
        performYouTubeSearch();
    });
}

if (youtubeSearchInput) {
    youtubeSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performYouTubeSearch();
        }
    });
}

// Initialize YouTube API
let youtubeAPIReady = false;
function onYouTubeIframeAPIReady() {
    youtubeAPIReady = true;
}

// Fallback if API loads before our code
if (typeof YT !== 'undefined' && YT.Player) {
    youtubeAPIReady = true;
}

function performYouTubeSearch() {
    const query = youtubeSearchInput ? youtubeSearchInput.value.trim() : '';
    if (!query) {
        showNotification('Please enter a search term', 2000);
        return;
    }
    
    if (!youtubeResults) return;
    
    youtubeResults.innerHTML = '<p class="searching">Searching...</p>';
    
    // Since we can't directly search without API key, we'll create a search interface
    // that allows users to paste YouTube video URLs or use a search helper
    showYouTubeSearchHelper(query);
}

function showYouTubeSearchHelper(query) {
    if (!youtubeResults) return;
    
    youtubeResults.innerHTML = `
        <div class="youtube-search-helper">
            <p><strong>Search YouTube for:</strong> "${query}"</p>
            <p class="youtube-instructions">
                <strong>Option 1:</strong> Go to <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(query)}" target="_blank">YouTube</a> and copy a video URL, then paste it below.
            </p>
            <div class="youtube-url-input">
                <input type="text" id="youtubeUrlInput" placeholder="Paste YouTube video URL here (e.g., https://www.youtube.com/watch?v=...)" class="youtube-url-field">
                <button id="loadYoutubeUrlBtn" class="load-youtube-btn">Load Video</button>
            </div>
            <p class="youtube-note">💡 Tip: Search on YouTube, then paste the video URL here to play the audio.</p>
        </div>
    `;
    
    const urlInput = document.getElementById('youtubeUrlInput');
    const loadBtn = document.getElementById('loadYoutubeUrlBtn');
    
    if (loadBtn) {
        loadBtn.addEventListener('click', () => {
            const url = urlInput ? urlInput.value.trim() : '';
            if (url) {
                loadYouTubeVideo(url);
            }
        });
    }
    
    if (urlInput) {
        urlInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const url = urlInput.value.trim();
                if (url) {
                    loadYouTubeVideo(url);
                }
            }
        });
    }
}

function loadYouTubeVideo(url) {
    // Extract video ID from various YouTube URL formats
    let videoId = null;
    
    // Standard format: https://www.youtube.com/watch?v=VIDEO_ID
    const match1 = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    if (match1) {
        videoId = match1[1];
    }
    
    // Short format: https://youtu.be/VIDEO_ID
    if (!videoId) {
        const match2 = url.match(/youtu\.be\/([^&\n?#]+)/);
        if (match2) {
            videoId = match2[1];
        }
    }
    
    // Embed format: https://www.youtube.com/embed/VIDEO_ID
    if (!videoId) {
        const match3 = url.match(/youtube\.com\/embed\/([^&\n?#]+)/);
        if (match3) {
            videoId = match3[1];
        }
    }
    
    if (!videoId) {
        showNotification('Invalid YouTube URL. Please paste a valid YouTube video URL.', 3000);
        return;
    }
    
    playYouTubeVideo(videoId);
}

function playYouTubeVideo(videoId) {
    if (!youtubePlayer) return;
    
    // Hide results, show player
    if (youtubeResults) youtubeResults.style.display = 'none';
    if (youtubePlayerContainer) youtubePlayerContainer.style.display = 'block';
    
    // Wait for YouTube API to be ready
    const initPlayer = () => {
        if (typeof YT === 'undefined' || !YT.Player) {
            setTimeout(initPlayer, 100);
            return;
        }
        
        // Initialize or update YouTube player
        if (!youtubePlayerInstance) {
            youtubePlayerInstance = new YT.Player('youtubePlayer', {
                height: '200',
                width: '100%',
                videoId: videoId,
                playerVars: {
                    'autoplay': 1,
                    'controls': 1,
                    'modestbranding': 1,
                    'rel': 0,
                    'showinfo': 0
                },
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        } else {
            youtubePlayerInstance.loadVideoById(videoId);
        }
        
        currentYoutubeVideoId = videoId;
        
        // Switch to YouTube playlist
        if (playlistSelect) playlistSelect.value = 'youtube';
        
        // Get video title (would need API for this, but we'll show the video ID for now)
        if (youtubeVideoTitle) {
            youtubeVideoTitle.textContent = `Video ID: ${videoId}`;
        }
    };
    
    initPlayer();
}

function onPlayerReady(event) {
    event.target.playVideo();
    if (trackName) trackName.textContent = 'YouTube Audio';
}

function onPlayerStateChange(event) {
    // Handle player state changes if needed
    if (event.data === YT.PlayerState.PLAYING) {
        if (playIcon) playIcon.textContent = '⏸';
    } else if (event.data === YT.PlayerState.PAUSED) {
        if (playIcon) playIcon.textContent = '▶';
    }
}

// Handle YouTube playlist selection
if (playlistSelect) {
    playlistSelect.addEventListener('change', (e) => {
        if (e.target.value === 'youtube') {
            if (!currentYoutubeVideoId) {
                if (youtubeSearchModal) youtubeSearchModal.classList.add('active');
                showNotification('Search YouTube to play audio', 3000);
            }
        }
    });
}

// ==================== START APPLICATION ====================
window.addEventListener('load', () => {
    init();
    initChat();
    
    // Check if YouTube API is already loaded
    if (typeof YT !== 'undefined' && YT.Player) {
        youtubeAPIReady = true;
    }
});
