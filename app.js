var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
// var mongoose = require('mongoose');
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
// var mongojs = require('mongojs');
//var db = mongojs('khalili:JCJ36eaU@cmpt218.csil.sfu.ca:27017/cmpt218_khalili?authSource=admin',['checkins']);
//var url = "mongodb://khalili:bill202@ds117469.mlab.com:17469/cmpt218_khalili";
var url = "mongodb://khalili:JCJ36eaU@127.0.0.1:27017/cmpt218_khalili?authSource=admin";
//var url = "mongodb://khalili:JCJ36eaU@cmpt218.csil.sfu.ca:27017/cmpt218_khalili?authSource=admin";
//CONNECT PROTOTYPE
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Connected to a hu-MONGO-us database");
  db.close();
});
//COLLECTION PROTOTYPE
/*MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("cmpt218_khalili");
  dbo.createCollection("checkins", function(err, res) {
    if (err) throw err;
    console.log("Collection initialized...");
    db.close();
  });
});
//INSERTION PROTOYPE
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("cmpt218_khalili");
  var myobj = { name: "This is a", address: "test boi" };
  dbo.collection("customers").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});
//SEARCHING PROTOTYPE
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("cmpt218_khalili");
  dbo.collection("customers").findOne({}, function(err, result) {
    if (err) throw err;
    console.log(result.name);
    db.close();
  });
});
//SEARCHING MANY PROTOTYPE
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("cmpt218_khalili");
  dbo.collection("customers").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});*/
// mongoose.connect("mongodb://khalili:bill202@ds113179.mlab.com:13179/cmpt218_khalili");
// var db = mongoose.connection;
//
// db.once('open', function(){
//   console.log('connected to a hu-MONGO-us database');
// });

//Make a schema
// var Schema = mongoose.Schema;
//now, define yourself, great schema...
// var allScheme= new Schema({
//   bname: {type:String},
//   userId: {type:Number},
//   className:{type:String},
//   inputType:{type:String},
//   isLive:{type:String}
// });
// //Ok now to stick you into a model and slap you into a collection
// var allPuts = mongoose.model('checkins', allScheme);
// //If I want a variable in you, I need var thing = new allPuts({...});
// //now to put stuff into you, I simply write name.save(...)

var app = express();

var logger = function(req,res,next){
  console.log('logging...');
  next();
}

app.use(logger);
app.use(bodyParser.urlencoded({ extended: false }))

//---I WAS TOLD I'M NOT ALLOWED TO USE VIEWS AND STUFF... SADFACE :(---
// //Setting the so-called "view engine"
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

//Set a static path
app.use(express.static(path.join(__dirname,'public')));

app.get('/', function(req,res) {
  res.redirect('/login.html');
});
app.get('/openclasses', function(req,res){
	res.sendFile(__dirname + '/views/openClasses.html');
});
app.post('/adminHome', function (req,res) {
  var title = 'customers';
  console.log(req.body);
  if(req.body.username === 'admin' && req.body.password === '1234'){
    res.sendfile(__dirname + '/views/goodPass.html');
  }
  else{
    res.sendfile(__dirname + '/views/wrongPass.html');
  }
});
app.get('/getOpenClasses', function (req,res) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("cmpt218_khalili");
    dbo.collection("customers").find({inputType:'admin'}).toArray(function(err, result) {
      if (err) throw err;
      res.send(JSON.stringify(result));
      db.close();
    });
  });
});
app.post('/closeThisClass', function(req,res){
  console.log("You want me to close " + req.body.ref);
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("cmpt218_khalili");
    var thing = req.body.ref;
    var myquery = { className:thing, isLive:"true", inputType:'admin'};
    var newvalues = { $set: {isLive: "false"} };
    dbo.collection("customers").updateOne(myquery, newvalues, function(err, result) {
      if (err) throw err;
      console.log("class now closed");
      db.close();
      res.sendfile(__dirname + '/views/openClasses.html');
    });
  });
});
app.post('/deleteThisClass', function (req,res) {
  console.log("You want me to delete "+ req.body.ref);
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("cmpt218_khalili");
    var thing = req.body.ref;
    var myquery = { className: thing};
    dbo.collection("customers").deleteOne(myquery, function(err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      db.close();
      res.sendfile(__dirname + '/views/openClasses.html');
    });
  });
});
app.post('/viewThisClass', function (req,res) {
  console.log("You want to see " + req.body.ref);
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("cmpt218_khalili");
    var sinasCoolString = req.body.ref;
    dbo.collection("customers").find({className:sinasCoolString,inputType:"user"}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.send(JSON.stringify(result));
      db.close();

    });
  });
});

