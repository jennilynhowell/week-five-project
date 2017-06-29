const game = require('../helpers').game;

module.exports = {
  display: function(req, res){
    res.render('welcome', {});
  },

  submitName: function(req, res){
    //capture player name
    game.playerName = req.body.name;
    if (game.playerName) {
      req.session.user = game.playerName;
    };

    //capture levelChoice
    game.levelChoice = req.body.level;
    console.log(req.body.level);
    if (req.body.level = 0){
      game.levelChoice += 2;
    } else if (req.body.level = 1){
      game.levelChoice = (req.body.level + 1);
    } else if (req.body.level = 2) {
      game.levelChoice = (req.body.level + 2);
    } else {
      game.levelChoice = (req.body.level + 3);
    }
    console.log('levelChoice in welcome: ', game.levelChoice);
    req.session.level = game.levelChoice;

    if(req.session.user){
      res.redirect('/play');
    } else {
      res.redirect('/welcome');
    }

  }

};
