const fs = require("fs");

const onFileLoad = function(err,file){
    console.log("2. Got the file")
}

console.log("1: Get a file");
fs.readFile("longFile.txt", onFileLoad);
console.log("3: App continues...");
