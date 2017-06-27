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
      gameOver: game.gameOver,
      arrayBlanks: game.arrayBlanks,
      wordArray: game.wordArray,
      numGuesses: game.numGuesses,
      playerName: game.playerName,
      arrayBlanks: game.arrayBlanks
    };

    res.render('play', context);
  },

  play: function(req, res){
    let emptyBlanks = true;
    let letterGuess = req.body.guess;
    letterGuess = letterGuess.toLowerCase();

    game.checkGuess(letterGuess);

    //check arrayBlanks and numGuesses to gauge win
    if (game.arrayBlanks.includes('_')){
      emptyBlanks = true;
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
      playerName: game.playerName,
      arrayBlanks: game.arrayBlanks
    }

    res.render('play', context);
  }
};
