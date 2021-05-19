// opening a MEAN Games homepage on port 5000
const express = require("express");
const app = express();
const path = require("path");
const routes = require("./routes");

// Solution for question 1: assigning port 5000
app.set("port", 5000);

app.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
  });
  
// Solution for question 2: using public directory to return MEAN games mainpage
// localhost:5000 page (or localhost:5000/index.html)
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", routes);

// question 1: listening to port 5000
const server = app.listen(app.get("port"), function () {
    const port = server.address().port;
    // question 1: output to console on success
    console.log("Listening to port " + port);
    console.log("App Started");
});