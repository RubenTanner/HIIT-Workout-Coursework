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
  const workouts = wrk.addWorkout(req.body.msg);
  res.json(workouts);
}

function editWorkout(req, res) {
  const workout = wrk.editWorkout(req.body);
  res.json(workout);
}

app.get("/Workouts", getWorkouts);
app.get("/Workouts/:id", getWorkout);
app.post("/Workouts", express.json(), saveWorkout);
app.put("/Workouts/:id", express.json(), editWorkout);

app.listen(8080);
