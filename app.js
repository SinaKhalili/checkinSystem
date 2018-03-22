var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// var mongojs = require('mongojs');
//var db = mongojs('khalili:JCJ36eaU@cmpt218.csil.sfu.ca:27017/cmpt218_khalili?authSource=admin',['checkins']);

mongoose.connect("mongodb://khalili:JCJ36eaU@cmpt218.csil.sfu.ca:27017/cmpt218_khalili?authSource=admin");
var db = mongoose.connection;

db.once('open', function(){
  console.log('connected to a hu-MONGO-us database');
});
 
//Make a schema
var Schema = mongoose.Schema;
//now, define yourself, great schema...
var allScheme= new Schema({
  bname: {type:String},
  userId: {type:Number},
  className:{type:String},
  inputType:{type:String},
  isLive:{type:String}
});
//Ok now to stick you into a model and slap you into a collection
var allPuts = mongoose.model('checkins', allScheme);
//If I want a variable in you, I need var thing = new allPuts({...});
//now to put stuff into you, I simply write name.save(...)

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

app.post('/adminHome', function (req,res) {
  var title = 'customers';
  console.log(req.body);
  if(req.body.username === 'admin' && req.body.password === '1234'){
    res.sendFile(__dirname + '/views/goodPass.html');
  }
  else{
    res.sendfile(__dirname + '/views/wrongPass.html');
  }
});
app.post('/openclass', function (req,res) {
  allPuts.findOne({'className':str(req.body.className),'inputType':'admin', 'isLive':'true'},function(err,obj){
    if(obj === NULL){
      var classIn = new allPuts({
        bname: 'admin',
        userId: '42',
        className:str(req.body.className),
        inputType:'admin',
        isLive:'true'
      });
      classIn.save(function (error) {
        if(error){
          throw error;
        } else {
          console.log("Opened up that class...");
          res.sendFile(__dirname + '/views/stopPage.html')
          //-------------somehow get the name of the class they entered..
        }
      });
    }
    else{
      res.sendFile(__dirname + '/views/goodPassExists.html');
    }
  });
});
app.listen(3000, function(){
  console.log("Port 3000 seems like a nice port...");
});
