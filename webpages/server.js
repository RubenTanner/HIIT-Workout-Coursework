import * as wrk from "./workouts.js";

import express from "express";

const app = express();

app.use(express.static("client", { extensions: ["html"] }));

function getWorkouts(req, res) {
  res.json(wrk.listWorkouts());
}

function getWorkout(req, res) {
  const result = wrk.findWorkout(req.params.id);
  if (result) {
    res.json(result);
  } else {
    res.status(404).send("No match for that ID.");
  }
}

function saveWorkouts(req, res) {
  const usr_id = req.params.id;
  const workouts = req.body.workouts;

  const savedWorkouts = workouts.map((workout) =>
    wrk.addWorkout(workout, usr_id)
  );

  res.json(savedWorkouts);
}

function editWorkout(req, res) {
  const workout = wrk.editWorkout(req.body);
  res.json(workout);
}

app.get("/Workouts", getWorkouts);
app.get("/Workouts/:usr_id", getWorkout);
app.post("/Workouts/:id", express.json(), saveWorkouts);
app.put("/Workouts/:id", express.json(), editWorkout);

app.listen(8080);
