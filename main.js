const timerEl = document.querySelector("#time");
const setsEl = document.querySelector("#sets");
const statusText = document.querySelector(".status-text");
const startBtn = document.querySelector("#start-btn");
const resetBtn = document.querySelector("#reset-btn");
const setActivity = document.querySelector("#set-activity");
const setRest = document.querySelector("#set-rest");
const setSets = document.querySelector("#set-sets");

let isRunning = false;
let intervalId;
let timeLeft = 0;
/**
 * Starts the timer for the HIIT workout.
 */
function startTimer() {
  let activityTime = setActivity.value;
  let restTime = setRest.value;
  let sets = setSets.value;

  isRunning = true;
  timeLeft = activityTime;
  statusText.innerText = "Activity";
  setsEl.innerText = sets;
  document.body.style.backgroundColor = "#ff5722";

  intervalId = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      if (statusText.innerText === "Activity") {
        statusText.innerText = "Rest";
        document.body.style.backgroundColor = "#007bff";
        timeLeft = restTime;
        sets--;
        setsEl.innerText = sets;
      } else {
        statusText.innerText = "Activity";
        document.body.style.backgroundColor = "#ff5722";
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
  clearInterval(intervalId);
  isRunning = false;
  timeLeft = 0;
  statusText.innerText = "Press Start";
  timerEl.innerText = "00:00";
  document.body.style.backgroundColor = "#f5f5f5";
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
    clearInterval(intervalId);
    isRunning = false;
    statusText.innerText = "Paused";
  }
}

/**
 * Names the workout.
 */
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
