// DOM Elements
const elements = {
  timerEl: "#time",
  setsEl: "#sets",
  setsSection: ".sets-section",
  statusText: ".status-text",
  statusDescription: ".status-description",
  startBtn: "#start-btn",
  resetBtn: "#reset-btn",
  expandBtn: "#expand-btn",
  expandOptions: ".options-content",
  options: ".advanced-options",
  activityForm: "#workout-list",
  addWorkoutBtn: ".add-workout-btn",
  saveWorkoutBtn: ".save-workout-btn",
  setName: "#set-name",
  setDescription: "#set-description",
  setActivity: "#set-activity",
  setRest: "#set-rest",
  setSets: "#set-sets",
  nextWorkoutSection: ".next-workout-section",
  currentWorkout: ".current-workout",
  nextWorkoutEl: ".next-workout",
  nextWorkoutDescription: ".next-workout-description",
};

const el = {};

for (const [key, selector] of Object.entries(elements)) {
  el[key] = document.querySelector(selector);
}

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
  const response = await fetch(`../workouts/${getUserClientId()}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ workouts }),
  });
  if (response.ok) {
    console.log("Workout created successfully", response);
  } else {
    console.error("Failed to create workout", response);
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

  initialiseWorkoutSession(workoutState);

  clearInterval(interval);
  interval = setInterval(() => {
    handleIntervalTick();
  }, 1000);
}

/**
 * Initializes a workout session with the given workout state.
 * @param {Object} workoutState - The state of the workout session.
 */
function initialiseWorkoutSession(workoutState) {
  el.options.style.display = "none";
  isRunning = true;
  timeLeft = workoutState.activityTime;
  el.statusText.innerText = workoutState.currentWorkout.name;
  el.statusDescription.innerText = workoutState.currentWorkout.description;
  el.setsEl.innerText = workoutState.setsRemaining;
  el.setsSection.style.display = "block";
  document.body.style.backgroundColor = "#ff9900";
  el.timerEl.innerText = formatTime(timeLeft);
}

/**
 * Handles the interval tick for the workout timer.
 * Decreases the time left, updates the timer element, and handles the logic for switching between workout and rest states.
 */
function handleIntervalTick() {
  timeLeft--;
  el.timerEl.innerText = formatTime(timeLeft);

  if (timeLeft <= 0) {
    if (el.statusText.innerText === workoutState.currentWorkout.name) {
      if (workoutState.setsRemaining > 0) {
        el.statusText.innerText = "Rest";
        el.statusDescription.innerText = "Take a break!";
        document.body.style.backgroundColor = "#66b3ff";
        timeLeft = workoutState.restTime;
      }
    } else {
      workoutState.setsRemaining--;
      el.setsEl.innerText = workoutState.setsRemaining;
      if (
        workoutState.setsRemaining == 1 &&
        currentWorkoutIndex + 1 < workoutQueue.length
      ) {
        const nextWorkout = workoutQueue[currentWorkoutIndex + 1];
        el.nextWorkoutEl.innerText = "Up Next: " + nextWorkout.name;
        el.nextWorkoutDescription.innerText = nextWorkout.description;
        el.nextWorkoutSection.style.display = "block";
      }
      if (workoutState.setsRemaining > 0) {
        el.statusText.innerText = workoutState.currentWorkout.name;
        el.statusDescription.innerText =
          workoutState.currentWorkout.description;
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

/**
 * Formats the given time in seconds into a string representation of minutes and seconds.
 *
 * @param {number} seconds - The time in seconds.
 * @returns {string} The formatted time in the format "minutes:seconds".
 */
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
      `../workouts/${getUserClientId()}/${workoutId}`
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
 * Resets the timer and clears the interval.
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

  getWorkoutHistory();
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

  const namePrompt = document.createElement("p");
  namePrompt.innerText = "Name:";

  const name = document.createElement("input");
  name.type = "text";
  name.classList.add("input-field", "set-name");
  name.placeholder = "Name";
  name.required = true;

  const descriptionPrompt = document.createElement("p");
  descriptionPrompt.innerText = "Description:";

  const description = document.createElement("input");
  description.type = "text";
  description.classList.add("input-field", "set-description");
  description.placeholder = "Description";
  description.required = true;

  const activityPrompt = document.createElement("p");
  activityPrompt.innerText = "Activity (Seconds):";

  const activity = document.createElement("input");
  activity.type = "number";
  activity.classList.add("input-field", "set-activity");
  activity.placeholder = "Activity (Seconds)";
  activity.min = 0;
  activity.required = true;

  const restPrompt = document.createElement("p");
  restPrompt.innerText = "Rest:";

  const rest = document.createElement("input");
  rest.type = "number";
  rest.classList.add("input-field", "set-rest");
  rest.placeholder = "Rest";
  rest.min = 0;
  rest.required = true;

  const setsPrompt = document.createElement("p");
  setsPrompt.innerText = "Sets:";

  const sets = document.createElement("input");
  sets.type = "number";
  sets.classList.add("input-field", "set-sets");
  sets.placeholder = "Sets";
  sets.min = 1;
  sets.required = true;

  const btnDel = document.createElement("button");
  btnDel.type = "button";
  btnDel.classList.add("del-workout-btn");
  btnDel.innerText = "Remove";
  btnDel.addEventListener("click", function () {
    section.remove();
  });

  section.append(
    namePrompt,
    name,
    descriptionPrompt,
    description,
    activityPrompt,
    activity,
    restPrompt,
    rest,
    setsPrompt,
    sets,
    btnDel
  );
  el.activityForm.append(section);
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
 * Retrieves the workout history for the user.
 * @returns {Promise<void>} A promise that resolves when the workout history is fetched and displayed.
 */
async function getWorkoutHistory() {
  try {
    const response = await fetch(`../workouts/${getUserClientId()}`);
    const workoutHistory = await response.json();

    updateWorkoutHistoryDisplay(workoutHistory);
  } catch (error) {
    console.error("Failed to fetch workout history:", error);
  }
}

/**
 * Updates the workout history display with the provided workout history data.
 *
 * @param {Array} workoutHistory - The array of workout history entries.
 * @returns {void}
 */
function updateWorkoutHistoryDisplay(workoutHistory) {
  const historyContent = document.getElementById("history-content");
  historyContent.innerHTML = "";

  workoutHistory.forEach((workout) => {
    const section = document.createElement("section");
    section.classList.add("workout-history-entry");

    const name = document.createElement("h3");
    name.textContent = workout.name;

    const description = document.createElement("p");
    description.textContent = `Description: ${workout.description}`;

    const activity = document.createElement("p");
    activity.textContent = `Activity: ${workout.activity} seconds`;

    const rest = document.createElement("p");
    rest.textContent = `Rest: ${workout.rest} seconds`;

    const sets = document.createElement("p");
    sets.textContent = `Sets: ${workout.sets}`;

    const wrk_id = document.createElement("p");
    wrk_id.textContent = `ID: ${workout.wrk_id}`;

    section.append(name, description, activity, rest, sets, wrk_id);
    historyContent.append(section);
  });
}

/**
 * Removes the workout field from the DOM.
 * @param {Event} el - The event object representing the click event.
 */
function removeWorkoutField(el) {
  const field = el.target.parentElement;
  field.remove();
}

el.addWorkoutBtn.addEventListener("click", addWorkoutField);

el.startBtn.addEventListener("click", () => {
  if (!isRunning) {
    startTimer();
    el.startBtn.innerText = "Pause";
  } else {
    pauseTimer();
    el.startBtn.innerText = "Start";
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

el.saveWorkoutBtn.addEventListener("click", createWorkout);

document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("clientId")) {
    setUserClientId();
  }

  const toggleButton = document.querySelector("#toggle-history-btn");
  const historyContent = document.querySelector("#history-content");

  toggleButton.addEventListener("click", function () {
    const isHidden = historyContent.style.display === "none";
    historyContent.style.display = isHidden ? "block" : "none";
  });

  getWorkoutHistory();
});
