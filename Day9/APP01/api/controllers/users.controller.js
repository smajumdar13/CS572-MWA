const mongoose = require("mongoose");
const User = mongoose.model("User");
// require("./users.controller");

module.exports.usersRegister = function (req, res) {
  console.log("Register a new user");
  const newUser = {
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
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
    
    res.status(responnse.status).json(response.message);
  });
};

module.exports.usersAuthenticate = function (req, res) {
  console.log("Register a new user");
  const authUser = {
    username: req.body.username,
    password: req.body.password,
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
      } else {
        console.log("User Authenticated");
      }
    }
    res.status(responnse.status).json(response.message);
  });
};
