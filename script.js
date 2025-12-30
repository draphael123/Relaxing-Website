// ==================== GLOBAL VARIABLES ====================
const audio = document.getElementById('backgroundMusic');
const playPauseBtn = document.getElementById('playPauseBtn');
const playIcon = document.getElementById('playIcon');
const volumeSlider = document.getElementById('volumeSlider');
const playlistSelect = document.getElementById('playlistSelect');
const trackName = document.getElementById('trackName');

const timerDisplay = document.getElementById('timerDisplay');
const focusTimer = document.getElementById('focusTimer');
const startTimerBtn = document.getElementById('startTimer');
const resetTimerBtn = document.getElementById('resetTimer');
const presetButtons = document.querySelectorAll('.preset-btn');
const customTimerInput = document.getElementById('customTimer');
const progressRing = document.querySelector('.progress-ring-circle');
const sessionCount = document.getElementById('sessionCount');
const breakType = document.getElementById('breakType');

const soundButtons = document.querySelectorAll('.sound-btn');
const ambientVolume = document.getElementById('ambientVolume');

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
const autoPlayMusic = document.getElementById('autoPlayMusic');
const defaultVolume = document.getElementById('defaultVolume');
const volumeDisplay = document.getElementById('volumeDisplay');
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

const notification = document.getElementById('notification');

// AI Text Improver
const textToImprove = document.getElementById('textToImprove');
const improveTextBtn = document.getElementById('improveTextBtn');
const improveBtnText = document.getElementById('improveBtnText');
const improveBtnLoader = document.getElementById('improveBtnLoader');
const improvedTextDisplay = document.getElementById('improvedTextDisplay');
const textOutputSection = document.getElementById('textOutputSection');
const copyImprovedBtn = document.getElementById('copyImprovedBtn');
const replaceTextBtn = document.getElementById('replaceTextBtn');
const clearTextBtn = document.getElementById('clearTextBtn');
const charCount = document.getElementById('charCount');
const improvementTypeRadios = document.querySelectorAll('input[name="improvementType"]');
const openaiApiKey = document.getElementById('openaiApiKey');
const useFreeAI = document.getElementById('useFreeAI');

// State variables
let timerInterval = null;
let timerSeconds = 25 * 60;
let isTimerRunning = false;
let timerMode = 'pomodoro';
let pomodoroSessions = 0;
let isBreakTime = false;
let totalSeconds = 25 * 60;
let audioContext = null;
let analyser = null;
let dataArray = null;
let animationFrame = null;

// Chat variables
let chatUserName = null;
let chatMessagesData = [];
let chatUpdateInterval = null;
const CHAT_STORAGE_KEY = 'fountain-chat-messages';
const CHAT_API_URL = 'https://api.jsonbin.io/v3/b'; // Using JSONBin for shared storage
const CHAT_BIN_ID = '675a123e1f5677401f3a1234'; // This will be created/updated
let chatLastUpdate = 0;

// Music playlists - Note: Add your own music files for best experience
// You can use free music from: https://freemusicarchive.org/ or https://incompetech.com/music/
const playlists = {
    lofi: {
        name: 'Lo-Fi Hip Hop',
        tracks: [
            // Add your own music file path here
            // Example: './music/lofi.mp3' or 'https://your-server.com/music/lofi.mp3'
            'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
        ]
    },
    classical: {
        name: 'Classical',
        tracks: [
            'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
        ]
    },
    nature: {
        name: 'Nature Sounds',
        tracks: [
            'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
        ]
    },
    jazz: {
        name: 'Jazz',
        tracks: [
            'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
        ]
    },
    ambient: {
        name: 'Ambient',
        tracks: [
            'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
        ]
    },
    piano: {
        name: 'Piano',
        tracks: [
            'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
        ]
    }
};

// Ambient sounds (using free audio sources)
const ambientSounds = {
    rain: new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'),
    forest: new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'),
    ocean: new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'),
    fireplace: new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'),
    cafe: new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'),
    thunder: new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3')
};

Object.values(ambientSounds).forEach(sound => {
    sound.loop = true;
    sound.volume = 0.3;
});

