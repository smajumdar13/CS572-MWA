const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  password: {
    type: String,
    required: true,
  },
});

// compile the model, automatically takes users as db collection
mongoose.model("User", userSchema, "users");
