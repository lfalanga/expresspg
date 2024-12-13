const express = require("express");
const app = express();
const { infoCourses } = require("./data/courses");
const routerProgramming = require("./routers/programming");
const routerMath = require("./routers/math");

app.use("/api/courses/programming", routerProgramming);
app.use("/api/courses/math", routerMath);

app.get("/", (req, res) => {
  res.send("express http server root");
});

app.get("/api/courses", (req, res) => {
  res.send(infoCourses);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server listening at http://localhost:${PORT}`);
});
