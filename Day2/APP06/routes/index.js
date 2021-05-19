const express = require("express");
const router = express.Router();

router.route("/json")
  .get(function (req, res) {
    console.log("JSON request received.");
    res.status(200).json({ "jsonDataGet": true });
  })
  .post(function (req, res) {
    console.log("POST JSON request received.");
    res.status(200).json({ "jsonDataPost": true });
  });

  module.exports = router;