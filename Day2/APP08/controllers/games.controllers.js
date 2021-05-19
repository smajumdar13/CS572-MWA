const gamesData = require("../data/games.json");

module.exports.gamesGetOne = function(req, res){
	const gameId = req.params.gameId;
	const theGame = gamesData[gameId];
	console.log("Get game with gameId " + gameId);
	res.status(200).json(theGame);
};
