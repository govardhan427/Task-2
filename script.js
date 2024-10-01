let timer;
let isRunning = false;
let [minutes, seconds, milliseconds] = [0, 0, 0];
let lapCount = 1;

const displayMinutes = document.getElementById('minutes');
const displaySeconds = document.getElementById('seconds');
const displayMilliseconds = document.getElementById('milliseconds');
const lapList = document.getElementById('lap-list');

function updateDisplay() {
    displayMinutes.textContent = String(minutes).padStart(2, '0');
    displaySeconds.textContent = String(seconds).padStart(2, '0');
    displayMilliseconds.textContent = String(milliseconds).padStart(2, '0');
}

function startStopwatch() {
    if (!isRunning) {
        timer = setInterval(() => {
            milliseconds++;
            if (milliseconds >= 100) {
                milliseconds = 0;
                seconds++;
                if (seconds >= 60) {
                    seconds = 0;
                    minutes++;
                }
            }
            updateDisplay();
        }, 10);
        isRunning = true;
    }
}

function pauseStopwatch() {
    clearInterval(timer);
    isRunning = false;
}

function resetStopwatch() {
    clearInterval(timer);
    isRunning = false;
    [minutes, seconds, milliseconds] = [0, 0, 0];
    updateDisplay();
    lapList.innerHTML = ''; // Clear lap times
    lapCount = 1;
}

function recordLap() {
    if (isRunning) {
        const lapTime = document.createElement('li');
        lapTime.textContent = `Lap ${lapCount++}: ${displayMinutes.textContent}:${displaySeconds.textContent}:${displayMilliseconds.textContent}`;
        lapList.appendChild(lapTime);
    }
}

document.getElementById('start').addEventListener('click', startStopwatch);
document.getElementById('pause').addEventListener('click', pauseStopwatch);
document.getElementById('reset').addEventListener('click', resetStopwatch);
document.getElementById('lap').addEventListener('click', recordLap);
