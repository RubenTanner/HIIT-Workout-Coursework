import * as wrk from "./workouts.js";

import express from "express";

const app = express();

app.use(express.static("client", { extensions: ["html"] }));

function getWorkouts(req, res) {
  const usr_id = req.params.id;
  const workouts = wrk.listWorkouts(usr_id);
  res.json(workouts);
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

app.get("/Workouts/:id", getWorkouts);
app.get("/Workouts/:id", getWorkout);
app.post("/Workouts/:id", express.json(), saveWorkouts);

app.listen(8080);
