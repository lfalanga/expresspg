const express = require("express");
const app = express();
const { infoCourses } = require("./courses");
// routers
app.use("/api/courses/programming", routerProgramming);
app.use("/api/courses/math", routerMath);

// routing
app.get("/", (req, res) => {
  res.send("express http server root");
});

app.get("/api/courses", (req, res) => {
  res.send(infoCourses);
});

routerProgramming.get("/", (req, res) => {
  res.send(infoCourses.programming);
});

// url and query parameters
routerProgramming.get("/:language", (req, res) => {
  const language = req.params.language;
  // query parameter
  // console.log(req.query);
  const order = req.query.order;

  const filtered = infoCourses.programming.filter(
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
  const filtered = infoCourses.programming.filter(
    (course) => course.language === language && course.level === level
  );
  filtered.length === 0
    ? res.status(404).send("not found")
    : res.send(filtered);
});

routerMath.get("/", (req, res) => {
  res.send(infoCourses.math);
});

// url parameter
routerMath.get("/:theme", (req, res) => {
  const theme = req.params.theme;
  const filtered = infoCourses.math.filter((course) => course.theme === theme);
  filtered.length === 0
    ? res.status(404).send("not found")
    : res.send(filtered);
});

// listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server listening at http://localhost:${PORT}`);
});
