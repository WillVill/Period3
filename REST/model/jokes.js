var connect = require("../db/db");
var db ;
connect.connect("mongodb://localhost:3000",function(){
     db = connect.get();
});
var ObjectID = require("mongodb").ObjectID;

function _allJokes(callback) {

    db.collection("jokes").find({}).toArray(function (err, data) {
        if (err) {
            callback(err);
        } else {
            callback(null, data);
        }

    });
}



function _deleteJoke(id, callback) {

    db.collection("jokes").removeOne(db.collection("jokes").findOne({})), function (err, result) {
        if (err) {
            callback(err,result);
        } else {
            callback(null, result);
        }
    }
}

function _randomJoke(callback) {
    db.collection("jokes").find().toArray(function(err,data){
       if(err){
           console.log("Error in random joke : " +err);
       }else{
           callback(data)
       }
    });
}

function _editJoke(jokeToEdit, callback) {
    db.collection("jokes").updateOne({_id: jokeToEdit._id}, function (err, joke) {
        if (err) {
            callback(err);
        } else {
            return jokeToEdit;
        }
    });
}

function _findOne(id, callback) {
    db.collection("jokes").findOne({_id: ObjectID(""+id)}, function (err, data) {
        if (err) {
            callback(err);
        }else{
            callback(null,data);
        }
    });
}

exports.allJokes = _allJokes;
exports.findJoke = _findOne;
exports.editJoke = _editJoke;
exports.deleteJoke = _deleteJoke;
exports.randomJoke = _randomJoke;

