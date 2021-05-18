const express = require("express");
const app = express();

// process 1
app.listen(3000);
console.log("Listening to port 3000");

console.log("App Started");

// const server = app.listen(3000, function{
//     console.log("Listening to port 3000")
// });