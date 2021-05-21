const MongoClient=require("mongodb").MongoClient;
const dbName="meanGames";
const dburl= "mongodb://localhost:27017/"+dbName;
var _connection=null;
const open=function(){
    MongoClient.connect(dburl,{useUnifiedTopology:true},function(err,client){
        if(err){
            console.log("DB conection failed");
            return;
        }
        _connection=client.db(dbName);
        console.log("Db connection open",_connection);
    
    })
}

const get=function(){
    return _connection;
}

module.exports={
    open:open,
    get:get

}