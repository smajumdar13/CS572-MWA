require("./instantHello");
const talk = require("./talk");

const question = require("./talk/question");

const answer = question.ask("What is the meaning of life?");
console.log(answer);

talk.greeting("sam");
talk.intro();
