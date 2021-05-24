const mongoose = require("mongoose");
const Manga = mongoose.model("Manga");

module.exports.releasesGetAll = function (req, res) {
  console.log("Get releases for a manga controller");
  const mangaId = req.params.mangaId;
  Manga.findById(mangaId)
    .select("releases")
    .exec(function (err, manga) {
      console.log("GET releases for manga with mangaId ", mangaId);
      res.status(200).json(manga.releases);
    });
};

module.exports.releaseGetOne = function (req, res) {
  console.log("Get one release for a manga");
  const mangaId = req.params.mangaId;
  const releaseId = req.params.releaseId;
  Manga.findById(mangaId).exec(function (err, manga) {
    const releases = manga.releases.id(releaseId);
    console.log(
      "GET releases with " + releaseId + " for manga with mangaId" + mangaId
    );
    res.status(200).json(releases);
  });
};

module.exports.releaseAddOne = function (req, res) {
  const mangaId = req.params.mangaId;
  // const releaseId = req.params.releaseId;
  
  Manga.findById(mangaId, function (err, manga) {
    manga.releases = manga.releases || [];
    if (!err) {
      if (!manga) {
        res.sendStatus(404).send("Manga was not found").end();
      } else {
        manga.releases.push(req.body);
        manga.markModified("releases");
        manga.save(function (saveerr, saveManga) {
          if (!saveerr) {
            res.status(200).send(saveManga);
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

module.exports.releaseFullUpdateOne = function (req, res) {
  const mangaId = req.params.mangaId;
  const releaseId = req.params.releaseId;
  Manga.findById(mangaId, function (err, manga) {
    const releaseUpdate = manga.releases.id(releaseId);
    if (!err) {
      if (!manga) {
        res.status(404).send("Manga was not found");
      } else {
        releaseUpdate.type = req.body.type;
        releaseUpdate.price = parseFloat(req.body.price);
        manga.save(function (saveerr, saveManga) {
          if (!saveerr) {
            res.status(200).send(saveManga);
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

module.exports.releasePartialUpdateOne = function (req, res) {
  const releaseId = req.params.releaseId;
  const mangaId = req.params.mangaId;

  Manga.findById(mangaId, function (err, manga) {
    const releaseUpdate = manga.releases.id(releaseId);
    if (!err) {
      if (!manga) {
        res.status(404).send("Manga was not found");
      } else {
        if (req.body.type) {
          releaseUpdate.type = req.body.type;
        }
        if (req.body.price) {
          releaseUpdate.price = req.body.price;
        }
        manga.save(function (saveErr, saveManga) {
          if (!saveErr) {
            res.status(200).send(saveManga.releases.id(releaseId));
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

module.exports.releaseDeleteOne = function (req, res) {
  const releaseId = req.params.releaseId;
  const mangaId = req.params.mangaId;

  Manga.findById(mangaId, function (err, manga) {
    if (!err) {
      if (!manga) {
        res.status(404).send("Manga was not found");
      } else {
        manga.release.id(releaseId).delete(function (removeerr, removeManga) {
          if (removeerr) {
            res.status(400).send(removeerr.message);
          }
        });
        // manga.markModified("releases");
        manga.save(function (saveerr, saveManga) {
          if (!saveerr) {
            res.status(200).send({ message: "Successfully deleted" });
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
