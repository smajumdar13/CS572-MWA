// const fib = function (number) {
//     return new Promise((resolve, reject) => {
//         if (number <= 2) {
//             return resolve(number);
//         } else {
//             return resolve((number - 1) + fib(number - 2));
//         }
//     });
// };

// console.log("Start");
// fib(10).then((result) => {
//     console.log("Fib is: " + result);
// }).catch((err) => {
//     console.log(err);
// });
// console.log("End");

function genFibonacciAsync(list, ceiling) {
    return new Promise(function (resolve, reject) {
        // async recursive
        setTimeout(function () {
            next = list[list.length - 1] + list[list.length - 2];
            if (next > ceiling)
                resolve();
            else {
                list.push(next);
                resolve(genFibonacciAsync(list, ceiling))
            }
        }, 1);
    });
}

console.log('start async...');
var list = [];
list.push(1);
list.push(1);
genFibonacciAsync(list, 1000)
  .then(function() {
    list.forEach(function(val) {
      console.log(val + ',');
    })
  });
console.log('end...');