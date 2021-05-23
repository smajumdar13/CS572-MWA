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

module.exports.publisherGetOne = function (req, res) {
  console.log("Get one publisher for a game");
  const gameId = req.params.gameId;
  const publisherId = req.params.publisherId;
  Game.findById(gameId).exec(function (err, game) {
    const publisher = game.publisher.id(publisherId);
    console.log(
      "GET publisher " + publisherId + " for game  with gameId" + gameId
    );
    res.status(200).json(publisher);
  });
};

// const _addPublisher = function (req, res, game, response) {
//   // error checking
//   console.log("Add publisher");
//   console.log("req body", req.body);
//   console.log("game ", game);

//   // game.publisher = {};
//   game.publisher.name = req.body.name;
//   // game.publisher.location.type = "Point";
//   game.publisher.location.coordinates = [
//     parseFloat(req.body.lng),
//     parseFloat(req.body.lat),
//   ];
//   game.save(function (err, updatedGame) {
//     if (err) {
//       console.log("error", err);
//       response.status = 500;
//       response.message = err;
//     } else {
//       response.message = updatedGame;
//     }
//     res.status(response.status).json(response.message);
//   });
// };

// module.exports.publisherAddOne = function (req, res) {
//   console.log("Add one publisher to the game");
//   const gameId = req.params.gameId;
//   Game.findById(gameId).exec(function (err, game) {
//     const response = {
//       status: 201,
//       message: game,
//     };
//     if (err) {
//       response.status = 500;
//       response.message = err;
//     } else if (!game) {
//       console.log("Game is not in the database");
//       response.status = 404;
//       response.message = { message: "Game Id " + gameId + " not found." };
//     }

//     if (game) {
//       _addPublisher(req, res, game);
//     } else {
//       res.status(response.status).json(response.message);
//     }
//     // const publisher = game.publisher.id(publisherId);
//     // console.log(
//     //   "GET publisher " + publisherId + " for game  with gameId" + gameId
//     //   );
//     // }
//     res.status(response.status).json(response.message);
//   });
// };
