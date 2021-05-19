const express = require("express");
const app = express();
const path = require("path");
const routes = require("./routes");

app.set("port", 3000);

app.use(function (req, res, next) {
  console.log(req.method, req.url);
  next();
});

app.use(express.static(path.join(__dirname, "public")));

// app.use("/", routes); // localhost:3000/json
app.use("/api", routes); // localhost:3000/api/json : api created

// app.get("/file", function (req, res) {
//   console.log("File request received.");
//   res.status(200).sendFile(path.join(__dirname, "app05.js"));
// });

const server = app.listen(app.get("port"), function () {
  const port = server.address().port;
  console.log("Listening to port: " + port);
});
