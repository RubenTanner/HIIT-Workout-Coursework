// DOM ELEMENTS
const timerEl = document.querySelector("#time");
const setsEl = document.querySelector("#sets");
const setsSection = document.querySelector(".sets-section");
const statusText = document.querySelector(".status-text");
const startBtn = document.querySelector("#start-btn");
const resetBtn = document.querySelector("#reset-btn");
const expandBtn = document.querySelector("#expand-btn");
const expandOptions = document.querySelector(".options-content");
const options = document.querySelector(".advanced-options");
const activityForm = document.querySelector("#workout-list");
const addWorkoutBtn = document.querySelector(".add-workout-btn");
const saveWorkoutBtn = document.querySelector(".save-workout-btn");
const setName = document.querySelector("#set-name");
const setDescription = document.querySelector("#set-description");
const setActivity = document.querySelector("#set-activity");
const setRest = document.querySelector("#set-rest");
const setSets = document.querySelector("#set-sets");
const currentWorkout = document.querySelector("#current-workout");

let isRunning = false;
let interval;
let timeLeft = 0;

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

function setUserClientId() {
  return localStorage.setItem("clientId", generateId());
}

function getUserClientId() {
  return localStorage.getItem("clientId");
}

async function createWorkout() {
  const workouts = collectWorkouts();

  console.log("workouts", workouts);

  const response = await fetch(`../Workouts/${getUserClientId()}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ workouts }),
  });
  if (response.ok) {
    console.log("message sent successfully", response);
  } else {
    console.log("failed to send message", response);
  }
}
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
  statusText.innerText = currentWorkout.name;
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

function addWorkoutField() {
  const section = document.createElement("section");
  section.classList.add("workout-input");

  const name = document.createElement("input");
  name.type = "text";
  name.classList.add("input-field", "set-name");
  name.placeholder = "Name";
  name.required = true;

  // Create description input
  const description = document.createElement("input");
  description.type = "text";
  description.classList.add("input-field", "set-description");
  description.placeholder = "Description";
  description.required = true;

  // Create activity input
  const activity = document.createElement("input");
  activity.type = "number";
  activity.classList.add("input-field", "set-activity");
  activity.placeholder = "Activity (minutes)";
  activity.required = true;

  // Create rest input
  const rest = document.createElement("input");
  rest.type = "number";
  rest.classList.add("input-field", "set-rest");
  rest.placeholder = "Rest (minutes)";
  rest.required = true;

  // Create sets input
  const sets = document.createElement("input");
  sets.type = "number";
  sets.classList.add("input-field", "set-sets");
  sets.placeholder = "Sets";
  sets.required = true;

  // Create delete button
  const btnDel = document.createElement("button");
  btnDel.type = "button";
  btnDel.classList.add("del-workout-btn");
  btnDel.innerText = "Remove";
  btnDel.addEventListener("click", function () {
    section.remove();
  });

  section.appendChild(name);
  section.appendChild(description);
  section.appendChild(activity);
  section.appendChild(rest);
  section.appendChild(sets);
  section.appendChild(btnDel);

  activityForm.appendChild(section);
}

function collectWorkouts() {
  const workoutSections = document.querySelectorAll(".workout-input");
  const workouts = Array.from(workoutSections)
    .map((section) => {
      const name = section.querySelector(".set-name");
      const description = section.querySelector(".set-description");
      const activity = section.querySelector(".set-activity");
      const rest = section.querySelector(".set-rest");
      const sets = section.querySelector(".set-sets");

      // Only construct a workout object if all elements are found
      if (name && description && activity && rest && sets) {
        return {
          wrk_id: generateId(),
          name: name.value,
          description: description.value,
          activity: section.querySelector(".set-activity").value,
          rest: section.querySelector(".set-rest").value,
          sets: section.querySelector(".set-sets").value,
        };
      }
      return null;
    })
    .filter((workout) => workout !== null); // Filter out any nulls that may have been added
  return workouts;
}

addWorkoutBtn.addEventListener("click", addWorkoutField);

function removeWorkoutField(el) {
  const field = el.target.parentElement;
  field.remove();
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

saveWorkoutBtn.addEventListener("click", createWorkout);

document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("clientId")) {
    setUserClientId();
  }
  console.log("Client ID", getUserClientId());
});
