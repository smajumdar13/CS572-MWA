require("./addresses.controller");
const mongoose = require("mongoose");
const Student = mongoose.model("Student");

module.exports.studentsGetAll = function (req, res) {
  console.log("Get the Students list");
  console.log(req.query);
  var offset = 0;
  var count = 4;

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset);
  }
  if (req.query && req.query.count) {
    count = parseInt(req.query.count);
  }

  Student.find()
    .skip(offset)
    .limit(count)
    .exec(function (err, students) {
      console.log("Found students", students);
      res.status(200).json(students);
    });
};

module.exports.studentGetOne = function (req, res) {
  const studentId = req.params.studentId;
  Student.findById(studentId).exec(function (err, student) {
    console.log("GET student with studentId", studentId);
    res.status(200).json(student);
  });
};

// module.exports.gamesAddOne = function (req, res) {
//   console.log("POST new game");
//   const db = dbconnection.get();
//   const collection = db.collection("games");
//   if (req.body && req.body.title && req.body.price && req.body.rate) {
//     console.log(req.body);
//     var newGame = {};
//     newGame.price = parseFloat(req.body.price);
//     newGame.title = req.body.title;
//     newGame.rate = parseInt(req.body.rate);
//     collection.insertOne(newGame, function (err, response) {
//       console.log(response);
//       res.status(201).json(response.ops);
//     });
//   } else {
//     console.log("data missing from body");
//     res.status(400).json({ err: "Request data missing from post body" });
//   }
// };
