const mongoose = require("mongoose");
const Manga = mongoose.model("Manga");

module.exports.artistsGetAll = function (req, res) {
  console.log("Get artists for a manga controller");
  const mangaId = req.params.mangaId;
  Manga.findById(mangaId)
    .select("artists")
    .exec(function (err, manga) {
      console.log("GET artists for manga with mangaId ", mangaId);
      res.status(200).json(manga.artists);
    });
};

module.exports.artistGetOne = function (req, res) {
  console.log("Get one artist for a manga");
  const mangaId = req.params.mangaId;
  const artistId = req.params.artistId;
  Manga.findById(mangaId).exec(function (err, manga) {
    const artists = manga.artists.id(artistId);
    console.log(
      "GET artist with " + artistId + " for manga with mangaId" + mangaId
    );
    res.status(200).json(artists);
  });
};

module.exports.artistAddOne = function (req, res) {
  const mangaId = req.params.mangaId;
  // const artistId = req.params.artistId;
  
  Manga.findById(mangaId, function (err, manga) {
    manga.artists = manga.artists || [];
    if (!err) {
      if (!manga) {
        res.sendStatus(404).send("Manga was not found").end();
      } else {
        manga.artists.push(req.body);
        // manga.markModified("artists");
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

module.exports.artistFullUpdateOne = function (req, res) {
  const mangaId = req.params.mangaId;
  const artistId = req.params.artistId;
  Manga.findById(mangaId, function (err, manga) {
    const artistUpdate = manga.artists.id(artistId);
    if (!err) {
      if (!manga) {
        res.status(404).send("Manga was not found");
      } else {
        artistUpdate.name = req.body.name;
        artistUpdate.rating = parseInt(req.body.rating);
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

module.exports.artistPartialUpdateOne = function (req, res) {
  const artistId = req.params.artistId;
  const mangaId = req.params.mangaId;

  Manga.findById(mangaId, function (err, manga) {
    const artistUpdate = manga.artists.id(artistId);
    if (!err) {
      if (!manga) {
        res.status(404).send("Manga was not found");
      } else {
        if (req.body.name) {
          artistUpdate.name = req.body.name;
        }
        if (req.body.rating) {
          artistUpdate.rating = req.body.rating;
        }
        manga.save(function (saveErr, saveManga) {
          if (!saveErr) {
            res.status(200).send(saveManga.artists.id(artistId));
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

module.exports.artistDeleteOne = function (req, res) {
  const artistId = req.params.artistId;
  // const mangaId = req.params.mangaId;

  Manga.findById(mangaId, function (err, manga) {
    if (!err) {
      if (!manga) {
        res.status(404).send("Manga was not found");
      } else {
        manga.artist.id(req.body._id).remove(function (removeerr, removeManga) {
          if (removeerr) {
            res.status(400).send(removeerr.message);
          }
        });
        // manga.markModified("artists");
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
