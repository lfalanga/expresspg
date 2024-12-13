const express = require("express");
const routerProgramming = new express.Router();
const { programming } = require("../data/courses").infoCourses;

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

module.exports = routerProgramming;
