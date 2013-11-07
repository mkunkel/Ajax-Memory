var colors = require('colors');

var mongoose = require('mongoose');
var Player = mongoose.model('Player');
// Colors
// bold, italic, underline, inverse, yellow, cyan,
// white, magenta, green, red, grey, blue, rainbow,
// zebra, random

/*
 * GET /
 */

exports.index = function(req, res){
  console.log('player.index'.italic.underline.bold.magenta);
  res.render('player/index', {title: 'Express'});
};

//POST /player
exports.create = function(req, res) {

  console.log('player.create'.italic.underline.bold.magenta);
  new Player(req.body).save(function(err, player){
    res.send(player);
  });
};

//POST /player/login
exports.login = function(req, res) {
  console.log('player.login'.italic.underline.bold.magenta);
  Player.findById(req.body.id, function(err, player){
    res.send(player);
  });
};