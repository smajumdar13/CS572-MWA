// const gamesData = require("../data/games.json");
const ObjectId = require(mongodb.ObjectId);
const dbConnection = require("../data/dbconnection");

module.exports.gamesGetAll = function(req, res){
	console.log("GET the games");
	console.log(req.query);
	var offset = 0;
	var count = 5;
	if(req.query && req.query.offset){
		offset = parseInt(req.query.offset);
	}
	if(req.query && req.query.count){
		count = parseInt(req.query.count);
	}
	const db = dbConnection.get();
	const collection = db.collection("games");
	// const docs = collection.find(); //Synch and not good, blocking
	// res.status(200).json(docs);
	collection.find().skip(offset).limit(count).toArray(function(err, docs){
		console.log("Found games ", docs);
		res.status(200).json(docs);
	})
	// console.log("The db is ", db);
	// const pageGames =gamesData.slice(offset, offset+count);
	// res.status(200).json(pageGames);
};
module.exports.gamesGetOne = function(req, res){
	const gameId = req.params.gameId;
	const db = dbConnection.get();
	const collection = db.collection("games");
	collection.findOne({_id: ObjectId(gameId)}, function(err, docs){
		console.log("Get game with gameId ", gameId);
		res.status(200).json(game);
	})
};
module.exports.gamesAddOne = function(req, res){
	console.log("POST new game");const db = dbConnection.get();
	const collection = db.collection("games");
	if(req.body && req.body.title && req.body.price && req.body.rate){
		console.log(req.body);
		 var newGame = req.body;
		 newGame.title = req.body.title;
		 newGame.price = parseFloat(req.body.price);
		 newGame.rate = parseInt(req.body.rate);
		collection.insertOne(newGame, function(err, response){
			console.log(response);
			res.s
		})
	}
	
	res.status(200).json(req.body);
}