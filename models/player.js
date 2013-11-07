var mongoose = require('mongoose');

var Player = mongoose.Schema({
  name:      String,
  color:     String,
  createdAt: {type: Date, default: Date.now}
});

mongoose.model('Player', Player);