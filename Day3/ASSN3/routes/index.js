const express = require("express");
const router = express.Router();
const controllerGames = require("../controllers/games.controllers.js");

router.route("/games")
    .get(controllerGames.gamesGetList);

router.route("/games")
    .get(controllerGames.gamesGetThree);
  
module.exports = router;
