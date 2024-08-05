const time = 25 * 60;
const breakTime = 5 * 60;

let timeLeft = time;
let timerInterval = null;
let isOnBreak = false;

const timeDisplay = document.getElementById('time');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateDisplay() {
    timeDisplay.textContent = formatTime(timeLeft);
}

function startTimer() {
    if (timerInterval) return;

    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            clearInterval(timerInterval);
            timerInterval = null;
            if (!isOnBreak) {
                timeLeft = breakTime;
                isOnBreak = true;
                alert("Time's up! Take a break.");
                updateDisplay();
            } else {
                timeLeft = time;
                isOnBreak = false;
                alert("Break's over! Back to work.");
                updateDisplay();
            }
        }
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function resetTimer() {
    stopTimer();
    timeLeft = time;
    isOnBreak = false;
    updateDisplay();
}

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);

updateDisplay();
