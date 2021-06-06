const express = require("express");
const router = express.Router();
const controllerManga = require("../controllers/manga.controller");
const controllerReviews = require("../controllers/reviews.controller");
const controllerUsers = require("../controllers/users.controller");

router.route("/users")
    .post(controllerUsers.usersRegister);

router.route("/auth")
    .post(controllerUsers.usersAuthenticate);

router.route("/manga")
    .get(controllerManga.mangaGetAll)
    .post(controllerUsers.authenticate, controllerManga.mangaAddOne);

router.route("/manga/:mangaId")
    .get(controllerManga.mangaGetOne)
    .put(controllerUsers.authenticate, controllerManga.mangaFullUpdateOne)
    .patch(controllerUsers.authenticate, controllerManga.mangaPartialUpdateOne)
    .delete(controllerUsers.authenticate, controllerManga.mangaDeleteOne);

router.route("/manga/:mangaId/reviews")
    .get(controllerReviews.reviewsGetAll)
    .post(controllerUsers.authenticate, controllerReviews.reviewsAddOne);

router.route("/manga/:mangaId/reviews/:reviewId")
    .get(controllerReviews.reviewsGetOne);

module.exports = router;