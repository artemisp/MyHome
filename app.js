var express = require('express');

var app = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
//var ObjectId = require('mongodb').ObjectID;
//var mongoose = require('mongoose');



app.use(bodyParser.json());
app.set('view engine', 'html');
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

MongoClient.connect('mongodb://localhost/newDB', (err, database) => {
  if (err) return console.log(err);
  db = database;
  app.listen(3000, function () {
      console.log('listening on 3000');
  })
});


var cookieSession = require('cookie-session');
var User = require('./User');

app.use(cookieSession({
  secret: 'SHHisASecret'
}));



app.get('/', function (req, res) {
  if (req.session.username && req.session.username !== '') {
    res.redirect('/protected');
  } else {
    res.redirect('/login');
  }
});

app.post('/login', function(req, res) {
  console.log('got login request');
  username = req.body.username;
  password = req.body.password;
  User.checkIfLegit(username, password, function(err, isRight) {
    if (err) {
      res.json({isValid: false});
    } else {
      if (isRight) {
        req.session.username = username;
        res.json({isValid: true}); //add to the json alo queries to get data from user
      } else {
        res.json({isValid: false});
      }
    }
  });

});

app.post('/logout', function(req, res) {
  req.session.username = '';
  console.log('loged out');
});

app.post('/register', function(req, res) {
  User.addUser(req.body.username, req.body.password, function(err) {
    if (err) {
      res.json({isValid: false});
    }
    else {
      res.json({isValid: true});
    }
  });
});


app.get('/protected', function(req, res) {
  if (!req.session.username || req.session.username === '') {
    res.send('You tried to access a protected page');
  } else {
    
  }
});