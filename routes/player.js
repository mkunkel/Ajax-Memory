var colors = require('colors');
var CryptoJS = require('crypto-js');

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

//POST /player/login/
exports.login = function(req, res) {
  console.log('player.login'.italic.underline.bold.magenta);
  console.log('------------------------'.italic.underline.bold.yellow);
  console.log(req.body);
  console.log('------------------------'.italic.underline.bold.yellow);
  Player.findById(req.body.id, function(err, player){
    res.send(player);
  });
};

//POST /player/list
exports.list = function(req, res) {
  console.log('player.list'.italic.underline.bold.magenta);
  Player.find(function(err, players){
    for (var i = 0; i < players.length; i++) {
      delete players[i].password;
    }
    res.send(players);
  });
};