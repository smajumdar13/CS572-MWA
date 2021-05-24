const express = require("express");
const router = express.Router();
const controllerManga = require("../controllers/manga.controller");
const controllerPublication = require("../controllers/publication.controller");
const controllerRelease = require("../controllers/releases.controller");
const controllerArtist = require("../controllers/artists.controller");

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
  .route("/manga/:mangaId/publication")
  .get(controllerPublication.publicationGet)
  .post(controllerPublication.publicationAdd)
  .put(controllerPublication.publicationFullUpdate)
  .patch(controllerPublication.publicationPartialUpdate)
  .delete(controllerPublication.publicationDelete);

router
  .route("/manga/:mangaId/releases")
  .get(controllerRelease.releasesGetAll)
  .post(controllerRelease.releaseAddOne);

router
  .route("/manga/:mangaId/releases/:releaseId")
  .get(controllerRelease.releaseGetOne)
  .put(controllerRelease.releaseFullUpdateOne)
  .patch(controllerRelease.releasePartialUpdateOne)
  .delete(controllerRelease.releaseDeleteOne);

  router
  .route("/manga/:mangaId/artists")
  .get(controllerArtist.artistsGetAll)
  .post(controllerArtist.artistAddOne);

router
  .route("/manga/:mangaId/artists/:artistId")
  .get(controllerArtist.artistGetOne)
  .put(controllerArtist.artistFullUpdateOne)
  .patch(controllerArtist.artistPartialUpdateOne)
  .delete(controllerArtist.artistDeleteOne);

  module.exports = router;
