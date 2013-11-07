var colors = require('colors');
var _ = require('lodash');
var mongoose = require('mongoose');
var Game = mongoose.model('Game');

// Colors
// bold, italic, underline, inverse, yellow, cyan,
// white, magenta, green, red, grey, blue, rainbow,
// zebra, random
// console.log('game.index'.italic.underline.bold.magenta);

// GET /
exports.index = function(req, res){
  console.log('game.index'.italic.underline.bold.magenta);
  res.render('game/index', {title: 'Express'});
};

//POST /
exports.create = function(req, res) {
  new Game(req.body).save(function(err, game){

    var squares = _.range(game.numSquares);
    squares = squares.concat(squares);
    game.squareData = _.shuffle(squares);
    game.save();
    var response = {  _id: game._id, numSquares: game.numSquares };

    res.send(response);
  });
};

//POST /card/:id
exports.guess = function(req, res) {
  Game.findById(req.body.id, function(err, game) {
    console.log(game.squareData[req.params.id]);
    console.log(game.squareData);
    res.send({number: game.squareData[req.params.id]});
  });
};