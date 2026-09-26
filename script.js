const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const laps = document.getElementById("laps");
const lapBtn = document.getElementById("lapBtn");
let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;


// Convert milliseconds into HH:MM:SS
function formatTime(ms) {
    let totalSeconds = Math.floor(ms / 1000);

    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
}


// START / RESUME
startBtn.addEventListener("click", function () {
    if (!running) {
        startTime = Date.now() - elapsedTime;

        timerInterval = setInterval(function () {
            elapsedTime = Date.now() - startTime;
            display.textContent = formatTime(elapsedTime);
        }, 10);

        running = true;
        startBtn.textContent = "Resume";
    }
});


// PAUSE
pauseBtn.addEventListener("click", function () {
    if (running) {
        clearInterval(timerInterval);
        running = false;
    }
});


// RESET
resetBtn.addEventListener("click", function () {
    clearInterval(timerInterval);

    elapsedTime = 0;
    startTime = 0;
    running = false;

    display.textContent = "00:00:00";
    startBtn.textContent = "Start";

    laps.innerHTML = "";
});

lapBtn.addEventListener("click", function () {
    if (running) {
        const lapTime = document.createElement("li");

        lapTime.textContent = formatTime(elapsedTime);

        laps.appendChild(lapTime);
    }
});