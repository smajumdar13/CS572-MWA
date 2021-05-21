const express = require("express");
const router = express.Router();
const controllerGames = require("../controllers/games.controller");
const controllerPublishers = require("../controllers/publishers.controller");

router.route("/games").get(controllerGames.gamesGetAll).post(controllerGames.gamesAddOne)
;

router.route("/games/:gameId").get(controllerGames.gamesGetOne).put(controllergames.gamesFullUpdateOne)
.patch(controllerGames.gamesPartialUpdateOne);

router.route("/games/:gameId/publishers")
    .get(controllerPublishers.publishersGetAll)
    .post(controllerPublishers.publisherAddOne);
router
  .route("/games/:gameId/publishers/:publisherId")
  .get(controllerPublishers.publisherGetOne);

module.exports = router;
