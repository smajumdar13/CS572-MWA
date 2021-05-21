const mongoose = require("mongoose");
const Game = mongoose.model("Game");
require("./publishers.controller");

module.exports.gamesGetAll = function (req, res) {
  console.log("Get the Games");
  console.log(req.query);

  let offset = 0;
  let count = 5;
  const maxCount = 10;

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset);
  }
  if (req.query && req.query.count) {
    count = parseInt(req.query.count);
  }

  // type check of the input
  if (isNaN(offset) || isNaN(count)) {
    // const defaultCount = 5;
    // const defaultOffset = 0;
    // res.status(400).send("Invalid input");
    res
      .status(400)
      .json({ message: "QueryString Offset and Count must be a number" });
  }
  // count check
  if (count > maxCount) {
    res
      .status(400)
      .json({ message: "QueryString Count must not exceed " + maxCount });
  } else {
    Game.find()
      .skip(offset)
      .limit(count)
      .exec(function (err, games) {
        // error check
        if (err) {
          console.log("Error ", err);
          res.status(500).json(err);
        } else {
          console.log("Found games", games);
          res.status(200).json(games);
        }
      });
  }
};

module.exports.gamesGetOne = function (req, res) {
  // type check
  const gameId = req.params.gameId;
  Game.findById(gameId).exec(function (err, game) {
    // first hardening
    const response = {
      status: 200,
      message: game,
    };
    if (err) {
      console.log("Error finding game: " + gameId);
      res;
      // .status(500)
      // // .json(err);
      // .json({ message: "Game not found" });
      response.status = 500;
      response.message = err;
    } else if (!game) {
      // res.status(404).json({ message: "Game ID not found" });
      response.status = 404;
      response.message = "Game ID not found"; //err
    }
    // else {
    //   console.log("GET game  with gameid", gameId);
    //   // res.status(200).json(game);
    // }
    res.status(response.status).json(response.message);
  });
};

module.exports.gamesAddOne = function (req, res) {
  console.log("POST new game");
  const response = {
    status: 201,
    message: "",
  };
  if (req.body && req.body.title && req.body.price && req.body.rate) {
    console.log(req.body);

    const newGame = {};
    newGame.title = req.body.title;
    newGame.price = parseFloat(req.body.price);
    newGame.rate = parseFloat(req.body.rate);
    newGame.publisher = "";

    Game.create(newGame, function (err, game) {
      console.log("The callback game is", game);
      if (err) {
        response.status = 500;
        response.message = err;
      } else {
        response.message = game;
      }
      res.status(response.status).json(response.game);
    });
  } else {
    console.log("Data missing from POST body");
    response.status = 400;
    response.message = { error: "Request data missing from POST body" };
    res.status(response.status).json(response.game);
  }
  res.status(response.status).json(response.game);
};
