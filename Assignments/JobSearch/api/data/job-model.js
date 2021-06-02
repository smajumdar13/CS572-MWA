const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  city: String,
  state: String,
  zip: Number
});

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  salary: Number,
  location: locationSchema,
  description: String,
  experience: {
    type: String,
    required: true,
  },
  skills: Array, type: String,
  postDate: {
    type: Date,
    required: true,
  },
});

mongoose.model("Job", jobSchema, "jobs");
mongoose.model("Location", locationSchema, "location");
