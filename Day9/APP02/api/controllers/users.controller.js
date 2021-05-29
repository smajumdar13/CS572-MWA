const e = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcrypt-nodejs");
// require("./users.controller");

module.exports.usersRegister = function (req, res) {
  console.log("Register a new user");
  const newUser = {
    name: req.body.name || null,
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
  };

  User.create(newUser, function (err, user) {
    const response = {
      status: 200,
      message: user,
    };
    if (err) {
      console.log(err);
      response.status = 400;
      response.message = err;
    } else {
      console.log("User created");
    }

    res.status(response.status).json(response.message);
  });
};

module.exports.usersAuthenticate = function (req, res) {
  console.log("Register a new user");
  const authUser = {
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
  };

  User.findOne(authUser).exec(function (err, user) {
    const response = {
      status: 201,
      message: user,
    };
    if (err) {
      console.log(err);
      response.status = 400;
      response.message = err;
    } else {
      if (!user) {
        response.status = 404;
        response.message = { message: "User does not exist" };
      } else {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          console.log("User Authenticated");
        } else {
          console.log("Wrong password");
          response.status = 401;
          response.message = { message: "Wrong password" };
        }
      }
    }
    res.status(response.status).json(response.message);
  });
};
