let workouts = [];

export function listWorkouts(usr_id) {
  return workouts.filter((workout) => workout.usr_id === usr_id);
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
