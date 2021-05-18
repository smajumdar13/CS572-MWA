const express = require("express");
const path = require("path");
const app = express();

app.set("port", 4000);

app.get("/", function (req, res) {
  console.log("GET received");
  res.status(404).send("Received your Get request.");
  // res.send("received your get Request");
});

app.get("/json", function (req, res) {
  console.log("JSON request received");
  res.status(200).json({"jsonData": true});
});

app.get("/file", function (req, res) {
  console.log("File request received");
  res.status(200).sendFile(path.join(__dirname, "app03.js"));
});

const server = app.listen(app.get("port"), function () {
    const port = server.address().port;
    console.log("Listening to port " + port);
  });
