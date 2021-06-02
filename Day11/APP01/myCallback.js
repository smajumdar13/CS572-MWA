// anonymous callback
const myInsert = function (numberToInsert, callback) {
    console.log("Insert data into db...;");
    const randomNumber = Math.random() * 10;
    if (randomNumber > 5)
        callback(null, randomNumber);
    callback({ error: "Cannot save" });
};


// named callback: can be used in testing due to isolation of the code
const myCallback = function (err, result) {
    console.log(err);
    console.log(result);
};

myInsert(7, function (err, result) {
    console.log(err);
    console.log(result);
});

// myInsert(7, myCallback);

// ---------------------------------------------------------------------------------------------- //

const readFromDbById = function (numberToInsert, callback) {
    console.log("Insert data into db...;");
    const randomNumber = Math.random() * 10;
    for (let i = 0; i < 10000; i++)
        for (let j = 0; j < 10000; j++)
            for (let k = 0; k < 10000; k++) {
                k += 1;
            }
    if (randomNumber > 5)
        callback(null, randomNumber);
    callback({ error: "Cannot save" });
};

const afterRead = function (err, result) {
    console.log(err);
    console.log(result);
};

readFromDbById(7, afterRead);

// ---------------------------------------------------------------------------------------------- //

