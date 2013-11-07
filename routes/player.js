var colors = require('colors');
// Colors
// bold, italic, underline, inverse, yellow, cyan,
// white, magenta, green, red, grey, blue, rainbow,
// zebra, random
// console.log('player.index'.italic.underline.bold.magenta);

/*
 * GET /
 */

exports.index = function(req, res){
  console.log('player.index'.italic.underline.bold.magenta);
  res.render('player/index', {title: 'Express'});
};

//POST /players
exports.create = function(req, res) {
  new Player(req.body).save(function(err, player){
    res.send(player);
  });
};

//POST /players/:id
exports.login = function(req, res) {
  // Player.find().wher
};