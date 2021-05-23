// Solution for question 3: linking controller for adding two numbers
// based on SoC

const express = require("express");
const router = express.Router();
const controllerNum = require("../controllers/numcontroller.js");

router.route("/sum").get(controllerNum.sum);

module.exports = router;