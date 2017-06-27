const game = require('../helpers').game;

module.exports = {
  display: function (req, res){

    let guesses = game.numGuesses;
    let blanks = game.arrayBlanks;
    let newWord = game.chooseWord();
    let display = game.gameDisplay(newWord);
    req.session.word = newWord;
    req.session.guesses = guesses;


    // the array is empty because there is no word, which is why req.sess.win is true before game begins
    if(req.session.word && req.session.guesses) {
      game.gameDisplay(newWord);
      console.log(req.session.word);
    } else if (!req.session.guesses) {
      display = 'No guesses left!';``
    } else {
      newWord = game.chooseWord();
      display = game.gameDisplay(newWord);
    };
    //
    // if (gameArrayDisplayed) {
    //   req.session.win = winRound;
    //   console.log(req.session.win);
    // };

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

    //when wrapped in conditional to check win status, checkGuess does not work.
    game.checkGuess(letterGuess);
    console.log(game.arrayBlanks);
    if (game.arrayBlanks.includes('_')) {
      game.winRound = false;
      console.log(game.winRound);
    } else {
      game.winRound = true;
      console.log(game.winRound);
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
