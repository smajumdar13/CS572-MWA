const express = require("express");
const router = express.Router();
// const {Router} = require("express");
const controllerGames = require("../controllers/games.controllers.js");

router.route("/games/:gameId").get(controllerGames.gamesGetOne);
  
module.exports = router;
