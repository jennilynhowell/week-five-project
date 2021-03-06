const fs = require('fs');

module.exports = {
  game: {
    WORDS: fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n"),

    playerName: '',

    triedLetters: [],

    repeats: [],

    numGuesses: 8,

    arrayBlanks: [],

    wordArray: [],

    computerWord: '',

    winRound: false,

    gameOver: false,

    errorMsg: false,

    levelChoice: 0,

    chooseEasy: function(){
      let pickedWord = '';
      let randomIndex = Math.floor(Math.random() * this.WORDS.length);
      pickedWord = this.WORDS[randomIndex];
      //check word for length
      if (pickedWord.length <= 6 && pickedWord.length >= 4){
        this.computerWord = pickedWord;
        this.wordArray = Array.from(this.computerWord);
        return this.computerWord;
      } else {
        return this.chooseEasy();
      }
    },

    chooseNormal: function(){
      let pickedWord = '';
      let randomIndex = Math.floor(Math.random() * this.WORDS.length);
      pickedWord = this.WORDS[randomIndex];
      //check word for length
      if (pickedWord.length <= 8 && pickedWord.length >= 6){
        this.computerWord = pickedWord;
        this.wordArray = Array.from(this.computerWord);
        return this.computerWord;
      } else {
        return this.chooseNormal();
      }
    },

    chooseHard: function(){
      let pickedWord = '';
      let randomIndex = Math.floor(Math.random() * this.WORDS.length);
      pickedWord = this.WORDS[randomIndex];
      //check word for length
      if (pickedWord.length <= 16 && pickedWord.length >= 8){
        this.computerWord = pickedWord;
        this.wordArray = Array.from(this.computerWord);
        return this.computerWord;
      } else {
        return this.chooseHard();
      }
    },

    executeLevel: function(choice){
      if (choice == 3) {
        return this.chooseHard();
      } else if (choice == 1) {
        return this.chooseEasy();
      } else {
        return this.chooseNormal();
      }
    },

    gameDisplay: function(word){
      for (let i = 0; i < this.wordArray.length; i++){
        this.arrayBlanks[i] = '_';
      };
      return this.arrayBlanks;
    },

    //check for duplicate guess
    checkGuess: function(letter){
      let counter = 0;
      let duplicate = false;
      let correct = false;

      if (this.triedLetters){
        for (let i = 0; i < this.triedLetters.length; i++) {
          if (letter === this.triedLetters[i]) {
            this.repeats.push(letter);
            duplicate = true;
            return true;
          }
        };
        this.repeats = [];
      }


      //if !duplicate and is match, display letter
      this.triedLetters.push(letter);

      for (let i = 0; i < this.wordArray.length; i++) {
        counter ++;
        if(letter === this.wordArray[i]) {
          this.arrayBlanks[counter - 1] = letter;
          correct = true;
        }
      };

      //if !correct, subtract numGuesses
      if (!duplicate && !correct && this.numGuesses >= 1) {
        this.numGuesses --;
      } else if (correct && this.numGuesses != 0) {
        // this.numGuesses;
      }

    },

    reset: function(){
      this.arrayBlanks = [];
      this.triedLetters = [];
      this.repeats = [];
      this.numGuesses = 8;
      this.wordArray = [];
      this.computerWord = '';
      this.winRound = false;
    }

  //end game object
  },


};
