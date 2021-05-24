const mongoose = require("mongoose");
const Manga = mongoose.model("Manga");

module.exports.publicationGet = function (req, res) {
  console.log("Get publication for a manga");
  const mangaId = req.params.mangaId;
  Manga.findById(mangaId)
    .select("publication")
    .exec(function (err, manga) {
      console.log("GET publication for manga with mangaId ", mangaId);
      res.status(200).json(manga.publication);
    });
};

const _addPublication = function (req, res, manga) {
  console.log(req.body);
  manga.publication = {};
  manga.publication.name = req.body.name;
  manga.publication.address = req.body.address;
  manga.save(function (err, updatedManga) {
    const response = {
      status: 200,
      message: "",
    };
    if (err) {
      console.log("error", err);
      response.status = 500;
      response.message = err;
    } else {
      response.status = 201;
      response.message = updatedManga;
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.publicationAdd = function (req, res) {
  console.log("Add publication to the manga");
  const mangaId = req.params.mangaId;
  Manga.findById(mangaId)
    .select("publication")
    .exec(function (err, manga) {
      const response = {
        status: 201,
        message: manga,
      };
      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!manga) {
        console.log("Manga is not in the database");
        response.status = 404;
        response.message = { message: "Manga Id " + mangaId + " not found." };
      } else if (manga) {
        _addPublication(req, res, manga);
      } else {
        res.status(response.status).json(response.message);
      }
    });
};

const _updatePublication = function (req, res, manga) {
  manga.publication.name = req.body.name;
  manga.publication.address = req.body.address;
  manga.save(function (err, updatedManga) {
    const response = {
      status: 204,
      message: "Success",
    };
    if (err) {
      console.log("error", err);
      response.status = 500;
      response.message = err;
    } else {
      response.status = 204;
      response.message = updatedManga;
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.publicationFullUpdate = function (req, res) {
  console.log("Update publication for a manga");
  const mangaId = req.params.mangaId;
  Manga.findById(mangaId)
    .select("publication")
    .exec(function (err, manga) {
      console.log("Update publication for manga with mangaId ", mangaId);
      const response = {
        status: 204,
        message: "Success",
      };
      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!manga) {
        console.log("Manga is not in the database");
        response.status = 404;
        response.message = { message: "Manga Id " + mangaId + " not found." };
      }
      if (response.status !== 204) {
        res.status(response.status).json(response.message);
      } else {
        _updatePublication(req, res, manga);
      }
    });
};

const _deletePublication = function (req, res, manga) {
  manga.publication.remove();
  manga.save(function (err, updatedManga) {
    const response = {
      status: 204,
      message: "Success",
    };
    if (err) {
      console.log("error", err);
      response.status = 500;
      response.message = err;
    } else {
      response.status = 204;
      response.message = updatedManga;
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.publicationDelete = function (req, res) {
  console.log("Update publication for a manga");
  const mangaId = req.params.mangaId;
  Manga.findById(mangaId)
    .select("publication")
    .exec(function (err, manga) {
      console.log("Delete publication for manga with mangaId ", mangaId);
      const response = {
        status: 204,
        message: "Success",
      };
      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!manga) {
        console.log("Manga is not in the database");
        response.status = 404;
        response.message = { message: "Manga Id " + mangaId + " not found." };
      }
      if (response.status !== 204) {
        res.status(response.status).json(response.message);
      } else {
        _deletePublication(req, res, manga);
      }
    });
};


const _partialUpdatePublication = function (req, res, manga) {
  if (req.body.name) {
    manga.publication.name = req.body.name;
  }
  if (req.body.address) {
    manga.publication.address = req.body.address;
  }  
  manga.save(function (err, updatedManga) {
    const response = {
      status: 204,
      message: "Success",
    };
    if (err) {
      console.log("error", err);
      response.status = 500;
      response.message = err;
    } else {
      response.status = 204;
      response.message = updatedManga;
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.publicationPartialUpdate = function (req, res) {
  console.log("Update publication partially for a manga");
  const mangaId = req.params.mangaId;
  Manga.findById(mangaId)
    .select("publication")
    .exec(function (err, manga) {
      console.log("Update publication for manga with mangaId ", mangaId);
      const response = {
        status: 204,
        message: "Success",
      };
      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!manga) {
        console.log("Manga is not in the database");
        response.status = 404;
        response.message = { message: "Manga Id " + mangaId + " not found." };
      }
      if (response.status !== 204) {
        res.status(response.status).json(response.message);
      } else {
        _partialUpdatePublication(req, res, manga);
      }
    });
};