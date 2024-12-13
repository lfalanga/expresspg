const express = require("express");
const routerProgramming = new express.Router();
const { programming } = require("../data/courses").infoCourses;

// middleware
routerProgramming.use(express.json());

// routing
routerProgramming.get("/", (req, res) => {
  res.send(programming);
});

routerProgramming.get("/:language", (req, res) => {
  const language = req.params.language;
  const order = req.query.order;

  const filtered = programming.filter(
    (course) => course.language === language
  );

  let ordered;
  if (order === "hits") {
    ordered = filtered.sort((a, b) => b.hits - a.hits);
  } else {
    ordered = filtered;
  }

  ordered.length === 0
    ? res.status(404).send("not found")
    : res.send(ordered);
});

routerProgramming.get("/:language/:level", (req, res) => {
  const language = req.params.language;
  const level = req.params.level;
  const filtered = programming.filter(
    (course) => course.language === language && course.level === level
  );
  filtered.length === 0
    ? res.status(404).send("not found")
    : res.send(filtered);
});

routerProgramming.post("/", (req, res) => {
  let newCourse = req.body;
  programming.push(newCourse);
  res.send(programming);
});

routerProgramming.put("/:id", (req, res) => {
  const updatedCourse = req.body;
  const id = req.params.id;
  const index = programming.findIndex(course => course.id == id);

  if (index >= 0) {
    programming[index] = updatedCourse;
  }
  res.send(programming);
});

routerProgramming.patch("/:id", (req, res) => {
  const updatedInfo = req.body;
  const id = req.params.id;
  const index = programming.findIndex(course => course.id == id);

  if (index >= 0) {
    const updateCourse = programming[index];
    Object.assign(updateCourse, updatedInfo);
  }
  res.send(programming);
});

routerProgramming.delete("/:id", (req, res) => {
  const id = req.params.id;
  const index = programming.findIndex(course => course.id == id);

  if (index >= 0) {
    programming.splice(index, 1);
  }
  res.send(programming);
})

module.exports = routerProgramming;
