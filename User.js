var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/db');

var bcrypt = require('bcrypt');

var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  background: { type: String },
  notes: { type: String },
  wTodo: { type: Boolean },
  wNote: { type: Boolean }
});

userSchema.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

userSchema.statics.addUser = function(username, password, background, notes, wTD, wN, cb) {
  var newUser = new this({ username: username, password: password, background: background, notes: notes,
    wTodo: wTD, wNote: wN});
  newUser.save(cb);
};

userSchema.statics.checkIfLegit = function(username, password, cb) {
  this.findOne({ username: username }, function(err, user) {
    if (!user) cb('no user');
    else {
      bcrypt.compare(password, user.password, function(err, isRight) {
        if (err) return cb(err);
        cb(null, isRight);
      });
    }
  });
};

userSchema.statics.updateUser = function(username, background, notes, wTD, wN, cb) {
  this.findOne({username: username}, function (err, user) {
    if (err) cb('no user');
    if (user) {
      user.background = background;
      user.notes = notes;
      user.wTodo = wTD;
      user.wNote = wN;
      user.save(cb);
    }
  });
};

userSchema.statics.getUser = function(username, cb) {
  this.findOne({username: username}, function (err, user) {
    if (err) console.log('Could not get notes');
    if (user) {
      cb (null, user);
    }
  });
};


module.exports = mongoose.model('User', userSchema);