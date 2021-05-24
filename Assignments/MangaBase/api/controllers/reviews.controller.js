const mongoose = require("mongoose");
const Manga = mongoose.model("Manga");

module.exports.reviewsGetAll = function (req, res) {
  console.log("Get reviews for a manga controller");
  const mangaId = req.params.mangaId;
  Manga.findById(mangaId)
    .select("reviews")
    .exec(function (err, manga) {
      console.log("GET reviews for manga with mangaId ", mangaId);
      res.status(200).json(manga.reviews);
    });
};

module.exports.reviewGetOne = function (req, res) {
  console.log("Get one review for a manga");
  const mangaId = req.params.mangaId;
  const reviewId = req.params.reviewId;
  Manga.findById(mangaId).exec(function (err, manga) {
    const reviewOne = manga.reviews.id(reviewId);
    console.log(
      "GET review with " + reviewId + " for manga with mangaId" + mangaId
    );
    res.status(200).json(reviewOne);
  });
};

module.exports.reviewAddOne = function (req, res) {
  const mangaId = req.params.mangaId;
  // const reviewId = req.params.reviewId;

  Manga.findById(mangaId, function (err, manga) {
    manga.reviews = manga.reviews || [];
    if (!err) {
      if (!manga) {
        res.sendStatus(404).send("Manga was not found").end();
      } else {
        manga.reviews.push(req.body);
        // manga.markModified("reviews");
        manga.save(function (saveerr, saveManga) {
          if (!saveerr) {
            res.status(200).send("Review added successfully"); // send(saveManga.reviews);
          } else {
            res.status(400).send(saveerr.message);
          }
        });
      }
    } else {
      res.status(400).send(err.message);
    }
  });
};

module.exports.reviewFullUpdateOne = function (req, res) {
  const mangaId = req.params.mangaId;
  const reviewId = req.params.reviewId;
  Manga.findById(mangaId, function (err, manga) {
    const reviewUpdate = manga.reviews.id(reviewId);
    if (!err) {
      if (!manga) {
        res.status(404).send("Manga was not found");
      } else {
        reviewUpdate.name = req.body.name;
        reviewUpdate.review = req.body.review;
        reviewUpdate.date = req.body.date;
        manga.save(function (saveerr, saveManga) {
          if (!saveerr) {
            res.status(200).send("Review updated successfully: " + saveManga.reviews.id(reviewId));
          } else {
            res.status(400).send(saveerr.message);
          }
        });
      }
    } else {
      res.status(400).send(err.message);
    }
  });
};

module.exports.reviewPartialUpdateOne = function (req, res) {
  const reviewId = req.params.reviewId;
  const mangaId = req.params.mangaId;

  Manga.findById(mangaId, function (err, manga) {
    const reviewUpdate = manga.reviews.id(reviewId);
    if (!err) {
      if (!manga) {
        res.status(404).send("Manga was not found");
      } else {
        if (req.body.name) {
          reviewUpdate.name = req.body.name;
        }
        if (req.body.review) {
          reviewUpdate.review = req.body.review;
        }
        if (req.body.date) {
          reviewUpdate.date = req.body.date;
        }
        manga.save(function (saveErr, saveManga) {
          if (!saveErr) {
            res.status(200).send("Review updated successfully: " + saveManga.reviews.id(reviewId));
          } else {
            res.status(400).send(saveErr.message);
          }
        });
      }
    } else {
      res.status(400).send(err.message);
    }
  });
};

module.exports.reviewDeleteOne = function (req, res) {
  const reviewId = req.params.reviewId;
  const mangaId = req.params.mangaId;

  Manga.findOneAndUpdate(
    { _id: mangaId },
    { $pull: { reviews: { _id: reviewId } } },
    { new: true },
    function (err) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({"message": "Review deleted successfully"});
      }
    }
  );
};
