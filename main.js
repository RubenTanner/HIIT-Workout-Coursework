const timerEl = document.querySelector("#time");
const statusText = document.querySelector(".status-text");
const startBtn = document.querySelector("#start-btn");
const resetBtn = document.querySelector("#reset-btn");

let isRunning = false;
let intervalId;
let timeLeft = 0;
let activityTime = 30;
let restTime = 10;
let totalTime = 7 * 60;

/**
 * Starts the timer for the HIIT workout.
 */
function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timeLeft = activityTime;
    document.body.style.backgroundColor = "#ff5722";

    intervalId = setInterval(() => {
      timeLeft--;
  statusText.innerText = "Activity";

      if (timeLeft <= 0) {
          document.body.style.backgroundColor = "#007bff";
          timeLeft = restTime;
        } else {
          document.body.style.backgroundColor = "#ff5722";
          timeLeft = activityTime;
        }
      if (statusText.innerText === "Activity") {
        statusText.innerText = "Rest";
        statusText.innerText = "Activity";
      }
      updateTimer();
    }, 1000);
  } else {
    stopTimer();
  }
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
