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

function saveWorkout(req, res) {
  const usr_id = req.params.id;
  const workout = req.body;

  const workouts = wrk.addWorkout(workout, usr_id);

  res.json(workouts);
}

function editWorkout(req, res) {
  const workout = wrk.editWorkout(req.body);
  res.json(workout);
}

app.get("/Workouts", getWorkouts);
app.get("/Workouts/:usr_id", getWorkout);
app.post("/Workouts/:id", express.json(), saveWorkout);
app.put("/Workouts/:id", express.json(), editWorkout);

app.listen(8080);
