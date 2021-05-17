const fs = require("fs");
console.log("1: Get a file");
//const file = fs.readFileSync("longFile.txt");

fs.readFile("longFile.txt", function(err, file){ // non-blocking code
    console.log
});
console.log("2: Got the file");
console.log("3: App continues...");