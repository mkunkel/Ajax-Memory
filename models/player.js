var mongoose = require('mongoose');

var Player = mongoose.Schema({
  name:      String,
  times:     [Number],
  password:  {type: String, default: ''},
  createdAt: {type: Date, default: Date.now}
});

mongoose.model('Player', Player);