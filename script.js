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


// 50 Different Ambient Sounds
const ambientSoundList = [
    { id: 'rain', name: 'Rain', emoji: '🌧️', type: 'nature' },
    { id: 'forest', name: 'Forest', emoji: '🌲', type: 'nature' },
    { id: 'ocean', name: 'Ocean Waves', emoji: '🌊', type: 'nature' },
    { id: 'fireplace', name: 'Fireplace', emoji: '🔥', type: 'indoor' },
    { id: 'cafe', name: 'Coffee Shop', emoji: '☕', type: 'indoor' },
    { id: 'thunder', name: 'Thunderstorm', emoji: '⚡', type: 'nature' },
    { id: 'wind', name: 'Wind', emoji: '💨', type: 'nature' },
    { id: 'birds', name: 'Birds Chirping', emoji: '🐦', type: 'nature' },
    { id: 'crickets', name: 'Crickets', emoji: '🦗', type: 'nature' },
    { id: 'waterfall', name: 'Waterfall', emoji: '🏞️', type: 'nature' },
    { id: 'river', name: 'Flowing River', emoji: '🌊', type: 'nature' },
    { id: 'beach', name: 'Beach', emoji: '🏖️', type: 'nature' },
    { id: 'jungle', name: 'Jungle', emoji: '🌴', type: 'nature' },
    { id: 'snow', name: 'Snowfall', emoji: '❄️', type: 'nature' },
    { id: 'desert', name: 'Desert Wind', emoji: '🏜️', type: 'nature' },
    { id: 'library', name: 'Library', emoji: '📚', type: 'indoor' },
    { id: 'train', name: 'Train', emoji: '🚂', type: 'urban' },
    { id: 'city', name: 'City Ambience', emoji: '🏙️', type: 'urban' },
    { id: 'subway', name: 'Subway', emoji: '🚇', type: 'urban' },
    { id: 'airport', name: 'Airport', emoji: '✈️', type: 'urban' },
    { id: 'fan', name: 'Fan', emoji: '🌀', type: 'indoor' },
    { id: 'white-noise', name: 'White Noise', emoji: '📻', type: 'indoor' },
    { id: 'pink-noise', name: 'Pink Noise', emoji: '🎵', type: 'indoor' },
    { id: 'brown-noise', name: 'Brown Noise', emoji: '🔊', type: 'indoor' },
    { id: 'wind-chimes', name: 'Wind Chimes', emoji: '🎐', type: 'nature' },
    { id: 'tibetan-bowls', name: 'Tibetan Bowls', emoji: '🔔', type: 'meditation' },
    { id: 'singing-bowl', name: 'Singing Bowl', emoji: '🎶', type: 'meditation' },
    { id: 'gong', name: 'Gong', emoji: '🥁', type: 'meditation' },
    { id: 'bells', name: 'Bells', emoji: '🔔', type: 'meditation' },
    { id: 'zen-garden', name: 'Zen Garden', emoji: '🧘', type: 'meditation' },
    { id: 'temple', name: 'Temple', emoji: '🛕', type: 'meditation' },
    { id: 'monastery', name: 'Monastery', emoji: '⛪', type: 'meditation' },
    { id: 'cathedral', name: 'Cathedral', emoji: '⛪', type: 'meditation' },
    { id: 'wind-tunnel', name: 'Wind Tunnel', emoji: '🌪️', type: 'nature' },
    { id: 'underwater', name: 'Underwater', emoji: '🐠', type: 'nature' },
    { id: 'cave', name: 'Cave', emoji: '🕳️', type: 'nature' },
    { id: 'mountain', name: 'Mountain', emoji: '⛰️', type: 'nature' },
    { id: 'meadow', name: 'Meadow', emoji: '🌾', type: 'nature' },
    { id: 'farm', name: 'Farm', emoji: '🚜', type: 'nature' },
    { id: 'night', name: 'Night Sounds', emoji: '🌙', type: 'nature' },
    { id: 'morning', name: 'Morning', emoji: '🌅', type: 'nature' },
    { id: 'evening', name: 'Evening', emoji: '🌆', type: 'nature' },
    { id: 'winter', name: 'Winter', emoji: '❄️', type: 'nature' },
    { id: 'summer', name: 'Summer', emoji: '☀️', type: 'nature' },
    { id: 'autumn', name: 'Autumn', emoji: '🍂', type: 'nature' },
    { id: 'spring', name: 'Spring', emoji: '🌸', type: 'nature' },
    { id: 'space', name: 'Space', emoji: '🌌', type: 'ambient' },
    { id: 'cosmic', name: 'Cosmic', emoji: '✨', type: 'ambient' },
    { id: 'etheral', name: 'Ethereal', emoji: '🌟', type: 'ambient' },
    { id: 'dreamy', name: 'Dreamy', emoji: '💫', type: 'ambient' }
];

