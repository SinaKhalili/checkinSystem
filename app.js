var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
var db = mongojs('khalili:JCJ36eaU@cmpt218.csil.sfu.ca:27017/cmpt218_khalili?authSource=admin',['checkins']);

var app = express();

var logger = function(req,res,next){
  console.log('logging...');
  next();
}

app.use(logger);
app.use(bodyParser.urlencoded({ extended: false }))

//Setting the so-called "view engine"
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Set a static path
app.use(express.static(path.join(__dirname,'public')));

app.get('/', function(req,res) {
  res.redirect('/login.html');
  db.checkins.find(function(err, docs) {
      console.log(docs);
  });
});

app.post('/adminHome', function (req,res) {
  var title = 'customers';
  console.log(req.body);
  if(req.body.username === 'admin' && req.body.password === '1234'){
    res.render('serve', {
      title:'Look at my EJS skillz'
    });
  }
  else{
    res.render('wrongPass');
  }
});
app.listen(3000, function(){
  console.log("Port 3000 seems like a nice port...");
});
