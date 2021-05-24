const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema({
  name: String,
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 3
  }
});

const releaseSchema = new mongoose.Schema({
  type: String,
  price: Number
});

const publicationSchema = new mongoose.Schema({
  name: String,
  address: String
});

const mangaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  releasedYear: Number,
  completedYear: Number,
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 3,
    required: true
  },
  totalChapters: {
    type: Number,
    required: true
  },
  minAge: Number,
  artists: [artistSchema],
  releases: [releaseSchema],
  publication: publicationSchema
});

mongoose.model("Manga", mangaSchema, "manga");
mongoose.model("Artist", artistSchema, "artists");
mongoose.model("Release", releaseSchema, "release");
mongoose.model("Publication", publicationSchema, "publication");
