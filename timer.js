let minutes = 0;
let seconds = 0;
let hundredths = 0;
let intervalId = null;
let isRunning = false;

function updateTime() {
    hundredths++;
    if (hundredths === 100) {
        hundredths = 0;
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
    }
    var displayTime = `${formatTime(minutes)}:${formatTime(seconds)}.${formatTime(hundredths)}`;
    if (minutes === 0) displayTime = `${formatTime(seconds)}.${formatTime(hundredths)}`; 
    document.getElementById("stopwatch").textContent = displayTime;
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

export function start() {
    if (!isRunning) {
        intervalId = setInterval(updateTime, 10);
        isRunning = true;
    }
}

export function stop() {
    clearInterval(intervalId);
    isRunning = false;
}

export function reset() {
    clearInterval(intervalId);
    isRunning = false;
    minutes = 0;
    seconds = 0;
    hundredths = 0;
    document.getElementById("stopwatch").textContent = "00.00";
}

function handleSpace() {
    if (isRunning) 
        stop();
    else {
        reset();
        start();
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === ' ') {
        handleSpace();
    }
});