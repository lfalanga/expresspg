const express = require("express");
const app = express();
const { infoCourses } = require("./courses");
// console.log(infoCourses);


// routing
app.get("/", (req, res) => {
  res.send("express http server root");
});

app.get("/api/courses", (req, res) => {
  // res.send(JSON.stringify(infoCourses));
  res.send(infoCourses);
});

app.get("/api/courses/programming", (req, res) => {
  res.send(infoCourses.programming);
});

// url and query parameters
app.get("/api/courses/programming/:language", (req, res) => {
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

app.get("/api/courses/programming/:language/:level", (req, res) => {
  const language = req.params.language;
  const level = req.params.level;
  const filtered = infoCourses.programming.filter(
    (course) => course.language === language && course.level === level
  );
  filtered.length === 0
    ? res.status(404).send("not found")
    : res.send(filtered);
});

app.get("/api/courses/math", (req, res) => {
  res.send(infoCourses.math);
});

// url parameter
app.get("/api/courses/math/:theme", (req, res) => {
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
