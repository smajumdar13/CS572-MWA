const promise1 = new Promise((resolve, reject) => {
    let num = Math.random();
    setTimeout(() => {
        if (num > 0.5) {
            resolve(num);
        } else {
            reject(num);
        }
    }, 3000);
});

const success = function (value) {
    console.log("Success");
    console.log("Success value ", value);
}

const error = function (value) {
    console.log("error");
    console.log("Error value ", value);
}

// promise1.then(success).catch(error);

// ---------------------------------------------------------------------------------------------- //

const promise2 = new Promise((resolve, reject) => {
    let num = Math.random() - 0.5;
    setTimeout(() => {
        if (num > 0.5) {
            resolve(num);
        } else {
            reject(num);
        }
    }, 3000);
});

// const success = function (value) {
//     console.log("Success");
//     console.log("Success value ", value);
// }

// const error = function (value) {
//     console.log("error");
//     console.log("Error value ", value);
// }

// promise2.then(success).catch(error);

// ---------------------------------------------------------------------------------------------- //

const promise3 = new Promise((resolve, reject) => {
    let num = Math.random() + 0.5;
    setTimeout(() => {
        if (num > 0.5) {
            resolve(num);
        } else {
            reject(num);
        }
    }, 3000);
});

// const success = function (value) {
//     console.log("Success");
//     console.log("Success value ", value);
// }

// const error = function (value) {
//     console.log("error");
//     console.log("Error value ", value);
// }

// promise3.then(success).catch(error);

// ---------------------------------------------------------------------------------------------- //

// Promise.all([promise1, promise2, promise3]).then(success).catch(error);
Promise.race([promise1, promise2, promise3]).then(success).catch(error);
