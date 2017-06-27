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
      console.log(newWord);
    } else {
      newWord = game.chooseWord();
      display = game.gameDisplay(newWord);
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
    let winRound = game.winRound(game.arrayBlanks);
    console.log('winRound: ', winRound);

    let letterGuess = req.body.guess;
    letterGuess = letterGuess.toLowerCase();

    //when wrapped in loop checkGuess does not work.
    while (winRound = false) {
      game.checkGuess(letterGuess);
    } winRound = true;

    let context = {
      winRound: winRound,
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
