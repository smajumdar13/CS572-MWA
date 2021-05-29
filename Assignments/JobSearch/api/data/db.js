const mongoose = require("mongoose");
require("./job-model");
const dbName = "jobList";
const dbUrl = "mongodb://localhost:27017/" + dbName;

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log("Mongoose disconnected by application termination");
    process.exit(0);
  });
});

process.on("SIGTERM", function () {
  mongoose.connection.close(function () {
    console.log("Mongoose disconnected by application termination");
    process.exit(0);
  });
});

process.on("SIGUSR2", function () {
  mongoose.connection.close(function () {
    console.log("Mongoose disconnected by application restart");
    process.kill(process.pid, "SIGUSR2");
  });
});

mongoose.connection.on("connected", function () {
  console.log("Mongoose connected to " + dbUrl);
});

mongoose.connection.on("disconnected", function () {
  console.log("Mongoose disconnected");
});

mongoose.connection.on("error", function (error) {
  console.log("Mongoose connection error " + error);
});
