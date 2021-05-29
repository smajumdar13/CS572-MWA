const mongoose = require("mongoose");
const Game = mongoose.model("Game");

// module.exports.gamesGetAll = function (req, res) {
//   console.log("Get the Games");
//   console.log(req.query);

//   let offset = 0;
//   let count = 10;
//   const maxCount = 20;

//   if (req.query && req.query.offset) {
//     offset = parseInt(req.query.offset);
//   }
//   if (req.query && req.query.count) {
//     count = parseInt(req.query.count);
//   }

//   if (isNaN(offset) || isNaN(count)) {
//     res
//       .status(400)
//       .json({ message: "QueryString Offset and Count must be a number" });
//     return;
//   }
//   if (count > maxCount) {
//     res
//       .status(400)
//       .json({ message: "QueryString Count must not exceed " + maxCount });
//   } else {
//     Game.find()
//       .skip(offset)
//       .limit(count)
//       .exec(function (err, games) {
//         if (err) {
//           console.log("Error: ", err);
//           res.status(500).json(err);
//         } else {
//           console.log("Found games", games.length);
//           res.status(200).json(games);
//         }
//       });
//   }
// };

module.exports.gamesGetAll = function (req, res) {
  console.log("Get the Games");
  console.log(req.query);

  Game.find().exec(function (err, games) {
    if (err) {
      console.log("Error: ", err);
      res.status(500).json(err);
    } else {
      console.log("Found games", games.length);
      res.status(200).json(games);
    }
  });
};

module.exports.gamesGetOne = function (req, res) {
  const gameId = req.params.gameId;
  Game.findById(gameId).exec(function (err, game) {
    const response = {
      status: 200,
      message: game,
    };
    if (err) {
      console.log("Error finding game: " + gameId);
      response.status = 500;
      response.message = err;
    } else if (!game) {
      response.status = 404;
      response.message = "Game ID not found";
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.gamesAddOne = function (req, res) {
  console.log("Add new game");
  const response = {
    status: 201,
    message: "",
  };
  if (req.body && req.body.title && req.body.price && req.body.rate) {
    console.log(req.body);

    const newGame = {};
    newGame.title = req.body.title;
    newGame.price = parseFloat(req.body.price);
    newGame.year = parseInt(req.body.year);
    newGame.rate = parseInt(req.body.rate);
    newGame.minPlayers = parseInt(req.body.minPlayers);
    newGame.maxPlayers = parseInt(req.body.maxPlayers);
    newGame.minAge = parseInt(req.body.minAge);
    newGame.designer = req.body.designer;

    Game.create(newGame, function (err, game) {
      if (err) {
        response.status = 500;
        response.message = err;
      } else {
        console.log("Game added successfully", game);
        response.status = 201;
        response.message = game;
      }
    });
  } else {
    console.log("Data missing from POST body");
    response.status = 400;
    response.message = { message: "Request data missing from POST body" };
    res.status(response.status).json(response.message);
  }
};

module.exports.gamesFullUpdateOne = function (req, res) {
  // type check
  const gameId = req.params.gameId;
  Game.findById(gameId).exec(function (err, game) {
    const response = {
      status: 204,
      message: game,
    };
    if (err) {
      console.log("Error finding game: " + gameId);
      response.status = 500;
      response.message = err;
    } else if (!game) {
      response.status = 404;
      response.message = { message: "Game ID not found" };
    }
    if (response.status !== 204) {
      res.status(response.status).json(response.message);
    } else {
      game.price = parseFloat(req.body.price);
      game.minPlayers = parseInt(req.body.minPlayers);
      game.maxPlayers = parseInt(req.body.maxPlayers);
      game.minAge = parseInt(req.body.minAge);
      game.save(function (err, updatedGame) {
        if (err) {
          response.status = 500;
          response.message = err;
        } else {
          response.status = 204;
          response.message = { message: updatedGame };
        }
        res.status(response.status).json(response.message);
      });
    }
  });
};

module.exports.gamesPartialUpdateOne = function (req, res) {
  const gameId = req.params.gameId;
  Game.findById(gameId).exec(function (err, game) {
    // first hardening
    const response = {
      status: 204,
      message: game,
    };
    if (err) {
      console.log("Error finding game: " + gameId);
      response.status = 500;
      response.message = err;
    } else if (!game) {
      response.status = 404;
      response.message = { message: "Game ID not found" };
    }
    if (response.status !== 204) {
      res.status(response.status).json(response.message);
    } else {
      if (req.body.price) {
        game.price = req.body.price;
      }
      if (req.body.minPlayers) {
        game.minPlayers = req.body.minPlayers;
      }
      if (req.body.maxPlayers) {
        game.maxPlayers = req.body.maxPlayers;
      }
      if (req.body.minAge) {
        game.minAge = req.body.minAge;
      }
      game.save(function (err, updatedGame) {
        if (err) {
          response.status = 500;
          response.message = err;
        } else {
          response.status = 204;
          response.message = updatedGame;
        }
        res.status(response.status).json(response.message);
      });
    }
  });
};

module.exports.gamesDeleteOne = function (req, res) {
  console.log("Delete a game controller reached.");
  const gameId = req.params.gameId;
  Game.findByIdAndDelete(gameId).exec(function (err, deletedGame) {
    const response = {
      status: 204,
      message: deletedGame,
    };
    if (err) {
      console.log("Error finding game: " + gameId);
      response.status = 500;
      response.message = err;
    } else if (!deletedGame) {
      response.status = 404;
      response.message = { message: "Game not found" };
    }
    res.status(response.status).json(response.message);
  });
};
