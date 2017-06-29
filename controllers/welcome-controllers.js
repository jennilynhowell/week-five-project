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
    req.session.level = game.levelChoice;

    if(req.session.user){
      res.redirect('/play');
    } else {
      res.redirect('/welcome');
    }

  }

};
