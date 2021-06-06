const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  name: String,
  review: String,
  date: String
})

const mangaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  publisher: String,
  imprint: String,
  magazine: String,
  demographic: String,
  releasedYear: Number,
  completed: {
    type: String,
    enum: ["Yes", "No"],
    default: "No"
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 3,
    required: true
  },
  tvSeries: {
    type: String,
    enum: ["Yes", "No"],
    default: "No"
  },
  reviews: [reviewSchema]
});

mongoose.model("Manga", mangaSchema, "manga");
mongoose.model("Review", reviewSchema);
