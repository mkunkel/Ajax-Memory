var mongoose = require('mongoose');

var Game = mongoose.Schema({
  name:      String,
  color:     String,
  createdAt: {type: Date, default: Date.now}
});

mongoose.model('Game', Game);