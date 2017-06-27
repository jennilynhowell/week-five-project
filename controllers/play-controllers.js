const game = require('../helpers').game;

module.exports = {
  display: function (req, res){
    let guesses = game.numGuesses;
    let blanks = game.arrayBlanks;
    let newWord = game.chooseWord();
    let display = game.gameDisplay(newWord);
    req.session.word = newWord;
    req.session.guesses = guesses;

    if(req.session.word && req.session.guesses) {
      game.gameDisplay(newWord);
      console.log(req.session.word);
    } else if (!req.session.guesses) {
      game.gameOver = true;
    } else {
      newWord = game.chooseWord();
      display = game.gameDisplay(newWord);
    };

    let context = {
      triedLetters: game.triedLetters,
      arrayBlanks: game.arrayBlanks,
      wordArray: game.wordArray,
      numGuesses: game.numGuesses,
      playerName: game.playerName
    }

    res.render('play', context);
  },

  play: function(req, res){
    let playAgain = req.body.play;

    let letterGuess = req.body.guess;
    letterGuess = letterGuess.toLowerCase();

    game.checkGuess(letterGuess);

    if (game.arrayBlanks.includes('_')) {
      game.winRound = false;
      console.log(game.winRound);

    } else {
      emptyBlanks = false;
    }

    if (emptyBlanks && game.numGuesses >= 1) {
      game.winRound = false;
    } else if (!emptyBlanks && game.numGuesses >= 1) {
      game.winRound = true;
    }

    let context = {
      winRound: game.winRound,
      triedLetters: game.triedLetters,
      repeats: game.repeats,
      arrayBlanks: game.arrayBlanks,
      wordArray: game.wordArray,
      numGuesses: game.numGuesses,
      playerName: game.playerName
    }

      res.render('play', context);

  },

  resetGame: function(req, res){
    game.reset();
    console.log('Made it to resetGame fn');
    res.redirect('/play');
  }

};