let activeAmbientSound = null;

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
    
    // Load music settings
    const savedVolume = localStorage.getItem('defaultVolume') || '50';
    audio.volume = savedVolume / 100;
    volumeSlider.value = savedVolume;
    defaultVolume.value = savedVolume;
    volumeDisplay.textContent = savedVolume + '%';
    
    loadPlaylist('lofi');
    
    // Auto-play music if enabled and source is available
    const shouldAutoPlay = localStorage.getItem('autoPlayMusic') !== 'false';
    if (shouldAutoPlay && autoPlayMusic && audio.src && !audio.src.includes('soundhelix.com/examples')) {
        autoPlayMusic.checked = true;
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                playIcon.textContent = '⏸';
            }).catch(() => {
                playIcon.textContent = '▶';
                // Autoplay was blocked - this is normal browser behavior
            });
        }
    } else if (autoPlayMusic) {
        autoPlayMusic.checked = false;
        if (!audio.src || audio.src.includes('soundhelix.com/examples')) {
            showNotification('Add your own music files to enable playback. See settings for instructions.', 5000);
        }
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
    if (!playlist || !playlist.tracks.length) return;
    
    trackName.textContent = playlist.name;
    
    // Check if the track URL is a placeholder
    const trackUrl = playlist.tracks[0];
    if (trackUrl.includes('soundhelix.com/examples')) {
        // This is a placeholder - show helpful message
        trackName.textContent = playlist.name + ' (Add your own music)';
        showNotification('Music sources are placeholders. Add your own music files in script.js', 6000);
        audio.src = '';
        return;
    }
    
    audio.src = trackUrl;
    
    // Add error handling
    audio.addEventListener('error', () => {
        trackName.textContent = playlist.name + ' (Unable to load)';
        showNotification('Music file not found. Please add your own music files.', 5000);
    }, { once: true });
    
    audio.load();
}

playlistSelect.addEventListener('change', (e) => {
    loadPlaylist(e.target.value);
    if (!audio.paused) {
        audio.play();
    }
});

playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    playIcon.textContent = '⏸';
                })
                .catch(error => {
                    console.error('Playback failed:', error);
                    playIcon.textContent = '▶';
                    showNotification('Unable to play music. Please check your browser settings or add your own music files.', 5000);
                });
        }
    } else {
        audio.pause();
        playIcon.textContent = '▶';
    }
});

volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value / 100;
});

audio.addEventListener('play', () => playIcon.textContent = '⏸');
audio.addEventListener('pause', () => playIcon.textContent = '▶');


// ==================== AMBIENT SOUNDS ====================
soundButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const soundType = btn.dataset.sound;
        
        if (btn.classList.contains('active')) {
            btn.classList.remove('active');
            if (activeAmbientSound) {
                activeAmbientSound.pause();
                activeAmbientSound.currentTime = 0;
                activeAmbientSound = null;
            }
        } else {
            soundButtons.forEach(b => b.classList.remove('active'));
            if (activeAmbientSound) {
                activeAmbientSound.pause();
                activeAmbientSound.currentTime = 0;
            }
            
            activeAmbientSound = ambientSounds[soundType];
            if (activeAmbientSound) {
                activeAmbientSound.volume = ambientVolume.value / 100;
                activeAmbientSound.play().catch(e => console.log('Ambient sound error:', e));
                btn.classList.add('active');
            }
        }
    });
});

