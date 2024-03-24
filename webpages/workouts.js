let workouts = [
  {
    usr_id: 1234,
    wkr_id: 5678,
    name: "Workout Title",
    description: "This is my description",
    activity: 30,
    rest: 10,
    sets: 10,
  },
];

export function listWorkouts() {
  return workouts;
}

export function findWorkout(wkr_id) {
  for (const workout of workouts) {
    if (workout.wkr_id === wkr_id) {
      return workout;
    }
  }
  return null;
}

export function addWorkout(workout) {
  if (workout.trim() === "") return workouts;
  const newWorkout = {
    id: uuid(),
    time: Date(),
    msg,
  };
  workouts = [newWorkout, ...workouts.slice(0, 9)];
  return workouts;
}

export function editWorkout(updatedWorkout) {
  const storedWorkout = findWorkout(updatedWorkout.id);
  if (storedWorkout == null) throw new Error("Workout not found");

  // update old workout in place
  storedWorkout.name = updatedWorkout.name;
  storedWorkout.description = updatedWorkout.description;
  storedWorkout.activity = updatedWorkout.activity;
  storedWorkout.rest = updatedWorkout.rest;
  storedWorkout.sets = updatedWorkout.sets;

  return storedWorkout;
}
