var express = require('express');

var app = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

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
    var user = req.session.username;
    User.getUser(user, function (err, user) {
      if (err) res.json({isValid: false});
      else {
        console.log(user);
        res.json({isValid: true, username: user.username, background: user.background, notes: user.notes,
          todo: user.todo, wTD: user.wTodo, wN: user.wNote, wTL: user.wTopLinks});
      }
   })
  } else {
    res.json({isValid: false});
  }
});

app.post('/register', function(req, res) {
  User.addUser(req.body.username, req.body.password, req.body.background, req.body.notes, req.body.todo,
      req.body.wTD, req.body.wN, req.body.wTL, function(err) {
    if (err) {
      res.json({isValid: false});
    }
    else {
      res.json({isValid: true});
    }
  });
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
        User.getUser(username, function (err, user) {
          if (err) res.json({isValid: false});
          else {
            console.log(user);
            res.json({isValid: true, username: user.username, background: user.background, notes: user.notes,
              todo: user.todo, wTD: user.wTodo, wN: user.wNote, wTL: user.wTopLinks});
          }
        })
      } else {
        res.json({isValid: false});
      }
    }
  });

});

app.post('/logout', function(req, res) {
  User.updateUser(req.body.username, req.body.background, req.body.notes, req.body.todo, req.body.wTD,
      req.body.wN, req.body.wTL, function(err) {
    if (err) {
      res.json({isValid: false});
    }
    else {
      res.json({isValid: true});
    }
  });
  req.session.username = '';
  console.log('logged out');
});

app.post('/submitWidgets', function(req, res) {
  User.updateUser(req.body.username, req.body.background, req.body.notes, req.body.todo, req.body.wTD,
      req.body.wN, req.body.wTL, function(err) {
    if (err) {
      res.json({isValid: false});
    }
    else {
      res.json({isValid: true});
    }
  });
});