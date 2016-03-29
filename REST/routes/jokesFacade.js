
var express = require('express');
var connection = require("../db/db");
var db = connection.get();
var object = require("mongodb").ObjectID;
var router = express.Router();
var bodyParser = require('body-parser');
var jokesFacade = require("../model/jokes");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

router.post('/deleteJoke', function (req, res, next) {
    jokesFacade.deleteJoke(req.body.id,function(err,result){
    if(err){
        res.render("success",{message:"There was a problem deleting the joke ... \n maybe the joke was too good!"});
    }else{
        res.render("success",{message:"Joke deleted successfully !! :D \n"+result });
    }
    });

});

router.get('/randomJoke', function (req, res) {

    var j;
    jokesFacade.randomJoke(function (data) {
        var r = Math.floor(Math.random() * data.length);
        j = data[r];
        res.render('joke', {"joke": j.joke, type: j.type, reference: j.reference.author, lastEdited: j.lastEdited});
    });
});

router.get('/all',function(err,data){
   res.write(data);
});

module.exports = router;
