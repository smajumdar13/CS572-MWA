const express = require("express");
const router = express.Router();
const controllerGames = require("../controllers/games.controller");

router
  .route("/games")
  .get(controllerGames.gamesGetAll)
  .post(controllerGames.gamesAddOne);

// router.route("/json").get(function(req,res){
//     console.log("Get JSON request recieved");
//     res.status(200).json({"jsonDataGet":true});
// }).post(function(req,res){
//     console.log("POST JSON request recieved");
//     res.status(200).json({"jsonDataPost":true});
// });

router.route("/games/:gameId").get(controllerGames.gamesGetOne);

module.exports = router;
