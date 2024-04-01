/**
 * Object containing references to various UI elements.
 * @typedef {Object} UIElements
 * @property {HTMLElement} timerEl - The timer element.
 * @property {HTMLElement} setsEl - The sets element.
 * @property {HTMLElement} setsSection - The sets section element.
 * @property {HTMLElement} statusText - The status text element.
 * @property {HTMLElement} startBtn - The start button element.
 * @property {HTMLElement} resetBtn - The reset button element.
 * @property {HTMLElement} setActivity - The set activity element.
 * @property {HTMLElement} setRest - The set rest element.
 * @property {HTMLElement} setSets - The set sets element.
 * @property {HTMLElement} expandBtn - The expand button element.
 * @property {HTMLElement} options - The options element.
 * @property {HTMLElement} expandOptions - The expand options element.
 */
const uiElements = {
  timerEl: document.querySelector("#time"),
  setsEl: document.querySelector("#sets"),
  setsSection: document.querySelector(".sets-section"),
  statusText: document.querySelector(".status-text"),
  startBtn: document.querySelector("#start-btn"),
  resetBtn: document.querySelector("#reset-btn"),
  setActivity: document.querySelector("#set-activity"),
  setRest: document.querySelector("#set-rest"),
  setSets: document.querySelector("#set-sets"),
  expandBtn: document.querySelector("#expand-btn"),
  options: document.querySelector(".advanced-options"),
  expandOptions: document.querySelector(".options-content"),
};

const timerState = {
  isRunning: false,
  interval: null,
  timeLeft: 0,
  sets: 0,
};

/**
 * Toggles the timer between start and pause states.
 */
function toggleTimer() {
  if (!timerState.isRunning) {
    startTimer();
    uiElements.startBtn.innerText = "Pause";
  } else {
    pauseTimer();
    uiElements.startBtn.innerText = "Start";
  }
}

/**
 * Resets the timer and UI elements to their initial state.
 */
function resetTimer() {
  clearInterval(timerState.interval);
  Object.assign(timerState, { isRunning: false, timeLeft: 0, sets: 0 });

  uiElements.setsSection.style.display = "none";
  uiElements.statusText.innerText = "Press Start";
  uiElements.timerEl.innerText = "00:00";
  document.body.style.backgroundColor = "#f5f5f5";
  uiElements.options.style.display = "block";
}

/**
 * Starts the timer and initializes the timer state.
 */
function startTimer() {
  const { setActivity, setRest, setSets } = uiElements;
  Object.assign(timerState, {
    isRunning: true,
    timeLeft: parseInt(setActivity.value),
    sets: parseInt(setSets.value),
  });

  uiElements.options.style.display = "none";
  uiElements.setsSection.style.display = "block";
  changePhase("Activity");
  timerState.interval = setInterval(updateTime, 1000);
}

/**
 * Changes the phase and updates the background color and status text.
 * @param {string} phase - The phase to change to. Possible values are "Activity" or any other value.
 */
function changePhase(phase) {
  const backgroundColor = phase === "Activity" ? "#ff9900" : "#66b3ff";
  document.body.style.backgroundColor = backgroundColor;
  uiElements.statusText.innerText = phase;
}

/**
 * Updates the timer state and UI elements based on the current time left.
 */
function updateTime() {
  timerState.timeLeft--;
  if (timerState.timeLeft <= 0) {
    if (uiElements.statusText.innerText === "Activity") {
      changePhase("Rest");
      timerState.timeLeft = parseInt(uiElements.setRest.value);
      timerState.sets--;
    } else {
      if (timerState.sets > 0) changePhase("Activity");
      timerState.timeLeft = parseInt(uiElements.setActivity.value);
    }

    if (timerState.sets === 0) resetTimer();
  }
  uiElements.setsEl.innerText = timerState.sets;
  updateTimer();
}

/**
 * Pauses the timer and updates the UI status text.
 */
function pauseTimer() {
  clearInterval(timerState.interval);
  Object.assign(timerState, { isRunning: false });
  uiElements.statusText.innerText = "Paused";
}

/**
 * Updates the timer display with the remaining time.
 */
function updateTimer() {
  const minutes = Math.floor(timerState.timeLeft / 60);
  const seconds = timerState.timeLeft % 60;
  uiElements.timerEl.innerText = `${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

uiElements.startBtn.addEventListener("click", toggleTimer);
uiElements.resetBtn.addEventListener("click", () => {
  resetTimer();
  uiElements.startBtn.innerText = "Start";
});

uiElements.expandBtn.addEventListener("click", () => {
  uiElements.expandOptions.style.display =
    uiElements.expandOptions.style.display === "none" ? "block" : "none";
});
