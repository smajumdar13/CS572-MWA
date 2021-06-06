let fib = function (num) {
    let num1 = 0;
    let num2 = 1;
    let sum;
    for (let i = 0; i < num; i++) {
        sum = num1 + num2;
        num1 = num2;
        num2 = sum;
    }
    return num2;
}

const fibonacciPromise = function (input) {
    return new Promise((resolve, reject) => {
        if (input >= 1) {
            resolve(fib(input));
        } else {
            reject("Invalid Number!");
        }
    });
}

console.log("Start");

fibonacciPromise(42).then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
});

console.log("End");