app.post('/checkin', function (req,res) {
    MongoClient.connect(url, function (err,db) {
      if(err) throw err;
      var dbo = db.db("cmpt218_khalili");
      var swagostringo = req.body.class;
      dbo.collection("customers").findOne({className:swagostringo, isLive:"true"}, function(err, result){
        if(err) throw err;
        if(result){
          MongoClient.connect(url, function(err, db) {
            date = new Date();
            var month = date.getUTCMonth() + 1;
            var day = date.getUTCDate();
            var year = date.getUTCFullYear();
            var newdate = year + "/" + month + "/" + day;
            var hours = date.getHours();
            var mins = date.getMinutes();
            var ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12;
            mins = mins < 10 ? '0' + mins : mins;
            var newtime = hours + ":" + mins + " " + ampm;
            date = newtime;
            var studentIn = {
              bname: req.body.name,
              userId: req.body.userId,
              className:req.body.class,
              inputType:'user',
              isLive:'true',
              date:date
            };
            if (err) throw err;
            var dbo = db.db("cmpt218_khalili");
            dbo.collection("customers").insertOne(studentIn, function(err, res) {
              if (err) throw err;
              console.log("Student " + req.body.name + " inserted");
              db.close();
              
            });
	res.redirect('/checkinGood.html');
          });
        }
        else{
          console.log("CAN'T CHECK THAT IN");
          res.redirect('/checkinBad.html');
        }
      });
    });
});
app.post('/insertClass', function (req,res) {
  var exists = false;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("cmpt218_khalili");
    dbo.collection("customers").findOne({className:req.body.className}, function(err, result) {
      if (err) throw err;
      console.log(result);

      if(result){
        if(result.isLive === 'true'){
          console.log("CLASS ALREADY EXISTS");
          exists = true;
        }
      }
      db.close();
      if(!exists){
        console.log("trying to find...");
        MongoClient.connect(url, function(err, db) {
          date = new Date();
          var month = date.getUTCMonth() + 1;
          var year = date.getUTCFullYear();
          var day = date.getUTCDate();
          var newdate = year + "/" + month + "/" + day;
          var mins = date.getMinutes();
          var hours = date.getHours();
          var ampm = hours >= 12 ? 'pm' : 'am';
          hours = hours % 12;
          hours = hours ? hours : 12;
          mins = mins < 10 ? '0' + mins : mins;
          var newtime = hours + ":" + mins + " " + ampm;
          date = newtime;
          var classIn = {
            bname: 'admin',
            userId: '42',
            className:req.body.className,
            inputType:'admin',
            isLive:'true',
            date:date
          };
          if (err) throw err;
          var dbo = db.db("cmpt218_khalili");
          dbo.collection("customers").insertOne(classIn, function(err, res) {
            if (err) throw err;
            console.log("Class " + req.body.className + " inserted");
            db.close();
          });
        });
        res.sendfile(__dirname + '/views/openClasses.html');
      }
      else{
        res.sendfile(__dirname + '/views/goodPassExists.html');
      }
    });
  });
});
app.listen(17630, function(){
  console.log("Port 3000 seems like a nice port...");
});
