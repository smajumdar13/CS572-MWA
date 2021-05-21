const mongoose = require("mongoose");
const Game = mongoose.model("Game");

module.exports.publishersGetAll = function (req, res) {
  console.log("Get all publishers for a game");
  const gameId = req.params.gameId;
  Game.findById(gameId)
    .select("publisher")
    .exec(function (err, game) {
      console.log("GET publishers for game with gameid ", gameId);
      res.status(200).json(game.publisher);
    });
};

// module.exports.publishersGetOne = function (req, res) {
//   console.log("Get one publisher for a game");
//   const gameId = req.params.gameId;
//   Game.findById(gameId).exec(function (err, game) {
//     const publisherId = game.publisher.id(publisherId);
//     console.log("GET game  with gameid", gameId);
//     res.status(200).json(game);
//   });
// };
