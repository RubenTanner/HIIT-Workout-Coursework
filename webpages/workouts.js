let workouts = [];

/**
 * Returns a list of workouts filtered by the specified user ID.
 *
 * @param {string} usr_id - The user ID to filter the workouts by.
 * @returns {Array} - An array of workouts matching the specified user ID.
 */
export function listWorkouts(usr_id) {
  return workouts.filter((workout) => workout.usr_id === usr_id);
}

/**
 * Finds a workout by its ID.
 *
 * @param {string} wrk_id - The ID of the workout to find.
 * @returns {object|null} - The found workout object, or null if not found.
 */
export function findWorkout(wrk_id) {
  for (const workout of workouts) {
    if (workout.wrk_id === wrk_id) {
      return workout;
    }
  }
  return null;
}

/**
 * Adds a new workout to the list of workouts.
 * @param {Object} workout - The workout object to be added.
 * @param {string} usr_id - The user ID associated with the workout.
 * @returns {Object} - The newly added workout object.
 */
export function addWorkout(workout, usr_id) {
  const newWorkout = {
    usr_id: usr_id,
    wrk_id: workout.wrk_id,
    name: workout.name,
    description: workout.description,
    activity: parseInt(workout.activity),
    rest: parseInt(workout.rest),
    sets: parseInt(workout.sets),
  };
  workouts = [newWorkout, ...workouts];
  return newWorkout;
}
