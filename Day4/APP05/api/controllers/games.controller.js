const mongoose = require("mongoose");
const Game = mongoose.model("Game");
require("./publishers.controller");

module.exports.gamesGetAll = function (req, res) {
  console.log("Get the Games");
  console.log(req.query);
  var offset = 0;
  var count = 10;

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset);
  }
  if (req.query && req.query.count) {
    count = parseInt(req.query.count);
  }

  Game.find()
    .skip(offset)
    .limit(count)
    .exec(function (err, games) {
      console.log("Found games", games);
      res.status(200).json(games);
    });
};

module.exports.gamesGetOne = function (req, res) {
  const gameId = req.params.gameId;
  Game.findById(gameId).exec(function (err, game) {
    console.log("GET game  with gameid", gameId);
    res.status(200).json(game);
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
