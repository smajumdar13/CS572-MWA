const fib = function(number){
    if(number <= 2){
        return 1;
    } else {
        return fib(number-1) + fib(number-2);
    }
};

console.log("Fibonacci of 42 is " + fib(42));