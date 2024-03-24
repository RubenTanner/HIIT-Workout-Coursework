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

export function addWorkout(workout, usr_id) {
  const newWorkout = {
    usr_id: usr_id,
    wkr_id: workout.wrk_id,
    name: workout.name,
    description: workout.description,
    activity: parseInt(workout.activity), // Corrected here
    rest: parseInt(workout.rest), // And here
    sets: parseInt(workout.sets), // And here
  };
  workouts = [newWorkout, ...workouts];
  console.log("workouts", workouts);
  return newWorkout;
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
