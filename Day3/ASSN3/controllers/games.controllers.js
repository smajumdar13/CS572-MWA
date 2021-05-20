const dbConnection = require("../data/dbconnection");

module.exports.gamesGetThree = function(req, res){
	console.log("GET the list of games");

	const db = dbConnection.get();
	const collection = db.collection("games");
		collection.find().limit(3).toArray(function(err, docs){
			console.log("Found games ", docs);
			res.status(200).json(docs);
	});
};

module.exports.gamesGetList = function(req, res){
	console.log("GET the list of games");
	console.log(req.query);
	var offset = 0;
	var count = 0;

	if(req.query && req.query.offset){
		offset = parseInt(req.query.offset);
	} 
	if(req.query && req.query.count){
		count = parseInt(req.query.count);
	}

	const db = dbConnection.get();
	const collection = db.collection("games");

	// putting the conditions in reverse order did not give the desired output
	// so put in the negative result first, and the desired second
	if(count > 7 || count < 1 ) {
		console.log("Invalid number. Number should be between 1 and 7.");
		res.status(403).send("Invalid number. Please input a number between 1 and 7.");
   } else {
		collection.find().skip(offset).limit(count).toArray(function(err, docs){
			console.log("Found games ", docs);
			res.status(200).json(docs);
		});
	} 
};

