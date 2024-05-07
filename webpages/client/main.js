const elements = {
  timerEl: "#time",
  setsEl: "#sets",
  setsSection: ".sets-section",
  statusText: ".status-text",
  startBtn: "#start-btn",
  resetBtn: "#reset-btn",
  setActivity: "#set-activity",
  setRest: "#set-rest",
  setSets: "#set-sets",
  expandBtn: "#expand-btn",
  options: ".advanced-options",
  expandOptions: ".options-content",
};

const el = {};

for (const [key, selector] of Object.entries(elements)) {
  el[key] = document.querySelector(selector);
}

let isRunning = false;
let interval;
let timeLeft = 0;
/**
 * Starts the timer for the HIIT workout.
 */
function startTimer() {
  const activityTime = parseInt(el.setActivity.value);
  const restTime = parseInt(el.setRest.value);
  let sets = parseInt(el.setSets.value);

  el.options.style.display = "none";
  isRunning = true;
  timeLeft = activityTime;
  el.setsEl.innerText = sets;
  let countdown = 3;
  el.statusText.innerText = "Activity";
  el.setsEl.innerText = sets;
  el.setsSection.style.display = "block";
  document.body.style.backgroundColor = "#ff9900";

  interval = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      if (el.statusText.innerText === "Activity") {
        el.statusText.innerText = "Rest";
        document.body.style.backgroundColor = "#66b3ff";
        timeLeft = restTime;
        sets--;
        el.setsEl.innerText = sets;
      } else {
        el.statusText.innerText = "Activity";
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
  el.setsSection.style.display = "none";
  el.statusText.innerText = "Press Start";
  el.timerEl.innerText = "00:00";
  document.body.style.backgroundColor = "#f5f5f5";

  el.options.style.display = "block";
}

/**
 * Updates the timer display with the remaining time.
 */
function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  el.timerEl.innerText = `${minutes.toString().padStart(2, "0")}:${seconds
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
    el.statusText.innerText = "Paused";
  }
}

el.startBtn.addEventListener("click", () => {
  if (!isRunning) {
    startTimer();
    el.startBtn.innerText = "Pause"; // Change the text to "Pause"
  } else {
    pauseTimer();
    el.startBtn.innerText = "Start"; // Change the text back to "Start"
  }
});

el.resetBtn.addEventListener("click", () => {
  resetTimer();
  el.startBtn.innerText = "Start";
});

el.expandBtn.addEventListener("click", function () {
  if (el.expandOptions.style.display === "none") {
    el.expandOptions.style.display = "block";
  } else {
    el.expandOptions.style.display = "none";
  }
});
