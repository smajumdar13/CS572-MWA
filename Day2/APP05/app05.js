const express = require("express");
const app = express();
const path = require("path");

app.set("port", 3000);

// app.use(express.static(path.join(__dirname, "public")));

// app.use(function (req, res, next) {
//   console.log(req.method, req.url);
//   next();
// });

app.use("/css", function (req, res, next) {
  console.log(req.method, req.url);
  next();
});

app.use(express.static(path.join(__dirname, "public")));
// more functions than the lower code of app.get

// app.get("/", function (req, res) {
//   console.log("GET Homepage");
//   res.status(200).sendFile(path.join(__dirname, "public", "index.html"));
// });

app.get("/json", function (req, res) {
  console.log("JSON request received.");
  res.status(200).json({ jsonData: true });
});

app.get("/file", function (req, res) {
  console.log("File request received.");
  res.status(200).sendFile(path.join(__dirname, "app05.js"));
});

const server = app.listen(app.get("port"), function () {
  const port = server.address().port;
  console.log("Listening to port: " + port);
});
