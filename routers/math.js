const express = require("express");
const routerMath = new express.Router();
const { math } = require("../data/courses").infoCourses;

routerMath.get("/", (req, res) => {
  res.send(math);
});

routerMath.get("/:theme", (req, res) => {
  const theme = req.params.theme;
  const filtered = math.filter((course) => course.theme === theme);
  filtered.length === 0
    ? res.status(404).send("not found")
    : res.send(filtered);
});

module.exports = routerMath;
