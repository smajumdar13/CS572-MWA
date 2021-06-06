const mongoose = require("mongoose");
const Manga = mongoose.model("Manga");

module.exports.mangaGetAll = function (req, res) {
  console.log("Get all Manga");
  console.log(req.query);
  Manga.find().exec(function (err, manga) {
    if (err) {
      console.log("Error: ", err);
      res.status(500).json(err);
    } else {
      console.log("Found manga", manga);
      res.status(200).json(manga);
    }
  });
};

module.exports.mangaGetOne = function (req, res) {
  const mangaId = req.params.mangaId;
  Manga.findById(mangaId).exec(function (err, manga) {
    const response = {
      status: 200,
      message: manga,
    };
    if (err) {
      console.log("Error finding manga: " + mangaId);
      response.status = 500;
      response.message = err;
    } else if (!manga) {
      response.status = 404;
      response.message = "Manga ID not found";
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.mangaAddOne = function (req, res) {
  console.log("Add new manga");
  if (req.body && req.body.title && req.body.rating && req.body.artist
    && req.body.genre && req.body.publisher && req.body.imprint && req.body.magazine
    && req.body.demographic && req.body.releasedYear && req.body.completed
    && req.body.tvSeries) {
    console.log(req.body);

    const newManga = {};
    newManga.title = req.body.title;
    newManga.rating = parseInt(req.body.rating);
    newManga.artist = req.body.artist;
    newManga.genre = req.body.genre;
    newManga.publisher = req.body.publisher;
    newManga.imprint = req.body.imprint;
    newManga.magazine = req.body.magazine;
    newManga.demographic = req.body.demographic;
    newManga.releasedYear = parseInt(req.body.releasedYear);
    newManga.completed = req.body.completed;
    newManga.tvSeries = req.body.tvSeries;
    Manga.create(newManga, function (err, manga) {
      if (err) {
        res.status(400).send(err.message);
      } else {
        res.status(200).send(manga);
      }
    });
  }
};

module.exports.mangaFullUpdateOne = function (req, res) {
  const mangaId = req.params.mangaId;
  Manga.findById(mangaId).exec(function (err, manga) {
    const response = {
      status: 204,
      message: manga,
    };
    if (err) {
      console.log("Error finding manga: " + mangaId);
      response.status = 500;
      response.message = err;
    } else if (!manga) {
      response.status = 404;
      response.message = { message: "Manga ID not found" };
    }
    if (response.status !== 204) {
      res.status(response.status).json(response.message);
    } else {
      manga.title = req.body.title;
      manga.rating = parseInt(req.body.rating);
      manga.artist = req.body.artist;
      manga.genre = req.body.genre;
      manga.publisher = req.body.publisher;
      manga.imprint = req.body.imprint;
      manga.magazine = req.body.magazine;
      manga.demographic = req.body.demographic;
      manga.releasedYear = parseInt(req.body.releasedYear);
      manga.completed = req.body.completed;
      manga.tvSeries = req.body.tvSeries;
      manga.save(function (err, updatedManga) {
        if (err) {
          response.status = 500;
          response.message = err;
        } else {
          response.status = 204;
          response.message = { message: "updatedManga" };
        }
        res.status(response.status).json(response.message);
      });
    }
  });
};

module.exports.mangaPartialUpdateOne = function (req, res) {
  const mangaId = req.params.mangaId;
  Manga.findById(mangaId).exec(function (err, manga) {
    // first hardening
    const response = {
      status: 204,
      message: manga,
    };
    if (err) {
      console.log("Error finding manga: " + mangaId);
      response.status = 500;
      response.message = err;
    } else if (!manga) {
      response.status = 404;
      response.message = { message: "Manga ID not found" };
    }
    if (response.status !== 204) {
      res.status(response.status).json(response.message);
    } else {
      if (req.body.title) {
        manga.title = req.body.title;
      }
      if (req.body.rating) {
        manga.rating = req.body.rating;
      }
      if (req.body.artist) {
        manga.artist = req.body.artist;
      }
      if (req.body.genre) {
        manga.genre = req.body.genre;
      }
      if (req.body.publisher) {
        manga.publisher = req.body.publisher;
      }
      if (req.body.imprint) {
        manga.imprint = req.body.imprint;
      }
      if (req.body.magazine) {
        manga.magazine = req.body.magazine;
      }
      if (req.body.demographic) {
        manga.demographic = req.body.demographic;
      }
      if (req.body.releasedYear) {
        manga.releasedYear = parseInt(req.body.releasedYear);
      }
      if (req.body.completed) {
        manga.completed = req.body.completed;
      }
      if (req.body.tvSeries) {
        manga.tvSeries = req.body.tvSeries;
      }
      manga.save(function (err, updatedManga) {
        if (err) {
          response.status = 500;
          response.message = err;
        } else {
          response.status = 204;
          response.message = updatedManga;
        }
        res.status(response.status).json(response.message);
      });
    }
  });
};

module.exports.mangaDeleteOne = function (req, res) {
  console.log("Delete a manga controller reached.");
  const mangaId = req.params.mangaId;
  Manga.findByIdAndDelete(mangaId).exec(function (err, deletedManga) {
    const response = {
      status: 204,
      message: "Successfully deleted",
    };
    if (err) {
      console.log("Error finding manga: " + mangaId);
      response.status = 500;
      response.message = err;
    } else if (!deletedManga) {
      response.status = 404;
      response.message = { message: "Manga not found" };
    }
    res.status(response.status).json(response.message);
  });
};
