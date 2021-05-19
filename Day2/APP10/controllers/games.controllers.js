const gamesData = require("../data/games.json");

module.exports.gamesAddOne = function(req, res){
	console.log("POST new game");
	console.log(req.body);
	res.status(200).json(req.body);
};
