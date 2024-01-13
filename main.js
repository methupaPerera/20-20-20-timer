const audio = document.getElementById("beep-sound"); // Audio element
const start = document.getElementById("start"); // Start button
const stoper = document.getElementById("stop"); // Stop button

let isStart = false; // Used to start and stop the app

start.onclick = () => (isStart = true);
stoper.onclick = () => (isStart = false);

let SECS = 0;
let MINS = 0;
let HOURS = 0;

const startWorkingTime = () => {
    const items = document.querySelectorAll("#working-time span");

    SECS += 1;

    // Handles seconds and minutes
    if (SECS === 60) {
        SECS = 0;
        MINS += 1;
    }

    // Handles minutes and hours
    if (MINS === 60) {
        MINS = 0;
        HOURS += 1;
    }

    items[2].innerHTML = SECS < 10 ? "0" + SECS : SECS;
    items[1].innerHTML = MINS < 10 ? "0" + MINS : MINS;
    items[0].innerHTML = HOURS < 10 ? "0" + HOURS : HOURS;
};

// ------------------------------------------------------------------

let REMAIN_SECS = 0;
let WAITING_SECS = 20;
let REMAIN_MINS = 20;

let playCount = 0; // Handles the sound

const getNextBreak = () => {
    if (REMAIN_MINS === 0 && REMAIN_SECS === 2) {
        if (playCount < 1) {
            playCount++;
        }
    }

    if (REMAIN_MINS === 0 && REMAIN_SECS === 0) {
        return true;
    }

    const items = document.querySelectorAll("#next-break span");

    if (REMAIN_SECS === 0) {
        REMAIN_SECS = 60;
        REMAIN_MINS -= 1;
    }

    REMAIN_SECS -= 1;

    items[1].innerHTML = REMAIN_SECS < 10 ? "0" + REMAIN_SECS : REMAIN_SECS;
    items[0].innerHTML = REMAIN_MINS < 10 ? "0" + REMAIN_MINS : REMAIN_MINS;

    return false;
};

// ------------------------------------------------------------------

const startWaiting = (isWait) => {
    const items = document.querySelectorAll("#waiting span");

    if (!isWait) {
        items[0].innerHTML = WAITING_SECS;
        return;
    }

    if (playCount === 1) {
        playCount++;
        audio.play();
    }

    WAITING_SECS -= 1;

    items[0].innerHTML = WAITING_SECS < 10 ? "0" + WAITING_SECS : WAITING_SECS;
};

// Starting point of the app ----------------------------------------

setInterval(() => {
    if (!isStart) return;

    startWorkingTime();

    if (WAITING_SECS === 0) {
        WAITING_SECS = 20;
        REMAIN_SECS = 60;
        REMAIN_MINS = 19;

        audio.play();
        playCount--;
    }

    const isWait = getNextBreak();

    startWaiting(isWait);
}, 1000);
