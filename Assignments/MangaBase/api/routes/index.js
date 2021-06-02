const express = require("express");
const router = express.Router();
const controllerManga = require("../controllers/manga.controller");
const controllerReview = require("../controllers/reviews.controller");

router
  .route("/manga")
  .get(controllerManga.mangaGetAll)
  .post(controllerManga.mangaAddOne);

router
  .route("/manga/:mangaId")
  .get(controllerManga.mangaGetOne)
  .put(controllerManga.mangaFullUpdateOne)
  .patch(controllerManga.mangaPartialUpdateOne)
  .delete(controllerManga.mangaDeleteOne);

router
  .route("/manga/:mangaId/reviews")
  .get(controllerReview.reviewsGetAll)
  .post(controllerReview.reviewAddOne);

router
  .route("/manga/:mangaId/reviews/:reviewId")
  .get(controllerReview.reviewGetOne)
  .put(controllerReview.reviewFullUpdateOne)
  .patch(controllerReview.reviewPartialUpdateOne)
  .delete(controllerReview.reviewDeleteOne);

module.exports = router;
