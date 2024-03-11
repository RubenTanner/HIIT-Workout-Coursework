let workouts = [
  {
    id: 1234,
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

export function findWorkout(id) {
  for (const workout of workouts) {
    if (workout.id === id) {
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
  storedWorkout.time = Date();
  storedWorkout.msg = updatedWorkout.msg;

  return storedWorkout;
}
