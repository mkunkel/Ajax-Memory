var colors = require('colors');
var _ = require('lodash');
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

//POST /games
exports.create = function(req, res) {
  new Game(req.query).save(function(err, game){
    var squares = _.range(game.numSquares);
    squares = squares.concat(squares);
    game.squareData = _.shuffle(squares);
    res.send(game._id);
  });
};

//POST /:card
exports.guess = function(req, res) {
  // new Game(req.query).save(function(err, game){
  //   var squares = _.range(game.numSquares);
  //   squares = squares.concat(squares);
  //   game.squareData = _.shuffle(squares);
  //   res.send(game._id);
  // });
};