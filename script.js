// Music Controls
const audio = document.getElementById('backgroundMusic');
const playPauseBtn = document.getElementById('playPauseBtn');
const playIcon = document.getElementById('playIcon');
const volumeSlider = document.getElementById('volumeSlider');

// Timer Controls
const timerDisplay = document.getElementById('timerDisplay');
const startTimerBtn = document.getElementById('startTimer');
const resetTimerBtn = document.getElementById('resetTimer');
const presetButtons = document.querySelectorAll('.preset-btn');

// Ambient Sounds
const soundButtons = document.querySelectorAll('.sound-btn');

let timerInterval = null;
let timerSeconds = 25 * 60; // Default 25 minutes
let isTimerRunning = false;

// Auto-play music on page load
window.addEventListener('load', () => {
    // Set initial volume
    audio.volume = volumeSlider.value / 100;
    
    // Try to play music automatically
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                // Autoplay started successfully
                playIcon.textContent = '⏸';
            })
            .catch(error => {
                // Autoplay was prevented by browser policy
                // User will need to click play button
                console.log('Autoplay prevented. Click play to start music.');
                playIcon.textContent = '▶';
            });
    }
    
    // Update button when audio state changes
    audio.addEventListener('play', () => {
        playIcon.textContent = '⏸';
    });
    
    audio.addEventListener('pause', () => {
        playIcon.textContent = '▶';
    });
    
    // Handle audio errors
    audio.addEventListener('error', (e) => {
        console.error('Audio error:', e);
        playIcon.textContent = '▶';
        alert('Unable to load music. Please check your internet connection or use your own music file.');
    });
});

// Play/Pause button
playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playIcon.textContent = '⏸';
    } else {
        audio.pause();
        playIcon.textContent = '▶';
    }
});

// Volume control
volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value / 100;
});

// Timer functionality
function updateTimerDisplay() {
    const minutes = Math.floor(timerSeconds / 60);
    const seconds = timerSeconds % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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
                // Play notification sound or show alert
                alert('⏰ Time is up! Take a break!');
            }
        }, 1000);
        isTimerRunning = true;
        startTimerBtn.textContent = 'Pause';
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    timerSeconds = 25 * 60; // Reset to 25 minutes
    updateTimerDisplay();
    startTimerBtn.textContent = 'Start';
}

startTimerBtn.addEventListener('click', startTimer);
resetTimerBtn.addEventListener('click', resetTimer);

// Preset timer buttons
presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const minutes = parseInt(btn.dataset.minutes);
        timerSeconds = minutes * 60;
        updateTimerDisplay();
        if (isTimerRunning) {
            resetTimer();
        }
    });
});

// Ambient sounds (using Web Audio API with oscillator for demo)
// In a real implementation, you'd use actual sound files
const ambientSounds = {
    rain: null,
    forest: null,
    ocean: null,
    fireplace: null
};

let activeSound = null;

soundButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const soundType = btn.dataset.sound;
        
        // Toggle sound
        if (btn.classList.contains('active')) {
            btn.classList.remove('active');
            if (activeSound) {
                activeSound.stop();
                activeSound = null;
            }
        } else {
            // Remove active class from all buttons
            soundButtons.forEach(b => b.classList.remove('active'));
            
            // Stop current sound
            if (activeSound) {
                activeSound.stop();
            }
            
            // Start new sound (simplified - in production, use actual audio files)
            btn.classList.add('active');
            // Note: For a real implementation, you would load and play actual audio files here
            // This is a placeholder that shows the UI interaction
            console.log(`Playing ${soundType} sound`);
        }
    });
});

// Initialize timer display
updateTimerDisplay();

// Handle page visibility - pause/resume music when tab is hidden/shown
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Optional: pause when tab is hidden
        // audio.pause();
    } else {
        // Optional: resume when tab is visible
        // if (!audio.paused) audio.play();
    }
});

