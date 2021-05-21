const mongoose = require("mongoose");

const publisherSchema = new mongoose.Schema({
  name: String,
  location: {
    // type: "Point",
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
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
  designers: String,
  publisher: publisherSchema,
  // reviews: [reviewSchema],
});

mongoose.model("Game", gameSchema, "games");
// if collection 'games' is not provided, it will take the
// plural version of 'Game' which would be 'games'
