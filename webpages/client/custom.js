// DOM ELEMENTS
const timerEl = document.querySelector("#time");
const setsEl = document.querySelector("#sets");
const setsSection = document.querySelector(".sets-section");
const statusText = document.querySelector(".status-text");
const statusDescription = document.querySelector(".status-description");
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

let workoutQueue = [];
let currentWorkoutIndex = 0;
let workoutState = {
  activityTime: 0,
  restTime: 0,
  setsRemaining: 0,
  currentWorkout: null,
};

/**
 * Generates a unique ID.
 * @returns {string} The generated ID.
 */
function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

/**
 * Sets the user client ID in the local storage.
 * @returns {void}
 */
function setUserClientId() {
  return localStorage.setItem("clientId", generateId());
}

/**
 * Retrieves the client ID from the local storage.
 * @returns {string|null} The client ID if it exists, or null if it doesn't.
 */
function getUserClientId() {
  return localStorage.getItem("clientId");
}

/**
 * Creates a workout by collecting the workouts and sending them to the server.
 * @returns {Promise<void>} A promise that resolves when the workout is created successfully.
 */
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
 * Starts the timer for a workout session.
 * If a workout ID is provided, it fetches the workout by ID and starts the session with that workout.
 * If no workout ID is provided, it collects workouts and starts the session with the first workout in the queue.
 * @param {string|null} workoutId - The ID of the workout to start the session with.
 */
async function startTimer(workoutId = null) {
  if (workoutId) {
    const workout = await fetchWorkoutById(workoutId);
    if (workout) {
      workoutQueue = [workout];
      currentWorkoutIndex = 0;
    } else {
      console.error("Failed to retrieve workout by ID");
      return;
    }
  } else if (
    workoutQueue.length === 0 ||
    currentWorkoutIndex >= workoutQueue.length
  ) {
    workoutQueue = collectWorkouts();
    currentWorkoutIndex = 0;
    if (workoutQueue.length === 0) {
      console.error("No workouts to start");
      return;
    }
  }

  const currentWorkout = workoutQueue[currentWorkoutIndex];
  workoutState.activityTime = parseInt(currentWorkout.activity);
  workoutState.restTime = parseInt(currentWorkout.rest);
  workoutState.setsRemaining = parseInt(currentWorkout.sets);
  workoutState.currentWorkout = currentWorkout;

  initializeWorkoutSession(workoutState);

  clearInterval(interval);
  interval = setInterval(() => {
    handleIntervalTick();
  }, 1000);
}

/**
 * Initializes a workout session with the given workout state.
 * @param {Object} workoutState - The state of the workout session.
 */
function initializeWorkoutSession(workoutState) {
  options.style.display = "none";
  isRunning = true;
  timeLeft = workoutState.activityTime;
  statusText.innerText = workoutState.currentWorkout.name;
  statusDescription.innerText = workoutState.currentWorkout.description;
  setsEl.innerText = workoutState.setsRemaining;
  setsSection.style.display = "block";
  document.body.style.backgroundColor = "#ff9900";
  timerEl.innerText = formatTime(timeLeft);
}

/**
 * Handles the interval tick for the workout timer.
 * Decreases the time left, updates the timer element, and handles the logic for switching between workout and rest states.
 */
function handleIntervalTick() {
  timeLeft--;
  timerEl.innerText = formatTime(timeLeft);

  if (timeLeft <= 0) {
    if (statusText.innerText === workoutState.currentWorkout.name) {
      if (workoutState.setsRemaining > 0) {
        statusText.innerText = "Rest";
        statusDescription.innerText = "Take a break!";
        document.body.style.backgroundColor = "#66b3ff";
        timeLeft = workoutState.restTime;
      }
    } else {
      workoutState.setsRemaining--;
      setsEl.innerText = workoutState.setsRemaining;
      console.log("hello");
      if (workoutState.setsRemaining > 0) {
        statusText.innerText = workoutState.currentWorkout.name;
        statusDescription.innerText = workoutState.currentWorkout.description;
        document.body.style.backgroundColor = "#ff9900";
        timeLeft = workoutState.activityTime;
      } else {
        currentWorkoutIndex++;
        if (currentWorkoutIndex < workoutQueue.length) {
          clearInterval(interval);
          startTimer();
        } else {
          resetTimer();
        }
      }
    }
  }
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedSeconds = remainingSeconds.toString().padStart(2, "0");
  return `${minutes}:${formattedSeconds}`;
}

/**
 * Fetches a workout by its ID.
 * @param {string} workoutId - The ID of the workout to fetch.
 * @returns {Promise<Object|null>} - A Promise that resolves to the fetched workout object, or null in case of any failures.
 */
async function fetchWorkoutById(workoutId) {
  try {
    const response = await fetch(
      `../Workouts/${getUserClientId()}/${workoutId}`
    );
    if (response.ok) {
      const workout = await response.json();
      return workout;
    } else {
      console.error("Failed to fetch workout", response);
    }
  } catch (error) {
    console.error("Error fetching workout by ID", error);
  }
  return null;
}

/**
 * Resets the timer and restores the initial state of the application.
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

/**
 * Adds a workout field to the activity form.
 */
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

/**
 * Collects workout information from the DOM and returns an array of workout objects.
 * @returns {Array<Object>} An array of workout objects containing the collected information.
 */
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
    .filter((workout) => workout !== null);
  return workouts;
}

/**
 * Removes the workout field from the DOM.
 * @param {Event} el - The event object representing the click event.
 */
function removeWorkoutField(el) {
  const field = el.target.parentElement;
  field.remove();
}

addWorkoutBtn.addEventListener("click", addWorkoutField);

startBtn.addEventListener("click", () => {
  if (!isRunning) {
    startTimer();
    startBtn.innerText = "Pause";
  } else {
    pauseTimer();
    startBtn.innerText = "Start";
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
