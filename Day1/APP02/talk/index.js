const filename = "index.js";

const intro = function () {
  console.log("I'm a node file called " + filename);
};

const hello = function (name) {
  console.log("Hello " + name);
};

module.exports = {
  greeting: hello,
  intro: intro,
};