ambientVolume.addEventListener('input', (e) => {
    if (activeAmbientSound) {
        activeAmbientSound.volume = e.target.value / 100;
    }
});

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
    const theme = localStorage.getItem('theme') || 'light';
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
    
    if (defaultVolume) {
        const savedVolume = localStorage.getItem('defaultVolume') || '50';
        defaultVolume.value = savedVolume;
        if (volumeDisplay) volumeDisplay.textContent = savedVolume + '%';
    }
    
    if (defaultTimerDuration) {
        const savedDuration = localStorage.getItem('defaultTimerDuration') || '25';
        defaultTimerDuration.value = savedDuration;
    }
    
    if (autoStartBreak) {
        autoStartBreak.checked = localStorage.getItem('autoStartBreak') !== 'false';
    }
    
    if (openaiApiKey) {
        const savedKey = localStorage.getItem('openaiApiKey');
        if (savedKey) {
            openaiApiKey.value = savedKey;
        }
    }
    
    if (useFreeAI) {
        useFreeAI.checked = localStorage.getItem('useFreeAI') !== 'false';
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

if (autoPlayMusic) {
    autoPlayMusic.addEventListener('change', (e) => {
        localStorage.setItem('autoPlayMusic', e.target.checked);
    });
}

if (defaultVolume) {
    defaultVolume.addEventListener('input', (e) => {
        const volume = e.target.value;
        localStorage.setItem('defaultVolume', volume);
        if (volumeDisplay) volumeDisplay.textContent = volume + '%';
        audio.volume = volume / 100;
        volumeSlider.value = volume;
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

if (openaiApiKey) {
    openaiApiKey.addEventListener('change', (e) => {
        localStorage.setItem('openaiApiKey', e.target.value);
    });
}

if (useFreeAI) {
    useFreeAI.addEventListener('change', (e) => {
        localStorage.setItem('useFreeAI', e.target.checked);
    });
}

// ==================== AI TEXT IMPROVER ====================
if (textToImprove) {
    textToImprove.addEventListener('input', (e) => {
        if (charCount) {
            charCount.textContent = e.target.value.length;
        }
    });
}

async function improveTextWithAI(text, improvementType) {
    const apiKey = openaiApiKey ? openaiApiKey.value.trim() : '';
    const useFree = useFreeAI ? useFreeAI.checked : true;
    
    if (apiKey && !useFree) {
        // Use OpenAI API
        return await improveWithOpenAI(text, improvementType, apiKey);
    } else {
        // Use free AI service (client-side improvement)
        return await improveWithFreeAI(text, improvementType);
    }
}

async function improveWithOpenAI(text, improvementType, apiKey) {
    try {
        const prompts = {
            grammar: 'Fix grammar and spelling errors in the following text. Return only the corrected text without explanations:',
            clarity: 'Improve the clarity and flow of the following text. Make it more readable and well-structured. Return only the improved text:',
            professional: 'Rewrite the following text in a professional tone. Return only the improved text:',
            concise: 'Make the following text more concise while preserving the main message. Return only the concise version:'
        };
        
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful writing assistant that improves text. Always return only the improved text without explanations or markdown.'
                    },
                    {
                        role: 'user',
                        content: `${prompts[improvementType]}\n\n${text}`
                    }
                ],
                max_tokens: 1000,
                temperature: 0.7
            })
        });
        
        if (!response.ok) {
            throw new Error('API request failed');
        }
        
        const data = await response.json();
        return data.choices[0].message.content.trim();
    } catch (error) {
        console.error('OpenAI API error:', error);
        throw new Error('Failed to improve text with OpenAI. Please check your API key.');
    }
}

async function improveWithFreeAI(text, improvementType) {
    // Client-side text improvement (basic)
    // This is a fallback when no API key is provided
    return new Promise((resolve) => {
        setTimeout(() => {
            let improved = text;
            
            // Basic improvements
            if (improvementType === 'grammar') {
                // Fix common grammar issues
                improved = improved
                    .replace(/\bi\s/g, 'I ')
                    .replace(/\bim\b/gi, "I'm")
                    .replace(/\bdont\b/gi, "don't")
                    .replace(/\bwont\b/gi, "won't")
                    .replace(/\bcant\b/gi, "can't")
                    .replace(/\bisnt\b/gi, "isn't")
                    .replace(/\bwasnt\b/gi, "wasn't")
                    .replace(/\bwerent\b/gi, "weren't")
                    .replace(/\bhavent\b/gi, "haven't")
                    .replace(/\bhasnt\b/gi, "hasn't")
                    .replace(/\bhadnt\b/gi, "hadn't")
                    .replace(/\bwouldnt\b/gi, "wouldn't")
                    .replace(/\bcouldnt\b/gi, "couldn't")
                    .replace(/\bshouldnt\b/gi, "shouldn't")
                    .replace(/\bmustnt\b/gi, "mustn't")
                    .replace(/\barent\b/gi, "aren't")
                    .replace(/\bdidnt\b/gi, "didn't")
                    .replace(/\bdoesnt\b/gi, "doesn't")
                    .replace(/\bthe\s+the\b/gi, 'the')
                    .replace(/\ba\s+a\b/gi, 'a')
                    .replace(/\ban\s+an\b/gi, 'an');
            } else if (improvementType === 'clarity') {
                // Add periods where missing, fix spacing
                improved = improved
                    .replace(/\s+/g, ' ')
                    .replace(/\s+([.!?])/g, '$1')
                    .replace(/([.!?])([A-Z])/g, '$1 $2')
                    .trim();
            } else if (improvementType === 'professional') {
                // Remove casual language, improve tone
                improved = improved
                    .replace(/\b(hey|hi|yo)\b/gi, '')
                    .replace(/\blol\b/gi, '')
                    .replace(/\bomg\b/gi, '')
                    .replace(/\b(thanks|thx)\b/gi, 'Thank you')
                    .replace(/\b(yeah|yep|yup)\b/gi, 'Yes')
                    .replace(/\b(nope|nah)\b/gi, 'No')
                    .replace(/\s+/g, ' ')
                    .trim();
            } else if (improvementType === 'concise') {
                // Remove redundant words
                improved = improved
                    .replace(/\b(very|really|quite|extremely)\s+/gi, '')
                    .replace(/\b(in order to|so as to)\b/gi, 'to')
                    .replace(/\b(due to the fact that|because of the fact that)\b/gi, 'because')
                    .replace(/\b(at this point in time)\b/gi, 'now')
                    .replace(/\b(in the event that)\b/gi, 'if')
                    .replace(/\s+/g, ' ')
                    .trim();
            }
            
            // Capitalize first letter
            if (improved.length > 0) {
                improved = improved.charAt(0).toUpperCase() + improved.slice(1);
            }
            
            resolve(improved || text);
        }, 500); // Simulate API delay
    });
}

