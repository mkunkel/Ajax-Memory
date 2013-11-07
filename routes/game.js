var colors = require('colors');
// Colors
// bold, italic, underline, inverse, yellow, cyan,
// white, magenta, green, red, grey, blue, rainbow,
// zebra, random
// console.log('game.index'.italic.underline.bold.magenta);

/*
 * GET /
 */

exports.index = function(req, res){
  console.log('game.index'.italic.underline.bold.magenta);
  res.render('game/index', {title: 'Express'});
};

//POST /games
exports.create = function(req, res) {
  new Game(req.query).save(function(err, game){
    res.send(game);
  });
};