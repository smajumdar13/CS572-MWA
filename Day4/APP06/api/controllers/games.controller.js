const mongoose = require("mongoose");
const Game = mongoose.model("Game");
require("./publishers.controller");

// const runGeoQuery = function (req, res) {
//   const lat = parseFloat(req.query.lat);
//   const lng = parseFloat(req.query.lng);

//   console.log("Geo Searching");

//   const query = {
//     "publishers.location": {
//       $near: {
//         $geometry: {
//           type: "Point",
//           coordinates: [lng, lat],
//         },
//         $maxDistance: 1000,
//         $minDistance: 0,
//       },
//     },
//   };
// };
// Game.find(query).exec(function (err, games) {
//   if (err) {
//     console.log("Error ", err);
//   }
//   console.log("Found games");
//   res.status(200).json(games);
// });

module.exports.gamesGetAll = function (req, res) {
  console.log("Get the Games");
  console.log(req.query);

  if (req.query && req.query.lat && req.query.lng) {
    runGeoQuery();
    return;
  }
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