// Ambient sound generators using Web Audio API
let ambientAudioContext = null;
let ambientOscillators = [];
let ambientGainNodes = [];
let activeAmbientSound = null;
const soundOptions = document.getElementById('soundOptions');
const ambientSearch = document.getElementById('ambientSearch');

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
    initAmbientSounds();
    
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

// ==================== AMBIENT SOUNDS ====================

// Initialize ambient sounds UI
function initAmbientSounds() {
    if (!soundOptions) return;
    
    // Create buttons for all ambient sounds
    ambientSoundList.forEach(sound => {
        const btn = document.createElement('button');
        btn.className = 'sound-btn';
        btn.dataset.sound = sound.id;
        btn.dataset.type = sound.type;
        btn.dataset.name = sound.name.toLowerCase();
        btn.innerHTML = `${sound.emoji} ${sound.name}`;
        btn.addEventListener('click', () => toggleAmbientSound(sound.id, btn));
        soundOptions.appendChild(btn);
    });
}

function toggleAmbientSound(soundId, buttonElement) {
    // Toggle sound
    if (buttonElement.classList.contains('active')) {
        // Stop current sound
        stopAmbientSound();
        buttonElement.classList.remove('active');
    } else {
        // Stop any currently playing sound
        document.querySelectorAll('.sound-btn.active').forEach(btn => {
            btn.classList.remove('active');
        });
        stopAmbientSound();
        
        // Start new sound
        startAmbientSound(soundId);
        buttonElement.classList.add('active');
    }
}

function stopAmbientSound() {
    // Stop all oscillators
    ambientOscillators.forEach(osc => {
        try {
            osc.stop();
            osc.disconnect();
        } catch (e) {}
    });
    ambientOscillators = [];
    ambientGainNodes = [];
    activeAmbientSound = null;
}

