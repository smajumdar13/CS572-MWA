
const dbconnection = require("../data/dbconnection");
const { response } = require("express");
const { ObjectId } = require("mongodb").ObjectID;
module.exports.gamesGetAll=function(req,res){
    console.log("Get the Games");
    console.log(req.query);
    var offset=0;
    var count=5;

    if(req.query && req.query.offset){
        offset=parseInt(req.query.offset);

    }

    if(req.query && req.query.count){
        count=parseInt(req.query.count);

    }

    const db=dbconnection.get();

    const collection=db.collection("games");
   // const docs=collection.find();//This is sync and not good
   //res.status(200).json(docs);
   collection.find().skip(offset).limit(count).toArray(function(err,docs){
       console.log("Found games",docs);
       res.status(200).json(docs);
   });
};

module.exports.gamesGetOne=function(req,res){
    const gameId=req.parms.gameId;
    //const theGame=gamesData[gameId];
    const db=dbconnection.get();
    const collection=db.collection("games");
    // console.log("Get Game with gameId",gameId);
    collection.findOne({_id: ObjectId(gameId)},function(err,game){
        console.log("GET game  with gameid",gameId);
        res.status(200).json(game);
    })
    
};

module.exports.gamesAddOne=function(req,res){
    console.log("POST new game");
    const db=dbconnection.get();
    const collection=db.collection("games");
    if(req.body && req.body.title && req.body.price && req.body.rate){
        console.log(req.body);
        var newGame={};
        newGame.price=parseFloat(req.body.price);
        newGame.title=req.body.title;
        newGame.rate=parseInt(req.body.rate);
        collection.insertOne(newGame,function(err,response){
            console.log(response);
            res.status(201).json(response.ops);
        });
    }else{
        console.log("data missing from body");    
    res.status(400).json({err:"Request data missing from post body"});
    }
};


