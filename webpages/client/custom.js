// DOM ELEMENTS
const timerEl = document.querySelector("#time");
const setsEl = document.querySelector("#sets");
const setsSection = document.querySelector(".sets-section");
const statusText = document.querySelector(".status-text");
const startBtn = document.querySelector("#start-btn");
const resetBtn = document.querySelector("#reset-btn");
const expandBtn = document.querySelector("#expand-btn");
const options = document.querySelector(".advanced-options");
const activityForm = document.querySelector("#workout-list");
const addWorkoutBtn = document.querySelector(".add-workout-btn");
const deleteWorkoutBtn = document.querySelector(".delete-workout-btn");
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

function createWorkout() {
  let workout = {
    usr_id: getUserClientId(),
    wrk_id: generateId(),
    name: setName.value,
    description: setDescription.value,
    activity: setActivity.value,
    rest: setRest.value,
    sets: setSets.value,
  };
}

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

function setUserClientId() {
  return localStorage.setItem("clientId", generateId());
}

function getUserClientId() {
  return localStorage.getItem("clientId");
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

// document.addEventListener("DOMContentLoaded", function () {
//   output = document.querySelector("code");

//   if (getUserClientId()) {
//     getUserClientId();
//   } else {
//     setUserClientId();
//   }
// });

function addWorkoutField() {
  // Create elements
  const section = document.createElement("section");
  const name = document.createElement("input");
  const description = document.createElement("input");
  const activity = document.createElement("input");
  const rest = document.createElement("input");
  const sets = document.createElement("input");
  const btnAdd = document.createElement("button");
  const btnDel = document.createElement("button");

  // Add Classes to the section
  section.classList.add("workout-input");
  // Generate a unique ID for the workout
  const workoutId = generateId();

  // Add the ID to the section element
  section.dataset.workoutId = workoutId;

  // set button DEL
  btnDel.type = "button";
  btnDel.classList.add("del-workout-btn");
  btnDel.innerText = "Remove";

  // set name
  name.type = "text";
  name.id = "set-name";
  name.placeholder = "workout Name";
  name.setAttribute("required", "");
  name.classList.add("input-field");

  // set description
  description.type = "text";
  description.id = "set-description";
  description.placeholder = "workout Description";
  description.setAttribute("required", "");
  description.classList.add("input-field");

  // set activity
  activity.type = "number";
  activity.id = "set-activity";
  activity.placeholder = "Activity";
  activity.setAttribute("required", "");
  activity.classList.add("input-field");

  // set rest
  rest.type = "number";
  rest.id = "set-rest";
  rest.placeholder = "Rest";
  rest.setAttribute("required", "");
  rest.classList.add("input-field");

  // set sets
  sets.type = "number";
  sets.id = "set-sets";
  sets.placeholder = "Sets";
  sets.setAttribute("required", "");
  sets.classList.add("input-field");

  //append elements to main section
  section.appendChild(name);
  section.appendChild(description);
  section.appendChild(activity);
  section.appendChild(rest);
  section.appendChild(sets);
  section.appendChild(btnDel);

  // append element to DOM
  activityForm.appendChild(section);
  btnDel.addEventListener("click", removeWorkoutField);
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
  this.classList.toggle("active");
  let content = this.nextElementSibling;
  if (content.style.maxHeight) {
    content.style.maxHeight = null;
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
  }
});
