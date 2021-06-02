function myPromiseFactory() {
    return new Promise(resolve => setTimeout(() => resolve("Done"), 3000));
}

function myPromiseFactory2() {
    return new Promise(resolve => setTimeout(() => resolve("Done"), 1000));
}

// await requires async to run, otherwise end up in error
async function asyncFunc() {
    console.log("Start");
    const result1 = await myPromiseFactory(); // 2 won't run until 1 finishes, and both don't run asynchronously
    const result2 = await myPromiseFactory2(); // added await to this as well, to make the code completely synchronous
    console.log(result1);
    console.log(result2);
    console.log("End");
}

asyncFunc();