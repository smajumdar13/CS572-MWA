const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  city: String,
  street: String,
  state: String,
  zip: Number
});

const studentSchema = new mongoose.Schema({
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
