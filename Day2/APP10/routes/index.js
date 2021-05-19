const express = require("express");
const router = express.Router();
const controllerGames = require("../controllers/games.controllers.js");

router.route("/games/new").post(controllerGames.gamesAddOne);
  
module.exports = router;
