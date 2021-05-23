const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  year: {
    type: Number
  },
  rate: {
    type: Number,
    min: 1,
    max: 5,
    default: 1
  },
  price: Number,
  minPlayers: {
    type: Number,
    min: 1,
    max: 10
  },
  maxPlayers: Number,
  minAge: Number,
  designers: String
});

mongoose.model("Game", gameSchema, "games");
