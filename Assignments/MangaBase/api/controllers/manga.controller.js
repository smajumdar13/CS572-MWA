const mongoose = require("mongoose");
const Manga = mongoose.model("Manga");

// module.exports.mangaGetAll = function (req, res) {
//   console.log("Get all Manga");
//   console.log(req.query);
//   // return "done";
//   let offset = 0;
//   let count = 5;
//   const maxCount = 10;

//   if (req.query && req.query.offset) {
//     offset = parseInt(req.query.offset);
//   }
//   if (req.query && req.query.count) {
//     count = parseInt(req.query.count);
//   }

//   if (isNaN(offset) || isNaN(count)) {
//     res
//       .status(400)
//       .json({ message: "QueryString Offset and Count must be a number" });
//     return;
//   }
//   if (count > maxCount) {
//     res
//       .status(400)
//       .json({ message: "QueryString Count must not exceed " + maxCount });
//   } else {
//     Manga.find()
//       .skip(offset)
//       .limit(count)
//       .exec(function (err, manga) {
//         if (err) {
//           console.log("Error: ", err);
//           res.status(500).json(err);
//         } else {
//           console.log("Found manga", manga);
//           res.status(200).json(manga);
//         }
//       });
//   }
// };

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

// module.exports.mangaAddOne = function (req, res) {
//   console.log("Add new manga");
//   const response = {
//     status: 201,
//     message: "",
//   };
//   if (req.body && req.body.title && req.body.rating && req.body.totalChapters) {
//     console.log(req.body);

//     const newManga = {};
//     newManga.title = req.body.title;
//     newManga.rating = parseInt(req.body.rating);
//     newManga.totalChapters = parseInt(req.body.totalChapters);

//     Manga.create(newManga, function (err, manga) {
//       if (err) {
//         response.status = 500;
//         response.message = err;
//       } else {
//         console.log("Manga added successfully", manga);
//         response.status = 201;
//         response.message = manga;
//       }
//     });
//   } else {
//     console.log("Data missing from POST body");
//     response.status = 400;
//     response.message = { message: "Request data missing from POST body" };
//     res.status(response.status).json(response.message);
//   }
// };

module.exports.mangaAddOne = function (req, res) {
  console.log("Add new manga");
  if (req.body && req.body.title && req.body.rating && req.body.totalChapters) {
    console.log(req.body);

    const newManga = {};
    newManga.title = req.body.title;
    newManga.rating = parseInt(req.body.rating);
    newManga.totalChapters = parseInt(req.body.totalChapters);
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
      manga.totalChapters = parseInt(req.body.totalChapters);
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
      if (req.body.releasedYear) {
        manga.releasedYear = req.body.releasedYear;
      }
      if (req.body.completedYear) {
        manga.completedYear = req.body.completedYear;
      }
      if (req.body.rating) {
        manga.rating = req.body.rating;
      }
      if (req.body.totalChapters) {
        manga.totalChapters = req.body.totalChapters;
      }
      if (req.body.minAge) {
        manga.minAge = req.body.minAge;
      }
      manga.save(function (err, updatedManga) {
        if (err) {
          response.status = 500;
          response.message = err;
        } else {
          response.status = 204;
          response.message = updatedGame;
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
      message: "Successfully deleted"
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
