const mongoose = require("mongoose");

// creating a schema for the gamesData
const gameSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year: Number,
    rate: {
        type: Number,
        min: 1,
        max: 5,
        "default": 1 // default is a keyword in schema so in quotes, 
        // and a default value if user does not provide a rate
    },
    price: Number,
    minPlayers: {
        type: Number,
        min:1,
        max: 10
    },
    maxPlayers: Number,
    minAge: Number,
    designers: [String]
});

mongoose.model("Game", gameSchema, "games");
// if collection 'games' is not provided, it will take the 
// plural version of 'Game' which would be 'games'
