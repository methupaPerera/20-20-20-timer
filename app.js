const audio = document.getElementById("beep-sound");
const start = document.getElementById("start");
const stoper = document.getElementById("stop");

let isStart = false;

start.onclick = () => (isStart = true);
stoper.onclick = () => (isStart = false);

let secs = 0;
let mins = 0;
let hours = 0;

const startWorkingTime = () => {
    const items = document.querySelectorAll("#working-time span");

    secs += 1;

    if (secs === 60) {
        secs = 0;
        mins += 1;
    }

    if (mins === 60) {
        mins = 0;
        hours += 1;
    }

    items[2].innerHTML = secs < 10 ? "0" + secs : secs;
    items[1].innerHTML = mins < 10 ? "0" + mins : mins;
    items[0].innerHTML = hours < 10 ? "0" + hours : hours;
};

// ----------------------------------------------------------------

let remainMins = 20;
let remainSecs = 0;
let waitingSecs = 20;

let playCount = 0;

const getNextBreak = () => {
    if (remainMins === 0 && remainSecs === 2) {
        if (playCount < 1) {
            playCount++;
        }
    }

    if (remainMins === 0 && remainSecs === 0) {
        return true;
    }

    const items = document.querySelectorAll("#next-break span");

    if (remainSecs === 0) {
        remainSecs = 60;
        remainMins -= 1;
    }

    remainSecs -= 1;

    items[1].innerHTML = remainSecs < 10 ? "0" + remainSecs : remainSecs;
    items[0].innerHTML = remainMins < 10 ? "0" + remainMins : remainMins;

    return false;
};

// ----------------------------------------------------------------

const startWaiting = (isWait) => {
    const items = document.querySelectorAll("#waiting span");
    if (!isWait) {
        items[0].innerHTML = waitingSecs < 10 ? "0" + waitingSecs : waitingSecs;
        return;
    }

    if (playCount === 1) {
        playCount++;
        audio.play();
    }

    waitingSecs -= 1;

    items[0].innerHTML = waitingSecs < 10 ? "0" + waitingSecs : waitingSecs;
};

// ----------------------------------------------------------------

setInterval(() => {
    if (!isStart) {
        return;
    }

    startWorkingTime();

    if (waitingSecs === 0) {
        waitingSecs = 20;
        remainSecs = 60;
        remainMins = 19;
        audio.play();
        playCount--;
    }

    const isWait = getNextBreak();
    startWaiting(isWait);
}, 1000);
