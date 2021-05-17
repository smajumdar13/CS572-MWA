const fs = require("fs");
console.log("1: Get a file");
const file = fs.readFileSync("shortfile.txt"); //once reading file is done, rest is executed, blocking code
console.log("2: Got the file");
console.log("3: App continues...");