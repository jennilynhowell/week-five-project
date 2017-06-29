const game = require('../helpers').game;

module.exports = {

  display: function (req, res){
    let levelChoice = game.levelChoice;
    let newWord = game.executeLevel(game.levelChoice);
    let guesses = game.numGuesses;
    let blanks = game.arrayBlanks;
    let display = '';
    req.session.guesses = guesses;

    display = game.gameDisplay(newWord);
    req.session.word = newWord;

    if(req.session.word && req.session.guesses) {
      game.gameDisplay(newWord);
      console.log(req.session.word);
    } else if (!req.session.guesses) {
      display = 'No guesses left!';``
    } else {
      newWord = game.executeLevel();
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
    //regex letter test from https://stackoverflow.com/questions/23476532/check-if-string-contains-only-letters-in-javascript
    if (/[^a-z]/i.test(letterGuess)) {
      console.log('insert letter');
      game.errorMsg = true;
    } else {
      game.errorMsg = false;
    }

    letterGuess = letterGuess.toLowerCase();

    if (game.numGuesses > 1) {
      game.gameOver = false;
      game.checkGuess(letterGuess);
      if (game.arrayBlanks.includes('_')) {
        game.winRound = false;
      } else {
        game.winRound = true;
      }
    } else {
      game.numGuesses = 0;
      game.gameOver = true;
      game.arrayBlanks = game.wordArray;
    };


    let context = {
      errorMsg: game.errorMsg,
      winRound: game.winRound,
      triedLetters: game.triedLetters,
      repeats: game.repeats,
      arrayBlanks: game.arrayBlanks,
      wordArray: game.wordArray,
      numGuesses: game.numGuesses,
      playerName: game.playerName,
      gameOver: game.gameOver
    }

      res.render('play', context);

  },

  resetGame: function(req, res){
    game.reset();
    res.redirect('/play');
  },

  newWordReq: function(req, res) {
    game.arrayBlanks = [];
    game.triedLetters = [];
    let newWord = game.executeLevel(game.levelChoice);
    let display = game.gameDisplay(newWord);
    req.session.word = newWord;
    res.redirect('/play');
  },

  winners: function(req, res) {
    res.render('winners', {});
  }

};
