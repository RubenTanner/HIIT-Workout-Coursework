const timerEl = document.getElementById("time");
const statusTextEl = document.querySelector(".status-text");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");

let isRunning = false;
let intervalId;
let timeLeft = 0;
let activityTime = 30;
let restTime = 10;
let totalTime = 7 * 60;

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timeLeft = activityTime;
    statusTextEl.innerText = "Activity";
    document.body.style.backgroundColor = "#ff5722";

    intervalId = setInterval(() => {
      timeLeft--;

      if (timeLeft <= 0) {
        beep.play();

        if (statusTextEl.innerText === "Activity") {
          statusTextEl.innerText = "Rest";
          document.body.style.backgroundColor = "#007bff";
          timeLeft = restTime;
        } else {
          statusTextEl.innerText = "Activity";
          document.body.style.backgroundColor = "#ff5722";
          timeLeft = activityTime;
        }
      }

      updateTimer();
    }, 1000);
  } else {
    stopTimer();
  }
}

function stopTimer() {
  clearInterval(intervalId);
  isRunning = false;
  timeLeft = 0;
  statusTextEl.innerText = "Activity";
  timerEl.innerText = "00:00";
  document.body.style.backgroundColor = "#f5f5f5";
}

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerEl.innerText = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

function pauseTimer() {
  if (isRunning) {
    clearInterval(intervalId);
    isRunning = false;
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
