var mongoose = require('mongoose');

var Game = mongoose.Schema({
  player:         {type: mongoose.Schema.Types.ObjectId, ref: 'Player'}
  numSquares:     Number,
  squareData:     [Number],
  createdAt:      {type: Date, default: Date.now}
});

mongoose.model('Game', Game);