function startAmbientSound(soundId) {
    // Initialize audio context if needed
    if (!ambientAudioContext) {
        ambientAudioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    // Resume context if suspended
    if (ambientAudioContext.state === 'suspended') {
        ambientAudioContext.resume();
    }
    
    const volume = ambientVolume ? ambientVolume.value / 100 : 0.3;
    
    // Generate different sounds based on type
    const sound = ambientSoundList.find(s => s.id === soundId);
    if (!sound) return;
    
    stopAmbientSound(); // Clear any existing sounds
    
    switch(sound.type) {
        case 'nature':
            generateNatureSound(soundId, volume);
            break;
        case 'indoor':
            generateIndoorSound(soundId, volume);
            break;
        case 'urban':
            generateUrbanSound(soundId, volume);
            break;
        case 'meditation':
            generateMeditationSound(soundId, volume);
            break;
        case 'ambient':
            generateAmbientSound(soundId, volume);
            break;
        default:
            generateWhiteNoise(volume);
    }
    
    activeAmbientSound = soundId;
}

function generateNatureSound(soundId, volume) {
    const gainNode = ambientAudioContext.createGain();
    gainNode.gain.value = volume;
    gainNode.connect(ambientAudioContext.destination);
    ambientGainNodes.push(gainNode);
    
    if (soundId === 'rain' || soundId === 'snow') {
        // Rain/snow: multiple oscillators with noise
        for (let i = 0; i < 5; i++) {
            const osc = ambientAudioContext.createOscillator();
            const gain = ambientAudioContext.createGain();
            osc.type = 'sawtooth';
            osc.frequency.value = 100 + Math.random() * 200;
            gain.gain.value = 0.1 * volume;
            osc.connect(gain);
            gain.connect(gainNode);
            osc.start();
            ambientOscillators.push(osc);
        }
    } else if (soundId === 'wind' || soundId === 'wind-tunnel' || soundId === 'desert') {
        // Wind: low frequency noise
        const osc = ambientAudioContext.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.value = 20 + Math.random() * 30;
        osc.connect(gainNode);
        osc.start();
        ambientOscillators.push(osc);
    } else if (soundId === 'ocean' || soundId === 'beach' || soundId === 'waterfall' || soundId === 'river') {
        // Water: multiple frequencies
        for (let i = 0; i < 3; i++) {
            const osc = ambientAudioContext.createOscillator();
            const gain = ambientAudioContext.createGain();
            osc.type = 'sine';
            osc.frequency.value = 200 + i * 100 + Math.random() * 50;
            gain.gain.value = 0.15 * volume;
            osc.connect(gain);
            gain.connect(gainNode);
            osc.start();
            ambientOscillators.push(osc);
        }
    } else if (soundId === 'birds' || soundId === 'crickets' || soundId === 'night' || soundId === 'morning' || soundId === 'evening') {
        // Birds/Crickets/Night: high frequency chirps
        for (let i = 0; i < 3; i++) {
            const osc = ambientAudioContext.createOscillator();
            const gain = ambientAudioContext.createGain();
            osc.type = 'sine';
            osc.frequency.value = 1000 + Math.random() * 2000;
            gain.gain.value = 0.1 * volume;
            osc.connect(gain);
            gain.connect(gainNode);
            osc.start();
            ambientOscillators.push(osc);
        }
    } else if (soundId === 'thunder') {
        // Thunder: occasional low frequency bursts
        const osc = ambientAudioContext.createOscillator();
        osc.type = 'square';
        osc.frequency.value = 30 + Math.random() * 20;
        osc.connect(gainNode);
        osc.start();
        ambientOscillators.push(osc);
    } else if (soundId === 'wind-chimes') {
        // Wind chimes: high frequency bell-like sounds
        for (let i = 0; i < 4; i++) {
            const osc = ambientAudioContext.createOscillator();
            const gain = ambientAudioContext.createGain();
            osc.type = 'sine';
            osc.frequency.value = 800 + i * 200;
            gain.gain.value = 0.12 * volume;
            osc.connect(gain);
            gain.connect(gainNode);
            osc.start();
            ambientOscillators.push(osc);
        }
    } else if (soundId === 'underwater') {
        // Underwater: muffled low frequencies
        const osc = ambientAudioContext.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = 50 + Math.random() * 30;
        osc.connect(gainNode);
        osc.start();
        ambientOscillators.push(osc);
    } else if (soundId === 'cave') {
        // Cave: echo-like low frequencies
        const osc = ambientAudioContext.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.value = 40 + Math.random() * 20;
        osc.connect(gainNode);
        osc.start();
        ambientOscillators.push(osc);
    } else if (soundId === 'winter' || soundId === 'summer' || soundId === 'autumn' || soundId === 'spring') {
        // Seasons: mix of nature sounds
        for (let i = 0; i < 2; i++) {
            const osc = ambientAudioContext.createOscillator();
            const gain = ambientAudioContext.createGain();
            osc.type = 'sine';
            osc.frequency.value = 150 + i * 100 + Math.random() * 50;
            gain.gain.value = 0.15 * volume;
            osc.connect(gain);
            gain.connect(gainNode);
            osc.start();
            ambientOscillators.push(osc);
        }
    } else {
        // Default nature sound
        generateWhiteNoise(volume);
    }
}

function generateIndoorSound(soundId, volume) {
    const gainNode = ambientAudioContext.createGain();
    gainNode.gain.value = volume;
    gainNode.connect(ambientAudioContext.destination);
    ambientGainNodes.push(gainNode);
    
    if (soundId === 'white-noise' || soundId === 'pink-noise' || soundId === 'brown-noise') {
        generateWhiteNoise(volume);
    } else if (soundId === 'fan') {
        // Fan: low constant frequency
        const osc = ambientAudioContext.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.value = 60;
        osc.connect(gainNode);
        osc.start();
        ambientOscillators.push(osc);
    } else if (soundId === 'fireplace') {
        // Fireplace: crackling low frequencies
        for (let i = 0; i < 3; i++) {
            const osc = ambientAudioContext.createOscillator();
            const gain = ambientAudioContext.createGain();
            osc.type = 'square';
            osc.frequency.value = 80 + i * 40 + Math.random() * 20;
            gain.gain.value = 0.12 * volume;
            osc.connect(gain);
            gain.connect(gainNode);
            osc.start();
            ambientOscillators.push(osc);
        }
    } else if (soundId === 'cafe' || soundId === 'library') {
        // Cafe/Library: subtle background noise
        generateWhiteNoise(volume * 0.5);
    } else {
        // Default indoor: white noise
        generateWhiteNoise(volume);
    }
}

function generateUrbanSound(soundId, volume) {
    const gainNode = ambientAudioContext.createGain();
    gainNode.gain.value = volume;
    gainNode.connect(ambientAudioContext.destination);
    ambientGainNodes.push(gainNode);
    
    // Urban sounds: mix of frequencies
    for (let i = 0; i < 4; i++) {
        const osc = ambientAudioContext.createOscillator();
        const gain = ambientAudioContext.createGain();
        osc.type = 'square';
        osc.frequency.value = 100 + i * 150 + Math.random() * 100;
        gain.gain.value = 0.1 * volume;
        osc.connect(gain);
        gain.connect(gainNode);
        osc.start();
        ambientOscillators.push(osc);
    }
}

function generateMeditationSound(soundId, volume) {
    const gainNode = ambientAudioContext.createGain();
    gainNode.gain.value = volume;
    gainNode.connect(ambientAudioContext.destination);
    ambientGainNodes.push(gainNode);
    
    if (soundId === 'tibetan-bowls' || soundId === 'singing-bowl' || soundId === 'gong' || soundId === 'bells') {
        // Bowl sounds: harmonic frequencies
        for (let i = 0; i < 3; i++) {
            const osc = ambientAudioContext.createOscillator();
            const gain = ambientAudioContext.createGain();
            osc.type = 'sine';
            osc.frequency.value = 200 + i * 150;
            gain.gain.value = 0.15 * volume;
            osc.connect(gain);
            gain.connect(gainNode);
            osc.start();
            ambientOscillators.push(osc);
        }
    } else {
        // Default meditation: slow, calming frequencies
        const osc = ambientAudioContext.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = 60 + Math.random() * 40;
        osc.connect(gainNode);
        osc.start();
        ambientOscillators.push(osc);
    }
}

function generateAmbientSound(soundId, volume) {
    const gainNode = ambientAudioContext.createGain();
    gainNode.gain.value = volume;
    gainNode.connect(ambientAudioContext.destination);
    ambientGainNodes.push(gainNode);
    
    // Ambient: ethereal frequencies
    for (let i = 0; i < 3; i++) {
        const osc = ambientAudioContext.createOscillator();
        const gain = ambientAudioContext.createGain();
        osc.type = 'sine';
        osc.frequency.value = 200 + i * 100;
        gain.gain.value = 0.15 * volume;
        osc.connect(gain);
        gain.connect(gainNode);
        osc.start();
        ambientOscillators.push(osc);
    }
}

function generateWhiteNoise(volume) {
    const bufferSize = 4096;
    const buffer = ambientAudioContext.createBuffer(1, bufferSize, ambientAudioContext.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }
    
    const whiteNoise = ambientAudioContext.createBufferSource();
    const gainNode = ambientAudioContext.createGain();
    whiteNoise.buffer = buffer;
    whiteNoise.loop = true;
    gainNode.gain.value = volume * 0.3;
    whiteNoise.connect(gainNode);
    gainNode.connect(ambientAudioContext.destination);
    whiteNoise.start();
    ambientOscillators.push(whiteNoise);
    ambientGainNodes.push(gainNode);
}

// Search functionality for ambient sounds
if (ambientSearch) {
    ambientSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        document.querySelectorAll('.sound-btn').forEach(btn => {
            const name = btn.dataset.name || '';
            const type = btn.dataset.type || '';
            if (name.includes(searchTerm) || type.includes(searchTerm) || searchTerm === '') {
                btn.style.display = '';
            } else {
                btn.style.display = 'none';
            }
        });
    });
}

if (ambientVolume) {
    ambientVolume.addEventListener('input', (e) => {
        const volume = e.target.value / 100;
        // Update all gain nodes
        ambientGainNodes.forEach(gain => {
            gain.gain.value = volume;
        });
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

// ==================== START APPLICATION ====================
window.addEventListener('load', () => {
    init();
    initChat();
});