if (improveTextBtn) {
    improveTextBtn.addEventListener('click', async () => {
        const text = textToImprove ? textToImprove.value.trim() : '';
        if (!text) {
            showNotification('Please enter some text to improve', 3000);
            return;
        }
        
        const selectedType = Array.from(improvementTypeRadios).find(r => r.checked)?.value || 'grammar';
        
        // Disable button and show loading
        improveTextBtn.disabled = true;
        improveBtnText.style.display = 'none';
        improveBtnLoader.style.display = 'inline';
        
        try {
            const improvedText = await improveTextWithAI(text, selectedType);
            
            if (improvedTextDisplay) {
                improvedTextDisplay.textContent = improvedText;
            }
            if (textOutputSection) {
                textOutputSection.style.display = 'block';
            }
            
            showNotification('Text improved successfully! ✨', 3000);
        } catch (error) {
            showNotification(error.message || 'Failed to improve text. Please try again.', 5000);
            console.error('Text improvement error:', error);
        } finally {
            // Re-enable button
            improveTextBtn.disabled = false;
            improveBtnText.style.display = 'inline';
            improveBtnLoader.style.display = 'none';
        }
    });
}

if (copyImprovedBtn) {
    copyImprovedBtn.addEventListener('click', () => {
        const text = improvedTextDisplay ? improvedTextDisplay.textContent : '';
        if (text) {
            navigator.clipboard.writeText(text).then(() => {
                showNotification('Copied to clipboard! 📋', 2000);
            }).catch(() => {
                showNotification('Failed to copy', 2000);
            });
        }
    });
}

if (replaceTextBtn) {
    replaceTextBtn.addEventListener('click', () => {
        const text = improvedTextDisplay ? improvedTextDisplay.textContent : '';
        if (text && textToImprove) {
            textToImprove.value = text;
            if (charCount) {
                charCount.textContent = text.length;
            }
            showNotification('Text replaced! 🔄', 2000);
        }
    });
}

if (clearTextBtn) {
    clearTextBtn.addEventListener('click', () => {
        if (textToImprove) {
            textToImprove.value = '';
        }
        if (charCount) {
            charCount.textContent = '0';
        }
        if (textOutputSection) {
            textOutputSection.style.display = 'none';
        }
        if (improvedTextDisplay) {
            improvedTextDisplay.textContent = '';
        }
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
    
    // Update chat every 2 seconds for better real-time feel
    chatUpdateInterval = setInterval(() => {
        loadChatMessages();
        updateChatUserCount();
    }, 2000);
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

async function loadChatMessages() {
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
    
    scrollChatToBottom();
}

async function loadSharedChatMessages() {
    try {
        // Try to load from API endpoint (if deployed with backend)
        const response = await fetch('/api/chat');
        if (response.ok) {
            const data = await response.json();
            if (data.messages && data.messages.length > 0) {
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
    // Save to localStorage
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    
    // Broadcast to other tabs
    if (typeof BroadcastChannel !== 'undefined') {
        const channel = new BroadcastChannel('fountain-chat');
        channel.postMessage({ type: 'new-messages', messages: messages });
    }
    
    // Try to save to API (if available)
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.userName && lastMessage.text) {
        try {
            await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName: lastMessage.userName,
                    text: lastMessage.text
                })
            });
        } catch (e) {
            // API not available, that's okay - localStorage will work
        }
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
    bubble.textContent = message.text;
    
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
    const text = chatInput.value.trim();
    if (!text) return;
    
    if (!chatUserName) {
        showNotification('Please set a username first', 3000);
        showUsernameModal();
        return;
    }
    
    const message = {
        id: Date.now() + Math.random(),
        userName: chatUserName,
        text: text,
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

// ==================== START APPLICATION ====================
window.addEventListener('load', () => {
    init();
    initChat();
});
