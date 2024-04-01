// DOM ELEMENTS
const timerEl = document.querySelector("#time");
const setsEl = document.querySelector("#sets");
const setsSection = document.querySelector(".sets-section");
const statusText = document.querySelector(".status-text");
const startBtn = document.querySelector("#start-btn");
const resetBtn = document.querySelector("#reset-btn");
const setActivity = document.querySelector("#set-activity");
const setRest = document.querySelector("#set-rest");
const setSets = document.querySelector("#set-sets");
const expandBtn = document.querySelector("#expand-btn");
const options = document.querySelector(".advanced-options");
const expandOptions = document.querySelector(".options-content");

let isRunning = false;
let interval;
let timeLeft = 0;
/**
 * Starts the timer for the HIIT workout.
 */
function startTimer() {
  const activityTime = parseInt(setActivity.value);
  const restTime = parseInt(setRest.value);
  let sets = parseInt(setSets.value);

  options.style.display = "none";
  isRunning = true;
  timeLeft = activityTime;
  statusText.innerText = "Activity";
  setsEl.innerText = sets;
  setsSection.style.display = "block";
  document.body.style.backgroundColor = "#ff9900";

  interval = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      if (statusText.innerText === "Activity") {
        statusText.innerText = "Rest";
        document.body.style.backgroundColor = "#66b3ff";
        timeLeft = restTime;
        sets--;
        setsEl.innerText = sets;
      } else {
        statusText.innerText = "Activity";
        document.body.style.backgroundColor = "#ff9900";
        timeLeft = activityTime;
      }
    }
    if (sets === 0) {
      resetTimer();
    }
    updateTimer();
  }, 1000);
}

/**
 * Resets the timer and sets the initial values.
 */
function resetTimer() {
  clearInterval(interval);
  isRunning = false;
  timeLeft = 0;
  setsSection.style.display = "none";
  statusText.innerText = "Press Start";
  timerEl.innerText = "00:00";
  document.body.style.backgroundColor = "#f5f5f5";

  options.style.display = "block";
}

/**
 * Updates the timer display with the remaining time.
 */
function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerEl.innerText = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

/**
 * Pauses the timer if it is currently running.
 */
function pauseTimer() {
  if (isRunning) {
    clearInterval(interval);
    isRunning = false;
    statusText.innerText = "Paused";
  }
}

startBtn.addEventListener("click", () => {
  if (!isRunning) {
    startTimer();
    startBtn.innerText = "Pause"; // Change the text to "Pause"
  } else {
    pauseTimer();
    startBtn.innerText = "Start"; // Change the text back to "Start"
  }
});

resetBtn.addEventListener("click", () => {
  resetTimer();
  startBtn.innerText = "Start";
});

expandBtn.addEventListener("click", function () {
  if (expandOptions.style.display === "none") {
    expandOptions.style.display = "block";
  } else {
    expandOptions.style.display = "none";
  }
});
