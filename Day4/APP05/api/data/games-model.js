const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

// const publisherSchema = new mongoose.Schema({
//   name: String,
//   location: {
//     // type: Point,
//     coordinates: {
//       type: [Number],
//       index: "2dsphere",
//     },
//   },
// });

const publisherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  country: {
    type: Number,
    required: true,
  },
  established: {
    type: Date,
    required: false,
  },
  location: {
    address: String,
    coordinates: [number],
  },
});

// creating a schema for the gamesData
const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
  },
  rate: {
    type: Number,
    min: 1,
    max: 5,
    default: 1, // default is a keyword in schema, so put in quotes,
    // and a default value if user does not provide a rate
  },
  price: Number,
  minPlayers: {
    type: Number,
    min: 1,
    max: 10,
  },
  maxPlayers: Number,
  minAge: Number,
  designers: [String],
  publisher: publisherSchema,
  // reviews: [reviewSchema],
});

mongoose.model("Game", gameSchema, "games");
mongoose.model("Publisher", publisherSchema, "publishers");
// if collection 'games' is not provided, it will take the
// plural version of 'Game' which would be 'games'
