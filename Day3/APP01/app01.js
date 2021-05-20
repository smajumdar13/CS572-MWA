const express = require("express");
const app = express();
const path = require("path");
const routes = require("./routes");
require("./data/dbconnection").open();


app.set("port", 3000);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: false}));
app.use(express.json({extended: false}));

app.use("/api", routes); 

const server = app.listen(app.get("port"), function () {
  const port = server.address().port;
  console.log("Listening to port: " + port);
});

