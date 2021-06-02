let x = 5;
console.log("The value of x is " + x);

x = "Jack";
console.log("The value of x is " + x);

//---------------------------------------------------------------//

// hoisting
function m1() {

    console.log(name);
    // let breaks the function midway, but var continues the function until the end
    var name = "Jack";
}

console.log("Start");
m1();
console.log("End");
