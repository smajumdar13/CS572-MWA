console.log("1: Start app");

const laterWork = setTimeout(function(){
    console.log("2: In setTimeout");
}, 5000);   // Causes the function to execute after the certain time
            // Even with timeout zero, it will still run after 3

console.log("3. End app");
