const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip: {
    type: Number,
    required: true,
  },
});

const studentSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  gpa: {
    type: Number,
    required: true,
  },
  address: [addressSchema],
});

mongoose.model("Student", studentSchema, "students");
mongoose.model("Address", addressSchema, "addresses");
