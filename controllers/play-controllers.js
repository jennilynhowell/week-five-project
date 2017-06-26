const game = require('../helpers').game;

module.exports = {
  display: function (req, res){
    let guesses = game.numGuesses;
    let newWord = game.chooseWord();
    let display = game.gameDisplay(newWord);
    req.session.word = newWord;
    req.session.guesses = guesses;

    if(req.session.word && req.session.guesses) {
      game.gameDisplay(newWord);
      console.log(newWord);
      console.log('array blanks: ', game.arrayBlanks);
    } else {
      newWord = game.chooseWord();
      display = game.gameDisplay(newWord);
      console.log('none, choosing: ', newWord);
    };

    let context = {
      arrayBlanks: game.arrayBlanks,
      wordArray: game.wordArray,
      numGuesses: game.numGuesses,
      playerName: game.playerName,
      arrayBlanks: game.arrayBlanks
    };

    res.render('play', context);
  },

  play: function(req, res){
    let letterGuess = req.body.guess;
    letterGuess = letterGuess.toLowerCase();

    game.checkGuess(letterGuess);

    let context = {
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
